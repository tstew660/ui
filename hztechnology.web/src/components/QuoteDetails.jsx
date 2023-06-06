import { useEffect, useState } from "react";
import QuoteMap from "./QuoteMap"
import { ClipLoader } from "react-spinners";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

export default function QuoteDetails({selectedQuote}) {
    console.log(selectedQuote)
    const [locations, setLocations] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    useEffect(() => {
        if (selectedQuote != null)
        {
          setLocations({
            startAddress: selectedQuote.original.shipmentAddress.city + " " + selectedQuote.original.shipmentAddress.state,
            endAddress: selectedQuote.original.destinationAddress.city + " " + selectedQuote.original.destinationAddress.state
          })
          
        } 
        else{
          console.log("token is not valid")
        }
      }, [selectedQuote])
    return(
        <div class="w-full h-full">
            <div class="border-y border-r border-gray-300 h-16"></div>
            {selectedQuote != null ? 
            <div class="flex flex-col border-gray-300 border-l h-screen overflow-auto">
                {locations != null ?
                <div class="h-64">
                    {console.log(locations)}
                    <QuoteMap locations={locations} directionsResponse={directionsResponse} setDirectionsResponse={setDirectionsResponse}/>
                </div> :
                <ClipLoader />}
                <div class="px-2 flex flex-col gap-y-4">
                <div class="flex flex-row place-items-center text-8">
                    <h1 class="basis-3/5">{selectedQuote.original.shipper.name}</h1>
                    <a class="basis-1/5" href={'tel:' + selectedQuote.original.shipper.phone}><PhoneIcon class=" h-8" /></a>
                    <a class="basis-1/5" href={'mailto:' + selectedQuote.original.shipper.email}><EnvelopeIcon class=" h-8" /></a>
                </div>
                <div class="">
                    {directionsResponse != null && 
                    <>
                    <h1>Trip</h1>
                    <h3>{selectedQuote.original.shipmentAddress.city} {selectedQuote.original.shipmentAddress.state} 0 mi</h3>
                    <h3>{selectedQuote.original.destinationAddress.city} {selectedQuote.original.destinationAddress.state} {directionsResponse.routes[0].legs[0].distance.text}</h3>
                    </>}
                </div>
                <div class="">
                    <h1>Pick Up Date</h1>
                    <p>{selectedQuote.original.pickUpDate}</p>
                    <h1>Delivery Date</h1>
                    <p>{selectedQuote.original.deliveryDate}</p>
                </div>
                <div>
                    <h1>Load</h1>
                    <div class="grid grid-cols-2 pt-4 gap-y-3">
                        <div>
                            <h2>Cargo</h2>
                            <p>{selectedQuote.original.commodity.name}</p>
                        </div>
                        <div>
                            <h2>Weight</h2>
                            <p>{selectedQuote.original.commodity.weight}</p>
                        </div>
                        <div>
                            <h2>Dim</h2>
                            <p>{selectedQuote.original.commodity.dimmensions}</p>
                        </div>
                        <div>
                            <h2>Trailer</h2>
                            <p>Flatbed</p>
                        </div>
                        <div class="col-span-2">
                            <h1>Special Instructions</h1>
                            <p>{selectedQuote.original.specialInstructions}</p>
                        </div>
                        
                    </div>
                    
                </div>
                </div>
            </div> :
            <p>No Quote Selected</p> }
        </div>
    )
}