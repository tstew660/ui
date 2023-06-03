import React, { useState, useEffect } from "react";
import { GoogleMap, InfoWindow, LoadScript, MarkerF, DirectionsRenderer   } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { ClipLoader } from "react-spinners";





export default function QuoteMap({locations}){
    
    
    const [startCoordinates, setStartCoordinates] = useState(null);
    const [endCoordinates, setEndCoordinates] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [loadingRoute, setLoadingRoute] = useState(false)

    async function calculateRoute(coors) {
        console.log(coors)
        const directionsService = new window.google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: coors.startPosition,
          destination: coors.endPosition,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });
        setDirectionsResponse(results);
      }

      function clearRoute() {
        setDirectionsResponse(null);
        setStartCoordinates(null);
        setEndCoordinates(null);
      }

    async function GeoCode() {
        console.log(locations)
        const coordinateSets = {
            startPosition : {},
            endPosition: {}
        }
        Geocode.setApiKey("AIzaSyDzRSInDX2cuzi9bRNUsAqKi-aY9h-BS7g");
        Geocode.setLocationType("ROOFTOP");
        await Geocode.fromAddress(locations.startAddress).then(
            (response) => {
              const { lat, lng } = response.results[0].geometry.location;
              coordinateSets.startPosition = response.results[0].geometry.location
                setStartCoordinates(response.results[0].geometry.location) 
            },
            (error) => {
              console.error(error);
            }
          );
        
        await Geocode.fromAddress(locations.endAddress).then(
        (response1) => {
            const { lat, lng } = response1.results[0].geometry.location;
            coordinateSets.endPosition = response1.results[0].geometry.location
            setEndCoordinates(response1.results[0].geometry.location) 
        },
        (error) => {
            console.error(error);
        }
        );
        return (coordinateSets)
    }

useEffect(() => {
    if (locations != null)
    {
        clearRoute()
            setLoadingRoute(true)
            GeoCode().then((coors) => {
                calculateRoute(coors)})
                .finally(() => {setLoadingRoute(false)})
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
    <LoadScript googleMapsApiKey='AIzaSyDzRSInDX2cuzi9bRNUsAqKi-aY9h-BS7g'>
    <div class="w-full h-full">
        
        
            <GoogleMap 
                mapContainerStyle={containerStyle} 
                center={startCoordinates} 
                zoom={15}
                onClick={mapClicked}
                options={{streetViewControl: false}}
            >
                    {directionsResponse != null && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
            </GoogleMap>
        

    </div>
    </LoadScript>
  );
}