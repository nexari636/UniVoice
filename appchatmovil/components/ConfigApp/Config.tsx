import { FlatListComponent } from "react-native";

const NAME_APP="UniVoice"

type RNFontWeight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

interface IItemChatConfig{
    text_name_user_font_size:number,
    text_name_user_bold:RNFontWeight,
    message_preview_font_size:number,
    message_preview_bold:RNFontWeight,
    text_style_data_time_font_size:number,
    text_style_data_time_bold:RNFontWeight,
    modal_name_user_font_size:number,
    button_information_font_size:number
}

interface IItemsChatConfig{
    name_user_font_size:number,
    change_language_font_size:number,
    change_language_bold:RNFontWeight,
    date_time_font_size:number,
    date_time_bold:RNFontWeight,
    message_text_font_size:number,
    message_text_bold:RNFontWeight
}

/*****************************/

interface IMainMenuConfig{
    logo_text_font_size:number,
    search_font_size:number,
    search_bold:RNFontWeight,
    button_menu_config_font_size:number,
    item_chat:IItemChatConfig
}

interface IProfileMenuConfig{
    button_change_photo_font_size:number,
    text_input_font_size:number,
    text_input_bold:RNFontWeight,
    error_text_font_size:number,
    button_save_font_size:number,
    label_select_font_size:number,    
    text_selected_font_size:number,
    text_selected_bold:RNFontWeight
}

interface IConfigMenuConfig{
    title_font_size:number,
    chk_font_size:number,
    chk_bold:RNFontWeight,
    button_action_font_size:number
}

interface IChatMessageConfig{
    text_name_user_font_size:number,
    text_input_message_font_size:number,
    items_chats:IItemsChatConfig
}

interface IProfileUserConfig{
    names_font_size:number,
    names_bold:RNFontWeight,
    username_font_size:number,
    username_bold:RNFontWeight,
    contact_font_size:number,
    contact_bold:RNFontWeight,
    title_description_font_size:number,
    description_font_size:number,
    description_bold:RNFontWeight
}


export var VOICE_NOTIFICATIONS:boolean=false;
export var FONT_SIZE:number=15;
export var FONT_BOLD:boolean=false;
export var changeConfig:boolean=false;

export var MainMenu:IMainMenuConfig={
    logo_text_font_size:48,
    search_font_size:15,
    search_bold:"normal",
    button_menu_config_font_size:15,
    item_chat:{
        text_name_user_font_size:16,
        text_name_user_bold:"normal",
        message_preview_font_size:10,
        message_preview_bold:"normal",
        text_style_data_time_font_size:10,
        text_style_data_time_bold:"normal",
        modal_name_user_font_size:20,
        button_information_font_size:15
    }
}

export var ProfileMenu:IProfileMenuConfig={
    button_change_photo_font_size:15,
    text_input_font_size:16,
    text_input_bold:"normal",
    error_text_font_size:15,
    button_save_font_size:16,
    label_select_font_size:15,    
    text_selected_font_size:15,
    text_selected_bold:"normal"
}

export var ConfigMenu:IConfigMenuConfig={
    title_font_size:15,
    chk_font_size:15,
    chk_bold:"normal",
    button_action_font_size:16
}

export var ChatMessagesConfig:IChatMessageConfig={
    text_name_user_font_size:20,
    text_input_message_font_size:16,
    items_chats:{
        name_user_font_size:10,
        change_language_font_size:15,
        change_language_bold:"normal",
        date_time_font_size:10,
        date_time_bold:"normal",
        message_text_font_size:15,
        message_text_bold:"normal"
    }
}

export var ProfileUserConfig:IProfileUserConfig={
    names_font_size:22,
    names_bold:"normal",
    username_font_size:16,
    username_bold:"normal",
    contact_font_size:16,
    contact_bold:"normal",
    title_description_font_size:18,
    description_font_size:16,
    description_bold:"normal"
}

/***********************************
 * METODOS
 ***********************************/

