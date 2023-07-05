import { useState } from "react";
import LocationSearchBox from "../LocationSearchBox";
import { ArrowUpCircleIcon, ArrowDownCircleIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { ArrowCircleDown } from "heroicons-react";


export default function Locations() {
    const [locations, setLocations] = useState({});
    
    
    return (
        <div>
            <div class="h-full pt-8 pb-4 flex flex-col justify-between">
            <div class="flex flex-col gap-y-8">
                <div class="flex gap-x-3">
                    <ArrowUpCircleIcon class="pt-4 h-12" />
                    <div>
                    <h1 class="pb-2">Pick Up Location</h1>
                    <LocationSearchBox setLocations={setLocations} stop="PickUp" />
                    </div>
                    
                </div>
                <div class="flex gap-x-3">
                    <ArrowDownCircleIcon class="pt-4 h-12" />
                    <div>
                    <h1 class="pb-2">Drop Off Location</h1>
                    <LocationSearchBox setLocations={setLocations} stop="DropOff" />
                    </div>
                    
                </div>
                </div>
            </div>
            <form class="h-full pt-8 pb-4 flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <div class="w-full mx-auto flex pb-4">
                      <fieldset class="grid grid-cols-2 lg:h-20 h-24 w-1/2 lg:gap-2 gap-y-4">
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Street Address" type="text" name="shipmentAddress.streetAddress" {...register(`carrier.streetAddress`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="City" type="text" name="shipmentAddress.city" {...register(`shipmentAddress.city`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="State" type="text" name="shipmentAddress.state" {...register(`shipmentAddress.state`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="State" type="text" name="shipmentAddress.zipCode" {...register(`shipmentAddress.zipCode`, { required: true })} />
                      </fieldset>
                    </div>
                    </div>
                    <div class="h-20 w-full flex place-content-end pt-6 pb-6">
                  <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-12  text-black rounded-full w-32" type="submit">{currentPage.prettyNextPage}</button>
                </div>
                        
                    
                
    </form>
        </div>
        

    );
}