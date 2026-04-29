import * as Speech from 'expo-speech';


export function SpeechText(texto:string)
{
    if (texto.trim() !== '') {
        Speech.speak(texto, {
        language: 'es-ES',
        pitch: 1.0,
        rate: 1.0,
      });
    }
}