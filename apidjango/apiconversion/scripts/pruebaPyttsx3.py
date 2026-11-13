import pyttsx3

engine = pyttsx3.init(driverName='sapi5')
rate = engine.getProperty('rate')   
print ("Velocidad de voz: "+str(rate))  
engine.setProperty('volume',1.0)
engine.setProperty('rate', 115)
voices = engine.getProperty('voices')

for i, voice in enumerate(voices):
    print(voice.name.lower())

print(voices)

print(voice.name.lower().find("spanish"))

spanish_voice = None
for voice in voices:
    if "spanish" in voice.name.lower():
        print(voice.name)
        spanish_voice = voice.id
        break

if spanish_voice:
    engine.setProperty('voice', spanish_voice)
else:
    print("No se encontró voz en español, se usará la predeterminada.")
    
# Texto a convertir
texto = "Hola, este es un ejemplo de texto a audio."

# Guardar en archivo de audio
engine.save_to_file(texto, 'salida_audio.mp3')  # Puedes cambiar a .wav
engine.runAndWait()

print("Audio generado correctamente.")

