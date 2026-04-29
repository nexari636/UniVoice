/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.io.File;

/**
 *
 * @author Jhon (TheBlack)
 */
public class CreateDirectoryPrueba {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        File file = new File("C:/Users/USUARIO/Desktop/f/hola");
        if(file.mkdirs()){
            System.out.println("el directorio ya existe");
        }
        else{
            System.out.println("el directorio se creo");
        }
    }
    
}
