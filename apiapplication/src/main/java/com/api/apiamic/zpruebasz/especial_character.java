/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

/**
 *
 * @author Jhon (TheBlack)
 */
public class especial_character {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String s = "buscar a um usuário";
        String soloEnteros = s.replaceAll("[^a-zA-Z0-9\\s]", "");
        System.out.println(soloEnteros); // "80045"
    }
    
}
