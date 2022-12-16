import Head from 'next/head'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

export default function Login() {
    return (
        <div>
            <Head>
                <title>Calendly Clone - Index</title>
                <meta name="description" content="Calendly Clone - Index" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <header>
                <div className="container mx-auto p-5">
                    <Link href="#">
                        <h1 className="text-3xl text-blue-600 flex items-center gap-2">
                            <img src="/logo.svg" />
                            <span>Calendly</span>
                        </h1>
                    </Link>
                </div>
            </header>

            <main className="mt-8">
                <div className="container mx-auto p-4">
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-5">
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-6xl w-full lg:w-8/12 text-[#0a3558] font-extrabold">Welcome Back to <span className="text-blue-600">Calendly</span></h1>

                            <form className="w-full mt-5 w-full lg:w-10/12">
                                <div className="mt-7">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Email</label>
                                    <input type="text" className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your email"/>
                                </div>

                                <div className="mt-7">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Password</label>
                                    <input type="password" className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your password"/>
                                </div>

                                <div className="mt-7 text-center">
                                    <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-3 text-lg transition-all w-full">Index</button>
                                    <div className="text-[#0a3558] flex gap-2 mt-5">
                                        <span>Do not have an account?</span>
                                        <Link href="/register" className="text-blue-600 hover:underline">Register</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="w-full lg:w-1/2 flex items-center">
                            <div className="p-4 border border-[#E7EDF6] rounded-lg hover:shadow group bg-white">
                                <p className=" bg-blue-50 text-blue-600 rounded-lg w-fit px-2 py-2 uppercase">What is Calendly?</p>
                                <h1 className="mt-5 text-3xl text-[#0a3558]">Easy scheduling ahead</h1>
                                <p className="mt-5 text-[#0a3558]  font-extralight">Calendly is your scheduling automation platform for eliminating the back-and-forth emails for finding the perfect time — and so much more.</p>
                                <a href="#" className="text-blue-600 text-lg group-hover:text-[#0a3558] mt-5 block flex items-center gap-2">
                                    Learn More
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
