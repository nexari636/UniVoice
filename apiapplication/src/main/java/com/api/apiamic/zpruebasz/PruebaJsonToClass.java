/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.ManagementFile;
import com.api.apiamic.utils.dateCurrent;
import com.api.apiamic.websocketconfig.MessageUser;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.json.JSONObject;

/**
 *
 * @author Jhon (TheBlack)
 */
public class PruebaJsonToClass {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws ParseException 
    {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        System.out.println(sdf.format(dateCurrent.getDateCurrent()));

        
        String data=ManagementFile.LeerTxt("archivos", "pepa.txt");
        System.out.println(data);
        
        Gson gson = new Gson();
        MessageUser message = gson.fromJson(data, MessageUser.class);
        
        System.out.println(message.getUseremisor().getId());
        System.out.println(message.getUseremisor().getNombres());
        System.out.println(message.getUseremisor().getApellidos());
        System.out.println(message.getUseremisor().getUsername());
        System.out.println(message.getUseremisor().getPassword());

        System.out.println(message.getExtencion());
        System.out.println(message.getIdgrupo().toString());
        System.out.println(message.getIdtipomensaje());
        System.out.println(message.getUserobjetivos()[0]);
        //System.out.println(message.getUserobjetivos()[1]);
        //System.out.println(message.getUserobjetivos()[2]);

        //System.out.println(message.getTimestamp());
        System.out.println(message.getMensaje_texto());
        
        
        String jsondata=gson.toJson(message);
        System.out.println("chamadre");
        System.out.println(jsondata);
        
        JsonObject jsonObject = JsonParser.parseString(jsondata).getAsJsonObject();
        System.out.println(jsonObject.get("idmensaje").getAsInt());
    }
    
}
