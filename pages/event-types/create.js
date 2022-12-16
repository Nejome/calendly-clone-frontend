import Head from 'next/head'
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getAuthenticatedUser, storeUserInLocalStorage} from "../../helpers";
import {API_ROUTES, APP_ROUTES} from "../../utils/constants";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "./event-type-validation";
import http from "../../services/http";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../hooks";
import Link from "next/link";

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user} = useUser();

    useEffect(() => {
        const authenticatedUser = getAuthenticatedUser();

        if (!authenticatedUser) {
            router.push(APP_ROUTES.LOGIN);
        }
    }, [router]);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await http.post(`${API_ROUTES.STORE_EVENT_TYPE}`, data);

            router.push(APP_ROUTES.HOME);
        }
        catch (err) {
            let errorMessage = err.response?.data?.message
                ? err.response.data.message
                : 'An error occurred during the store event type process';

            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Head>
                <title>Calendly Clone - Create Event Type</title>
                <meta name="description" content="Calendly Clone - Create Event Type" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <Header />

            <PageTitle title="Create Event Type"/>

            <main className="mt-5">
                <div className="container mx-auto p-5">
                    <div className="border border-[#666a73] rounded px-7 pt-10 pb-7 bg-white w-full lg:w-9/12 mx-auto mt-5">
                        {(user && !user.zoom_account_connected) &&
                            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                Sorry, you can not create event type without connect your zoom account.
                                <Link href={`https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URL}`} class="underline inline-block ml-1">Connect</Link>
                            </div>
                        }

                        <form onSubmit={handleSubmit(onSubmit)}>
                            {error &&
                                <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                    {error}
                                </div>
                            }
                            <div className="grid grid-cols-6 gap-5">
                                <div className="col-span-6 lg:col-span-3">
                                    <label>Event Name</label>
                                    <input type="text" {...register('name')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                    <p className="text-red-600 mt-1">{errors.name?.message}</p>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <label>Duration</label>
                                    <select {...register('duration')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all">
                                        <option></option>
                                        <option value="30">30 minutes</option>
                                        <option value="60">60 minutes</option>
                                    </select>
                                    <p className="text-red-600 mt-1">{errors.duration?.message}</p>
                                </div>

                                <div className="col-span-6 lg:col-span-3">
                                    <label>From</label>
                                    <input type="date" {...register('from')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                    <p className="text-red-600 mt-1">{errors.from?.message}</p>
                                </div>
                                <div className="col-span-6 lg:col-span-3">
                                    <label>To</label>
                                    <input type="date" {...register('to')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                    <p className="text-red-600 mt-1">{errors.to?.message}</p>
                                </div>
                            </div>
                            <div className="mt-10 text-center">
                                <button type="submit" className="bg-blue-600 mx-auto text-white hover:bg-blue-700 rounded-2xl px-4 py-2 transition-all flex gap-3 justify-center items-center disabled:bg-blue-500" disabled={loading || (user && !user.zoom_account_connected)}>
                                    Save
                                    {loading && <FontAwesomeIcon icon={faCircleNotch} className="spinner" />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}
