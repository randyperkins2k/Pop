import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const styles = {
  main:{'margin': 0,
    'padding': 0,
    'width': '200px',
    'backgroundColor': '#f1f1f1',
    'position': 'absolute',
    'height': '100%',
    'overflow': 'auto',
    'zIndex': 99
  },
  links:{
    'display': 'block',
    'color': 'black',
    'padding': '16px',
    'textDecoration': 'none'
  }
}

const SideBar = ({ close, setMLPrimary, setLVPrimary }) => {

  return (
    <div style={styles.main} className='sidebar'>
      <ul styles={styles.links}>
        <Link to='/' exact='true'>
          <a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
            }}>PopUps</a> 
        </Link>
        <br/>
        <Link to='/yourprofile'>
          <a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
            }}>Your Profile</a> 
        </Link>
        <br/>
        <Link to='/yourpopups'>
          <a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
          }}>Your PopUps</a>
        </Link>
        <br/>
        <Link to='/settings'>
          <a onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
          }}>Settings</a>
        </Link>
        <br/>
          <a href="/logout" onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
            }}>Logout</a>
      </ul>
    </div>
  )
}

export default SideBar;