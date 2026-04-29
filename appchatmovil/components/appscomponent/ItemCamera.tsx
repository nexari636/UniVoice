import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions,useMicrophonePermissions , Camera,FlashMode, CameraMode } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View,Image } from 'react-native';
import { Audio } from 'expo-av';
import ItemPhotoCapture from './ItemPhotoCapture';
import ItemVideoCapture from './ItemVideoCapture';
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import { data_screen_camera_and_video, screen_reading } from '../utils/screen_reading';
import { frameCallbackReadScreen, setReadScreenCallback } from '../utils/VoiceCommands';
import FloatingButton from '../utils/FloatingButton';

interface CameraProps{
    onChangeStateModal: () => void;
    sendImage: (base64recurso:string,extencionrecurso:string) => void;
    is_video:()=>void;
    is_image:()=>void;
    visible?:boolean
}

interface HijoRef {
    activarModal: (url_image:string,typephotochat:boolean,sendImage:(base64recurso:string,extencionrecurso:string)=>void,ChangeStateModal:()=>void) => void;
}

interface HijoRefVideo {
    activarModal: (url_image:string,sendImage:(base64recurso:string,extencionrecurso:string)=>void,ChangeStateModal:()=>void) => void;
}

export default function ItemCamera(props:CameraProps)
{
    const { t } = useTranslation();
    
    const [hasAudioPermission, setHasAudioPermission] = useState<boolean>(false); 
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false); 
    const [micPermission, requestMicPermission] = useMicrophonePermissions();
    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState<string|undefined>(); 
    const [type, setType] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>("off");
    const [valueCameraMode, setCameraMode] = useState<CameraMode>("picture");
    const cameraRef=useRef<CameraView|null>(null);
    const [valueTipoAccion, setTipoAccion] = useState<boolean>(false); //false foto ; true video
    const ItemPhotoCaptureRef=useRef<HijoRef>(null);
    const ItemVideoCaptureRef=useRef<HijoRefVideo>(null);
    const valueRefMethodReadInterface=useRef<() => void>(frameCallbackReadScreen);


    useEffect(() => { 
        (async () => { 
            const cameraStatus = await Camera.requestCameraPermissionsAsync(); 
            const audioStatus= await requestMicPermission();
            setHasAudioPermission(audioStatus.status === 'granted');
            setHasCameraPermission(cameraStatus.status === 'granted');
            console.log("Permisos camara: "+hasCameraPermission);
            console.log("Permisos audio: "+hasAudioPermission);
        })(); 
    }, []);


    useEffect(() => { 
        if(props.visible){
            valueRefMethodReadInterface.current=frameCallbackReadScreen;
            setReadScreenCallback(()=>{screen_reading(data_screen_camera_and_video(flash=="on",type=="front",valueTipoAccion))});

        }else{
            setReadScreenCallback(valueRefMethodReadInterface.current);
        }

    }, [props.visible,type,flash,valueTipoAccion]);


    function ChangeStateModal()
    {
        props.onChangeStateModal();
    }

    function toggleCameraFacing() {
        console.log("cambiando camara.....");
        setType(current => (current === 'back' ? 'front' : 'back'));
    }

    
    function toggleCameraFlash() {
        console.log("cambiando camara....."+flash);
        setFlash(current => (current === 'off' ? 'on' : 'off'));
    }

    function handlerVideo(){
        console.log("es video");
        setCameraMode("video");
        setTipoAccion(true);
        props.is_video();
    }

    function handlerPhoto(){
        console.log("es foto");
        setCameraMode("picture");
        setTipoAccion(false);
        props.is_image();
    }

    async function TakeFoto()
    {
        if(cameraRef.current)
        {   
            try
            {
                const data =await cameraRef.current.takePictureAsync({
                    base64:false,
                    quality:0.3,
                });
                console.log(data);
                setImage(data?.uri);
                ItemPhotoCaptureRef.current?.activarModal(data?.uri?data?.uri:"",true,props.sendImage,ChangeStateModal);
            }
            catch(e){
                console.log(e);
            }
        }
    }

    async function handlerLongPressRecordVideo()
    {
        if(cameraRef.current)
        {   
            try
            {
                console.log("grabando......");
                const data =await cameraRef.current.recordAsync({
                                                            maxDuration:30,
                                                            maxFileSize: 30 * 1024 * 1024, // 30 MB
                                                        });
                console.log(data);
                setImage(data?.uri);
                ItemVideoCaptureRef.current?.activarModal(data?.uri?data?.uri:"",props.sendImage,ChangeStateModal);
            }
            catch(e){
                console.log("error0= "+e);
            }
        }
    }


    async function handlerOutPressRecordVideo()
    {
        if(cameraRef.current)
        {   
            try
            {
                cameraRef.current.stopRecording();
                console.log("la grabacion se detuvo......");
            }
            catch(e){
                console.log("error1= "+e);
            }
        }
    }


    return(
        <>
            <CameraView ref={cameraRef} style={styles.camera} facing={type} flash={flash} mode={valueCameraMode}> 
                <View>
                    <View style={styles.container_buttons_top}>
                        <TouchableOpacity accessibilityLabel={t("item_camera.button_close.accessibilityLabel")} accessibilityRole="text" accessible={true} style={[styles.buttons_top]} onPress={ChangeStateModal}>
                            <Ionicons name="close" size={30} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity accessibilityLabel={flash=="on"?t("item_camera.button_flash.accessibilityLabelOff"):t("item_camera.button_flash.accessibilityLabelOn")} accessibilityRole="text" accessible={true} style={[styles.buttons_top,{marginLeft: 'auto'}]} onPress={toggleCameraFlash}>
                            <Ionicons name={flash=="on"?"flash-outline":"flash-off-sharp"} size={30} color="white" />
                        </TouchableOpacity>
                    </View> 
                    <View style={styles.cotainer_buttons_bottom}>
                        <View style={[styles.buttons_bottom,styles.controls_photo]}>
                            <TouchableOpacity accessibilityLabel={valueTipoAccion?t("item_camera.action_camera.video"):t("item_camera.action_camera.photo")} accessibilityRole="text" accessible={true}  style={{width:"58%",alignItems:"flex-end",/*backgroundColor:"#ff0",*/justifyContent:"center"}} onPress={TakeFoto} onLongPress={handlerLongPressRecordVideo} onPressOut={handlerOutPressRecordVideo}>
                                <View style={styles.outerCirclePhoto}>
                                    <View style={!valueTipoAccion?styles.innerCirclePhoto:styles.innerCircleVideo} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity accessibilityLabel={type=="back"?t("item_camera.change_camera.accessibilityLabelLead"):t("item_camera.change_camera.accessibilityLabelRear")} accessibilityRole="text" accessible={true} style={{width:"42%",alignItems:"flex-end",justifyContent:"center"}} onPress={toggleCameraFacing}>
                                <Image source={require('@/assets/images/arrowloop.png')} style={styles.logos} resizeMode="contain"></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.buttons_bottom,styles.buttons_select_types]}>
                            <TouchableOpacity onPress={handlerVideo} accessibilityLabel={t("item_camera.button_video.accessibilityLabel")} accessibilityRole="text" accessible={true}>
                                <Text style={[styles.text,valueTipoAccion&&styles.backgroundtipoaccion]}>{t("item_camera.button_video.text")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlerPhoto} accessibilityLabel={t("item_camera.button_photo.accessibilityLabel")} accessibilityRole="text" accessible={true}>
                                <Text style={[styles.text,!valueTipoAccion&&styles.backgroundtipoaccion]}>{t("item_camera.button_photo.text")}</Text>
                            </TouchableOpacity>
                            {/*<TouchableOpacity onPress={pruebanomas}>
                                <Text style={[styles.text,!valueTipoAccion&&styles.backgroundtipoaccion]}>jajajajaa</Text>
                            </TouchableOpacity>*/}
                        </View>
                    </View> 
                </View>
            </CameraView>
            <FloatingButton></FloatingButton>
            <ItemPhotoCapture ref={ItemPhotoCaptureRef}></ItemPhotoCapture>
            <ItemVideoCapture ref={ItemVideoCaptureRef}></ItemVideoCapture>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        display:"flex",
        flexDirection:"column",
        width:"100%",
        height:"100%",
    },
    button: {
        //flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        padding:5,
        margin:10,
        fontWeight: 'bold',
        color: 'white',
    },
    container_buttons_top:{
        //backgroundColor:"#f00",
        height:"50%",
        flexDirection:"row"
    },
    buttons_top:{
        margin:10,
        width:48,
        height:48
    },
    cotainer_buttons_bottom:{
        //backgroundColor:"#0f0",
        height:"50%",
        justifyContent:"flex-end",
        flexDirection:"column"
    },
    buttons_bottom:{
        height:70,
    },
    buttons_select_types:{
        flexDirection:"row",
        alignSelf:"center",
    },
    controls_photo:{
        flexDirection:"row"
    },
    logos:{
        width: '35%',
        height: '35%',
        tintColor:"#fff"
    },
    outerCirclePhoto: {
        width: 70,
        height: 70,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: "#fff",
    },
    innerCirclePhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: "#fff",
    },
    backgroundtipoaccion:{
        borderRadius: 10,
        backgroundColor:"#80808080"
    },
    innerCircleVideo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 8,
        backgroundColor: "#fff",
    },
});