import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../features/auth/authActions'
import { useEffect } from 'react'
import Error from '../components/Error'
import { ClipLoader } from "react-spinners"
import { useCreateLoadFromQuoteMutation, useUpdateQuoteMutation } from '../services/auth/authService'

export default function PostLoadForm({setShowPostLoadModal, selectedQuote}) {
    const [createLoad, { isLoadingUpdate }] = useCreateLoadFromQuoteMutation();
    const { register, handleSubmit } = useForm({defaultValues: {
        carrierRate: selectedQuote.carrierRate
      }})

    const submitForm = (data) => {
        console.log(data)
        let load = {...selectedQuote}
        load = {...load, carrierRate: data.carrierRate}
        createLoad(load);
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
                  <h3 className="text-3xl font-semibold">
                    Post Load
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowPostLoadModal(false)}
                  >
                    <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                
                    <form onSubmit={handleSubmit(submitForm)} class="flex flex-col gap-y-8 place-items-center place-content-center w-96 mx-auto h-3/5">
                    <div class="w-full flex place-content-center">
                        <input
                        placeholder='Rate'
                        type='text'
                        className='form-input w-3/4 border rounded-md border-gray-300 pl-1'
                        {...register('carrierRate')}
                        required
                        />
                    </div>
                    <div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowPostLoadModal(false)}
                  >
                    Close
                  </button>
                  {isLoadingUpdate ?
                    <ClipLoader /> :
                    <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full w-20" type='submit' disabled={isLoadingUpdate}>
                        Post
                    </button>
                    }
                </div>
                    </div>
                    </form>
               
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        
    )
    
}