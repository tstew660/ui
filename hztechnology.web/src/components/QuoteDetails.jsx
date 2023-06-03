import { useEffect, useState } from "react";
import QuoteMap from "./QuoteMap"
import { ClipLoader } from "react-spinners";

export default function QuoteDetails({selectedQuote}) {
    console.log(selectedQuote)
    const [locations, setLocations] = useState(null);
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
        <div class="w-full">
            {selectedQuote != null ? 
            <div class="flex flex-col">
                {locations != null ?
                <div class="h-64">
                    {console.log(locations)}
                    <QuoteMap locations={locations}/>
                </div> :
                <ClipLoader />}
                <div class="">
                    <h1>HZQ{selectedQuote.original.quoteNumber}</h1>
                    <h3>Origin {selectedQuote.original.shipmentAddress.city} {selectedQuote.original.shipmentAddress.state}</h3>
                    <h3>Destination {selectedQuote.original.destinationAddress.city} {selectedQuote.original.destinationAddress.state}</h3>
                </div>
                <div class="">
                    <h1>Pick Up Date</h1>
                    <p>{selectedQuote.original.pickUpDate}</p>
                    <h1>Delivery Date</h1>
                    <p>{selectedQuote.original.deliveryDate}</p>
                </div>
                <div class="">
                    <h1>Special Instructions</h1>
                    <p>{selectedQuote.original.specialInstructions}</p>
                </div>
                
            </div> :
            <p>No Quote Selected</p> }
        </div>
    )
}