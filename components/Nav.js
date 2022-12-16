import Link from "next/link";
import {useRouter} from "next/router";
import {APP_ROUTES} from "../utils/constants";

export default function Nav(){
    const router = useRouter();

    return (
        <nav className="shadow-lg bg-white">
            <div className="container mx-auto p-3">
                <ul>
                    <li className="inline-block mr-10">
                        <Link href={APP_ROUTES.HOME} className={`block text-lg border-b-4 py-2 transition-all ${ router.pathname === APP_ROUTES.HOME? `border-[#0169ff] text-[#0a3558]`: `border-white hover:border-[#a8a8a8] text-gray-500`}`}>Event Types</Link>
                    </li>
                    <li className="inline-block mr-10">
                        <Link href={APP_ROUTES.SCHEDULED_EVENTS} className={`block text-lg border-b-4 py-2 transition-all ${ router.pathname === APP_ROUTES.SCHEDULED_EVENTS? `border-[#0169ff] text-[#0a3558]`: `border-white hover:border-[#a8a8a8] text-gray-500`}`}>Scheduled Events</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}