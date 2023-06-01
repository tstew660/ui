import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, LoadScript, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { ClipLoader } from "react-spinners";





export default function QuoteMap({locations}){
    
    const [startCoordinates, setStartCoordinates] = useState(null);
    const [endCoordinates, setEndCoordinates] = useState(null);

    const GeoCode = () => {
        console.log(locations)
        const coordinateSets = {
            startPosition : {},
            endPosition: {}
        }
        Geocode.setApiKey("AIzaSyCKP7UcjGG-KW3QpH1vZaoV5MZsE1UON8c");
        Geocode.setLocationType("ROOFTOP");
        Geocode.fromAddress(locations.startAddress).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
                setStartCoordinates(response.results[0].geometry.location) 
            },
            (error) => {
              console.error(error);
            }
          );
        
        Geocode.fromAddress(locations.endAddress).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            setEndCoordinates(response.results[0].geometry.location) 
        },
        (error) => {
            console.error(error);
        }
        );
    }

useEffect(() => {
    if (locations != null)
    {
        GeoCode();
    }
    
}, [locations])

const containerStyle = {
    width: "100%",
    height: "250px",
}

const center = {
    lat: 28.626137,
    lng: 79.821603,
}

const mapClicked = (event) => { 
    console.log(event.latLng.lat(), event.latLng.lng()) 
}

const markerClicked = (marker, index) => {  
    setActiveInfoWindow(index)
    console.log(marker, index) 
}

const markerDragEnd = (event, index) => { 
    console.log(event.latLng.lat())
    console.log(event.latLng.lng())
}
  return (
    // Important! Always set the container height explicitly
    <div class="w-full h-full">
        
        {startCoordinates != null && endCoordinates != null ?
        
        <LoadScript googleMapsApiKey='AIzaSyCKP7UcjGG-KW3QpH1vZaoV5MZsE1UON8c'>
            {console.log(startCoordinates)}
            <GoogleMap 
                mapContainerStyle={containerStyle} 
                center={startCoordinates} 
                zoom={15}
                onClick={mapClicked}
            >
                    <MarkerF 
                        key={0} 
                        position={startCoordinates}
                        label={"Start"}
                        draggable={false} 
                    >
                    </MarkerF>
                    <MarkerF 
                        key={1} 
                        position={endCoordinates}
                        label={"End"}
                        draggable={false}
                    >
                    </MarkerF>
            </GoogleMap>
        </LoadScript>
:
<ClipLoader /> }
    </div>
  );
}