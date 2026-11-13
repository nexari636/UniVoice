import os
from pathlib import Path

RESOURCE_ROUTE="D:/recurso/proyectoChatMovilAmic/proyectov1/apidjango/apiconversion/api/recursos/"
path_file=os.path.join(RESOURCE_ROUTE,"audios/")
print(path_file)

#retorna string
current_directoryv1=os.getcwd() 

#retorna objeto path con diferentes metodos para manejar rutas
current_directoryv2 = Path.cwd()

#Para obtener la ruta del archivo Python específico que esta en ejecución (no donde está la consola)
path_script = os.path.dirname(os.path.abspath(__file__))

print("****************************")
print(current_directoryv1)
print(current_directoryv2)
print(path_script)
