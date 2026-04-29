import { ThemedView } from "@/components/ThemedView";
import { Dimensions, GestureResponderEvent, Modal, NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider,useSafeAreaInsets,SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet,Image } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useMemo, useRef, useState } from "react";
import ItemAudio from "./ItemAudio";
import ItemVideo from "./ItemVideo";
import IDataTextToAudio from "../Interfaces/IDataTextToAudio";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_CORREO, KEY_DISCAPACIDAD, KEY_IDIOMAUSER } from "../utils/Keys";
import { audio_directory, ConstuirRuta, create_file, imagenes_directory, key_directory, NAME_FILE_KEY, read_file_text, temps_directory, video_directory } from "../utils/ManagedFiles";
import { IDataDescriptionImage } from "../Interfaces/IDataDescriptionImage";
import IDataAudioToText from "../Interfaces/IDataAudioToText";
import { IDataSubtituloVideo } from "../Interfaces/IDataSubtituloVideo";
import ModelDateFormats from "../Interfaces/IModelDateFormats";
import ItemLoadResource from "./ItemLoadResource";
import Toast from "react-native-toast-message";
import { SpeechText } from "../utils/SpeechText";
import ItemPhotoCapture from "./ItemPhotoCapture";
import { Ionicons } from '@expo/vector-icons';
import { IDIOMA_ESPANOL, IDIOMA_INGLES } from "../utils/Idiomas";
import { AUDITIVA, NOT_APPLICABLE, VISUAL } from "../utils/Discapacidades";
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import { changeConfig, ChatMessagesConfig, FONT_BOLD, FONT_SIZE, MainMenu } from "../ConfigApp/Config";
import { ToastError, ToastSuccess } from "../utils/ToastSpeech";
import { IDataTranslateMessage } from "../Interfaces/IDataTranslateMessage";
import { Encriptar } from "../utils/encripDescrip";
import { UseFetchPOSTEvent } from "../utils/useFetch";
import { MAIN_COLOR, MAIN_TEXT_COLOR } from "../ConfigApp/Colors";
import IIdioma from "../Interfaces/IIdioma";
import ISelectOptions from "../Interfaces/ISelectOptions";


export const EMITE="emite";
export const RECEPTOR="receptor"
export const TextoAudio="texto->audio";
export const AudioTexto="audio->texto";
export const ImagenAudio="imagen->audio";
export const Video="video";


interface PropsItemsChat
{
    tipo_message:string,
    tipo_usuario:string, //emite,receptor
    //uri_recurso?:string,
    //mensaje_texto?:string,
    datarecurso: any | null
    //hora?:string,
    nombre_usuario_emisor?:string,
    dateformats:ModelDateFormats,
    temp:boolean
    //nombre_usuario_receptor?:string
}


interface HijoRef {
    activarModal: (url_image:string,typephotochat:boolean,sendImage:(base64recurso:string,extencionrecurso:string)=>void,ChangeStateModal:()=>void) => void;
}

interface ModalMessageText{
    message_text: string;
}


