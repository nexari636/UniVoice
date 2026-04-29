import Sleep from './Sleep';

export var clientCommandsVoice:CommandsVoice;

export async function initClientCommandsVoice()
{
    clientCommandsVoice=new CommandsVoice();
}

var frameCallbackOpenChat:(idgrupo:string) => void;

export function setOpenChatCallback(fn:(idgrupo:string) => void) {
    frameCallbackOpenChat = fn;
}

/**************/
// [mt] --> mensaje de texto
var frameCallbackSendTextMessage:(mensaje:string) => void;

export function setSendTextMessageCallback(fn:(mensaje:string) => void) {
    frameCallbackSendTextMessage = fn;
}

/**************/
// [ma] --> mensaje de audio
export var frameCallbackSendAudioMessage: () => void;
export function setSendAudioMessageCallback(fn: () => void) {
    frameCallbackSendAudioMessage = fn;
}

/**************/
// <<< --> retroceder entre pestañas
export var frameCallbackGoBackTab: () => void;
export function setGoBackTabCallback(fn: () => void) {
    frameCallbackGoBackTab = fn;
}

/**************/
// [srch] --> búsqueda
var frameCallbackSearchAction: (param: string) => void;

export function setSearchActionCallback(fn: (param: string) => void) {
    frameCallbackSearchAction = fn;
}

/**************/
// [pu] --> perfil de usuario y amigo
var frameCallbackOpenUserProfile: () => void;
export function setOpenUserProfileCallback(fn: () => void) {
    frameCallbackOpenUserProfile = fn;
}

var frameCallbackOpenUserFriendProfile: (friendId: string) => void;

export function setOpenChatFriendProfile(fn: (friendId: string) => void) {
    frameCallbackOpenUserFriendProfile = fn;
}


/**************/
// [cg] --> configuraciones
var frameCallbackOpenSettings: () => void;
export function setOpenSettingsCallback(fn: () => void) {
    frameCallbackOpenSettings = fn;
}

/**************/
// [lp] --> leer pantalla
export var frameCallbackReadScreen: () => void;

export function setReadScreenCallback(fn: () => void) {
    frameCallbackReadScreen = fn;
}


class CommandsVoice{

    p_vec_tokens:string[];
    index_instruction:number;

    constructor() {
        this.p_vec_tokens=[];
        this.index_instruction=0;
        //this.p_vec_tokens=['[ct]', '{p}jhon{p}', '#', '[mt]', '{md}hola como estas{md}'];
        //this.index_instruction=3;
    }

    public process_command(command:string)
    {
        const vector_tokens=command.split("+");
        if(vector_tokens.length===0) console.log("No hay tokens");
        console.log(vector_tokens);
        this.command_interpreter(vector_tokens);
    }


