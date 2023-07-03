import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useForm,useFieldArray } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import PalletTypes from "../../data/PalletTypes.json"
import {TrashIcon, PencilIcon} from "@heroicons/react/20/solid";
import { setShipper, setCommodities } from "../../features/load/loadSlice";
import CreateLoadPages from "../../data/CreateLoadPages.json"

import { useGetAllShippersQuery } from '../../services/auth/authService'

import { ClipLoader } from "react-spinners"


export default function Shipper() {
    const [currentPage, setCurrentPage] = useOutletContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const load = useSelector((state) => state.load);
  const { register, control, handleSubmit, setValue } = useForm({ defaultValues: load});
  const [inputValue, setInputValue] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const { data, isFetching } = useGetAllShippersQuery();
  const [selectedShipper, setSelectedShipper] = useState({});

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            setFilteredData([]);
            if(selectedShipper == null) {
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
    dispatch(setShipper(data));
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

  const setShipperFromDropdown = (item) => {
    setFilteredData([]);
    setInputValue(item.name)
    setSelectedShipper(item);
    setValue('shipper', {
        name: item.name,
        email: item.email,
        fax: item.fax,
        phone: item.phone
    })
  }
    return (
        <form class="h-full pt-8 pb-4 flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <div class="w-full mx-auto h-48 flex pb-4">
                      <fieldset class="w-1/2">
                        <legend class="text-black pb-4 text-left w-full">Shipper Lookup</legend>
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
                            <li name="shipper.name" onClick={() => setShipperFromDropdown(item)} {...register(`shipper.name`, { required: true })} class="pl-2 cursor-pointer hover:bg-gray-200" key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                        </div>
                      </fieldset>
                    </div>
                    <div class="w-full mx-auto flex pb-2 pt-6">
                      <fieldset class="grid lg:h-20 h-24 w-1/2 lg:gap-2 gap-y-4">
                        <legend class="text-black pb-4 text-left w-full">Shipper Info</legend>
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Name" type="text" name="shipper.name" {...register(`shipper.name`, { required: true })} />
                      </fieldset>
                    </div>
                    <div class="w-full mx-auto flex pb-4">
                      <fieldset class="grid grid-cols-2 lg:h-20 h-24 w-1/2 lg:gap-2 gap-y-4">
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Address" type="text" name="shipper.address" {...register(`shipper.address`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Phone" type="text" name="shipper.phone" {...register(`shipper.phone`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Email" type="text" name="shipper.email" {...register(`shipper.email`, { required: true })} />
                        <input class="w-full border border-slate-400 h-full pl-2" placeholder="Fax" type="text" name="shipper.fax" {...register(`shipper.fax`, { required: true })} />
                      </fieldset>
                    </div>
                    </div>
                    <div class="h-20 w-full flex place-content-end pt-6 pb-6">
                  <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-12  text-black rounded-full w-32" type="submit">{currentPage.prettyNextPage}</button>
                </div>
                        
                    
                
    </form>
  );
}