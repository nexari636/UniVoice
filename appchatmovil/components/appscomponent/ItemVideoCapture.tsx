import { SourceChangeEventPayload, StatusChangeEventPayload, TimeUpdateEventPayload, useVideoPlayer, VideoPlayerEvents, VideoView } from "expo-video";
import { ThemedView } from "@/components/ThemedView";
import { Button, Dimensions, GestureResponderEvent, NativeSyntheticEvent, Platform, ScrollView, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View, ViewStyle } from "react-native";
import { SafeAreaProvider,useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet,Image } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Audio, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useEvent, useEventListener } from "expo";
import {Alert, Modal, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { sleep,convertorTiempo } from "../utils/CodeUtils";
import { IResourceVideo } from "../Interfaces/IDataSubtituloVideo";
import { read_file_base64 } from "../utils/ManagedFiles";
import { Ionicons } from "@expo/vector-icons";
import { MAIN_COLOR } from "../ConfigApp/Colors";
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import FloatingButton from "../utils/FloatingButton";
import { frameCallbackReadScreen, setReadScreenCallback } from "../utils/VoiceCommands";
import { data_screen_video_user_current, screen_reading } from "../utils/screen_reading";

interface datavideo {
    urivideo:string,
}

const ItemVideoCapture=forwardRef((props,ref)=>
{
    const { t } = useTranslation();

    const [modalVisible, setModalVisible] = useState(false);
    const [activeAudio, setActiveAudio] = useState(true);
    const [duracionVideo, setDuracionVideo] = useState<number>(0);
    const [timeVideoReproducer, setTimeVideoReproducer] = useState<number>(0);
    const [playVideo, setPlayVideo] = useState<boolean>(false);
    const valueIncrementoData = useRef<number>(0); 
    const valueTimePosition = useRef<number>(0);
    const valueSelectSlider = useRef<boolean>(false); 
    const valueTimeut = useRef<NodeJS.Timeout>();
    const valueViewPadre = useRef<View>(null);
    const valueViewEstado = useRef<Boolean>(false);

    const [ValueuriVideo, setUriVideo] = useState("");
    const valueFunctionSend=useRef<(base64recurso:string,extencionrecurso:string) => void>();
    const valueChangeStateModalItemCamera=useRef<() => void>();

    const valueRefMethodReadInterface=useRef<() => void>(frameCallbackReadScreen);
    const band_ref_method = useRef<boolean>(true);

    const player = useVideoPlayer({uri:ValueuriVideo}, player => {
        player.loop = false;
        //player.play();
        player.timeUpdateEventInterval = 1; 
        console.log("Duracion= "+player.duration);
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    const valorActual = useRef<number>(0);
    const valorAnterior = useRef<number>(1);
    const videoViewControl = useRef<VideoView>(null);
    const valorAumentoSegundos=10;

    useEventListener(player, "timeUpdate", function (payload: TimeUpdateEventPayload) {
            valorActual.current=payload.currentTime;
            if(valorActual.current!=valorAnterior.current && valueSelectSlider.current==false){
                console.log("Player status changed: ", payload.currentTime+" - "+player.duration);
                let valueMilisegundos=payload.currentTime*1000
                valueIncrementoData.current=valueMilisegundos
                console.log("value incremento= "+valueIncrementoData.current);
                setTimeVideoReproducer(valueMilisegundos);
                console.log("pepa lica= "+valueMilisegundos);
            }
            valorAnterior.current=payload.currentTime;
    });

    useEventListener(player, 'statusChange', ({ status, error }) => {
        console.log('El estado cambio: ', status);
        if(status=="readyToPlay"){
        console.log("El video cargo: "+player.duration);
        setDuracionVideo(player.duration*1000);
        }
    });


  useEffect(() => {
    
    if(modalVisible){
        if(band_ref_method.current)
          valueRefMethodReadInterface.current=frameCallbackReadScreen;
        band_ref_method.current=false;
        setReadScreenCallback(()=>{screen_reading(data_screen_video_user_current(convertorTiempo(duracionVideo)[3],convertorTiempo(timeVideoReproducer)[3],activeAudio))});

    }else{
        setReadScreenCallback(valueRefMethodReadInterface.current);
    }

  }, [modalVisible,duracionVideo,timeVideoReproducer,activeAudio]);

  useImperativeHandle(ref,()=>{
    return {
        activarModal:(uri_video:string,onSendImage:(base64recurso:string,extencionrecurso:string) => void,ChangeStateModalItemCamera:()=>void)=>{
            console.log("Se activo el modal hijo");
            setModalVisible(true)
            setUriVideo(uri_video);
            valueFunctionSend.current=onSendImage;
            valueChangeStateModalItemCamera.current=ChangeStateModalItemCamera;
        }
      }
    }
  )

  function handlerClickControl(e: GestureResponderEvent)
  {
    e;
    setModalVisible(false);
  } 

  function handlerClickControlSonido(e: GestureResponderEvent)
  {
    e;
    setActiveAudio(!activeAudio)
    player.muted=!player.muted
  } 

 
  function handlerClickRetroceder(e: GestureResponderEvent)
  {
    e;
    player.currentTime-=valorAumentoSegundos;
    setTimeVideoReproducer(player.currentTime*1000);
    valueIncrementoData.current=player.currentTime*1000
  } 

  function handlerClickAvanzar(e: GestureResponderEvent)
  {
    e;
    player.currentTime+=valorAumentoSegundos;
    setTimeVideoReproducer(player.currentTime*1000);
    valueIncrementoData.current=player.currentTime*1000
  } 

  function handlerClickPauseOPlay(e: GestureResponderEvent)
  {
    e;
    if(playVideo){
      setPlayVideo(false);
      player.pause();
    }else{
      setPlayVideo(true);
      player.play();
    }
  } 

    async function handlePressFunction(e: GestureResponderEvent)
    {
      e;
      console.log("Se presiono= "+Platform.OS);
      if(Platform.OS=="android")
      {
        if(valueViewEstado.current){
          valueViewEstado.current=false;
          valueViewPadre.current?.setNativeProps({
            style:{display:"none"}
          });
          return;
        }

        valueViewPadre.current?.setNativeProps({
          style:{display:"flex"}
        });
        valueViewEstado.current=true;
        await sleep(3000);
        valueViewEstado.current=false;
        valueViewPadre.current?.setNativeProps({
          style:{display:"none"}
        });
      }else{
        
        let control_sin_tipo=valueViewPadre.current as any;

        if(valueViewEstado.current){
          valueViewEstado.current=false;
          control_sin_tipo.style.display="none";
          return;
        }

        control_sin_tipo.style.display="flex";
        await sleep(3000);
        control_sin_tipo.style.display="none";
      }
    }


  function handlerChangedSlider(e:number)
  {
    clearTimeout(valueTimeut.current);
    player.pause();
    valueSelectSlider.current=true
    e;
    console.log("slider number= "+e);
    valueTimePosition.current=e;
    valueIncrementoData.current=e;
    setTimeVideoReproducer(e);
    player.currentTime=e/1000;
    
    valueTimeut.current=setTimeout(() => {
      valueSelectSlider.current=false;
      player.play();
    }, 1000);
  }

    async function sendMessage()
    {

        const dataimagebase64=await read_file_base64(ValueuriVideo,'','');
        const extencion_recurso="mp4";

        console.log("se va enviar la funcion");
        if(valueFunctionSend.current)
            valueFunctionSend.current(dataimagebase64,extencion_recurso);
        setModalVisible(false);
        valueChangeStateModalItemCamera.current&&valueChangeStateModalItemCamera.current();
    }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={stylesModal.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}  onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              
              <View className="header" style={styles.celda_top}>
                <View style={{height:"100%",width:"12%",padding:5}}>
                    <TouchableOpacity accessibilityLabel={t("item_video_capture.back_button.accessibilityLabel")} accessibilityRole="text" accessible={true} onPress={handlerClickControl} style={{width:"100%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                      <Image source={require('@/assets/images/flechaizq.png')} style={styles.logoflechaizq}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{height:"100%",width:"88%",alignItems:"flex-end",justifyContent:"center"}}>
                    <TouchableOpacity accessibilityLabel={t("item_video_capture.send_video.accessibilityLabel")} accessibilityRole="text" accessible={true} style={{width:40}} onPress={sendMessage}>
                        <Ionicons name="send-outline" size={30} color="#000" />
                    </TouchableOpacity>
                </View>
              </View>

              <View style={{width:"100%",height:"100%",position:"relative"}}>
                <VideoView  
                  ref={videoViewControl}
                  style={styles.video} 
                  player={player} 
                  allowsFullscreen allowsPictureInPicture nativeControls={false}>
                </VideoView>

                <Pressable accessibilityLabel={t("item_video_capture.controls_video.accessibilityLabelPress")} accessibilityRole="text" accessible={true} onPress={handlePressFunction} style={{position:"absolute",zIndex:200/*,backgroundColor:"#ff3"*/,width:"100%",height:"74%"}}>
                  <View ref={valueViewPadre} style={{display:"none",zIndex:300,width:"100%",height:"100%"/*,backgroundColor:"#f00"*/,position:"absolute"}}>
                      <View style={{width:"100%",height:"7%"/*,backgroundColor:"#0f0"*/,flexDirection:"row",margin:"auto"}}>
                        <TouchableOpacity accessibilityLabel={t("item_video_capture.controls_video.back_video")} accessibilityRole="text" accessible={true} onPress={handlerClickRetroceder} style={{width:"33.33%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                            <Image source={require('@/assets/images/flechaizqvideo.png')} style={styles.logo_controls_video} resizeMode="contain"></Image>
                        </TouchableOpacity>
                        <TouchableOpacity accessibilityLabel={playVideo?t("item_video_capture.controls_video.pause"):t("item_video_capture.controls_video.play")} accessibilityRole="text" accessible={true} onPress={handlerClickPauseOPlay} style={{zIndex:200,width:"33.33%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                            {playVideo?<Image source={require('@/assets/images/pause.png')} style={styles.logo_controls_video} resizeMode="contain"></Image>:<Image source={require('@/assets/images/play.png')} style={styles.logo_controls_video} resizeMode="contain"></Image>}
                        </TouchableOpacity>
                        <TouchableOpacity accessibilityLabel={t("item_video_capture.controls_video.pass_video")} accessibilityRole="text" accessible={true} onPress={handlerClickAvanzar} style={{width:"33.33%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                            <Image source={require('@/assets/images/flechadervideo.png')} style={styles.logo_controls_video} resizeMode="contain"></Image>
                        </TouchableOpacity>
                      </View>
                  </View>
                </Pressable>

              </View>
             
              <View style={styles.celda_footer}>
                  <View style={{width:"100%",height:"50%",backgroundColor:"#DADDE700",flexDirection:"column",borderRadius:10}}>
                    <View accessibilityLabel={t("item_video_capture.controls_video.time_bar")} accessibilityRole="text" accessible={true} style={{width:"100%",height:"50%"/*,backgroundColor:"#333"*/,padding:10}}>
                      <Slider
                        style={{width: "100%", height: "100%"}}
                        thumbTintColor="#000"
                        minimumValue={0}
                        maximumValue={duracionVideo}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        onSlidingComplete={handlerChangedSlider}
                        value={valueIncrementoData.current}
                      />
                    </View>
                    <View style={{width:"100%",height:"50%",backgroundColor:MAIN_COLOR,flexDirection:"row",borderRadius:10}}>
                      <View accessibilityLabel={t("item_video_capture.controls_video.current_video_time",{time:convertorTiempo(timeVideoReproducer)[3]})} accessibilityRole="text" accessible={true} style={{width:"50%",height:"100%",flexDirection:"row",alignItems:"center",paddingLeft:10}}>
                        <Text>{convertorTiempo(timeVideoReproducer)[3]}</Text>
                        <Text> . </Text>
                        <Text>{convertorTiempo(duracionVideo)[3]}</Text>
                      </View>
                      <View style={{width:"50%",height:"100%",paddingRight:10}}>
                          <TouchableOpacity accessibilityLabel={activeAudio?t("item_video_capture.controls_video.turn_off_sound"):t("item_video_capture.controls_video.turn_on_sound")} accessibilityRole="text" accessible={true} onPress={handlerClickControlSonido} style={{height:"100%",borderWidth:0}}>
                            {activeAudio?<Image source={require('@/assets/images/sonido.png')} style={styles.logosonido} resizeMode="contain"></Image>:<Image source={require('@/assets/images/sinsonido.png')} style={styles.logosonido} resizeMode="contain"></Image>}
                          </TouchableOpacity>
                      </View>
                    </View>
                  </View>
              </View>
            </View>
             <FloatingButton></FloatingButton>
            
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
    
     
  );
});

export default ItemVideoCapture;


const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    video: {
      backgroundColor:"#111",
      width: "100%",
      height: "100%",
    },
    controlsContainer: {
      padding: 10,
    },
    celda_top: {
      marginBottom: 10,
      width: '100%',
      height: "5%", //valor anterior 40 nomas sin porcentaje
      flexDirection:"row",
      backgroundColor:MAIN_COLOR
    },
    celda_footer:{
      justifyContent:"flex-end",
     // display:"none",
      zIndex:400,
      position:"absolute",
      width:"100%",
      height: "20%", //valor anterior 130 nomas sin porcentaje
      flexDirection:"column",
      //backgroundColor:"#0f0",
      bottom:0,
      padding:7
    }
    ,logoflechaizq:{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    tamanio_letra_user:{
      fontSize:12
    },
    logosonido:{
      width: '20%',
      height: '100%',      
      alignSelf:"flex-end",
      marginRight: 1,
    },
    logosubtitulo:{
      width: '100%',
      height: '100%'
    },
    logo_controls_video:{
        width: '100%',
        height: '100%',      
        alignSelf:"center",
    }
});

const stylesModal = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width:"100%",
    height:"100%",
    margin: 20,
    backgroundColor: 'white',
    //borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection:"column"
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});