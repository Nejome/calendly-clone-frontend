import Head from "next/head";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faVideo, faCalendar, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import 'react-modern-calendar-datepicker-fix/lib/DatePicker.css';
import {Calendar} from 'react-modern-calendar-datepicker-fix';
import {useEffect, useState} from "react";
import http from "../../services/http";
import {API_ROUTES, APP_ROUTES} from "../../utils/constants";
import {useRouter} from "next/router";
import Link from "next/link";

export default function ScheduleEvent() {
    const router = useRouter();
    const {eventTypeId} = router.query;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [eventType, setEventType] = useState(null);
    const [slots, setSLots] = useState([]);
    const [slotsFetching, setSlotsFetching] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);

    useEffect(() => {
        if(eventTypeId){
            const getSingleEventType = async () => {
                setLoading(true);

                const response = await http.get(`${API_ROUTES.EVENT_TYPES_GET_SINGLE}/${eventTypeId}`);

                setEventType(response.data);

                setLoading(false);
            }

            getSingleEventType();
        }
    }, [eventTypeId]);

    useEffect(() => {
        if(day){
            const getSLots = async () => {
                setSlotsFetching(true);

                const response = await http.get(`${API_ROUTES.EVENT_TYPES_GET_TIME_SLOTS}/${eventType.id}?day=${day.year}-${day.month}-${day.day}`);

                setSLots(response.data);

                setSlotsFetching(false);
            }

            getSLots();
        }
    }, [day]);

    const canSubmit = () => {
        return (
            name !== '' &&
            email !== '' &&
            day !== null &&
            time !== null
        );
    }

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const response = await http.post(`${API_ROUTES.STORE_EVENT}`, {
                event_type_id: eventType.id,
                invited_name: name,
                invited_email: email,
                day: `${day.year}-${day.month}-${day.day}`,
                time: time,
            });

            router.push(`${APP_ROUTES.EVENT_DETAILS}/${response.data.id}`);
        } catch (err) {
            let errorMessage = err.response?.data?.message
                ? err.response.data.message
                : 'An error occurred during creating the event';

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Head>
                <title>Calendly Clone - Schedule Event</title>
                <meta name="description" content="Calendly Clone - Schedule Event" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <main>
                <div className="container mx-auto p-4">
                    <div className="mx-auto mt-10 flex justify-center mb-5">
                        <Link href="#">
                            <h1 className="text-3xl text-blue-600 flex items-center gap-2">
                                <img src="/logo.svg" />
                                <span>Calendly</span>
                            </h1>
                        </Link>
                    </div>

                    {(loading && !canSubmit()) && <div className="text-blue-600 text-3xl text-center pt-14"><FontAwesomeIcon icon={faCircleNotch} className="spinner" /></div>}

                    {error &&
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mt-3" role="alert">
                            {error}
                        </div>
                    }

                    {eventType &&
                        <div className="w-full lg:mt-10 border border-[#dadada] shadow-lg rounded-xl bg-white">
                            <div className="flex flex-col lg:flex-row lg:h-[400px] border-b border-[#1a1a1a1a]">
                                <div className="w-full lg:w-1/3 h-full p-5 lg:border-r border-[#1a1a1a1a]">
                                    <p className="text-[#1a1a1a9c]">{eventType.user.name}</p>
                                    <h1 className="text-2xl">{eventType.name}</h1>

                                    <div className="mt-7">
                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            <FontAwesomeIcon icon={faClock} />
                                            {eventType.duration} mins
                                        </p>

                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            <FontAwesomeIcon icon={faVideo} />
                                            Web conferencing
                                        </p>

                                        <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                            <FontAwesomeIcon icon={faCalendar} />
                                            {eventType.from} - {eventType.to}
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <label>Name</label>
                                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your name" className={`mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all ${name === '' && `border-red-600`}`}/>
                                    </div>
                                    <div className="mt-3">
                                        <label>Email</label>
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email" className={`mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all ${email === '' && `border-red-600`}`}/>
                                    </div>
                                </div>

                                <div className="w-full lg:w-2/3 h-full p-5 flex flex-col lg:flex-row gap-5 justify-center items-center">
                                    <div className="w-full lg:w-1/2 h-full flex justify-center">
                                        <Calendar
                                            value={day}
                                            onChange={setDay}
                                            shouldHighlightWeekends
                                            minimumDate={{year: eventType.from.split('-')[0],month: eventType.from.split('-')[1],day: eventType.from.split('-')[2]}}
                                            maximumDate={{year: eventType.to.split('-')[0],month: eventType.to.split('-')[1],day: eventType.to.split('-')[2]}}
                                        />
                                    </div>
                                    {day &&
                                        <div className="w-full lg:w-1/2 h-full grid grid-cols-2 gap-2 overflow-auto">
                                            {slotsFetching && <div className="text-blue-600 text-3xl text-center pt-14"><FontAwesomeIcon icon={faCircleNotch} className="spinner" /></div>}

                                            {slots.map((slot, i) => (
                                                <button key={i} onClick={() => setTime(slot)} className={`text-blue-600 col-span-1 bg-white border border-blue-600 rounded py-2 text-lg transition-all ${time === slot ? `bg-blue-600 text-white` : `hover:bg-blue-100`}`}>{slot}</button>
                                            ))}
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="flex justify-center px-3 py-3 w-full w-4/12 mx-auto">
                                <button onClick={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-2 text-lg transition-all w-full flex gap-3 justify-center items-center disabled:bg-blue-500" disabled={!canSubmit() || loading}>
                                    Confirm
                                    {loading && <FontAwesomeIcon icon={faCircleNotch} className="spinner" />}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </main>
        </div>
    )
}