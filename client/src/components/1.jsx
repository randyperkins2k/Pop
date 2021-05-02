import React, { useState } from 'react';

const CreatePop = ({ myPops, setMyPops }) => {
 const [name, setName] = useState('');
 const [lat, setLat] = useState('');
 const [lon, setLon] = useState('');

 const handleName = (target) => {
   setName(target);
 };

  return (
    <div>
      <p>Name Your PopUp:</p>
      <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="name..." />
      <p>Enter Location:</p>
      <input type="text" name="latitude..." value={lat} onChange={(e) => {setLat(e.target.value)}} placeholder="latitude..." />
      <input type="text" name="longitude..." value={lon} onChange={(e) => {setLon(e.target.value)}} placeholder="longitude..." />
      <button onClick={() => {setMyPops([...myPops, {name, lat, lon}])}}>Create PopUp</button>
    </div>
  )
};

export default CreatePop;