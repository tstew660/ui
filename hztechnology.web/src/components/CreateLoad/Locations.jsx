import { useEffect, useState } from "react";
import LocationSearchBox from "../LocationSearchBox";
import { ArrowUpCircleIcon, ArrowDownCircleIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { ArrowCircleDown } from "heroicons-react";
import { setRouteLocations } from "../../features/load/loadSlice";
import CreateLoadPages from "../../data/CreateLoadPages.json"
import { useForm,useFieldArray } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import QuoteMap from "../QuoteMap";


export default function Locations() {
    const load = useSelector((state) => state.load);
    const [locations, setLocations] = useState({
        pickUp : load.shipmentAddress,
        dropOff: load.destinationAddress
    });
    const [mapLocations, setMapLocations] = useState({
        startPosition: {
            lat: load.shipmentAddress.lat,
            lng: load.shipmentAddress.lng
        },
        endPosition: {
            lat: load.destinationAddress.lat,
            lng: load.destinationAddress.lng
        }})
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [currentPage, setCurrentPage] = useOutletContext();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { register, control, watch, setValue, handleSubmit, formState: { errors } } = useForm({ defaultValues: load});
    const watchStartDate = watch("pickUpDate", new Date()) // you can supply default value as second argument

    const onSubmit = (data) => {
        console.log(data)
        setCurrentPage(CreateLoadPages[currentPage.order]);
        dispatch(setRouteLocations(data));
        navigate(`../${currentPage.nextPage}`);
      };

      useEffect(() => {
            if(locations.pickUp != null) {
                setValue("shipmentAddress", locations.pickUp)
            }
            if (locations.dropOff != null) {
                setValue("destinationAddress", locations.dropOff)
            }
            setMapLocations({
                startPosition: {
                    lat: locations.pickUp.lat,
                    lng: locations.pickUp.lng
                },
                endPosition: {
                    lat: locations.dropOff.lat,
                    lng: locations.dropOff.lng
                }
            })
            console.log(locations)
        
      }, [locations])

      useEffect(() => {
        if(directionsResponse != null) {
            setValue("totalDistance", directionsResponse.routes[0].legs[0].distance.text.replace(/[^0-9$.,]/g, ''))
        }
        
      }, [directionsResponse])
    
    return (
            <form class="h-full pt-8 pb-4 flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
                <div class="flex flex-col gap-y-4">
                    <h1 class="">Pick Up Location</h1>
                    <div class="flex flex-row gap-x-3 justify-between border p-4">
                        <div class="flex gap-x-3 w-full">
                            <ArrowUpCircleIcon class="pt-4 h-14" />
                            <div>
                                <h1 class="pb-2">Search for Pick Up</h1>
                                <LocationSearchBox setLocations={setLocations} locations={locations} stop="PickUp" />
                            </div>
                        </div>
                        <div class="h-full flex flex-col gap-y-2 w-full">
                            <label class="">Pick Up Date</label>
                            <input class="w-48 border border-slate-400 h-8 pl-2" min={new Date().toISOString().split('T')[0]} placeholder="Pick Up Date" type="date" name="pickUpDate" {...register("pickUpDate", { required: true })} />
                            {errors.pickUpDate && <p class="text-red-600">{errors.pickUpDate.message}</p>}
                        </div>
                        <div class="w-full mx-auto pb-4">
                            <legend class="pb-2">Location Details</legend>
                            <fieldset class="grid grid-cols-2 lg:h-20 h-24 w-full lg:gap-2 gap-y-4">
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="Street Address" type="text" name="shipmentAddress.prettyAddress" {...register(`shipmentAddress.prettyAddress`, { required: true })} />
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="City" type="text" name="shipmentAddress.city" {...register(`shipmentAddress.city`, { required: true })} />
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="State" type="text" name="shipmentAddress.state" {...register(`shipmentAddress.state`, { required: true })} />
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="Zip" type="text" name="shipmentAddress.zipCode" {...register(`shipmentAddress.zipCode`, { required: true })} />
                            </fieldset>
                        </div>
                    </div>
                    <h1 class="">Drop Off Location</h1>
                    <div class="flex gap-x-3 border justify-between p-4">
                        <div class="flex gap-x-3 w-full">
                            <ArrowDownCircleIcon class="pt-4 h-14" />
                            <div>
                                <h1 class="pb-2">Search for Drop Off</h1>
                                <LocationSearchBox setLocations={setLocations} locations={locations} stop="DropOff" />
                            </div>
                        </div>
                        <div class="h-full flex flex-col gap-y-2 w-full">
                            <label class="">Delivery Date</label>
                            <input class="w-48 border border-slate-400 h-8 pl-2" min={new Date().toISOString().split('T')[0]} placeholder="Delivery Date" type="date" name="deliveryDate" {...register("deliveryDate", { required: false, validate: (date) => date > watchStartDate || "Delivery date must be after Pick Up Date" })} />
                            {errors.deliveryDate && <p class="text-red-600">{errors.deliveryDate.message}</p>}
                        </div>
                        <div class="w-full mx-auto pb-4">
                            <legend class="pb-2">Location Details</legend>
                            <fieldset class="grid grid-cols-2 lg:h-20 h-24 w-full lg:gap-2 gap-y-4">
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="Street Address" type="text" name="destinationAddress.prettyAddress" {...register(`destinationAddress.prettyAddress`, { required: true })} />
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="City" type="text" name="destinationAddress.city" {...register(`destinationAddress.city`, { required: true })} />
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="State" type="text" name="destinationAddress.state" {...register(`destinationAddress.state`, { required: true })} />
                                <input class="w-full border border-slate-400 h-full pl-2" placeholder="Zip" type="text" name="destinationAddress.zipCode" {...register(`destinationAddress.zipCode`, { required: true })} />
                            </fieldset>
                        </div>
                    </div>
                <h1 class="">Route</h1>
                <div class="border p-4"> 
                    <div>
                        <QuoteMap locations={mapLocations} directionsResponse={directionsResponse} setDirectionsResponse={setDirectionsResponse}/>
                    </div>
                    <div>
                        <legend class="pb-2 pt-4">Mileage</legend>
                        <div class="flex flex-row gap-x-1 h-8">
                        <input class="w-40 border border-slate-400 h-8 pl-2" placeholder="Total Mileage" type="text" name="totalDistance" {...register(`totalDistance`, { required: true })} />
                        <p class="bg-slate-100 h-full flex place-content-center w-8 place-items-center">mi</p>
                        </div>
                    </div> 
                </div>
                </div>  
                <div class="h-20 w-full flex place-content-end pt-6 pb-6">
                  <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-12  text-black rounded-full w-32" type="submit">{currentPage.prettyNextPage}</button>
                </div>    
             
    </form>
    );
}