import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

import esES from './es.json';
import frFR from './fr.json';

const resources: Resource = { esES: { translation: esES }, frFR: { translation: frFR } };

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'esES',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
