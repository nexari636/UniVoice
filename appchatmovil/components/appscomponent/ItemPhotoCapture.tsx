import { Ionicons } from '@expo/vector-icons';
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,Image, TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { read_file_base64 } from '../utils/ManagedFiles';
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import { frameCallbackReadScreen, setReadScreenCallback } from '../utils/VoiceCommands';
import { data_screen_photo_user, data_screen_photo_user_current, screen_reading } from '../utils/screen_reading';
import FloatingButton from '../utils/FloatingButton';

interface PhotoCaptureProps{
    nameuser?:string,
    datetime?:string,
    descripcion?:string
}

const ItemPhotoCapture=forwardRef((props:PhotoCaptureProps,ref)=>
{
    const { t } = useTranslation();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [valueUrlImage, setUrlImage] = useState<string>("");
    const [valueTypePhotoChat, setTypePhotoChat] = useState(true);
    //const [valueFunctionSend, setFunctionSend] = useState<;
    const valueFunctionSend=useRef<(base64recurso:string,extencionrecurso:string) => void>();
    //const [valueChangeStateModalItemCamera, setChangeStateModalItemCamera] = useState<()=>void>();
    const valueChangeStateModalItemCamera=useRef<() => void>();
    const valueRefMethodReadInterface=useRef<() => void>(frameCallbackReadScreen);

    useEffect(() => {

        console.log("use efect de foto");
        const name_user=props.nameuser!=undefined?props.nameuser:"";
        const date_time=props.datetime!=undefined?props.datetime:"";

        console.log("Name user= "+name_user);
        console.log("date time= "+date_time);


        if(modalVisible){
            valueRefMethodReadInterface.current=frameCallbackReadScreen;
            setReadScreenCallback(()=>{screen_reading(data_screen_photo_user_current())});
        }else{
            setReadScreenCallback(valueRefMethodReadInterface.current);
        }
    
    }, [modalVisible])
    

    useImperativeHandle(ref,()=>{
            return {
                activarModal:(url_image:string,typephotochat:boolean,onSendImage:(base64recurso:string,extencionrecurso:string) => void,ChangeStateModalItemCamera:()=>void)=>{
                    console.log("Se activo el modal hijo");
                    console.log("la url de la imagen es;: "+url_image);
                    setModalVisible(true)
                    setUrlImage(url_image);
                    setTypePhotoChat(typephotochat);
                    valueFunctionSend.current=onSendImage;
                    //setFunctionSend(onSendImage);
                    //setChangeStateModalItemCamera(ChangeStateModalItemCamera);
                    valueChangeStateModalItemCamera.current=ChangeStateModalItemCamera;
                }
            }
        }
    )

    function ChangeStateModal()
    {
        setModalVisible(false)
    }

    async function sendMessage()
    {

        const dataimagebase64=await read_file_base64(valueUrlImage,'','');
        const extencion_recurso="jpg";

        console.log("se va enviar la funcion");
        if(valueFunctionSend.current)
            valueFunctionSend.current(dataimagebase64,extencion_recurso);
        setModalVisible(false);
        valueChangeStateModalItemCamera.current&&valueChangeStateModalItemCamera.current();
    }

    return(
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
                    <View style={styles.centeredView}>
                        <View style={styles.container_buttons_top}>
                            <TouchableOpacity accessibilityLabel={t("item_photo_capture.button_close.accessibilityLabel")} accessibilityRole="text" accessible={true} style={[styles.buttons_top]} onPress={ChangeStateModal}>
                                <Ionicons name="close" size={30} color="#fff" />
                            </TouchableOpacity>
                            {
                                !valueTypePhotoChat?
                                    <View style={styles.container_top_info}>
                                        <Text accessibilityLabel={t("item_photo_capture.name_user.accessibilityLabel",{name_user:props.nameuser})} accessibilityRole="text" accessible={true} style={styles.text_top_info}>{props.nameuser}</Text>
                                        <Text accessibilityLabel={t("item_photo_capture.date_time.accessibilityLabel",{datetime:props.datetime})} accessibilityRole="text" accessible={true} style={styles.text_top_info}>{props.datetime}</Text>
                                    </View>:<></>
                            }
                        </View> 
                        <View style={styles.image_container} accessibilityLabel={t("item_photo_capture.container_image.accessibilityLabel",{descripcion:props.descripcion})} accessibilityRole="text" accessible={true}>
                           <Image style={styles.image_style} source={{ uri: valueUrlImage?valueUrlImage:"https://i.pinimg.com/736x/35/3a/d9/353ad9619623b527859c9ce2d07dbcac.jpg" }} resizeMode="contain" />
                        </View>
                        {
                            valueTypePhotoChat?
                            <View style={[styles.sendphoto]} >
                                <TouchableOpacity onPress={sendMessage} accessibilityLabel={t("item_photo_capture.send_image.accessibilityLabel")} accessibilityRole="text" accessible={true}>
                                    <Ionicons name="send-outline" size={40} color="white" />
                                </TouchableOpacity>
                            </View>:<></>
                        }
                        <FloatingButton></FloatingButton>
                    
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
    );
})

export default ItemPhotoCapture;

const styles = StyleSheet.create({
    centeredView: {
        backgroundColor:"#000",
        flexDirection:"column",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor:"#000",
        width:"100%",
        height:"100%",
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
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
    image_container:{
        backgroundColor:"#fff",
        width:"100%",
        flex:10
    },
    image_style:{
        width:"100%",
        height:"100%"
    }
    ,container_buttons_top:{
        backgroundColor:"#000",
        width:"100%",
        height:50,
        flexDirection:"row"
    },
    buttons_top:{
        padding:10,
    },
    container_top_info:{
        backgroundColor:"#000",
        flexDirection:"column",
        padding:10,
        width:"100%",
        height:"100%"
    },
    text_top_info:{
        fontSize:15,
        color:"#fff"
    },
    sendphoto:{
        backgroundColor:"#000",
        width:"100%",
        alignItems:"flex-end",
        padding:10
    }
});