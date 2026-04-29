

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Ionicons from '@react-native-vector-icons/ionicons';
import { GestureResponderEvent, Image, Modal, Pressable, SafeAreaView, TouchableOpacity, View ,Text} from 'react-native';
import { StyleSheet } from 'react-native';
import { UseFetchPOSTEvent, UseFetchPOSTEventFormatJson } from '../utils/useFetch';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { URL_BACK } from '../utils/UrlBase';
import { MAIN_COLOR, MAIN_COLOR_DESACTIVATE, MAIN_TEXT_COLOR } from '../ConfigApp/Colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import { ToastError } from '../utils/ToastSpeech';
import { MainMenu } from '../ConfigApp/Config';

interface PropsUserChat{
    activo:boolean,
    correo:string,
    name_user:string,
    tipogrupo:string,
    nombre?:string,
    apellidos?:string,
    fotoruta:string,
    iddiscapacidad?:number,
    discapacidaddescripcion?:string,
    iduserprincipal:string,
    iduseramigo:number,
}

export interface DataChatCreado {
    salirgrupo:               boolean;
    gdescripcion:             string;
    usersecundario:           number;
    prutafoto:                null;
    userprimario:             number;
    papellidos:               string;
    idpersonagruposecundario: number;
    pnombres:                 string;
    nombregrupo:              string;
    idpersonagrupoprimario:   number;
    tipogrupo:                string;
    idtipogrupo:              number;
    grutafoto:                string;
    pusername:                string;
    gfecha_creacion:          Date;
    idgrupo:                  number;
    idgrupohash: string;
}


