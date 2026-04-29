/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.encryptString;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebaencriptaMD5 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        String textoencriptado=encryptString.textEncryptor("Si realmente necesitas escribir ahí (no recomendado), puedes excluir esa carpeta de reinicios automáticos:");
        String textodesencriptado=encryptString.textDecryptor(textoencriptado);
        
        System.out.println("Texto encriptado= "+textoencriptado);
        System.out.println("Texto decencriptado= "+textodesencriptado);
        
        
        String correoprueba="hr87a/ZQ2yfHKAnjogwdSCmJbibNWZPUTEaEn1ZWcjg=";
        String textodesencriptadoprueba=encryptString.textDecryptor(correoprueba);
        System.out.println("opruyeba= "+textodesencriptadoprueba);
        
        
        System.out.println("ID ENCRIPTADO= "+encryptString.textEncryptor("33"));
        System.out.println("correo ENCRIPTADO= "+encryptString.textEncryptor("jleturnep@uteq.edu.ec"));


    }
    
}
