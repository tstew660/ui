import { StandaloneSearchBox } from '@react-google-maps/api';
import { useRef } from 'react';

export default function LocationSearchBox({setLocations, locations, stop}) {
    const inputRef = useRef();

    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 
            console.log(place)
            let loc = {
                stop: stop,
                prettyAddress: !place.types.includes("locality") ? place.name : "N/A",
                streetNumber: place.address_components.filter(val => val.types.includes("street_number"))[0] && place.address_components.filter(val => val.types.includes("street_number"))[0].long_name,
                streetName: place.address_components.filter(val => val.types.includes("route"))[0] && place.address_components.filter(val => val.types.includes("route"))[0].long_name,
                city: place.address_components.filter(val => val.types.includes("locality"))[0] && place.address_components.filter(val => val.types.includes("locality"))[0].long_name,
                state: place.address_components.filter(val => val.types.includes("administrative_area_level_1"))[0] && place.address_components.filter(val => val.types.includes("administrative_area_level_1"))[0].long_name,
                zipCode: !place.types.includes("locality") ? place.address_components.filter(val => val.types.includes("postal_code"))[0] && place.address_components.filter(val => val.types.includes("postal_code"))[0].long_name : "N/A",
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                formattedAddress: place.formatted_address
            }
            if (stop == "PickUp") {
                setLocations({
                    pickUp: loc,
                    dropOff: locations.dropOff
                })
            }
            else {
                setLocations({
                    pickUp: locations.pickUp,
                    dropOff: loc
                })
            }
        } 
    }

    const textBoxValue = stop == "PickUp" ? locations.pickUp.formattedAddress : locations.dropOff.formattedAddress
    return (
                <StandaloneSearchBox
                    onLoad={ref => inputRef.current = ref}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <input
                        value={textBoxValue}
                        type="text"
                        class="form-control w-64 border border-slate-400 h-8 pl-2"
                        placeholder="Enter Location"
                    />
                </StandaloneSearchBox>
    );
}