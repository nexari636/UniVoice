/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

import static com.api.apiamic.ApiamicApplication.DEPLOY_PROJECT;
import jakarta.servlet.http.HttpServletRequest;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 *
 * @author Jhon (TheBlack)
 */
public class resourceAvailability 
{
    public static boolean Availability(HttpServletRequest request,String ruta_recurso)
    {
        
        String urlCompleta = request.getRequestURL().toString();
        int index=urlCompleta.indexOf("/api");
        System.out.println(index);
        String urlPrincipal=urlCompleta.substring(0, index)+ruta_recurso;
        System.out.println("La url es: "+urlCompleta);
        System.out.println("La url principal es: "+urlPrincipal);
        
        if(DEPLOY_PROJECT)
        {
            urlPrincipal=urlPrincipal.replaceAll("http","https").replaceAll("aplicaciones.uteq.edu.ec", "aplicaciones.uteq.edu.ec:9502");
            System.out.println("url deploy "+urlPrincipal);
        }
        
        int cont=0;
        
        while(cont<=200)
        {
            try
            {
                HttpURLConnection connection = (HttpURLConnection) new URL(urlPrincipal).openConnection();
                connection.setRequestMethod("HEAD"); //lee solo las cabeceras
                connection.setConnectTimeout(2000); // 2 segundos en milisegundos :V (tiempo de espera) lanza exepcion si no hay respuesta
                connection.setReadTimeout(2000); //tiempo de lectura de la respuesta en milisegundos 
                connection.setInstanceFollowRedirects(true);
                int status = connection.getResponseCode(); //status
                
                if(status==307) //status de redireccion
                {
                    System.out.println("Status: " + status);
                    String location = connection.getHeaderField("Location");
                    System.out.println("Redirige a: " + location);
                    urlPrincipal=location;
                }
                
                

                if(status == 200)
                    return true;
                cont++;

                Thread.sleep(2000);
            }
            catch (Exception ex) {
                String error=ex.getMessage();
                System.out.println("ERROR= "+error);
            }
        }  
        System.out.println("Verificar la conexion o metodos de guardado de buffer de imagen");
        return false;
    }
    
}
