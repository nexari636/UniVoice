
export default interface IFormatConfigApp
{
    voice_notifications:boolean,
    color_app: ColorApp;
    font:FontConfig
}


interface ColorApp{
    index:number,
    main_color:string,
    main_color_desactivate:string,
    main_color_background:string,
    main_text_color:string
}

interface FontConfig{
    index_font_size:number,
    font_size:number,
    bold:boolean
}
