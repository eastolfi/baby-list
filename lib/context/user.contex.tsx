import { useUser } from '@auth0/nextjs-auth0';
import { useState } from 'react';

import useUserService from '../../lib/services/user.service';
import { User } from '../../models';

export type UserState = {
    connectedUser: User | null;
    hasUser: boolean;
    email: string;
    isAdmin: boolean;
    fetchUser: () => void;
}
export const defaultState: UserState = {
    connectedUser: null,
    hasUser: false,
    email: '',
    isAdmin: false,
    fetchUser: () => undefined
}

type UserContext = {
    state: UserState;
}

export function useUserContext(): UserContext {
    const { user: sessionUser } = useUser();
    const { getUser } = useUserService()
    const [ user, setUser ] = useState((null as unknown) as User);

    const state: UserState = {
        connectedUser: user,
        hasUser: !!user,
        email: user?.email || '',
        isAdmin: !!(user?.isAdmin),
        fetchUser: () => {
            if (sessionUser?.email) {
                getUser(sessionUser.email).then(setUser).catch(console.error);
            }
        }
    };

    return {
        state 
    }
}
