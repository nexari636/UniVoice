import { TimeUpdateEventPayload, useVideoPlayer, VideoView } from "expo-video";
import { ThemedView } from "@/components/ThemedView";
import { Button, Dimensions, GestureResponderEvent, NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider,useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet,Image } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useRef, useState } from "react";
import { Audio, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useEvent, useEventListener } from "expo";
import ItemVideoReproducer from "./ItemVideoReproducer";
import { sleep } from "../utils/CodeUtils";
import { IResourceVideo } from "../Interfaces/IDataSubtituloVideo";
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";

interface HijoRef {
    activarModal: () => void;
}

interface datavideo {
    name_user:string,
    horario:string,
    datavideo:IResourceVideo[],
    urivideo:string,
    tempmessage:boolean,
}

export default function ItemVideo(props:datavideo)
{
    const { t } = useTranslation();

    const refHijo = useRef<HijoRef>();

    /*const player = useVideoPlayer(require('@/assets/video/videoprueba.mp4'), player => {
        player.loop = true;
        //player.play();
        player.muted=true;
    });*/

    const player = useVideoPlayer({uri:props.urivideo}, player => {
        player.loop = true;
        //player.play();
        player.muted=true;
    });


    const videoViewControl = useRef<VideoView>(null);

    /*var sleep = function(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    };*/

    async function handleronLongPressFunction(e: GestureResponderEvent)
    {
        e;
        console.log("Se presiono");
        console.log("Reproducion");
        player.play();
        await sleep(10000);
        console.log("PAUSE");
        player.pause();
    }

    function handleClicActivarModalHijo(e: GestureResponderEvent)
    {
        e;
        console.log("Se activo el modal");
        refHijo.current?.activarModal();
    }

    console.log(refHijo)


    return (
        <View style={styles.contentContainer}>
            <VideoView  
                    ref={videoViewControl}
                    style={styles.video} 
                    player={player} 
                    allowsFullscreen allowsPictureInPicture nativeControls={false}>
            </VideoView>
            <ItemVideoReproducer tempmessage={props.tempmessage} name_user={props.name_user} horario={props.horario} urivideo={props.urivideo} datavideo={props.datavideo} ref={refHijo}></ItemVideoReproducer>
            <Pressable accessibilityLabel={t("item_video.container_video.accessibilityLabel")} accessibilityRole="text" accessible={true}  onPress={handleClicActivarModalHijo} onLongPress={handleronLongPressFunction} delayLongPress={500} style={{position:"absolute",width:"100%",height:"100%"}}>
            </Pressable>
        </View>
      );
}


const styles = StyleSheet.create({
    contentContainer: {
        width:250,
        height:300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        //borderWidth: 1,          
        //borderColor: 'green',
        width: "100%",
        height: "100%",
    }
});