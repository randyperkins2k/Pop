import React, { useState } from 'react';


import CreatePop from './CreatePop.jsx';
import MyPops from './MyPops.jsx';

import axios from 'axios';

const App = () => {
    const [gotPops, setGotPops] = useState(false);
    const [gotLogged, setGotLogged] = useState(false);
    const [username, setUsername] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [myPops, setMyPops] = useState([]);
    const [login, setLogin] = useState(<a href="/google"> Login </a>)
    //grab from database
    const getPops = () => {
      if (!gotPops) {
        setGotPops(true);
        axios.get('/merchants')
          .then(response => setMyPops(response.data))
      }
    }
    getPops();
    const logged = () => {
      if (!gotLogged) {
        setGotLogged(true);
        axios.get('/testing')
          .then(results => {
            console.log(results.data);
            if (results.data.displayName) {
              setIsLogged(true);
              setUsername(data.displayName);
              setLogin(<a href="/logout"> Logout </a>);
            }
          });
      }
    }
    logged();
    return (
      <div>
        {isLogged === true
          ? (<a href="/logout"> Logout </a>)
        : (<a href="/google"> Login </a>)
        }
        <h1>Welcome to Pop^</h1>
        <CreatePop myPops={myPops} setMyPops={setMyPops}/>
        <MyPops myPops={myPops} setMyPops={setMyPops}/>
      </div>
    )
};

export default App;