import i18n from 'i18next'
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";
import Russian from './translations/locales/Russian.json'
import English from './translations/locales/English.json'

export const resourcesForI18N = {
    Russian: {
        translation: Russian
    },
    English: {
        translation: English
    }
}

const resources = resourcesForI18N

i18n
    .use(I18nextBrowserLanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "Russian",
        debug: false,
        detection: {
            order: ["localStorage"],
            caches: ["localStorage"]
        },
        interpolation: {
            escapeValue: false
        }
    })

export default i18n