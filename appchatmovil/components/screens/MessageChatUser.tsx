import { ThemedView } from "@/components/ThemedView";
import { Dimensions, FlatList, GestureResponderEvent, Modal, NativeSyntheticEvent, Pressable, SafeAreaView, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider,useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet,Image,BackHandler } from 'react-native';
import { ThemedText } from "@/components/ThemedText";
import { useEffect, useMemo, useRef, useState } from "react";
import ItemsChat, { AudioTexto, EMITE, ImagenAudio, RECEPTOR, TextoAudio, Video } from "@/components/appscomponent/ItemsChat";
import ItemAudio from "@/components/appscomponent/ItemAudio";
import ItemVideo from "@/components/appscomponent/ItemVideo";
import ItemVideoReproducer from "@/components/appscomponent/ItemVideoReproducer";
import ModalVista from "@/components/appscomponent/ModalVista";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ConstuirRuta, create_file, create_file_tp, delete_file, key_directory, messages_directory, NAME_FILE_KEY, read_file_base64, read_file_text, read_file_text_by_uri, temps_directory } from "../utils/ManagedFiles";
import { DEBUG_ENCRYPTION, Desencriptar, Encriptar, StringToHash256 } from "../utils/encripDescrip";
import { client, DESTINATION_PREFIX, registerOnConnected, registerOnConnectedMessages, urlMessagePrivate, urlPrivateMessages } from "../utils/useStompJS";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEY_CORREO, KEY_CORREO_DESCRIP, KEY_IDUSER, KEY_LAST_NAMES, KEY_NAMES, KEY_USERNAME } from "../utils/Keys";
import { FormatsDate, GetDate } from "../utils/ManagedDate";
import  IMensaje  from "../Interfaces/IMessages";
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { Recording } from "expo-av/build/Audio";
import chunk from "../utils/CodeChunks";
import Sleep from "../utils/Sleep";
import { UseFetchGETEventUrlExterna, UseFetchPOSTEvent, UseFetchPOSTEventFormatJson } from "../utils/useFetch";
import Toast from "react-native-toast-message";
import { IDataMensaje } from "../Interfaces/IDataMensaje";
import { IDataMensajePrincipal } from "../Interfaces/IDataMensajePrincipal";
import IMessages from "../Interfaces/IMessages";
import { URL_BACK } from "../utils/UrlBase";
import { create_name_ramdom, generate_uuidv4 } from "../utils/GRamdom";
import { SpeechText } from "../utils/SpeechText";
import ItemCamera from "../appscomponent/ItemCamera";
import { MAIN_COLOR } from "../ConfigApp/Colors";
import { IFrame, StompSubscription } from "@stomp/stompjs";
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import { ToastError, ToastInfo, ToastSuccess } from "../utils/ToastSpeech";
const { width, height } = Dimensions.get('window');

import {Animated } from "react-native";
import { ChatMessagesConfig } from "../ConfigApp/Config";
import { clientCommandsVoice, setGoBackTabCallback, setOpenSettingsCallback, setOpenUserProfileCallback, setReadScreenCallback, setSendTextMessageCallback } from "../utils/VoiceCommands";
import ModelLoadSplashScreen from "../appscomponent/ModelLoadSplashScreen";
import { data_screen_message_user, screen_reading } from "../utils/screen_reading";
import ViewProfile from "@/app/ViewProfile";

