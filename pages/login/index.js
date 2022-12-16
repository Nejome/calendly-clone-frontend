import Head from 'next/head'
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import {API_ROUTES, APP_ROUTES} from "../../utils/constants";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getAuthenticatedUser, storeUserInLocalStorage} from "../../helpers";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import http from "../../services/http";
import * as yup from "yup";

export const schema = yup.object({
    email: yup.string().email('The email field must valid email address').required('The email field is required'),
    password: yup.string().required('The password field is required'),
}).required();

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const redirectIfAuthenticated = () => {
            const authenticatedUser = getAuthenticatedUser();

            if (authenticatedUser) {
                router.push(APP_ROUTES.HOME);
            }
        };

        redirectIfAuthenticated();
    }, [router]);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            const response = await http.post(`${API_ROUTES.LOGIN}`, data);

            storeUserInLocalStorage(response.data);

            router.push(APP_ROUTES.HOME);
        }
        catch (err) {
            let errorMessage = err.response?.data?.message
                ? err.response.data.message
                : 'An error occurred during the login process';

            setError(errorMessage);
        }
        finally {
            setLoading(false);
        }
    }

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
                    <div className="flex flex-col lg:flex-row gap-10 lg:gap-5">
                        <div className="w-full lg:w-1/2">
                            <h1 className="text-6xl w-full lg:w-8/12 text-[#0a3558] font-extrabold">Welcome Back to <span className="text-blue-600">Calendly</span></h1>

                            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 w-full lg:w-10/12">
                                {error &&
                                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                        {error}
                                    </div>
                                }
                                <div className="mt-7">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Email</label>
                                    <input type="text" {...register('email')} className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your email"/>
                                    <p className="text-red-600 mt-1">{errors.email?.message}</p>
                                </div>

                                <div className="mt-7">
                                    <label className="block text-[#0a3558] text-lg font-extrabold">Password</label>
                                    <input type="password" {...register('password')} className="mt-1 border border-[#f2f5fa] shadow p-4 block w-full rounded outline-none focus:border-blue-500 transition-all" placeholder="Enter your password"/>
                                    <p className="text-red-600 mt-1">{errors.password?.message}</p>
                                </div>

                                <div className="mt-7 text-center">
                                    <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700 rounded-2xl px-4 py-3 text-lg transition-all w-full flex gap-3 justify-center items-center disabled:bg-blue-500" disabled={loading}>
                                        Login
                                        {loading && <FontAwesomeIcon icon={faCircleNotch} className="spinner" />}
                                    </button>
                                    <div className="text-[#0a3558] flex gap-2 mt-5">
                                        <span>Do not have an account?</span>
                                        <Link href={APP_ROUTES.REGISTER} className="text-blue-600 hover:underline">Register</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="w-full lg:w-1/2 flex items-center">
                            <div className="p-4 border border-[#E7EDF6] rounded-lg hover:shadow group bg-white">
                                <p className=" bg-blue-50 text-blue-600 rounded-lg w-fit px-2 py-2 uppercase">What is Calendly?</p>
                                <h1 className="mt-5 text-3xl text-[#0a3558]">Easy scheduling ahead</h1>
                                <p className="mt-5 text-[#0a3558]  font-extralight">Calendly is your scheduling automation platform for eliminating the back-and-forth emails for finding the perfect time — and so much more.</p>
                                <a href="#" className="text-blue-600 text-lg group-hover:text-[#0a3558] mt-5 block flex items-center gap-2">
                                    Learn More
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
