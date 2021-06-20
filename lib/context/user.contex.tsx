import { useUser } from '@auth0/nextjs-auth0';
import { useEffect } from 'react';
import { useState } from 'react';

import useUserService from '../../lib/services/user.service';
import { User } from '../../models';

export type UserState = {
    connectedUser: User | null;
    hasUser: boolean;
    email: string;
    isAdmin: boolean;
}
export const defaultState: UserState = {
    connectedUser: null,
    hasUser: false,
    email: '',
    isAdmin: false,
}

type UserContext = {
    state: UserState;
}

export function useUserContext(): UserContext {
    const { user: sessionUser } = useUser();
    const { getUser } = useUserService()
    const [ user, setUser ] = useState((null as unknown) as User);

    useEffect(() => {
        if (sessionUser?.email) {
            getUser(sessionUser.email).then(setUser).catch(console.error);
        }
    }, [ sessionUser ])

    const state: UserState = {
        connectedUser: user,
        hasUser: !!user,
        email: user?.email || '',
        isAdmin: !!(user?.isAdmin),
    };

    return {
        state 
    }
}
