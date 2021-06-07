import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Languages } from '../i18n/languages';

export type LocaleState = {
    lang: Languages,
    changeLang: (locale: Languages) => void
};

export const defaultState: LocaleState = {
    lang: Languages.ES,
    changeLang: (_lang: Languages) => undefined,
}

type LocaleContext = {
    state: LocaleState
}

export function useLocaleContext(): LocaleContext {
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

    const state: LocaleState = {
        lang,
        changeLang: (lang: Languages) => setLang(lang)
    }

    return {
        state
    }
}
