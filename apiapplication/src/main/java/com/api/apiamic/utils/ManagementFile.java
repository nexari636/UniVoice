/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

/**
 *
 * @author Jhon (TheBlack)
 */
public class ManagementFile 
{
    //esta funcion escribe y genera un nombre aletorio para el archivo
    public static String escribir(String carpeta,String formato,byte[] bytes)
    {
        try
        {
            String ruta_carpeta=Ruta.ObtenerRuta(carpeta)[1];
            String ooid=RamdomCN.Generate_UUID();
            System.out.println(ooid);
            String name_archivo=String.format("%s.%s",ooid,formato);
            //System.out.println(name_archivo);
            FileOutputStream stream = new FileOutputStream(ruta_carpeta+name_archivo);
            stream.write(bytes);
            stream.close();
            return name_archivo;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    
    //esta funcion escribe pero recibe un nombre por parametro para el archivo
    public static String escribir(String name_file_ooid,String carpeta,String formato,byte[] bytes)
    {
        try
        {
            String ruta_carpeta=Ruta.ObtenerRuta(carpeta)[1];
            //System.out.println(ooid);
            String name_archivo=String.format("%s.%s",name_file_ooid,formato);
            //System.out.println(name_archivo);
            FileOutputStream stream = new FileOutputStream(ruta_carpeta+name_archivo);
            stream.write(bytes);
            stream.close();
            return name_archivo;
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
        
    public static byte[] leerbytes(String carpeta,String nombre_archivo)
    {
        try
        {
            String ruta_carpeta=Ruta.ObtenerRuta(carpeta)[1];
            byte[] Bytes = Files.readAllBytes(Paths.get(ruta_carpeta+nombre_archivo));
            return Bytes;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    public static String LeerTxt(String carpeta,String nombre_archivo)
    {
        try
        {
            String ruta_carpeta=Ruta.ObtenerRuta(carpeta)[1];
            FileReader fr = new FileReader(ruta_carpeta+nombre_archivo);
            BufferedReader br = new BufferedReader(fr);
            String linea,data="";
            while((linea=br.readLine())!=null)
                data+=linea;
            return data;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    public static Boolean DeleteFile(String carpeta,String nombre_archivo)
    {
        try
        {
            String ruta_carpeta=Ruta.ObtenerRuta(carpeta)[1];
            Path path = Paths.get(ruta_carpeta+nombre_archivo);
            Files.deleteIfExists(path);
            return true;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return false;
        }
    }
    
    
    
    public static String BytesToBase64(byte [] bytes)
    {
        try
        {
            String encoded = Base64.getEncoder().encodeToString(bytes);
            return encoded;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    public static byte [] Base64ToBytes(String base64)
    {
        try
        {
            byte[] bytes= Base64.getDecoder().decode(base64);
            return bytes;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
}
