/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;
import java.util.stream.IntStream;
import lombok.Getter;
import lombok.Setter;
import org.simmetrics.StringMetric;
import org.simmetrics.metrics.StringMetrics;
/**
 *
 * @author Jhon (TheBlack)
 */
//PVD= position vector data
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

public class PruebaCommandsAPP 
{
    //{md} --> data
    //[mt] --> mensaje de texto
    //[ma] --> mensaje de audio
    //{p} --> usuario
    //>>> --> avanzar entre pestañas o entrar a una
    //<<< --> retroceder entre pestañas
    //[srch] --> busqueda
    //[ct] --> chat
    //[pu] --> perfil de usuario
    //[lp] --> leer pantalla
    //+ --> separador
    static List<String> RulesList = List.of(
            "{md}",
            "[mt]",
            "[ma]",
            "{p}", 
            ">>>", 
            "<<<",
            "[pu]",
            "[srch]",
            "[ct]",
            "[lp]",
            "+"
    );
    
    static List<CommandPVD> CommandsList = List.of(
            new CommandPVD("enviar mensaje de texto al usuario @ que diga @",1),
            new CommandPVD("mandar mensaje al usuario @ que diga @",1),
            new CommandPVD("enviar un texto al usuario @ que diga @",1),
            new CommandPVD("mandar un sms de texto al usuario @ que diga @",1),
            new CommandPVD("enviar mensaje a @ con el texto @",1),
            new CommandPVD("mandar mensaje privado a @ que diga @",1),
            
            new CommandPVD("mandar mensaje que diga @",1),
            new CommandPVD("enviar mensaje que diga @",1),
            new CommandPVD("escribir mensaje que diga @",1),
            new CommandPVD("mandar un mensaje que diga @",1),
            new CommandPVD("enviar un mensaje que diga @",1),
            new CommandPVD("escribir un mensaje que diga @",1),
            new CommandPVD("mandar mensaje diciendo @",1),
            new CommandPVD("enviar mensaje diciendo @",1),
            new CommandPVD("escribir mensaje diciendo @",1),
            new CommandPVD("mandar un mensaje diciendo @",1),
            new CommandPVD("enviar un mensaje diciendo @",1),
            new CommandPVD("escribir un mensaje diciendo @",1),
            new CommandPVD("mandar un texto que diga @",1),
            new CommandPVD("enviar un texto que diga @",1),
            new CommandPVD("escribir un texto que diga @",1),
            new CommandPVD("mandar texto que diga @",1),
            new CommandPVD("enviar texto que diga @",1),
            new CommandPVD("escribir texto que diga @",1),
            new CommandPVD("mandar texto diciendo @",1),
            new CommandPVD("enviar texto diciendo @",1),
            new CommandPVD("escribir texto diciendo @",1),
            new CommandPVD("mandar mensaje con @",1),
            new CommandPVD("enviar mensaje con @",1),
            new CommandPVD("escribir mensaje con @",1),
            new CommandPVD("mandar un mensaje con @",1),
            new CommandPVD("enviar un mensaje con @",1),
            new CommandPVD("escribir un mensaje con @",1),
            new CommandPVD("mandar mensaje con el texto @",1),
            new CommandPVD("enviar mensaje con el texto @",1),
            new CommandPVD("escribir mensaje con el texto @",1),

            
            new CommandPVD("enviar mensaje de audio al usuario @",2),
            new CommandPVD("mandar mensaje de audio al usuario @",2),
            new CommandPVD("enviar una nota de voz al usuario @",2),
            new CommandPVD("mandar nota de voz al usuario @",2),
            new CommandPVD("enviar audio a @",2),
            new CommandPVD("mandar mensaje de voz privado a @",2),
            new CommandPVD("enviar nota de voz a @",2),
            new CommandPVD("mandar audio a @",2),
            
            new CommandPVD("entrar al perfil del usuario", 3),
            new CommandPVD("abrir el perfil del usuario", 3),
            new CommandPVD("ver el perfil del usuario", 3),
            new CommandPVD("mostrar el perfil del usuario", 3),
            new CommandPVD("ir al perfil del usuario", 3),
            new CommandPVD("acceder al perfil del usuario", 3),
            new CommandPVD("ingresar al perfil del usuario", 3),
            new CommandPVD("abrir perfil de usuario", 3),
            new CommandPVD("ver perfil de usuario", 3),
            new CommandPVD("mostrar perfil de usuario", 3),
            
            new CommandPVD("ir al perfil de @", 4),
            new CommandPVD("abrir perfil de @", 4),
            new CommandPVD("ver perfil de @", 4),
            new CommandPVD("mostrar perfil de @",4),
            new CommandPVD("ingresar al perfil de @",4),
            new CommandPVD("acceder al perfil de @", 4),
            new CommandPVD("abrir la cuenta de @", 4),
            new CommandPVD("ver la cuenta de @", 4),
            new CommandPVD("ir a la cuenta de @", 4),
            new CommandPVD("entrar a la cuenta de @", 4),
            
            new CommandPVD("buscar usuario", 5),
            new CommandPVD("buscar al usuario", 5),
            new CommandPVD("buscar a un usuario", 5),
            new CommandPVD("buscar una persona", 5),
            new CommandPVD("buscar contacto", 5),
            new CommandPVD("buscar a un contacto", 5),
            new CommandPVD("encontrar usuario", 5),
            new CommandPVD("encontrar al usuario", 5),
            new CommandPVD("localizar usuario", 5),
            new CommandPVD("localizar al usuario", 5),
            new CommandPVD("buscar perfil", 5),
            new CommandPVD("buscar el perfil", 5),
            new CommandPVD("buscar perfil de @", 5),
            new CommandPVD("buscar usuario @", 5),
            new CommandPVD("buscar cuenta de @", 5),
            new CommandPVD("encontrar perfil de @", 5),
            new CommandPVD("buscar nombre de usuario", 5),
            new CommandPVD("buscar persona llamada @", 5),
            new CommandPVD("buscar al contacto @", 5),
            new CommandPVD("buscar a @", 5),

            new CommandPVD("leer pantalla", 6),
            new CommandPVD("leer la pantalla", 6),
            new CommandPVD("leer lo que hay en pantalla", 6),
            new CommandPVD("leer lo que dice la pantalla", 6),
            new CommandPVD("leer texto en pantalla", 6),
            new CommandPVD("leer el contenido de la pantalla", 6),
            new CommandPVD("leer todo en pantalla", 6),
            new CommandPVD("leer mensaje en pantalla", 6),
            new CommandPVD("leer lo mostrado en pantalla", 6),
            new CommandPVD("leer información en pantalla", 6),
            new CommandPVD("leer lo que aparece en pantalla", 6),
            new CommandPVD("leer la información de la pantalla", 6),
            new CommandPVD("leer el texto de la pantalla", 6),
            new CommandPVD("repetir lo que está en pantalla", 6),
            new CommandPVD("narrar lo que hay en pantalla", 6),
            new CommandPVD("decir lo que hay en pantalla", 6),
            new CommandPVD("leer la pantalla completa", 6),
            new CommandPVD("leer lo que muestra la pantalla", 6),
            new CommandPVD("leer visualización de la pantalla", 6),
            new CommandPVD("leer datos de la pantalla", 6),


            new CommandPVD("ver al chat del usuario @", 7),
            new CommandPVD("entrar al chat del usuario @", 7),
            new CommandPVD("abrir el chat del usuario @", 7),
            new CommandPVD("ir al chat del usuario @", 7),
            new CommandPVD("acceder al chat del usuario @", 7),
            new CommandPVD("ingresar al chat del usuario @", 7),
            new CommandPVD("abrir conversación con @", 7),
            new CommandPVD("entrar a la conversación con @", 7),
            new CommandPVD("ir a la conversación con @", 7),
            new CommandPVD("abrir chat con @", 7),
            new CommandPVD("entrar al chat con @", 7),
            new CommandPVD("acceder al chat con @", 7),
            new CommandPVD("abrir el chat con @", 7),
            new CommandPVD("ver el chat con @", 7),
            new CommandPVD("abrir mensaje con @", 7),
            new CommandPVD("entrar al mensaje con @", 7),
            new CommandPVD("abrir chat privado con @", 7),
            new CommandPVD("ir al chat privado con @", 7),
            new CommandPVD("entrar a la conversación privada con @", 7),
            new CommandPVD("abrir conversación privada con @", 7),
            new CommandPVD("acceder a la conversación de @", 7)



    );

    
    
