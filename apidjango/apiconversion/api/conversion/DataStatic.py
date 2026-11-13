import os 
from apiconversion.settings import STATICFILES_DIRS

INGLES="en"
ESPANOL="es"
AUDIO_FOLDER_NAME="audios"
OTHERS_FOLDER_NAME="others"
VIDEOS_FOLDER_NAME="videos"
PATH_RECURSOS=os.path.join(STATICFILES_DIRS[0],"recursos")
PATH_FOLDER_CURRENT=STATICFILES_DIRS[0]
SUCCESS="todo realizado con exito"