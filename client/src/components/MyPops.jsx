import React, { useState } from 'react';

const MyPops = ({ myPops, setMyPops }) => {

  return (
  <div>
    <h3>My PopUps: </h3>
    {myPops.map(pop => <p>{pop.name}: [{pop.lat}, {pop.lon}]</p>)}
  </div>
  )
};

export default MyPops;

