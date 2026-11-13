import asyncio
from api.conversion.Utils import CheckInternetConnection
import requests
import edge_tts
import uuid
import os
from api.conversion.DataStatic import AUDIO_FOLDER_NAME
from api.conversion.PiperTTS import PiperTTS
import platform

class ManagedTTS:

    def __init__(self,vector_traduccion,path_file):
        self.vector_traduccion=vector_traduccion
        self.path_file=path_file
        self.names_files=[]
        asyncio.run(self.TTS())

    async def TTS(self):
        connection_state=CheckInternetConnection() 
        print("coneccion a internet: ",connection_state)
        if(connection_state and True): #si desea utilizar la api del sistema operativo cambia de True a False
            result=await self.edge_tts()

            if(result[0]):
                self.names_files=result[1]
                return
            else:
                print("An error in communication with Edge TTS has occurred. Operating system services will be used")
        
        
        name_system = platform.system().lower()
        data_name=[]

        error=False

        if(name_system=="windows"):
            print("utilizando tts del sistema windows")
            for index,data_text in enumerate(self.vector_traduccion):
                URL = "http://127.0.0.1:5000/tts_os"
                DATA = {
                    "language": "en" if index==0 else "es",
                    "data": data_text,
                }
                try:
                    response = requests.post(URL, json=DATA)

                    if response.status_code == 200:
                        data = response.json()
                        print('Post creado de forma exitosa')
                        print('Respuesta:', data)
                        data_name.append(data["data"])
                    else:
                        print('Error en la solicitud, detalles:', response.text)
                        error=True
                        break
                except:
                    print("Error al conectar al servicio de tts del sistema operativo")
                    error=True

            if(not error):
                self.names_files=data_name
                return
            
        
        print("utilizando proceso stt para linux o mac")
        for index,data_text in enumerate(self.vector_traduccion):
            name_resource='{0}.mp3'.format(uuid.uuid4())
            ptts=PiperTTS(index,self.vector_traduccion[index],name_resource)
            state=ptts.stt()
            if(state):
                print("todo se realizo correctamente")
                data_name.append(name_resource)
        self.names_files=data_name


    async def edge_tts(self):
        print("utilizando edge_tts()")
        voz_espanol = "es-ES-AlvaroNeural"
        voz_ingles = "en-US-GuyNeural"
        
        data=[]
        try:

            for index,data_text in enumerate(self.vector_traduccion):
                
                nombre_recurso='{0}.mp3'.format(uuid.uuid4())

                # Creamos el comunicador
                comunicadorespanol = edge_tts.Communicate(data_text, voice=(voz_ingles if index==0 else voz_espanol))
                
                # Guardamos el audio en MP3
                await comunicadorespanol.save(os.path.join(self.path_file,AUDIO_FOLDER_NAME,nombre_recurso))
                print("Audio generado correctamente: {0}".format(nombre_recurso))
                data.append(nombre_recurso)
            return [True,data]
        except:
            print("An error occurred while obtaining the resource")
            return [False,[]]

