import socket

#8.8.8.8 DNS de google

def check_internet_connection():
    try:
        remote_server = "8.8.8.8"
        port = 53
        socket.create_connection((remote_server, port), timeout=5)
        print("si hay conexion")
        return True
    except OSError:
        print("no hay conexion")
        return False

"""
import subprocess
import platform

def CheckInternetConnection():
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
"""