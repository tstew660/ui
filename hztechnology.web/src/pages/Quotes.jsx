

import { useGetAllQuotesQuery } from '../services/auth/authService'


export default function Quotes() {
    const { data, isFetching } = useGetAllQuotesQuery()
    console.log(data)
      return (
        <div class="flex flex-col place-items-center gap-y-6 pt-6 h-4/5">
            <h1 class="text-3xl">Quotes</h1>
            <table class="table-auto text-black shadow-lg bg-white">
            <thead>
                <tr>
                    <th class="bg-yellow-100 border text-left px-8 py-4">Quote Number</th>
                    <th class="bg-yellow-100 border text-left px-8 py-4">Shipment Address</th>
                    <th class="bg-yellow-100 border text-left px-8 py-4">Destination Address</th>
                    <th class="bg-yellow-100 border text-left px-8 py-4">Commodity</th>
                    <th class="bg-yellow-100 border text-left px-8 py-4">Dimm</th>
                    <th class="bg-yellow-100 border text-left px-8 py-4">Weight</th>
                    <th class="bg-yellow-100 border text-left px-8 py-4">Shipper</th>
                </tr>
            </thead>
            <tbody>
                {data && data?.map((x) =>
                    <tr>
                        <td class="border px-8 py-4">{x.quoteNumber}</td>
                        <td class="border px-8 py-4">{x.shipmentAddress.city}, {x.shipmentAddress.state} {x.shipmentAddress.zipCode}</td>
                        <td class="border px-8 py-4">{x.destinationAddress.city}, {x.destinationAddress.state} {x.destinationAddress.zipCode}</td>
                        <td class="border px-8 py-4">{x.commodity.name}</td>
                        <td class="border px-8 py-4">{x.commodity.dimmensions}</td>
                        <td class="border px-8 py-4">{x.commodity.weight}</td>
                        <td class="border px-8 py-4">{x.shipper.name}</td>
                    </tr>
                )}
            </tbody>
        </table>
        </div>
      )
}