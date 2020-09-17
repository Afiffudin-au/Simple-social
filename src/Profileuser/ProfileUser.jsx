import React , {useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import { auth } from '../firebase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {red} from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import './ProfileUser.css'
function ProfileUser() {
  const [user,setUser] = useState(null)
  const [photoURL,setPhotoURL] = useState(null)
  const [updateProfile,setUpdateProfile] = useState(0)
  const [newUserName,setNewUserName] = useState('')
  const [inputEmpty,setInputEmpty] = useState(null)
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
},[user,updateProfile])
const handleUpdateProfile = ()=>{
   const user = auth.currentUser;
   if(newUserName === ''){
    setInputEmpty(true)
   }else{
    setInputEmpty(false)
    user.updateProfile({
      displayName: newUserName ,
      photoURL: "https://barefootmedia.co.uk/wp-content/uploads/2016/01/Chris-user-profile.jpg"
    }).then(function() {
      alert('update Succes')
      setNewUserName('')
      setUpdateProfile(current => current + 1)
    }).catch(function(error) {
      // An error happened.
      alert('Erorr',error)
    });
   }
  
  }
  return (
    <div style={{marginLeft: '20px'}}>
     
      <div className="profileUser__edit">
         <MemoizedChildComponent photoURL={photoURL} user={user}/>
        <TextField className="profileUser__InputEdit" id="filled-basic" onChange={(e)=>setNewUserName(e.target.value)} label="New user name" variant="filled" value={newUserName}/>
        {
          inputEmpty && <span className="profileUser__Erorr" style={{color : red[500]}}>Cannot update empty name </span>
        }
        <Button onClick={handleUpdateProfile} variant="contained" color="primary">Update</Button>
        <form style={{position: 'relative'}}>
          <Button className="profileUser__fileUpload"variant="contained" color="primary">File Choose</Button> 
          <input type="file" className="profileUser__fileInput"/>
        </form>
      </div>
    </div>
  )
}
function editProfileUser({photoURL,user})
{
  if(user !== null){
    return (
      <Box display='flex' alignItems='center'>
        <Avatar style={{marginBottom:'10px',marginRight:'10px'}} className="post__avatar" src={photoURL} alt={user.displayName}></Avatar>
        <span>{user.displayName}</span>
      </Box>
    )
  }
}
const MemoizedChildComponent = React.memo(editProfileUser)
export default ProfileUser
