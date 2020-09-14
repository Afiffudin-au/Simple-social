import React , {useState, useEffect}from 'react'
import './WritePost.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import useStyles from '../useStyles/useStyles';
import { auth ,storage ,db } from '../firebase';
import {useHistory} from 'react-router-dom'
import firebase from 'firebase'
function WritePost() {
  const classes = useStyles()
  const [imgUrl,setImgUrl] = useState('')
  const [ImgDisplay,setImgDisplay] = useState(null)
  const [image,setImage] = useState(null)
  const [progress,setProgress] = useState(0)
  const [caption,setCaption] = useState('')
  const [link,setLink] = useState('')
  const [submit,setSubmit] = useState(false)
  const [loading,setLoading]  = useState(false)
  const [user,setUser] = useState(null)
  const history = useHistory()
    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((Authuser)=> {
        if (Authuser) {
          console.log(Authuser.displayName)
          setUser(Authuser)
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
  const changeImgUrl = (e)=>{
    if(e.target.files[0]){
      setImgUrl(e.target.files[0].name)
      setImage(e.target.files[0])
      const fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function(event){
          setImgDisplay(event.target.result);
      } 
    }
  }
  const handleSubmit= (e)=>{
    e.preventDefault();
    setSubmit(true)
    setLoading(true)
    let uploadTask
    if(image === null){
      db.collection('posts').add({
        //realtime server time 
        timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
        caption : caption,
        imgUrl : null,
        userName : user.displayName,
        link : link,
        like : 0,
        disLike : 0,
      }).then(()=>{
        setCaption('')
        setSubmit(false)
        setLoading(false)
      })
    }else{
      uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          //progress function
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)* 100)
          setProgress(progress)
          setLoading(true)
        },
        (error)=>{
          //error function
          console.log(error); 
          alert(error.message)
        },
        ()=>{
          //complete function
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then(url=>{
              //post image inside db
              db.collection('posts').add({
                //realtime server time 
                timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
                caption : caption,
                imgUrl : url,
                userName : user.displayName,
                link : link,
                like : 0,
                disLike : 0
              })
              setProgress(0)
              setCaption('')
              setImage(null)
              setLoading(false)
              setSubmit(false)
              setImgDisplay(null)
              setImgUrl(null)
            })
        }
      )
     }
    }
  const goToHome = ()=>{
    history.push('/')
  }
  return (
   
    user ? (
        <div className="writePost">
        <div className={classes.root}>   
            <HomeIcon onClick={goToHome} style={{ fontSize: 40 }} color="primary"/>
        </div>
        <div className={classes.root} id="getFile">   
        <form style={{position: 'relative'}}>
           <Button className="writePost__fileUpload"variant="contained" color="primary">File Choose {imgUrl} </Button> 
          <input onChange={changeImgUrl} type="file" className="writePost__fileInput"/>
        </form>
        </div> 
        <div className={classes.root} noValidate autoComplete="off">
          <TextField id="filled-basic" onChange={(e)=>setLink(e.target.value)} label="Link" variant="filled" />
        </div>
        {
          ImgDisplay &&  (<div className={classes.root}>
            <img className="Img-display" src={ImgDisplay} alt=""/>
            <progress className="imageUpload_progress" value={progress} max="100"/>
            <span>{progress}%</span>
          </div>)
        }
        <div className={classes.root} noValidate autoComplete="off">
          <TextField value={caption} onChange={(e)=>setCaption(e.target.value)} id="outlined-basic" label="what do you think about?" variant="outlined"   multiline
          rows="4"/>
           {
            loading && (
              <div className="loader">
                <div className="spin"></div>
              </div>  
            )
          }
          <Button onClick={handleSubmit} disabled={!caption || submit===true } variant="contained" color="primary">Post</Button>
        </div>
      </div>
    ):(
      <h3>Sorry You Need To Login To Upload</h3>
    )
    
  )
}

export default WritePost
