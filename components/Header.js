import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown, faUser, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import { Menu } from '@headlessui/react'
import {APP_ROUTES} from "../utils/constants";
import {useUser} from "../hooks";
import {useRouter} from "next/router";
import {removeUserFromLocalStorage} from "../helpers";

export default function Header(){
    const {user} = useUser();
    const router = useRouter();

    const handleLogout = () => {
        removeUserFromLocalStorage();

        router.push(APP_ROUTES.LOGIN);
    }

    return (
        <header className="border-b border-[#F2F2F2] bg-white">
            <div className="container mx-auto p-5 relative">
                <div className="flex justify-between items-center">
                    <Link href={APP_ROUTES.HOME}>
                        <h1 className="text-3xl text-blue-600 flex items-center gap-2">
                            <img src="/logo.svg" />
                            <span>Calendly</span>
                        </h1>
                    </Link>

                    {user &&
                        <Menu>
                            <Menu.Button className="flex items-center gap-3 group">
                            <span className="block w-[35px] h-[35px] rounded-full bg-[#cccccc] border-2 border-[#b2b2b2] text-[#5f5f5f] flex items-center justify-center text-lg group-hover:border-[#393939] transition-all">
                                {user.name.split('')[0]}
                            </span>
                                <span>Account</span>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </Menu.Button>

                            <Menu.Items className="absolute right-0 top-5 z-10 mt-10 w-64 text-[#1A1A1A] text-lg bg-white rounded border border-[#cccccc] shadow-xl text-xs py-2">
                                <Menu.Item>
                                    <Link href={APP_ROUTES.PROFILE} className="block w-full hover:bg-[#F2F8FF] px-5 py-3 text-right flex items-center gap-3">
                                        <FontAwesomeIcon icon={faUser} />

                                        Profile
                                    </Link>
                                </Menu.Item>
                                <hr />
                                <Menu.Item>
                                    <button onClick={handleLogout} className="block w-full hover:bg-[#F2F8FF] px-5 py-3 text-right flex items-center gap-3">
                                        <FontAwesomeIcon icon={faRightFromBracket} />

                                        Logout
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    }
                </div>
            </div>
        </header>
    );
}