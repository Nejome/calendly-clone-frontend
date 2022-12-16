import Head from 'next/head'
import Header from "../../components/Header";
import PageTitle from "../../components/PageTitle";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {getAuthenticatedUser, storeUserInLocalStorage} from "../../helpers";
import {API_ROUTES, APP_ROUTES} from "../../utils/constants";
import {useUser} from "../../hooks";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import http from "../../services/http";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from "yup";

export const schema = yup.object({
    name: yup.string().required('The name field is required'),
    email: yup.string().email('The email field must valid email address').required('The email field is required'),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'The password confirmation does not match')
}).required();

export default function Profile() {
    const router = useRouter();
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            const response = await http.put(`${API_ROUTES.UPDATE_PROFILE}`, data);

            storeUserInLocalStorage({...user, name: data.name, email: data.email});

            toast(response.data.message, {
                type: "success",
                position: "top-left",
                autoClose: 3000,
            });
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
                <title>Calendly Clone - Profile</title>
                <meta name="description" content="Calendly Clone - Profile" />
                <link rel="icon" type="image/x-icon" href="/logo.svg" />
            </Head>

            <Header />

            <PageTitle title="Profile"/>

            <main className="mt-5">
                <div className="container mx-auto p-5">
                    {user &&
                        <div className="border border-[#666a73] rounded px-7 pt-10 pb-7 bg-white w-full lg:w-8/12 mx-auto mt-5">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {error &&
                                    <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                        {error}
                                    </div>
                                }
                                <div className="grid grid-cols-6 gap-5">
                                    <div className="col-span-6 lg:col-span-3">
                                        <label>Name <sup className="text-red-600">*</sup></label>
                                        <input type="text" defaultValue={user.name} {...register('name')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                        <p className="text-red-600 mt-1">{errors.name?.message}</p>
                                    </div>
                                    <div className="col-span-6 lg:col-span-3">
                                        <label>Email <sup className="text-red-600">*</sup></label>
                                        <input type="text" defaultValue={user.email} {...register('email')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                        <p className="text-red-600 mt-1">{errors.email?.message}</p>
                                    </div>

                                    <div className="col-span-6 lg:col-span-3">
                                        <label>Password</label>
                                        <input type="password" {...register('password')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                    </div>
                                    <div className="col-span-6 lg:col-span-3">
                                        <label>Password Confirmation</label>
                                        <input type="password" {...register('password_confirmation')} className="mt-1 border border-[#b2b2b2] px-3 py-2 block w-full rounded outline-none focus:border-2 focus:border-blue-500 transition-all"/>
                                        <p className="text-red-600 mt-1">{errors.password_confirmation?.message}</p>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button type="submit" className="bg-blue-600 mx-auto text-white hover:bg-blue-700 rounded-2xl px-4 py-2 transition-all flex gap-3 justify-center items-center disabled:bg-blue-500" disabled={loading}>
                                        Update
                                        {loading && <FontAwesomeIcon icon={faCircleNotch} className="spinner" />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </div>
            </main>
        </div>
    )
}
