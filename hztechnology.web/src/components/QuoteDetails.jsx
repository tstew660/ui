import { useEffect, useState } from "react";
import QuoteMap from "./QuoteMap"
import { ClipLoader } from "react-spinners";
import { EnvelopeIcon, PhoneIcon, ArrowUpCircleIcon, ArrowDownCircleIcon } from "@heroicons/react/20/solid";

export default function QuoteDetails({selectedQuote}) {
    console.log(selectedQuote)
    const [locations, setLocations] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [activeLoadList, setActiveLoadList] = useState([]);
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

      const setVisibleLoads = (id) => {
        if(!activeLoadList.includes(id)) {
            setActiveLoadList([...activeLoadList, id])
        }
        else {
            setActiveLoadList(activeLoadList => activeLoadList.filter(item => item !== id ));
        }
      }
    return(
        <div class="w-full h-full">
            <div class="border-y border-r border-gray-300 h-16"></div>
            {selectedQuote != null ? 
            <div class="flex flex-col border-gray-300 border-l h-screen overflow-auto pb-48">
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
                    <h1 class="pb-4">Trip</h1>
                    <div class="flex flex-row gap-x-2">
                    <ArrowUpCircleIcon class=" h-8"></ArrowUpCircleIcon>
                    <h3 class="font-bold">{selectedQuote.original.shipmentAddress.city} {selectedQuote.original.shipmentAddress.state}</h3>
                    <p>0 mi</p>
                    
                    </div>
                    <div class="flex flex-row gap-x-2">
                    <ArrowDownCircleIcon class=" h-8"></ArrowDownCircleIcon>
                    <h3 class="font-bold">{selectedQuote.original.destinationAddress.city} {selectedQuote.original.destinationAddress.state} </h3>
                    <p>{directionsResponse.routes[0].legs[0].distance.text}</p>
                    
                    </div>
                    </>}
                </div>
                <div class="">
                    <h1 class="font-semibold">Pick Up Date</h1>
                    <p>{selectedQuote.original.pickUpDate}</p>
                    <h1 class="font-semibold">Delivery Date</h1>
                    <p>{selectedQuote.original.deliveryDate}</p>
                </div>
                <div class="col-span-2">
                            <h1 class="font-semibold">Special Instructions</h1>
                            <p>{selectedQuote.original.specialInstructions}</p>
                </div>
                <div>
                    <h1 class="pb-4 font-semibold">Loads</h1>
                    {selectedQuote.original.commodity.map((x) => 
                    <div class="pb-4">
                    <div class="drop-shadow-md bg-slate-50 rounded-lg">
                        <button onClick={() => setVisibleLoads(x.id)} class="font-semibold text-left  w-full p-6 ">
                            {x.numberOfUnits} {x.type}
                        </button>
                        {activeLoadList && activeLoadList.includes(x.id) ? 
                        
                        <div class="grid grid-cols-2 p-6 gap-y-3">
                            <div>
                                <h2 class="font-semibold">Cargo</h2>
                                <p>{x.name}</p>
                            </div>
                            <div>
                                <h2 class="font-semibold">Weight</h2>
                                <p>{x.weight}</p>
                            </div>
                            <div>
                                <h2 class="font-semibold">Dim</h2>
                                <p>{x.dimmensions}</p>
                            </div>
                            <div>
                                <h2 class="font-semibold">Trailer</h2>
                                <p>Flatbed</p>
                            </div>
                            <div>
                                <h2 class="font-semibold">Load Type</h2>
                                <p>{x.numberOfUnits} {x.type}</p>
                            </div>
                            <div>
                                <h2 class="font-semibold">Pallet Type</h2>
                                <p>{x.palletType}</p>
                            </div>
                            
                            
                        </div> : <></>}
                    </div>
                    </div>
                    )}      
                </div>
                </div>
            </div> :
            <p>No Quote Selected</p> }
        </div>
    )
}