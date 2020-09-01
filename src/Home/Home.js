import React  , {useState} from 'react'
import useStyles from '../useStyles/useStyles';
import  Card  from '../Card/Card';
function Home() {
  const classes = useStyles();
  return (
    <div className="Home">
      <Card/>
      <Card/>
      <Card/>
    </div>
  )
}

export default Home
