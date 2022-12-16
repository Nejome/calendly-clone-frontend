import Head from "next/head";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar, faVideo, faCircleNotch, faClock, faCheck, faCopy} from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react";
import http from "../../services/http";
import {useRouter} from "next/router";
import {API_ROUTES, APP_ROUTES} from "../../utils/constants";
import Link from "next/link";

export default function EventDetails(){
    const router = useRouter();
    const {eventId} = router.query;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [event, setEvent] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if(eventId){
            const getEventDetails = async () => {
                setLoading(true);

                const response = await http.get(`${API_ROUTES.EVENT_GET_SINGLE}/${eventId}`)

                setEvent(response.data);

                setLoading(false);
            }

            getEventDetails();
        }
    }, [eventId]);

    const handleCopyEventTypeLink = () => {
        navigator.clipboard.writeText(event.join_url);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <div>
            <Head>
                <title>Calendly Clone - Event Details</title>
                <meta name="description" content="Calendly Clone - Event Details" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <main>
                <div className="container mx-auto p-4">
                    {loading && <div className="text-blue-600 text-3xl text-center pt-14"><FontAwesomeIcon icon={faCircleNotch} className="spinner" /></div>}

                    {error &&
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {error}
                        </div>
                    }

                    {event &&
                        <div className="w-full lg:w-7/12 mx-auto">
                            <div className="mx-auto mt-10 mb-5 flex justify-center">
                                <Link href="#">
                                    <h1 className="text-3xl text-blue-600 flex items-center gap-2">
                                        <img src="/logo.svg" />
                                        <span>Calendly</span>
                                    </h1>
                                </Link>
                            </div>

                            <div className="w-full lg:mt-10 border border-[#dadada] shadow-lg rounded-xl bg-white p-5">
                                <p className="text-[#1a1a1a9c]">{event.event_type.user.name}</p>
                                <h1 className="text-2xl">{event.event_type.name}</h1>

                                <div className="mt-3">
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            Date <span className="inline-block ml-1 text-black">{event.day}</span>
                                        </p>

                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            Time <span className="inline-block ml-1 text-black">{event.time.split('').splice(0, 5)}</span>
                                        </p>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            Through <span className="inline-block ml-1 text-black">Web Conference</span>
                                        </p>

                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            Duration
                                            <span className="inline-block ml-1 text-black">{event.event_type.duration} mins</span>
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            Password <span className="inline-block ml-1 text-black">{event.password}</span>
                                        </p>

                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            <button onClick={handleCopyEventTypeLink} className="text-blue-600 flex items-center gap-1 text-sm">
                                                {copied
                                                    ?
                                                    <>
                                                        <FontAwesomeIcon icon={faCheck} />
                                                        <span>Copied</span>
                                                    </>
                                                    :
                                                    <>
                                                        <FontAwesomeIcon icon={faCopy} />
                                                        <span>Copy link</span>
                                                    </>
                                                }
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </div>
    );
}