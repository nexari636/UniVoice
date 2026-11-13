from django.shortcuts import render
from api.conversion.LoadModels import LoadModels
from api.conversion.MsgConversion import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from api.conversion.MessageTranslation import MessageTranslation
from apiconversion.settings import DEBUG
from api.conversion.PiperTTS import PiperTTS


__ERROR_SISTEMA='Ha ocurrido un error en el sistema'
loadmodels=LoadModels()

@api_view(['POST'])
def text_to_audio(request):

    if request.method == 'POST':
        print(request.data)
        print(request.POST)

        datajson=request.data

        mensaje_texto=datajson["mensaje_texto"]

        conversion=MsgConversion(
            mensaje_texto=mensaje_texto,
            mensaje_file_base64=None,
            extencion=None,
            model_whisper=loadmodels.model_whisper,
            image_processor=loadmodels.image_processor,
            image_model=loadmodels.image_model,
            tokenizer_en_to_es=loadmodels.tokenizer_en_to_es,
            model_en_to_es=loadmodels.model_en_to_es,
            tokenizer_es_to_en=loadmodels.tokenizer_es_to_en,
            model_es_to_en=loadmodels.model_es_to_en,
            model_ollama_1b=loadmodels.model_ollama_1b
        )
        json_data=""
        if(not DEBUG): #poner not si se quiere utilizar edge tts si hay internet caso contrario se usara sapi5 
            json_data=conversion.text_to_audio_debug(None)
        else:
            json_data=conversion.text_to_audio(None)
        return Response(json_data, status=status.HTTP_200_OK)
    else:
        data["error"]=__ERROR_SISTEMA
        data=json.dumps(data) #convierte en cadena json


@api_view(['POST'])
def audio_to_text(request):

    if request.method == 'POST':
        #print(request.data)

        datajson=request.data

        file_base_64=datajson["file_base_64"]
        extencion=datajson["extencion"]

        conversion=MsgConversion(
            mensaje_texto=None,
            mensaje_file_base64=file_base_64,
            extencion=extencion,
            model_whisper=loadmodels.model_whisper,
            image_processor=loadmodels.image_processor,
            image_model=loadmodels.image_model,
            tokenizer_en_to_es=loadmodels.tokenizer_en_to_es,
            model_en_to_es=loadmodels.model_en_to_es,
            tokenizer_es_to_en=loadmodels.tokenizer_es_to_en,
            model_es_to_en=loadmodels.model_es_to_en,
            model_ollama_1b=loadmodels.model_ollama_1b
        )

        json_data=conversion.audio_to_text()
        return Response(json_data, status=status.HTTP_200_OK)
    else:
        data["error"]=__ERROR_SISTEMA
        data=json.dumps(data) #convierte en cadena json


@api_view(['POST'])
def subtitulo_video(request):

    if request.method == 'POST':
        #print(request.data)

        file_base_64=request.data["file_base_64"]
        extencion=request.data["extencion"]
        #print(file_base_64)

        conversion=MsgConversion(
            mensaje_texto=None,
            mensaje_file_base64=file_base_64,
            extencion=extencion,
            model_whisper=loadmodels.model_whisper,
            image_processor=loadmodels.image_processor,
            image_model=loadmodels.image_model,
            tokenizer_en_to_es=loadmodels.tokenizer_en_to_es,
            model_en_to_es=loadmodels.model_en_to_es,
            tokenizer_es_to_en=loadmodels.tokenizer_es_to_en,
            model_es_to_en=loadmodels.model_es_to_en,
            model_ollama_1b=loadmodels.model_ollama_1b
        )

        json_data=conversion.video_subtitle()
        return Response(json_data, status=status.HTTP_200_OK)
    else:
        data["error"]=__ERROR_SISTEMA
        data=json.dumps(data) #convierte en cadena json


