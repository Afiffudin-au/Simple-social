import React  , {useState,useEffect,useRef,useCallback} from 'react'
import Button from '@material-ui/core/Button';
import  Card  from '../Card/Card';
import { useHistory } from 'react-router-dom';
import { auth ,db } from '../firebase';
import './Home.css'
function Home() {
  const history = useHistory()
  const [user,setUser] = useState(null)
  const [posts,setPosts] = useState([])
  const [limitPage,setLimitPage] = useState(2)
  const [photoURL,setPhotoURL] = useState(null)
  const [loading,setLoading] = useState(true)
  const [loadingLastCard , setLoadingLastCard] = useState(true);
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((Authuser)=> {
      if (Authuser) {
        setUser(Authuser)
        setPhotoURL(Authuser.photoURL)  
        setLoading(false)
      } else {
        // No user is signed in.
        setLoading(false)
        setUser(null)
      }
    });
    //clean up function
    return ()=>{
      unsubscribe()
    }
},[user])
  useEffect(()=>{
    setLoadingLastCard(true)
    const unsubscribe =
      db.collection('posts').limit(limitPage).orderBy('timeStamp','desc').onSnapshot(snapshot=>{
          setPosts(snapshot.docs.map(doc=>({
            id : doc.id,
            post : doc.data()
          })))
          setLoadingLastCard(false)
        })   
    return ()=>{
      unsubscribe()
    }
  },[limitPage])
  const observer = useRef();
  const lastPostElement = useCallback(node =>{
    if(loading) return 
    console.log(loading)
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        setLimitPage(current => current + 4)
      }
    })
    if(node) observer.current.observe(node)
  },[loading])
  const goToAuthPage = ()=>{
    history.push('/authentication')
  }
  const goToWritePost = ()=>{
    history.push('/writePost')
  }
  const goToProfile = ()=>{
    history.push('/profileUser')
  }
  const handleLogOut =  () =>{
   auth.signOut()
  }
  return (
    
    <div className="Home"> 
      {
        loading && (
          <div className="loader">
            <div className="spin"></div>
          </div>  
        )
      }
      <div className="Home__action">
        {
          user ? (
            <>
              <Button color="secondary" variant="contained" disabled={true}>Logged</Button>
              <Button color="secondary" variant="contained" onClick={handleLogOut}>Log Out</Button>
              <Button color="secondary" variant="contained" onClick={goToProfile}>Profile</Button>
            </>        
          ):(<Button onClick={goToAuthPage} variant="contained" color="primary">Login Or Sign Up</Button>)
        }
        <Button onClick={goToWritePost} variant="contained" color="primary">Write Post</Button>
      </div>
      {
          posts.map(({post,id},index)=>{
            if(posts.length === index + 1){
              return <div ref={lastPostElement} key={id}>
                <Card key={id} disLikeCount={post.disLike} likeCount={post.like} postId={id} time={post.timeStamp} link={post.link} userName={post.userName} photoURL={photoURL} user={user} caption={post.caption} imgUrl={post.imgUrl}/>
              </div>
            }else{
               return <Card key={id} disLikeCount={post.disLike} likeCount={post.like} postId={id} time={post.timeStamp} link={post.link} userName={post.userName} photoURL={photoURL} user={user} caption={post.caption} imgUrl={post.imgUrl}/>
            }
          })
      }
      {
        loadingLastCard && ( 
        <div className="loader">
          <div className="spin"></div>
        </div>  )
      }
    </div>
  )
}
export default Home
