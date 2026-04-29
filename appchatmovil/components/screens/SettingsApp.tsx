import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ListRenderItem, ScrollView, Pressable } from "react-native";
import { change_initial_colors, changeVariablesColors, ColorsApp, colorsTheme, MAIN_COLOR, MAIN_COLOR_BACKGROUND, MAIN_TEXT_COLOR } from "../ConfigApp/Colors";
import { useTranslation } from 'react-i18next';
import '@/i18n';
import i18n from '@/i18n';
import ItemSelect from "../appscomponent/ItemSelect";
import ISelectOptions from "../Interfaces/ISelectOptions";
import IFormatConfigApp from "../Interfaces/IFormatConfigApp";
import ItemCheckBox from "../appscomponent/ItemCheckBox";
import { number } from "yup";
import { check_route, configapp_directory, create_file_tp, delete_file, key_directory, main_directory, NAME_FILE_CONFIG_APP, NAME_FILE_KEY, read_file_text } from "../utils/ManagedFiles";
import {  change_initial_config, changeConfig, changeVariablesConfig, MainMenu } from "../ConfigApp/Config";
import ModelLoadSplashScreen from "../appscomponent/ModelLoadSplashScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Sleep from "../utils/Sleep";
import Toast from "react-native-toast-message";
import { ConfigMenu } from "../ConfigApp/Config";
import { data_screen_configuration, screen_reading } from "../utils/screen_reading";
import { setReadScreenCallback } from "../utils/VoiceCommands";


