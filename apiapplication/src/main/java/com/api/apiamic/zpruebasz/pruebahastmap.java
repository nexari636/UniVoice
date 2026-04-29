/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.websocketconfig.DataMensaje;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebahastmap 
{
    public static void main(String[] args) 
    {
        Map<String, List<DataMensaje>> mapaUsuarios = new ConcurrentHashMap<>();
        mapaUsuarios.put("user1",Collections.synchronizedList(new ArrayList<>()));
        mapaUsuarios.get("user1").add(new DataMensaje("hola","45","ddd@ddd.com",false,0,0,false,"",""));
        mapaUsuarios.get("user1").add(new DataMensaje("hola","45","ddd@ddd.com",false,0,0,false,"",""));

        System.out.println(mapaUsuarios.get("user1").size());
        mapaUsuarios.get("user1").clear();
        mapaUsuarios.get("user1").add(new DataMensaje("hola","45","ddd@ddd.com",false,0,0,false,"",""));
        System.out.println(mapaUsuarios.get("user1").size());
        
        
        System.out.println("EXISTE Y NO EXISTE");
        System.out.println(mapaUsuarios.containsKey("user1"));
        System.out.println(mapaUsuarios.containsKey("user1sdfsfsd"));
        
        
        List<DataMensaje> lll= mapaUsuarios.get("user1");
        System.out.println("Siiii= "+lll.size());
        lll.clear();
        System.out.println("Siiii= "+lll.size());
        System.out.println("Siiii= "+mapaUsuarios.get("user1").size());

        Map<String, String> mapapruebastring = new HashMap<>();
        String key="45df/'<<<>>><<+´++*****//@";
        mapapruebastring.put(key, "d793e7715231fe18fee49ba33393d22253c72e58cd99dfb34023579ab3aeb45e");
        System.out.println(mapapruebastring.containsKey(key));
        System.out.println(mapapruebastring.get(key));
    
    }
}
