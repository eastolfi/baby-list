import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Loading } from '../components/Loading';
import { Languages } from './i18n/languages';

type LoaderState = { loading: boolean, showLoading: () => void, hideLoading: () => void };
type LocaleState = { lang: Languages, changeLang: (locale: Languages) => void };
type State = { loader: LoaderState, locale: LocaleState };

type AppProviderProps = { children: ReactNode }

const AppContext = createContext<State>({
    loader: {
        loading: false,
        showLoading: () => undefined,
        hideLoading: () => undefined,
    }, locale: {
        lang: Languages.ES,
        changeLang: (_lang: Languages) => undefined,
    }
});

function AppProvider({ children }: AppProviderProps) {
    const [ loading, setLoading ] = useState(false);
    const [ lang, setLang ] = useState(Languages.ES);
    const { i18n } = useTranslation();

    useEffect(() => {
        const userLang = localStorage.getItem('user-lang') || Languages.fromNavigator();
        setLang(Languages.findByCode(userLang));
    }, []);

    useEffect(() => {
        localStorage.setItem('user-lang', lang.code);
        i18n.changeLanguage(lang.code);
    }, [lang]);

    const value: State = {
        loader: {
            loading,
            showLoading: () => setLoading(true),
            hideLoading: () => setLoading(false),
        }, locale: {
            lang,
            changeLang: (lang: Languages) => setLang(lang)
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
