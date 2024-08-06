import i18n from 'i18next';
import {initReactI18next} from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

const options = {
    order: ['querystring', 'navigator']
}

i18n
    .use(HttpApi)
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        debug: true,
        detection: options,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
    });

export default i18n;