export default function MessageChatUser()
{
    const styles = useMemo(() => StyleSheet.create({
        fondoview:{
            flex:0, //antes estava en 1
            margin:0, //ANTES ESTAVA 5
            width:"100%",
            height:"100%",
            backgroundColor:MAIN_COLOR, //verde
            flexDirection:"column",
        },
        celda_top: {
            margin: 10,
            width: '100%',
            height: 35,
            flexDirection:"row",
            //backgroundColor:"#0f0"
        },
        logouser:{
            width: '100%',
            height: '100%',
            borderRadius: 100,
            objectFit: 'cover',
        },
        celda_img: {
            //borderWidth:1,
            width: 50, //antes 10%
            height:50, //antes 100%
            alignSelf:"center"
        },
        celda_content:{
            width: '90%',
            height:"100%",
        },
        text_style_name_user:{
            marginLeft:15,
            marginTop:2,
            fontSize:ChatMessagesConfig.text_name_user_font_size,
            fontWeight:"bold",
            color:"#000"

        },
        messageslista:{
            backgroundColor:"#EFEFEF",
            flex:10,
            flexDirection:"column",
            padding:8,
            alignItems:"flex-start"
        },
        envio_mensaje:{
            height:61,
            backgroundColor:MAIN_COLOR,
            flexDirection:"row",
        },
        textinput: {
            width:"100%",
            height:"100%",
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: 12,
            fontSize: ChatMessagesConfig.text_input_message_font_size,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            textAlignVertical: 'top', 
            borderWidth: .5,          
            borderColor: 'black',
        },
        celda_icons:{
            padding:0, //antes 5
            flex:1,
            justifyContent:"space-evenly",
            alignItems:"center"
        },
        logos:{
            width: '60%',
            height: '60%',
        },
        item_message:{
            margin:10,
            flexDirection:"column",
            borderWidth: 1,           // grosor del borde
            borderColor: 'red',       // color del borde
            //alignItems:"flex-start"
            //borderRadius: 10,         // bordes redondeados
            //padding: 10,              // espacio interno    
        },
        items_message_data:{
            //alignSelf: 'flex-start',
            borderWidth: 1,           
            borderColor: '#000',
            borderRadius: 10, 
            padding: 5,  
        },
        items_message_data_time:{
            borderWidth: 1,           
            borderColor: '#000',
            borderRadius: 10, 
            padding: 5,  
            alignSelf:"flex-end",
        },
        item_message_image:{
            width:200,
            height:250
        }
        ,item_image_message:{
            borderWidth:3,
            borderColor: 'green',
            width:"100%",
            height:"100%"
        },
        contenedorcontrols:{
            width:"35%",
            flexDirection:"row"
        }
    }), [MAIN_COLOR]);

    const stylesModalCamera = useMemo(() => StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            
            width:"100%",
            height:"100%",
            //margin: 20,
            backgroundColor: 'white',
            //borderRadius: 20,
            //padding: 35,
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
    }), [MAIN_COLOR]);


    const { t } = useTranslation();
    const router = useRouter();
    const idUser = useRef<string>('');
    const correoUser = useRef<string>('');
    const keyUser = useRef<string>('');
    const correoDescripUser = useRef<string>('');
    const NamesUser = useRef<string>('');
    const LastNamesUser = useRef<string>('');
    const UsernameUser = useRef<string>('');

    const [ValueMessages,setValueMessages] = useState<IMessages[]>([]);
    const pruebaaaaaaaaaa = useRef<boolean>(false); //esto eliminar

    const idTipoMensaje = useRef<number>(1);

    const [showLoadSplashScreen, SetShowLoadSplashScreen] = useState(false);
    
    const [modalVisibleCamera, setModalVisibleCamera] = useState(false);


    async function LoadMessages()
    {
        /*console.log("inicio");
        SpeechText("Estan cargando los mensajes");
        console.log("fin");*/
        if(pruebaaaaaaaaaa.current) return; //esto se elimina solo diseño
        pruebaaaaaaaaaa.current=true; //esto se elimina solo diseño
        const formData = new FormData();
        formData.append('idgrupo',idgrupo.toString());
        formData.append('idpersonagruporecibe',idpersonagrupoprimario.toString());

        const promiseData=UseFetchPOSTEvent(formData,"persona/listarcotenidochat");
        console.log(promiseData);
        promiseData.then(async data=>{
            //console.log(data.data.data);

            const dataChat=data.data.data as IDataMensaje[];
            let dataVec=[];
            //console.log(dataChat);
            for(const datach of dataChat)
            {
                console.log("el ciclo de carga de mensajes esta normal que pasaaaa :(");
                if(datach.namefilemensaje!=null)
                {
                    try {
                        const dtachat=await read_file_text(messages_directory,datach.namefilemensaje);
                        //const datajson=JSON.parse(dtachat) as IDataMensajePrincipal;
                        if(dtachat=="") continue;
                        if(dtachat.indexOf("estadomensaje")==-1) continue;

                        //JSON stringificado dentro de otro string, es decir: un string de un JSON ya serializado.
                        //ejemplo: "{\"idtipomensaje\":1,\"emisor\":true,\"user\":{\"nombres\":\"Juan\",\"apellidos\":\"Pérez\"}}"
                        const datajson=JSON.parse(JSON.parse(dtachat)) as IMessages;
                        console.log("name file MENSAJE= "+datajson.name_file_mensaje);

                        //const datadescrip=Desencriptar(JSON.stringify(datajson),datajson.iv_b64,keyUser.current);
                        //const datadesencriptada=JSON.parse(datadescrip) as IMessages;
                        console.log("TIPO MENSAJE= "+datajson.idtipomensaje);
                        console.log("EMSOR? = "+datajson.emisor);
                        //console.log("recursomensajejson= "+datajson.recursomensajejson);
                        console.log("NOMBRE USUARIO EMISOR= "+datajson.useremisor.nombres+" - "+datajson.useremisor.apellidos);
                        dataVec.push(datajson)
                        //setValueMessages(x=>[...x,datajson]);
                    } catch (error) {
                        console.log("Ha ocurrido un error", error);
                    } 
                }
            }
            setValueMessages(dataVec as IMensaje[]);
            dataVec=[];
            console.log("termino la lectura de mensajes");
        })
        .catch(err=> {
            console.log(err.response.data.error);
            ToastInfo(t("notifications.title_information"),t("notifications.messages.error_contain_chat"));
        });;

    }

    useEffect(() => {
        
        async function readencrip()
        {
            const key=await read_file_text(key_directory,NAME_FILE_KEY);
            console.log(key);
            const data=await Encriptar("hola soy jhon",JSON.parse(key).key);
            console.log(data);
        }
        readencrip();

        async function read()
        {
            /*LECTURA DE VARIABLES DE USUARIO*/
            const valueIdUser = await AsyncStorage.getItem(KEY_IDUSER);
            idUser.current=valueIdUser!=null?valueIdUser:'';

            const valueCorreoUser = await AsyncStorage.getItem(KEY_CORREO);
            correoUser.current=valueCorreoUser!=null?valueCorreoUser:'';

            const valuecorreoDescripUser = await AsyncStorage.getItem(KEY_CORREO_DESCRIP);
            correoDescripUser.current=valuecorreoDescripUser!=null?valuecorreoDescripUser:'';

            const valuenameUser = await AsyncStorage.getItem(KEY_NAMES);
            NamesUser.current=valuenameUser!=null?valuenameUser:'';

            const valuelastnameUser = await AsyncStorage.getItem(KEY_LAST_NAMES);
            LastNamesUser.current=valuelastnameUser!=null?valuelastnameUser:'';

            const valueusernameUser = await AsyncStorage.getItem(KEY_USERNAME);
            UsernameUser.current=valueusernameUser!=null?valueusernameUser:'';

            /*LECTURA DE CLAVE PRIVADA*/
            const keydatajson=await read_file_text(key_directory,NAME_FILE_KEY);
            keyUser.current=keydatajson!=null?JSON.parse(keydatajson).key:'';


            console.log("la id del usuario es: "+idUser.current);
            let datachunk:any[]=[];


            //solo para mensajes nuevos
            /*const suscritoclientmessage=client.subscribe(`${DESTINATION_PREFIX}/${idUser.current}${idgrupohash}${urlPrivateMessages}`,(data)=>{
                
                let dataunion="";
                console.log("Mensaje obtenido");
                const datajson=JSON.parse(data.body) as IDataMensajePrincipal;
                //console.log(datajson);

                if(datajson.chunkshabilitado)
                {
                    console.log("chunk habilitadoo");
                    datachunk.push(datajson);
                    if(datajson.chunk_actual==datajson.chunks_totales)
                    {
                        datachunk.sort((a, b) => a.chunk_actual - b.chunk_actual); //ordena
                        console.log("chunks completados");
                        for(let datavec of datachunk)
                        {
                            console.log(datavec.chunk_actual);
                            dataunion+=datavec.data;
                        }
                        datachunk=[];
                    }
                    else return;
                }else dataunion=datajson.data;

                console.log("chunk dessabilitadoo");
                
                //console.log(datajson);
                const datadescrip=Desencriptar(dataunion.trim(),datajson.iv_b64,keyUser.current);
                const datadesencriptada=JSON.parse(datadescrip) as IMessages;
                //console.log(datadescrip.substring(0,10));
                const save_message=async ()=> await create_file_tp(messages_directory,datadesencriptada.name_file_mensaje!=null?datadesencriptada.name_file_mensaje:"",JSON.stringify(datadescrip));
                //save_message();

                //spread operator "..." expande o descompone arrays, objetos o strings en sus elementos individuales.
                setValueMessages(x=>[...x,datadesencriptada]);

            },
                {
                    idhrupohash: idgrupohash.toString()
                }
            );*/

            /*const queueName = `/queue/hola`;
            const suscri = client.subscribe(queueName, async (msg) => {
                console.log("uno:", msg.body);
            });*/

            /*const queueNamedos = `/user/queue/holacausa`;
            const suscridos = client.subscribe(queueNamedos, async (msg) => {
                console.log("dos:", msg.body);
            });*/

            console.log(`${DESTINATION_PREFIX}/${idUser.current}${idgrupohash}${urlPrivateMessages}`);
            const keyuserurl=StringToHash256(`${idUser.current}${idgrupohash}`);
            console.log(`${DESTINATION_PREFIX}/${keyuserurl}${urlPrivateMessages}`);
            console.log(`${DESTINATION_PREFIX}${urlPrivateMessages}.${keyuserurl}`);
            console.log(`${DESTINATION_PREFIX}/${keyuserurl}${urlPrivateMessages}.${keyuserurl}`);
            //const suscritoclientmessage=client.subscribe(`${DESTINATION_PREFIX}/${keyuserurl}${urlPrivateMessages}`,async (data)=>{
            var suscritoclientmessage: StompSubscription;

            function suscribeMessagesFunc()
            {
                console.log("se ejecuto la funcion de suscribeMessagesFunc");
                suscritoclientmessage=client.subscribe(`${urlPrivateMessages}${keyuserurl}`,async (data)=>{
        
                    console.log("Mensaje obtenido nuevo metodo");
                    const datanamefile=data.body;
                    console.log(datanamefile);

                    const url_file=URL_BACK.replaceAll("api",`datatemp/${datanamefile}`);
                    console.log(url_file);
                    const Datafile= await UseFetchGETEventUrlExterna({},url_file);
                    //console.log(Datafile.data);
                    const datajsonfile=Datafile.data as IDataMensajePrincipal;
                    //console.log(datajsonfile);
                    const formData = new FormData();
                    formData.append('filename',datanamefile);
                    
                    const datdelete= await UseFetchPOSTEvent(formData,"wsocket/deletefilemessagetemp");
                    console.log(datdelete.data);
                    
                    const datadescrip=await Desencriptar(datajsonfile.data,datajsonfile.iv_b64,keyUser.current);
                    const datadesencriptada=JSON.parse(datadescrip) as IMessages;
        
                    setValueMessages(x=>{

                        let numpos1=x.findIndex(dat=>dat.idtemporalmessage.trim()==datadesencriptada.idtemporalmessage.trim()); //retorna -1 si no encuentra
                        
                        if(numpos1==-1 /*&& !datadesencriptada.emisor*/){
                            //spread operator "..." expande o descompone arrays, objetos o strings en sus elementos individuales.
                            return [...x,datadesencriptada]
                        }

                        return x.map(item=>
                        item.idtemporalmessage.trim()==datadesencriptada.idtemporalmessage.trim()?
                        {
                            ...item, 
                            idmensaje: datadesencriptada.idmensaje,
                            useremisor: datadesencriptada.useremisor,
                            userobjetivos: datadesencriptada.userobjetivos,
                            idgrupo: datadesencriptada.idgrupo,
                            mensaje_texto: datadesencriptada.mensaje_texto,
                            extencion: datadesencriptada.extencion,
                            recursobase64: datadesencriptada.recursobase64,
                            idtipomensaje: datadesencriptada.idtipomensaje,
                            datetime_envio: datadesencriptada.datetime_envio,
                            enlinea: datadesencriptada.enlinea,
                            emisor: datadesencriptada.emisor,
                            recursomensajejson: datadesencriptada.recursomensajejson,
                            name_file_mensaje: datadesencriptada.name_file_mensaje,
                            idpersonagruporecibe: datadesencriptada.idpersonagruporecibe,
                            estadomensaje: datadesencriptada.estadomensaje,
                            dateformats: datadesencriptada.dateformats,
                            idtemporalmessage: datadesencriptada.idtemporalmessage,
                            estadotemp: datadesencriptada.estadotemp
                        }:item
                    )});
                    
                    if(!datadesencriptada.estadotemp){
                        const save_message=async ()=> await create_file_tp(messages_directory,datadesencriptada.name_file_mensaje!=null?datadesencriptada.name_file_mensaje:"",JSON.stringify(datadescrip));
                        save_message();
                    }
                    //spread operator "..." expande o descompone arrays, objetos o strings en sus elementos individuales.
                    //setValueMessages(x=>[...x,datadesencriptada]);


                    ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.new_message"));
                
                },
                    {
                        //id: userprimario.toString(),
                        id:`chat${keyuserurl}`,
                        idhrupohash: idgrupohash.toString(),
                        iduser: idUser.current,
                        durable: 'true', //true: si el broker se reinicia los mensajes no se borran si es false todo lo contrario
                        'auto-delete': 'false', 
                        //ack: 'client'
                    }
                );
            }
            suscribeMessagesFunc();

            const handler = BackHandler.addEventListener("hardwareBackPress",()=>{
                console.log("retroceder");
                suscritoclientmessage.unsubscribe(
                    {
                        //id:`chat-${keyuserurl.toString()}`,
                        idhrupohash: idgrupohash.toString(),
                        iduser: idUser.current //ya ta encriptado
                    }
                );               
                registerOnConnectedMessages(()=>{}); 
                handler.remove();
                return false;
            });
        
            registerOnConnectedMessages(suscribeMessagesFunc);

            /*const functionSuscribeChat=()=>{
                console.log("ESTA FUNCION DE PRUEBA SE ESTA EJECUTANDO :))))");
            }
            registerOnConnected(functionSuscribeChat);*/
            
        }
        read();
        LoadMessages();

        let url_imagefinal=rutafoto==null?"user.png":rutafoto;
        console.log("la imagen es: "+url_imagefinal);
        const url_image=URL_BACK.replaceAll("api",`fotosperfil/${url_imagefinal}`);
        setUrlFoto(url_image);

        //message_automatic("hola mundo");

    
        setSendTextMessageCallback(message_automatic);

        if(clientCommandsVoice.p_vec_tokens.length>0){
            console.log("enviando mensaje automatico");
            clientCommandsVoice.command_interpreter(clientCommandsVoice.p_vec_tokens);
        }
        else{
            console.log("no hay comando disponible para enviar mensaje automatico");
        }

        
        setReadScreenCallback(()=>{screen_reading(data_screen_message_user(nameitem.toString()))});
        
     

    }, []);


    useEffect(() => {
        if(!modalVisibleCamera)
            setReadScreenCallback(()=>{screen_reading(data_screen_message_user(nameitem.toString()))});
    }, [modalVisibleCamera]);

    const [valUrlfoto, setUrlFoto] = useState('user.png');


    const {nameitem,rutafoto,idgrupohash,idgrupo,userprimario, usersecundario, idpersonagrupoprimario, idpersonagruposecundario } = useLocalSearchParams();    
    console.log(nameitem+" - "+rutafoto+" - "+idgrupohash+" - "+idgrupo+" - "+userprimario+" - "+usersecundario+" - "+idpersonagrupoprimario+" - "+idpersonagruposecundario);
    const insets=useSafeAreaInsets();
    //console.log("top= "+insets.top);
    //console.log("botton= "+insets.bottom);
    
    const [valorInputmessage, setValorInputmessage] = useState('');
    //const [dataSocket, setDataSocket] = useState({});

    const handlerOnChangeTextInput=(e: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        //console.log(e.nativeEvent.text);
        setValorInputmessage(e.nativeEvent.text)
    }

    const prueba_mensajes = [
        { id: 1, tipo_message: TextoAudio, tipo_usuario: EMITE },
        { id: 2, tipo_message: ImagenAudio, tipo_usuario: RECEPTOR },
        { id: 3, tipo_message: AudioTexto, tipo_usuario: RECEPTOR },
        { id: 4, tipo_message: Video, tipo_usuario: EMITE },
    ];

       /*<ItemsChat tipo_message={TextoAudio} tipo_usuario={EMITE}></ItemsChat>,
        <ItemsChat tipo_message={ImagenAudio} tipo_usuario={RECEPTOR}></ItemsChat>,
        <ItemsChat tipo_message={AudioTexto} tipo_usuario={RECEPTOR}></ItemsChat>,
        <ItemsChat tipo_message={Video} tipo_usuario={EMITE}></ItemsChat>*/

    /*********************************************************************************/

    async function handleClicEnviarMensajeNV(tipo_accion:boolean,automatic_message?:string|null,x?: GestureResponderEvent)
    {
        /*MENSAJEE TEMPORAL DE TEXTO*/
        const uuidv4generate=generate_uuidv4();
        const formatsdate=FormatsDate();
        const estadotemp=true;
        const messagestuct={
            dataaudioingles:null,
            dataaudioespanol:null,
            messageingles:"",
            messageespanol: automatic_message==null?valorInputmessage:automatic_message,
            success:""
        }

        const jsondataparsetemp=JSON.stringify(messagestuct);

        //tipo_accion es vacio (true) es audio caso contrario texto (ese if de tipo accion ya no hace nada :V)
        idTipoMensaje.current=1;

        if(!tipo_accion)
        {
            const datas_message={
                "idmensaje": 0,
                "useremisor": {
                    //"id": idUser.current,
                    "id": Number(userprimario),
                    "idpersonagrupo": Number(idpersonagrupoprimario),
                    "correo": correoDescripUser.current,
                    "password": null,
                    "nombres": NamesUser.current,
                    "apellidos": LastNamesUser.current,
                    "username": UsernameUser.current
                },
                "userobjetivos": [],
                "idgrupo": Number(idgrupo),
                "mensaje_texto": automatic_message==null?valorInputmessage:automatic_message, //mensaje de texto
                "extencion":'text', //siempre la extencion para mensajes de texto sera text
                "recursobase64": "",
                "idtipomensaje": idTipoMensaje.current,
                "datetime_envio": GetDate(),
                "enlinea": true,
                "emisor": true,
                "recursomensajejson": jsondataparsetemp, //antes era null pero ahora con los mensajes temporal recibe un json temporal
                "name_file_mensaje": null,
                "idpersonagruporecibe":0,
                "estadomensaje":"",
                "dateformats":{
                    date: formatsdate[0],
                    datetime: formatsdate[1],
                    timecc: formatsdate[2],
                    timecn: formatsdate[3],
                    datelongenglish: formatsdate[4],
                    datelongspanish: formatsdate[5],
                    timepmam: formatsdate[6],
                },
                "idtemporalmessage":uuidv4generate,
                "estadotemp":estadotemp
            }
            setValorInputmessage("");

            /*************** mensaje temporal ****************/
            console.log("la id temporal a enviar es: "+uuidv4generate);
            //const save_message=async ()=> await create_file_tp(messages_directory,`${uuidv4generate}.json`,JSON.stringify(datas_message));
            //save_message();

            //spread operator "..." expande o descompone arrays, objetos o strings en sus elementos individuales.
            setValueMessages(x=>[...x,datas_message as IMessages]);

            /***********************************************/

            const key=await read_file_text(key_directory,NAME_FILE_KEY);
            console.log(key);
            console.log(key);
            const dataencript=await Encriptar(JSON.stringify(datas_message),JSON.parse(key).key);

            const data=
            {
                data:dataencript[0],
                iv_b64:dataencript[1],
                correouser:correoUser.current,
                emisor:true,
                chunk_actual:0,
                chunks_totales:0,
                chunkshabilitado:false,
                idgrupohash:idgrupohash
            }

            console.log(dataencript[1])

            const name_file=`${create_name_ramdom()}.json`;
            await create_file_tp(temps_directory,name_file,JSON.stringify(data));
            const pathabsolutauri=ConstuirRuta(temps_directory,name_file); 

            const formData = new FormData();
            formData.append('file', {
                uri: pathabsolutauri,
                name: name_file, //ejemplo dsjfnsdubjhsd.json
                type: "application/json",
            }as any);

            const promiseData=UseFetchPOSTEvent(formData,"wsocket/messagesfile");
            console.log(promiseData);
            promiseData.then(async data=>{
                //console.log("error creo");
                await delete_file(pathabsolutauri,"","");
                console.log(data.data);
            })
            .catch(err=> {
                console.log(err.response.data.error);
                ToastError(t("notifications.title_error"),t("notifications.messages.error_send_message"));
            }); 
        }
    }

    
    async function enviarMensajeArchivo(base64recurso:string,extencionrecurso:string)
    {
        console.log("se va a enviar un mensaje de archivooo");
        console.log("base64recurso: "+base64recurso.substring(0,10));
        console.log("extencion archivo: "+extencionrecurso);
        console.log("idTipoMensaje: "+idTipoMensaje.current);

        const uuidv4generate=generate_uuidv4();
        const formatsdate=FormatsDate();
        const estadotemp=true;
        
        let messagestuct=undefined

        if(idTipoMensaje.current==2) //imagen
        {
            messagestuct={
                dataaudioingles:null,
                dataaudioespanol:null,
                messageingles:"",
                messageespanol:"",
                imagenbase64:base64recurso,
                nameimagen:`${create_name_ramdom()}.${extencionrecurso}`,
                success:""
            }
        }
        else if(idTipoMensaje.current==3) //video
        {
            messagestuct={
                videobase64:base64recurso,
                namefile:`${create_name_ramdom()}.${extencionrecurso}`,
                data_video:null,
                success:""
            }
        }
        else if(idTipoMensaje.current==4) //audio
        {
            messagestuct={
                audiobase64:base64recurso,
                namefile:`${create_name_ramdom()}.${extencionrecurso}`,
                messageingles:"",
                messageespanol:"",
                success:""
            }
        }
        else{
            console.log("Ha ocurrido un error porque la opcion no existe");
        }

        const jsondataparsetemp=JSON.stringify(messagestuct);


        console.log("metodo nuevo para enviar archivos");
        const datas_message={
            "idmensaje": 0,
            "useremisor": {
                //"id": idUser.current,
                "id": Number(userprimario),
                "idpersonagrupo": Number(idpersonagrupoprimario),
                "correo": correoDescripUser.current,
                "password": null,
                "nombres": NamesUser.current,
                "apellidos": LastNamesUser.current,
                "username": UsernameUser.current
            },
            "userobjetivos": [],
            "idgrupo": Number(idgrupo),
            "mensaje_texto": valorInputmessage,
            "extencion": extencionrecurso, //siempre la extencion para mensajes de texto sera text
            "recursobase64": base64recurso,
            "idtipomensaje": idTipoMensaje.current,
            "datetime_envio": GetDate(), //este campo esta deprecado
            "enlinea": true,
            "emisor": true,
            "recursomensajejson": jsondataparsetemp, //antes era null pero ahora con los mensajes temporal recibe un json temporal
            "name_file_mensaje": null,
            "idpersonagruporecibe":0,
            "estadomensaje":"",
            "dateformats":{
                date: formatsdate[0],
                datetime: formatsdate[1],
                timecc: formatsdate[2],
                timecn: formatsdate[3],
                datelongenglish: formatsdate[4],
                datelongspanish: formatsdate[5],
                timepmam: formatsdate[6],
            },
            "idtemporalmessage":uuidv4generate,
            "estadotemp":estadotemp
        }

        /*************** mensaje temporal ****************/
        console.log("la id temporal a enviar es: "+uuidv4generate);
        //const save_message=async ()=> await create_file_tp(messages_directory,`${uuidv4generate}.json`,JSON.stringify(datas_message));
        //save_message();

        //spread operator "..." expande o descompone arrays, objetos o strings en sus elementos individuales.
        setValueMessages(x=>[...x,datas_message as IMessages]);

        /***********************************************/

        const key=await read_file_text(key_directory,NAME_FILE_KEY);
        console.log(key);
        const dataencript=await Encriptar(JSON.stringify(datas_message),JSON.parse(key).key); //cifra
        console.log(dataencript[0].substring(0,10)); //muestra los 10 primeros caracteres del cifrado base64

        const data=
        {
            data:dataencript[0],
            iv_b64:dataencript[1],
            correouser:correoUser.current,
            emisor:true,
            chunk_actual:0,
            chunks_totales:0,
            chunkshabilitado:false,
            idgrupohash:idgrupohash
        }

        const name_file=`${create_name_ramdom()}.json`;
        await create_file_tp(temps_directory,name_file,JSON.stringify(data));
        const pathabsolutauri=ConstuirRuta(temps_directory,name_file); 

        const formData = new FormData();
        formData.append('file', {
            uri: pathabsolutauri,
            name: name_file, //ejemplo dsjfnsdubjhsd.json
            type: "application/json",
        }as any);

        const promiseData=UseFetchPOSTEvent(formData,"wsocket/messagesfile");
        console.log(promiseData);
        promiseData.then(async data=>{
            //console.log("error creo");
            await delete_file(pathabsolutauri,"","");
            console.log(data.data);
        })
        .catch(err=> {
            console.log(err.response.data.error);
            ToastError(t("notifications.title_error"),t("notifications.messages.error_send_message"));
        }); 
    }


    /*********************************************************************************/

    async function handleAdjuntarFiles(x: GestureResponderEvent)
    {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) 
        {
            /*
                "mimeType": "image/jpeg" --> imagen
                "mimeType": "video/mp4" --> video
            */
            console.log(result);
            console.log(result.assets[0].uri);
            const dataimagebase64=await read_file_base64(result.assets[0].uri,'','');
            console.log("Longitud de mensaje base64= "+dataimagebase64.length);
            console.log("primeros 10 digitos base64= "+dataimagebase64.substring(0,10));

          
            const mimetypevar=result.assets[0].mimeType;
            const extencion_recurso= mimetypevar?.substring(mimetypevar.indexOf("/")+1,mimetypevar.length).trim();
            console.log("la extencion del recurso es: "+extencion_recurso);
            //console.log(dataimagebase64);
            //tener en cuenta que la extencion se envie sin el punto es decir: .jpg eso no seria: jpg 
            if(result.assets[0].mimeType?.includes("image")){
                idTipoMensaje.current=2;
                console.log("es imagen");
            }else if(result.assets[0].mimeType?.includes("video")){
                idTipoMensaje.current=3;
                console.log("es video");
            }
            
            enviarMensajeArchivo(dataimagebase64,extencion_recurso?extencion_recurso:'');
            //EnviarMensajeRecurso(dataimagebase64,extencion_recurso?extencion_recurso:'');
            //enviarMensajeArchivoPrueba(result.assets[0]);
        }
    }

    /*GRABAR AUDIOS*/
    const [recording, setRecording] = useState<Recording>();
    const [permissionResponse, requestPermission] = Audio.usePermissions();

    async function handlerLongPress(e: GestureResponderEvent)
    {
        startPulse();
        e;
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
        setRecording(recording);
        console.log("long press");
    }

    async function handlerOutPress(e: GestureResponderEvent)
    {
        stopPulse();
        e;
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

        idTipoMensaje.current=4;
        const dataimagebase64=await read_file_base64(uri,'','');
        await delete_file(uri,"","");
        //como ya suelta, es decir termino de grabar el audio, automaticamente se envia
        enviarMensajeArchivo(dataimagebase64,"mp3");
    }

    const flatListRef = useRef<FlatList>(null);
    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [ValueMessages]);

    function onPressPhotoProfileUser(x: GestureResponderEvent)
    {
        router.push({
            pathname: '/ProfileChatUserPrincipal',
            params:{
                //idgrupohash:idgrupohash,
                //idgrupo:idgrupo,
                //userprimario:userprimario,
                iduser:usersecundario,
                //idpersonagrupoprimario:idpersonagrupoprimario,
                //idpersonagruposecundario:idpersonagruposecundario
            }
        });
    }


    function activeModalCamera()
    {
        idTipoMensaje.current=2;
        setModalVisibleCamera(!modalVisibleCamera);
    }

    function is_video()
    {
        console.log("es video");
        idTipoMensaje.current=3;
    }

    function is_image()
    {
        console.log("es image");
        idTipoMensaje.current=3;
    }


    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Animación de pulso
    const startPulse = () => {
        Animated.loop(
        Animated.sequence([
            Animated.timing(scaleAnim, {
            toValue: 3.5,
            duration: 500,
            useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            }),
        ])
        ).start();
    };

    const stopPulse = () => {
        scaleAnim.stopAnimation();
        scaleAnim.setValue(1);
    };

    function message_automatic(message:string)
    {
        handleClicEnviarMensajeNV(false,message,undefined);
    }

    return(

        <View style={{paddingTop:insets.top,flex:1/*backgroundColor:"#f00"*/}}>    
            <ThemedView style={styles.fondoview}>
                <View className="header" style={styles.celda_top}>
                    <TouchableOpacity onPress={onPressPhotoProfileUser} accessibilityLabel={t("message_chat_user.picture_profile_user.accessibilityLabel")} accessibilityRole="image" accessible={true} style={styles.celda_img}>
                        {/*<Image  source={require('@/assets/images/jhon.jpg')} style={styles.logouser}>
                        </Image>*/}
                        <Image  source={{uri:valUrlfoto}} style={styles.logouser}>
                        </Image>
                    </TouchableOpacity>
                    <View accessibilityLabel={t("message_chat_user.name_user_chat.accessibilityLabel",{name:nameitem.toString()})} accessibilityRole="text" accessible={true} style={styles.celda_content}>
                        <ThemedText style={styles.text_style_name_user}>{nameitem.toString()}</ThemedText>
                    </View>
                </View>

                <View className="lstmessages" style={styles.messageslista}>
                    <FlatList style={{width:"100%",height:"100%"}}
                        maxToRenderPerBatch={10}
                        initialNumToRender={10}
                        windowSize={8}  
                        removeClippedSubviews={true}
                        ref={flatListRef}
                        //data={prueba_mensajes}
                        data={ValueMessages}
                        keyExtractor={x=>x.idtemporalmessage.toString()}
                        renderItem={({item})=> <ItemsChat tipo_message={
                               item.idtipomensaje==1?TextoAudio:
                               item.idtipomensaje==2?ImagenAudio:
                               item.idtipomensaje==3?Video:
                               item.idtipomensaje==4?AudioTexto:''
                            } tipo_usuario={
                                item.emisor?EMITE:RECEPTOR
                            } 
                            datarecurso={item.recursomensajejson}
                            nombre_usuario_emisor={item.useremisor.nombres+" "+item.useremisor.apellidos}
                            dateformats={item.dateformats}
                            temp={item.estadotemp}
                            ></ItemsChat>}>
                    </FlatList>
                </View>
                
                <View className="enviomessage" style={styles.envio_mensaje}>
                    <View style={{width:"65%",padding:6}}>
                        <TextInput accessibilityLabel={t("message_chat_user.input_message.accessibilityLabel")} accessibilityRole="text"
                            placeholder={t("message_chat_user.input_message.placeholder")}
                            numberOfLines={4}
                            multiline
                            style={styles.textinput}
                            value={valorInputmessage}
                            onChange={handlerOnChangeTextInput}
                        />
                    </View>
                    <View style={styles.contenedorcontrols}>
                        <View style={styles.celda_icons}>
                            <TouchableOpacity accessibilityLabel={t("message_chat_user.attach_images_videos.placeholder")} accessibilityRole="button" accessible={true} onPress={handleAdjuntarFiles} style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}>
                                <Image source={require('@/assets/images/adjuntar.png')} style={styles.logos} resizeMode="contain" >
                                </Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.celda_icons}>
                            <TouchableOpacity accessibilityLabel={t("message_chat_user.capture_photo_video.accessibilityLabel")} accessibilityRole="button" accessible={true} onPress={activeModalCamera} style={{width:"100%",height:"100%",alignItems:"center",justifyContent:"center"}}>
                                <Image source={require('@/assets/images/camara.png')} style={styles.logos} resizeMode="contain" >
                                </Image>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.celda_icons} className="enviarmessage">
                            <TouchableOpacity
                                accessibilityLabel={
                                valorInputmessage === ""
                                    ? "Grabar audio"
                                    : "Enviar mensaje"
                                }
                                accessibilityRole="button"
                                accessible={true}
                                onLongPress={handlerLongPress}
                                onPressOut={handlerOutPress}
                                onPress={x => handleClicEnviarMensajeNV(valorInputmessage === "",null,x)}
                                style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}
                            >
                                {valorInputmessage === "" ? (
                                <Animated.Image
                                    source={require('@/assets/images/microfono.png')}
                                    style={[styles.logos, { transform: [{ scale: scaleAnim }] }]}
                                    resizeMode="contain"
                                />
                                ) : (
                                <Image
                                    source={require('@/assets/images/enviar.png')}
                                    style={styles.logos}
                                    resizeMode="contain"
                                />
                                )}
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </ThemedView>
           
            <SafeAreaProvider>
                <SafeAreaView style={stylesModalCamera.centeredView}>
                    <Modal animationType="slide" transparent={true} visible={modalVisibleCamera} onRequestClose={() => setModalVisibleCamera(!modalVisibleCamera)}>
                        <View style={stylesModalCamera.centeredView}>
                            <View style={stylesModalCamera.modalView}>
                                <ItemCamera visible={modalVisibleCamera} onChangeStateModal={activeModalCamera} sendImage={enviarMensajeArchivo} is_video={is_video} is_image={is_image}></ItemCamera>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </SafeAreaProvider>
            <ModelLoadSplashScreen activeModal={showLoadSplashScreen}/>
            <Toast />
        </View>

    );
}