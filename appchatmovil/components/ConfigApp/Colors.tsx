export let MAIN_COLOR:string="#00bf7d";
export let MAIN_COLOR_DESACTIVATE:string="#018556ff";
export let MAIN_COLOR_BACKGROUND:string="#EFEFEF";
export let MAIN_TEXT_COLOR:string="#000";


export function changeVariablesColors(main_color: string,main_color_desactivate: string,main_color_background: string,main_text_color: string) {
  MAIN_COLOR = main_color;
  MAIN_COLOR_DESACTIVATE = main_color_desactivate;
  MAIN_COLOR_BACKGROUND = main_color_background;
  MAIN_TEXT_COLOR = main_text_color;
}

export function change_initial_colors()
{
    MAIN_COLOR="#00bf7d";
    MAIN_COLOR_DESACTIVATE="#018556ff";
    MAIN_COLOR_BACKGROUND="#EFEFEF";
    MAIN_TEXT_COLOR="#FFF";
}


export class ColorsApp
{
    main_color:string;
    main_color_desactivate:string;
    main_color_background:string;
    main_text_color:string;

    constructor(main_color:string,main_color_desactivate:string,main_color_background:string,main_text_color:string)
    {
        this.main_color=main_color;
        this.main_color_desactivate=main_color_desactivate;
        this.main_color_background=main_color_background;
        this.main_text_color=main_text_color;
    }
}


export const colorsTheme:ColorsApp[]=[
    new ColorsApp("#595959","#018556ff","#EFEFEF","#FFF"), 
    new ColorsApp("#FFD700","#FFA500ff","#EFEFEF","#000"), 
    new ColorsApp("#b9e192","#cfebb6","#EFEFEF","#000"),
    new ColorsApp("#f57600","#c44601","#EFEFEF","#000"),
    //new ColorsApp("#F07AB5","#b51963","#EFEFEF","#000"),
    new ColorsApp("#f8b8d0","#f194b8","#EFEFEF","#000"),
    //new ColorsApp("#fcc9b5","#faaf90","#EFEFEF","#000"),
    new ColorsApp("#9b8bf4","#606ff3","#EFEFEF","#000"),
    new ColorsApp("#3D9EFF","#054fb9","#EFEFEF","#000"),
    new ColorsApp("#45fa4e","#0af477","#EFEFEF","#000"),
    new ColorsApp("#ffb800","#d08000","#EFEFEF","#000"),
    new ColorsApp("#e48c8a","#da5d6c","#EFEFEF","#000"),
    new ColorsApp("#00A8F0","#026297","#EFEFEF","#FFF"),
    new ColorsApp("#bde2c6","#9ed4ac","#EFEFEF","#000"),
]


/*export const colorsTheme:ColorsApp[]=[
    new ColorsApp("#00bf7d","#018556ff","#EFEFEF","#FFF"), 
    new ColorsApp("#FFD700","#FFA500ff","#EFEFEF","#000"), 
    new ColorsApp("#b9e192","#cfebb6","#EFEFEF","#FFF"),
    new ColorsApp("#f57600","#c44601","#EFEFEF","#FFF"),
    new ColorsApp("#e6308a","#b51963","#EFEFEF","#FFF"),
    new ColorsApp("#f8b8d0","#f194b8","#EFEFEF","#000"),
    new ColorsApp("#fcc9b5","#faaf90","#EFEFEF","#000"),
    new ColorsApp("#9b8bf4","#606ff3","#EFEFEF","#FFF"),
    new ColorsApp("#0073e6","#054fb9","#EFEFEF","#FFF"),
    new ColorsApp("#45fa4e","#0af477","#EFEFEF","#000"),
    new ColorsApp("#ffb800","#d08000","#EFEFEF","#000"),
    new ColorsApp("#e48c8a","#da5d6c","#EFEFEF","#FFF"),
    new ColorsApp("#0089c2","#026297","#EFEFEF","#FFF"),
    new ColorsApp("#bde2c6","#9ed4ac","#EFEFEF","#000"),
]*/


