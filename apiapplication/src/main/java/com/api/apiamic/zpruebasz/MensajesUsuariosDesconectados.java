/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.encryptString;
import com.api.apiamic.websocketconfig.DataMensaje;
import com.api.apiamic.websocketconfig.StoreUsers;
import com.api.apiamic.websocketconfig.User;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Jhon (TheBlack)
 */
public class MensajesUsuariosDesconectados {

    /**
     * @param args the command line arguments
     */
    
    public static Map<String,DataMensaje> mapmensajetemp;
    public static StoreUsers userstores;
    
    public static void main(String[] args) throws InterruptedException 
    {
        mapmensajetemp=new HashMap<>();
        userstores=new StoreUsers();

        User user1 = new User(1L, 101L, "juan.perez@example.com", "pass1234","Juan", "Perez", "juanp", "key123");
        User user2 = new User(2L, 102L, "ana.lopez@example.com", "secure456","Ana", "Lopez", "analo", "key456");
        User user3 = new User(3L, 103L, "carlos.ramirez@example.com", "abc987","Carlos", "Ramirez", "carlitos", "key789");
        User user4 = new User(4L, 104L, "maria.sanchez@example.com", "mypass","Maria", "Sanchez", "marias", "key321");
        User user5 = new User(5L, 105L, "luis.garcia@example.com", "qwerty","Luis", "Garcia", "luisg", "key654");        
        
 
        
        DataMensaje m1 = new DataMensaje("x8L9aV2bQp", "n0Fk3sZ1Ut", "ana@example.com", true,
                                 1, 5, true, "u9kD3wLsPz","sdfsdf");
        
        enviarMensaje(user1,m1);
        Thread.sleep(2000);
        eventConnectionUser(user1);
        eventConnectionUser(user2);

    }

 
    private static boolean filterUserConnectionMessage(Long id,DataMensaje dm) 
    {
        if(userstores.getUserByID(id)!=null)
        {
            System.out.println("El usuario esta conectado");
            
            if(dm==null)
            {
                DataMensaje dmr=mapmensajetemp.get(encryptString.textEncryptor(id.toString()));
                
                if(dmr!=null)
                {
                    System.out.println("Enviando mensaje.....");
                    System.out.println(String.format("Enviando mensaje por websocket a la url %s/%s/%s/%s/%s", "user",encryptString.textEncryptor(id.toString()),"queue","messages","data") );
                }
                else
                {
                    System.out.println("El usuario no tiene mensajes en cola");
                }
                //logica para enviar por web socket
            }
            return false;
        }
        else
        {
            System.out.println("Como el usuario esta desconectado el mensaje se guardara temporalmente en la cola para su envio en su coenxion posteriror");
            mapmensajetemp.put(encryptString.textEncryptor(id.toString()), dm);
            return true;
        }        
    }
    
    private static void eventConnectionUser(User user) 
    {
        userstores.addUser(user);
        filterUserConnectionMessage(user.getId(),null);        
    }
    
    private static void enviarMensaje(User user,DataMensaje dm) 
    {
        filterUserConnectionMessage(user.getId(),dm);
    }
 
    
}