@api_view(['POST'])
def descripcion_imagen(request):

    if request.method == 'POST':
        #print(request.data)

        file_base_64=request.data["file_base_64"]
        extencion=request.data["extencion"]

        conversion=MsgConversion(
            mensaje_texto=None,
            mensaje_file_base64=file_base_64,
            extencion=extencion,
            model_whisper=loadmodels.model_whisper,
            image_processor=loadmodels.image_processor,
            image_model=loadmodels.image_model,
            tokenizer_en_to_es=loadmodels.tokenizer_en_to_es,
            model_en_to_es=loadmodels.model_en_to_es,
            tokenizer_es_to_en=loadmodels.tokenizer_es_to_en,
            model_es_to_en=loadmodels.model_es_to_en,
            model_ollama_1b=loadmodels.model_ollama_1b
        )

        json_data=conversion.image_description()
        return Response(json_data, status=status.HTTP_200_OK)
    else:
        data["error"]=__ERROR_SISTEMA
        data=json.dumps(data) #convierte en cadena json


@api_view(['POST'])
def transcribeAudio(request):

    if request.method == 'POST':
        datajson=request.data

        file_base_64=datajson["file_base_64"]
        extencion=datajson["extencion"]

        conversion=MsgConversion(
            mensaje_texto=None,
            mensaje_file_base64=file_base_64,
            extencion=extencion,
            model_whisper=loadmodels.model_whisper,
            image_processor=loadmodels.image_processor,
            image_model=loadmodels.image_model,
            tokenizer_en_to_es=loadmodels.tokenizer_en_to_es,
            model_en_to_es=loadmodels.model_en_to_es,
            tokenizer_es_to_en=loadmodels.tokenizer_es_to_en,
            model_es_to_en=loadmodels.model_es_to_en,
            model_ollama_1b=loadmodels.model_ollama_1b
        )

        json_data=conversion.audio_to_text_from_mic()
        return Response(json_data, status=status.HTTP_200_OK)
    else:
        data["error"]=__ERROR_SISTEMA
        data=json.dumps(data) #convierte en cadena json


@api_view(['POST'])
def Corrector(request):
    if request.method == 'POST':
        datajson=request.data
        phrase=datajson["phrase"]        
        language=datajson["language"]

        print("La frase es= ",phrase)

        conversion=MsgConversion(
            mensaje_texto=None,
            mensaje_file_base64=None,
            extencion=None,
            model_whisper=loadmodels.model_whisper,
            image_processor=loadmodels.image_processor,
            image_model=loadmodels.image_model,
            tokenizer_en_to_es=loadmodels.tokenizer_en_to_es,
            model_en_to_es=loadmodels.model_en_to_es,
            tokenizer_es_to_en=loadmodels.tokenizer_es_to_en,
            model_es_to_en=loadmodels.model_es_to_en,
            model_ollama_1b=loadmodels.model_ollama_1b
        )

        json_data=conversion.corrector(phrase,language)
        return Response(json_data, status=status.HTTP_200_OK)

    else:
        data["error"]=__ERROR_SISTEMA
        data=json.dumps(data) #convierte en cadena json


@api_view(['POST'])
def text_translator(request):

    if request.method == 'POST':
        print(request.data)
        datajson=request.data

        text_message=datajson["text_message"]
        target_language=datajson["target_language"]

        message=text_message.strip()
        target_lng=target_language.strip()

        print("Mensaje: ",message)
        print("target_lng: ",target_lng)

        tanslater_msg=MessageTranslation(
            text_message=message,
            target_language=target_lng,
            multiple_translation_model=loadmodels.multiple_translation_model
        )

        json_data=""
        json_data=tanslater_msg.translator_model()[0]
        return Response(json_data, status=status.HTTP_200_OK)
    else:
        data["error"]=__ERROR_SISTEMA
        data=json.dumps(data) #convierte en cadena json



@api_view(['POST'])
def test_path(request):

    if request.method == 'POST':
        print(request.data)
        datajson=request.data

        ptts=PiperTTS(0,"")
        ptts.print_path()
        
        json_data={
            "sucess":"true"
        }
        return Response(json_data, status=status.HTTP_200_OK)