
import { useGetAllQuotesQuery } from '../services/auth/authService'
import QuoteTable from '../components/QuoteTable'
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from 'react-redux'


export default function Quotes() {
    const { data, isFetching } = useGetAllQuotesQuery()



    return (
      <div class="place-items-center place-content-center flex flex-col pt-10">
        <h1 class="text-2xl">All Quotes</h1>
        {!isFetching && data ?
        <QuoteTable data={data} /> :
        <ClipLoader />}
      </div>
    )
    
}