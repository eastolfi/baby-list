import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

interface User {
    isLoggedIn: boolean;
    avatarUrl: string;
    login: string;
}

interface Params {
    redirectTo?: string,
    redirectIfFound?: boolean
}
export function useUser({ redirectTo, redirectIfFound }: Params = {}): { user: User, mutateUser: Function } {
    const { data: user, mutate: mutateUser } = useSWR<User>('/api/user');
    useEffect(() => {
        // if no redirect needed, just return (example: already on /dashboard)
        // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
        if (!redirectTo || !user) {
            return;
        }

        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
            // If redirectIfFound is also set, redirect if the user was found
            (redirectIfFound && user?.isLoggedIn)
        ) {
            Router.push(redirectTo);
        }
    }, [ user, redirectTo, redirectIfFound ]);

    return { user: user as User, mutateUser };
}