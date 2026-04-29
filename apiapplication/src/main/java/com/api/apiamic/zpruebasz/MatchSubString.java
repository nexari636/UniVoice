/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

/**
 *
 * @author Jhon (TheBlack)
 */
public class MatchSubString {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       String cadena="enviar mensaje @@ de texto al usuario @ que diga @";
       
       System.out.println(cadena.indexOf("@", 40));
       int cont=0;
       
       for(int x=0;x<cadena.toCharArray().length;x++)
       {
            int index=cadena.indexOf("@", x);
            if(index!=-1){
               cont++;
               x=index;
            }else
                break;
       }
       
       System.out.println("rencuento de subcadena= "+cont);
       
    }
    
}
