import React, { useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Text, Animated, GestureResponderEvent } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';

import { Recording } from 'expo-av/build/Audio';
import { Audio } from 'expo-av';
import { start_recording, stop_recording } from "./Record_audio";
import { UseFetchPOSTEvent } from "./useFetch";
import { ToastError, ToastInfo } from "./ToastSpeech";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { SpeechText } from "./SpeechText";
import { clientCommandsVoice, frameCallbackReadScreen } from "./VoiceCommands";
import ModelLoadSplashScreen from "../appscomponent/ModelLoadSplashScreen";
import Sleep from "./Sleep";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_IDIOMAUSER } from "./Keys";

export default function FloatingButton(/*{ onPress }: { onPress: () => void }*/) {
    // Animación simple para el efecto de “presión”
    const scale = new Animated.Value(1);
    const uriRef=useRef<String|undefined>();
    const { t } = useTranslation();

    const [showLoadSplashScreen, SetShowLoadSplashScreen] = useState(false);
    

    const handlePressIn = () => {

        start_recording(permissionResponse,requestPermission,setRecording)

        Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
        }).start();
    };

    const handlePressOut = async () => {

        uriRef.current= await stop_recording(recording)

        Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
        }).start();

        console.log("sdsss= "+uriRef.current);
        if(uriRef.current)
            send_audio();
    };

    const [recording, setRecording] = useState<Recording>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();


    function onPress(event: GestureResponderEvent)
    {
        SpeechText("Boton para comandos de voz");
    }

    async function onPressHand(event: GestureResponderEvent)
    {

        SpeechText("Boton para lectura de pantalla, leyendo..");
        await Sleep(1000);
        frameCallbackReadScreen();
    }

    async function send_audio()
    {
        SetShowLoadSplashScreen(true);
        const idioma=await AsyncStorage.getItem(KEY_IDIOMAUSER);


        //https://www.thoughtco.com/audio-file-mime-types-3469485
        const formData = new FormData();
        formData.append('language', idioma!=null?idioma:"");

        formData.append('file', {
            uri: uriRef.current,
            name: "audio.mp3", //ejemplo dsjfnsdubjhsd.json
            type: "audio/mpeg",
        }as any);

        const promiseData=UseFetchPOSTEvent(formData,"persona/capp");
        console.log(promiseData);
        promiseData.then(async data=>{
            console.log(data.data.data);
            const comando=data.data.data.command;
            console.log("Comando= "+comando);
            if(comando!=undefined){
                ToastInfo(t("notifications.title_information"),t("notifications.messages.command_processing"));
                clientCommandsVoice.process_command(comando);
            }else{
                ToastInfo(t("notifications.title_information"),t("notifications.messages.command_unrecognized"));
                //SpeechText("Comando no reconocido, intente nuevamente");
            }

            SetShowLoadSplashScreen(false);
        })
        .catch(err=> {
            console.log(err.response.data.error);
            ToastError(t("notifications.title_error"),t("notifications.messages.command_detection_error"));
            SetShowLoadSplashScreen(false);
        }); 
    }

    return (
        <>
            <>
                <Animated.View style={[styles.container, { transform: [{ scale }] }]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={onPress}
                        style={styles.button}
                    >
                        <MaterialIcons name="mic" size={28} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>
                <ModelLoadSplashScreen activeModal={showLoadSplashScreen}/>
            </>
            <>
                <Animated.View style={[styles.container, { transform: [{ scale }] },{bottom:200}]}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPressIn={(e)=>{}}
                        onPressOut={(e)=>{}}
                        onPress={onPressHand}
                        style={styles.button}
                    >
                        <Entypo name="hand" size={28} color="#fff" />
                    </TouchableOpacity>
                </Animated.View>
                <ModelLoadSplashScreen activeModal={showLoadSplashScreen}/>
            </>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 130,
    right: 10,
    elevation: 6, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  button: {
    backgroundColor: "#2196F3", // azul tipo Material
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
