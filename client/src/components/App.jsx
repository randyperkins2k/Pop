import React, { useState } from 'react';
import CreatePop from './CreatePop.jsx';
import MyPops from './MyPops.jsx';

const App = () => {
    const [myPops, setMyPops] = useState([
      {
        name: 'Tight Taco Truck',
        lat: 0,
        lon: 0,
      },
      {
        name: 'Lit Art Stand',
        lat: 0,
        lon: 0,
      },
    ]);
    return (
      <div>
        <CreatePop myPops={myPops} setMyPops={setMyPops}/>
        <MyPops myPops={myPops} setMyPops={setMyPops}/>
      </div>
    )
};

export default App;