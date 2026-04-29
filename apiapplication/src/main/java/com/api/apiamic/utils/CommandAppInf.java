/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

import jakarta.ws.rs.core.Form;
import java.text.Normalizer;
import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import org.simmetrics.StringMetric;
import org.simmetrics.metrics.StringMetrics;

/**
 *
 * @author Jhon (TheBlack)
 */

@Getter
@Setter
class CommandPVD
{
    String command;
    int type;
    int p1;
    int p2;

   
    public CommandPVD(String command,int type){
        this.command=command;
        this.type=type;
        this.p1=-1;
        this.p2=-1;
        init();
    }
    
    private void init()
    {
        List<String> lstcad=Arrays.asList(command.split(" "));
        //Vector<String> vector_cad=new Vector<>(lstcad);
        int [] pos=IntStream.range(0,lstcad.size()).filter(x->lstcad.get(x).equals("@")).toArray();
        
        
        
        for(int x=0;x<pos.length;x++)
        {
            if(x==0)
                this.p1=pos[x];
            else
                this.p2=pos[x];
        }
    }
}


@Getter
@Setter
public class CommandAppInf 
{
    //{md} --> data
    //{p} --> usuario
    //[mt] --> mensaje de texto
    //[ma] --> mensaje de audio
    //<<< --> retroceder entre pestañas
    //[srch] --> busqueda
    //[ct] --> chat
    //[pu] --> perfil de usuario
    //[cg] --> configuraciones
    //[lp] --> leer pantalla
    //+ --> separador
    //# --> separador de recorte de funciones por seguido en una pagina
    static List<String> RulesList = List.of(
            "{md}",
            "[mt]",
            //"[ma]",
            "{p}", 
            "<<<",
            "[pu]",
            "[srch]",
            "[ct]",
            "[cg]",
            "[lp]",
            "+",
            "#"

    );
    
    
    static List<CommandPVD> CommandsListSpanish = List.of(
            
        new CommandPVD("enviar mensaje de texto al usuario @ que diga @",1),
        new CommandPVD("mandar mensaje al usuario @ que diga @",1),
        new CommandPVD("enviar un texto al usuario @ que diga @",1),
        new CommandPVD("mandar un sms de texto al usuario @ que diga @",1),
        new CommandPVD("enviar mensaje a @ con el texto @",1),
        new CommandPVD("mandar mensaje privado a @ que diga @",1),

        new CommandPVD("mandar mensaje que diga @",2),
        new CommandPVD("enviar mensaje que diga @",2),
        new CommandPVD("escribir mensaje que diga @",2),
        new CommandPVD("mandar un mensaje que diga @",2),
        new CommandPVD("enviar un mensaje que diga @",2),
        new CommandPVD("escribir un mensaje que diga @",2),
        new CommandPVD("mandar mensaje diciendo @",2),
        new CommandPVD("enviar mensaje diciendo @",2),
        new CommandPVD("escribir mensaje diciendo @",2),
        new CommandPVD("mandar un mensaje diciendo @",2),
        new CommandPVD("enviar un mensaje diciendo @",2),
        new CommandPVD("escribir un mensaje diciendo @",2),
        new CommandPVD("mandar un texto que diga @",2),
        new CommandPVD("enviar un texto que diga @",2),
        new CommandPVD("escribir un texto que diga @",2),
        new CommandPVD("mandar texto que diga @",2),
        new CommandPVD("enviar texto que diga @",2),
        new CommandPVD("escribir texto que diga @",2),
        new CommandPVD("mandar texto diciendo @",2),
        new CommandPVD("enviar texto diciendo @",2),
        new CommandPVD("escribir texto diciendo @",2),
        new CommandPVD("mandar mensaje con @",2),
        new CommandPVD("enviar mensaje con @",2),
        new CommandPVD("escribir mensaje con @",2),
        new CommandPVD("mandar un mensaje con @",2),
        new CommandPVD("enviar un mensaje con @",2),
        new CommandPVD("escribir un mensaje con @",2),
        new CommandPVD("mandar mensaje con el texto @",2),
        new CommandPVD("enviar mensaje con el texto @",2),
        new CommandPVD("escribir mensaje con el texto @",2),

        new CommandPVD("entrar a mi perfil", 4),
        new CommandPVD("abrir mi perfil", 4),
        new CommandPVD("acceder a mi perfil", 4),
        new CommandPVD("ir a mi perfil", 4),
        new CommandPVD("ver mi perfil", 4),
        new CommandPVD("mostrar mi perfil", 4),
        new CommandPVD("ingresar a mi perfil", 4),
        new CommandPVD("ir al perfil", 4),
        new CommandPVD("entrar al perfil", 4),
        new CommandPVD("abrir el perfil", 4),
        new CommandPVD("acceder al perfil", 4),
        new CommandPVD("mostrar el perfil", 4),
        new CommandPVD("ver el perfil", 4),
        new CommandPVD("ingresar al perfil", 4),
        new CommandPVD("ver mi cuenta", 4),
        new CommandPVD("abrir perfil", 4),
        new CommandPVD("ver perfil", 4),
        new CommandPVD("mostrar perfil", 4),
        new CommandPVD("acceder perfil", 4),


        new CommandPVD("ir al perfil del usuario @", 5),
        new CommandPVD("entrar al perfil del usuario @", 5),
        new CommandPVD("abrir el perfil del usuario @", 5),
        new CommandPVD("acceder al perfil del usuario @", 5),
        new CommandPVD("mostrar el perfil del usuario @", 5),
        new CommandPVD("ver el perfil del usuario @", 5),
        new CommandPVD("ingresar al perfil del usuario @", 5),
        new CommandPVD("ver cuenta del usuario @", 5),
        new CommandPVD("abrir cuenta del usuario @", 5),
        new CommandPVD("mostrar cuenta del usuario @", 5),


        new CommandPVD("buscar perfil de @", 6),
        new CommandPVD("buscar usuario @", 6),
        new CommandPVD("buscar cuenta de @", 6),
        new CommandPVD("encontrar perfil de @", 6),
        new CommandPVD("buscar persona llamada @", 6),
        new CommandPVD("buscar al contacto @", 6),
        new CommandPVD("buscar a @", 6),
        
        
        new CommandPVD("buscar perfil del usuario @", 6),
        new CommandPVD("buscar cuenta del usuario @", 6),
        new CommandPVD("buscar información de @", 6),
        new CommandPVD("buscar datos de @", 6),
        new CommandPVD("buscar contacto de @", 6),
        new CommandPVD("buscar a la persona @", 6),
        new CommandPVD("buscar al usuario llamado @", 6),
        new CommandPVD("buscar usuario llamado @", 6),
        new CommandPVD("buscar al perfil @", 6),
        new CommandPVD("buscar usuario de nombre @", 6),
        new CommandPVD("buscar a mi contacto @", 6),
        new CommandPVD("buscar usuario con nombre @", 6),
        new CommandPVD("buscar perfil del contacto @", 6),
        new CommandPVD("buscar cuenta del contacto @", 6),
        new CommandPVD("buscar registro de @", 6),
        new CommandPVD("buscar datos del perfil de @", 6),
        new CommandPVD("buscar al usuario @ en el sistema", 6),

      
        new CommandPVD("leer pantalla", 7),
        new CommandPVD("leer la pantalla", 7),
        new CommandPVD("leer lo que hay en pantalla", 7),
        new CommandPVD("leer lo que dice la pantalla", 7),
        new CommandPVD("leer texto en pantalla", 7),
        new CommandPVD("leer el contenido de la pantalla", 7),
        new CommandPVD("leer todo en pantalla", 7),
        new CommandPVD("leer mensaje en pantalla", 7),
        new CommandPVD("leer lo mostrado en pantalla", 7),
        new CommandPVD("leer información en pantalla", 7),
        new CommandPVD("leer lo que aparece en pantalla", 7),
        new CommandPVD("leer la informacion de la pantalla", 7),
        new CommandPVD("leer el texto de la pantalla", 7),
        new CommandPVD("repetir lo que esta en pantalla", 7),
        new CommandPVD("narrar lo que hay en pantalla", 7),
        new CommandPVD("decir lo que hay en pantalla", 7),
        new CommandPVD("leer la pantalla completa", 7),
        new CommandPVD("leer lo que muestra la pantalla", 7),
        new CommandPVD("leer visualizacion de la pantalla", 7),
        new CommandPVD("leer datos de la pantalla", 7),


        new CommandPVD("ver al chat del usuario @", 8),
        new CommandPVD("entrar al chat del usuario @", 8),
        new CommandPVD("abrir el chat del usuario @", 8),
        new CommandPVD("ir al chat del usuario @", 8),
        new CommandPVD("acceder al chat del usuario @", 8),
        new CommandPVD("ingresar al chat del usuario @", 8),
        new CommandPVD("abrir conversacion con @", 8),
        new CommandPVD("entrar a la conversacion con @", 8),
        new CommandPVD("ir a la conversación con @", 8),
        new CommandPVD("abrir chat con @", 8),
        new CommandPVD("entrar al chat con @", 8),
        new CommandPVD("acceder al chat con @", 8),
        new CommandPVD("abrir el chat con @", 8),
        new CommandPVD("ver el chat con @", 8),
        new CommandPVD("abrir mensaje con @", 8),
        new CommandPVD("entrar al mensaje con @", 8),
        new CommandPVD("abrir chat privado con @", 8),
        new CommandPVD("ir al chat privado con @", 8),
        new CommandPVD("entrar a la conversación privada con @", 8),
        new CommandPVD("abrir conversación privada con @", 8),
        new CommandPVD("acceder a la conversación de @", 8),

        
        new CommandPVD("abrir configuracion", 9),
        new CommandPVD("abrir la configuracion", 9),
        new CommandPVD("abrir ajustes", 9),
        new CommandPVD("abrir los ajustes", 9),
        new CommandPVD("entrar a configuracion", 9),
        new CommandPVD("entrar a la configuracion", 9),
        new CommandPVD("entrar a ajustes", 9),
        new CommandPVD("entrar a los ajustes", 9),
        new CommandPVD("ir a configuracion", 9),
        new CommandPVD("ir a la configuracion", 9),
        new CommandPVD("ir a ajustes", 9),
        new CommandPVD("ir a los ajustes", 9),
        new CommandPVD("abrir panel de configuracion", 9),
        new CommandPVD("abrir el panel de configuracion", 9),
        new CommandPVD("abrir panel de ajustes", 9),
        new CommandPVD("abrir el panel de ajustes", 9),
        new CommandPVD("mostrar configuracion", 9),
        new CommandPVD("mostrar la configuracion", 9),
        new CommandPVD("mostrar ajustes", 9),
        new CommandPVD("mostrar los ajustes", 9),

        
        new CommandPVD("Enviar a pagina principal", 11),
        new CommandPVD("Retroceder a pagina principal", 11),
        new CommandPVD("Volver a pagina principal", 11),
        new CommandPVD("Regresar a pagina principal", 11),
        new CommandPVD("Ir a pagina principal", 11),
        new CommandPVD("Ir a la pagina principal", 11),
        new CommandPVD("Vuelve a la pagina principal", 11),
        new CommandPVD("Regresa a la pagina principal", 11),
        new CommandPVD("Retornar a pagina principal", 11),
        new CommandPVD("Retornar a la pagina principal", 11),
        new CommandPVD("Llevar a pagina principal", 11),
        new CommandPVD("Llevar a la pagina principal", 11),
        new CommandPVD("Enviar a la pagina principal", 11),
        new CommandPVD("Ir pagina principal", 11),
        new CommandPVD("Volver pagina principal", 11),
        new CommandPVD("Regresar pagina principal", 11),
        new CommandPVD("Retornar pagina principal", 11)

    );    
    
