import Head from 'next/head'
import Link from "next/link";

export default function Register() {
    return (
        <div>
            <Head>
                <title>Calendly Clone - Index</title>
                <meta name="description" content="Calendly Clone - Index" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <main>
                <div className="container mx-auto p-4">
                    <div className="flex flex-col gap-8 items-center">
                        <div>
                            <Link href="#">
                                <h1 className="text-3xl text-blue-600 flex items-center gap-2">
                                    <img src="/logo.svg" />
                                    <span>Calendly</span>
                                </h1>
                            </Link>
                        </div>

                        <div className="w-10/12 lg:w-6/12 border border-[#dadada] shadow-lg rounded-xl px-4 py-4">
                            <form>
                                <div className="mt-7">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Name</label>
                                    <input type="text" className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your name"/>
                                </div>

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

                                    <div className="text-[#0a3558]  flex gap-2 mt-5 mb-3">
                                        <span>Do you have an account?</span>
                                        <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
