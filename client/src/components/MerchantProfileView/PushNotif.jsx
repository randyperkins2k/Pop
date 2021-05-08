import React, { useState } from 'react';
import axios from 'axios';

const PushNotif = ({ user, merchant, setOpenNotif }) => {
  const [ notification, setNotification ] = useState();
  const [ requesting, setRequesting ] = useState(false);

  
  return (
    <div>
      <div>
        <p></p>
      </div>
      <form>
        <input onChange={(e) => setOpenNotifMessage(e.target.value)}>hello</input>
        <button onSubmit={() => console.log('okay!')}>submit</button>
      </form>
    </div>
  )
}

export default PushNotif;