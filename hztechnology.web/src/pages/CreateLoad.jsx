import { NavLink, Outlet, Link } from 'react-router-dom'
import ProgressBar from '../components/CreateLoad/Progressbar'
import { useState } from 'react';
import CreateLoadPages from "../data/CreateLoadPages.json"

export default function CreateLoad() {
    const [currentPage, setCurrentPage] = useState(CreateLoadPages[0]);
    
    return (
        <div class="place-items-center place-content-center h-full flex flex-col">
            <div class="w-full">
            <ProgressBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            
            <div class="w-5/6 px-8 bg-white h-full overflow-auto border border-gray-200">
                <Outlet context={[currentPage, setCurrentPage]} />
            </div>
            
            
        </div>
    )
}