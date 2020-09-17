import React , {useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { db } from '../firebase';
import firebase from 'firebase'
import './Card.css'
import { IconButton } from '@material-ui/core';
import { deepPurple ,blue ,red} from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
function Card({postId,time,link,caption,imgUrl,user,photoURL,userName,likeCount,disLikeCount}) {
  const [comment,setComment] = useState('')
  const [comments,setComments] = useState([])
  const [clickLike,setClickLike] = useState(false)
  const [clickDislike,setClickDislike] = useState(false)
  const [successCopy,setSuccessCopy]  = useState(false)
  useEffect(()=>{
    let unsubscribe;
    if(postId){
      unsubscribe = db.collection('posts').doc(postId).collection('comments').orderBy('timeStamp','desc').onSnapshot((snapshot)=>{
        setComments(snapshot.docs.map(doc=>({
          id : doc.id,
          comment : doc.data()
        })))
      })
    }
    return ()=>{
      unsubscribe()
    }
  },[postId])

  const handlePostComment = (e)=>{
    e.preventDefault()
    db.collection('posts').doc(postId).collection('comments').add({
      text : comment,
      userName : user.displayName,
      timeStamp : firebase.firestore.FieldValue.serverTimestamp(),
    })
  }

  const handleLike = () =>{
    const plus = firebase.firestore.FieldValue
    if(!clickLike){
      // dislike dikurangi jika tombol dislike true dengan actioooon user menekan tombol dislike
      if(clickDislike){    
        db.collection('posts').doc(postId).update({disLike: plus.increment(-1)})
      }
      //like ditambah dislike dikurangi jika dislike true     
         db.collection('posts').doc(postId).update({like : plus.increment(1)})
    }    
    else{
      db.collection('posts').doc(postId).update({like :  plus.increment(-1)})
    } 
    setClickLike(!clickLike)
    setClickDislike(false)  
}

  const handleDislike = ()=>{
    const minus = firebase.firestore.FieldValue
    if(!clickDislike){ 
      //like dikurangi jika tombol like true dengan action user menekan tombol dislike
      if(clickLike){
        db.collection('posts').doc(postId).update({like : minus.increment(-1)})
      }
      //dislike ditambah dan like dikurangi jika like true
      db.collection('posts').doc(postId).update({disLike : minus.increment(1)})
    }else{ 
      db.collection('posts').doc(postId).update({disLike : minus.increment(-1)})
    } 
    setClickDislike(!clickDislike)
    setClickLike(false)
  }
  const handleCopyLink = (link)=>{
    const el = document.createElement('textarea');
    el.value = link;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setSuccessCopy(true)
  }
  return (
    <>
    <Snackbar open={successCopy} autoHideDuration={800} onClose={() => setSuccessCopy(false)}>
      <Alert severity="success">
        Success to copy
      </Alert>
    </Snackbar>
    <div className="Card">
        <MomoizedCardChild user={user} time={time} handleCopyLink={handleCopyLink} photoURL={photoURL} userName={userName} imgUrl={imgUrl} caption={caption} link={link}/>
        <div className="Card__content">
          <div className="Card__action">
            <MemoizedChildActionComponent user={user} likeCount={likeCount} disLikeCount={disLikeCount} clickLike={clickLike} handleLike={handleLike} clickDislike={clickDislike} handleDislike={handleDislike} />  
          </div>
            <MemoizedChildCardComment user={user} setComment={setComment} comment={comment} handlePostComment={handlePostComment} />
          <div className="Card__comment_post">
            <MemoizedChildComment comments={comments}/>
          </div>
        </div>
    </div>
    </>
  )
}
function CardChildComponent({user,time,handleCopyLink,photoURL,userName,imgUrl,caption,link}){

  return (
    <>
      <span className="Card__time">
        { `${time.toDate().getHours()} : ${time.toDate().getMinutes()} , ${time.toDate().toLocaleDateString()}`}
        </span>
      <div className="Card__header">
      <Avatar className="post__avatar" alt={userName}  src={photoURL}></Avatar>
        <h5 className="Card__Name">{userName}</h5>
      </div>
      {
        imgUrl &&  <img className="Card__contentImg" src={imgUrl} alt=""/>
      }
      <div className="Card__contentP"><p>{caption}</p>  </div>
      {
        link && (<div className="Card__link">
        <span className="Card__link__text">{link}</span> 
        <IconButton onClick={()=>handleCopyLink(link)}>
          <FileCopyIcon style={{color : blue[400] }}/>
        </IconButton>
      </div>)
      }
     
    </>
  )
}
function ActionBox ({user,likeCount,disLikeCount,clickLike,handleLike,clickDislike,handleDislike}){
  console.log('render like')
  return(
     user && (
       <>
        <IconButton onClick={handleLike}>
          <ThumbUpAltIcon style={clickLike ? {color: blue[400]} : {color: deepPurple[50]}}/>
          <span>{likeCount}</span>
        </IconButton>
        
        <IconButton onClick={handleDislike}>
          <ThumbDownIcon style={clickDislike ? {color: blue[400]} : {color: deepPurple[50]}}/>
          <span>{disLikeCount}</span>
        </IconButton>
        
        <IconButton disabled={!user}>
          <CommentIcon style={{ color: deepPurple[50] }}/>
        </IconButton>
        <IconButton disabled={!user}>
          <ShareIcon style={{ color: deepPurple[50] }}/>  
        </IconButton>
       </>
     )
  )
}
function CommentChild({comments}){
  console.log('render comment')
  return( 
    comments.map(({comment,id})=>(
      <p key={id}>
        <strong>{comment.userName}</strong> {comment.text}
      </p>
    ))
  )
}
function CardCommentChild({user,setComment,comment,handlePostComment}){
  console.log("render comment card")
  return(
  user ? (
    <div className="Card__comment" disabled={!user}>
        <TextField onChange={(e)=>setComment(e.target.value)} className="Card__commentInput" color="secondary" variant="filled" label="comment" type="email"/>
        <Button  onClick={handlePostComment} disabled={!comment} className="Card__commentPush" variant="contained" color="primary">Post</Button>
    </div>
    ):(
      <span style={{ color: red[400]}}>You need Login Or Sign up to active like and comment</span>
    )
  )
}
function compare(prevProps , nextProps){
  return JSON.stringify(prevProps) === JSON.stringify(nextProps)
}
const MomoizedCardChild = React.memo(CardChildComponent,compare)
const MemoizedChildActionComponent = React.memo(ActionBox,compare)
const MemoizedChildComment = React.memo(CommentChild,compare)
const MemoizedChildCardComment = React.memo(CardCommentChild,compare)
export default Card
