import {  StyleSheet, TextInput, TouchableOpacity, View,  Text,Image, ScrollView} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '../ThemedView';
import { Formik, FormikProps, useFormikContext } from 'formik';
import * as Yup from "yup";
import { UseFetchPOSTEvent } from '../utils/useFetch';
import { create_file_tp, create_folder_main, data_user_directory, key_directory, NAME_FILE_KEY, NAME_FILE_USER } from '../utils/ManagedFiles';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_CORREO, KEY_CORREO_DESCRIP, KEY_DISCAPACIDAD, KEY_IDIOMAUSER, KEY_IDUSER, KEY_KEYUSER, KEY_LAST_NAMES, KEY_NAMES, KEY_PASSWORD, KEY_USERNAME } from '../utils/Keys';
import Toast from 'react-native-toast-message';
//import '@/i18n';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../appscomponent/ItemSelectTwo';
import ISelectOptions from '../Interfaces/ISelectOptions';
import i18n from '@/i18n';
import IDataSaveUser from '../Interfaces/IDataSaveUser';
import IDataUserSave from '../Interfaces/IDataUserSave';
import { MAIN_COLOR, MAIN_COLOR_BACKGROUND, MAIN_COLOR_DESACTIVATE, MAIN_TEXT_COLOR } from '../ConfigApp/Colors';
import ModelLoadSplashScreen from '../appscomponent/ModelLoadSplashScreen';
import { ToastError, ToastSuccess } from '../utils/ToastSpeech';
import { initClient, registerOnConnectedMessages, UserData } from '../utils/useStompJS';
import IPersona from '../Interfaces/IPersona';
import IIdioma from '../Interfaces/IIdioma';
import ItemSelect from '../appscomponent/ItemSelect';
import IDiscapacidad from '../Interfaces/IDiscapacidad';

interface data_form {
    username:string,
    names:string,
    lastnames:string,
    phone:string,
    email:string,
    language:string,
    disability:string
}

