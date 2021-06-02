import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources: Resource = {
    esES: {
        translation: {
            pruebas: 'Holi'
        }
    },
    frFR: {
        translation: {
            pruebas: 'Hi there'
        }
    }
}

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
