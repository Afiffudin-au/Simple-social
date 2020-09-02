import React  , {useState} from 'react'
import Button from '@material-ui/core/Button';
import  Card  from '../Card/Card';
import { useHistory } from 'react-router-dom';
import useStyles from '../useStyles/useStyles';
import './Home.css'
function Home() {
  const history = useHistory()
  const classes = useStyles();
  const goToAuthPage = ()=>{
    history.push('/authentication')
  }
  const goToWritePost = ()=>{
    history.push('/writePost')
  }
  return (
    <div className="Home">
      <div className="Home__action">
        <Button onClick={goToAuthPage} variant="contained" color="primary">Login Or Sign Up</Button>
        <Button onClick={goToWritePost} variant="contained" color="primary">Write Post</Button>
      </div>
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}

export default Home
