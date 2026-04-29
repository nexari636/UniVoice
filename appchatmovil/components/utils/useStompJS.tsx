import { Client, IFrame, StompSubscription } from "@stomp/stompjs";
import { URL_SOCKET } from "./UrlBase";
import { useRef } from "react";
import Toast from "react-native-toast-message";
import { ToastError, ToastInfo, ToastSuccess } from "./ToastSpeech";

const urlws=URL_SOCKET;
export const urlPrivateMessages="/queue/chat";
export const urlMessagesChatAll="/queue/chatall";
export const urlMessagesNewGroup="/queue/newgroup";
export const urlMessagePrivate="/app/privatemessage";
const urlUser="/app/usuario";
//export const DESTINATION_PREFIX="/user";
export const DESTINATION_PREFIX="/user";
export var client:Client;
export var activate:boolean=false;
export var frameCallbackMessages:() => void;
export var frameCallbackLoadChats:() => void;
export var suscritoclientmessage: StompSubscription;
export var frameCallback:()=>void;
import '@/i18n';
import i18n from '@/i18n';
import { useTranslation } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEY_CORREO } from "./Keys";
import { StringToHash256 } from "./encripDescrip";


export interface UserData
{
    iduser:string,
    correo:string,
}

export function registerOnConnectedMessages(fn:() => void) {
    frameCallbackMessages = fn;
}

export function registerOnConnectedLoadChats(fn:() => void) {
    frameCallbackLoadChats = fn;
}


export function registerOnConnected(fn:() => void) {
  frameCallback = fn;
}

export async function initClient(userdata:UserData)
{
    console.log("primero me ejecuto***************************");
    console.log("ID USER= "+userdata.iduser);
    console.log("CORREO= "+userdata.correo);
    const iduserHash256=StringToHash256(userdata.iduser);

    client=new Client({
        brokerURL: urlws,
        reconnectDelay: 5000, //si el websocket se cae cada 5 segundos se realizara la reconexion
        //heartbeatIncoming: 4000, //verifica si el servidor sigue vivo
        //heartbeatOutgoing: 4000, //envia un heartbeat al servidor para que sepa que el cliente sigue conectado
        forceBinaryWSFrames: true, //Fuerza a que el cliente STOMP envíe todos los frames STOMP como binarios (Blob o ArrayBuffer), en lugar de texto plano.
        appendMissingNULLonIncoming: true, //Le dice al cliente STOMP que agregue automáticamente el carácter de terminación \x00 (NULL) a los mensajes STOMP si no lo tienen. ejemplo: Hola mundo\x00
    });

    client.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
        ToastError(i18n.t("notifications.title_error"),i18n.t("notifications.messages.web_socket_error"));
    }

    client.onWebSocketError = (error) => {
        console.log('Error con websocket', error);
        ToastError(i18n.t("notifications.title_error"),i18n.t("notifications.messages.web_socket_error_reconexion"));
    };

    client.debug = function(str) {
        console.log(str);
    };


    console.log(client.state)

    client.onConnect = function (frame) {

        ToastSuccess(i18n.t("notifications.title_notifications"),i18n.t("notifications.messages.web_socket_connected"));
        
        console.log("FRAME: "+frame);
        client.publish({
            destination: urlUser,
            body: JSON.stringify({correo:userdata.correo})
        });
        frameCallbackMessages();  
        console.log("***********");
        console.log(frameCallbackLoadChats);
        frameCallbackLoadChats();
        console.log(frameCallback);
        console.log("Después de ejecutar callback");

        console.log("id user: "+userdata.iduser);
        console.log("id user 256: "+iduserHash256);
        
        client.subscribe(`${urlMessagesChatAll}${iduserHash256}`,(data)=>{
            console.log("Mensaje INFO");
            console.log(data.body);
            const jsonDataNotification=JSON.parse(data.body);
            frameCallbackLoadChats();

            if(jsonDataNotification.type_message=="texto")
            {
                ToastInfo(i18n.t("notifications.messages.web_socket_message_notification_user",{user:jsonDataNotification.name_user}),i18n.t("notifications.messages.web_socket_message_notification_text"));
            }
            else if(jsonDataNotification.type_message=="imagen")
            {
                ToastInfo(i18n.t("notifications.messages.web_socket_message_notification_user",{user:jsonDataNotification.name_user}),i18n.t("notifications.messages.web_socket_message_notification_image"));
            }
            else if(jsonDataNotification.type_message=="video")
            {
                ToastInfo(i18n.t("notifications.messages.web_socket_message_notification_user",{user:jsonDataNotification.name_user}),i18n.t("notifications.messages.web_socket_message_notification_video"));
            }
            else if(jsonDataNotification.type_message=="audio")
            {
                ToastInfo(i18n.t("notifications.messages.web_socket_message_notification_user",{user:jsonDataNotification.name_user}),i18n.t("notifications.messages.web_socket_message_notification_audio"));
            }
            else{
                ToastInfo(i18n.t("notifications.messages.web_socket_message_notification_user",{user:jsonDataNotification.name_user}),i18n.t("notifications.messages.web_socket_message_notification_unknown"));
                console.log("Formato desconocido");
            }
        });


        client.subscribe(`${urlMessagesNewGroup}${iduserHash256}`,(data)=>{
            console.log("Mensaje obtenidssssswdfgfgdfo");
            console.log(data.body);
            console.log("iduserHash256 host: "+iduserHash256);
            const jsonDataNotification=JSON.parse(data.body);
            if(jsonDataNotification.iduser!=iduserHash256){
                ToastInfo(i18n.t("notifications.title_notifications"),i18n.t("notifications.messages.web_socket_message_notification_new_friend"));
            }
            else{
                ToastInfo(i18n.t("notifications.title_notifications"),i18n.t("notifications.messages.web_socket_message_notification_add_friend"));
            }
            frameCallbackLoadChats();
        });

    };

    if(!activate) //si es false es porque no esta activo el websocket y lo activa
    {
        console.log("socket se esta activando.....");
        client.activate();
        activate=true;
    }

}

export function Conectar()
{
    client.activate();
    activate=true;
}

export function Desconectar()
{
    client.deactivate();
    activate=false;
}


