import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm,useFieldArray } from "react-hook-form";
import { useState } from "react";
import PalletTypes from "../../data/PalletTypes.json"
import {TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/20/solid";
import { setCommodities } from "../../features/load/loadSlice";
import CreateLoadPages from "../../data/CreateLoadPages.json"
import { useGetAllEquipmentQuery } from "../../services/auth/authService";

export default function Commodity() {
  const [currentPage, setCurrentPage] = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const load = useSelector((state) => state.load);
  const { register, control, watch, setValue, handleSubmit } = useForm({ defaultValues: load});
  const { data, isFetching } = useGetAllEquipmentQuery();
  

  const [activeLoadForm, setActiveLoadForm] = useState(load.commodity.length);
  const [showLoadForm, setShowLoadForm] = useState(0);
  const [palletsSelected, setPalletsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadLength, setLoadLength] = useState(load.commodity.length);
  const [selectedDims, setSelectedDims] = useState(PalletTypes[0].dims);
  const [totalWeight, setTotalWeight] = useState(load.totalWeight);

  const onSubmit = (data) => {
    console.log(data)
    setCurrentPage(CreateLoadPages[currentPage.order]);
    dispatch(setCommodities(data));
    navigate(`../${currentPage.nextPage}`);
  };

  const { fields, append, remove } = useFieldArray({ name: 'commodity', control });
  const watchAllFields = watch();

  const addLoad = () => {
    setSelectedDims(PalletTypes[0].dims);
    setIsEditing(false);
    setLoadLength(loadLength + 1);
    setActiveLoadForm(loadLength);
    append({});
    setShowLoadForm(true);
    setPalletsSelected(false);
  }

  const submitLoad = (index) => {
    setSelectedDims(PalletTypes[0].dims);
    setIsEditing(false);
    console.log("added:" + index);
    setActiveLoadForm(-1);
    setTotalWeight(parseInt(parseInt(watchAllFields.commodity[index].weight) + parseInt(totalWeight)));
    let weight = parseInt(parseInt(watchAllFields.commodity[index].weight) + parseInt(totalWeight));
    setValue('totalWeight', weight);
    setShowLoadForm(false);
    setPalletsSelected(false);
  }

  const removeLoad = (index) => {
    setSelectedDims(PalletTypes[0].dims);
    setLoadLength(loadLength - 1);
    console.log("removed:" + index);
    setIsEditing(false);
    setActiveLoadForm(fields.length - 1);
    setTotalWeight(parseInt(parseInt(totalWeight) - parseInt(watchAllFields.commodity[index].weight)));
    let weight = parseInt(parseInt(totalWeight) - parseInt(watchAllFields.commodity[index].weight));
    setValue('totalWeight', weight);
    remove(index);
    setShowLoadForm(false);
    setPalletsSelected(false);
  }

  const cancelLoad = (index) => {
    setSelectedDims(PalletTypes[0].dims);
    setIsEditing(false);
    console.log("cancelled:" + index);
    setActiveLoadForm(null);
    setShowLoadForm(false);
    setPalletsSelected(false);
  }

  const editLoad = (index) => {
    setIsEditing(true);
    console.log("updating:" + index);
    setActiveLoadForm(index);
    setShowLoadForm(true);
    setPalletsSelected(false);
  }

  const setDims = (e) => {
    
    const dim = PalletTypes.filter((x) => x.dims == e.target.value);
    console.log(dim)
    setValue(`commodity.${activeLoadForm}.length`, dim[0].l);
    setValue(`commodity.${activeLoadForm}.width`, dim[0].w);
    setValue(`commodity.${activeLoadForm}.height`, dim[0].h);
    console.log(dim);
  }

  return (
    <form class="h-full flex pt-8 pb-4 flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
        <div class="flex-col flex gap-y-4">
            <h1>Commodity List</h1>
            <div class="mx-auto border p-4 w-full">
                  <ul>
                  {fields.map((item, index) => {
                    return (
                    <div class="pb-4 w-full">
                      {index == activeLoadForm ? 
                        <li class=" bg-white rounded-lg p-6 drop-shadow-md" key={item.id}>
                          <h1 class="text-lg font-semibold pb-4">{!isEditing ? "Commodity " + (index + 1) : watchAllFields.commodity[index].name}</h1>
                          <div>
                    <div class="w-full mx-auto flex pb-4">
                      <fieldset class="grid lg:h-20 h-24 w-1/2 lg:gap-2 gap-y-4">
                        <legend class="text-black pb-4 text-left w-full">Commodity Name</legend>
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Commodity Name" type="text" name="commodity.name" {...register(`commodity.${index}.name`, { required: true })} />
                      </fieldset>
                    </div>
                        
                    <div class="w-full mx-auto flex pb-4">
                      <fieldset class="grid lg:grid-cols-5 grid-cols-1 lg:gap-2 gap-y-4">
                        <legend class="text-black pb-4 text-left w-full">Package Type</legend>
                        <div class="col-span-4">
                          <ul class="grid w-full gap-4 md:grid-cols-2">
                            <li>
                                <input id="field-pallets" type="radio" value="Pallets" name="commodity.type" {...register(`commodity.${index}.type`, { required: true })} class="hidden peer" required />
                                <label for="field-pallets" onClick={() => setPalletsSelected(true)} class="inline-flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-yellow-600 hover:text-gray-600 hover:bg-gray-100">                           
                                    <div class="block">
                                        <div class="w-full text-lg">Pallets</div>
                                    </div>
                                </label>
                            </li>
                            <li>
                                <input id="field-boxes" type="radio" value="Boxes/Crates" name="commodity.type" {...register(`commodity.${index}.type`, { required: true})}  class="hidden peer" />
                                <label for="field-boxes" onClick={() => setPalletsSelected(false)} class="inline-flex items-center justify-center w-full p-2 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-yellow-600 hover:text-gray-600 hover:bg-gray-100">
                                    <div class="block">
                                        <div class="w-full text-lg">Boxes/Crates</div>
                                    </div>
                                </label>
                            </li>
                          </ul>
                      </div>
                      <input class="w-full border border-slate-400 h-full pl-2 col-span-1 py-2" placeholder="# of units" type="number" name="commodity.numberOfUnits" {...register(`commodity.${index}.numberOfUnits`, { required: true})} />
                      </fieldset>
                    </div>
                    {palletsSelected ?
                    <div class="w-full mx-auto pb-4">
                      <fieldset class="lg:h-20 h-24 grid lg:grid-cols-3 gap-4">
                        <legend class="text-black pb-4 text-left w-full">Pallet Type</legend>
                        <select class="w-full border border-slate-400 h-full pl-2" name="commodity.palletType" {...register(`commodity.${index}.palletType`, { required: false, onChange: (e) => setDims(e) })}>
                            {PalletTypes.map((x) => 
                              <option>{x.dims}</option>
                            )}
                        </select>
                      </fieldset>
                    </div> : <></> }
                    <div class="w-full mx-auto pb-4">
                      <fieldset class="h-20 grid lg:grid-cols-8 grid-cols-4 gap-1 gap-y-4">
                        <legend class="text-black pb-4 text-left">Size</legend>
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="L" type="number" name="commodity.length" {...register(`commodity.${index}.length`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="W" type="number" name="commodity.width" {...register(`commodity.${index}.width`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="H" type="number" name="commodity.height" {...register(`commodity.${index}.height`, { required: true })} />
                        <p class="bg-slate-100 h-full flex place-content-center place-items-center">in</p>
                        <div class="col-span-1"></div>
                        <input class="w-full border border-slate-400 h-full pl-2 col-span-2" placeholder="Weight" type="number" name="commodity.weight" {...register(`commodity.${index}.weight`, { required: true})} />
                        <p class="bg-slate-100 h-full flex place-content-center place-items-center">lbs</p>
                      </fieldset>
                    </div>
                    <div class="h-20 w-full pt-2 flex flex-row gap-x-2 justify-end place-items-end">
                      {isEditing ? 
                      <button class="bg-transparent h-3/4 text-black rounded-full w-32" type="button" onClick={() => cancelLoad(index)}> Cancel </button> :
                      <button class="bg-transparent h-3/4 text-black rounded-full w-32" type="button" onClick={() => removeLoad(index)}> Delete </button>
                    }
                      <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-3/4 text-black rounded-full w-32" onClick={() => submitLoad(index)}>Confirm</button>
                    </div>
                  </div>
                        
                      </li> : 
                      <div class="flex flex-row bg-white h-8 place-content-center place-items-center rounded-lg p-6 drop-shadow-md justify-between">
                      <div class="flex flex-row gap-x-3 ">
                        <p class="font-semibold">{watchAllFields.commodity[index].name }</p>

                      </div>
                      <div>
                        
                        <button class="pr-4" type="button" onClick={() => editLoad(index)}>
                        <PencilIcon class="h-6"/>
                        </button>
                        
                        <button type="button" onClick={() => removeLoad(index)}>
                        <TrashIcon class="h-6"/>
                        </button>
                        </div>
                        </div>}
                      </div>
                    );
                  })}
                </ul>
                {!showLoadForm ? 
                  <button type="button" onClick={addLoad} class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full text-sm flex flex-row w-40 place-content-center place-items-center">
                    <PlusIcon class="h-8" />
                    <p class="p-1">Add a Commodity</p>
                  </button> :
                  <></>}
                </div>
                <h1>Additional Load Info</h1>
                <div class="border p-4">
                    <div class="grid grid-cols-2 lg:gap-2 gap-y-4">
                    <div class="w-3/4">
                    <legend class="text-black pb-4 text-left">Truck Type</legend>
                    {data &&
                        <fieldset class="h-8">
                        <select class="w-full border border-slate-400 h-full pl-2" type="text" name="truckType" {...register(`truckType`, { required: false })} >
                            {data.map((x) => 
                              <option value={x.id}>{x.name}</option>
                            )} 
                        </select>
                        </fieldset>}
                    </div>
                    <div class="w-3/4">
                    <legend class="text-black pb-4 text-left">Total Weight</legend>
                        <fieldset class="h-8">
                        <input class="w-full border border-slate-400 h-full pl-2" defaultValue={totalWeight} type="number" name="totalWeight" {...register(`totalWeight`, { required: true })} />
                        </fieldset>
                    </div>
                    </div>
                    <div class="pt-6 mx-auto">
                    <legend class="text-black pb-4 text-left">Special Instructions</legend>
                    <fieldset class="lg:h-40 h-40">
                        <textarea class="w-full border border-slate-400 h-full pl-2" type="text" name="specialInstructions" {...register("specialInstructions", { required: false })} />
                    </fieldset>
                    </div>
                </div>
                </div>
                <div class="h-20 w-full flex place-content-end pt-6 pb-6">
                  <button class="bg-transparent  border border-yellow-500 hover:border-yellow-600 h-12 text-black rounded-full w-32" type="submit">{currentPage.prettyNextPage}</button>
                </div>
    </form>
  );
}