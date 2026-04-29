import { SourceChangeEventPayload, StatusChangeEventPayload, TimeUpdateEventPayload, useVideoPlayer, VideoPlayerEvents, VideoView } from "expo-video";
import { ThemedView } from "@/components/ThemedView";
import { Button, Dimensions, GestureResponderEvent, NativeSyntheticEvent, Platform, ScrollView, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View, ViewStyle } from "react-native";
import { SafeAreaProvider,useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet,Image } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { forwardRef, MutableRefObject, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Audio, AVPlaybackStatus } from 'expo-av';
import Slider from '@react-native-community/slider';
import { useEvent, useEventListener } from "expo";
import {Alert, Modal, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { sleep,convertorTiempo } from "../utils/CodeUtils";
import { IResourceVideo } from "../Interfaces/IDataSubtituloVideo";
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import { MAIN_COLOR } from "../ConfigApp/Colors";
import { data_screen_video_user, screen_reading } from "../utils/screen_reading";
import { frameCallbackReadScreen, setReadScreenCallback } from "../utils/VoiceCommands";
import FloatingButton from "../utils/FloatingButton";

interface datavideo {
    name_user:string,
    horario:string,
    datavideo:IResourceVideo[],
    urivideo:string,
    tempmessage:boolean
}

const ItemVideoReproducer=forwardRef((props:datavideo,ref)=>
{

  const styles = useMemo(() => StyleSheet.create({
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
        height: "6%", //valor anterior 40 nomas sin porcentaje
        flexDirection:"row",
        backgroundColor: MAIN_COLOR
      },
      celda_footer:{
        justifyContent:"flex-end",
      // display:"none",
        zIndex:400,
        position:"absolute",
        width:"100%",
        height: "22%", //valor anterior 130 nomas sin porcentaje
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
        width: '100%',
        height: '100%',
      },
      logosubtitulo:{
        width: '100%',
        height: '100%'
      }
  }), [MAIN_COLOR]);

  const stylesModal = useMemo(() => StyleSheet.create({
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
  }), [MAIN_COLOR]);

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
  const [valueEstadoSubtitulo,setEstadoSubtitulo] = useState<boolean>(false);
  const [valueSubtitulo,setSubtitulo] = useState<string>("");
   const valueRefMethodReadInterface=useRef<() => void>(frameCallbackReadScreen);
  

  /*const player = useVideoPlayer(require('@/assets/video/videopruebavegetta777.mp4'), player => {
      player.loop = false;
      //player.play();
      player.timeUpdateEventInterval = 1; 
      console.log("Duracion= "+player.duration);
  });*/

  const player = useVideoPlayer({uri:props.urivideo}, player => {
      player.loop = false;
      //player.play();
      player.timeUpdateEventInterval = 1; 
      console.log("Duracion= "+player.duration);
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const valorActual = useRef<number>(0);
  const valorAnterior = useRef<number>(1);
  const videoViewControl = useRef<VideoView>(null);
  const band_ref_method = useRef<boolean>(true);

  const valorAumentoSegundos=10;

  useEffect(() => {
    if(modalVisible){
      if(band_ref_method.current)
        valueRefMethodReadInterface.current=frameCallbackReadScreen;
      band_ref_method.current=false;
      setReadScreenCallback(()=>{screen_reading(data_screen_video_user(props.name_user,props.horario,convertorTiempo(duracionVideo)[3],convertorTiempo(timeVideoReproducer)[3],activeAudio,valueEstadoSubtitulo))});
    }else{
      setReadScreenCallback(valueRefMethodReadInterface.current);
    }
  
    }, [modalVisible,duracionVideo,timeVideoReproducer,activeAudio,valueEstadoSubtitulo])


  useEventListener(player, "timeUpdate", function (payload: TimeUpdateEventPayload) {
          valorActual.current=payload.currentTime;
          if(valorActual.current!=valorAnterior.current && valueSelectSlider.current==false){
              console.log("Player status changed: ", payload.currentTime+" - "+player.duration);
              let valueMilisegundos=payload.currentTime*1000
              valueIncrementoData.current=valueMilisegundos
              console.log("value incremento= "+valueIncrementoData.current);
              setTimeVideoReproducer(valueMilisegundos);
              
              //subtitulos
              if(!props.tempmessage)
              {
                const data =convertorTiempo(timeVideoReproducer);
                const datasearchtime=props.datavideo.find(dat=> parseInt(data[2].trim())>dat.start && parseInt(data[2].trim())<dat.end)
                if(datasearchtime!=undefined)
                  setSubtitulo(datasearchtime.textsegmenespanish);
                else 
                  setSubtitulo("inentendible");
              }
              else{
                setSubtitulo("Cargando recurso");
              }
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

  useImperativeHandle(ref,()=>{
    return {
        activarModal:()=>{
          console.log("Se activo el modal hijooo");
          setModalVisible(true)
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

  function handlerClickControlSubtitulos(e: GestureResponderEvent)
  {
    e;
    setEstadoSubtitulo(!valueEstadoSubtitulo); //false : negro / true: plomo
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

    /*var sleep = function(ms:number){
      return new Promise(resolve => setTimeout(resolve, ms));
    };*/

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
        console.log("ya paso");
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
    console.log("aplaste sliderrrrr")
    clearTimeout(valueTimeut.current);
    player.pause();
    valueSelectSlider.current=true
    e;
    console.log("slider number= "+e);
    valueTimePosition.current=e;
    valueIncrementoData.current=e;
    console.log("chevereeeeeeeeeeeeeeeee= "+e/1000);
    setTimeVideoReproducer(e);
    player.currentTime=e/1000;
    
    valueTimeut.current=setTimeout(() => {
      valueSelectSlider.current=false;
      player.play();
    }, 1000);
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={stylesModal.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}
          onRequestClose={() => {
            //Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={stylesModal.centeredView}>
            <View style={stylesModal.modalView}>
              
              <View className="header" style={styles.celda_top}>
                <View style={{height:48,width:48,padding:0}}>
                    <TouchableOpacity accessibilityLabel={t("item_video_capture.back_button.accessibilityLabel")} accessibilityRole="text" accessible={true} onPress={handlerClickControl} style={{width:"100%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                      <Image source={require('@/assets/images/flechaizq.png')} style={styles.logoflechaizq}></Image>
                    </TouchableOpacity>
                </View>
                <View style={{height:"100%",width:"40%",flexDirection:"column",padding:3,justifyContent:"center"}}>
                  <Text accessibilityLabel={t("item_video_capture.user_data.name_user",{name_user:props.name_user})} accessibilityRole="text" style={styles.tamanio_letra_user}>{props.name_user}</Text>
                  {/*<Text style={styles.tamanio_letra_user}>19 de abril, 12:43 pm</Text>*/}
                  <Text accessibilityLabel={t("item_video_capture.user_data.datetime",{datetime:props.horario})} style={styles.tamanio_letra_user}>{props.horario}</Text>
                </View>
              </View>

              <View style={{width:"100%",height:"100%",position:"relative"}}>
                <VideoView  
                  ref={videoViewControl}
                  style={styles.video} 
                  player={player} 
                  allowsFullscreen allowsPictureInPicture nativeControls={false}>
                </VideoView>

                <Pressable accessibilityLabel={t("item_video_capture.controls_video.accessibilityLabelPress")} onPress={handlePressFunction} style={{position:"absolute",zIndex:200/*,backgroundColor:"#ff3"*/,width:"100%",height:"74%"}}>
                  <View ref={valueViewPadre} style={{display:"none",zIndex:300,width:"100%",height:"100%"/*,backgroundColor:"#f00"*/,position:"absolute"}}>
                      <View style={{width:"100%",height:"7%",backgroundColor:"#DADDE700",flexDirection:"row",top:0,bottom:0,margin:"auto",padding:5}}>
                        <TouchableOpacity accessibilityLabel={t("item_video_capture.controls_video.back_video")} onPress={handlerClickRetroceder} style={{width:"33.33%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                            <Image source={require('@/assets/images/flechaizqvideo.png')} style={styles.logosonido} resizeMode="contain"></Image>
                        </TouchableOpacity>
                        <TouchableOpacity accessibilityLabel={playVideo?t("item_video_capture.controls_video.pause"):t("item_video_capture.controls_video.play")} accessibilityRole="text" accessible={true} onPress={handlerClickPauseOPlay} style={{zIndex:200,width:"33.33%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                            {playVideo?<Image source={require('@/assets/images/pause.png')} style={styles.logosonido} resizeMode="contain"></Image>:<Image source={require('@/assets/images/play.png')} style={styles.logosonido} resizeMode="contain"></Image>}
                        </TouchableOpacity>
                        <TouchableOpacity accessibilityLabel={t("item_video_capture.controls_video.pass_video")} accessibilityRole="text" accessible={true} onPress={handlerClickAvanzar} style={{width:"33.33%",height:"100%",backgroundColor:"transparent",borderWidth:0}}>
                            <Image source={require('@/assets/images/flechadervideo.png')} style={styles.logosonido} resizeMode="contain"></Image>
                        </TouchableOpacity>
                      </View>
                  </View>
                </Pressable>

              </View>
             
              <View style={styles.celda_footer}>
                  <View accessibilityLabel={t("item_video_capture.controls_video.display_caption")} accessibilityRole="text" accessible={true} style={{display:valueEstadoSubtitulo?"flex":"none",width:"100%",height:"50%",backgroundColor:"#DADDE700",borderRadius:10}}>
                    <ScrollView>
                      {/*<Text style={{color:"#FFF",padding:10,width:"100%",height:"100%",fontSize:12,fontWeight:"normal",textAlign:"center"}}>
                        Un texto es una composición de signos codificados en un sistema de escritura que forma una unidad de sentido. También es una composición de caracteres imprimibles generados por un algoritmo de cifrado que, aunque no tienen sentido para cualquier persona, sí puede ser descifrado por su destinatario original.
                      </Text>*/}
                      <Text style={{color:"#FFF",padding:10,width:"100%",height:"100%",fontSize:18,fontWeight:"normal",textAlign:"center"}}>
                        {valueSubtitulo}
                      </Text>
                    </ScrollView>
                  </View>
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
                    <View style={{width:"100%",height:"60%",backgroundColor:MAIN_COLOR,flexDirection:"row",borderRadius:10}}>
                      <View accessibilityLabel={t("item_video_capture.controls_video.current_video_time",{time:convertorTiempo(timeVideoReproducer)[3]})} accessibilityRole="text" accessible={true} style={{width:"50%",height:"100%",flexDirection:"row",alignItems:"center",paddingLeft:10}}>
                        <Text>{convertorTiempo(timeVideoReproducer)[3]}</Text>
                        <Text> . </Text>
                        <Text>{convertorTiempo(duracionVideo)[3]}</Text>
                      </View>
                      <View style={{width:"50%",height:"100%",flexDirection:"row",alignItems:"center",paddingRight:10}}>
                          <View style={{width:"50%",height:"100%"}}>
                            <TouchableOpacity accessibilityLabel={activeAudio?t("item_video_capture.controls_video.turn_off_sound"):t("item_video_capture.controls_video.turn_on_sound")} accessibilityRole="text" accessible={true} onPress={handlerClickControlSonido} style={{width:"100%",height:"100%",borderWidth:0}}>
                              {activeAudio?<Image source={require('@/assets/images/sonido.png')} style={styles.logosonido} resizeMode="contain"></Image>:<Image source={require('@/assets/images/sinsonido.png')} style={styles.logosonido} resizeMode="contain"></Image>}
                            </TouchableOpacity>
                          </View>
                          <View style={{width:"50%",height:"100%"}}>
                            <TouchableOpacity accessibilityLabel={!valueEstadoSubtitulo?t("item_video_capture.controls_video.button_caption_deactivate"):t("item_video_capture.controls_video.button_caption_active")} accessibilityRole="text" accessible={true} onPress={handlerClickControlSubtitulos} style={{width:"100%",height:"100%",borderWidth:0}}>
                              <Image source={require('@/assets/images/subtitulo.png')} style={[styles.logosubtitulo,{tintColor:valueEstadoSubtitulo?"#9A9D9A":"#000"}]} resizeMode="contain"></Image>
                            </TouchableOpacity>
                          </View>
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

export default ItemVideoReproducer;





