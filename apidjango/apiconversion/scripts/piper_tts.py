import subprocess
import uuid
from pathlib import Path
import ffmpeg
import os

path_project = Path(__file__).resolve().parent.parent.parent
path_ffmpeg = Path(__file__).resolve().parent.parent
path_script = Path(__file__)

def path():
    print(path_project)

def test():
    
    path_piper=path_project / "piper" / "piper_windows_amd64" / "piper"  
    path_voices=path_project / "piper" / "voices" / "es" 
    output_path= Path(__file__).parent  
    
    print(path_piper)
    print(path_voices)
    print(output_path)

    
    texto = "Hola, esta voz fue generada localmente"
    command = [
        "{0}/piper.exe".format(path_piper.resolve()),
        "--model",
        "{0}/es_ES-sharvard-medium.onnx".format(path_voices.resolve()),
        "--output_file",
        "{0}/salida.wav".format(output_path.resolve())
    ]
    subprocess.run(
        command,
        input=texto.encode("utf-8")
    )
    print("Audio generado")

voices=[
    "es_ES-sharvard-medium.onnx",
    "en_US-lessac-medium.onnx"
]

class PiperTTS:
    
    def __init__(self,index,text):
        self.index=index
        self.text=text
        
        
    def stt(self):
        
        path_piper=path_project / "piper" / "piper_windows_amd64" / "piper"  
        path_voices=path_project / "piper" / "voices" / "es" 
        output_path= Path(__file__).parent  
        
        command = [
            "{0}/piper.exe".format(str(path_piper.resolve())),
            "--model",
            "{0}/es_ES-sharvard-medium.onnx".format(str(path_voices.resolve())),
            "--output_file",
            "{0}/salida.wav".format(str(output_path.resolve()))
        ]
        
        subprocess.run(
            command,
            input=self.text.encode("utf-8")
        )
        
        file_wav="salida.wav"
        output_file="output.mp3"
        
        print("*****")
        print((path_ffmpeg / "ffmpeg.exe").resolve())
        print("*******")
        
        #ffmpeg -i input.wav -vn -ar 44100 -ac 2 -b:a 192k output.mp3
        ffmpeg.input(file_wav).output(
            output_file,
            vn=None,
            ar=44100,
            ac=2,
            audio_bitrate="192k"
        ).run(
            cmd=str((path_ffmpeg / "ffmpeg.exe").resolve()),
            overwrite_output=True #sobrecribe el archivo si existe y evita la pregunta del binario
        )
        
        if os.path.exists(file_wav):
            os.remove(file_wav)
        else:
            print("El archivo no existe")


if __name__ == "__main__":
    #test()
    tts=PiperTTS(0,"Hola mundo")
    tts.stt()