import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCopy, faGear, faPen, faTrash, faCheck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {Menu} from "@headlessui/react";
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
                <div className="flex justify-between items-center relative">
                    <h3 className="text-[#1a1a1a] text-xl">{eventType.name}</h3>
                    <Menu>
                        <Menu.Button className="text-sm px-2 py-3 rounded hover:bg-gray-200 flex gap-1">
                            <FontAwesomeIcon icon={faGear} />

                            <FontAwesomeIcon icon={faAngleDown} />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 top-0 z-10 mt-10 w-52 text-[#1A1A1A] text-lg bg-white rounded border border-[#cccccc] shadow-xl text-xs py-2">
                            <Menu.Item>
                                <Link href="#" className="block w-full hover:bg-[#F2F8FF] px-5 py-3 text-right flex items-center gap-3">
                                    <FontAwesomeIcon icon={faPen} />

                                    Edit
                                </Link>
                            </Menu.Item>
                            <hr />
                            <Menu.Item>
                                <Link href="#" className="block w-full hover:bg-[#F2F8FF] px-5 py-3 text-right flex items-center gap-3">
                                    <FontAwesomeIcon icon={faTrash} />

                                    Delete
                                </Link>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
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