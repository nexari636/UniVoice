
import Main from '@/components/Main/Main';
import Register from '@/components/screens/Register';
import { useRouter } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { check_route,configapp_directory,create_file_tp,data_user_directory, delete_file, key_directory, main_directory, NAME_FILE_CONFIG_APP, NAME_FILE_KEY, NAME_FILE_USER, read_file_text } from '../components/utils/ManagedFiles';
import { useEffect, useRef, useState } from 'react';
import { initClient, registerOnConnected, registerOnConnectedLoadChats, registerOnConnectedMessages, UserData } from '@/components/utils/useStompJS';
import { KEY_CORREO, KEY_CORREO_DESCRIP, KEY_DISCAPACIDAD, KEY_IDIOMAUSER, KEY_IDUSER, KEY_KEYUSER, KEY_LAST_NAMES, KEY_NAMES, KEY_PASSWORD, KEY_USERNAME } from '@/components/utils/Keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UseFetchPOSTEvent } from '@/components/utils/useFetch';
import IPersona from '@/components/Interfaces/IPersona';
import { generate_uuidv4 } from '@/components/utils/GRamdom';
import IDataSaveUser from '@/components/Interfaces/IDataSaveUser';
import { DEBUG_ENCRYPTION } from '@/components/utils/encripDescrip';
import {NativeModules} from 'react-native';
import IFormatConfigApp from '@/components/Interfaces/IFormatConfigApp';
import { changeVariablesConfig } from '@/components/ConfigApp/Config';
import { changeVariablesColors } from '@/components/ConfigApp/Colors';
import FloatingButton from '@/components/utils/FloatingButton';
import { initClientCommandsVoice } from '@/components/utils/VoiceCommands';



export default function Index() 
{

  const router = useRouter();
  //const valueInfo = useRef<boolean>(false);
  const [valueInfo,SetValueInfo] = useState<boolean>(false);

  async function check()
  {
    if(!DEBUG_ENCRYPTION)
    {
      const { EncryptionAndDecryptionModule } = NativeModules;
      //este es un ejemplo de como funciona el modulo nativo de cifrado y descifrado mediante AES
      try {
        const dataencriptnativemodule = await EncryptionAndDecryptionModule.EncriptarInformacion("riEaa2Ba2km0bHw6pSrteb5vz5iTl0cnGG/7iEt0ziQ=","hola mundo soy jhon leturné")
        console.log("cifrado");
        console.log("data del modulo nativo creado: ");
        console.log(dataencriptnativemodule);
        console.log("descifrado");
        const datadesencriptnativemodule = await EncryptionAndDecryptionModule.DesencriptarInformacion("riEaa2Ba2km0bHw6pSrteb5vz5iTl0cnGG/7iEt0ziQ=",dataencriptnativemodule.mensaje,dataencriptnativemodule.iv)
        console.log("mensaje descifrado: "+datadesencriptnativemodule);
        console.log(datadesencriptnativemodule);

      } catch (e) {
        console.log("Error al probar modulo nativo:"+ e);
      }
    }

    const data_exists_file=await check_route(data_user_directory+NAME_FILE_USER);
    if(data_exists_file){

      initClientCommandsVoice();

      //valueInfo.current=true;
      SetValueInfo(true);
      const datauser=await read_file_text(data_user_directory,NAME_FILE_USER);
      const jsondatauser=JSON.parse(datauser) as IDataSaveUser;
      
      const datakeyuser=await read_file_text(key_directory,NAME_FILE_KEY);
      const jsondatakeyuser=JSON.parse(datakeyuser);
      console.log("la llave privada del usuario en base64 es: "+jsondatakeyuser.key);
      try {
        //guarda informacion del usuario
        await Promise.all([
          AsyncStorage.setItem(KEY_IDUSER,jsondatauser.iduser),
          AsyncStorage.setItem(KEY_CORREO,jsondatauser.email),
          AsyncStorage.setItem(KEY_PASSWORD,jsondatauser.password),
          AsyncStorage.setItem(KEY_KEYUSER,jsondatakeyuser.key),
        ]);
        //await AsyncStorage.setItem(KEY_IDIOMAUSER,"es")
      } catch (e) {
        console.log("Error al guardar datos del usuario");
      }

      console.log("Files= "+datauser);
      console.log("Email= "+ jsondatauser.email);
      registerOnConnectedMessages(()=>{console.log("no tiene referencia registerOnConnectedMessages")}); 
      
      initClient({iduser:jsondatauser.iduser,correo:jsondatauser.email} as UserData);  

      const formData = new FormData();
      formData.append('correouser',jsondatauser.email);

      const promiseData=UseFetchPOSTEvent(formData,"persona/getuserbyemail");
      //console.log(promiseData);
      const datauserperson=await promiseData;
      console.log("data person");
      console.log(datauserperson.data.data);
      const datauserresp=datauserperson.data.data as IPersona;

      await Promise.all([
        AsyncStorage.setItem(KEY_IDIOMAUSER,datauserresp.idioma.prefix),
        AsyncStorage.setItem(KEY_DISCAPACIDAD,datauserresp.discapacidad.discapacidad),
        AsyncStorage.setItem(KEY_CORREO_DESCRIP,datauserresp.pcorreo),
        AsyncStorage.setItem(KEY_NAMES,datauserresp.pnombres),
        AsyncStorage.setItem(KEY_LAST_NAMES,datauserresp.papellidos),
        AsyncStorage.setItem(KEY_USERNAME,datauserresp.pusername)
      ]);
  
      console.log("El correo es: "+datauserresp.pcorreo);
      console.log("Los nombres son: "+datauserresp.pnombres);
      console.log("Los apellidos son: "+datauserresp.papellidos);
      console.log("El username es: "+datauserresp.pusername);
      console.log("la discapacidad es: "+datauserresp.discapacidad.discapacidad.toString());
      console.log("el idioma es: "+datauserresp.idioma.idioma);

      /*AÑADIR CONFIGURACIONES DE LA APP EXISTENTES*/

      const data_exists_file=await check_route(configapp_directory+NAME_FILE_CONFIG_APP);
      if(data_exists_file)
      {
        console.log("personalizando app :V");
        const dataConfigApp=await read_file_text(configapp_directory,NAME_FILE_CONFIG_APP);
        const jsonConfigApp=JSON.parse(dataConfigApp) as IFormatConfigApp;
        changeVariablesConfig(jsonConfigApp.voice_notifications,jsonConfigApp.font.font_size,jsonConfigApp.font.bold);
        changeVariablesColors(jsonConfigApp.color_app.main_color,jsonConfigApp.color_app.main_color_desactivate,jsonConfigApp.color_app.main_color_background,jsonConfigApp.color_app.main_text_color);
      }
      else{
        console.log("no existe personalizacion");
      }
    }
  }


  useEffect(() => {
      if(false){
        delete_file(main_directory,"","");
      }
      else{
        check();
      }
      console.log("uuid= "+generate_uuidv4());
  }, []);
  
  
  return(
    <SafeAreaProvider>
      {/*<Main/>*/}
      {
       valueInfo?<Main/>:<Register/>/*<Register/>*/
      }
      <Toast />
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
 container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
 }
})
