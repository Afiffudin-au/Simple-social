import React , {useState,useEffect} from 'react' 
import {useHistory} from 'react-router-dom'
 import TextField from '@material-ui/core/TextField';
import useStyles from '../useStyles/useStyles';
import './AuthenticationForm.css'
import Button from '@material-ui/core/Button';
import { auth } from '../firebase';
import {blue,red} from '@material-ui/core/colors';
import LoopIcon from '@material-ui/icons/Loop';
import IconButton from '@material-ui/core/IconButton';
function AuthenticationForm() {
  const [signUp,setSignUp] =  useState(false)
  const [signIn,setSignIn] = useState(true)
  const [displaySignUp,setDisplaySignUp] = useState(true)
  const [displaySignIn,setDisplaySignIn] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [userName,setUserName] = useState('')
  const [loading,setLoading]  = useState(false)
  const [loadCaptcha,setLoadCaptcha] =useState(0)
  const [valueA,setValueA] = useState(0)
  const [valueB,setValueB] = useState(0)
  const [aritMath,setAritMath] = useState('')
  const [captcha ,setCaptcha ] = useState(false)
  const [captchaInput,setCaptchaInput] = useState(null)
  const history = useHistory()
  const classes = useStyles();
  useEffect(()=>{
    const aritMathArray = ['+','-','x'];
    const random = {
      randA : Math.random(),
      randB : Math.random(),
      randArith : Math.random(),
    }
    setValueA(Math.floor(random.randA * 10))
    setAritMath(aritMathArray[Math.floor(random.randArith * 3)])
    setValueB(Math.floor(random.randB * 10))
  },[loadCaptcha])
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
    if(captchaInput === null){
      alert('Captcha Required')
      return;
    }
    e.preventDefault()
    setLoading(true)
    auth.createUserWithEmailAndPassword(email,password)
    .then((authUser)=>{
      setLoading(false)
      history.push('/')
      return authUser.user.updateProfile({
        displayName : userName
      })
    })
    .catch((error)=> {
      setLoading(false)
      alert(error.message)
    })
  }
  const handleCaptcha = (e)=>{
    setCaptchaInput(parseInt(e.target.value))
    if(aritMath === '+'){
      if(parseInt(e.target.value) === valueA + valueB){
        setCaptcha(false)
      }else{
        setCaptcha(true)
      }
    }
    if(aritMath === '-'){
      if(parseInt(e.target.value) === valueA - valueB){
        setCaptcha(false)
      }else{
        setCaptcha(true)
      }
    }
    if(aritMath === 'x'){
      if(parseInt(e.target.value) === valueA * valueB){
        setCaptcha(false)
      }else{
        setCaptcha(true)
      }
    }
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
              <div className="Auth__captcha">
                <span style={{color : blue[500]}}>{valueA} {aritMath} {valueB} : </span>
                <TextField type="number" onChange={handleCaptcha} variant="filled" className="Input_Captcha" label="captcha" />
                <IconButton onClick={()=>setLoadCaptcha(current => current + 1)}>
                  <LoopIcon/>
                </IconButton>
              </div>
              {captcha && <span style={{color : red[500]}}>Wrong Answer Math</span>}
              
              <Button disabled={captcha} type="submit" onClick={handleAuthenticationSignUp} variant="contained" color="primary">Sign Up</Button> 
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