export default function UserChatSearch(props:PropsUserChat)
{

    const styles = useMemo(() => StyleSheet.create({
        fondoview:{
          borderRadius: 10,
          margin:3,
          flexDirection: 'row',
          height:80,
          backgroundColor:"#fff"
        }
        ,color: {
          marginTop: 0,
          color: 'red',
        },
      
        logouser:{
          width: '100%',
          height: '100%',
          borderRadius: 100,
          objectFit: 'cover',
        },
        celda_img: {
          /*backgroundColor:"#080",*/

          margin:10,
          width: '15%',
          justifyContent: 'center',
        },
        celda_content:{
          width: '85%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: "column",
        },
        text_style_name_user:{
          color:"#000",
          fontSize:MainMenu.item_chat.text_name_user_font_size,
          fontWeight:MainMenu.item_chat.text_name_user_bold
        },
        text_style_messaje_preview:{
          fontSize:10,
          color: '#9A9D9A'
        },
        continer_button:{
          justifyContent:'center',
          alignContent:"center",
          height:"100%",
          right:8,
          position: 'absolute'
        },
        boton: {
          backgroundColor: MAIN_COLOR,
          paddingVertical: 10,
          paddingHorizontal: 25,
          borderRadius: 10,
        },
        botonDesactivado: {
            backgroundColor: MAIN_COLOR_DESACTIVATE,
        },
    }), [MAIN_COLOR]);

    const stylesModal = useMemo(() => StyleSheet.create({
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
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
      buttonInformation: {
        backgroundColor: MAIN_COLOR,
      },
      textStyle: {
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:MainMenu.item_chat.button_information_font_size
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
      logouser:{
          //borderWidth:.5,
          //borderColor:"#f00",
          width: 200,
          height: 200,
          borderRadius: 10,
          objectFit: 'cover',
      },
      buttonequis: {
        alignSelf:"flex-end",
        marginBottom:20,
        backgroundColor: MAIN_COLOR,
        borderRadius: 20,
        padding: 5,
        elevation: 2,
      },
      modalTextUser: {
        marginTop:5,
        fontWeight:"bold",
        fontSize:MainMenu.item_chat.modal_name_user_font_size,
        marginBottom: 15,
        textAlign: 'center',
      }
    }), [MAIN_COLOR]);

    const { t } = useTranslation();
  
    const router = useRouter();
    const [valUrlfoto, setUrlFoto] = useState('user.png');
    
    useEffect(() => {
      loadPhoto();
    }, []);

     const handlePress = async () => {

        const formData = new FormData();
        formData.append('tipogrupo',props.tipogrupo.trim());
        formData.append('nombregrupo',"");
        formData.append('gdescripcion',"");
        formData.append('base64foto',"");
        formData.append('correouserprincipal',props.correo);
        formData.append('iduserprincipal',props.iduserprincipal.trim()); //se envia separado porque esta encriptado
        formData.append('iduseramigo',props.iduseramigo.toString());


        const promiseData=UseFetchPOSTEventFormatJson(formData,"wsocket/creategrupo");
        console.log(promiseData);
        promiseData.then(data=>{
          console.log(data.data.data);

          const dataChat=data.data.data as DataChatCreado[];
          const datafin=dataChat[0]
          console.log(dataChat);

          router.push({
            pathname: '/chatUserMessages',
            params:{
              nameitem:datafin.tipogrupo=='2p2'?datafin.pusername:datafin.nombregrupo,
              rutafoto:datafin.tipogrupo=='2p2'?datafin.prutafoto:datafin.grutafoto,
              idgrupohash:datafin.idgrupohash,
              idgrupo:datafin.idgrupo,
              userprimario:datafin.userprimario,
              usersecundario:datafin.usersecundario,
              idpersonagrupoprimario:datafin.idpersonagrupoprimario,
              idpersonagruposecundario:datafin.idpersonagruposecundario
            }
          });
        })
        .catch(err=> {
            console.log(err.response.data.error);
            ToastError(t("notifications.title_error"),t("notifications.messages.error_create_group"))
        });;
    };

    const [modalVisibleUser, setModalVisibleUser] = useState(false);

    function activeDesactiveModalUser(x: GestureResponderEvent)
    {
      setModalVisibleUser(!modalVisibleUser);
    }

    function loadPhoto() 
    {
      const url_image=URL_BACK.replaceAll("api",`fotosperfil/${props.fotoruta}`);
      setUrlFoto(url_image);
    }

    function ScreenInformationUser(iduser:string)
    {
      setModalVisibleUser(!modalVisibleUser);
      router.push({
          pathname: '/ProfileChatUserPrincipal',
          params:{
              iduser:iduser,
          }
      });
    }



    return(
      <>  
        <View style={styles.fondoview} accessibilityLabel={t('item_user_chat.container.accessibilityLabel',{name_user:props.name_user})}>
            <View style={styles.celda_img} /*accessible={true} accessibilityLabel="foto de perfil de usuario" accessibilityRole="image"*/>
                <TouchableOpacity onPress={activeDesactiveModalUser}  accessible={true} accessibilityLabel={t('item_user_chat.container_photo_user.accessibilityLabel')} accessibilityRole="image">
                  <Image source={{uri:valUrlfoto}}
                          style={styles.logouser}>
                  </Image>
                   {/*<Image source={require('@/assets/images/jhon.jpg')}
                        style={styles.logouser}>
                    </Image>*/}
                </TouchableOpacity>
            </View>
            <View style={styles.celda_content}>   

                <View>
                    <ThemedText type="title" accessibilityLabel={t('item_user_chat.name_user.accessibilityLabel',{name_user:props.name_user})} accessibilityRole="text" style={styles.text_style_name_user}>{props.name_user}</ThemedText>
                </View>
                {/*<View>
                    <ThemedText type="title" style={styles.text_style_messaje_preview}>{props.message_preview}</ThemedText>
                </View>*/}
            </View>
            <View style={styles.continer_button}>   
                <TouchableOpacity accessible={true} accessibilityState={{ checked: props.activo }} accessibilityLabel={t('item_user_chat.button_chat_user.accessibilityLabel',{name_user:props.name_user})} accessibilityRole="button" style={[styles.boton, props.activo && styles.botonDesactivado]} onPress={handlePress} disabled={props.activo}>
                    <Ionicons name="chatbox-ellipses-outline" color={ props.activo?"#9A9D9A":"#fff"} size={20} />
                </TouchableOpacity>
            </View>
        </View>
        
        <SafeAreaProvider>
          <SafeAreaView style={stylesModal.centeredView}>
            <Modal animationType="slide" transparent={true} visible={modalVisibleUser}  onRequestClose={() => {
                setModalVisibleUser(!modalVisibleUser);
              }}>
              <View style={stylesModal.centeredView}>
                <View style={stylesModal.modalView}>
                  <Pressable
                    style={[stylesModal.buttonequis]}
                    onPress={activeDesactiveModalUser}>
                      <Ionicons name="close-circle-outline" color={ MAIN_TEXT_COLOR } size={30} />
                  </Pressable>
                  <Image source={{ uri: valUrlfoto }}
                    style={stylesModal.logouser}>
                  </Image>
                  <Text style={stylesModal.modalTextUser}>{props.name_user}</Text>
                  <Pressable
                    style={[stylesModal.button, stylesModal.buttonInformation]}
                    onPress={(e)=>ScreenInformationUser(props.iduseramigo.toString())}>
                    <Text style={stylesModal.textStyle}>{t('item_user_chat.button_information.text')}</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            {/*<Pressable
              style={[stylesModal.button, stylesModal.buttonOpen]}
              onPress={activeDesactiveModalUser}>
              <Text style={stylesModal.textStyle}>Show Modal</Text>
            </Pressable>*/}
          </SafeAreaView>
        </SafeAreaProvider>

      </>
      
    );
}
