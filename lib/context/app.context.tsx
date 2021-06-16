import { createContext, ReactNode, useContext } from 'react'

import { useLoaderContext, LoaderState, defaultState as defaultLoaderState } from './loading.context';
import { useLocaleContext, LocaleState, defaultState as defaultLocaleState } from './locale.context';
import { useUserContext, UserState, defaultState as defaultUserState } from './user.contex';

type State = {
    loader: LoaderState,
    locale: LocaleState,
    connectedUser: UserState,
};

const AppContext = createContext<State>({
    loader: {
        ...defaultLoaderState
    }, locale: {
        ...defaultLocaleState
    }, connectedUser: {
        ...defaultUserState
    }
});

type AppProviderProps = { children: ReactNode }

function AppProvider({ children }: AppProviderProps) {
    const { state: LoaderState, LoaderComponent } = useLoaderContext();
    const { state: LocaleState } = useLocaleContext();
    const { state: UserState } = useUserContext();

    const value: State = {
        loader: {
            ...LoaderState
        }, locale: {
            ...LocaleState
        }, connectedUser: {
            ...UserState
        }
    };

    return (
        <AppContext.Provider value={value}>
            <LoaderComponent />

            { children }
        </AppContext.Provider>
    )
}

function useLoading(): LoaderState {
    return useContext(AppContext).loader;
}

function useLocale(): LocaleState {
    return useContext(AppContext).locale;
}

function useConnectedUser(): UserState {
    return useContext(AppContext).connectedUser;
}

export {
    AppProvider,
    useLoading,
    useLocale,
    useConnectedUser,
}
