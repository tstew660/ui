
import { useGetAllQuotesQuery } from '../services/auth/authService'
import QuoteTable from '../components/QuoteTable'
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux'
import QuoteDetails from '../components/QuoteDetails';
import { useState } from 'react';


export default function Quotes() {
    const { data, isFetching } = useGetAllQuotesQuery()
    const [selectedQuote, setSelectedQuote] = useState(null)


    return (
      <div class="place-items-center place-content-center h-full flex flex-col">
        {!isFetching && data ?
        <div class="flex flex-row w-5/6 bg-white h-screen overflow-hidden border border-gray-200">
          <div class="w-4/5 h-full ">
          <QuoteTable data={data} selectedQuote={selectedQuote} setSelectedQuote={setSelectedQuote} />
          </div>
          <div class="w-1/5 h-full">
          <QuoteDetails selectedQuote={selectedQuote} />
          </div>
          
          
        </div>
         :
        <ClipLoader />}
      </div>
    )
    
}