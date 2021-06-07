import { createContext, ReactNode, useContext } from 'react'

import { useLoaderContext, LoaderState, defaultState as defaultLoaderState } from './loading.context';
import { useLocaleContext, LocaleState, defaultState as defaultLocaleState } from './locale.context';

type State = {
    loader: LoaderState,
    locale: LocaleState
};

const AppContext = createContext<State>({
    loader: {
        ...defaultLoaderState
    }, locale: {
        ...defaultLocaleState
    }
});

type AppProviderProps = { children: ReactNode }

function AppProvider({ children }: AppProviderProps) {
    const { state: LoaderState, LoaderComponent } = useLoaderContext();
    const { state: LocaleState } = useLocaleContext();

    const value: State = {
        loader: {
            ...LoaderState
        }, locale: {
            ...LocaleState
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

export {
    AppProvider,
    useLoading,
    useLocale,
}
