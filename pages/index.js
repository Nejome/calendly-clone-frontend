import Head from 'next/head'
import Header from "../components/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch, faPlus} from "@fortawesome/free-solid-svg-icons";
import EventType from "../components/EventType";
import Nav from "../components/Nav";
import Link from "next/link";
import {APP_ROUTES, API_ROUTES} from "../utils/constants";
import {useEffect, useState} from "react";
import {getAuthenticatedUser} from "../helpers";
import {useRouter} from "next/router";
import http from "../services/http";

export default function Home() {
    const router = useRouter();
    const [eventTypes, setEventTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const authenticatedUser = getAuthenticatedUser();

        if (!authenticatedUser) {
            router.push(APP_ROUTES.LOGIN);
        }
    }, []);

    useEffect(() => {
        const getEventTypes = async () => {
            setLoading(true);

            const response = await http.get(`${API_ROUTES.EVENT_TYPES_LIST}`);

            setEventTypes(response.data);

            setLoading(false);
        }

        getEventTypes();
    }, [])

  return (
    <div>
        <Head>
            <title>Calendly Clone - Home</title>
            <meta name="description" content="Calendly Clone - Home" />
            <link rel="icon" type="image/x-icon" href="/logo.svg" />
        </Head>

        <Header />

        <Nav />

        <main className="mt-8">
            <div className="container mx-auto p-5">
                <div className="border-b border-[#e2e2e2] py-2">
                    <div className="flex justify-between items-center">
                        <h1 className="text-[#0a3558] text-3xl font-extralight">Event Types</h1>

                        <Link href={APP_ROUTES.CREATE_EVENT_TYPE} className="flex items-center gap-2 px-4 py-[8px] text-sm border border-blue-600 text-blue-600 hover:bg-blue-100 transition-all rounded-3xl">
                            <FontAwesomeIcon icon={faPlus} />

                            New Event Type
                        </Link>
                    </div>
                </div>

                <div className="mt-10">
                    {loading && <div className="text-blue-600 text-3xl text-center pt-14"><FontAwesomeIcon icon={faCircleNotch} className="spinner" /></div>}

                    <div className="grid grid-cols-6 gap-7">
                        {eventTypes.map(eventType => {return (
                            <div key={eventType.id} className="col-span-6 md:col-span-3 lg:col-span-2">
                                <EventType eventType={eventType}/>
                            </div>
                        )})}
                    </div>
                </div>
            </div>
        </main>
    </div>
  )
}
