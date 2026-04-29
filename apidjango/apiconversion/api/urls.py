from django.urls import path,include
from api.views import  *


urlpatterns = [
    path('texto_to_audio/', text_to_audio),
    path('audio_to_text/', audio_to_text),
    path('subtitulo_video/', subtitulo_video),
    path('descripcion_imagen/', descripcion_imagen),
    path('transcribe_audio/', transcribeAudio),
    path('corrector_phrase/', Corrector),
    path('translate_message/',text_translator)
]