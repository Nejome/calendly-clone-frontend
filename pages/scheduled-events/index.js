import Head from 'next/head'
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Link from "next/link";

export default function ScheduledEvents() {
    return (
        <div>
            <Head>
                <title>Calendly Clone - Scheduled Events</title>
                <meta name="description" content="Calendly Clone - Scheduled Events" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <Header />

            <Nav />

            <main className="mt-8">
                <div className="container mx-auto p-5">
                    <div className="border-b border-[#e2e2e2] py-2">
                        <div className="flex justify-between items-center">
                            <h1 className="text-[#0a3558] text-3xl font-extralight">Scheduled Events</h1>
                        </div>
                    </div>

                    <div className="mt-10 border border-[#1a1a1a1a] rounded w-full lg:w-10/12 mx-auto text-[#1c1c1c] bg-white">
                        <div className="bg-[#fafafa] p-4">
                            thursday, 15 December 2022
                        </div>
                        <div className="flex items-center flex-grow justify-between p-4">
                            <div>09:30 - 10:00</div>
                            <div>
                                <div><strong>Alnejome</strong></div>
                                <div>Event type <strong>First Event</strong></div>
                            </div>
                            <div>alnejome@gmail.com</div>
                            <div>
                                <Link href="#" className="text-blue-600 hover:underline">Join now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
