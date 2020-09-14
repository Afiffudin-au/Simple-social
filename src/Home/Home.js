import React  , {useState,useEffect} from 'react'
import Button from '@material-ui/core/Button';
import  Card  from '../Card/Card';
import { useHistory } from 'react-router-dom';
import { auth ,db } from '../firebase';
import './Home.css'
import ProfileUser from '../Profileuser/ProfileUser';
function Home() {
  const history = useHistory()
  const [user,setUser] = useState(null)
  const [posts,setPosts] = useState([])
  const [limitPage,setLimitPage] = useState(1)
  const [photoURL,setPhotoURL] = useState(null)
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((Authuser)=> {
      if (Authuser) {
        setUser(Authuser)
        setPhotoURL(Authuser.photoURL)
      } else {
        // No user is signed in.
        setUser(null)
      }
    });
    //clean up function
    return ()=>{
      unsubscribe()
    }
},[user])

  useEffect(()=>{
    const unsubscribe = db.collection('posts').limit(limitPage).orderBy('timeStamp','desc').onSnapshot(snapshot=>{
      setPosts(snapshot.docs.map(doc=>({
        id : doc.id,
        post : doc.data()
      })))
    })
    return ()=>{
      unsubscribe()
    }
  },[limitPage])
  const goToAuthPage = ()=>{
    history.push('/authentication')
  }
  const goToWritePost = ()=>{
    history.push('/writePost')
  }
 const handleLogOut =  () =>{
   auth.signOut()
 }

  return (
    <div className="Home">
      <MemoizedChildComponent/>
      <div className="Home__action">
        {
          user ? (
            <>
              <Button color="secondary" variant="contained" disabled={true}>Logged</Button>
              <Button color="secondary" variant="contained" onClick={handleLogOut}>Log Out</Button>
            </>        
          ):(<Button onClick={goToAuthPage} variant="contained" color="primary">Login Or Sign Up</Button>)
        }
        <Button onClick={goToWritePost} variant="contained" color="primary">Write Post</Button>
      </div>
      {
          posts.map(({post,id})=>(  
            <Card key={id} disLikeCount={post.disLike} likeCount={post.like} postId={id} time={post.timeStamp} link={post.link} userName={post.userName} photoURL={photoURL} user={user} caption={post.caption} imgUrl={post.imgUrl}/>
          ))
      }
      <Button color="secondary" variant="contained" onClick={()=>setLimitPage(current => current + 2)}>Show More</Button>
    </div>
  )
}
const MemoizedChildComponent = React.memo(ProfileUser)
export default Home
