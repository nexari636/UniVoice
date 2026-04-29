/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.util.Arrays;
import java.util.List;
import java.util.stream.IntStream;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebaFilter {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
                
        String command="enviar mensaje de texto al usuario @ que diga @";
        List<String> lstcad=Arrays.asList(command.split(" "));
        int [] pos=IntStream.range(0,lstcad.size()).filter(x->lstcad.get(x).equals("@")).toArray();
        
        for(int x: pos){
            System.out.println("Posiciones= "+x);
        }
    }
    
}
