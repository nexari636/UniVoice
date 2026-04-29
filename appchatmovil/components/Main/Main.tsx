
import UserChat from '@/components/appscomponent/UserChat';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, Stack, useRouter } from 'expo-router';
import { Button, Dimensions, FlatList, GestureResponderEvent, Image, Modal, NativeSyntheticEvent, Pressable, SafeAreaView, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
const { width, height } = Dimensions.get('window');
import * as FileSystem from 'expo-file-system';
import { Asset, useAssets } from 'expo-asset';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { data_user_directory, delete_file, key_directory, NAME_FILE_USER, read_file_base64, read_file_text } from '../utils/ManagedFiles';
import { UseFetchPOSTEvent } from '../utils/useFetch';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_CORREO, KEY_IDUSER } from '../utils/Keys';
import Ionicons from '@react-native-vector-icons/ionicons';
import UserChatSearch from '../appscomponent/UserChatSearch';
import { PARAM_ENCRIPTADO } from '../utils/encripDescrip';
import chunk from '../utils/CodeChunks';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import { MAIN_COLOR, MAIN_COLOR_BACKGROUND, MAIN_TEXT_COLOR } from '../ConfigApp/Colors';
import { Audio } from 'expo-av';
import { Recording } from "expo-av/build/Audio";
import { create_name_ramdom } from '../utils/GRamdom';
import IDataMicTranscriber from '../Interfaces/IDataMicTranscriber';
import ItemLoadResource from '../appscomponent/ItemLoadResource';
import { SpeechText } from '../utils/SpeechText';
import ModelLoadSplashScreen from '../appscomponent/ModelLoadSplashScreen';
import { useFocusEffect } from '@react-navigation/native';
import { ToastError, ToastInfo, ToastSuccess } from '../utils/ToastSpeech';
import { registerOnConnected, registerOnConnectedLoadChats, registerOnConnectedMessages } from '../utils/useStompJS';
import { Animated } from "react-native";
import { FormatsDate } from '../utils/ManagedDate';
import { StompSubscription } from '@stomp/stompjs';
import { changeConfig, FONT_SIZE, MainMenu } from '../ConfigApp/Config';
import FloatingButton from '../utils/FloatingButton';
import { setGoBackTabCallback, setOpenChatCallback, setOpenChatFriendProfile, setOpenSettingsCallback, setOpenUserProfileCallback, setReadScreenCallback, setSearchActionCallback } from '../utils/VoiceCommands';
import { data_screen_main, screen_reading } from '../utils/screen_reading';


interface IDataChats{
    id: number, 
    name_item: string, 
    message_preview: string, 
    data_time: string,
    userprimario:number,
    usersecundario:number,
    idpersonagrupoprimario:number,
    idpersonagruposecundario:number,
    idgrupo:number,
    idgrupohash:string,
    tipogrupo:string,
    rutafoto:string,
}

interface IDataChatsSearchs
{
    idpersona:                       number;
    discapacidad:                    number;
    discapacidaddescripcion:         string;
    pusername:                       string;
    pcorreo:                         string;
    pnombres:                        string;
    papellidos:                      string;
    prutafoto:                       string;
    func_verificar_existencia_grupo: boolean;
}


interface VectorChatRefMethod
{
  method:()=>void,
  idgrupo:number,
  idusersecundario:number
}


