import { createContext, ReactNode, useContext, useState } from 'react';
import { esES, Localization } from '@material-ui/core/locale';

import { Loading } from '../components/Loading';

type LoaderState = { loading: boolean, showLoading: () => void, hideLoading: () => void };
type LocaleState = { lang: Localization, changeLang: (locale: Localization) => void };
type State = { loader: LoaderState, locale: LocaleState };

type AppProviderProps = { children: ReactNode }

const AppContext = createContext<State>({
    loader: {
        loading: false,
        showLoading: () => undefined,
        hideLoading: () => undefined,
    }, locale: {
        lang: esES,
        changeLang: (_locale: Localization) => undefined,
    }
});

function AppProvider({ children }: AppProviderProps) {
    const [ loading, setLoading ] = useState(false);
    const [ lang, setLang ] = useState(esES);

    const value: State = {
        loader: {
            loading,
            showLoading: () => setLoading(true),
            hideLoading: () => setLoading(false),
        }, locale: {
            lang,
            changeLang: (locale: Localization) => setLang(locale)
        }
    };

    return (
        <AppContext.Provider value={value}>
            <Loading open={loading} />

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
