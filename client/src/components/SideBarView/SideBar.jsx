import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import popUpLogo from '.../popup/popUpLogo.jpg';

const Wrap = styled.div`
  'margin': 0,
  'padding': 0,
  'width': '200px',
  'backgroundColor': '#f1f1f1',
  'position': 'absolute',
  'height': '100%',
  'overflow': 'auto',
  'zIndex': 99
`;

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
const Button = styled.button`
  background: lightgrey;
  border-radius: 10px;
  border-width: 4px;
  border-color: #ffd1dc;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 8em;
  display: block;
`
const SideBar = ({ close }) => {

  return (
    <div style={styles.main} className='sidebar'>
      <ul styles={styles.links}>
        <Link to='/' exact='true'>
          <Button><a onClick={() => close(false)}>PopUps</a></Button>
        </Link>
        <br/>
        <Link to='/yourprofile'>
          <Button><a onClick={() => close(false)}>My Profile</a></Button> 
        </Link>
        <br/>
        <Link to='/yourpopups'>
          <Button><a onClick={() => close(false)}>My PopUps</a></Button>
        </Link>
        <br/>
        <Link to='/settings'>
          <Button><a onClick={() => close(false)}>Settings</a></ Button> 
        </Link>
        <br/>
          <Button><a href="/logout" onClick={() => close(false)}>Logout</a></Button> 
      </ul>
    </div>
  )
}

export default SideBar;