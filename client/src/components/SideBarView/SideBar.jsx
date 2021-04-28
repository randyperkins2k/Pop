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

const SideBar = ({ close }) => {

  return (
    <div style={styles.main} className='sidebar'>
      <ul styles={styles.links}>
        <Link to='/' exact>
          <a onClick={() => close(false)}>PopUps</a> 
        </Link>
        <br/>
        <Link to='/yourprofile'>
          <a onClick={() => close(false)}>Your Profile</a> 
        </Link>
        <br/>
        <Link to='/yourpopups'>
          <a onClick={() => close(false)}>Your PopUps</a> 
        </Link>
        <br/>
        <Link to='/settings'>
          <a onClick={() => close(false)}>Settings</a> 
        </Link>
        <br/>
        <Link to='/login'>
          <a onClick={() => close(false)}>Logout</a> 
        </Link>
      </ul>
    </div>
  )
}

export default SideBar;