import { useParams } from 'react-router-dom'

export default function Shipper() {
    
    let { ID } = useParams();
    console.log(ID)
    return(
        <div>Hello</div>
    )
}