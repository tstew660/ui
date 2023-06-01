
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
      <div class="place-items-center place-content-center flex flex-col pt-10">
        <h1 class="text-2xl">All Quotes</h1>
        {!isFetching && data ?
        <div class="flex flex-row w-4/5">
          <QuoteTable class="w-3/4" data={data} selectedQuote={selectedQuote} setSelectedQuote={setSelectedQuote} />
          <QuoteDetails class="w-1/4" selectedQuote={selectedQuote} />
        </div>
         :
        <ClipLoader />}
      </div>
    )
    
}