/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.util.HashSet;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebahashset {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        HashSet<String> subscribeset = new HashSet<>();
        subscribeset.add("user123");
        subscribeset.add("user1234");
        subscribeset.add("user12345");
        
        System.out.println(subscribeset.contains("user123"));
        System.out.println(subscribeset.contains("user1234"));
        System.out.println(subscribeset.contains("user12345"));
        System.out.println(subscribeset.contains("sssss"));
        
        System.out.println(subscribeset.size());
        subscribeset.removeIf(x-> x.equals("user123"));
        System.out.println(subscribeset.size());
        System.out.println(subscribeset.contains("user123"));


    }
    
}
