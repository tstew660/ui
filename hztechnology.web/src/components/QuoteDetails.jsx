import { useEffect, useState } from "react";
import QuoteMap from "./QuoteMap"
import { ClipLoader } from "react-spinners";
import { EnvelopeIcon, PhoneIcon, ArrowUpCircleIcon, ArrowDownCircleIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { useCalculateRateMutation, useUpdateQuoteMutation } from '../services/auth/authService'
import PostLoadForm from "./PostLoadForm";

export default function QuoteDetails({selectedQuote, isFetching}) {
    console.log(selectedQuote)
    const [locations, setLocations] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [showPostLoadModal, setShowPostLoadModal] = useState(false);
    const [activeLoadList, setActiveLoadList] = useState([]);

    useEffect(() => {
        if (selectedQuote != null)
        {
            if (locations == null) {
                setLocations({
                    startAddress: selectedQuote.shipmentAddress.city + " " + selectedQuote.shipmentAddress.state,
                    endAddress: selectedQuote.destinationAddress.city + " " + selectedQuote.destinationAddress.state
                  });
            }
            else if (locations.startAddress != selectedQuote.shipmentAddress.city + " " + selectedQuote.shipmentAddress.state && locations.endAddress != selectedQuote.destinationAddress.city + " " + selectedQuote.destinationAddress.state) {
                setLocations({
                  startAddress: selectedQuote.shipmentAddress.city + " " + selectedQuote.shipmentAddress.state,
                  endAddress: selectedQuote.destinationAddress.city + " " + selectedQuote.destinationAddress.state
                });
            }
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

      const [calculateRate, { isLoadingCalculate }] = useCalculateRateMutation();

      const submitCalculateRate = () => {
        let clonedObject = {...selectedQuote}
        clonedObject = {...clonedObject, totalDistance: parseInt(directionsResponse.routes[0].legs[0].distance.text.replace(/\D/g,''))}
        console.log(clonedObject);
        calculateRate(clonedObject)
        .unwrap()
        .then(() => {})
        .then((error) => {
        console.log(error)
      })
      }

    return (
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
                <div class="px-2 pt-4 flex flex-col gap-y-4">
                <div class="flex flex-row justify-between text-8">
                    <h1 class=" font-semibold">{selectedQuote.shipper.name}</h1>
                    <div class="flex flex-row gap-x-4">
                    <a class="" href={'tel:' + selectedQuote.shipper.phone}><PhoneIcon class=" h-6" /></a>
                    <a class="" href={'mailto:' + selectedQuote.shipper.email}><EnvelopeIcon class=" h-6" /></a>
                    </div>
                    
                </div>
                <div class="">
                <h1 class="pb-4 font-semibold">Trip</h1>
                    {directionsResponse != null ? 
                    <>
                    <div class="flex flex-row gap-x-2">
                    <ArrowUpCircleIcon class="h-8"></ArrowUpCircleIcon>
                    <h3 class="font-bold">{selectedQuote.shipmentAddress.city} {selectedQuote.shipmentAddress.state}</h3>
                    
                    <p>0 mi</p>
                    
                    </div>
                    <div class="flex flex-row gap-x-2">
                    <ArrowDownCircleIcon class=" h-8"></ArrowDownCircleIcon>
                    <h3 class="font-bold  py-2">{selectedQuote.destinationAddress.city} {selectedQuote.destinationAddress.state} </h3>
                    
                    <p>{directionsResponse.routes[0].legs[0].distance.text}</p>
                    
                    </div>
                    </> : <ClipLoader />}
                </div>
                <div class="">
                    <h1 class="font-semibold">Pick Up Date</h1>
                    <p>{new Date(selectedQuote.pickUpDate).toLocaleString().split(',')[0]}</p>
                    <h1 class="font-semibold">Delivery Date</h1>
                    <p>{new Date(selectedQuote.deliveryDate).toLocaleString().split(',')[0]}</p>
                </div>
                <div class="col-span-2">
                            <h1 class="font-semibold">Special Instructions</h1>
                            <p>{selectedQuote.specialInstructions}</p>
                </div>
                <div>
                    <h1 class="font-semibold">Actions</h1>
                    <div>
                        <button onClick={() => setShowPostLoadModal(true)}>Create Load</button>
                        {showPostLoadModal ? (
                            <PostLoadForm setShowPostLoadModal={setShowPostLoadModal} selectedQuote={selectedQuote} /> 
                        ) : null}
                    </div>
                </div>
                <div>
                <h1 class="font-semibold">Rates</h1>
                    {selectedQuote.carrierRate != null ?
                    <div>Carrier Rate: ${selectedQuote.carrierRate}</div> :
                    <div>
                        {isLoadingCalculate || isFetching ?
                        <ClipLoader />  :
                        <button class="pb-4 font-semibold" onClick={submitCalculateRate}>Calculate Rate</button>     
                    }
                    </div> }
                </div>
                <div>
                    <h1 class="pb-4 font-semibold">Loads</h1>
                    {selectedQuote.commodity.map((x) => 
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