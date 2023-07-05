import { StandaloneSearchBox } from '@react-google-maps/api';
import { useRef } from 'react';

export default function LocationSearchBox({setLocations, stop}) {
    const inputRef = useRef();

    const handlePlaceChanged = () => { 
        const [ place ] = inputRef.current.getPlaces();
        if(place) { 
            setLocations({
                stop: stop,
                address: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            })
        } 
        console.log({
            stop: stop,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        })
    }

 
    return (
                <StandaloneSearchBox
                    onLoad={ref => inputRef.current = ref}
                    onPlacesChanged={handlePlaceChanged}
                >
                    <input
                        type="text"
                        class="form-control w-64 border border-slate-400 h-full pl-2"
                        placeholder="Enter Location"
                    />
                </StandaloneSearchBox>
    );
}