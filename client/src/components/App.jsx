import React, { useState } from 'react';

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
//import ToggleSwitch from './ToggleSwitch.jsx';
// const MapView = withScriptjs(withGoogleMap(Map));


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
        <div>
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