    //static List<String> MessageTextCommandsList = List.of("enviar mensaje de texto","mensaje de texto","enviar texto mensaje","mandar mensaje de texto","enviar sms de texto","mandar sms de texto","enviar texto","mandar texto","send text message","text message","send message text","send sms text","send sms message","text","send text","text someone");
    //static List<String> MessageAudioCommandsList = List.of("enviar mensaje de audio","mensaje de audio","enviar audio mensaje","mandar mensaje de audio","enviar nota de voz","mandar nota de voz","enviar audio","mandar audio","send audio message","audio message","send voice message","send voice note","send audio","send voice","record audio","record voice message");    
    //static List<String> UserCommandsList = List.of("usuario","usuarios","persona","personas","user","users","persona","people");
    //static List<String> MessageDataCommandsList = List.of("usuario","usuarios","persona","personas","user","users","persona","people");

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        init();
    }
    
    private static void init()
    {
        //String resultado="mandar mensaje que diga";
        String resultado="Enviar mensaje de audio al usuario jhon19 que diga La computación es la ciencia y tecnología de los procesos de cálculo, procesamiento, almacenamiento y transmisión de datos realizados por máquinas, como los computadores, mediante el uso de algoritmos, hardware y software. Su objetivo principal es transformar datos brutos en información útil, facilitando la resolución de problemas complejos en diversas áreas como la ingeniería, la ciencia y la gestión empresarial.";
        resultado=resultado.toLowerCase();
        String [] vector_result=resultado.split(" ");
        System.out.println(resultado);
        
        //System.out.println("Secuencia= "+resultado.contains("enviar mensaje de texto"))
        //boolean mensajeTexto=MessageTextCommandsList.stream().anyMatch(resultado::contains);
        
        String texto1 = resultado;
        String texto2 = "mandar texto mensaje";
        CommandPVD cpvd=null;
        int pos_aux=0;
        float similarity_metrix_aux=0f;
        int cont=0;
        String texto_aux=texto1;
        JsonObject jsonObject = new JsonObject();
        
        for(CommandPVD objpvd : CommandsList)
        {
            if(objpvd.type==1){
                texto_aux="";
                for(int y=0;y<vector_result.length;y++)
                {
                    if(objpvd.getP2()==y){
                        texto_aux+="@";
                        break;
                    }
                    texto_aux+=vector_result[y]+" ";
                }
                texto_aux=texto_aux.trim();
            }
            
            System.out.println("texto_aux= "+texto_aux);
            
            StringMetric metric = StringMetrics.cosineSimilarity();
            float similarity = metric.compare(texto_aux, objpvd.getCommand());
            System.out.println("Similitud: "+similarity);
            
            if(similarity>similarity_metrix_aux)
            {
                similarity_metrix_aux=similarity;
                pos_aux=cont;
            }
            cont++;
        }
        
        try
        {
            System.out.println("similarity_metrix_aux= "+similarity_metrix_aux);
            if(similarity_metrix_aux<=0.70f)
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
                usuario=vector_result[cpvd.getP1()];
                mensaje="";
                for(int x=cpvd.getP2();x<vector_result.length;x++)
                {
                    mensaje+=vector_result[x]+" ";
                }
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                System.out.println("Mensaje= "+mensaje);
                
                jsonObject.addProperty("type", cpvd.getType());
                jsonObject.addProperty("command_string", cpvd.getCommand());
                jsonObject.addProperty("command", String.format("[ct]+{p}%s{p}+[mt]+{md}%s{md}", usuario,mensaje));
            }
            else if(cpvd.getType()==2)
            {
                System.out.println("Es mensaje de audio");
                accion="mensaje de audio";
                usuario=vector_result[cpvd.getP1()];
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                
                jsonObject.addProperty("type", cpvd.getType());
                jsonObject.addProperty("command_string", cpvd.getCommand());
                jsonObject.addProperty("command", String.format("[ct]+{p}%s{p}+[ma]", usuario));
            }
            else if(cpvd.getType()==3)
            {
                System.out.println("Ver perfil del usuario host");
                accion=cpvd.getCommand();
                System.out.println("Accion= "+accion);
                
                jsonObject.addProperty("type", cpvd.getType());
                jsonObject.addProperty("command_string", cpvd.getCommand());
                jsonObject.addProperty("command", String.format("[pu]", usuario));
                
            }
            else if(cpvd.getType()==4)
            {
                System.out.println("Perfil del usuario");
                accion="abrir perfil del usuario";
                usuario=vector_result[cpvd.getP1()];
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                
                jsonObject.addProperty("type", cpvd.getType());
                jsonObject.addProperty("command_string", cpvd.getCommand());
                jsonObject.addProperty("command", String.format(">>>+[pu]+{p}%s{p}", usuario));
                
            }
            else if(cpvd.getType()==5)
            {
                if(cpvd.p1==0){
                    System.out.println("Buscar Perfil de un usuario");
                    accion="buscar perfil de un usuario";
                    
                    jsonObject.addProperty("type", cpvd.getType());
                    jsonObject.addProperty("command_string", cpvd.getCommand());
                    jsonObject.addProperty("command", String.format("[srch]"));
                    
                    
                }else{
                    System.out.println("Buscar Perfil de un usuario [user]");
                    accion="buscar perfil de un usuario [user]";
                    usuario=vector_result[cpvd.getP1()];
                    System.out.println("Accion= "+accion);
                    System.out.println("Usuario= "+usuario);
                    
                    jsonObject.addProperty("type", cpvd.getType());
                    jsonObject.addProperty("command_string", cpvd.getCommand());
                    jsonObject.addProperty("command", String.format("[srch]+{p}%s{p}", usuario));
                }
            }
            else if(cpvd.getType()==6)
            {
                System.out.println("Leer pantalla");
                accion="Leer pantalla";
                System.out.println("Accion= "+accion);
                
                jsonObject.addProperty("type", cpvd.getType());
                jsonObject.addProperty("command_string", cpvd.getCommand());
                jsonObject.addProperty("command", String.format("[lp]"));

            }
            else if(cpvd.getType()==7)
            {
                System.out.println("Abrir chat del usuario [user]");
                accion="abrir chat del usuario";
                usuario=vector_result[cpvd.getP1()];
                System.out.println("Accion= "+accion);
                System.out.println("Usuario= "+usuario);
                
                jsonObject.addProperty("type", cpvd.getType());
                jsonObject.addProperty("command_string", cpvd.getCommand());
                jsonObject.addProperty("command", String.format("[ct]+{p}%s{p}", usuario));
                
            }
            else{
                throw new IllegalStateException("La orden no cumple con el formato"); 
            }
            
            /*if(MessageTextCommandsList.stream().anyMatch(resultado::contains))
            {
              
            }
            else if(MessageAudioCommandsList.stream().anyMatch(resultado::contains))
            {

            }
            else{
               throw new IllegalStateException("La orden no cumple con el formato"); 
            }*/
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            
        }
        /*for(String commandmain : MainActionCommandsList)
        {
            int pos=resultado.indexOf(commandmain);
            System.out.println("Comando= "+commandmain+" Posicion= "+pos);
            
            if(pos>=0)
            {
                String accion=resultado.substring(pos,pos+commandmain.length());
                System.out.println("Accion= "+accion);
                break;
            }
            
        }*/
      
        
    }
    
    
}
