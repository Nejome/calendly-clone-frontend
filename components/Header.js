import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { Menu } from '@headlessui/react'

export default function Header(){

    return (
        <header className="border-b border-[#F2F2F2] bg-white">
            <div className="container mx-auto p-5 relative">
                <div className="flex justify-between items-center">
                    <Link href="#">
                        <h1 className="text-3xl text-blue-600 flex items-center gap-2">
                            <img src="/logo.svg" />
                            <span>Calendly</span>
                        </h1>
                    </Link>

                    <Menu>
                        <Menu.Button className="flex items-center gap-3 group">
                            <span className="block w-[35px] h-[35px] rounded-full bg-[#cccccc] border-2 border-[#b2b2b2] text-[#5f5f5f] flex items-center justify-center text-lg group-hover:border-[#393939] transition-all">A</span>
                            <span className="">Account</span>
                            <FontAwesomeIcon icon={faAngleDown} />
                        </Menu.Button>

                        <Menu.Items className="absolute right-0 top-5 z-10 mt-10 w-64 text-[#1A1A1A] text-lg bg-white rounded border border-[#cccccc] shadow-xl text-xs py-2">
                            <Menu.Item>
                                <Link href="#" className="block w-full hover:bg-[#F2F8FF] px-5 py-3 text-right flex items-center gap-3">
                                    <FontAwesomeIcon icon={faUser} />

                                    Profile
                                </Link>
                            </Menu.Item>
                            <hr />
                            <Menu.Item>
                                <Link href="#" className="block w-full hover:bg-[#F2F8FF] px-5 py-3 text-right flex items-center gap-3">
                                    <FontAwesomeIcon icon={faRightFromBracket} />

                                    Logout
                                </Link>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </header>
    );
}