import React , {useState,useEffect} from 'react' 
import {useHistory} from 'react-router-dom'
 import TextField from '@material-ui/core/TextField';
import useStyles from '../useStyles/useStyles';
import './AuthenticationForm.css'
import Button from '@material-ui/core/Button';
import { auth } from '../firebase';
function AuthenticationForm() {
  const [signUp,setSignUp] =  useState(false);
  const [signIn,setSignIn] = useState(true);
  const [displaySignUp,setDisplaySignUp] = useState(true)
  const [displaySignIn,setDisplaySignIn] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userName,setUserName] = useState('')
  const [loading,setLoading]  = useState(false)
  const [user,setUser] = useState(null)
  const history = useHistory()
  const classes = useStyles();
  const setSignUpDisplayAndsetsignUp = ()=>{
    setDisplaySignIn(true)
    setSignUp(true)
    setDisplaySignUp(false)
    setSignIn(false)
  }
  const setSignInDisplayAndsetsignIn = ()=>{
    setSignUp(false)
    setSignIn(true)
    setDisplaySignIn(false)
    setDisplaySignUp(true)
  }
  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((Authuser)=> {
      if (Authuser) {
        // User is signed in.
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
  },[user,userName])
  const handleAuthenticationSignIn = (e)=>{
    e.preventDefault()
    setLoading(true)
    auth.signInWithEmailAndPassword(email,password)
      .then(()=>{
        setLoading(false)
        // const history = useHistory()
        history.push('/')
      }).catch((erorr)=>{
        setLoading(false)
        alert(erorr.message)
      })
  }
  const handleAuthenticationSignUp = (e)=>{
    e.preventDefault()
    setLoading(true)
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      setLoading(false)
      return authUser.user.updateProfile({
        displayName : userName
      })
    })
    .catch((error)=> {
      setLoading(false)
      alert(error.message)
    })
  }


  return (
    <div className="AuthenticationForm" >
      <div className={classes.root} >
        {
          signUp && (
            <>
              <TextField  value={userName} onChange={(e)=>setUserName(e.target.value)} variant="filled" label="user name" type="text"/>
              <TextField  value={email} onChange={(e)=>setEmail(e.target.value)}    variant="filled" label="email" type="email"/>
              <TextField  value={password} onChange={(e)=>setPassword(e.target.value)} variant="filled" label="password" type="password"/>
              <Button type="submit" onClick={handleAuthenticationSignUp} variant="contained" color="primary">Sign Up</Button> 
            </>
          )
        }      

        {
          signIn && (
            <>
            <TextField  value={email} onChange={(e)=>setEmail(e.target.value)}    variant="filled" label="email" type="email"/>
            <TextField  value={password} onChange={(e)=>setPassword(e.target.value)} variant="filled" label="password" type="password"/>
            <Button      onClick={handleAuthenticationSignIn}      variant="contained" color="primary">Sign In</Button>
            </>
          )
      
        }
         {
          loading && (
            <div className="loader">
              <div className="spin"></div>
            </div>  
          )
        }

      </div>

      <div className={classes.root} >
        {
          displaySignUp && (
            <Button  onClick={setSignUpDisplayAndsetsignUp}variant="contained" color="secondary">Don't have account , Sign Up Page</Button>
          )
        }
        {
          displaySignIn && (
            <Button onClick={setSignInDisplayAndsetsignIn} variant="contained" color="secondary">Sign In Page</Button>
          )
        }
       
        
      </div>
    </div>
  )
}

export default AuthenticationForm
