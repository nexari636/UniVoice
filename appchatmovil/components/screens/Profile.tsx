import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  GestureResponderEvent
} from 'react-native';
import ItemSelect from "../appscomponent/ItemSelect";
import { UseFetchPOSTEvent, UseFetchPOSTEventFormatJson } from "../utils/useFetch";
import Toast from "react-native-toast-message";
import IDiscapacidad from "../Interfaces/IDiscapacidad";
import { ThemedView } from "../ThemedView";
import { Formik } from 'formik';
import * as Yup from "yup";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { read_file_base64 } from "../utils/ManagedFiles";
import  Sleep  from "../utils/Sleep";
import { URL_BACK } from "../utils/UrlBase";
import IPersona from "../Interfaces/IPersona";
import ISelectOptions from "../Interfaces/ISelectOptions";
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import IIdioma from "../Interfaces/IIdioma";
import { KEY_DISCAPACIDAD, KEY_IDIOMAUSER } from "../utils/Keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAIN_COLOR, MAIN_COLOR_DESACTIVATE, MAIN_TEXT_COLOR } from "../ConfigApp/Colors";
import ModelLoadSplashScreen from "../appscomponent/ModelLoadSplashScreen";
import { ToastError, ToastSuccess } from "../utils/ToastSpeech";
import { ProfileMenu } from "../ConfigApp/Config";
import { setReadScreenCallback } from "../utils/VoiceCommands";
import { data_screen_profile_host_user, screen_reading } from "../utils/screen_reading";

interface data_form {
    usuario:string,
    nombres:string,
    apellidos:string,
    telefono:string,
    correo:string,
    descripcion:string,
}