    /**
     * Interpreta el comando de voz y devuelve la acción correspondiente del mapa `commands`.
     * Si no hay coincidencia devuelve null.
     */
    public async command_interpreter(p_vec_tokens:string[]): Promise<string | null> 
    {
        this.p_vec_tokens=p_vec_tokens;
        // pequeño retardo para simular procesamiento o esperar recursos externos
        await Sleep(1000);
        console.log("tokens actuales: "+p_vec_tokens);
        console.log(p_vec_tokens);

        for(let x=this.index_instruction;x<p_vec_tokens.length;x++)
        {
            let token=p_vec_tokens[x].trim();
            console.log(token)

            if(token=="#")
            {
                this.index_instruction=x+1;
                break;
            }

            //if(token.includes("{p}") || token.includes("{md}")) continue;
            let peek_deer:string|null=""; 

            switch (token) {
                case "[mt]":
                    // lógica para chat
                    peek_deer=PeekDer(x,p_vec_tokens);

                    if(peek_deer!=null)
                    {
                        const data=get_data(peek_deer)||"";
                        console.log("data= "+data[2]);
                        sendTextMessage(data[2]);
                        console.log("extraccion de datos");
                    }
                    else
                        console.log("Error en la interpretacion, comando mal formado");

                    break;
                case "[ma]":
                    // lógica para mensaje de audio
                    sendAudioMessage();
                    break;
                case "[srch]":
                    // lógica para búsqueda
                    peek_deer=PeekDer(0,p_vec_tokens);

                    if(peek_deer!=null)
                    {
                        const data=get_data(peek_deer)||"";
                        console.log("data= "+data[2]);
                        searchAction(data[2]);
                    }
                    else{
                        console.log("Error en la interpretacion, comando mal formado");
                        //searchAction(null)
                    }
                    break;
                case "[ct]":
                    // lógica para chat
                    peek_deer=PeekDer(x,p_vec_tokens);

                    if(peek_deer!=null)
                    {
                        const data=get_data(peek_deer);
                        if(data!=null)
                        {
                            console.log("data= "+data[2]);
                            openChat(data[2]);
                        }
                        else{
                            console.log("Error!! no se reconoce al usuario");
                        }
                    }
                    else{
                        console.log("Error en la interpretacion, comando mal formado");
                        //throw new SyntaxError("Error en la interpretacion, comando mal formado");
                    }
                    break;
                case "[pu]":
                    peek_deer=PeekDer(x,p_vec_tokens);

                    if(peek_deer!=null)
                    {
                        const data=get_data(peek_deer)||"";
                        console.log("data= "+data[2]);
                        openUserProfile(true,data[2]);
                    }
                    else{
                        openUserProfile(false,"");
                        //console.log("Error en la interpretacion, comando mal formado");
                    }
                    break;
                case "[cg]":
                    openSettings()
                    break;
                case "[lp]":
                    readScreen();
                    break;
                case "<<<":
                    goBackTab();
                    break;
            
                default:
                    console.log("Error en la interpretacion: token no reconocido → " + token);
                    //throw new SyntaxError("Error en la interpretacion: token no reconocido → " + token);
            }

            console.log("PeekDer(x,p_vec_tokens)= "+PeekDer(x,p_vec_tokens)+" index= "+x)

            if(PeekDer(x,p_vec_tokens)==null)
            {
                console.log("limpiando parametros de comandos");
                this.p_vec_tokens=[];
                this.index_instruction=0;
            }
        
        }

        return "";
       
    }

}

export default CommandsVoice;


//funcional

// [mt] --> mensaje de texto
function sendTextMessage(mensaje:string) {
    console.log("sendTextMessage ejecutado - Mensaje de texto= "+mensaje);
    frameCallbackSendTextMessage(mensaje);
}

// [ma] --> mensaje de audio
function sendAudioMessage() {
    console.log("sendAudioMessage ejecutado - Mensaje de audio");
}

// <<< --> retroceder entre pestañas
function goBackTab() {
    console.log("goBackTab ejecutado - Retroceder pestaña");
    frameCallbackGoBackTab();
}

// [srch] --> búsqueda
function searchAction(param:string) {
    /*if(param!=null)
    {*/
        console.log("searchAction ejecutado - Búsqueda= "+param);
    /*}
    else{
        console.log("Foco en la busqueda");
    }*/
   frameCallbackSearchAction(param);
}

// [ct] --> chat
function openChat(idgrupo:string) {
    console.log("openChat ejecutado - Chat usuario grupo= "+idgrupo);
    frameCallbackOpenChat(idgrupo);
}

// [pu] --> perfil de usuario
function openUserProfile(type:boolean,id_friend_user:string) 
{
    console.log("openUserProfile ejecutado - Perfil de usuario");
    if(type)
        frameCallbackOpenUserFriendProfile(id_friend_user);
    else
        frameCallbackOpenUserProfile();
}

// [cg] --> configuraciones
function openSettings() {
    console.log("openSettings ejecutado - Configuraciones");
    frameCallbackOpenSettings();
}

// [lp] --> leer pantalla
function readScreen() {
    console.log("readScreen ejecutado - Leer pantalla");
    frameCallbackReadScreen();
}


//******************* utils *******************

function PeekDer(pos:number,vec_nodos:string[])
{
    if(pos<0 || pos+1>=vec_nodos.length) return null;
    //console.log("PeekDer= "+(pos+1));
    return vec_nodos[++pos];
}

/*
function PeekIzq(pos:number,vec_nodos:string[])
{
    if(pos<0 || pos>=vec_nodos.length) return null;
    //console.log("PeekIzq= "+(pos-1));
    return vec_nodos[--pos];
}
*/

function get_data(etiqueta:string)
{
    const text = etiqueta;
    const regex = /\{([a-zA-Z0-9]+)\}([\s\S]*?)\{\/?\1\}/;

    const match = text.match(regex);
    if (match) {
        console.log("Etiqueta:", match[1]);   // p
        console.log("Contenido:", match[2]); // jhon
    }
    return match;
}