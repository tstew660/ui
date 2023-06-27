
import { useGetAllQuotesQuery } from '../services/auth/authService'
import QuoteTable from '../components/QuoteTable'
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux'
import QuoteDetails from '../components/QuoteDetails';
import { useEffect, useState } from 'react';


export default function Quotes() {
    const { data, isFetching, isLoading  } = useGetAllQuotesQuery()
    const [selectedQuote, setSelectedQuote] = useState(null)

    useEffect(() => {
      if (selectedQuote != null)
      {
        const quote = data.filter((x) => x.id == selectedQuote.id);
        console.log(quote[0])
        setSelectedQuote(quote[0]);
        
      } 
    }, [data])


    return (
      <div class="place-items-center place-content-center h-full flex flex-col">
        {!isLoading && data ?
        <div class="flex flex-row w-5/6 bg-white h-screen overflow-hidden border border-gray-200">
          <div class="w-3/4 h-full ">
          <QuoteTable data={data} selectedQuote={selectedQuote} setSelectedQuote={setSelectedQuote} />
          </div>
          <div class="w-1/4 h-full">
          <QuoteDetails selectedQuote={selectedQuote} isFetching={isFetching} />
          </div>
          
          
        </div>
         :
        <ClipLoader />}
      </div>
    )
    
}