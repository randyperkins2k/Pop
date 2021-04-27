import React, { useState } from 'react';
import { 
  GoogleMap, 
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import { mapStyles } from './mapstyles'; 
const libraries = ["places"];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}
const center = {lat: 29.956124, lng: -90.090509};
const options = {
  styles: [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "32"
            },
            {
                "lightness": "-3"
            },
            {
                "visibility": "on"
            },
            {
                "weight": "1.18"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-70"
            },
            {
                "lightness": "14"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    // {
    //     "featureType": "road",
    //     "elementType": "labels",
    //     "stylers": [
    //         {
    //             "visibility": "off"
    //         }
    //     ]
    // },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "100"
            },
            {
                "lightness": "-14"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": "12"
            }
        ]
    }
  ],
  disableDefaultUI: true
}

const Map = ({ merchData }) => {
  const [ selectedPopUp, setSelectedPopUp ] = useState(null);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: 'AIzaSyDwWzORKJaC58xsnhwOmI2YwmUJS1iGMEU',
    libraries
  })
  
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

    >
     {merchData.merchants.map(merch => {
        if (merch.isOpen) {
          return <Marker
            key={merch.id}
            position={{
              lat: merch.lat,
              lng: merch.lon
            }}
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
            <div>
              <div>{selectedPopUp.name}</div>
              <div>{selectedPopUp.website}</div>
            </div>
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