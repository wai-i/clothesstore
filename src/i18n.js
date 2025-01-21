import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // 可以自動偵測或讓使用者手動切換
  .use(initReactI18next)
  .init({
    // 預設語言，如果偵測不到，會 fallback
    fallbackLng: 'zh',
    debug: false, 
    interpolation: {
      escapeValue: false, // for react
    },
    resources: {
      zh: {
        common: require('./locales/zh/common.json')
      },
      en: {
        common: require('./locales/en/common.json')
      }
    }
  });

export default i18n;
