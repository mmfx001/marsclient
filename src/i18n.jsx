import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: "uz", // Default language
        fallbackLng: "uz",
        debug: true,
        interpolation: {
            escapeValue: false, // React already does escaping
        },
        resources: {
            uz: {
                translation: require('./Lang/uz.json'),
            },
            ru: {
                translation: require('./Lang/ru.json'),
            },
        },
    });

export default i18n;
