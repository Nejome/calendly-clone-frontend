import Head from 'next/head'
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Calendly Clone - Login</title>
                <meta name="description" content="Calendly Clone - Login" />
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
                    <div className="flex">
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-6xl w-full lg:w-8/12 text-[#0a3558] font-extrabold">Welcome Back to <span className="text-blue-600">Calendly</span></h1>

                            <form className="w-full mt-5 w-full lg:w-10/12">
                                <div className="mt-7">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Email</label>
                                    <input type="text" className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded" placeholder="Enter your email"/>
                                </div>

                                <div className="mt-7">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Password</label>
                                    <input type="password" className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded" placeholder="Enter your password"/>
                                </div>

                                <div className="mt-7 text-center">
                                    <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-4 py-3 text-lg transition-all">Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="w-full lg:w-1/2"></div>
                    </div>
                </div>
            </main>

            <footer>

            </footer>
        </div>
    )
}
