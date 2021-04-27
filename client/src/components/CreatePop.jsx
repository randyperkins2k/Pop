import React, { useState } from 'react';
import axios from 'axios';
const CreatePop = ({ myPops, setMyPops }) => {
 const [name, setName] = useState('');
 const [lat, setLat] = useState('');
 const [lon, setLon] = useState('');

 const handleName = (target) => {
   setName(target);
 };

 const addPop =() => {
   axios.post(`/addmerchant/${name}/${lat}/${lon}`)
    .then(response => {
      const {name, lat, lon} = response.data;
      //setting state from response object, not reading from database until refresh, discuss this
      setMyPops([...myPops, {name, lat, lon}]);
    });
 }

  return (
    <div>
      <p>Name Your PopUp:</p>
      <input type="text" name="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="name..." />
      <p>Enter Location:</p>
      <input type="text" name="latitude..." value={lat} onChange={(e) => {setLat(e.target.value)}} placeholder="latitude..." />
      <input type="text" name="longitude..." value={lon} onChange={(e) => {setLon(e.target.value)}} placeholder="longitude..." />
      <button onClick={addPop}>Create PopUp</button>
    </div>
  )

};

export default CreatePop;