export default function ItemsChat(props:PropsItemsChat)
{
    const [valueFocused,setValueFocused]=useState<boolean>(false);

    const styles = useMemo(() => StyleSheet.create({
        item_message:{
            borderRadius: 10, 
            borderWidth:.5,
            margin:2,
            flexDirection:"column",
            //borderWidth: 1,           // grosor del borde
            //borderColor: 'red',       // color del borde
            //alignItems:"flex-start"
            //borderRadius: 10,         // bordes redondeados
            //padding: 10,              // espacio interno    
        },
        items_message_data:{
            //alignSelf: 'flex-start',
            //borderWidth: .5,           
            /*borderColor: '#000',*/
            /*backgroundColor:"#0f0",*/
            marginLeft:5,
            marginRight:5,
            borderRadius: 10, 
            padding: 2,  
        },
        items_message_data_time:{
            //borderWidth: 1,           
            //borderColor: '#000',
            //borderRadius: 10, 
            padding: 5,
            marginLeft: 'auto',
            alignSelf:"center"
        },
        items_load:{
            padding: 5,
        },
        items_load_translating:{
            flex: 1,
            right: 8,
            justifyContent:"center",
            alignItems: "flex-end",
        },
        container_hora:{
            flexDirection:"row",
            //borderWidth:5,
        }
        ,item_message_image:{
            width:300,
            height:250
        }
        ,item_image_message:{
            /*backgroundColor:"#0f0",*/
            /*justifyContent:"center",*/
            /*alignContent:"center",*/
            //borderWidth:.5,
            //borderColor: 'green',
            width:"100%",
            height:"100%"
        },
        name_user:{
            flexDirection:"row"
        },
        name_user_font:{
            marginRight:15,
            alignSelf:"center",
            padding:0.5,
            fontSize:ChatMessagesConfig.items_chats.name_user_font_size,
            fontWeight:"bold"
        },
        font_size_message_text:{
            maxWidth: 300,
            padding:.5,
            fontSize:ChatMessagesConfig.items_chats.message_text_font_size,
            fontWeight:ChatMessagesConfig.items_chats.message_text_bold
        },
        change_language:{
            alignSelf:"center",
            marginRight:10,
            fontSize:ChatMessagesConfig.items_chats.change_language_font_size,
            fontWeight:ChatMessagesConfig.items_chats.change_language_bold
        },
        date_time_message:{
            fontSize:ChatMessagesConfig.items_chats.date_time_font_size,
            fontWeight:ChatMessagesConfig.items_chats.date_time_bold
        },
        
    }), [FONT_SIZE,FONT_BOLD]);

    const stylesModal = useMemo(() => StyleSheet.create({
      centeredView: {
        /*backgroundColor:"#0f0",*/
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
      },
      modalView: {
        height:"auto",
        width:"90%",
        top:"5%",
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 10, //antes
        alignItems: 'center',
        justifyContent:"center",
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      }
      }), [MAIN_COLOR,valueFocused]);
    
    const stylesGrid = useMemo(() => StyleSheet.create({
        grid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
        },
        text_language:{
            fontSize:ChatMessagesConfig.items_chats.message_text_font_size,
            fontWeight:ChatMessagesConfig.items_chats.message_text_bold
        }
    }), [FONT_SIZE,FONT_BOLD]);



    const { t } = useTranslation();
    const idiomas=[IDIOMA_ESPANOL,IDIOMA_INGLES]
    const [valueUri, setValueUri] = useState('');
    const [valueUriRecursoPrincipal, setValueUriRecursoPrincipal] = useState('');
    const idiomaRecurso=useRef(true); //true -> español ; false -> ingles
    const ItemPhotoCaptureRef=useRef<HijoRef>(null);
    const namediscapacidadref=useRef<string>(NOT_APPLICABLE);
    const [valueIdiomaCurrent, setValueIdiomaCurrent] = useState(idiomas[0]);
    const uriRercursos=useRef<string[]>([]); //posicion 0 ingles ; posicion 1 español
    const correoUser = useRef<string>('');
    const [modalVisible, setModalVisible] = useState(false);
    const [optionsValuesLanguage, setOptionsValuesLanguage] = useState<ISelectOptions[]>([]);
    const language_message = useRef<Record<string, string>>({});

    const [valueProcessTranslating, setValueProcessTranslating] = useState<boolean>(false);

    useEffect(() => {
        async function obtener_discapacidad()
        {
            let namediscapacidad=await AsyncStorage.getItem(KEY_DISCAPACIDAD);
            namediscapacidadref.current=namediscapacidad?namediscapacidad:"";
        }
        obtener_discapacidad();
        get_information();
        console.log("font-size= "+FONT_SIZE);

        Get_language_data();

        setValueFocused(true);
        return () => {
            setValueFocused(false);
            console.log('This route is now unfocused.');
        };
    }, []);
    
    async function get_information(){ 
        const valueCorreoUser = await AsyncStorage.getItem(KEY_CORREO);
        correoUser.current=valueCorreoUser!=null?valueCorreoUser:'';
    }


    /*
        aqui hacer la logica de guardar los mensajes en base64 ya sean (videos, imagenes, audios, texto)
        si existen solo obtener la uri
    */
    //tener en cuenta de enviar en recursosBase64 en la posicion 0 el ingles y en la uno en español y los nombres correspondientes a su posicion
    async function InputOrLoadResouce(path_root:string,recursosBase64:string[],names_files:string[],tiporecurso:string,path_root_recurso_principal:string,recurso_principal_base64:string,name_recurso_principal:string)
    {
        //esta solo sirve para los recursos unicos por ejemplo de audio a texto o video
        if(recurso_principal_base64!="" && name_recurso_principal!="" && path_root_recurso_principal!="")
        {
            const data_uri=await create_file(props.temp?temps_directory:path_root_recurso_principal,name_recurso_principal,recurso_principal_base64);
            setValueUriRecursoPrincipal(data_uri);
        }

        if(props.temp) return;

        if(path_root=="" && recursosBase64.length==0 && names_files.length==0 && tiporecurso=="")
            return;

        let cont=2;

        for(let x=0;x<cont;x++)
        {
            console.log("se esta guardando?");
            const data_uri=await create_file(path_root,names_files[x],recursosBase64[x]);
            console.log("se esta guardando?");
            //vectorUrirecurso.push(data_uri);
            uriRercursos.current.push(data_uri);

        }
        console.log("prueba uri: "+uriRercursos.current[1].toString());
        setValueUri(uriRercursos.current[1].toString())  //ESPAÑOL
    }
    
    async function handlerClickControl(e: GestureResponderEvent)
    {
        ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.load_resource"));
    }

    function changeIdiomaRecurso()
    {
      setValueIdiomaCurrent(currentIdioma=>
        {
            //setValueUri(current=>currentIdioma==IDIOMA_ESPANOL? uriRercursos.current[0]:uriRercursos.current[0]);
            return currentIdioma==IDIOMA_ESPANOL?idiomas[1]:idiomas[0]
        });  
    }

    async function translate_message(message:string,target_language:string){

        setValueProcessTranslating(true);

        if(message=="" || target_language==""){
            console.log("El mensaje o el lenguaje destino estan vacios.");
            setValueProcessTranslating(false);
            return "";
        }

        console.log("Mensaje: "+message);
        console.log("Language: "+target_language);

        setModalVisible(false); //cierra el modal de idiomas

        /* SI EXISTE LA TRADUCCIÓN DEL MENSAJE EN EL IDIOMA REQUERIDO YA NO VUELVE HACER EL PROCESO DE TRADUCCIÓN MIENTRAS EL CHAT ESTE ABIERTO*/

        if(language_message.current[target_language].trim()!=""){
            setValueIdiomaCurrent(target_language);
            console.log("Ya existe la traducción");
            setValueProcessTranslating(false);
            return;
        }


        /**************************************/

        const data_message_translate:IDataTranslateMessage={
            message:message,
            target_language:target_language,
        }

        const json_data_mt=JSON.stringify(data_message_translate);

        const key=await read_file_text(key_directory,NAME_FILE_KEY);
        console.log(key);
        const dataencript=await Encriptar(JSON.stringify(json_data_mt),JSON.parse(key).key);
        
        const data={
            data_encript:dataencript[0],
            correo_user:correoUser.current,
            iv_b64:dataencript[1]
        }

        console.log("***** inf translate message ******");
        console.log(data);
        console.log("*******************************");

        const formData = new FormData();
        formData.append('data_encript',data.data_encript);
        formData.append('correo_user',data.correo_user);
        formData.append('iv_b64',data.iv_b64);

        const promiseData=UseFetchPOSTEvent(formData,"wsocket/translate_message");
        console.log(promiseData);
        promiseData.then(async data=>{
            console.log(data.data);
            language_message.current[target_language]=data.data.data; //{"data": "こんにちは"}
            setValueIdiomaCurrent(target_language);
            setValueProcessTranslating(false);
        })
        .catch(err=> {
            console.log(err.response.data.error);
            ToastError(t("notifications.title_error"),t("notifications.messages.error_send_message"));
        });

        return "";
    }


    function Get_language_data()
    {
        console.log("**************************");
        const formData = new FormData();
        formData.append("sdfas","sdfds");

        const promiseData=UseFetchPOSTEvent(formData,"persona/getidiomas");
        console.log(promiseData);
        promiseData.then(async data=>{
            console.log("------------");
            console.log(data.data.data);
            console.log("-----------");
            const dataServer=data.data.data as IIdioma[];

            let dataSelect: ISelectOptions[]=[];
            for(let object of dataServer)
            {
                dataSelect.push({
                label:object.idioma,
                value:object.prefix.toString()
                } as ISelectOptions);
                language_message.current[object.prefix.toString()]=""
            }
            setOptionsValuesLanguage(dataSelect);
            console.log(language_message.current);
            console.log(Object.hasOwn(language_message.current,"en"));
            console.log(Object.hasOwn(language_message.current,"p"));
        })
        .catch(err=> {
            console.log(err.response.data.error);
            ToastError(t("notifications.title_error"),t("notifications.messages.error_load_languages"));
        });;    
        console.log("**************************");
    }

    /*function language_select(message_text:string,language:string){
        console.log("Mensaje: "+message_text);
        console.log("Language: "+language);
    }*/

    const ModalCustom= (props:ModalMessageText)=>(

        <Modal animationType="slide" transparent={true}  visible={modalVisible} onRequestClose={() => {setModalVisible(!modalVisible);}}>

            <Pressable onPress={e=>{console.log("presiono fuera modal"); setModalVisible(!modalVisible); }} style={{flex:1,backgroundColor:"#0000"}}>

                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>

                        <View style={stylesGrid.grid}>
                        {optionsValuesLanguage.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={(e) => translate_message(props.message_text,item.value) /*language_select(props.message_text,item.value)*/}
                            style={{
                                padding:5,
                                width: 50,
                                height: 50,
                                margin: 5,
                                borderRadius: 8,
                                backgroundColor: "#EFEFEF",
                                alignItems:"center"
                            }}
                            accessible={true}
                            accessibilityLabel={`Idioma ${item.label}`}
                            accessibilityRole="button"
                        >
                            <View>
                                <Text style={stylesGrid.text_language}>{item.label}</Text>
                            </View>
                        </Pressable>
                        ))}
                    </View>
                     
                    </View>
                </View>
            </Pressable>
        </Modal>
      
    )
        
    if(props.tipo_message==TextoAudio)
    {
        const datarecursos=useRef<IDataTextToAudio|null>(null)
        datarecursos.current=JSON.parse(props.datarecurso) as IDataTextToAudio;

        if(Object.hasOwn(language_message.current,"en") && Object.hasOwn(language_message.current,"es")){
            language_message.current["en"]=datarecursos.current.messageingles;
            language_message.current["es"]=datarecursos.current.messageespanol;
        }

        useEffect(() => {
            if(datarecursos.current!=null && props.temp==false){
                InputOrLoadResouce(audio_directory,[datarecursos.current.dataaudioingles.audiobase64ingles,datarecursos.current.dataaudioespanol.audiobase64espanol],[datarecursos.current.dataaudioingles.name_file,datarecursos.current.dataaudioespanol.name_file],TextoAudio,"","","")        
                console.log(valueUri+" url de audio");
            }
        }, [props.temp]);

        return(
            <View accessibilityLabel={t("item_chat_user.item.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true} style={[styles.item_message,{alignSelf:props.tipo_usuario=="emite"?"flex-end":"flex-start"}]}>
                <View accessibilityLabel={t("item_chat_user.name_user.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true} style={[styles.items_message_data,styles.name_user,{/*backgroundColor:"#0f0"*/}]}>
                    <Text style={[styles.name_user_font,{/*backgroundColor:"#0f0"*/}]}>{props.nombre_usuario_emisor}</Text>
                    {valueProcessTranslating?<View style={styles.items_load_translating}>
                        <TouchableOpacity accessibilityLabel={t("item_chat_user.resource_loading.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={handlerClickControl}>
                            <ItemLoadResource></ItemLoadResource>
                        </TouchableOpacity>
                    </View>:<></>}
                    {!props.temp?<View accessibilityLabel={t("item_chat_user.change_language.accessibilityLabel",{language:valueIdiomaCurrent=='es'?"Ingles":"Español"})} accessibilityRole="text" accessible={true} style={{/*backgroundColor:"#f00",*/marginLeft:"auto",flexDirection:"row"}}>
                        <TouchableOpacity disabled={valueProcessTranslating} accessibilityRole="text" accessible={true} onPress={changeIdiomaRecurso} onLongPress={x=>setModalVisible(ref=>!ref)}>
                            <Ionicons name="sync-circle-outline" size={30} color="#000" />
                        </TouchableOpacity>
                        <Text accessibilityRole="text" accessible={true} style={styles.change_language}>
                            {valueIdiomaCurrent}
                        </Text>
                    </View>:<></>}  

                </View>
                {
                    namediscapacidadref.current==AUDITIVA || namediscapacidadref.current==NOT_APPLICABLE?
                    <View accessibilityLabel={t("item_chat_user.message.accessibilityLabel")} accessible={true} accessibilityRole="text" style={styles.items_message_data}>
                        <Text style={[styles.font_size_message_text]}>
                            {
                                language_message.current[valueIdiomaCurrent]
                            }
                        </Text>                        
                    </View>
                    :
                    <></>
                }
                {
                    namediscapacidadref.current==VISUAL || namediscapacidadref.current==NOT_APPLICABLE?
                    <View style={styles.items_message_data}>
                        {/*<Text>
                            {valueIdiomaCurrent==IDIOMA_ESPANOL?uriRercursos.current[1]:uriRercursos.current[0]}
                        </Text>*/}
                        <ItemAudio uri_recurso={valueIdiomaCurrent==IDIOMA_ESPANOL?valueUri:uriRercursos.current[0]}></ItemAudio>
                    </View>
                    :
                    <></>
                }
                <View style={styles.container_hora}>
                    {props.temp?<View style={styles.items_load}>
                        <TouchableOpacity accessibilityLabel={t("item_chat_user.resource_loading.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={handlerClickControl}>
                            <ItemLoadResource></ItemLoadResource>
                        </TouchableOpacity>
                    </View>:<></>}
                    <View accessibilityLabel={t("item_chat_user.message_time.accessibilityLabel",{time:props.dateformats.timepmam})} accessibilityRole="text" accessible={true} style={styles.items_message_data_time}>
                        <Text style={styles.date_time_message}>{props.dateformats.timepmam}</Text>
                    </View>
                </View>
               <ModalCustom message_text={language_message.current[valueIdiomaCurrent]}></ModalCustom>
            </View>
        )
    }
    else if(props.tipo_message==ImagenAudio) //aunque tambien funciona para imagen a texto
    {

        const datarecursos=useRef<IDataDescriptionImage|null>(null)
        datarecursos.current=JSON.parse(props.datarecurso) as IDataDescriptionImage;

        if(Object.hasOwn(language_message.current,"en") && Object.hasOwn(language_message.current,"es")){
            language_message.current["en"]=datarecursos.current.messageingles;
            language_message.current["es"]=datarecursos.current.messageespanol;
        }

        useEffect(() => {
            if(datarecursos.current!=null)
                if(!props.temp)
                    InputOrLoadResouce(audio_directory,[datarecursos.current.dataaudioingles.audiobase64ingles,datarecursos.current.dataaudioespanol.audiobase64espanol],[datarecursos.current.dataaudioingles.name_file,datarecursos.current.dataaudioespanol.name_file],ImagenAudio,imagenes_directory,datarecursos.current.imagenbase64,datarecursos.current.nameimagen)        
                else
                    InputOrLoadResouce("",[],[],"",imagenes_directory,datarecursos.current.imagenbase64,datarecursos.current.nameimagen)        
        }, [props.temp]);

        function openModalImage()
        {
            ItemPhotoCaptureRef.current?.activarModal(valueUriRecursoPrincipal,false,()=>{},()=>{});
        }

        return(
            <View accessibilityLabel={t("item_chat_user.item.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true}  style={[styles.item_message,{alignSelf:props.tipo_usuario=="emite"?"flex-end":"flex-start"}]}>
                <View accessibilityLabel={t("item_chat_user.name_user.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true} style={[styles.items_message_data,styles.name_user]}>
                    <Text style={[styles.name_user_font,{/*backgroundColor:"#0f0"*/}]}>{props.nombre_usuario_emisor}</Text>
                    {valueProcessTranslating?<View style={styles.items_load_translating}>
                        <TouchableOpacity accessibilityLabel={t("item_chat_user.resource_loading.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={handlerClickControl}>
                            <ItemLoadResource></ItemLoadResource>
                        </TouchableOpacity>
                    </View>:<></>}
                    {!props.temp?<View accessibilityLabel={t("item_chat_user.change_language.accessibilityLabel",{language:valueIdiomaCurrent=='es'?"Ingles":"Español"})} accessibilityRole="text" accessible={true} style={{/*backgroundColor:"#f00",*/marginLeft:"auto",flexDirection:"row"}}>
                        <TouchableOpacity accessibilityRole="text" accessible={true} onPress={changeIdiomaRecurso} onLongPress={x=>setModalVisible(ref=>!ref)}>
                            <Ionicons name="sync-circle-outline" size={30} color="#000" />
                        </TouchableOpacity>
                        <Text accessibilityRole="text" accessible={true} style={styles.change_language}>
                            {valueIdiomaCurrent}
                        </Text>
                    </View>:<></>}                  
                </View>
                {
                    namediscapacidadref.current==AUDITIVA || namediscapacidadref.current==NOT_APPLICABLE?
                    <View accessibilityLabel={t("item_chat_user.message_image.accessibilityLabel")} accessibilityRole="image" accessible={true} style={styles.item_message_image}>
                        <TouchableOpacity onPress={openModalImage}>
                            <Image source={{ uri: valueUriRecursoPrincipal }} style={styles.item_image_message} resizeMode="contain" >
                            </Image>
                        </TouchableOpacity>
                        <ItemPhotoCapture descripcion={language_message.current[valueIdiomaCurrent]} nameuser={props.nombre_usuario_emisor} datetime={props.dateformats.date+" "+props.dateformats.timepmam}  ref={ItemPhotoCaptureRef}></ItemPhotoCapture>
                    </View>
                    :
                    <></>
                }
                <View style={styles.items_message_data}>
                    {
                        namediscapacidadref.current==VISUAL || namediscapacidadref.current==NOT_APPLICABLE?
                        <ItemAudio uri_recurso={valueIdiomaCurrent==IDIOMA_ESPANOL?valueUri:uriRercursos.current[0]}></ItemAudio>
                        :
                        <Text accessibilityLabel={t("item_chat_user.message.accessibilityLabel")} accessible={true} accessibilityRole="text" style={styles.font_size_message_text}>{language_message.current[valueIdiomaCurrent]}</Text>
                    }
                </View>
                <View style={styles.container_hora}>
                    {props.temp?<View style={styles.items_load}>
                        <TouchableOpacity accessibilityLabel={t("item_chat_user.resource_loading.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={handlerClickControl}>
                            <ItemLoadResource></ItemLoadResource>
                        </TouchableOpacity>
                    </View>:<></>}
                    <View accessibilityLabel={t("item_chat_user.message_time.accessibilityLabel",{time:props.dateformats.timepmam})} accessibilityRole="text" accessible={true} style={styles.items_message_data_time}>
                        <Text style={styles.date_time_message}>{props.dateformats.timepmam}</Text>
                    </View>
                </View>
                <ModalCustom message_text={language_message.current[valueIdiomaCurrent]}></ModalCustom>
            </View>
        )
    }
    else if(props.tipo_message==AudioTexto)
    {

        const datarecursos=useRef<IDataAudioToText|null>(null)
        datarecursos.current=JSON.parse(props.datarecurso) as IDataAudioToText;

        if(Object.hasOwn(language_message.current,"en") && Object.hasOwn(language_message.current,"es")){
            language_message.current["en"]=datarecursos.current.messageingles;
            language_message.current["es"]=datarecursos.current.messageespanol;
        }

        useEffect(() => {
            if(datarecursos.current!=null)
                InputOrLoadResouce("",[],[],"",audio_directory,datarecursos.current.audiobase64,datarecursos.current.namefile)        
        }, [props.temp]);


        return(
            <View accessibilityLabel={t("item_chat_user.item.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true} style={[styles.item_message,{alignSelf:props.tipo_usuario=="emite"?"flex-end":"flex-start"}]}>
                <View accessibilityLabel={t("item_chat_user.name_user.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true} style={[styles.items_message_data,styles.name_user]}>
                    <Text style={[styles.name_user_font,{/*backgroundColor:"#0f0"*/}]}>{props.nombre_usuario_emisor}</Text>
                    {valueProcessTranslating?<View style={styles.items_load_translating}>
                        <TouchableOpacity accessibilityLabel={t("item_chat_user.resource_loading.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={handlerClickControl}>
                            <ItemLoadResource></ItemLoadResource>
                        </TouchableOpacity>
                    </View>:<></>}
                    {!props.temp?<View accessibilityLabel={t("item_chat_user.change_language.accessibilityLabel",{language:valueIdiomaCurrent=='es'?"Ingles":"Español"})} accessibilityRole="text" accessible={true} style={{/*backgroundColor:"#f00",*/marginLeft:"auto",flexDirection:"row"}}>
                        <TouchableOpacity accessibilityRole="text" accessible={true} onPress={changeIdiomaRecurso} onLongPress={x=>setModalVisible(ref=>!ref)}>
                            <Ionicons name="sync-circle-outline" size={30} color="#000" />
                        </TouchableOpacity>
                        <Text accessibilityRole="text" accessible={true} style={styles.change_language}>
                            {valueIdiomaCurrent}
                        </Text>
                    </View>:<></>}                  
                </View>
                {
                    namediscapacidadref.current==VISUAL || namediscapacidadref.current==NOT_APPLICABLE?
                    <View style={styles.items_message_data}>
                        <ItemAudio uri_recurso={valueUriRecursoPrincipal}></ItemAudio>
                    </View>
                    :
                    <></>
                }
                {
                    namediscapacidadref.current==AUDITIVA || namediscapacidadref.current==NOT_APPLICABLE?
                    <View style={styles.items_message_data} accessibilityLabel={t("item_chat_user.message.accessibilityLabel")} accessibilityRole="text" accessible={true}>
                        <Text style={styles.font_size_message_text}>{language_message.current[valueIdiomaCurrent]}</Text>
                    </View>
                    :
                    <></>
                }
                <View style={styles.container_hora}>
                    {props.temp?<View style={styles.items_load}>
                        <TouchableOpacity accessibilityLabel={t("item_chat_user.resource_loading.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={handlerClickControl}>
                            <ItemLoadResource></ItemLoadResource>
                        </TouchableOpacity>
                    </View>:<></>}
                    <View accessibilityLabel={t("item_chat_user.message_time.accessibilityLabel",{time:props.dateformats.timepmam})} accessibilityRole="text" accessible={true} style={styles.items_message_data_time}>
                        <Text style={styles.date_time_message}>{props.dateformats.timepmam}</Text>
                    </View>
                </View>
                <ModalCustom message_text={language_message.current[valueIdiomaCurrent]}></ModalCustom>
            </View>
        )
    }
    else if(props.tipo_message==Video)
    {
        const datarecursos=useRef<IDataSubtituloVideo|null>(null)
        datarecursos.current=JSON.parse(props.datarecurso) as IDataSubtituloVideo;

        useEffect(() => {
            if(datarecursos.current!=null)
                InputOrLoadResouce("",[],[],"",video_directory,datarecursos.current.videobase64,datarecursos.current.namefile)        
        }, [props.temp]);


        return(
            <View accessibilityLabel={t("item_chat_user.item.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true} style={[styles.item_message,{alignSelf:props.tipo_usuario=="emite"?"flex-end":"flex-start"}]}>
                <View accessibilityLabel={t("item_chat_user.name_user.accessibilityLabel",{name:props.nombre_usuario_emisor})} accessibilityRole="text" accessible={true} style={styles.items_message_data}>
                    <Text style={{padding:0.5,fontSize:10,fontWeight:"bold"}}>{props.nombre_usuario_emisor}</Text>
                </View>
                <View style={styles.items_message_data}>
                    <ItemVideo tempmessage={props.temp} name_user={props.nombre_usuario_emisor!=undefined?props.nombre_usuario_emisor:""} horario={`${props.dateformats.datelongspanish} - ${props.dateformats.timecn}`} datavideo={datarecursos.current.data_video} urivideo={valueUriRecursoPrincipal}></ItemVideo>
                </View>
                <View style={styles.container_hora}>
                    {props.temp?<View style={styles.items_load}>
                        <TouchableOpacity accessibilityLabel={t("item_chat_user.resource_loading.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={handlerClickControl}>
                            <ItemLoadResource></ItemLoadResource>
                        </TouchableOpacity>
                    </View>:<></>}
                    <View accessibilityLabel={t("item_chat_user.message_time.accessibilityLabel",{time:props.dateformats.timepmam})} accessibilityRole="text" accessible={true} style={styles.items_message_data_time}>
                        <Text style={styles.date_time_message}>{props.dateformats.timepmam}</Text>
                    </View>
                </View>
            </View>
        )
    }
}