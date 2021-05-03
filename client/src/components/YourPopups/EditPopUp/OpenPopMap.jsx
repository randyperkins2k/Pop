import React, { useState } from 'react';
import mapStyles from './mapstyles';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Window from '../MapView/Window.jsx'
import styled from 'styled-components'
//import map from '../popup/foodmarker.png'

const libraries = ["places"];

const TouchMap = styled.div`
font-family: 'Ubuntu';
margin-left: 84px;
margin-top: 30px;
opacity: .5;
`

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}

const center = {lat: 29.956124, lng: -90.090509};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
}

const OpenPopupMap = ({ merchData, selectMerchant, currentLocMarker, setCurrentLocMarker, setMLPrimary }) => {
  const [ selectedPopUp, setSelectedPopUp ] = useState(null);
  //const [ currentLocMarker, setCurrentLocMarker ] = useState(null);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries
  })

  const mapMarkerClick = React.useCallback(()=>{
    setSelectedPopUp(merch)
  } , []);

  if (loadError) {
    return "error loading map"
  }

  if (!isLoaded) {
    return "loading maps"
  }


  return (
    <div>
      <TouchMap>Touch map to set location</TouchMap>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
      onClick={(event) =>{
        setCurrentLocMarker({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date()
        })
        alert('location saved');
      }}
    >
     {merchData.map(merch => {
        if (merch.isOpen) {
          return <Marker
            key={merch.id}
            position={{
              lat: +merch.lat,
              lng: +merch.lon
            }}
            // icon={{
            //   url: './foodmarker.png',
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 0)
            // }}
             onClick={()=>{
              setSelectedPopUp(merch)
            }}
          />
        }
      })}
      {
        selectedPopUp && (
          <InfoWindow
          position={{
            lat: +selectedPopUp.lat,
            lng: +selectedPopUp.lon
          }}
          onCloseClick={()=>{
            setSelectedPopUp(null);
          }}
          >
           <Window
              merchant={selectedPopUp}
              selectMerchant={selectMerchant}
              setMLPrimary={setMLPrimary}
              />
          </InfoWindow>
        )
      }
    </GoogleMap>
    </div>
  );
};

export default OpenPopupMap;