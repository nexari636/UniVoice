#cmd /c "start /B python serviceFlaskTTS.py > output.log 2>&1"
#ejecutarlo de esa manera pórque necesita una session de escritorio activa
#tasklist /FI "IMAGENAME eq python.exe" --> ver los procesos de python activos

#cerrar proceso:
#taskkill /PID 4320 /F --> comando
#/PID 4320 -> indica el proceso específico a cerrar
#/F --> fuerza el cierre del proceso

import pyttsx3
import uuid
import os
from flask import Flask,jsonify,request

app = Flask(__name__)
port = 5000

PATH_SCRIPT = os.path.dirname(os.path.abspath(__file__))
RESOURCE_ROUTE=os.path.join(PATH_SCRIPT,"apiconversion/api/recursos/")
print(RESOURCE_ROUTE)
KEY_LANGUAGE="language"
KEY_DATA="data"

@app.route('/tts_os', methods=['POST'])
def tts():
    if request.method == 'POST':
        json_data=request.json

        if((KEY_LANGUAGE in json_data) and (KEY_DATA in json_data)):
            name_file=TTS_operating_system(json_data[KEY_LANGUAGE],json_data[KEY_DATA])
            response = {
                "data": name_file,
                'message': 'success'
            }
            return jsonify(response)
        else:
            return jsonify({"message":"does not have the required format [language, data]"})
    else:        
        return jsonify({"message":"Method not supported, POST required"})


def TTS_operating_system(language,text):

    path_file=os.path.join(RESOURCE_ROUTE,"audios/")
    engine = pyttsx3.init()
    rate = engine.getProperty('rate')   
    print ("Velocidad de voz: "+str(rate))  
    engine.setProperty('volume',1.0)
    engine.setProperty('rate', 115)
    voices = engine.getProperty('voices')

    index=0
    for i, voice in enumerate(voices):
        if(voice.name.lower().find("spanish")>=0 and language=='es'):
            print("modo español")
            index=i
            break
        elif(voice.name.lower().find("english")>=0 and language=='en'):
            print("modo ingles")
            index=i
            break
    print("voz seleccionada {}".format(voices[index].name))
    nombre_recurso='{0}.mp3'.format(uuid.uuid4())
    print("nombre del recurso {0}".format(nombre_recurso))
    engine.setProperty('voice', voices[index].id) 
    print("data es: "+text)
    engine.save_to_file(text,os.path.join(path_file,nombre_recurso))
    engine.runAndWait()
    return nombre_recurso


if __name__ == '__main__':
    app.run(host='127.0.0.1', debug=True, port=port)