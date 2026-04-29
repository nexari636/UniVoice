import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";
import * as Localization from "expo-localization";
import TranslationEs from '@/assets/locales/es.json'
import TranslationEn from '@/assets/locales/en.json'
import TranslationHi from '@/assets/locales/hi.json'
import TranslationPt from '@/assets/locales/pt.json'
import TranslationFr from '@/assets/locales/fr.json'
import TranslationRu from '@/assets/locales/ru.json'
import TranslationDe from '@/assets/locales/de.json'
import TranslationJa from '@/assets/locales/ja.json'
import TranslationKo from '@/assets/locales/ko.json'
import TranslationIt from '@/assets/locales/it.json'
import TranslationTr from '@/assets/locales/tr.json'
import TranslationId from '@/assets/locales/id.json'
import TranslationVi from '@/assets/locales/vi.json'
import TranslationZh from '@/assets/locales/zh.json'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_IDIOMAUSER } from "@/components/utils/Keys";

const resources = {
    "es": { translation: TranslationEs },
    "en": { translation: TranslationEn },
    "hi": {translation: TranslationHi},
    "pt": {translation: TranslationPt},
    "fr": {translation:TranslationFr},
    "ru": {translation:TranslationRu},
    "de": {translation:TranslationDe},
    "ja": {translation:TranslationJa},
    "ko": {translation: TranslationKo},
    "it": {translation: TranslationIt},
    "tr":{translation: TranslationTr},
    "id": {translation: TranslationId},
    "vi": {translation: TranslationVi},
    "zh": {translation:TranslationZh}
}

/*const initI18n = async () => {
    const savedLanguage = await AsyncStorage.getItem(KEY_IDIOMAUSER)
    console.log("idioma user= "+savedLanguage);
    let idioma="";
    if(savedLanguage!=null){
        idioma=savedLanguage;
    }
    else{
        idioma = Localization.getLocales()[0].languageCode||'es';
        console.log("idioma detect= "+idioma);
    }

    i18n.use(initReactI18next).init({
            resources,
            lng: idioma,
            fallbackLng: "es",
            interpolation: {
                escapeValue: false,
            },
        });
};*/

const initI18n = () => {
    
    const idioma = Localization.getLocales()[0].languageCode||'es';
    console.log("idioma detect= "+idioma);
    
    i18n.use(initReactI18next).init({
            resources,
            lng: idioma,
            fallbackLng: "es",
            interpolation: {
                escapeValue: false,
            },
        });
};

initI18n();
export default i18n;