import socket

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

    
CheckInternetConnection()