export default function SettingsApp()
{
    const insets=useSafeAreaInsets();
    const [isConfigChange, setConfigChange] = useState(false);

    const styles = useMemo(() => StyleSheet.create({
        container: {
            paddingTop:insets.top,
            paddingBottom:insets.bottom,
            flex:1,
            //borderColor: "#000",
            backgroundColor: MAIN_COLOR_BACKGROUND,
            justifyContent:"center",
            alignContent:"center"
        },
        titulo: {
            fontSize: ConfigMenu.title_font_size*2,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 70,
        },
        subtitulo: {
            fontWeight:"bold",
            fontSize: 16,
            marginBottom: 10,
            width:"100%",
            padding:4, 
        },
        grid: {
            //alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            //marginBottom: 0,
            //backgroundColor:"#f00"
        },
        colorBox: {
            width: 50,
            height: 50,
            margin: 2,
            borderWidth: 1,
            borderColor: "#000",
        },
        container_input:{
            width:"100%",
            //margin:0,
            marginTop:5,
            padding:4, 
            /*borderWidth:3,
            borderColor:"#f00"*/
        },
        container_input_check:{
            width:"100%",
            //margin:0,
            padding:4, 
            /*borderWidth:3,
            borderColor:"#f00"*/
            flexDirection:"row",
            flexWrap: 'wrap'
        },
        button: {
            marginLeft:30,
            marginRight:30,
            backgroundColor: MAIN_COLOR,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: 'center',
            height:48
        },
        buttonText: {
            color: MAIN_TEXT_COLOR,
            fontSize: ConfigMenu.button_action_font_size,
            fontWeight: 'bold',
        },
        container_select:{
            marginLeft:30,
            marginRight:30,
        },
    }), [MAIN_COLOR,isConfigChange]);



    /*const coloresIniciales: string[] = [
        "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF",
        "#00FFFF", "#FFA500", "#800080", "#808000", "#008080",
        "#FFC0CB", "#A52A2A", "#000000", "#FFFFFF", "#808080",
        "#ADD8E6", "#90EE90", "#FFD700", "#FF1493", "#00CED1"
    ];*/


    const optionsFontSize = [
        { label: "8", value: "0" },
        { label: "10", value: "1" },
        { label: "12", value: "2" },
        { label: "14", value: "3" },
        { label: "16", value: "4" },
        { label: "18", value: "5" },
        { label: "20", value: "6" },
        { label: "22", value: "7" },
        { label: "24", value: "8" }
    ];

    const { t } = useTranslation();
    const [valueIdFontSizeSelect,setIdFontSizeSelect]=useState<string>('');
    const [valueOptionsSelectFontSize, setOptionsSelectFontSize] = useState<ISelectOptions[]>(optionsFontSize as ISelectOptions[]);
    //const [colores, setColores] = useState<string[]>(coloresIniciales);
    const valueIndexColorSelected=useRef<number>(0);
    const [valueColorSelected, setColorSelected] = useState<ColorsApp>(colorsTheme[valueIndexColorSelected.current]);
    const [valueSelectFontBold,setSelectFontBold]=useState<boolean>(false);
    const [valueVoiceNotification,setVoiceNotification]=useState<boolean>(false);
    //const [valueUpdateView,setValueUpdateView]=useState<boolean>(false);
    const [showLoadSplashScreen, SetShowLoadSplashScreen] = useState(false);

    async function LoadDataConfigApp()
    {
        const data_exists_file=await check_route(configapp_directory+NAME_FILE_CONFIG_APP);
        if(data_exists_file)
        {
            const dataConfigApp=await read_file_text(configapp_directory,NAME_FILE_CONFIG_APP);
            const jsonConfigApp=JSON.parse(dataConfigApp) as IFormatConfigApp;
            setColorSelected(colorsTheme[jsonConfigApp.color_app.index]);
            setIdFontSizeSelect(jsonConfigApp.font.index_font_size.toString());
            setVoiceNotification(jsonConfigApp.voice_notifications);
            setSelectFontBold(jsonConfigApp.font.bold);
            
            setReadScreenCallback(()=>{screen_reading(data_screen_configuration(jsonConfigApp.font.bold,jsonConfigApp.voice_notifications,optionsFontSize[jsonConfigApp.font.index_font_size].value))});
        
        }
        else{
            console.log("el archivo de configuracion no existe");
            setReadScreenCallback(()=>{screen_reading(data_screen_configuration(false,false,optionsFontSize[0].value))});
        }
    }

    useEffect(() => {
        LoadDataConfigApp();
    }, [])


    function colorSelected(item:ColorsApp,index:number)
    {
        setColorSelected(item);
        valueIndexColorSelected.current=index;
        console.log("selecteddd= "+index);
    }

    /*const renderColor: ListRenderItem<ColorsApp> = ({ item,index }) => (
        <TouchableOpacity onPress={()=>colorSelected(item,index)} style={[styles.colorBox, { backgroundColor: item.main_color }]} />
    );*/

    function onCheckChangeFontBold(value:boolean)
    {
        console.log("cambiando onCheckChangeFontBold: "+value);
        setSelectFontBold(value);
    }

    function onCheckChangeVoiceNotifications(value:boolean)
    {
        console.log("cambiando onCheckChangeVoiceNotifications: "+value);
        setVoiceNotification(value);
    }
    
    async function handleSelectFontSize(indexfontsize:string)
    {
        setIdFontSizeSelect(indexfontsize);
        console.log("selecciono EL ID fontsize= "+indexfontsize);
        console.log("selecciono EL fontsize= "+ optionsFontSize[Number(indexfontsize)].label);
    }

    
    async function handleSubmitReset()
    {
        SetShowLoadSplashScreen(true);
        await Sleep(1000);
        change_initial_config();
        change_initial_colors();
        await delete_file("",configapp_directory,NAME_FILE_CONFIG_APP);

        setColorSelected(colorsTheme[0]);
        setIdFontSizeSelect("");
        setVoiceNotification(false);
        setSelectFontBold(false);

        SetShowLoadSplashScreen(false);
        console.log("se reseteo");
        setConfigChange(!isConfigChange);

    }


    async function handleSubmit()
    {
        SetShowLoadSplashScreen(true);
        await Sleep(1000);
        console.log("guardando....");
        const fontSizeNumber=Number(optionsFontSize[Number(valueIdFontSizeSelect)].label.trim());
        const formatSave:IFormatConfigApp=
        {
            voice_notifications: valueVoiceNotification,
            color_app:{
                index: valueIndexColorSelected.current,
                main_color: valueColorSelected.main_color,
                main_color_desactivate: valueColorSelected.main_color_desactivate,
                main_color_background: valueColorSelected.main_color_background,
                main_text_color: valueColorSelected.main_text_color
            },
            font:{
                index_font_size:Number(valueIdFontSizeSelect),
                font_size: fontSizeNumber,
                bold: valueSelectFontBold
            }
        }
        //se elimina para crear un nueva archivo
        await delete_file("",configapp_directory,NAME_FILE_CONFIG_APP);
        await create_file_tp(configapp_directory,NAME_FILE_CONFIG_APP,JSON.stringify(formatSave));
        changeVariablesConfig(formatSave.voice_notifications,formatSave.font.font_size,formatSave.font.bold);
        changeVariablesColors(formatSave.color_app.main_color,formatSave.color_app.main_color_desactivate,formatSave.color_app.main_color_background,formatSave.color_app.main_text_color);
        SetShowLoadSplashScreen(false);
        setConfigChange(!isConfigChange);
    }



    return (
        <View style={styles.container}>
 
           <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} style={{width:"100%"}}>
 
                <Text style={styles.titulo} accessible={true} accessibilityLabel={t('view_settings_app.title.accessibilityLabel')} accessibilityRole="text">{t('view_settings_app.title.text')}</Text>


                <View accessible={true} accessibilityLabel={t('view_settings_app.container_colors.accessibilityLabel')} accessibilityRole="text">
                    <View style={styles.grid}>
                        {colorsTheme.map((item, index) => (
                        <Pressable
                            key={index}
                            onPress={() => colorSelected(item,index)}
                            style={{
                                width: 50,
                                height: 50,
                                margin: 5,
                                borderRadius: 8,
                                backgroundColor: item.main_color,
                            }}
                            accessible={true}
                            accessibilityLabel={`Color ${index + 1}`}
                            accessibilityRole="button"
                        />
                        ))}
                    </View>
                </View>
            
                <View style={styles.container_input} accessible={true} accessibilityLabel={t('view_settings_app.color_select.accessibilityLabel')} accessibilityRole="text">
                    <View style={{justifyContent:"center",alignItems:"center"}}>
                        <View style={{width:100,height:100,backgroundColor:valueColorSelected.main_color,borderRadius:10}}>
                        </View>
                    </View>
                </View>

                <View style={styles.container_input_check}>
                    <ItemCheckBox isConfigChange={isConfigChange} containerAccessibilityLabel={t("item_check.accessibilityLabelText")} active={valueSelectFontBold} onCheckChange={onCheckChangeFontBold} textControl={t("item_check.texts.text1")}></ItemCheckBox>
                    <ItemCheckBox isConfigChange={isConfigChange} containerAccessibilityLabel={t("item_check.accessibilityLabelText")} active={valueVoiceNotification} onCheckChange={onCheckChangeVoiceNotifications} textControl={t("item_check.texts.text2")}></ItemCheckBox>
                </View>

                <View style={styles.container_input}>
                    <View style={styles.container_select}>
                        <ItemSelect labelmain={t("view_settings_app.select_font_size.labelmain")} 
                                        opcioninit={valueIdFontSizeSelect} 
                                        opciones={valueOptionsSelectFontSize} 
                                        onSelectChange={handleSelectFontSize}
                                        opcionNA={t("view_settings_app.select_font_size.opcionNA")} 
                                        accessibilityLabelmain={t("view_settings_app.select_font_size.accessibilityLabelmain")} 
                                        accessibilityLabelselect={t("view_settings_app.select_font_size.accessibilityLabelselect")} 
                                        accessibilityLabeloptions={t("view_settings_app.select_font_size.accessibilityLabeloptions")} >
                        </ItemSelect> 
                    </View>
                </View>
                
                <View style={styles.container_input}>
                    <TouchableOpacity onPress={()=>handleSubmitReset()} style={[styles.button]} accessible={true} accessibilityLabel={t("view_settings_app.button_reset.accessibilityLabel")} accessibilityRole="text">
                        <Text style={styles.buttonText}>{t("view_settings_app.button_reset.text")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_input}>
                    <TouchableOpacity onPress={()=>handleSubmit()} style={[styles.button]} accessible={true} accessibilityLabel={t("view_settings_app.button_save.accessibilityLabel")} accessibilityRole="text">
                        <Text style={styles.buttonText}>{t("view_settings_app.button_save.text")}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            
            <ModelLoadSplashScreen activeModal={showLoadSplashScreen}/>
            <Toast/>

        </View>
    );
}


