import {  PermissionResponse,Recording } from "expo-av/build/Audio";
import { Audio  } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import { Dispatch, SetStateAction } from "react";

export async function start_recording(permissionResponse:PermissionResponse|null,
    requestPermission:()=> Promise<PermissionResponse>,
    recordingf:Dispatch<SetStateAction<Audio.Recording | undefined>> )
{
    if (permissionResponse==null) return;
    if (permissionResponse.status !== 'granted') {
        console.log("Se denegó el permiso para acceder al micrófono");
        await requestPermission();
        return;
    }

    await Audio.setAudioModeAsync({
        //allowsRecordingIOS: true,
        //playsInSilentModeIOS: true,
    });

    console.log('Starting recording..');
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    recordingf(recording);
    console.log("long press");
}

export async function stop_recording(recording: Audio.Recording | undefined)
{
    if (recording==null) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log("out press");
    console.log("grabacion disposible en: "+uri);

    if(uri==null)
    {
        console.log("Ha ocurrido un error al obtener uri del audio grabado :(");
        return;
    } 
    return uri
}