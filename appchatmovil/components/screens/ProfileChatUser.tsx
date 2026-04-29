import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';
import { URL_BACK } from '../utils/UrlBase';
import { UseFetchPOSTEvent } from '../utils/useFetch';
import IPersona from '../Interfaces/IPersona';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import ModelLoadSplashScreen from '../appscomponent/ModelLoadSplashScreen';
import { ToastError, ToastSuccess } from '../utils/ToastSpeech';
import { MAIN_COLOR } from '../ConfigApp/Colors';
import { ProfileUserConfig } from '../ConfigApp/Config';
import { setReadScreenCallback } from '../utils/VoiceCommands';
import { data_screen_profile_friend_user, screen_reading } from '../utils/screen_reading';

export default function ProfileChatUser()
{
    const styles = useMemo(() => StyleSheet.create({
      container: { 
        alignItems: 'center', 
        padding: 20,
        backgroundColor:"#fff",
        height:"100%" 
      },
      header: { 
        alignItems: 'center', 
        marginBottom: 20 
      },
      avatar: { 
        marginTop:50,
        width: 120, 
        height: 120, 
        borderRadius: 60, 
        marginBottom: 10 
      },
      name: { 
        fontSize: ProfileUserConfig.names_font_size, 
        fontWeight: ProfileUserConfig.names_bold 
      },
      username: { 
        fontSize: ProfileUserConfig.username_font_size, 
        color: '#888',
        marginBottom: 15,
        fontWeight: ProfileUserConfig.username_bold
      },
      contactSection: { 
        width: '100%', 
        paddingVertical: 10, 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: '#eee' 
      },
      contactItem: { 
        fontSize: ProfileUserConfig.contact_font_size, 
        paddingVertical: 5,
        fontWeight:ProfileUserConfig.contact_bold
      },
      section: { 
        width: '100%', 
        marginVertical: 15 
      },
      sectionTitle: { 
        fontSize: ProfileUserConfig.title_description_font_size, 
        fontWeight: 'bold', 
        marginBottom: 8 
      },
      description: { 
        fontSize: ProfileUserConfig.description_font_size, 
        fontWeight: ProfileUserConfig.description_bold, 
        color: '#555' 
      },
      editButton: { 
        marginTop: 20, 
        backgroundColor: '#007AFF', 
        paddingVertical: 12, 
        paddingHorizontal: 50, 
        borderRadius: 25 
      },
      editText: { 
        color: '#fff', 
        fontSize: 16 
      }

    }), [MAIN_COLOR]);


    const [showLoadSplashScreen, SetShowLoadSplashScreen] = useState(true);
  
    const { t } = useTranslation();
  
    const [valUrlfoto, setUrlFoto] = useState('user.png');
    const [valDataUser, setDataUser] = useState<IPersona>();

    //const {idgrupohash,idgrupo,userprimario, usersecundario, idpersonagrupoprimario, idpersonagruposecundario } = useLocalSearchParams();    
    const {iduser } = useLocalSearchParams();    

    function ObtenerDataUsuario()
    {
        const formData = new FormData();
        formData.append("iduser",iduser.toString());
        formData.append("cifrado","false");

        const promiseData=UseFetchPOSTEvent(formData,"persona/getuserbyid");
        console.log(promiseData);
        promiseData.then(async data=>{
            console.log(data.data.data);

            const dataServer=data.data.data as IPersona;
            console.log("nombres= "+dataServer.pnombres);
            setDataUser(dataServer);
            if(dataServer.prutafoto!=null)
            {
                const url_image=URL_BACK.replaceAll("api",`fotosperfil/${dataServer.prutafoto}`);
                setUrlFoto(url_image);
            }
            else{
              const url_image=URL_BACK.replaceAll("api",`fotosperfil/user.png`);
              console.log(url_image);
              setUrlFoto(url_image);
            }
            SetShowLoadSplashScreen(false);
            setReadScreenCallback(()=>{screen_reading(data_screen_profile_friend_user(dataServer.pnombres,dataServer.papellidos,dataServer.pusername,dataServer.discapacidad.discapacidad,dataServer.ptelefono,dataServer.pcorreo,dataServer.pdescripcion))});
            
            ToastSuccess(t("notifications.title_notifications"),t("notifications.messages.load_data_profile_user"));
        })
        .catch(err=> {
            console.log(err.response.data.error);
            /*Toast.show({
                type: 'success',
                text1: 'Error',
                text2: err.response.data.error+' 😭'
            });*/
            ToastError(t("notifications.title_error"),t("notifications.messages.error_load_data_profile_user"));
        });;    
    }

    useEffect(() => {
      ObtenerDataUsuario();
    }, []);


    const profileData = {
        nombres: "Juan Carlos",
        apellidos: "Pérez Gómez",
        usuario: "juancperez",
        telefono: "+593 98 765 4321",
        correo: "juan.perez@example.com",
        descripcion: "Apasionado desarrollador móvil con experiencia en React Native y UX/UI. Amante del café y la tecnología.",
        discapacidad: "No" 
    };

    const { discapacidad,nombres, apellidos, usuario, telefono, correo, descripcion } = profileData;

    return(
        <ScrollView contentContainerStyle={styles.container} >
            <View style={styles.header} accessible={true}>
                <Image style={styles.avatar} source={{ uri: valUrlfoto }} accessibilityLabel={t("view_profilechatuser.logo.accessibilityLabel")} accessibilityRole="image" />
                <Text style={styles.name} accessible={true} accessibilityLabel={`${t("view_profilechatuser.name_and_lastname.accessibilityLabel")} ${valDataUser?.pnombres}`} accessibilityRole="text">
                  {valDataUser?.pnombres} {valDataUser?.papellidos}
                </Text>
                <Text style={styles.username} accessible={true} accessibilityLabel={`${t("view_profilechatuser.username.accessibilityLabel")} ${valDataUser?.pusername}`} accessibilityRole="text">
                  @{valDataUser?.pusername}
                </Text>
                <Text style={styles.contactItem} accessible={true} accessibilityLabel={`${t("view_profilechatuser.disability.accessibilityLabel")} ${valDataUser?.discapacidad.discapacidad}`} accessibilityRole="text">
                  ♿ {t("view_profilechatuser.disability.text")}: {valDataUser?.discapacidad.discapacidad}
                </Text>
            </View>

            <View style={styles.contactSection}>
                <Text style={styles.contactItem} accessible={true} accessibilityLabel={`${t("view_profilechatuser.phone.accessibilityLabel")} ${valDataUser?.ptelefono}`} accessibilityRole="text">
                  📱 {valDataUser?.ptelefono}
                </Text>
                <Text style={styles.contactItem} accessible={true} accessibilityLabel={`${t("view_profilechatuser.email.accessibilityLabel")} ${valDataUser?.pcorreo}`} accessibilityRole="text">
                  ✉️ {valDataUser?.pcorreo}
                </Text>
            </View>

            <View style={styles.section} accessibilityLabel={t("view_profilechatuser.description.accessibilityLabel")} accessibilityRole="text">
                <Text style={styles.sectionTitle} accessibilityLabel={t("view_profilechatuser.description.title_description.accessibilityLabel")} accessibilityRole="text">
                  {t("view_profilechatuser.description.title_description.text")}
                </Text>
                <Text style={styles.description} accessibilityLabel={`${t("view_profilechatuser.description.descriptionuser")} ${valDataUser?.pdescripcion}`} accessibilityRole="text">
                  {valDataUser?.pdescripcion}
                </Text>
            </View>
            
            <ModelLoadSplashScreen activeModal={showLoadSplashScreen}/>
            <Toast/>
        </ScrollView>
    )
}
