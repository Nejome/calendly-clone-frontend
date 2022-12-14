import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faCopy, faGear, faPen, faTrash} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {Menu} from "@headlessui/react";

export default function EventType(){
    return (
        <div className="border border-[#cccccc] shadow rounded">
            <div className="p-4">
                <div className="flex justify-between items-center relative">
                    <h3 className="text-[#1a1a1a] text-xl">Event Type Title</h3>
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

                <p className="mt-1 text-sm text-[#757575]">30 mins, 14 Dec 2022 - 16 Dec 2022</p>

                <Link href="#" className="text-blue-600 text-sm hover:underline block mt-3">View booking page</Link>
            </div>
            <hr />
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <button className="text-blue-600 hover:underline flex items-center gap-1 text-sm">
                        <FontAwesomeIcon icon={faCopy} />
                        <span>Copy link</span>
                    </button>

                    <button className="flex items-center gap-2 px-5 py-[6px] text-sm border border-blue-600 text-blue-600 hover:bg-blue-100 transition-all rounded-3xl">Share</button>
                </div>
            </div>
        </div>
    );
}