import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const styles = {
  main:{'margin': 0,
    'padding': 0,
    'width': '200px',
    'background-color': '#f1f1f1',
    'position': 'absolute',
    'height': '100%',
    'overflow': 'auto',
    'z-index': 99
  },
  links:{
    'display': 'block',
    'color': 'black',
    'padding': '16px',
    'text-decoration': 'none'
  }
}

const SideBar = () => {

  return (
    <div style={styles.main} className='sidebar'>
      <ul styles={styles.links}>
        <Link to='/' exact>
          <a>PopUps</a> 
        </Link>
        <br/>
        <Link to='/yourprofile'>
          <a>Your Profile</a> 
        </Link>
        <br/>
        <Link to='/yourpopups'>
          <a>Your PopUps</a> 
        </Link>
        <br/>
        <Link to='/settings'>
          <a>Settings</a> 
        </Link>
        <br/>
        <Link to='/login'>
          <a>Logout</a> 
        </Link>
      </ul>
    </div>
  )
}

export default SideBar;