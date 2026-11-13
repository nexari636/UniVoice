from waitress import serve
from apiconversion.wsgi import application
import os

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'apiconversion.settings')
    serve(application, host='0.0.0.0', port=8000)