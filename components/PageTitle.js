import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";

export default function PageTitle({title}){
    const router = useRouter();

    return (
        <nav className="shadow-lg bg-white">
            <div className="container mx-auto p-3">
                <div className="flex items-center justify-between py-2">
                    <button onClick={() => router.back()} className="flex items-center gap-2 px-4 py-[8px] text-sm border border-blue-600 text-blue-600 hover:bg-blue-100 transition-all rounded-3xl">
                        <FontAwesomeIcon icon={faAngleLeft} />

                        Back
                    </button>

                    <h1 className="text-3xl text-[#1a1a1a]">{title}</h1>

                    <div></div>
                </div>
            </div>
        </nav>
    );
}