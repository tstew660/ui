import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useOutletContext, Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import PalletTypes from "../../data/PalletTypes.json"
import {TrashIcon, PencilIcon} from "@heroicons/react/20/solid";
import { setCarrier, setCommodities } from "../../features/load/loadSlice";
import CreateLoadPages from "../../data/CreateLoadPages.json"
import { useGetAllAccessorialsQuery } from '../../services/auth/authService'
import RateTable from "./RateTable";
import CreateRateLineItemModal from "../CreateRateLineItemModal";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function Rates() {
    const [currentPage, setCurrentPage] = useOutletContext();
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [chargeToEdit, setChargeToEdit] = useState(0);
    const [editSelected, setEditSelected] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const load = useSelector((state) => state.load);
    const { register, control, handleSubmit, setValue } = useForm({ defaultValues: load});
    const { data, isFetching } = useGetAllAccessorialsQuery();

    const onSubmit = (data) => {
        console.log(data)
        setCurrentPage(CreateLoadPages[currentPage.order]);
        dispatch(setCarrier(data));
        navigate(`../${currentPage.nextPage}`);
      };

    const editLine = (type) => {
        if (type == 0) {
            setShowIncomeModal(true)
        }
        else {
            setShowExpenseModal(true);
        }
        setEditSelected(true)
    }

    const addLine = (type) => {
        if (type == 0) {
            setShowIncomeModal(true)
        }
        else {
            setShowExpenseModal(true);
        }
        setEditSelected(false)
    }

    return (
        !isFetching && 
        <form class="h-full pt-8 pb-4 flex flex-col justify-between" onSubmit={handleSubmit(onSubmit)}>
            <div class="flex flex-col gap-y-4">
                <div class="flex flex-col gap-y-4">
                    <h1>Income</h1>
                    <div class="border p-4 flex flex-col gap-y-3">
                        <div>
                            <div class="flex gap-x-2">
                                <button type="button" onClick={() => addLine(0)} class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full text-sm flex flex-row w-36 place-content-center place-items-center">
                                    <PlusIcon class="h-8" />
                                    <p>Add Line Item</p>
                                </button>
                                <button type="button" onClick={() => editLine(0)} class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full text-sm flex flex-row w-36 place-content-center place-items-center">
                                    <PencilIcon class="h-8 p-1" />
                                    <p>Edit Line Item</p>
                                </button>
                            </div>
                            {showIncomeModal ? (
                                <CreateRateLineItemModal type={0} setAddLineItemModal={setShowIncomeModal} accessorials={data} charge={load.charges.filter(x => x.id == chargeToEdit)[0]} isEdit={editSelected} id={chargeToEdit} /> 
                            ) : null}
                        </div>
                        <RateTable data={load.charges.filter(x => x.chargeType == 0)} setChargeToEdit={setChargeToEdit} />
                    </div>
                </div>
                <div class="flex flex-col gap-y-4">
                    <h1>Expenses</h1>
                    <div class="border p-4 flex flex-col gap-y-3">
                        <div>
                            <div class="flex gap-x-2">
                                <button type="button" onClick={() => addLine(1)} class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full text-sm flex flex-row w-36 place-content-center place-items-center">
                                    <PlusIcon class="h-8" />
                                    <p>Add Line Item</p>
                                </button>
                                <button type="button" onClick={() => editLine(1)} class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black rounded-full text-sm flex flex-row w-36 place-content-center place-items-center">
                                    <PencilIcon class="h-8 p-1" />
                                    <p>Edit Line Item</p>
                                </button>
                            </div>
                            {showExpenseModal ? (
                                <CreateRateLineItemModal type={1} setAddLineItemModal={setShowExpenseModal} accessorials={data} charge={load.charges.filter(x => x.id == chargeToEdit)[0]} isEdit={editSelected} id={chargeToEdit} /> 
                            ) : null}
                        </div>
                        <RateTable data={load.charges.filter(x => x.chargeType == 1)} setChargeToEdit={setChargeToEdit} />
                    </div>
                </div>
                <div class="flex flex-col gap-y-4">
                    <h1>Margins</h1>
                </div>
            </div>
            <div class="h-20 w-full flex place-content-end pt-6 pb-6">
                <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 h-12  text-black rounded-full w-32" type="submit">{currentPage.prettyNextPage}</button>
            </div>          
    </form>
    )
}