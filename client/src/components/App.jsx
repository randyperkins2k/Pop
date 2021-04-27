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
// const MapView = withScriptjs(withGoogleMap(Map));


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
        <div style={{width: '100vw', height: '100vh'}}>
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