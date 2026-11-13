import ffmpeg
import pyttsx3
import os
import uuid
from PIL import Image
import json
from langdetect import detect
import uuid
from api.conversion.ManagedTTS import ManagedTTS
from api.conversion.DataStatic import *
from apiconversion.settings import STATICFILES_DIRS
from api.conversion.Utils import Converter_Base64,Converter_Base64_to_file,CheckInternetConnection,DeleteFile
import whisper
import emoji
import asyncio
import edge_tts
import requests
import time
import torch
from transformers import pipeline
import re
import unicodedata
from spellchecker import SpellChecker
import csv


class MsgConversion:

    def __init__(self,mensaje_texto,mensaje_file_base64,extencion,model_whisper,image_processor,image_model,tokenizer_en_to_es,model_en_to_es,tokenizer_es_to_en,model_es_to_en,model_ollama_1b,lock_whisper_small):
        self.model_whisper=model_whisper
        self.image_processor = image_processor
        self.image_model = image_model    
        self.tokenizer_en_to_es = tokenizer_en_to_es
        self.model_en_to_es= model_en_to_es
        self.tokenizer_es_to_en = tokenizer_es_to_en
        self.model_es_to_en = model_es_to_en
        self.model_ollama_1b=model_ollama_1b

        self.mensaje_texto=mensaje_texto
        self.ruta=PATH_RECURSOS

        self.lock_whisper_small=lock_whisper_small

        if(mensaje_file_base64!=None):
            self.mensaje_file_base64=mensaje_file_base64
            self.name_file="{0}.{1}".format(uuid.uuid4(),extencion) 
            self.ruta_absoluta=os.path.join(PATH_RECURSOS,OTHERS_FOLDER_NAME,self.name_file)
            Converter_Base64_to_file(mensaje_file_base64,self.ruta_absoluta)
            print("escrito terminadoooo")
        else:
            print("No tiene base64 ni extencion la instancia")


    #este metodo es solo para transcribir el audio de la barra de busqueda de la app movil
    def audio_to_text_from_mic(self):
        try:
            jsonresultado={}
            textoresultado=""
            print("Iniciando carga de modelo")
            model = self.model_whisper
            print("Transcribiendo..........")
            result = model.transcribe(self.ruta_absoluta, fp16=False)
            textoresultado=result["text"]
            print(textoresultado)
            jsonresultado["result"]=textoresultado
            jsonresultado["success"]=SUCCESS

            return jsonresultado        
        except:
            print("Ha ocurrido un error en la carga del modelo o procesamiento del audio")


    def audio_to_text(self):
        jsonresultado={}

        #try:

        with self.lock_whisper_small:

            textoresultado=""
            print("Iniciando carga de modelo")
            model = self.model_whisper
            print("Transcribiendo..........")
            result = model.transcribe(self.ruta_absoluta, fp16=False)
            textoresultado=result["text"]
            print(textoresultado)
            vector_traduccion=self.translation_detection(textoresultado)
            print("Resultado: {}".format(vector_traduccion))

            
            jsonresultado["namefile"]=self.name_file
            #jsonresultado["audiobase64"]="self.mensaje_file_base64"
            jsonresultado["messageingles"]=vector_traduccion[0]
            jsonresultado["messageespanol"]=vector_traduccion[1]
            jsonresultado["success"]=SUCCESS

            #csv_salida="C:/Users/jhon/Desktop/audios/data_audio_to_text_151.csv"

            #with open(csv_salida, mode="a", newline="", encoding="utf-8") as archivo_csv:
            #    writer = csv.writer(archivo_csv)
            #    writer.writerow([vector_traduccion[1].strip(),])
            #    print("proceso escritura terminado")

            return jsonresultado
        #return json.dumps(jsonresultado, ensure_ascii= False)
        
        #except:
        #    print("Ha ocurrido un error en la carga del modelo o procesamiento del audio")
        #    jsonresultado={}
        #    jsonresultado["namefile"]=self.name_file
        #    jsonresultado["audiobase64"]=self.mensaje_file_base64
        #    jsonresultado["messageingles"]="Unintelligible"
        #    jsonresultado["messageespanol"]="Inentendible"
        #    jsonresultado["success"]=SUCCESS
        #    return jsonresultado

    
    
    def text_to_audio(self,textop):
        jsonresultado={}

        if(textop!=None):
            texto=textop
        else:
            texto=self.mensaje_texto

        bandemoji=False
        textoresultemoji=[]

        print("este es el mensaje llegado= ",texto)
        vector_traduccion=self.translation_detection(texto)

        if(emoji.emoji_count(texto)>0):
            print("**el texto tiene emojins**")
            bandemoji=True
            textemojiEN=emoji.demojize(vector_traduccion[0], language=INGLES)
            textemojiES=emoji.demojize(vector_traduccion[1], language=ESPANOL)

            textemojiEN=textemojiEN.replace("::", " ").replace("_", " ")
            textemojiES=textemojiES.replace("::", " ").replace("_", " ")
            textoresultemoji=[textemojiEN,textemojiES]
        else:
            print("**EL TEXTO NO TIENE EMOJINS**")

        managed_tts=ManagedTTS(textoresultemoji if bandemoji else vector_traduccion, self.ruta)
        state_na="n/a"
        if len(managed_tts.names_files)>0:
            jsonresultado["dataaudioingles"]=dict(name_file=managed_tts.names_files[0],audiobase64ingles=Converter_Base64(os.path.join(self.ruta,AUDIO_FOLDER_NAME,managed_tts.names_files[0])))
            jsonresultado["dataaudioespanol"]=dict(name_file=managed_tts.names_files[1],audiobase64espanol=Converter_Base64(os.path.join(self.ruta,AUDIO_FOLDER_NAME,managed_tts.names_files[1])))
        else:
            jsonresultado["dataaudioingles"]=dict(name_file=state_na,audiobase64ingles=state_na)
            jsonresultado["dataaudioespanol"]=dict(name_file=state_na,audiobase64espanol=state_na)
        jsonresultado["messageingles"]=vector_traduccion[0]
        jsonresultado["messageespanol"]=vector_traduccion[1]
        jsonresultado["success"]=SUCCESS

        if False and len(managed_tts.names_files)>0:
            DeleteFile(os.path.join(self.ruta,AUDIO_FOLDER_NAME,managed_tts.names_files[0]))
            DeleteFile(os.path.join(self.ruta,AUDIO_FOLDER_NAME,managed_tts.names_files[1]))

        #solo elimina los mensajes en ingles
        DeleteFile(os.path.join(self.ruta,AUDIO_FOLDER_NAME,managed_tts.names_files[0]))

        return jsonresultado


    #solo debug para windows y distribuciones de linux instalando sudo apt install espeak ffmpeg libespeak1 --> instalar las voces para pyttsx3 (aunque las voces son roboticas)
    def text_to_audio_debug(self,textop):

        jsonresultado={}

        if(textop!=None):
            texto=textop
        else:
            texto=self.mensaje_texto

        bandemoji=False
        textoresultemoji=[]

        try:
            
            print("este es el mensaje llegado= ",texto)
            vector_traduccion=self.translation_detection(texto)

            if(emoji.emoji_count(texto)>0):
                print("**el texto tiene emojins**")
                bandemoji=True
                textemojiEN=emoji.demojize(vector_traduccion[0], language=INGLES)
                textemojiES=emoji.demojize(vector_traduccion[1], language=ESPANOL)

                textemojiEN=textemojiEN.replace("::", " ").replace("_", " ")
                textemojiES=textemojiES.replace("::", " ").replace("_", " ")
                textoresultemoji=[textemojiEN,textemojiES]
            else:
                print("**EL TEXTO NO TIENE EMOJINS**")

            engine = pyttsx3.init()
            rate = engine.getProperty('rate')   
            print ("Velocidad de voz: "+str(rate))  
            engine.setProperty('volume',1.0)
            engine.setProperty('rate', 115)
            voices = engine.getProperty('voices')
            index=0
            names_files=[]
            for x,data in enumerate(vector_traduccion if not bandemoji else textoresultemoji):
                index=0
                for i, voice in enumerate(voices):
                    if(x==1):
                        print("modo español")
                        if(voice.name.lower().find("spanish")>=0):
                            index=i
                            break
                    else:
                        print("modo ingles")
                        if(voice.name.lower().find("english")>=0):
                            index=i
                            break
                #print(f"{i}: {voice.name} - {voice.id} - {voice.languages}")
                print("voz seleccionada {}".format(voices[index].name))
                nombre_recurso='{0}.mp3'.format(uuid.uuid4())
                engine.setProperty('voice', voices[index].id) 
                print("data es: "+data)
                engine.save_to_file(data,os.path.join(self.ruta,AUDIO_FOLDER_NAME,nombre_recurso))
                engine.runAndWait()
                names_files.append(nombre_recurso)

            jsonresultado["dataaudioingles"]=dict(name_file=names_files[0],audiobase64ingles=Converter_Base64(os.path.join(self.ruta,AUDIO_FOLDER_NAME,names_files[0])))
            jsonresultado["dataaudioespanol"]=dict(name_file=names_files[1],audiobase64espanol=Converter_Base64(os.path.join(self.ruta,AUDIO_FOLDER_NAME,names_files[1])))
            
            jsonresultado["messageingles"]=vector_traduccion[0]
            jsonresultado["messageespanol"]=vector_traduccion[1]

            jsonresultado["success"]=SUCCESS
            return jsonresultado
            #return json.dumps(jsonresultado, ensure_ascii= False)
                
        except:
            print("Ha ocurrido un error en el procesamiento del texto")
            data=self.text_to_audio("Inentendible")
            return data

    def video_subtitle(self):
        try:
            ooidtextnamefile="{0}.mp3".format(uuid.uuid4())
            ffmpeg.input(self.ruta_absoluta).output(os.path.join(self.ruta,VIDEOS_FOLDER_NAME,"{0}".format(ooidtextnamefile))).run()
            model = self.model_whisper
            result = model.transcribe(os.path.join(self.ruta,VIDEOS_FOLDER_NAME,ooidtextnamefile) , fp16=False)
            text_complete=result["text"]
            text_segments=result["segments"]
            #print(text_complete)
            #print(text_segments)
            os.remove(os.path.join(self.ruta,VIDEOS_FOLDER_NAME,ooidtextnamefile))

            jsonarraydata=[]

            for jsonsegmen in text_segments:
                jsondata={}
                time_start=jsonsegmen["start"]
                time_end=jsonsegmen["end"]
                text_segmen=jsonsegmen["text"]

                vector_traduccion=self.translation_detection(text_segmen)
                diferencia=time_end-time_start

                jsondata["start"]=time_start
                jsondata["end"]=time_end
                jsondata["diferencia"]=diferencia
                jsondata["textsegmenenglish"]=vector_traduccion[0].strip()
                jsondata["textsegmenespanish"]=vector_traduccion[1].strip()
                jsonarraydata.append(jsondata)
                print(jsondata)

            jsonresultado={}
            jsonresultado["videobase64"]=self.mensaje_file_base64
            jsonresultado["namefile"]=self.name_file
            jsonresultado["data_video"]=jsonarraydata
            jsonresultado["success"]=SUCCESS

            return jsonresultado
            #return json.dumps(jsonresultado, ensure_ascii=False)
            
        except:
            print("Error al subtitular el video")
            jsonarraydata=[]
            jsonresultado={}
            jsonresultado["videobase64"]=self.mensaje_file_base64
            jsonresultado["namefile"]=self.name_file
            jsonresultado["data_video"]=jsonarraydata
            jsonresultado["success"]=SUCCESS

            return jsonresultado



    def image_description(self):
        
        diccionariodata={}

        try:
            processor = self.image_processor
            model = self.image_model
            image = Image.open(self.ruta_absoluta)
            textpro = "A picture of"
            inputs = processor(images=image,text=textpro, return_tensors="pt")
            outputs = model.generate(**inputs)
            print(outputs)    
            description = processor.decode(outputs[0], skip_special_tokens=True)
            print("Descripción:", description)
            data_imagen=self.text_to_audio(description)
            diccionariodata=data_imagen
            
            diccionariodata["imagenbase64"]=self.mensaje_file_base64
            diccionariodata["nameimagen"]=self.name_file

            return diccionariodata

            #return json.dumps(diccionariodata, ensure_ascii=False)

        except:
            print("Error al procesar la imagen")
            diccionariodata={}
            data_imagen=self.text_to_audio("Inentendible")
            diccionariodata=data_imagen
            diccionariodata["imagenbase64"]=self.mensaje_file_base64
            diccionariodata["nameimagen"]=self.name_file
            return diccionariodata
        


    def chat_ia(self,promt):
        #model_id = "meta-llama/Llama-3.2-1B-Instruct"
        pipe = self.model_ollama_1b
        inicio = time.time()
        messages = [
            {"role": "user", "content": promt},
        ]
        outputs = pipe(
            messages,
            max_new_tokens=256,
            temperature=0.2,
            top_p=0.95
        )
        fin = time.time()
        print("Tiempo empleado= ",fin-inicio)
        result=outputs[0]["generated_text"][-1]
        print(result)
        return result
    

    def corrector(self,text,language):
        #separa los acentos de la cadena para su eliminacion
        cadena = unicodedata.normalize('NFD', text)
        cadena = ''.join(c for c in cadena if unicodedata.category(c) != 'Mn')
        #quitar puntos comas etc.. solo permite numeros, letras y espacios
        cad = re.sub(r"[^a-zA-Z0-9\s]", "", text)

        result=self.chat_ia("You are a spelling corrector. Correct only the spelling errors in the given sentence, without adding or removing words, and provide the entire corrected sentence enclosed within a single pair of braces {{}}, without separating words. Do not add explanations, introductions, or repeat the original sentence. Sentence: Frase: {fr}".format(fr=cad))
        result=result["content"]
        print("resultado final= ",result)
        process_text=""
        if "{" in result and "}" in result and result.count("{")<=1 and result.count("}")<=1 :
            print("cumple")
            resultado = re.search(r"\{([^}]*)\}", result)
            if resultado:
                resultado=resultado.group(1)
                print(resultado)

                vector_cadresul_ai=resultado.split(" ")
                vector_cadresul=cad.split(" ")

                print("Longitud 1= ",len(vector_cadresul_ai))
                print("Longitud 2= ",len(vector_cadresul))

                if(len(vector_cadresul_ai)==len(vector_cadresul)):
                    print("Las longitudes son iguales")
                    process_text=resultado
                else:
                    print("Las longitudes son desiguales")
                    process_text=cad
        else:
            print("no cumple")
            process_text=cad
        
        process_text=process_text.strip()
        spell = SpellChecker(language='es' if language=='es' else 'en')
        spell.word_frequency.load_text_file(os.path.join(PATH_RECURSOS,"dictionary/",'dic_es.txt' if language=='es' else 'dic_en.txt'))

        vector_cad=process_text.split(" ")
        cad_aux=""
        print(vector_cad)

        for num in range(len(vector_cad)):
            misspelled = spell.unknown([vector_cad[num]])
            print("*****************************")

            print(misspelled)
            if misspelled:
                print("tiene palabras desconocidas")
                correcion=spell.correction(list(misspelled)[0])
                print("correcion= ",correcion)
                cad_aux+=correcion+" "
            else:
                print("no tiene palabras desconocidas")
                cad_aux+=vector_cad[num]+" "
                continue
            print("*****************************")


        print("correcion final= ",cad_aux)
        cad_aux=cad_aux.strip()
        datafin={}
        datafin["data"]=cad_aux
        return datafin


    #/******************************* METODOS PARA TRADUCCION **********************************************/

    #retorna en la posicion 0 el texto en ingles y en la posicion 1 en español
    def translation_detection(self,texto):
        try:
            #print("texto traduccion= ",texto)
            texto_ingles=""
            texto_espanol=""
            deteccion=detect(texto)
            #print("esta es la deteccon= ",deteccion)
        
            if deteccion==INGLES:
                texto_ingles=texto
                texto_espanol=self.translation(texto,ESPANOL)
            elif deteccion==ESPANOL:
                texto_ingles=self.translation(texto,INGLES)
                texto_espanol=texto
            else:
                print("Ha ocurrido un error en la traduccion")
                texto_ingles=texto
                texto_espanol=texto
        except:
            print("Error en la traduccion")
            texto_ingles=texto
            texto_espanol=texto
        return [texto_ingles,texto_espanol]


    #Funcion para traducir el texto
    def translation(self,texto_traducir,idioma):
        try:
            tokenizer=None
            model=None

            if(idioma=='es'):
                tokenizer = self.tokenizer_en_to_es
                model = self.model_en_to_es
            elif(idioma=='en'):
                tokenizer = self.tokenizer_es_to_en
                model = self.model_es_to_en
            else:
                print("Error!! el idioma detectado es desconocido")
                return texto_traducir
                
            sample_text = texto_traducir
            inputs = tokenizer([sample_text], return_tensors="pt")
            outputs  = model.generate(**inputs)
            result=tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]
            return result
        except:
            print("Error en la traduccion")