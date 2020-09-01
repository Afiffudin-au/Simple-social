import React , {useState}from 'react'
import './WritePost.css'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Input } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import useStyles from '../useStyles/useStyles';
function WritePost() {
  const classes = useStyles()
  const [imgUrl,setImgUrl] = useState('')
  const [ImgDisplay,setImgDisplay] = useState(null)

  const changeImgUrl = (e)=>{
    if(e.target.files[0]){
      setImgUrl(e.target.files[0].name)

      const fReader = new FileReader();
      fReader.readAsDataURL(e.target.files[0]);
      fReader.onloadend = function(event){
          setImgDisplay(event.target.result);
      } 
    }
  }
  const handleChangePost = (e)=>{
   
  }
  const handleSubmit= (e)=>{
    e.preventDefault();
  }
  return (
    <div className="writePost">
      <div className={classes.root}>   
          <HomeIcon style={{ fontSize: 40 }} color="primary"/>
      </div>
      <div className={classes.root} id="getFile">   
        <Button className="writePost__chooseFileButton" variant="contained" color="primary">Choose File<Input className="writePost__chooseFile" onChange={changeImgUrl} type="file"/> {imgUrl}</Button>
      </div> 

      <div className={classes.root} noValidate autoComplete="off">
        <TextField id="filled-basic" label="Link" variant="filled" />
      </div>
      {
        ImgDisplay &&  (<div className={classes.root}>
          <img className="Img-display" src={ImgDisplay} alt=""/>
        </div>)
      }
      <div className={classes.root} noValidate autoComplete="off">
        <TextField onChange={handleChangePost} id="outlined-basic" label="what do you think about?" variant="outlined"   multiline
        rows="4"/>
        <Button onClick={handleSubmit} variant="contained" color="primary">Post</Button>
      </div>
    </div>
  )
}

export default WritePost
