
import { useGetAllShippersQuery } from '../services/auth/authService'
import ShipperTable from '../components/ShipperTable'
import { ClipLoader } from "react-spinners"
import { useDispatch, useSelector } from 'react-redux'


export default function Shippers() {
    const { data, isFetching } = useGetAllShippersQuery()



    return (
      <div class="place-items-center place-content-center flex flex-col pt-10">
        <h1 class="text-2xl">Shipper Directory</h1>
        {!isFetching && data ?
        <ShipperTable data={data} /> :
        <ClipLoader />}
      </div>
    )
    
}