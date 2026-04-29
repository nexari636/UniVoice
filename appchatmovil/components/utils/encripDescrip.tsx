import { getRamdom } from "./GRamdom";
import CryptoJS from "crypto-js";
import {NativeModules} from 'react-native';

export const PARAM_ENCRIPTADO="1";
export const PARAM_DESENCRIPTADO="0";
export const DEBUG_ENCRYPTION=true; //si es true es porque es debug y utilizara el cifrado de java script caso contrario es decir cuando sea false utilizara el cifrado de los modulos nativos de kotlin/java
/*LIBRERIA ACTUAL*/


/*LIBRERIA ANTIGUA*/

export async function Encriptar(data:string,llave_base64:string)
{

    if(!DEBUG_ENCRYPTION)
    {
        try
        {
            const { EncryptionAndDecryptionModule } = NativeModules;
            const dataEncrip= await EncryptionAndDecryptionModule.EncriptarInformacion(llave_base64,data);
            return [dataEncrip.mensaje,dataEncrip.iv]
        }
        catch (e) {
          console.log("Error al probar modulo nativo:"+ e);
        }
        console.log("como ocurrio un error en el modulo nativo se usara el cifrado js");
    }
    console.log("modo debug el cifrado se realizara mediante js");
    //Decodifica una clave Base64 a formato binario usable por AES
    //se realiza esto para que la libreria pueda procesarlos
    const init_vector_inicializacion=create_iv()[1].toString();
    const key = CryptoJS.enc.Base64.parse(llave_base64);
    const vector_inicializacion=CryptoJS.enc.Base64.parse(init_vector_inicializacion)

    const ciphertext = CryptoJS.AES.encrypt(data, key,{
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
        iv:vector_inicializacion //vector de inicializacion
    }).toString();
    //posicion 0 data, posicion 1 vector de inicializacion
    return [ciphertext,init_vector_inicializacion];
}

export async function Desencriptar(data:string,iv:string,llave_base64:string)
{

    if(!DEBUG_ENCRYPTION)
    {
        try
        {
            const { EncryptionAndDecryptionModule } = NativeModules;
            const dataDencrip= await EncryptionAndDecryptionModule.DesencriptarInformacion(llave_base64,data,iv);
            return dataDencrip;
        }
        catch (e) {
          console.log("Error al probar modulo nativo:"+ e);
        }
        console.log("como ocurrio un error en el modulo nativo se usara el descifrado js");
    }
    console.log("modo debug el descifrado se realizara mediante js");

    const key = CryptoJS.enc.Base64.parse(llave_base64);
    const vector_inicializacion=CryptoJS.enc.Base64.parse(iv)

    const bytes  = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
        iv:vector_inicializacion
    });
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
}

function create_iv()
{
    const byteArray = new Uint8Array(16);
    let binary="";

    for(let x=0;x<16;x++)
    {
        //se agrega 256 porque el ultimo es excluyente es decir solo hasta 255
        byteArray[x]=getRamdom(0,256); 
        binary+=String.fromCharCode(byteArray[x]); //cada byte a texto 
    }
    
    return [byteArray,window.btoa(binary)];
}


export function StringToHash256(text:string)
{
    var hash = CryptoJS.SHA256(text);
    return hash.toString();
}



