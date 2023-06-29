import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useForm,useFieldArray } from "react-hook-form";
import { useState } from "react";
import PalletTypes from "../../data/PalletTypes.json"
import {TrashIcon, PencilIcon} from "@heroicons/react/20/solid";
import { setCommodities } from "../../features/load/loadSlice";
import CreateLoadPages from "../../data/CreateLoadPages.json"

export default function Commodity() {
  const [currentPage, setCurrentPage] = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const commodity = useSelector((state) => state.load.commodity);
  console.log(commodity)
  const { register, control, handleSubmit } = useForm({ defaultValues: {commodity: commodity} });

  const [activeLoadForm, setActiveLoadForm] = useState(commodity.length);
  const [showLoadForm, setShowLoadForm] = useState(0);
  const [palletsSelected, setPalletsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loadLength, setLoadLength] = useState(commodity.length);
  const [selectedDims, setSelectedDims] = useState(PalletTypes[0].dims);

  const onSubmit = (data) => {
    setCurrentPage(CreateLoadPages[currentPage.order]);
    dispatch(setCommodities(data));
    navigate(`../${currentPage.nextPage}`);
  };

  const { fields, append, remove } = useFieldArray({ name: 'commodity', control });

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
    setShowLoadForm(false);
    setPalletsSelected(false);
  }

  const removeLoad = (index) => {
    setSelectedDims(PalletTypes[0].dims);
    setLoadLength(loadLength - 1);
    console.log("removed:" + index);
    setIsEditing(false);
    setActiveLoadForm(fields.length - 1);
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
    
    const dim = PalletTypes.filter((x) => x.dims == e.target.value)
    console.log(dim);
    setSelectedDims(dim);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

            <div class="w-4/5 mx-auto">
                <legend class="text-black pb-4 text-left">Commodity Information</legend>
                  <ul>
                  {fields.map((item, index) => {
                    return (
                    <div class="pb-4 w-full">
                      {index == activeLoadForm ? 
                        <li class=" bg-white rounded-lg p-6 drop-shadow-xl" key={item.id}>
                          <h1 class="text-lg font-semibold pb-4">Load {index + 1}</h1>
                          <div>
                    <div class="w-full mx-auto flex pb-4">
                      <fieldset class="grid lg:h-20 h-24 w-1/2 lg:gap-2 gap-y-4">
                        <legend class="text-black pb-4 text-left w-full">Load Name</legend>
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Load Name" type="text" name="commodity.name" {...register(`commodity.${index}.name`, { required: true })} />
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
                        <input class="w-full border border-slate-400 h-full pl-2" defaultValue={selectedDims[0].l} placeholder="L" type="number" name="commodity.length" {...register(`commodity.${index}.length`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" defaultValue={selectedDims[0].w} placeholder="W" type="number" name="commodity.width" {...register(`commodity.${index}.width`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" defaultValue={selectedDims[0].h} placeholder="H" type="number" name="commodity.height" {...register(`commodity.${index}.height`, { required: true })} />
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
                      <div class="flex flex-row bg-white h-8 place-content-center place-items-center rounded-lg p-6 drop-shadow-xl justify-between">
                      <div class="flex flex-row gap-x-3 ">
                        <p class="font-semibold">Load {index + 1} </p>

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
                  <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-12 text-black rounded-full w-32" onClick={addLoad}>Add Load</button> :
                  <></>}
                </div>
                <div class="w-4/5 pt-6 mx-auto">
                  <fieldset class="lg:h-40 h-80">
                    <textarea class="w-full border border-slate-400 h-full pl-2" placeholder="Special Instructions" type="text" name="specialInstructions" {...register("specialInstructions", { required: false })} />
                  </fieldset>
                </div>
                <div class="h-20 w-32 flex place-content-end pt-2 bg-blue-50">
                  <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-3/4 text-black rounded-full w-32" type="submit">{currentPage.prettyNextPage}</button>
                </div>
    </form>
  );
}