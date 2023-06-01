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
        <div class="w-full border border-indigo-600">
            {selectedQuote != null ? 
            <div class="flex flex-col">
                {locations != null ?
                <div class="h-48">
                    {console.log(locations)}
                    <QuoteMap locations={locations}/>
                </div> :
                <ClipLoader />}
                <div class="">
                    <h1>{selectedQuote.original.quoteNumber}</h1>
                    <h3>{selectedQuote.original.shipmentAddress.city} {selectedQuote.original.shipmentAddress.state}</h3>
                    <h3>{selectedQuote.original.destinationAddress.city} {selectedQuote.original.destinationAddress.state}</h3>
                </div>
                
            </div> :
            <p>No Quote Selected</p> }
        </div>
    )
}