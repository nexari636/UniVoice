/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

import static com.api.apiamic.ApiamicApplication.DEPLOY_PROJECT;
import java.io.File;

/**
 *
 * @author Jhon (TheBlack)
 */
public class Ruta 
{
    //retorna en la posicion 0 la ruta general del proyecto
    //retorna en la posicion 1 la ruta de donde se guardan los datos
    public static String[] ObtenerRuta(String carpeta)
    {
        if(DEPLOY_PROJECT)
        {
            //para sistemas derivados de linux
            String directorio="/dataapi/";
            String rutadata=directorio+carpeta.trim()+"/";
            
            File file = new File(rutadata);
            file.mkdirs(); //crea la ruta si no existe
            return new String[]{directorio.trim(),rutadata.trim()};
        }
        else{
            System.out.println("la rutaaaa");
            String directorio=System.getProperty("user.dir");
            String rutadata=directorio+"/src/main/resources/"+carpeta.trim()+"/";
            return new String[]{directorio.trim(),rutadata.trim()};
        }
    }
}
