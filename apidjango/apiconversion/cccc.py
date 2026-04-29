import emoji
import  MANAGED_TTS,DeleteFile,Converter_Base64,SUCCESS,INGLES,ESPANOL
import os 
from traduccion_deteccion import Traduccion_Deteccion
import pyttsx3
import uuid 

def TextotoAudio(self):
        jsonresultado={}
        texto=self.mensaje_texto
        bandemoji=False
        textoresultemoji=[]
        print("este es el mensaje llegado= ",texto)
        vector_traduccion=self.traduccion_deteccion(texto)
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
        managed_tts=MANAGED_TTS(textoresultemoji if bandemoji else vector_traduccion, self.ruta)
        jsonresultado["dataaudioingles"]=dict(name_file=managed_tts.names_files[0],audiobase64ingles=Converter_Base64(os.path.join(self.ruta,managed_tts.names_files[0])))
        jsonresultado["dataaudioespanol"]=dict(name_file=managed_tts.names_files[1],audiobase64espanol=Converter_Base64(os.path.join(self.ruta,managed_tts.names_files[1])))
        jsonresultado["messageingles"]=vector_traduccion[0]
        jsonresultado["messageespanol"]=vector_traduccion[1]
        jsonresultado["success"]=SUCCESS
        DeleteFile(os.path.join(self.ruta,managed_tts.names_files[0]))
        DeleteFile(os.path.join(self.ruta,managed_tts.names_files[1]))
        return jsonresultado


def TextotoAudio(self,textop):
        jsonresultado={}
        if(textop!=None):
            texto=textop
        else:
            texto=self.mensaje_texto
        bandemoji=False
        textoresultemoji=[]
        try:
            print("este es el mensaje llegado= ",texto)
            vector_traduccion=self.traduccion_deteccion(texto)
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
                engine.save_to_file(data,os.path.join(self.ruta,nombre_recurso))
                engine.runAndWait()
                names_files.append(nombre_recurso)
            jsonresultado["dataaudioingles"]=dict(name_file=names_files[0],audiobase64ingles=Converter_Base64(os.path.join(self.ruta,names_files[0])))
            jsonresultado["dataaudioespanol"]=dict(name_file=names_files[1],audiobase64espanol=Converter_Base64(os.path.join(self.ruta,names_files[1])))
            jsonresultado["messageingles"]=vector_traduccion[0]
            jsonresultado["messageespanol"]=vector_traduccion[1]
            jsonresultado["success"]=SUCCESS
            return jsonresultado                
        except:
            print("Ha ocurrido un error en el procesamiento del texto")
            data=self.TextotoAudio("Inentendible")
            return data