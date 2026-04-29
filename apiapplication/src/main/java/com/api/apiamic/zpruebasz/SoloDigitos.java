/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

/**
 *
 * @author Jhon (TheBlack)
 */
public class SoloDigitos {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        String s = "ABC@@@@@$$$%%%#800.45!xyz";
        String soloEnteros = s.replaceAll("\\D+", "");
        System.out.println(soloEnteros); // "80045"
    }
    
}
