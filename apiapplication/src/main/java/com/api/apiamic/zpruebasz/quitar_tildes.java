/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.text.Normalizer;

/**
 *
 * @author Jhon (TheBlack)
 */
public class quitar_tildes {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        String s="buscar a um usuário";
        s = Normalizer.normalize(s, Normalizer.Form.NFD);
        System.out.println(s);
        s = s.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "");
        System.out.println(s);
    }
    
}
