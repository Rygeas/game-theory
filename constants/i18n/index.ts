import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tr from "./tr";
import en from "./en";

const resources = {
  tr: { translation: tr },
  en: { translation: en },
};

export const LANGUAGES = [
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;

type LanguageCode = (typeof LANGUAGES)[number]["code"];

// Önce AsyncStorage'dan dil çek, yoksa İngilizce başlat
AsyncStorage.getItem("language").then((savedLang) => {
  const lng = (savedLang as LanguageCode) ?? "en";

  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
});

export const changeLanguage = async (lang: LanguageCode) => {
  await AsyncStorage.setItem("language", lang);
  i18n.changeLanguage(lang);
};

export default i18n;
