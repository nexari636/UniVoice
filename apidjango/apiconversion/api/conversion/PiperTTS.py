import subprocess
import uuid
from pathlib import Path
import ffmpeg
import os
from api.conversion.DataStatic import PATH_FOLDER_CURRENT

path_project = Path(PATH_FOLDER_CURRENT).parent.parent.resolve()
path_ffmpeg = Path(PATH_FOLDER_CURRENT).parent.resolve()
path_data= Path(PATH_FOLDER_CURRENT).resolve()

voices=[
    "es_ES-sharvard-medium.onnx",
    "en_US-lessac-medium.onnx"
]

class PiperTTS:
    
    def __init__(self,index,text,name_file):
        self.index=index
        self.text=text
        self.name_file=name_file 
                
    def print_path(self):
        print("************************")
        print("path_project= ",path_project.resolve())
        print("path_ffmpeg= ",path_ffmpeg.resolve())
        print("path_data= ",path_data.resolve())
        print("************************")

    def stt(self):
        path_piper=path_project / "piper" / "piper_windows_amd64" / "piper"  
        path_voices=path_project / "piper" / "voices" 
        output_path= path_data / "recursos" / "audios"
        
        file_name_wav="{0}.{1}".format(uuid.uuid4(),"wav")
        #file_wav="{0}.wav".format(file_name_wav)
        output_file="{0}".format(self.name_file)
        
        path_file_wav=os.path.join(str(output_path.resolve()),file_name_wav)
        path_output_file=os.path.join(str(output_path.resolve()),output_file)
                
        print(path_file_wav)
        print(path_output_file)

        command = [
            os.path.join(str(path_piper.resolve()),"piper.exe"),
            "--model",
            os.path.join(str(path_voices.resolve()),("{0}{1}{2}".format("en","/",voices[1]) if self.index==0 else "{0}{1}{2}".format("es","/",voices[0]))),
            "--output_file",
            str(path_file_wav)
        ]
        
        print("command")
        print(command)
        
        subprocess.run(
            command,
            input=self.text.encode("utf-8")
        )

        print("*****")
        print((path_ffmpeg / "ffmpeg.exe").resolve())
        print("*******")
        
        #ffmpeg -i input.wav -vn -ar 44100 -ac 2 -b:a 192k output.mp3
        ffmpeg.input(path_file_wav).output(
            path_output_file,
            vn=None,
            ar=44100,
            ac=2,
            audio_bitrate="192k"
        ).run(
            #cmd=str((path_ffmpeg / "ffmpeg.exe").resolve()),
            overwrite_output=True #sobrecribe el archivo si existe y evita la pregunta del binario
        )
        
        if os.path.exists(path_file_wav):
            os.remove(path_file_wav)
        else:
            print("El archivo no existe")
            
        return True