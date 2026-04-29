/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author Jhon (TheBlack)
 */
public class PruebaMap {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        Map<String,String> mapaprueba=new HashMap<>();
        mapaprueba.put("key1", "prueba1");
        mapaprueba.put("key2", "prueba2");
        mapaprueba.put("key3", "prueba3");
        
        
        System.out.println(mapaprueba.get("key1"));
        System.out.println(mapaprueba.get("key2"));
        System.out.println(mapaprueba.get("key3"));
        System.out.println(mapaprueba.get("key4"));
        
        if(mapaprueba.get("key4")==null)
        {
            System.out.println("Esa clave no existe");
        }


    }
    
}
