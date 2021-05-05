import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
import translationEn from './locales/en/translationEn.json'
import translationSp from './locales/sp/translationSp.json'

const resources = {
  en: {
    translation: translationEn
  },
  sp: {
    translation: translationSp
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
   
    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });


export default i18n;