export default function Main() 
{
  const [valueFocused,setValueFocused]=useState<boolean>(false);


  const styles = useMemo(() =>StyleSheet.create({
    headerprinc:{
      width:"100%",
      flexDirection:"row",
      justifyContent: 'space-between',
    },
    containerSearch: 
    {
      marginTop:5,
      flexDirection: 'row',
      borderWidth: 0,
      borderColor: '#4da6ff',
      borderRadius: 20,
      backgroundColor: '#f0f8ff',
      alignItems: 'center',
      paddingHorizontal: 10,
      height: 50,
      width: '100%',
      alignSelf: 'center',
    },
    input: {
      fontSize:MainMenu.search_font_size,
      fontWeight:MainMenu.search_bold,
      flex: 1,
      color: '#000',
      paddingVertical: 15,
      paddingHorizontal: 10,
      /*borderColor:"#000",
      borderWidth:1*/
    },
    icon: {
      backgroundColor: '#4da6ff',
      padding: 8,
      borderRadius: 15,
    },
    header: { //desde aqui la view o parte de arriva de la app :V
      backgroundColor: MAIN_COLOR,
      paddingVertical: 8,
      paddingHorizontal: 13,
      /*flexDirection: 'row',*/
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 4, // sombra en Android
      shadowColor: '#000', // sombra en iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      marginBottom:4
    },
    logoTexto: {
      fontSize: MainMenu.logo_text_font_size,
      fontWeight: 'bold',
      color: MAIN_TEXT_COLOR // color verde estilo WhatsApp
    },
    iconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttons_acc:{
      width:48,
      height:48,
      justifyContent:"center",
      alignItems:"center",
      //borderWidth:1
    }
  }), [MAIN_COLOR,valueFocused]);

  const stylesModal = useMemo(() => StyleSheet.create({
  centeredView: {
    /*backgroundColor:"#0f0",*/
    flex: 1,
    justifyContent:"flex-start",
    alignItems: "flex-end",
  },
  modalView: {
    width:"40%",
    top:"4.5%",
    left:"4.5%",
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10, //antes
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
    margin:2
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonOptions: {
    backgroundColor: MAIN_COLOR,
    width:"100%",
    height:48,
  },
  textStyle: {
    fontSize:MainMenu.button_menu_config_font_size,
    color: MAIN_TEXT_COLOR,
    fontWeight: 'bold',
    height:"100%",
    textAlign:"center",
    textAlignVertical:"center",
    /*borderWidth:1,
    borderColor:"#0f0"*/
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  }), [MAIN_COLOR,valueFocused]);



  useFocusEffect(
    useCallback(() => {
      loadDataChats(valCorreoUserencry.current);
      setValueFocused(true);
      return () => {
        setValueFocused(false);
        console.log('This route is now unfocused.');
      };
    }, [])
  )

  const { t } = useTranslation();
  const router = useRouter();
  const [dataChats,setDataChats]=useState<IDataChats[]>([]);
  const [dataChatsSearch,setDataChatsSearch]=useState<IDataChatsSearchs[]>([]);
  const valIdUserencry=useRef<string>("0");
  const valCorreoUserencry=useRef<string>("");
  const vectorMethodRouteItemsChatRef=useRef<VectorChatRefMethod[]>([]);


  
  function openChatCommand(idgrupo:string)
  {
    const dataFilter=vectorMethodRouteItemsChatRef.current.filter((data)=> data.idgrupo.toString()==idgrupo);
    console.log(dataFilter);
    console.log(vectorMethodRouteItemsChatRef.current);

    if(dataFilter.length>0)
    {
      dataFilter[0].method();
    }
    else
    {
      console.log("condicion= "+dataFilter[0].idgrupo.toString()==idgrupo.trim());
    }

    /*
    for(const datChat of vectorMethodRouteItemsChatRef.current)
    {
      console.log(datChat);

      if(datChat.idgrupo.toString()==idgrupo.trim())
      {
        datChat.method();
        break;
      }else
      {
        console.log("condicion= "+datChat.idgrupo.toString()==idgrupo.trim());
      }
    }*/
  }

  function openProfileCommand()
  {
    HandleClickFunctions(PERFIL);
  }

  function openConfigurationCommand()
  {
    HandleClickFunctions(CONFIGAPP);
  }

  function openProfileSecondUserCommand(idgrupo:string)
  {
    const dataFilter=vectorMethodRouteItemsChatRef.current.filter((data)=> data.idgrupo.toString()==idgrupo);
    console.log(dataFilter);
    console.log(vectorMethodRouteItemsChatRef.current);

    if(dataFilter.length>0)
    {
      console.log("redirigiendo a perfil");
      router.push({
          pathname: '/ProfileChatUserPrincipal',
          params:{
              //idgrupohash:idgrupohash,
              //idgrupo:idgrupo,
              //userprimario:userprimario,
              iduser:dataFilter[0].idusersecundario,
              //idpersonagrupoprimario:idpersonagrupoprimario,
              //idpersonagruposecundario:idpersonagruposecundario
          }
      });
    }else{
      console.log("chat no encontrado");
    }

    /*for(const datChat of vectorMethodRouteItemsChatRef.current)
    {
      console.log(datChat);

      if(datChat.idusersecundario.toString()==idusersecundario.trim())
      {
        router.push({
          pathname: '/ProfileChatUserPrincipal',
          params:{
              //idgrupohash:idgrupohash,
              //idgrupo:idgrupo,
              //userprimario:userprimario,
              iduser:idusersecundario,
              //idpersonagrupoprimario:idpersonagrupoprimario,
              //idpersonagruposecundario:idpersonagruposecundario
          }
        });
        break;
      }else
      {
        console.log("condicion= "+datChat.idgrupo.toString()==idusersecundario.trim());
      }
    }*/

  }


  function SearchUserCommand(data:string)
  {
    setValueSearch(data);
    handlerClickSearch(data);
  }


  async function obtainData()
  {
    const valueCorreoUser = await AsyncStorage.getItem(KEY_CORREO);
    const dataiduser = await AsyncStorage.getItem(KEY_IDUSER);
    valIdUserencry.current=dataiduser?dataiduser:""
    valCorreoUserencry.current=valueCorreoUser?valueCorreoUser:""
    loadDataChats(valCorreoUserencry.current);    
  }


  function loadDataChats(valueCorreoUser:string)
  {
    vectorMethodRouteItemsChatRef.current=[];
    console.log("que vaina que no carga el metodo v1");

    if(valueCorreoUser==null){
      console.log("Error el correo esta vacio");
      return;
    }
    console.log("correofinal = "+valueCorreoUser);
    const formData = new FormData();
    formData.append('correousuario',valueCorreoUser);
    const promiseData=UseFetchPOSTEvent(formData,"persona/obtenerchats");
    promiseData.then(data=>{
      const dataChats=data.data.data;
      const dataFormat = []

      if(dataChats.length>0)
      {
        const formatsdate=FormatsDate();
        const current_date=formatsdate[0];

        for(const chat of dataChats)
        {

          let datemessage="";
          let jsonDateFormats=chat.datamensaje.datadatemessage;
          if(jsonDateFormats==null){
            datemessage=chat.datamensaje.mfecha_envio;
          }else{
            let datadateformat=JSON.parse(jsonDateFormats);
            if(current_date.trim()==datadateformat.date.trim()){
              datemessage=datadateformat.timepmam.trim();
            }
            else datemessage=datadateformat.date.trim();
          }

          dataFormat.push({
            id: chat.usersecundario, 
            name_item: chat.tipogrupo=='2p2'?chat.pusername:chat.nombregrupo, 
            message_preview: chat.datamensaje.datatipomensaje, 
            //data_time: chat.datamensaje.mfecha_envio,
            data_time: datemessage,
            userprimario:chat.userprimario,
            usersecundario:chat.usersecundario,
            idpersonagrupoprimario:chat.idpersonagrupoprimario,
            idpersonagruposecundario:chat.idpersonagruposecundario,
            idgrupo:chat.idgrupo,
            idgrupohash:chat.idgrupohash,
            tipogrupo:chat.tipogrupo,
            rutafoto:chat.tipogrupo=='2p2'?chat.prutafoto:chat.grutafoto
          });
        }
        setDataChats(dataFormat);
      }
      else{
        ToastInfo(t("notifications.title_information"),t("notifications.messages.empty_chats_user"));
      }
    })
    .catch(err=> {
        console.log(err.response.data.error);
        ToastError(t("notifications.title_error"),t("notifications.messages.error_get_chats"));
    });;
  }
  
 
  /*function pruebachunk()
  {
    const data=chunk("holaaaa yo soy jhon leturne");
    console.log(data);
  }*/


  useEffect(  () => {
    console.log("despues me ejecuto***************************");
 
    obtainData();
    //pruebachunk();
    console.log("inicio de registro");
    function cargarChats()
    {
      loadDataChats(valCorreoUserencry.current);
      console.log("porfinnn de ejecutoooo ejecuta  :)))))))))))))::::: ");
    }
    registerOnConnectedLoadChats(cargarChats);
    //registerOnConnectedMessages(()=>{console.log("jajaja un poco raro")});
    console.log("se registro");
    
    setOpenChatCallback(openChatCommand);
    setOpenUserProfileCallback(openProfileCommand);
    setOpenSettingsCallback(openConfigurationCommand);
    setOpenChatFriendProfile(openProfileSecondUserCommand);
    setSearchActionCallback(SearchUserCommand);
    setReadScreenCallback(()=>{screen_reading(data_screen_main())});

    setGoBackTabCallback(()=>{
        router.push({
            pathname: '/main',
            params:{
                //idgrupohash:idgrupohash,
            }
        });
    });


    /*setOpenSettingsCallback(()=>
    {
        router.push({
            pathname: '/uriSettingsApp',
            params:{
                //idgrupohash:idgrupohash,
            }
        });
    });*/


    /*setOpenUserProfileCallback(async ()=>
    {
        const valueCorreoUser = await AsyncStorage.getItem(KEY_CORREO);

        router.push({
            pathname: '/ViewProfile',
            params:{
                correoparam: valueCorreoUser?valueCorreoUser:"",
                encriptadoparam: 1, //1 encriptado 

            }
        });
    });*/

       


    //screen_reading(data_screen_main())
    /*const functionSuscribeChat=()=>{
      console.log("ESTA FUNCION DE PRUEBA SE ESTA EJECUTANDO :))))");
    }
    registerOnConnected(functionSuscribeChat);*/

    /*setTimeout(() => {
      SearchUserCommand("a");
      console.log("Hola después de 2 segundos!");
    }, 3000);*/



  }, []);

  //para pruebas
  const data = [
    { id: 1, name_item: 'Jhon', message_preview: 'Hola, yo soy cantante', data_time: '17/04/2028' },
    { id: 2, name_item: 'Ana', message_preview: '¿Vamos al cine mañana?', data_time: '15/04/2028' },
    { id: 3, name_item: 'Carlos', message_preview: 'Te envié el archivo por correo', data_time: '16/04/2028' },
    { id: 4, name_item: 'Lucía', message_preview: 'Estoy llegando en 10 minutos', data_time: '14/04/2028' },
    { id: 5, name_item: 'Pedro', message_preview: '¿Tienes los resultados del examen?', data_time: '13/04/2028' },
    { id: 6, name_item: 'María', message_preview: 'Feliz cumpleaños', data_time: '12/04/2028' },
    { id: 7, name_item: 'Andrés', message_preview: 'Nos vemos en la reunión', data_time: '11/04/2028' },
    { id: 8, name_item: 'Sofía', message_preview: 'Gracias por tu ayuda', data_time: '10/04/2028' },
    { id: 9, name_item: 'Luis', message_preview: 'No podré asistir hoy', data_time: '09/04/2028' },
    { id: 10, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
    { id: 11, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
    { id: 12, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
    { id: 13, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
    { id: 14, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
    { id: 15, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
    { id: 16, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
    { id: 17, name_item: 'Camila', message_preview: 'Revisé el documento y está bien', data_time: '08/04/2028' },
  ];
  
  const insets=useSafeAreaInsets();

  function handleClickItem(name_item:string,ruta_foto:string,idgrupohash:string,idgrupo:number,userprimario:number,usersecundario:number,idpersonagrupoprimario:number,idpersonagruposecundario:number)
  {
    router.push({
      pathname: '/chatUserMessages',
      params:{
        nameitem:name_item,
        rutafoto:ruta_foto,
        idgrupohash:idgrupohash,
        idgrupo:idgrupo,
        userprimario:userprimario,
        usersecundario:usersecundario,
        idpersonagrupoprimario:idpersonagrupoprimario,
        idpersonagruposecundario:idpersonagruposecundario
      }
    });
  }

  function itemClickDataChats(item:IDataChats){
    //var vectorMethodRouteItemsChat:VectorChatRefMethod[]=[];

    const metodoClicItem=() => handleClickItem(item.name_item,item.rutafoto,item.idgrupohash,item.idgrupo,item.userprimario,item.usersecundario,item.idpersonagrupoprimario,item.idpersonagruposecundario);
    const itemC=<TouchableOpacity onPress={metodoClicItem}>
      <UserChat idgrupo={item.idgrupo} iduser={item.usersecundario} urlimage={item.rutafoto} name_user={item.name_item} message_preview={item.message_preview} data_time={item.data_time}/>
    </TouchableOpacity>
    vectorMethodRouteItemsChatRef.current.push({
      method:metodoClicItem,
      idgrupo:item.idgrupo,
      idusersecundario:item.usersecundario
    });
    //vectorMethodRouteItemsChatRef.current=vectorMethodRouteItemsChat;
    return itemC;
  }


  const [dataValueSearch,setValueSearch]=useState<string>('');

  function onChangeTextSearch(e: NativeSyntheticEvent<TextInputChangeEventData>)
  {
    setValueSearch(e.nativeEvent.text);
    if(e.nativeEvent.text.trim()=='')
    {
      loadDataChats(valCorreoUserencry.current);
      setDataChatsSearch([]);
    }
  }

  function handlerClickSearch(data?:string|null)
  {
    if(dataValueSearch.trim()=="" && data==null) return;

    const valueSearch=data==null?dataValueSearch:data;

    setDataChatsSearch([]);
    console.log("ID user incriptado= "+valIdUserencry);
    console.log("Valor busqueda= "+valueSearch);
    const formData = new FormData();
    formData.append('iduser',valIdUserencry.current);
    formData.append('textsearch',valueSearch);
    
    const promiseData=UseFetchPOSTEvent(formData,"persona/searchusers");
    console.log(promiseData);
    promiseData.then(data=>{
        
      console.log("***********************");
      console.log(data.data.data);
      const dataUsers=data.data.data as IDataChatsSearchs[]
      setDataChatsSearch(dataUsers);
      setDataChats([]);

      if(dataUsers.length<=0){
        ToastInfo(t("notifications.title_information"),t("notifications.messages.notifications_search_user"));
      }

    })
    .catch(err=> {
        console.log(err.response.data.error);
        ToastError(t("notifications.title_error"),t("notifications.messages.error_search_user"));
    });;

  }

  const [recording, setRecording] = useState<Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [ValueloadMicRecognition,loadMicRecognition] = useState<boolean>(false);

  async function handlerClickSearchMicPress()
  {
    startPulse();
    console.log("Presiono el microfono");
    if (permissionResponse==null) return;
    if (permissionResponse.status !== 'granted') {
        console.log("Se denegó el permiso para acceder al micrófono");
        await requestPermission();
        return;
    }

    await Audio.setAudioModeAsync({});
  
    console.log('Starting recording..');
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    setRecording(recording);
    console.log("long press");
  }

  async function handlerClickSearchMicOut()
  {
    stopPulse();
    console.log("Dejo de presionar el microfono");
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
    
    loadMicRecognition(true);

    //const dataimagebase64=await read_file_base64(uri,'','');
    //await delete_file(uri,"","");
    //como ya suelta, es decir termino de grabar el audio, automaticamente se envia

    const name_file=`${create_name_ramdom()}.m4a`;

    const formData = new FormData();
    formData.append('file', {
        uri: uri,
        name: name_file, //ejemplo dsjfnsdubjhsd.json
        type: "application/json",
    }as any);

    const promiseData=UseFetchPOSTEvent(formData,"persona/resourcemic");
    console.log(promiseData);
    promiseData.then(async data=>{
        const dataObj=data.data.data as IDataMicTranscriber;
        console.log("*********vvvv**********");
        console.log(dataObj);
        console.log("**********vvvvv*********");
        setValueSearch(dataObj.result);
        handlerClickSearch();
        loadMicRecognition(false);
    })
    .catch(err=> {
        console.log(err.response.data.error);
        ToastError(t("notifications.title_error"),t("notifications.messages.error_search_mic"));
    }); 

  }

  const [modalVisibleOptions, setModalVisibleOptions] = useState(false);
  const PERFIL="Perfil"
  const CONFIGAPP="Configuraciones"

  const OPCIONES=[
    PERFIL,
    CONFIGAPP
  ]

  function HandleClickFunctions(opcion:string)
  {
    setModalVisibleOptions(false);
    if(opcion==PERFIL)
    {
      router.push({
        pathname: '/ViewProfile',
        params:{
          correoparam: valCorreoUserencry.current,
          encriptadoparam: PARAM_ENCRIPTADO, //1 encriptado 
        }
      });
    }
    else if(opcion==CONFIGAPP)
    {
      router.push({
        pathname: '/uriSettingsApp'
      });
    }
  }
  
  async function handlerClickControl(e: GestureResponderEvent)
  {
    ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.load_resource"));
  }

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 3.5, // crece hasta 3.5 veces
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

  return (

      <View style={{paddingTop:insets.top,paddingBottom:insets.bottom,backgroundColor:MAIN_COLOR_BACKGROUND,flexDirection:"column",height:"100%"}}>
          
        <View style={{width:"100%",marginTop:"4%",backgroundColor:MAIN_COLOR}}>

          <View style={styles.header}>
            
            <View style={styles.headerprinc}>
              <Text style={styles.logoTexto} accessibilityLabel={t('view_main.logo.accessibilityLabel')} accessibilityRole="header">𝙰𝙼𝙸𝙲</Text>
              <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.buttons_acc} onPress={e=>setModalVisibleOptions(true)} accessibilityLabel={t('view_main.optionsmenu.accessibilityLabel')} accessibilityRole="header" onBlur={e=>setModalVisibleOptions(false)}>
                  <Ionicons name="ellipsis-vertical" size={30} color={MAIN_TEXT_COLOR} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerSearch} accessible={true} accessibilityLabel={t('view_main.search_users.accessibilityLabel')} accessibilityRole="search">
              <TextInput
                placeholder={t('view_main.search_users.placeholder')}
                placeholderTextColor="#000"
                style={styles.input}
                value={dataValueSearch}
                onChange={onChangeTextSearch}
                onSubmitEditing={(e)=>handlerClickSearch(null)}

              />
              {
                ValueloadMicRecognition?
                <TouchableOpacity accessibilityLabel={t("view_main.search_users.load_resource")} accessibilityRole="button" accessible={true} style={{marginRight:10}}  onPress={handlerClickControl}>
                  <ItemLoadResource></ItemLoadResource>
                </TouchableOpacity>
                :
                <></>
              }
             
              <Pressable
                onLongPress={handlerClickSearchMicPress}
                onPressOut={handlerClickSearchMicOut}
                style={[{marginRight: 10},styles.buttons_acc]}
                accessibilityRole="button"
                accessible={true}
                accessibilityLabel={t('view_main.search_users.button_mic')}
              >
                <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                  <Ionicons name="mic-outline" color={"#000"} size={30} />
                </Animated.View>
              </Pressable>

              <Pressable style={styles.buttons_acc}  onPress={(e)=>handlerClickSearch(null)} accessibilityLabel={t('view_main.search_users.iconsearch')} accessibilityRole="button" accessible={true}>
                <Ionicons name="search" color={"#000"} size={30} />
              </Pressable>

            </View>

          </View>

          {/*<Link asChild href="/chatUserMessages" >
              <Button  onPress={(x)=>console.log("x")}  title="PaginaChat"></Button>
          </Link>*/}

        </View>
      
        <View style={{width:"100%",height:"85%"/*,backgroundColor:"#0f0"*/}}>
          {
            dataChats.length!=0?
              <FlatList 
                data={dataChats}
                keyExtractor={x=>x.id.toString()}
                renderItem={({item})=> itemClickDataChats(item)}>
              </FlatList>
            :
            <FlatList 
              data={dataChatsSearch}
              keyExtractor={x=>x.idpersona.toString()}
              renderItem={({item})=> <UserChatSearch 
                                                fotoruta={item.prutafoto}
                                                activo={item.func_verificar_existencia_grupo} 
                                                correo={valCorreoUserencry.current}      
                                                name_user={item.pusername}
                                                tipogrupo='2p2'
                                                iduserprincipal={valIdUserencry.current}
                                                iduseramigo={item.idpersona}
                                                nombre={item.pnombres}
                                                apellidos={item.papellidos}
                                                iddiscapacidad={item.discapacidad}
                                                discapacidaddescripcion={item.discapacidaddescripcion}
                                                      ></UserChatSearch>}>
            </FlatList>

          }

  
            {/*
            <UserChatSearch name_user="prueba" message_preview="pruebaaa" activo={true}></UserChatSearch>
            <UserChatSearch name_user="prueba" message_preview="pruebaaa" activo={false}></UserChatSearch>*/}
        {/*<FlatList 
              data={dataChats}
              keyExtractor={x=>x.id.toString()}
              renderItem={({item})=> <UserChat name_user={item.name_item} message_preview={item.message_preview} data_time={item.data_time}/>}>
          </FlatList>*/}

        </View>

        <SafeAreaProvider>
            <SafeAreaView style={stylesModal.centeredView}>

              <Modal animationType="slide" transparent={true}  visible={modalVisibleOptions} onRequestClose={() => {setModalVisibleOptions(!modalVisibleOptions);}}>

                  <Pressable onPress={e=>{console.log("presiono fuera modal"); setModalVisibleOptions(!modalVisibleOptions); }} style={{flex:1,backgroundColor:"#0000"}}>

                      <View style={stylesModal.centeredView}>

                          <View style={stylesModal.modalView}>
                            {
                              OPCIONES.map((opcion,indice)=>
                              (
                                <Pressable key={indice} style={[stylesModal.button, stylesModal.buttonOptions]} onPress={() => HandleClickFunctions(opcion)}>
                                  <Text style={stylesModal.textStyle}>{opcion}</Text>
                                </Pressable>
                              ))
                            }
                         
                            
                          </View>

                      </View>

                  </Pressable>
              </Modal>
              {/*<Pressable
                style={[stylesModal.button, stylesModal.buttonOpen]}
                onPress={() => setModalVisibleOptions(true)}>
                <Text style={stylesModal.textStyle}>Show Modal</Text>
              </Pressable>*/}


            </SafeAreaView>
    
        </SafeAreaProvider>
        <Toast/>
      </View>
    );
}
