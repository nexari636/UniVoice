
import time
from transformers import pipeline
import torch
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


def translator_ia(text,target_language):
    lang_detect=detect_language(text)
    model_id = "facebook/nllb-200-distilled-600M"
    pipe = pipeline("translation",model=model_id, device=-1)
    inicio = time.time()
    data = pipe(
        text,
        src_lang=lang_detect, #idioma origen
        tgt_lang=target_language #idioma destino
    )
    fin = time.time()
    print("Tiempo empleado= ",fin-inicio)
    result=data
    print(result)
    return result


def detect_language(text):
    lang_iso = detect(text)
    lang=dict_languages[lang_iso]
    print(lang)
    return lang

#detect_language("История - это социальная наука, которая изучает, анализирует и интерпретирует прошлое человечества, используя первичные (прямые) и вторичные источники (позднее исследования) для хронологического упорядочения событий и понимания их причин и последствий.")
#print(dict_languages["hi"])
translator_ia(
    text="История - это социальная наука, 😀🤣🤣🤣😂😂 которая изучает, анализирует и интерпретирует прошлое человечества, используя первичные (прямые) и вторичные источники (позднее исследования) для хронологического упорядочения событий и понимания их причин и последствий.",
    target_language=dict_languages["hi"]
)