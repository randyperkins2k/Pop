import React, { useState } from 'react';
import axios from 'axios';

const PushNotif = ({ user, merchant, setOpenNotifMessage, openNotifMessage  }) => {
  const [ notifConfirm, setNotifConfirm ] = useState(false);
  const [ requesting, setRequesting ] = useState(false);
  const [ notifMessage, setNotifMessage ] = useState('');

  
  return (
    <div>
    { !merchant.isOpen ?
   <div>
     { 
     notifConfirm ? 
     <div>
        <h6>Your notification message</h6>
        <h4>{`${merchant.name} is now open!`}</h4>
        <p>{notifMessage}</p>
        <button onClick={() => setNotifConfirm(false)}>change</button>
      </div>
      :
      <div>
      <h6>Your notification message</h6>
      <form  onSubmit={(e) => {
          e.preventDefault();
          //console.log(openNotifMessage)
          setNotifConfirm(true)
        }}>
        <input type="text" onChange={(e) => {
          setOpenNotifMessage(e.target.value)
          setNotifMessage(e.target.value)
          }}></input>
        <button type="submit" >submit</button>
      </form>
      </div>
      }
      </div>
      :
      <h3>You are Open!</h3>
      }
    </div>
  )
}

export default PushNotif;