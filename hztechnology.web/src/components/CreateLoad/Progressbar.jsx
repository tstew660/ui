import { NavLink, Outlet, Link } from 'react-router-dom'
import CreateLoadPages from "../../data/CreateLoadPages.json"
import { useDispatch, useSelector } from "react-redux";

export default function ProgressBar({currentPage, setCurrentPage}) {

    const dispatch = useDispatch();
    
    const onSubmit = (data) => {
        console.log(data);
        dispatch(setCommodities(data));
        navigate("../carrier");
      };

    return (
        <nav class="flex flex-col bg-blue-50 text-blue-700 border border-blue-200 py-3 px-5 rounded-lg" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center">
                <Link onClick={() => setCurrentPage(CreateLoadPages[0])} to="commodity" class="text-blue-700 hover:text-blue-900 text-sm inline-flex items-center">
                    Commodity
                </Link>
                </li>
                <li>
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <Link onClick={() => setCurrentPage(CreateLoadPages[1])} to="carrier" class="text-blue-700 hover:text-blue-900 ml-1 md:ml-2 text-sm font-medium">
                    Carrier
                </Link>
                </div>
                </li>
                <li aria-current="page">
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <Link onClick={() => setCurrentPage(CreateLoadPages[2])} to="shipper" class="text-blue-700 hover:text-blue-900 ml-1 md:ml-2 text-sm font-medium">
                    Shipper
                </Link>
                </div>
                </li>
                <li aria-current="page">
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <Link onClick={() => setCurrentPage(CreateLoadPages[3])} to="locations" class="text-blue-700 hover:text-blue-900 ml-1 md:ml-2 text-sm font-medium">
                    Routing
                </Link>
                </div>
                </li>
                <li aria-current="page">
                <div class="flex items-center">
                    <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                    <Link onClick={() => setCurrentPage(CreateLoadPages[4])} to="rates" class="text-blue-700 hover:text-blue-900 ml-1 md:ml-2 text-sm font-medium">
                    Rates
                </Link>
                </div>
                </li>
            </ol>
        </nav>
    )
}