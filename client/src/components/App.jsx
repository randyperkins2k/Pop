import React, { useState, useEffect } from 'react';


import CreatePop from './CreatePop.jsx';
import MyPops from './MyPops.jsx';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Map from './mapView.jsx';
import * as merchData from './openMerch.json';
// const MapView = withScriptjs(withGoogleMap(Map));


import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [myPops, setMyPops] = useState([]);
    //grab from database
    const getPops = () => {
        axios.get('/merchants')
          .then(response => setMyPops(response.data))
    }
    const logged = () => {
        axios.get('/testing')
        .then(results => {
          console.log(results.data);
          if (results.data.displayName) {
            setIsLogged(true);
            setUsername(data.displayName);
          }
        });
    }
    useEffect(() => logged(), []);
    useEffect(() => getPops(), []);
    return (
      <div>
        {isLogged === true
          ? (<a href="/logout"> Logout </a>)
        : (<a href="/google"> Login </a>)
        }
        <h1>Welcome to Pop^</h1>
        <CreatePop myPops={myPops} setMyPops={setMyPops}/>
        <MyPops myPops={myPops} setMyPops={setMyPops}/>
        <Map
        loadingElement={<div style={{height: '80%' }}/>}
        containerElement={<div style={{height: '80%' }}/>}
        mapElement={<div style={{height: '80%' }}/>}
        merchData={merchData}
        />
        </div>
      </div>
    )
};

export default App;