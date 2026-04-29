import Sleep from "./Sleep";
import { SpeechText } from "./SpeechText";
import i18n from '@/i18n';

export function data_screen_main()
{
    return [
        i18n.t("data_screen_main.0"),
        i18n.t("data_screen_main.1"),
        i18n.t("data_screen_main.2"),
        i18n.t("data_screen_main.3"),
        i18n.t("data_screen_main.4"),
        i18n.t("data_screen_main.5")
    ]; 
}

export function data_screen_profile_host_user(user:string,names:string,surnames:string,
    phone_number:string,email:string,descripcion:string,disability:string,language:string)
{

    const va_disability=disability=='n/a'?"No tiene discapacidad":disability
    const va_description=descripcion=='' || descripcion==null?"No tiene descripcion":descripcion

    return [
        i18n.t("data_screen_profile_host_user.0"),
        i18n.t("data_screen_profile_host_user.1"),
        i18n.t("data_screen_profile_host_user.2",{user:user}),
        i18n.t("data_screen_profile_host_user.3",{names:names}),
        i18n.t("data_screen_profile_host_user.4",{surnames:surnames}),
        i18n.t("data_screen_profile_host_user.5",{phone_number:phone_number}),
        i18n.t("data_screen_profile_host_user.6",{email:email}),
        i18n.t("data_screen_profile_host_user.7",{descripcion:va_description}),
        i18n.t("data_screen_profile_host_user.8",{disability:va_disability}),
        i18n.t("data_screen_profile_host_user.9",{language:language}),
        i18n.t("data_screen_profile_host_user.10")
    ]; 
}

export function data_screen_configuration(active_bold:boolean,voice_notifications:boolean,source_number:string)
{
    return [
        i18n.t("data_screen_configuration.0"),
        i18n.t("data_screen_configuration.1",{active_bold:active_bold?'Activado':'Desactivado'}),
        i18n.t("data_screen_configuration.2",{voice_notifications:voice_notifications?'Activado':'Desactivado'}),
        i18n.t("data_screen_configuration.3",{source_number:source_number}),
        i18n.t("data_screen_configuration.4"),
        i18n.t("data_screen_configuration.5"),
    ]; 
}


export function data_screen_message_user(name_user:string)
{
    return [
        i18n.t("data_screen_message_user.0"),
        i18n.t("data_screen_message_user.1",{name_user:name_user}),
        i18n.t("data_screen_message_user.2"),
        i18n.t("data_screen_message_user.3"),
        i18n.t("data_screen_message_user.4"),
        i18n.t("data_screen_message_user.5"),
        i18n.t("data_screen_message_user.6"),
    ]; 
}

export function data_screen_photo_user(name_user:string,datetime_photo:string)
{
    return [
        i18n.t("data_screen_photo_user.0"),
        i18n.t("data_screen_photo_user.1",{name_user:name_user}),
        i18n.t("data_screen_photo_user.2",{datetime_photo:datetime_photo}),
        i18n.t("data_screen_photo_user.3"),
    ]; 
}


export function data_screen_photo_user_current()
{
    return [
        i18n.t("data_screen_photo_user_current.0"),
        i18n.t("data_screen_photo_user_current.1"),
        i18n.t("data_screen_photo_user_current.2"),
    ]; 
}



export function data_screen_video_user(name_user:string,datetime_photo:string,time:string,current_time:string,sound:boolean,caption:boolean)
{
    return [
        i18n.t("data_screen_video_user.0"),
        i18n.t("data_screen_video_user.1",{name_user:name_user}),
        i18n.t("data_screen_video_user.2",{datetime_photo:datetime_photo}),
        i18n.t("data_screen_video_user.3"),
        i18n.t("data_screen_video_user.4"),
        i18n.t("data_screen_video_user.5",{time:time}),
        i18n.t("data_screen_video_user.6",{current_time:current_time}),
        i18n.t("data_screen_video_user.7",{sound:sound?'Activado':'Desactivado'}),
        i18n.t("data_screen_video_user.8",{caption:caption?'Activado':'Desactivado'}),
    ]; 
}

export function data_screen_video_user_current(time:string,current_time:string,sound:boolean)
{
    return [
        i18n.t("data_screen_video_user_current.0"),
        i18n.t("data_screen_video_user_current.1"),
        i18n.t("data_screen_video_user_current.2"),
        i18n.t("data_screen_video_user_current.3"),
        i18n.t("data_screen_video_user_current.4",{time:time}),
        i18n.t("data_screen_video_user_current.5",{current_time:current_time}),
        i18n.t("data_screen_video_user_current.6",{sound:sound?'Activado':'Desactivado'}),
    ]; 
}



export function data_screen_camera_and_video(flash:boolean,camera:boolean,video_or_photo:boolean)
{
    return [
        i18n.t("data_screen_camera_and_video.0"),
        i18n.t("data_screen_camera_and_video.1",{flash:flash?'Activado':'Desactivado'}),
        i18n.t("data_screen_camera_and_video.2"),
        i18n.t("data_screen_camera_and_video.3",{camera:camera?'Camara delantera activada':'Camara trasera activada'}),
        i18n.t("data_screen_camera_and_video.4",{video_or_photo:video_or_photo?'Video activado':'Foto activado'}),
    ]; 
}

export function data_screen_profile_friend_user(names:string,surnames:string,name_user:string,disability:string,phone_number:string,email:string,description:string)
{
    const va_disability=disability=='n/a'?"No tiene discapacidad":disability
    const va_description=description=='' || description==null?"No tiene descripcion":description

    return [
        i18n.t("data_screen_profile_friend_user.0"),
        i18n.t("data_screen_profile_friend_user.1",{names:names}),
        i18n.t("data_screen_profile_friend_user.2",{surnames:surnames}),
        i18n.t("data_screen_profile_friend_user.3",{name_user:name_user}),
        i18n.t("data_screen_profile_friend_user.4",{disability:va_disability}),
        i18n.t("data_screen_profile_friend_user.5",{phone_number:phone_number}),
        i18n.t("data_screen_profile_friend_user.6",{email:email}),
        i18n.t("data_screen_profile_friend_user.7",{description:va_description}),
    ]; 
}

export async function screen_reading(vector_data:string[])
{
    for(const data of vector_data)
    {
        SpeechText(data);
        await Sleep(3000);
    }
}