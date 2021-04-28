import React, { useState } from 'react';
import mapStyles from './mapstyles'; 
import { 
  GoogleMap, 
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Window from '../MapView/Window.jsx'
//import map from '../popup/foodmarker.png'

const libraries = ["places"];

const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}

const center = {lat: 29.956124, lng: -90.090509};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
}

const Map = ({ merchData }) => {
  const [ selectedPopUp, setSelectedPopUp ] = useState(null);
  const [ currentLocMarker, setCurrentLocMarker ] = useState(null);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwWzORKJaC58xsnhwOmI2YwmUJS1iGMEU',
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
        console.log(currentLocMarker)
      }}
    >
     {merchData.merchants.map(merch => {
       console.log(merch);
        if (merch.isOpen) {
          return <Marker
            key={merch.id}
            position={{
              lat: merch.lat,
              lng: merch.lon
            }}
            // icon={{
            //   url: '../popup/foodmarker2.svg',
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
            lat: selectedPopUp.lat,
            lng: selectedPopUp.lon
          }}
          onCloseClick={()=>{
            setSelectedPopUp(null);
          }}
          >
           <Window merchant={selectedPopUp}/>
          </InfoWindow>
        )
      }
    </GoogleMap>
    // <GoogleMap
    //   defaultZoom={13.5} 
    //   defaultCenter={{lat: 29.956124, lng: -90.090509}}
    // >
    //   {merchData.merchants.map(merch => {
    //     if (merch.isOpen) {
    //       return <Marker
    //         key={merch.id}
    //         position={{
    //           lat: merch.lat,
    //           lng: merch.lon
    //         }}
    //         onClick={()=>{
    //           setSelectedPopUp(merch)
    //         }}
    //       />
    //     }
    //   })}
    //   {
    //     selectedPopUp && (
    //       <InfoWindow
    //       position={{
    //         lat: selectedPopUp.lat,
    //         lng: selectedPopUp.lon
    //       }}
    //       onCloseClick={()=>{
    //         setSelectedPopUp(null);
    //       }}
    //       >
    //         <div>
    //           <div>{selectedPopUp.name}</div>
    //           <div>{selectedPopUp.website}</div>
    //         </div>
    //       </InfoWindow>
    //     )
    //   }
    // </GoogleMap>
  );
};

export default Map;