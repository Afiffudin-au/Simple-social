import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import ShareIcon from '@material-ui/icons/Share';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import CommentIcon from '@material-ui/icons/Comment';
import './Card.css'
import { IconButton } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
function Card() {
  return (
    <div className="Card">
      <div class="Card__header">
        <Avatar className="post__avatar" alt="AAA" src="/static/images/avatar/1.jpg"></Avatar>
          <h5 className="Card__Name">My Name</h5>
        </div>
      
        <img className="Card__contentImg" src="https://phillipbrande.files.wordpress.com/2013/10/random-pic-14.jpg" alt=""/>
        <div className="Card__content">
        <p className="Card__contentP">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ut consectetur rem? Minima sequi perferendis accusantium minus! Recusandae tempora dolore sed ad, fugiat nulla perspiciatis totam. Eveniet asperiores magnam ratione?</p>
        <div className="Card__action">
          <IconButton >
            <ThumbUpAltIcon style={{ color: deepPurple[50] }}/>        
          </IconButton>

          <IconButton>
          <ThumbDownIcon style={{ color: deepPurple[50] }}/>
          </IconButton>

          <IconButton>
          <CommentIcon style={{ color: deepPurple[50] }}/>
          </IconButton>

          <IconButton>
          <ShareIcon style={{ color: deepPurple[50] }}/>  
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Card