    static List<CommandPVD> CommandsListEnglish = List.of(

        new CommandPVD("send a text message to user @ that says @", 1),
        new CommandPVD("send a message to user @ that says @", 1),
        new CommandPVD("send a text to user @ that says @", 1),
        new CommandPVD("send an sms to user @ that says @", 1),
        new CommandPVD("send message to @ with the text @", 1),
        new CommandPVD("send a private message to @ that says @", 1),

        new CommandPVD("send a message that says @", 2),
        new CommandPVD("send message that says @", 2),
        new CommandPVD("write a message that says @", 2),
        new CommandPVD("send a message saying @", 2),
        new CommandPVD("write a message saying @", 2),
        new CommandPVD("send a text that says @", 2),
        new CommandPVD("write a text that says @", 2),
        new CommandPVD("send a text saying @", 2),
        new CommandPVD("write a text saying @", 2),
        new CommandPVD("send message with @", 2),
        new CommandPVD("write message with @", 2),
        new CommandPVD("send a message with @", 2),
        new CommandPVD("write a message with @", 2),
        new CommandPVD("send message with the text @", 2),
        new CommandPVD("write message with the text @", 2),


        new CommandPVD("enter my profile", 4),
        new CommandPVD("open my profile", 4),
        new CommandPVD("access my profile", 4),
        new CommandPVD("go to my profile", 4),
        new CommandPVD("view my profile", 4),
        new CommandPVD("show my profile", 4),
        new CommandPVD("view my account", 4),
        new CommandPVD("open profile", 4),
        new CommandPVD("view profile", 4),
        new CommandPVD("show profile", 4),
        new CommandPVD("access profile", 4),

        new CommandPVD("go to the profile of user @", 5),
        new CommandPVD("enter the profile of user @", 5),
        new CommandPVD("open the profile of user @", 5),
        new CommandPVD("access the profile of user @", 5),
        new CommandPVD("show the profile of user @", 5),
        new CommandPVD("view the profile of user @", 5),
        new CommandPVD("view the account of user @", 5),
        new CommandPVD("open the account of user @", 5),
        new CommandPVD("show the account of user @", 5),

        new CommandPVD("search profile of @", 6),
        new CommandPVD("search user @", 6),
        new CommandPVD("search account of @", 6),
        new CommandPVD("find profile of @", 6),
        new CommandPVD("search person named @", 6),
        new CommandPVD("search contact @", 6),
        new CommandPVD("search @", 6),
        new CommandPVD("search profile of the user @", 6),
        new CommandPVD("search account of the user @", 6),
        new CommandPVD("search information of @", 6),
        new CommandPVD("search data of @", 6),
        new CommandPVD("search contact of @", 6),
        new CommandPVD("search the person @", 6),
        new CommandPVD("search the user named @", 6),
        new CommandPVD("search user named @", 6),
        new CommandPVD("search profile of the contact @", 6),
        new CommandPVD("search account of the contact @", 6),
        new CommandPVD("search record of @", 6),
        new CommandPVD("search profile data of @", 6),
        new CommandPVD("search the user @ in the system", 6),

        new CommandPVD("read screen", 7),
        new CommandPVD("read the screen", 7),
        new CommandPVD("read what is on screen", 7),
        new CommandPVD("read what the screen says", 7),
        new CommandPVD("read text on the screen", 7),
        new CommandPVD("read the content of the screen", 7),
        new CommandPVD("read everything on screen", 7),
        new CommandPVD("read the message on screen", 7),
        new CommandPVD("read what is displayed on screen", 7),
        new CommandPVD("read information on screen", 7),
        new CommandPVD("read what appears on screen", 7),
        new CommandPVD("read visualization of the screen", 7),
        new CommandPVD("read screen data", 7),

        new CommandPVD("view the chat of user @", 8),
        new CommandPVD("enter the chat of user @", 8),
        new CommandPVD("open the chat of user @", 8),
        new CommandPVD("go to the chat of user @", 8),
        new CommandPVD("access the chat of user @", 8),
        new CommandPVD("open conversation with @", 8),
        new CommandPVD("enter the conversation with @", 8),
        new CommandPVD("go to the conversation with @", 8),
        new CommandPVD("open chat with @", 8),
        new CommandPVD("enter chat with @", 8),
        new CommandPVD("access chat with @", 8),
        new CommandPVD("view the chat with @", 8),
        new CommandPVD("open private chat with @", 8),
        new CommandPVD("go to the private chat with @", 8),
        new CommandPVD("enter the private conversation with @", 8),
        new CommandPVD("open private conversation with @", 8),
        new CommandPVD("access the conversation of @", 8),

        new CommandPVD("open settings", 9),
        new CommandPVD("open the settings", 9),
        new CommandPVD("open configuration", 9),
        new CommandPVD("open the configuration", 9),
        new CommandPVD("enter settings", 9),
        new CommandPVD("enter the settings", 9),
        new CommandPVD("go to settings", 9),
        new CommandPVD("go to the settings", 9),
        new CommandPVD("open settings panel", 9),
        new CommandPVD("open the settings panel", 9),
        new CommandPVD("show settings", 9),
        new CommandPVD("show the settings", 9),

        new CommandPVD("Send to main page", 11),
        new CommandPVD("Go back to main page", 11),
        new CommandPVD("Return to main page", 11),
        new CommandPVD("Go back to the main page", 11),
        new CommandPVD("Go to main page", 11),
        new CommandPVD("Go to the main page", 11),
        new CommandPVD("Go back to the main page", 11),
        new CommandPVD("Return to the main page", 11),
        new CommandPVD("Back to main page", 11),
        new CommandPVD("Back to the main page", 11),
        new CommandPVD("Take me to main page", 11),
        new CommandPVD("Take me to the main page", 11),
        new CommandPVD("Send to the main page", 11),
        new CommandPVD("Go main page", 11),
        new CommandPVD("Return main page", 11),
        new CommandPVD("Back main page", 11),
        new CommandPVD("Back to main page", 11)
    );

    
    private String command_voice;
    private String language;
    private JSONObject joData;