export default function Profile()
{   
  const styles = useMemo(() => StyleSheet.create({
      container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
      },
      input: {
        marginLeft:30,
        marginRight:30,
        height: 48,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: ProfileMenu.text_input_font_size,
        fontWeight:ProfileMenu.text_input_bold,
        color: '#000',
//        borderColor: '#9A9D9A',
        borderColor:"#000"

      },
      container_input:{
        width:"100%",
        margin:0,
        padding:4, 
        /*borderWidth:3,
        borderColor:"#f00"*/
      },
      button: {
        marginLeft:30,
        marginRight:30,
        //backgroundColor: '#2196F3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        height:48
      },
      buttonText: {
        color: MAIN_TEXT_COLOR,
        fontSize: ProfileMenu.button_save_font_size,
        fontWeight: 'bold',
        width:"100%",
        textAlign:"center",
        textAlignVertical:"center"
      },
      error_message:{
        marginLeft:30,
        marginRight:30,
        color:"#f00",
        fontSize:ProfileMenu.error_text_font_size,
        fontWeight: 'bold',
      },
      fotoUsuario: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 70,
        marginBottom: 10
      },
      btnFoto: {
        backgroundColor: MAIN_COLOR,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 20,
        height:48,
        textAlignVertical:"center",

      },
      btnTexto: {
        fontSize:ProfileMenu.button_change_photo_font_size,
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold',
        height:"100%",
        textAlignVertical:"center"
      },
      container_select:{
        marginLeft:30,
        marginRight:30,
      }
    }), [MAIN_COLOR]);


    const [showLoadSplashScreen, SetShowLoadSplashScreen] = useState(true);

    const { t } = useTranslation();

    const {correoparam, encriptadoparam } = useLocalSearchParams();  
 
    console.log(correoparam+" - "+encriptadoparam);

    const insets=useSafeAreaInsets();
    //const [valUrlfoto, setUrlFoto] = useState('@/assets/images/user.png');
    //const [valUrlfoto, setUrlFoto] = useState('https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png');
    const [valUrlfoto, setUrlFoto] = useState('user.png');
    const [valueOptionsSelectDiscapacidades, setOptionsSelectDiscapacidades] = useState<ISelectOptions[]>([]);
    const [valueOptionsSelectIdiomas, setOptionsSelectIdiomas] = useState<ISelectOptions[]>([]);
    const [valueDataPersona, setDataPersona] = useState<IPersona>();
    const [valueIdDiscapacidadSelect,setIdDiscapacidadSelect]=useState<string>('');
    const [valueIddiomaSelect,setIdIdiomaSelect]=useState<string>('');


    useEffect(() => {
      
      if(valueOptionsSelectDiscapacidades.length>0 && valueOptionsSelectIdiomas.length>0 && valueDataPersona!=null){
        SetShowLoadSplashScreen(false);
      }

    }, [valueOptionsSelectDiscapacidades,valueOptionsSelectIdiomas,valueDataPersona])




    function ChangePhotoSave(database64photo:string,extencion:string)
    {

      console.log("la extencion es: "+extencion);

      const formData = new FormData();
      formData.append("correo",correoparam.toString());
      formData.append("filebase64",database64photo);
      formData.append("extencion",extencion);

      const promiseData=UseFetchPOSTEventFormatJson(formData,"persona/updatephoto");
      console.log(promiseData);
      promiseData.then(async data=>{
          console.log(data.data);
          const url_image=URL_BACK.replaceAll("api",`fotosperfil/${data.data.namefoto}`);
          /*while(true)
          {
            const res = await fetch(url_image, { method: "HEAD" });
            console.log("status= "+res.status);
            if (res.status === 200){
              console.log("acceso completo= "+res.status);
              break;
            }else console.log("acceso nulo= "+res.status);
            await Sleep(2000);
          }*/
          console.log(url_image);
          setUrlFoto(url_image);

          ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.update_photo"));
      })
      .catch(err=> {
          console.log(err.response.data.error);
          ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.error_update_photo"));
      });;    
    }


    function ObtenerDataDiscapacidades()
    {
      console.log("**************************");
      const formData = new FormData();
      formData.append("d","d");

      const promiseData=UseFetchPOSTEvent(formData,"persona/getdiscapacidades");
      console.log(promiseData);
      promiseData.then(async data=>{
          console.log("-------------");
          console.log(data.data.data);
          console.log("--------------");
          const dataServer=data.data.data as IDiscapacidad[];

          let dataSelect: ISelectOptions[]=[];
          for(let object of dataServer)
          {
            dataSelect.push({
              label:object.discapacidad,
              value:object.iddiscapacidad.toString()
            } as ISelectOptions);
          }
          setOptionsSelectDiscapacidades(dataSelect);
      })
      .catch(err=> {
        console.log(err.response.data.error);
        ToastError(t("notifications.title_error"),t("notifications.messages.error_load_disabilities"));
      });;    
      console.log("**************************");
    }

    function ObtenerDataIdiomas()
    {
      console.log("**************************");
      const formData = new FormData();
      formData.append("sdfas","sdfds");

      const promiseData=UseFetchPOSTEvent(formData,"persona/getidiomas");
      console.log(promiseData);
      promiseData.then(async data=>{
          console.log("-------------");
          console.log(data.data.data);
          console.log("------------");
          const dataServer=data.data.data as IIdioma[];

          let dataSelect: ISelectOptions[]=[];
          for(let object of dataServer)
          {
            dataSelect.push({
              label:object.idioma,
              value:object.ididioma.toString()
            } as ISelectOptions);
          }
          setOptionsSelectIdiomas(dataSelect);
      })
      .catch(err=> {
          console.log(err.response.data.error);
          ToastError(t("notifications.title_error"),t("notifications.messages.error_load_languages"));
      });;    
      console.log("**************************");
    }



    function ObtenerDataUsuario()
    {
      const formData = new FormData();
      formData.append("correouser",correoparam.toString());

      const promiseData=UseFetchPOSTEvent(formData,"persona/getuserbyemail");
      console.log(promiseData);
      promiseData.then(async data=>{
          console.log(data.data.data);
          const dataServer=data.data.data as IPersona;
          console.log("nombres= "+dataServer.pnombres);
          setDataPersona(dataServer);
          setIdDiscapacidadSelect(dataServer.discapacidad.iddiscapacidad.toString());
          setIdIdiomaSelect(dataServer.idioma.ididioma.toString());
          console.log("foto: "+dataServer.prutafoto);
          //if(dataServer.prutafoto!=null || dataServer.prutafoto!=undefined || dataServer.prutafoto!="")
          //{
            const url_image=URL_BACK.replaceAll("api",`fotosperfil/${dataServer.prutafoto}`);
            setUrlFoto(url_image);
          //}
          //else
          //{
          //  console.log("asignando foto por defecto");
          //  const url_image=URL_BACK.replaceAll("api",`fotosperfil/user.png`);
          //  setUrlFoto(url_image);
          //}
          
          setReadScreenCallback(()=>{screen_reading(data_screen_profile_host_user(dataServer.pusername,dataServer.pnombres,dataServer.papellidos,dataServer.ptelefono,dataServer.pcorreo,dataServer.pdescripcion,dataServer.discapacidad.discapacidad,dataServer.idioma.idioma))});
          

          i18n.changeLanguage(dataServer.idioma.prefix);

          
      })
      .catch(err=> {
          console.log(err.response.data.error);
          ToastError(t("notifications.title_error"),t("notifications.messages.error_load_user"));
      });;    
    }

   
    useEffect(() => {
      ObtenerDataDiscapacidades();
      ObtenerDataIdiomas();
      ObtenerDataUsuario();
    }, []);

    
    async function handleAdjuntarFiles(x: GestureResponderEvent)
    {
      let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

      if (!result.canceled) 
      {
          console.log(result);
          console.log(result.assets[0].uri);
          const dataimagebase64=await read_file_base64(result.assets[0].uri,'','');
          console.log("Longitud de mensaje base64= "+dataimagebase64.length);
          console.log("primeros 10 digitos base64= "+dataimagebase64.substring(0,10));
          
          const mimetypevar=result.assets[0].mimeType;
          const extencion_recurso= mimetypevar?.substring(mimetypevar.indexOf("/")+1,mimetypevar.length).trim();
          console.log("la extencion del recurso es: "+extencion_recurso);
          
          ChangePhotoSave(dataimagebase64,extencion_recurso?extencion_recurso:"");

      }
      else
      {
        console.log("Peticion de seleccion de imagenes cancelada");
      }

    }

    function handleSelectDiscapacidad(valuediscapacidad:string)
    {
      setIdDiscapacidadSelect(valuediscapacidad);
      console.log("selecciono la discapacidad= "+valueIdDiscapacidadSelect);
    }

    async function handleSelectIdioma(valueidioma:string)
    {
      setIdIdiomaSelect(valueidioma);

      console.log("selecciono EL IDIOMA= "+valueIddiomaSelect);
    }

    async function handleSendData(dataUser:data_form)
    {
      console.log("******* DATA ********");
      console.log("Usuario= "+dataUser.usuario);
      console.log("Nombres= "+dataUser.nombres);
      console.log("Apellidos= "+dataUser.apellidos);
      console.log("Correo= "+dataUser.correo);
      console.log("Telefono= "+dataUser.telefono);
      console.log("discapacidad= "+valueIdDiscapacidadSelect);
      console.log("idioma= "+valueIddiomaSelect);
      console.log("Descripcion= "+dataUser.descripcion);
      console.log("*****************");

      const formData = new FormData();
      formData.append("pusername",dataUser.usuario);
      formData.append("pnombres",dataUser.nombres);
      formData.append("papellidos",dataUser.apellidos);
      formData.append("ptelefono",dataUser.telefono);
      formData.append("pcorreo",correoparam.toString());
      formData.append("pdescripcion",dataUser.descripcion);
      formData.append("discapacidad",valueIdDiscapacidadSelect);
      formData.append("idioma",valueIddiomaSelect);

      const promiseData=UseFetchPOSTEvent(formData,"persona/update");
      console.log(promiseData);
      promiseData.then(async data=>{
          console.log(data.data.successful);
          const dataperson=data.data.data as IPersona;
        
          let dis_actual=await AsyncStorage.getItem(KEY_DISCAPACIDAD);
          console.log("dis_actual= "+dis_actual);

          
          await AsyncStorage.setItem(KEY_DISCAPACIDAD,dataperson.discapacidad.discapacidad)
          dis_actual=await AsyncStorage.getItem(KEY_DISCAPACIDAD);
          console.log("dis_cambio= "+dis_actual);
          
          await AsyncStorage.setItem(KEY_IDIOMAUSER,dataperson.idioma.prefix)
          i18n.changeLanguage(dataperson.idioma.prefix);


          /*Toast.show({
              type: 'success',
              text1: 'Notificación',
              text2: data.data.successful
          });*/
          ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.update_user_success"));

      })
      .catch(err=> {
          console.log(err.response.data.error);
          /*Toast.show({
              type: 'success',
              text1: 'Error',
              text2: err.response.data.error+' 😭'
          });*/
          ToastError(t("notifications.title_error"),t("notifications.messages.error_update_user"));
      });;

    }


    const RegistroSchema = Yup.object().shape({
        nombres: Yup.string().max(100, t("view_profile.input_name.max",{number:100})).required(t("view_profile.input_name.required")),
        apellidos: Yup.string().max(100, t("view_profile.input_lastname.max",{number:100})).required(t("view_profile.input_lastname.required")),
        usuario: Yup.string().max(50, t("view_profile.input_username.max",{number:50})).required(t("view_profile.input_username.required")),
        telefono: Yup.string().matches(/^\d+$/, t("view_profile.input_phone.matches")).max(10,t("view_profile.input_phone.max",{number:10})).required(t("view_profile.input_phone.required")),
        correo: Yup.string().email(t("view_profile.input_email.email")).max(100,t("view_profile.input_email.max",{number:100})).required(t("view_profile.input_email.required")),
        descripcion: Yup.string().max(200,t("view_profile.input_description.max",{number:200})),
    });


    return (
    
      <>

        <ThemedView style={{justifyContent:"center",alignItems:"center",paddingTop:insets.top,paddingBottom:insets.bottom,backgroundColor:"#FFF",flex:1}}>
          
          <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} style={{width:"100%"}}>
            
            <Image accessibilityLabel={t("view_profile.picture_profile_user.accessibilityLabel")} accessibilityRole="image" source={{ uri: valUrlfoto }} style={styles.fotoUsuario} />
          
            <TouchableOpacity accessible={true} accessibilityLabel={t("view_profile.button_change_photo.accessibilityLabel")} accessibilityRole="button" style={styles.btnFoto} onPress={handleAdjuntarFiles}>
              <Text style={styles.btnTexto}>
                {t("view_profile.button_change_photo.text")}
              </Text>
            </TouchableOpacity>

            <Formik initialValues={{
                    nombres:(valueDataPersona?.pnombres)?valueDataPersona?.pnombres:"",
                    apellidos:valueDataPersona?.papellidos?valueDataPersona?.papellidos:"",
                    usuario:valueDataPersona?.pusername?valueDataPersona?.pusername:"",
                    telefono:valueDataPersona?.ptelefono?valueDataPersona?.ptelefono:"",
                    correo:valueDataPersona?.pcorreo?valueDataPersona?.pcorreo:"",
                    descripcion:valueDataPersona?.pdescripcion?valueDataPersona?.pdescripcion:"",
                }} 
                enableReinitialize={true}
                validationSchema={RegistroSchema}
                onSubmit={handleSendData}
            >

            {({values,errors,touched,handleChange,setFieldTouched,isValid,handleSubmit})=>(

                <>
                    <View style={styles.container_input}>
                        <TextInput onBlur={()=>setFieldTouched("usuario")} onChangeText={handleChange('usuario')} value={values.usuario} style={styles.input} /*placeholderTextColor="#888"*/ placeholderTextColor="#000"placeholder={`${t('view_profile.input_username.placeholder')} ${values.usuario}`} accessibilityLabel={`${t('view_profile.input_username.accessibilityLabel')} ${values.usuario}`} accessibilityRole="text" />
                        
                        {touched.usuario && errors.usuario ? (
                            <Text style={styles.error_message}>{errors.usuario}</Text>
                        ):null}
                    </View>
                    <View style={styles.container_input}>
                        <TextInput onBlur={()=>setFieldTouched("nombres")} onChangeText={handleChange('nombres')} value={values.nombres} style={styles.input} /*placeholderTextColor="#888"*/ placeholderTextColor="#000" placeholder={`${t('view_profile.input_name.placeholder')} ${values.nombres}`} accessibilityLabel={`${t('view_profile.input_name.accessibilityLabel')} ${values.nombres}`} accessibilityRole="text" />
                        {touched.nombres && errors.nombres ? (
                            <Text style={styles.error_message}>{errors.nombres}</Text>
                        ): null}
                    </View>
                    <View style={styles.container_input}>
                        <TextInput onBlur={()=>setFieldTouched("apellidos")} onChangeText={handleChange('apellidos')} value={values.apellidos} style={styles.input} /*placeholderTextColor="#888"*/ placeholderTextColor="#000" placeholder={`${t('view_profile.input_lastname.placeholder')} ${values.apellidos}`} accessibilityLabel={`${t('view_profile.input_lastname.accessibilityLabel')} ${values.apellidos}`} accessibilityRole="text" />
                        {touched.apellidos && errors.apellidos ? (
                            <Text style={styles.error_message}>{errors.apellidos}</Text>
                        ):null}
                    </View>
                    <View style={styles.container_input}>
                        <TextInput onBlur={()=>setFieldTouched("telefono")} onChangeText={handleChange('telefono')} value={values.telefono} style={styles.input} /*placeholderTextColor="#888"*/  placeholderTextColor="#000" placeholder={`${t('view_profile.input_phone.placeholder')} ${values.telefono}`} accessibilityLabel={`${t('view_profile.input_phone.accessibilityLabel')} ${values.telefono}`} accessibilityRole="text" />
                        {touched.telefono && errors.telefono ? (
                            <Text style={styles.error_message}>{errors.telefono}</Text>
                        ):null}
                    </View>
                    <View style={styles.container_input}>
                        <TextInput onBlur={()=>setFieldTouched("correo")} editable={false} onChangeText={handleChange('correo')} value={values.correo} style={[styles.input/*,{color:"#888"}*/]} /*placeholderTextColor="#888"*/ placeholderTextColor="#000" placeholder={`${t("view_profile.input_email.placeholder")} ${values.correo}`} accessibilityLabel={`${t("view_profile.input_email.accessibilityLabel")} ${values.correo}`} accessibilityRole="text" accessibilityState={{ checked: false }} />
                        {touched.correo && errors.correo ? (
                            <Text style={styles.error_message}>{errors.correo}</Text>
                        ):null}
                    </View>
                    <View style={styles.container_input}>
                        <TextInput onBlur={()=>setFieldTouched("descripcion")} onChangeText={handleChange('descripcion')} value={values.descripcion} style={styles.input} /*placeholderTextColor="#888"*/ placeholderTextColor="#000" placeholder={`${t("view_profile.input_description.placeholder")} ${values.descripcion}`} accessibilityLabel={`${t("view_profile.input_description.accessibilityLabel")} ${values.descripcion}`} accessibilityRole="text" />
                        {touched.descripcion && errors.descripcion ? (
                            <Text style={styles.error_message}>{errors.descripcion}</Text>
                        ):null}
                    </View>
                    
                    <View style={styles.container_input}>
                      <View style={styles.container_select}>
                        <ItemSelect labelmain={t("view_profile.select_disabilities.labelmain")} 
                                    opcioninit={valueIdDiscapacidadSelect} 
                                    opciones={valueOptionsSelectDiscapacidades} 
                                    onSelectChange={handleSelectDiscapacidad}
                                    opcionNA={t("view_profile.select_disabilities.opcionNA")} 
                                    accessibilityLabelmain={t("view_profile.select_disabilities.accessibilityLabelmain")}
                                    accessibilityLabelselect={t("view_profile.select_disabilities.accessibilityLabelselect")}
                                    accessibilityLabeloptions={t("view_profile.select_disabilities.accessibilityLabeloptions")}>
                        </ItemSelect>
                      </View>
                    </View>

                    <View style={styles.container_input}>
                      <View style={styles.container_select}>
                        <ItemSelect labelmain={t("view_profile.select_languages.labelmain")} 
                                    opcioninit={valueIddiomaSelect} 
                                    opciones={valueOptionsSelectIdiomas} 
                                    onSelectChange={handleSelectIdioma}
                                    opcionNA={t("view_profile.select_languages.opcionNA")} 
                                    accessibilityLabelmain={t("view_profile.select_languages.accessibilityLabelmain")} 
                                    accessibilityLabelselect={t("view_profile.select_languages.accessibilityLabelselect")} 
                                    accessibilityLabeloptions={t("view_profile.select_languages.accessibilityLabeloptions")} >
                        </ItemSelect>
                      </View>
                    </View>

                    <View style={styles.container_input}>
                        <TouchableOpacity disabled={!isValid} onPress={()=>handleSubmit()} style={[styles.button,{backgroundColor:isValid?MAIN_COLOR:MAIN_COLOR_DESACTIVATE}]} accessible={true} accessibilityLabel={t("view_profile.button_save.accessibilityLabel")} accessibilityRole="text">
                            <Text style={styles.buttonText}>{t("view_profile.button_save.text")}</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}

            </Formik>
          </ScrollView>
          
          <ModelLoadSplashScreen activeModal={showLoadSplashScreen}/>

        </ThemedView>
        <Toast/>
      </>
        
    );

}


