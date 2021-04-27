import React, { useState } from 'react';

import CreatePop from './CreatePop.jsx';
import MyPops from './MyPops.jsx';

import axios from 'axios';

const App = () => {
    const [myPops, setMyPops] = useState([]);
    //grab from database
    const getPops = () => {
      axios.get('/merchants')
        .then(response => setMyPops(response.data))
    }
    getPops();
    return (
      <div>
        <h1>Welcome to Pop^</h1>
        <CreatePop myPops={myPops} setMyPops={setMyPops}/>
        <MyPops myPops={myPops} setMyPops={setMyPops}/>
      </div>
    )
};

export default App;