    //

    public CommandAppInf(String command_voice,String language)
    {
        setCommand_voice(command_voice);
        setLanguage(language);
        init();
    }
    
    private void init()
    {
        System.out.println("lenguaje= "+language);
        List<CommandPVD> CommandsList="es".equals(getLanguage())?CommandsListSpanish:CommandsListEnglish;
        System.out.println("comando= "+CommandsList.get(0).getCommand());

        String resultado=getCommand_voice();
        resultado=resultado.toLowerCase().trim();
        resultado=process_accents(resultado);
        resultado=process_cad(resultado);
        
        String [] vector_result=resultado.split(" ");
        System.out.println(resultado);

        for(String rr : vector_result)
        {
            System.out.println("Vector resultado: "+rr);
        }
        
        CommandPVD cpvd=null;
        int pos_aux=0;
        float similarity_metrix_aux=0f;
        int cont=0;
        JSONObject jsonObject = new JSONObject();
        Form form=null;
        Boolean correccion=false;
        Boolean type_obj=false;

        for(int x=0;x<2;x++)
        {
            String texto_aux=resultado;
           
            for(CommandPVD objpvd : CommandsList)
            {
                if(objpvd.type==1 && !correccion && type_obj==false){
                    type_obj=true;
                    texto_aux="";
                    for(int y=0;y<vector_result.length;y++)
                    {
                        if(objpvd.getP2()==y){
                            texto_aux+="@";
                            System.out.println("la frase quedo ="+texto_aux);
                            break;
                        }
                        texto_aux+=vector_result[y]+" ";
                    }
                    texto_aux=texto_aux.trim();
                }

                //System.out.println("texto_aux= "+texto_aux);

                StringMetric metric = StringMetrics.cosineSimilarity();
                float similarity = metric.compare(texto_aux, objpvd.getCommand());
                //System.out.println("Similitud: "+similarity);

                if(similarity>similarity_metrix_aux)
                {
                    similarity_metrix_aux=similarity;
                    pos_aux=cont;
                }
                cont++;
            }
                        
            if(similarity_metrix_aux<=0.60f && !"".equals(texto_aux.trim()))
            {                                
                System.out.println("La orden no cumple con el formato, se va a intentar mejorar la frase....");
                System.out.println("Valor= "+similarity_metrix_aux);

                form=new Form();
                form.param("phrase", texto_aux);
                form.param("language",getLanguage());

                JSONObject jo= ApiConverter.ApiMensajes(form,"/corrector_phrase/");
                resultado=jo.getString("data");
                System.out.println("Resultado mejorado1= "+resultado);
                if(type_obj) resultado=resultado+" @";
                System.out.println("Resultado mejorado2= "+resultado);
                vector_result=resultado.split(" ");
                correccion=true;
            }
            else break;            
        }
        
        try
        {
            System.out.println("similarity_metrix_aux= "+similarity_metrix_aux);
            if(similarity_metrix_aux<=0.60f)
                throw new IllegalStateException("La orden no cumple con el formato"); 
            
            cpvd=CommandsList.get(pos_aux);
            System.out.println("Este es el comando con mayor probabilidad= "+cpvd.command);
            
            String accion="";
            String usuario="";
            String mensaje="";
            
            if(cpvd.getType()==1)
            {
                System.out.println("Es mensaje de texto");
                accion="mensaje de texto";
                usuario=only_digits(vector_result[cpvd.getP1()]);
                //usuario=vector_result[cpvd.getP1()];
                //usuario=process_id_user(usuario);
                mensaje="";
                for(int x=cpvd.getP2();x<vector_result.length;x++)
                    mensaje+=vector_result[x]+" ";
                
                mensaje=mensaje.trim();
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                System.out.println("Mensaje= "+mensaje);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[ct]+{p}%s{p}+#+[mt]+{md}%s{md}", usuario,mensaje));
            }
            else if(cpvd.getType()==2)
            {
                System.out.println("Es mensaje desde el chat");
                accion="mensaje de texto";
                
                for(int x=cpvd.getP1();x<vector_result.length;x++)
                    mensaje+=vector_result[x]+" ";
                
                mensaje=mensaje.trim();
                System.out.println("Accion= "+accion);
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[mt]+{md}%s{md}", mensaje));
                
            }
            else if(cpvd.getType()==3) //ya no existe este tipo
            {
                System.out.println("Es mensaje de audio");
                accion="mensaje de audio";
                usuario=only_digits(vector_result[cpvd.getP1()]);
                //usuario=process_id_user(usuario);
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[ct]+{p}%s{p}+[ma]", usuario));
            }
            else if(cpvd.getType()==4)
            {
                System.out.println("Ver perfil del usuario host");
                accion=cpvd.getCommand();
                System.out.println("Accion= "+accion);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[pu]"));
                
            }
            else if(cpvd.getType()==5)
            {
                System.out.println("Perfil del usuario");
                accion="abrir perfil del usuario";
                usuario=only_digits(vector_result[cpvd.getP1()]);
                //usuario=process_id_user(usuario);
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[pu]+{p}%s{p}", usuario));
                
            }
            else if(cpvd.getType()==6)
            {
                /*if(cpvd.p1==-1){
                    System.out.println("Buscar Perfil de un usuario");
                    accion="buscar perfil de un usuario";
                    
                    jsonObject.put("type", cpvd.getType());
                    jsonObject.put("command_string", cpvd.getCommand());
                    jsonObject.put("command", String.format("[srch]"));
                    
                    
                }else{*/
                    System.out.println("Buscar Perfil de un usuario [user]");
                    accion="buscar perfil de un usuario [user]";
                    usuario=vector_result[cpvd.getP1()];
                    System.out.println("Accion= "+accion);
                    System.out.println("Usuario= "+usuario);
                    
                    jsonObject.put("type", cpvd.getType());
                    jsonObject.put("command_string", cpvd.getCommand());
                    jsonObject.put("command", String.format("[srch]+{p}%s{p}", usuario));
                //}
            }
            else if(cpvd.getType()==7)
            {
                System.out.println("Leer pantalla");
                accion="Leer pantalla";
                System.out.println("Accion= "+accion);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[lp]"));

            }
            else if(cpvd.getType()==8)
            {
                System.out.println("Abrir chat del usuario [user]");
                accion="abrir chat del usuario";
                usuario=vector_result[cpvd.getP1()];
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[ct]+{p}%s{p}", usuario));
                
            }
            else if(cpvd.getType()==9)
            {
                System.out.println("Abrir configuracion");
                accion="Abrir configuracion";
                System.out.println("Accion= "+accion);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("[cg]"));
            }
            else if(cpvd.getType()==11)
            {
                System.out.println("Retroceder a pantalla principal");
                accion="Retroceder a pantalla principal";
                System.out.println("Accion= "+accion);
                
                jsonObject.put("type", cpvd.getType());
                jsonObject.put("command_string", cpvd.getCommand());
                jsonObject.put("command", String.format("<<<"));

            }
            else{
                jsonObject.put("type", "n/a");
                jsonObject.put("command_string", "n/a");
                jsonObject.put("command", "[x]");
                throw new IllegalStateException("La orden no cumple con el formato"); 
                
            }
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
        
        setJoData(jsonObject);
        
    }
    
   
    private String only_digits(String cadena)
    {
        String s = cadena;
        String soloEnteros = s.replaceAll("\\D+", "");
        System.out.println(soloEnteros);
        return soloEnteros;
    }
    
      
    private String process_cad(String cadena)
    {
        String s = cadena;
        String cad = s.replaceAll("[^a-zA-Z0-9\\s]", "");
        System.out.println(cad);
        return cad;
    }
    
    
    @Deprecated
    private String process_id_user(String cad)
    {
        JSONObject jo=new JSONObject();
        jo.put("a", "0");
        jo.put("b", "1");
        jo.put("c", "2");
        jo.put("d", "3");
        jo.put("e", "4");
        jo.put("f", "5");
        jo.put("g", "6");
        jo.put("h", "7");
        jo.put("i", "8");
        jo.put("j", "9");
        
        char [] vec_tokens=cad.toCharArray();
        String data="";
        
        try{
            for(char c : vec_tokens)
            {
                data+=jo.getString(String.valueOf(c));
            }
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR= "+error);
            return "";
        }

        System.out.println("Data= "+data);
        return data;
    }
    
    private String process_accents(String cad)
    {
        String cadena=cad;
        cadena = Normalizer.normalize(cadena, Normalizer.Form.NFD);
        System.out.println(cadena);
        cadena = cadena.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        System.out.println(cadena);
        return cadena;
    }
    
    private int find_string_matches(String value)
    {
       String cadena=value;
       int cont=0;
       for(int x=0;x<cadena.toCharArray().length;x++)
       {
            int index=cadena.indexOf("@", x);
            if(index!=-1){
               cont++;
               x=index;
            }else
                break;
       }
       System.out.println("rencuento de subcadena= "+cont);
       return cont;
    }
    
    
    
    
}
