import { useDispatch, useSelector } from "react-redux";
import { useCreateLoadMutation } from "../../services/auth/authService";

export default function Review() {
    const load = useSelector((state) => state.load);
    const [createLoad, { isLoadingUpdate }] = useCreateLoadMutation();
    return (
        <>
        <div>
            {isLoadingUpdate ?
                <ClipLoader /> :
                <button class="bg-transparent border border-yellow-500 hover:border-yellow-600 text-black h-12 rounded-full w-32" onClick={() => createLoad(load)} type='submit' disabled={isLoadingUpdate}>
                    Create Load
                </button>
            }
        </div>
        <div>
        <pre dangerouslySetInnerHTML={{
            __html: JSON.stringify(load, null, 2),
        }} />
        </div>
        </>
        
    )
}