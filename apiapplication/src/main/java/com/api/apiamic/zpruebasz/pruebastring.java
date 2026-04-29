/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebastring {

    private static final String prefixmsgtempsinprocesar="_temp";

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)
    {
        String pepa1="hola1";
        String pepa2="hola2";
        pepa1=pepa1+prefixmsgtempsinprocesar;
        
        System.out.println(pepa1);
        System.out.println(pepa2);

        System.out.println(pepa1.contains("_temp"));
        System.out.println(pepa2.contains("_temp"));
        
        System.out.println(pepa1.replaceAll("_temp", ""));
        System.out.println(pepa2.replaceAll("_temp", ""));
    }
    
}
