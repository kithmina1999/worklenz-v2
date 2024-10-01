import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// component based translation files
// english
import loginPageEn from './locales/en/loginPage.json'
import signupPageEn from './locales/en/signupPage.json'
import forgotPasswordPageEn from './locales/en/forgotPasswordPage.json'
import notFoundPageEn from './locales/en/notFoundPage.json'
import navbarEn from './locales/en/navbar.json'

const resources = {
    en: {
        loginPage: loginPageEn,
        signupPage: signupPageEn,
        forgotPasswordPage: forgotPasswordPageEn,
        notFoundPage: notFoundPageEn,
        navbar: navbarEn,
    },
}

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
