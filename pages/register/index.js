import Head from 'next/head'
import Link from "next/link";
import {APP_ROUTES, API_ROUTES} from "../../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import {schema} from './register-validation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from "react";
import http from "../../services/http";
import {useRouter} from "next/router";
import {getAuthenticatedUser, storeUserInLocalStorage} from "../../helpers";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    const redirectIfAuthenticated = () => {
        const authenticatedUser = getAuthenticatedUser();

        if (authenticatedUser) {
            router.push(APP_ROUTES.HOME);
        }
    };

    useEffect(() => {
        redirectIfAuthenticated();
    }, []);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await http.post(`${API_ROUTES.REGISTER}`, data);

            storeUserInLocalStorage(response.data);

            router.push(APP_ROUTES.HOME);
        }
        catch (err) {
            let errorMessage = err.response?.data?.message
                ? err.response.data.message
                : 'An error occurred during the register process';

            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Head>
                <title>Calendly Clone - Register</title>
                <meta name="description" content="Calendly Clone - Register" />
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
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {error &&
                                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                        {error}
                                    </div>
                                }
                                <div className="mt-3">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Name</label>
                                    <input type="text" {...register('name')} className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your name"/>
                                    <p className="text-red-600 mt-1">{errors.name?.message}</p>
                                </div>

                                <div className="mt-3">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Email</label>
                                    <input type="text" {...register('email')} className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your email"/>
                                    <p className="text-red-600 mt-1">{errors.email?.message}</p>
                                </div>

                                <div className="mt-3">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Password</label>
                                    <input type="password" {...register('password')} className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your password"/>
                                    <p className="text-red-600 mt-1">{errors.password?.message}</p>
                                </div>

                                <div className="mt-3">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Password Confirmation</label>
                                    <input type="password" {...register('password_confirmation')} className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your password confirmation"/>
                                    <p className="text-red-600 mt-1">{errors.password_confirmation?.message}</p>
                                </div>

                                <div className="mt-7 text-center">
                                    <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-3 text-lg transition-all w-full flex gap-3 justify-center items-center disabled:bg-blue-500" disabled={loading}>
                                        Register
                                        {loading && <FontAwesomeIcon icon={faCircleNotch} className="spinner" />}
                                    </button>

                                    <div className="text-[#0a3558]  flex gap-2 mt-5 mb-3">
                                        <span>Do you have an account?</span>
                                        <Link href={APP_ROUTES.LOGIN} className="text-blue-600 hover:underline">Log in</Link>
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
