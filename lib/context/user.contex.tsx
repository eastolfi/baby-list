import { useState } from 'react';
import useUserService from '../../lib/services/user.service';
import { User } from '../../models';

export type UserState = {
    user: User | null;
    fetchUser: () => void;
}
export const defaultState: UserState = {
    user: null,
    fetchUser: () => undefined
}

type UserContext = {
    state: UserState;
}

export function useUserContext(): UserContext {
    const { getUser } = useUserService()
    const [ user, setUser ] = useState((null as unknown) as User);

    const state: UserState = {
        user,
        fetchUser: () => {
            getUser('eastolfi91@gmail.com').then(setUser).catch(console.error);
        }
    };

    return {
        state 
    }
}
