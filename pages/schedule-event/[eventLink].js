import Head from "next/head";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faCamera, faCalendar} from "@fortawesome/free-solid-svg-icons";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import {Calendar} from 'react-modern-calendar-datepicker';
import {useState} from "react";

export default function ScheduleEvent(){
    const [selectedDay, setSelectedDay] = useState(null);

    return (
        <div>
            <Head>
                <title>Calendly Clone - Index</title>
                <meta name="description" content="Calendly Clone - Index" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <main>
                <div className="container mx-auto p-4">
                    <div className="flex justify-center items-center">
                        <div className="w-10/12 lg:w-10/12 border border-[#dadada] shadow-lg rounded-xl bg-white">
                            <div className="flex">
                                <div className="w-1/3 border-r border-[#1a1a1a1a]">
                                    <div className="p-5">
                                        <p className="text-[#1a1a1a9c]">Alnejome Mubark</p>
                                        <h1 className="text-2xl">First event</h1>

                                        <div className="mt-7">
                                            <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                                <FontAwesomeIcon icon={faClock} />
                                                30 min
                                            </p>

                                            <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                                <FontAwesomeIcon icon={faCamera} />
                                                Web conferencing
                                            </p>

                                            <p className="flex gap-3 items-center text-[#1a1a1a9c] text-lg mt-3">
                                                <FontAwesomeIcon icon={faCalendar} />
                                                14 Dec 2022 - 16 Dec 2022
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-2/3">
                                    <div className="p-5">
                                        <Calendar
                                            value={selectedDay}
                                            onChange={setSelectedDay}
                                            shouldHighlightWeekends
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}