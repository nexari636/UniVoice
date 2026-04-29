import asyncio
import edge_tts

async def main():

    textoes = "Hola, este es un ejemplo usando edge-tts en español."
    textoen = "Hello, this is an example using edge-tts in Spanish."

    # Seleccionamos una voz en español
    vozespanol = "es-ES-AlvaroNeural"
    vozingles = "en-US-GuyNeural"

    try:
        # Creamos el comunicador
        comunicadorespanol = edge_tts.Communicate(textoes, voice=vozespanol)
        comunicadoringles = edge_tts.Communicate(textoen, voice=vozingles)
        # Guardamos el audio en MP3
        await comunicadorespanol.save("audio_pruebaes.mp3")
        await comunicadoringles.save("audio_pruebaen.mp3")
        print("Audio generado correctamente: audio_prueba.mp3")

    except:
        print("An error occurred while obtaining the resource")
 


# Ejecutamos el async
asyncio.run(main())
