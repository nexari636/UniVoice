/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.util.List;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebaStreamlist {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        List<String> MessageTextCommandsList = List.of("enviar mensaje de texto","mensaje de texto","enviar texto mensaje","mandar mensaje de texto","enviar sms de texto","mandar sms de texto","enviar texto","mandar texto","send text message","text message","send message text","send sms text","send sms message","text","send text","text someone");
        String resultado="Enviar mensaje de audio al usuario jhon19 que diga hola como estas";
        resultado=resultado.toLowerCase();
        System.out.println(resultado);
        
        //System.out.println("Secuencia= "+resultado.contains("enviar mensaje de texto"));
        
        boolean mensajeTexto=MessageTextCommandsList.stream().anyMatch(resultado::contains);
        
        System.out.println(mensajeTexto);

    }
    
}
