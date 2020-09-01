import React , {useState} from 'react' 
 import TextField from '@material-ui/core/TextField';
import useStyles from '../useStyles/useStyles';
import './AuthenticationForm.css'
import Button from '@material-ui/core/Button';
function AuthenticationForm() {
  const [signUp,setSignUp] =  useState(false);
  const [signIn,setSignIn] = useState(true);
  const [displaySignUp,setDisplaySignUp] = useState(true)
  const [displaySignIn,setDisplaySignIn] = useState(false)
  const classes = useStyles();
  const handleAuthenticationSignIn = (e)=>{
    e.preventDefault()
  }
  const handleAuthenticationSignUp = (e)=>{
    e.preventDefault()
  }
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
  return (
    <div className="AuthenticationForm" >
      <div className={classes.root} >
        {
          signUp && (
            <>
              <TextField   variant="filled" label="user name" type="text"/>
              <TextField   variant="filled" label="email" type="email"/>
              <TextField   variant="filled" label="password" type="password"/>
              <Button onClick={handleAuthenticationSignUp} variant="contained" color="primary">Sign Up</Button>   
            </>
          )
        } 

        {
          signIn && (
            <>
            <TextField   variant="filled" label="email" type="email"/>
            <TextField   variant="filled" label="password" type="password"/>
            <Button onClick={handleAuthenticationSignIn} variant="contained" color="primary">Sign In</Button>
            </>
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