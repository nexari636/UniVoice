/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.ManagementFile;
import java.util.Base64;
import org.json.JSONObject;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebaescriturajsonobje {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("username", "developer");
        jsonObject.put("isActive", true);
        
        System.out.println(jsonObject.toString());
        
        System.out.println(ManagementFile.escribir("archivos", "bin", Base64.getEncoder().encode(jsonObject.toString().getBytes())));
        System.out.println(ManagementFile.escribir("archivos", "bin", jsonObject.toString().getBytes()));
        
        String texto="3pNNK9qPnfjRWs+tSg==";
        System.out.println(ManagementFile.escribir("archivos", "bin", ManagementFile.Base64ToBytes(texto)));

    }
    
}
