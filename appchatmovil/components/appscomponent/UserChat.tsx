
import Ionicons from '@react-native-vector-icons/ionicons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Image, Modal, Pressable, View,Text, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { URL_BACK } from '../utils/UrlBase';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import { MAIN_COLOR, MAIN_TEXT_COLOR } from '../ConfigApp/Colors';
import { MainMenu } from '../ConfigApp/Config';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { SpeechText } from '../utils/SpeechText';


interface PropsUserChat{
    iduser:number,
    urlimage:string
    name_user:string,
    message_preview:string,
    data_time:string,
    idgrupo?:number
}

export default function UserChat(props:PropsUserChat)
{
    const [valueFocused,setValueFocused]=useState<boolean>(false);


    useFocusEffect(
      useCallback(() => {
        console.log("Hello, I'm focused!");
        setValueFocused(true);
        return () => {
          setValueFocused(false);
          console.log('This route is now unfocused.');
        };
      }, [])
    )



    const styles = useMemo(() =>  StyleSheet.create({
      fondoview:{
        borderRadius: 10,
        margin:3,
        flexDirection: 'row',
        height:80,
        backgroundColor:"#fff"
      },
      color: {
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
        fontSize:MainMenu.item_chat.message_preview_font_size,
        fontWeight:MainMenu.item_chat.message_preview_bold,
        //color: '#9A9D9A'
        color: '#000'
      },
      text_style_data_time:{
        fontSize:MainMenu.item_chat.text_style_data_time_font_size,
        fontWeight:MainMenu.item_chat.text_style_data_time_bold,
        //color: '#9A9D9A',
        color: '#000'
      },
      data_time:{
        justifyContent:'flex-end',
        right:8,
        position: 'absolute'
      },
      data_id_user:{
        justifyContent:'flex-end',
        right:8,
        top:20,
        position: 'absolute'
      },
      data_button:{
        //backgroundColor:"#0f0",
        height:80,
        justifyContent:"center",
        right:60,
        position: 'absolute'
      }
    }), [MAIN_COLOR,valueFocused]);

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
        fontSize:MainMenu.item_chat.button_information_font_size,
        color: MAIN_TEXT_COLOR,
        fontWeight: 'bold',
        textAlign: 'center',
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
    }), [MAIN_COLOR,valueFocused]);


    const { t } = useTranslation();
   
    const [modalVisibleUser, setModalVisibleUser] = useState(false);

    function activeDesactiveModalUser(x: GestureResponderEvent)
    {
      setModalVisibleUser(!modalVisibleUser);
    }

    function ScreenInformationUser(iduser:string)
    {
      setModalVisibleUser(!modalVisibleUser);
      router.push({
          pathname: '/ProfileChatUserPrincipal',
          params:{
              //idgrupohash:idgrupohash,
              //idgrupo:idgrupo,
              //userprimario:userprimario,
              iduser:iduser,
              //idpersonagrupoprimario:idpersonagrupoprimario,
              //idpersonagruposecundario:idpersonagruposecundario
          }
      });
    }


    const [valUrlfoto, setUrlFoto] = useState('user.png');
  
    useEffect(() => {
      let url_imagefinal=props.urlimage==null?"user.png":props.urlimage;
      console.log("la imagen es: "+url_imagefinal);
      const url_image=URL_BACK.replaceAll("api",`fotosperfil/${url_imagefinal}`);
      setUrlFoto(url_image);
    }, []);

    function separate_digits(n:string){
      return n.replace(/(\d)(?=\d)/g, "$1 ");
    }

    
    return(
        <View style={styles.fondoview} accessible={true} accessibilityLabel={t('item_user_chat.container.accessibilityLabel',{name_user:props.name_user})}>
            <TouchableOpacity onPress={activeDesactiveModalUser} style={styles.celda_img} accessible={true} accessibilityLabel={t('item_user_chat.container_photo_user.accessibilityLabel')} accessibilityRole="image">
                <Image source={{ uri: valUrlfoto }}
                        style={styles.logouser}>
                </Image>
                {/*<Image source={require('@/assets/images/jhon.jpg')}
                        style={styles.logouser}>
                </Image>*/}
            </TouchableOpacity>
            <View style={styles.celda_content}>
                <View accessible={true} accessibilityLabel={t('item_user_chat.name_user.accessibilityLabel',{name_user:props.name_user})} accessibilityRole="text">
                    <ThemedText type="title" style={styles.text_style_name_user}>{props.name_user}</ThemedText>
                </View>
                <View accessible={true} accessibilityLabel={t('item_user_chat.message_preview.accessibilityLabel',{type:props.message_preview})} accessibilityRole="text">
                    <ThemedText   type="title" style={styles.text_style_messaje_preview}>{props.message_preview}</ThemedText>
                </View>
            </View>
        

            <View accessible={true}  style={styles.data_time} accessibilityLabel={t('item_user_chat.date_last_message.accessibilityLabel',{date:props.data_time})} accessibilityRole="text">   
                <ThemedText  type="title" style={styles.text_style_data_time}>{props.data_time}</ThemedText>
            </View>

            <View accessible={true}  style={styles.data_id_user} accessibilityLabel={t('item_user_chat.play_read_id_button.Identity',{id:props.idgrupo})} accessibilityRole="text">   
                <ThemedText  type="title" style={styles.text_style_data_time}>ID: {props.idgrupo}</ThemedText>
            </View>

            <View accessible={true}  style={styles.data_button} accessibilityLabel={t('item_user_chat.play_read_id_button.accessibilityLabel',{date:props.data_time})} accessibilityRole="text">   
              <TouchableOpacity onPress={(e)=>{SpeechText(t('item_user_chat.play_read_id_button.SpeechText',{id:separate_digits(props.idgrupo!=undefined?props.idgrupo.toString():"-1")}))}}>
                <MaterialIcons name="play-circle" size={50} color="#000" />
              </TouchableOpacity>
            </View>

            <SafeAreaProvider>
              <SafeAreaView style={stylesModal.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisibleUser}
                  onRequestClose={() => {
                    setModalVisibleUser(!modalVisibleUser);
                  }}>
                  <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                      <Pressable
                        style={[stylesModal.buttonequis]}
                        onPress={activeDesactiveModalUser}>
                          <Ionicons name="close-circle-outline" color={ MAIN_TEXT_COLOR} size={30} />
                      </Pressable>
                      <Image source={{ uri: valUrlfoto }}
                        style={stylesModal.logouser}>
                      </Image>
                      <Text style={stylesModal.modalTextUser}>{props.name_user}</Text>
                      <Pressable accessible={true} accessibilityLabel={t('item_user_chat.button_information.accessibilityLabel')} accessibilityRole="text"
                        style={[stylesModal.button, stylesModal.buttonInformation]}
                        onPress={(e)=>ScreenInformationUser(props.iduser.toString())}>
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

        </View>
    );

}


