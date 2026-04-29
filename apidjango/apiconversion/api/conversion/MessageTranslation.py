import time
from transformers import pipeline
from langdetect import detect

dict_languages={
    "hi":"hin_Deva",
    "pt":"por_Latn",
    "fr":"fra_Latn",
    "ru":"rus_Cyrl",
    "de":"deu_Latn",
    "ja":"jpn_Jpan",
    "ko":"kor_Hang",
    "it":"ita_Latn",
    "tr":"tur_Latn",
    "id":"ind_Latn",
    "vi":"vie_Latn",
    "es":"spa_Latn",
    "en":"eng_Latn",
    "zh":"zho_Hans"
}

class MessageTranslation:

    def __init__(self,text_message,target_language):
        self.text_message=text_message
        self.target_language=target_language

    def translator_model(self):
        lang_detect=self.detect_language(self.text_message)
        model_id = "facebook/nllb-200-distilled-600M"
        pipe = pipeline("translation",model=model_id, device=-1)
        inicio = time.time()
        data = pipe(
            self.text_message,
            src_lang=lang_detect, #idioma origen
            tgt_lang=dict_languages[self.target_language] #idioma destino
        )
        fin = time.time()
        print("Tiempo empleado= ",fin-inicio)
        result=data
        print(result)
        return result

    def detect_language(self,text):
        lang_iso = detect(text)
        lang=dict_languages[lang_iso]
        print(lang)
        return lang
        