import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useForm,useFieldArray } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import PalletTypes from "../../data/PalletTypes.json"
import {TrashIcon, PencilIcon} from "@heroicons/react/20/solid";
import { setCarrier, setCommodities } from "../../features/load/loadSlice";
import CreateLoadPages from "../../data/CreateLoadPages.json"

import { useGetAllShippersQuery } from '../../services/auth/authService'

import { ClipLoader } from "react-spinners"


export default function Carrier() {
    const [currentPage, setCurrentPage] = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const load = useSelector((state) => state.load);
  const { register, control, handleSubmit, setValue } = useForm({ defaultValues: load});
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const { data, isFetching } = useGetAllShippersQuery();
  const [selectedCarrier, setSelectedCarrier] = useState(false);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setFilteredData([]);
            if(selectedCarrier) {
                setInputValue('')
            }
            
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);


  const onSubmit = (data) => {
    console.log(data)
    setCurrentPage(CreateLoadPages[currentPage.order]);
    dispatch(setCarrier(data));
    navigate(`../${currentPage.nextPage}`);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    let filtered = [];
    if(value == "") {
        filtered = [];
    }
    else {
        filtered = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
    );
    }
    // Filter the data based on the input value
      
    setFilteredData(filtered);
  };

  const setCarrierFromDropdown = (item) => {
    setInputValue(item.name)
    console.log(item);
    setSelectedCarrier(true);
    setValue('carrier', {
        name: item.name,
        email: item.email,
        fax: item.fax,
        phone: item.phone
    })
    setFilteredData([]);
  }
    return (
        <form class="h-full  pt-8 pb-4 flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
            <div class="flex flex-col gap-y-4">
                <h1>Carrier</h1>
                <div class="border p-4">
                    <div class="w-full mx-auto h-48 flex pb-4">
                      <fieldset class="w-1/2">
                      <legend class="text-black pb-4 text-left w-full">Carrier Lookup</legend>
                        <div ref={wrapperRef}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Search..."
                            class="border border-slate-400 pl-2 h-10 w-full"

                        />
                        <ul class="min-h-0 max-h-32 overflow-scroll">
                            {filteredData.map((item) => (
                            <li name="carrier.name" onClick={() => setCarrierFromDropdown(item)} {...register(`carrier.name`, { required: true })} class="pl-2 cursor-pointer hover:bg-gray-200" key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                        </div>
                      </fieldset>
                    </div>
                    <div class="w-full mx-auto flex pb-2 pt-6">
                      <fieldset class="grid lg:h-20 h-24 w-1/2 lg:gap-2 gap-y-4">
                        <legend class="text-black pb-4 text-left w-full">Carrier Info</legend>
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Name" type="text" name="carrier.name" {...register(`carrier.name`, { required: true })} />
                      </fieldset>
                    </div>
                    <div class="w-full mx-auto flex pb-4">
                      <fieldset class="grid grid-cols-2 lg:h-20 h-24 w-1/2 lg:gap-2 gap-y-4">
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Address" type="text" name="carrier.address" {...register(`carrier.address`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Phone" type="text" name="carrier.phone" {...register(`carrier.phone`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Email" type="text" name="carrier.email" {...register(`carrier.email`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Fax" type="text" name="carrier.fax" {...register(`carrier.fax`, { required: true })} />
                      </fieldset>
                    </div>
                    </div>
                    </div>
                    <div class="h-20 w-full flex place-content-end pt-6 pb-6">
                  <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-12  text-black rounded-full w-32" type="submit">{currentPage.prettyNextPage}</button>
                </div>
                        
                    
                
    </form>
  );
}