export function changeVariablesConfig(voice_notifications:boolean,font_size:number,font_bold:boolean)
{
    VOICE_NOTIFICATIONS=voice_notifications;
    FONT_SIZE=font_size;
    FONT_BOLD=font_bold;
    changeConfig=true;

    /***************MAIN MENU */

    let bold:RNFontWeight=font_bold?"bold":"normal";
    MainMenu.logo_text_font_size+=font_size;
    MainMenu.button_menu_config_font_size=font_size;
    MainMenu.search_font_size=font_size;
    MainMenu.search_bold=bold;
    MainMenu.item_chat.message_preview_font_size=font_size;
    MainMenu.item_chat.message_preview_bold=bold;
    MainMenu.item_chat.button_information_font_size=font_size;
    MainMenu.item_chat.text_style_data_time_font_size=font_size;
    MainMenu.item_chat.text_style_data_time_bold=bold;
    MainMenu.item_chat.modal_name_user_font_size=font_size;
    MainMenu.item_chat.text_name_user_bold=bold;
    MainMenu.item_chat.text_name_user_font_size=font_size;

    /***************PROFILE MENU */
    ProfileMenu.button_change_photo_font_size=font_size,
    ProfileMenu.text_input_font_size=font_size,
    ProfileMenu.text_input_bold=bold,
    ProfileMenu.error_text_font_size=font_size,
    ProfileMenu.button_save_font_size=font_size,
    ProfileMenu.label_select_font_size=font_size,    
    ProfileMenu.text_selected_font_size=font_size,
    ProfileMenu.text_selected_bold=bold

    /***************Configuration CONFIG */

    ConfigMenu.title_font_size=font_size,
    ConfigMenu.chk_font_size=font_size,
    ConfigMenu.chk_bold=bold,
    ConfigMenu.button_action_font_size=font_size

    /***************Messages chat CONFIG */

    ChatMessagesConfig.text_name_user_font_size=font_size;
    ChatMessagesConfig.text_input_message_font_size=font_size;
    ChatMessagesConfig.items_chats.name_user_font_size=font_size;
    ChatMessagesConfig.items_chats.change_language_font_size=font_size,
    ChatMessagesConfig.items_chats.change_language_bold=bold,
    ChatMessagesConfig.items_chats.date_time_font_size=font_size,
    ChatMessagesConfig.items_chats.date_time_bold=bold,
    ChatMessagesConfig.items_chats.message_text_font_size=font_size,
    ChatMessagesConfig.items_chats.message_text_bold=bold

    /***************Profile user CONFIG */

    ProfileUserConfig.names_font_size=font_size,
    ProfileUserConfig.names_bold=bold,
    ProfileUserConfig.username_font_size=font_size,
    ProfileUserConfig.username_bold=bold,
    ProfileUserConfig.contact_font_size=font_size,
    ProfileUserConfig.contact_bold=bold,
    ProfileUserConfig.title_description_font_size=font_size,
    ProfileUserConfig.description_font_size=font_size,
    ProfileUserConfig.description_bold=bold

}


export function change_initial_config()
{
    VOICE_NOTIFICATIONS=false;
    FONT_SIZE=15;
    FONT_BOLD=false;
    changeConfig=false;

    /************* MAIN MENU *************/

    MainMenu.logo_text_font_size=35;
    MainMenu.button_menu_config_font_size=15;
    MainMenu.search_font_size=15;
    MainMenu.search_bold="normal";
    MainMenu.item_chat.message_preview_font_size=10;
    MainMenu.item_chat.message_preview_bold="normal";
    MainMenu.item_chat.button_information_font_size=15;
    MainMenu.item_chat.text_style_data_time_font_size=10;
    MainMenu.item_chat.text_style_data_time_bold="normal";
    MainMenu.item_chat.modal_name_user_font_size=20;
    MainMenu.item_chat.text_name_user_bold="normal";
    MainMenu.item_chat.text_name_user_font_size=16;

    /*************** ProfileMenu ********************/

    ProfileMenu.button_change_photo_font_size=15,
    ProfileMenu.text_input_font_size=16,
    ProfileMenu.text_input_bold="normal",
    ProfileMenu.error_text_font_size=15,
    ProfileMenu.button_save_font_size=16,
    ProfileMenu.label_select_font_size=15,    
    ProfileMenu.text_selected_font_size=15,
    ProfileMenu.text_selected_bold="normal"

    /*************** ConfigurationMenu ********************/

    ConfigMenu.title_font_size=15,
    ConfigMenu.chk_font_size=15,
    ConfigMenu.chk_bold="normal",
    ConfigMenu.button_action_font_size=16

    /***************** MESSAGE CHAT ******************/

    ChatMessagesConfig.text_name_user_font_size=20;
    ChatMessagesConfig.text_input_message_font_size=16;
    ChatMessagesConfig.items_chats.name_user_font_size=10;
    ChatMessagesConfig.items_chats.change_language_font_size=15,
    ChatMessagesConfig.items_chats.change_language_bold="normal",
    ChatMessagesConfig.items_chats.date_time_font_size=10,
    ChatMessagesConfig.items_chats.date_time_bold="normal",
    ChatMessagesConfig.items_chats.message_text_font_size=15,
    ChatMessagesConfig.items_chats.message_text_bold="normal"

    /***************** PROFILE USER ******************/
    ProfileUserConfig.names_font_size=22,
    ProfileUserConfig.names_bold="normal",
    ProfileUserConfig.username_font_size=16,
    ProfileUserConfig.username_bold="normal",
    ProfileUserConfig.contact_font_size=16,
    ProfileUserConfig.contact_bold="normal",
    ProfileUserConfig.title_description_font_size=18,
    ProfileUserConfig.description_font_size=16,
    ProfileUserConfig.description_bold="normal"

}


/*export {}

declare global{
    var VOICE_NOTIFICATIONS:boolean;
    var FONT_SIZE:number;
    var FONT_BOLD:boolean;
}

global.VOICE_NOTIFICATIONS=false;
global.FONT_SIZE=15;
global.FONT_BOLD=false;*/