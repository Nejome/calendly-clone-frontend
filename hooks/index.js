import { useState, useEffect } from 'react';
import {getAuthenticatedUser} from "../helpers";
import { APP_ROUTES } from '../utils/constants';
import {useRouter} from "next/router";

export function useUser(redirectIfNotAuthenticated = false) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        function getUserDetails() {
            const user = getAuthenticatedUser();

            if (redirectIfNotAuthenticated && !user) {
                router.push(APP_ROUTES.LOGIN);
                return;
            }

            setUser(user);
        }

        getUserDetails();
    }, []);

    return { user };
}