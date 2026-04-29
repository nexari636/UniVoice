/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebalista {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        List<String> lista = new ArrayList<>();
        lista.add("Manzana");
        lista.add("Banana");
        lista.add("Cereza");

        for (String fruta : lista) {
            System.out.println(fruta);
        }
        
        lista.remove(0);
        System.out.println("**********************");

           for (String fruta : lista) {
            System.out.println(fruta);
        }
        List<String> listaprueba = new ArrayList<>();
        System.out.println("Prueba lista= "+listaprueba.size());
        
    }
    
}
