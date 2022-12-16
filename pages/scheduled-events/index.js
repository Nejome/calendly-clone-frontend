import Head from 'next/head'
import Header from "../../components/Header";
import Nav from "../../components/Nav";
import Link from "next/link";
import {useEffect} from "react";
import http from "../../services/http";
import {API_ROUTES} from "../../utils/constants";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";

export default function ScheduledEvents() {
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getEventsList = async () => {
            setLoading(true);

            const response = await http.get(`${API_ROUTES.EVENT_LIST}`);

            setEvents(response.data);

            setLoading(false);
        }

        getEventsList();
    }, []);

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

                    {loading && <div className="text-blue-600 text-3xl text-center pt-14"><FontAwesomeIcon icon={faCircleNotch} className="spinner" /></div>}

                    {events &&
                        <div className="mt-10 border border-[#1a1a1a1a] rounded w-full lg:w-10/12 mx-auto text-[#1c1c1c] bg-white">
                            {Object.keys(events).map(day => {return (
                                <>
                                    <div className="bg-[#fafafa] p-4 text-blue-600 text-lg">{day}</div>

                                    {events[day].map(row => {return (
                                        <div key={row.id} className="flex items-center flex-grow justify-between p-4">
                                            <div>{row.time.split('').splice(0, 5)}, {row.event_type.duration} mins</div>
                                            <div>
                                                {row.invited_name}
                                            </div>
                                            <div>
                                                {row.event_type.name}
                                            </div>
                                            <div>{row.invited_email}</div>
                                            <div>
                                                <Link href="#" className="text-blue-600 hover:underline">Join now</Link>
                                            </div>
                                        </div>
                                    )})}
                                </>
                            )})}
                        </div>
                    }
                </div>
            </main>
        </div>
    )
}
