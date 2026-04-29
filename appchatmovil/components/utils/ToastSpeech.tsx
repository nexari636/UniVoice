import Toast from "react-native-toast-message";
import { SpeechText } from "./SpeechText";
import { VOICE_NOTIFICATIONS } from "../ConfigApp/Config";


export function ToastSuccess(tittle:string,message:string){
    fun_Toast("success",tittle,message);
}

export function ToastInfo(tittle:string,message:string){
    fun_Toast("info",tittle,message);
}

export function ToastError(tittle:string,message:string){
    fun_Toast("error",tittle,message);
}


function fun_Toast(type:string,tittle:string,message:string){
    Toast.show({
        type: type,
        text1: tittle,
        text2: message
    });
    if(VOICE_NOTIFICATIONS)
        SpeechText(message);
}