export default function Register()
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
            height: "auto",
            borderColor: '#9A9D9A',
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 12,
            fontSize: 14,
            //color: '#000',
        },
        container_input:{
            width:"100%",
            margin:2,
            padding:5, 
            //borderWidth:3,
            //borderColor:"#f00"
        },
        container_select:{
            marginLeft:30,
            marginRight:30,
        },
        button: {
            height:"auto",
            marginLeft:30,
            marginRight:30,
            //backgroundColor: '#2196F3',
            paddingVertical: 10,
            //paddingHorizontal: 10,
            borderRadius: 8,
            alignItems: 'center',
        },
        buttonText: {
            color: MAIN_TEXT_COLOR,
            fontSize: 16,
            fontWeight: 'bold',
        },
        error_message:{
            marginLeft:35,
            marginRight:30,
            color:"#EF1430",
            fontWeight: 'bold',
        },
        fotoLogo: {
            width: 100,
            height: 100,
            borderRadius: 60,
            marginTop:30,
            marginBottom: 30
        }
    }), [MAIN_COLOR]);


    const [showLoadSplashScreen, SetShowLoadSplashScreen] = useState(false);

    const { t } = useTranslation();
    const router = useRouter();
    const [currentValue, setCurrentValue] = useState<string>("es");
    const [optionsValuesLanguage, setOptionsValuesLanguage] = useState<ISelectOptions[]>([
        /*{
            label: "English",
            value: "en",
        },
        {
            label: "Spanish",
            value: "es",
        },*/
    ]);

    const LANGUAGES = useRef<string[]>([]);
    const DISABILITY = useRef<string[]>([]);
    const [valueIddiomaSelect,setIdIdiomaSelect]=useState<string>('');
    const [valueOptionsSelectDiscapacidades, setOptionsSelectDiscapacidades] = useState<ISelectOptions[]>([]);
    const [valueIdDiscapacidadSelect,setIdDiscapacidadSelect]=useState<string>('');
    const formikRef = useRef<any>();


    function ObtenerDataIdiomas()
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
            LANGUAGES.current.push(object.prefix.toString());
          }
          setOptionsValuesLanguage(dataSelect);
          console.log("LANGUAGES:");
          console.log(LANGUAGES.current);
      })
      .catch(err=> {
          console.log(err.response.data.error);
          ToastError(t("notifications.title_error"),t("notifications.messages.error_load_languages"));
      });;    
      console.log("**************************");
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
            DISABILITY.current.push(object.iddiscapacidad.toString());
          }
          console.log("Discapacidades");
          console.log(DISABILITY.current);
          setOptionsSelectDiscapacidades(dataSelect);
      })
      .catch(err=> {
        console.log(err.response.data.error);
        ToastError(t("notifications.title_error"),t("notifications.messages.error_load_disabilities"));
      });;    
      console.log("**************************");
    }

    useEffect(() => {
        create_folder_main();
        ObtenerDataIdiomas();
        ObtenerDataDiscapacidades();
        console.log("Archivos creados");
    }, []);

    function SelectLanguage(value:string)
    {
        console.log("cambiando lenguaje= "+value);
        i18n.changeLanguage(value.trim());
    }

    function handleSendData(dataUser:data_form)
    {
        console.log(dataUser);
        SetShowLoadSplashScreen(true);
        
        if(dataUser.username!="" && dataUser.names !="" && dataUser.lastnames!="" &&
            dataUser.phone!="" && dataUser.email!="" && dataUser.language!="" && dataUser.disability!=null
        )
        {
            const formData = new FormData();
            formData.append('pusername',dataUser.username);
            formData.append('pnombres',dataUser.names);
            formData.append('papellidos',dataUser.lastnames);
            formData.append('ptelefono',dataUser.phone);
            formData.append('pcorreo',dataUser.email);
            formData.append('idiomap',dataUser.language);
            formData.append('discapacidad',dataUser.disability);

            
            const promiseData=UseFetchPOSTEvent(formData,"persona/save");
            console.log(promiseData);
            promiseData.then(async data=>{
                console.log(data.data);
                const dataServer=data.data as IDataUserSave;
                console.log(dataServer);

                const datasaveuser={
                    "iduser": dataServer.iduser,
                    "email": dataServer.correo,
                    "password": dataServer.password
                } as IDataSaveUser;

            
                create_file_tp(data_user_directory,NAME_FILE_USER,JSON.stringify(datasaveuser));
                create_file_tp(key_directory,NAME_FILE_KEY,JSON.stringify({"key":dataServer.base64key}));

                await Promise.all([
                    AsyncStorage.setItem(KEY_IDUSER,dataServer.iduser),
                    AsyncStorage.setItem(KEY_CORREO,dataServer.correo),
                    AsyncStorage.setItem(KEY_PASSWORD,dataServer.password),
                    AsyncStorage.setItem(KEY_KEYUSER,dataServer.base64key),
                    AsyncStorage.setItem(KEY_IDIOMAUSER,dataServer.idioma),
                ]);

                const formData = new FormData();
                formData.append('correouser',dataServer.correo);
                const promiseData=await UseFetchPOSTEvent(formData,"persona/getuserbyemail");

                const datauserresp=promiseData.data.data as IPersona;
                
                await Promise.all([
                    AsyncStorage.setItem(KEY_IDIOMAUSER,datauserresp.idioma.prefix),
                    AsyncStorage.setItem(KEY_DISCAPACIDAD,datauserresp.discapacidad.discapacidad),
                    AsyncStorage.setItem(KEY_CORREO_DESCRIP,datauserresp.pcorreo),
                    AsyncStorage.setItem(KEY_NAMES,datauserresp.pnombres),
                    AsyncStorage.setItem(KEY_LAST_NAMES,datauserresp.papellidos),
                    AsyncStorage.setItem(KEY_USERNAME,datauserresp.pusername)
                ]);
                
                registerOnConnectedMessages(()=>{console.log("no tiene referencia registerOnConnectedMessages")}); 

                initClient({iduser:dataServer.iduser,correo:dataServer.correo} as UserData);  
                
                /*Toast.show({
                    type: 'success',
                    text1: 'Notificación',
                    text2: dataServer.successful+' '
                });*/

                SetShowLoadSplashScreen(false);
                router.replace('/main');
                ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.register_user_success"));
                
            })
            .catch(err=> {
                console.log(err.response.data.error);
                /*Toast.show({
                    type: 'success',
                    text1: 'Error',
                    text2: err.response.data.error+' '
                });*/
                ToastError(t("notifications.title_error"),t("notifications.messages.error_register_user_success"));
            });;

        }
    }

    async function handleSelectIdioma(valueidioma:string)
    {
        setIdIdiomaSelect(valueidioma);
        formikRef.current?.setFieldValue("language", valueidioma);
        console.log("selecciono EL IDIOMA= "+valueIddiomaSelect);
    }

    function handleSelectDiscapacidad(valuediscapacidad:string)
    {
        setIdDiscapacidadSelect(valuediscapacidad);
        formikRef.current?.setFieldValue("disability", valuediscapacidad);
        console.log("selecciono la discapacidad= "+valueIdDiscapacidadSelect);
    }

    const RegistroSchema = Yup.object().shape({
        username: Yup.string().max(50, t('register.input_username.max',{number:50})).required(t('register.input_username.required')),
        names: Yup.string().max(100, t('register.input_name.max',{number:100})).required(t('register.input_name.required')),
        lastnames: Yup.string().max(100, t('register.input_lastname.max',{ number: 100 })).required(t('register.input_lastname.required')),
        phone: Yup.string().matches(/^\d+$/, t('register.input_phone.matches')).max(10, t('register.input_phone.max',{number:100})).required(t('register.input_phone.required')),
        email: Yup.string().email(t('register.input_email.email')).max(100,t('register.input_email.max',{number:100})).required(t('register.input_email.required')),
        language: Yup.string().oneOf(LANGUAGES.current, "Idioma inválido").required("Selecciona un idioma"),
        disability: Yup.string().oneOf(DISABILITY.current, "Discapacidad inválida").required("Selecciona una discapacidad"),
    });

    const insets=useSafeAreaInsets();

    return(
        <>
            <ThemedView style={{justifyContent:"center",alignItems:"center",paddingTop:insets.top,paddingBottom:insets.bottom,backgroundColor:MAIN_COLOR_BACKGROUND,flex:1}}>
                
                <LanguageSelector current_value={currentValue} options={optionsValuesLanguage}  onSelectChange={SelectLanguage}></LanguageSelector>
                
                <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} style={{width:"100%"}}>

                    <Image accessibilityLabel={t('register.logo.accessibilityLabel')} source={require('@/assets/images/logoappv2.png')} style={styles.fotoLogo} />
                
                    <Formik innerRef={formikRef} initialValues={{
                            username:"",
                            names:"",
                            lastnames:"",
                            phone:"",
                            email:"",
                            language: "",
                            disability: ""
                        }} 
                        enableReinitialize={true} //hace que Formik recargue los valores cuando cambian
                        validationSchema={RegistroSchema}
                        onSubmit={handleSendData}
                        accessible={true} accessibilityLabel={t('register.form.accessibilityLabel')}
                    >

                    {({values,errors,touched,handleChange,setFieldTouched,isValid,handleSubmit})=>(

                        <>
                            <View style={styles.container_input}>
                                <TextInput onBlur={()=>setFieldTouched("username")}  onChangeText={handleChange('username')} value={values.username} style={styles.input} placeholderTextColor="#000" placeholder={t('register.input_username.placeholder')}  accessibilityLabel={t('register.input_username.accessibilityLabel')} />
                                
                                {touched.username && errors.username ? (
                                    <Text style={styles.error_message}>{errors.username}</Text>
                                ):null}
                            </View>
                            <View style={styles.container_input}>
                                <TextInput onBlur={()=>setFieldTouched("names")} onChangeText={handleChange("names")} value={values.names} style={styles.input} placeholderTextColor="#000" placeholder={t('register.input_name.placeholder')} accessibilityLabel={t('register.input_name.accessibilityLabel')} />
                                {touched.names && errors.names ? (
                                    <Text style={styles.error_message}>{errors.names}</Text>
                                ): null}
                            </View>
                            <View style={styles.container_input}>
                                <TextInput onBlur={()=>setFieldTouched("lastnames")} onChangeText={handleChange('lastnames')} value={values.lastnames} style={styles.input} placeholderTextColor="#000" placeholder={t('register.input_lastname.placeholder')} accessibilityLabel={t('register.input_lastname.accessibilityLabel')} />
                                {touched.lastnames && errors.lastnames ? (
                                    <Text style={styles.error_message}>{errors.lastnames}</Text>
                                ):null}
                            </View>
                            <View style={styles.container_input}>
                                <TextInput onBlur={()=>setFieldTouched("phone")} onChangeText={handleChange('phone')} value={values.phone} style={styles.input} placeholderTextColor="#000" placeholder={t('register.input_phone.placeholder')} accessibilityLabel={t('register.input_phone.accessibilityLabel')} />
                                {touched.phone && errors.phone ? (
                                    <Text style={styles.error_message}>{errors.phone}</Text>
                                ):null}
                            </View>
                            <View style={styles.container_input}>
                                <TextInput onBlur={()=>setFieldTouched("email")} onChangeText={handleChange('email')} value={values.email} style={styles.input} placeholderTextColor="#000" accessibilityLabel={t('register.input_email.accessibilityLabel')} placeholder={t('register.input_email.placeholder')} />
                                {touched.email && errors.email ? (
                                    <Text style={styles.error_message}>{errors.email}</Text>
                                ):null}
                            </View>
                            <View style={styles.container_input}>
                                <View style={styles.container_select}>
                                    <ItemSelect labelmain={/*t("view_profile.select_languages.labelmain")*/""} 
                                        opcioninit={valueIddiomaSelect} 
                                        opciones={optionsValuesLanguage} 
                                        onSelectChange={handleSelectIdioma}
                                        opcionNA={"Seleccione idioma...."} 
                                        accessibilityLabelmain={t("view_profile.select_languages.accessibilityLabelmain")} 
                                        accessibilityLabelselect={t("view_profile.select_languages.accessibilityLabelselect")} 
                                        accessibilityLabeloptions={t("view_profile.select_languages.accessibilityLabeloptions")} >
                                    </ItemSelect>
                                </View>
                                {touched.language && errors.language ? (
                                    <Text style={styles.error_message}>{errors.language}</Text>
                                ):null}
                            </View>
                            <View style={styles.container_input}>
                                <View style={styles.container_select}>
                                    <ItemSelect labelmain={""} 
                                        opcioninit={valueIdDiscapacidadSelect} 
                                        opciones={valueOptionsSelectDiscapacidades} 
                                        onSelectChange={handleSelectDiscapacidad}
                                        opcionNA={"Seleccione discapacidad...."} 
                                        accessibilityLabelmain={t("view_profile.select_disabilities.accessibilityLabelmain")}
                                        accessibilityLabelselect={t("view_profile.select_disabilities.accessibilityLabelselect")}
                                        accessibilityLabeloptions={t("view_profile.select_disabilities.accessibilityLabeloptions")}>
                                    </ItemSelect>
                                </View>
                                {touched.disability && errors.disability ? (
                                    <Text style={styles.error_message}>{errors.disability}</Text>
                                ):null}
                            </View>
                            <View style={styles.container_input}>
                                <TouchableOpacity disabled={!isValid} onPress={()=>handleSubmit()} style={[styles.button,{backgroundColor:isValid?MAIN_COLOR:MAIN_COLOR_DESACTIVATE}]} accessibilityLabel={t('register.button_register.accessibilityLabel')} accessibilityRole="button">
                                    <Text style={styles.buttonText}>{t('register.button_register.text')}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                    </Formik>
                </ScrollView>

                <ModelLoadSplashScreen activeModal={showLoadSplashScreen}/>
                <Toast/>
                
            </ThemedView>
        </>
    );
}