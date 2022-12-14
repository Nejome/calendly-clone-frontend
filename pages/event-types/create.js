import Head from 'next/head'
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Calendly Clone - Create Event Type</title>
                <meta name="description" content="Calendly Clone - Create Event Type" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <Header />

            <PageTitle title="Create Event Type"/>

            <main className="mt-8">
                <div className="container mx-auto p-5">
                    <div className="border-2 border-[#666a73] rounded px-7 pt-10 pb-7 bg-white w-full lg:w-9/12 mx-auto mt-5">
                        <form>
                            <div className="grid grid-cols-6 gap-5">
                                <div className="col-span-6 lg:col-span-3">
                                    <label>Event Name</label>
                                    <input type="text" className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <label>Event Link</label>
                                    <input type="text" className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                </div>

                                <div className="col-span-6 lg:col-span-3">
                                    <label>Date Range</label>
                                    <input type="text" className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <label>Duration</label>
                                    <input type="text" className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                </div>
                            </div>
                            <div className="mt-10 text-center">
                                <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-7 py-2 text-lg transition-all">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
