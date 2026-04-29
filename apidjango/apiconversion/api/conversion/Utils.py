
import base64
import os
import time
import subprocess
import platform
import socket

def Converter_Base64(ruta_absoluta):
    try:
        file_text = open(ruta_absoluta, 'rb')
        file_read = file_text.read()
        file_encode = base64.b64encode(file_read).decode("utf-8")
        return file_encode
    except:
        print("Error en el procesamiento de los archivos")


def Converter_Base64_to_file(base_64,name_file):    
    #try:
        base64_string = base_64
        bytes_data = base64.b64decode(base64_string)
        with open(name_file, "wb") as archivo:
            archivo.write(bytes_data)
            archivo.flush()
        print("termi8nooooooo")
    #except:
        print("Error en el procesamiento de los archivos")

def DeleteFile(name_file):    
    try:
        if os.path.exists(name_file):
            os.remove(name_file)
        else:
            print("El archivo no existe")
    except:
        print("Error en el procesamiento de los archivos")


def CheckInternetConnection():
    try:
        remote_server = "8.8.8.8"
        port = 53
        socket.create_connection((remote_server, port), timeout=5)
        print("si hay conexion")
        return True
    except OSError:
        print("no hay conexion")
        return False

#deprecated
def CheckInternetConnectivityVA():
    print("Plataforma= "+platform.system().lower()) 

    cmd=[]
    if platform.system().lower() == "windows":
        cmd = ["ping", "-n", "1", "8.8.8.8"]
    else:
        cmd = ["ping", "-c", "1", "8.8.8.8"]

    try:
        subprocess.check_output(cmd)
        print("si hay conexion")
        return True
    except subprocess.CalledProcessError:
        print("no hay conexion")
        return False
