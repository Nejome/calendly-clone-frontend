import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faCheck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {APP_ROUTES} from "../utils/constants";
import {useState} from "react";

export default function EventType({eventType}){
    const [copied, setCopied] = useState(false);

    const handleCopyEventTypeLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/${APP_ROUTES.SCHEDULE_EVENT}/${eventType.id}`);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <div className="border border-[#cccccc] shadow rounded relative hover:top-[-1px] hover:shadow-lg hover:cursor-pointer">
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-[#1a1a1a] text-xl">{eventType.name}</h3>
                </div>

                <p className="mt-1 text-sm text-[#757575]">{eventType.duration} mins, {eventType.from} - {eventType.to}</p>

                <Link href={`${APP_ROUTES.SCHEDULE_EVENT}/${eventType.id}`} className="text-blue-600 text-sm hover:underline block mt-3">View booking page</Link>
            </div>
            <hr />
            <div className="p-4">
                <div className="flex justify-center items-center">
                    <button onClick={handleCopyEventTypeLink} className="text-blue-600 flex items-center gap-1 text-sm">
                        {copied
                            ?
                            <>
                                <FontAwesomeIcon icon={faCheck} />
                                <span>Copied</span>
                            </>
                            :
                            <>
                                <FontAwesomeIcon icon={faCopy} />
                                <span>Copy link</span>
                            </>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}