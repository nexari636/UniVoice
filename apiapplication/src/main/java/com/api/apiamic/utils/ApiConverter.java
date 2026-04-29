/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;
import static com.api.apiamic.ApiamicApplication.DEPLOY_PROJECT;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.client.Invocation;
import jakarta.ws.rs.client.WebTarget;
import jakarta.ws.rs.core.Form;
import jakarta.ws.rs.core.Response;
import java.util.Base64;
import org.json.JSONObject;
/**
 *
 * @author Jhon (TheBlack)
 */
public class ApiConverter 
{
    private final static String URL_API_PYTHON=DEPLOY_PROJECT?"http://(Despliegue)/api":"http://localhost:8000/api";
    
    public static JSONObject ApiMensajes(Form form,String url)
    {
        try
        {
            System.out.println("url: "+URL_API_PYTHON);
            Client client = ClientBuilder.newClient();
            WebTarget target = client.target(URL_API_PYTHON+url);

            Invocation.Builder builder = target.request("application/json");
            Invocation invocation = builder.buildPost(Entity.form(form));
            
            Response response = invocation.invoke();

            int statusCode = response.getStatus();
            String respuesta = response.readEntity(String.class);
            respuesta=respuesta.translateEscapes();
            
            JSONObject jo=new JSONObject(respuesta);
            if (statusCode == 200) {
                System.out.println(statusCode);
            } 
            return jo;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
        return null;
    }
    
        
    
    
    
}
