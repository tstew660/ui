import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect, useState } from 'react'
import Error from './Error'
import { ClipLoader } from "react-spinners"
import { useCreateLoadFromQuoteMutation, useUpdateQuoteMutation } from '../services/auth/authService'
import { addCharge, editCharge } from "../features/load/loadSlice";
import CurrencyInput from 'react-currency-input-field';

export default function CreateRateLineItemModal({setAddLineItemModal, accessorials, type, charge, isEdit, id}) {
  console.log(charge)
    const dispatch = useDispatch();
    const [lineItem, setLineItem] = useState(charge != null && isEdit ? charge : {
      accessorial: null,
      rate: null,
      notes: null,
      quantity: 0,
      total: null
    })

    const addLineItem = () => {
        (isEdit ? 
        dispatch(editCharge({lineItem, id})) :
        dispatch(addCharge(lineItem)))
        setAddLineItemModal(false);
      }

    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Add Line Item
                  </h3>
                  <button
                    className=" ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setAddLineItemModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                
                  <div class="flex flex-col gap-y-8 py-4 place-items-center place-content-center w-96 mx-auto h-3/5">
                    <fieldset class="w-3/5 flex flex-col gap-y-4">
                      <div>
                        <legend class="text-black pb-1 text-left w-full">Category</legend>
                        {accessorials && 
                        <select value={lineItem.accessorial} defaultValue={lineItem.accessorial} class="w-full border border-slate-400 h-8 pl-2" onChange={(e) => 
                          setLineItem({
                          accessorial: e.target.value,
                          rate: lineItem.rate,
                          quantity: lineItem.quantity,
                          notes: lineItem.notes,
                          chargeType: type,
                          total: lineItem.total})}>
                            <option value="none" >Select a category</option>
                            {accessorials.map((x) => 
                              <option>{x.name}</option>
                            )}
                        </select> }
                      </div>
                      <div class="">
                        <legend class="text-black pb-1 text-left w-full">Rate</legend>
                        <CurrencyInput
                          id="rate"
                          prefix="$"
                          defaultValue={lineItem.rate}
                          name="rate"
                          className="w-full border border-slate-400 h-8 pl-2"
                          placeholder="Enter rate"
                          decimalsLimit={2}
                          onValueChange={(value) => setLineItem({
                            accessorial: lineItem.accessorial,
                            rate: value,
                            quantity: lineItem.quantity,
                            notes: lineItem.notes,
                            chargeType: type,
                            total: value * lineItem.quantity})}
                        />
                      </div>
                      <div class="">
                        <legend class="text-black pb-1 text-left w-full">Quantity</legend>
                        <input value={lineItem.quantity} defaultValue={lineItem.quantity} placeholder="Enter Quantity" class="w-full border border-slate-400 h-8 pl-2" type="number" onChange={(e) => 
                        setLineItem({
                          accessorial: lineItem.accessorial,
                          rate: lineItem.rate,
                          quantity: parseInt(e.target.value),
                          notes: lineItem.notes,
                          chargeType: type,
                          total: parseInt(e.target.value) * lineItem.rate})} />
                      </div>
                      <div class="">
                        <legend class="text-black pb-1 text-left w-full">Notes</legend>
                        <textarea value={lineItem.notes} defaultValue={lineItem.notes} placeholder="Line Item Notes" class="w-full border border-slate-400 h-8 pl-2" onChange={(e) => 
                        setLineItem({
                          accessorial: lineItem.accessorial,
                          rate: lineItem.rate,
                          quantity: lineItem.quantity,
                          notes: e.target.value,
                          chargeType: type,
                          total: lineItem.total})} />
                      </div>
                    </fieldset>
                  </div>
                  <div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                        <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setAddLineItemModal(false)}
                        >
                        Close
                        </button>
                        <button type="button" class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full w-20" onClick={addLineItem}>
                            {!isEdit ? <p>Add</p> : <p>Update</p> }
                        </button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        
    )
    
}