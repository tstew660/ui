
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
      <div class="place-items-center place-content-center flex flex-col pt-10 ">
        <h1 class="text-2xl">All Quotes</h1>
        {!isFetching && data ?
        <div class="flex flex-row w-5/6 border border-indigo-600">
          <div class="w-4/5">
          <QuoteTable data={data} selectedQuote={selectedQuote} setSelectedQuote={setSelectedQuote} />
          </div>
          <div class="w-1/5">
          <QuoteDetails selectedQuote={selectedQuote} />
          </div>
          
          
        </div>
         :
        <ClipLoader />}
      </div>
    )
    
}