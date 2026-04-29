/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.services;

import com.google.gson.JsonObject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.PersistenceContextType;
import jakarta.persistence.Query;
import java.io.Serializable;
import java.util.List;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class Queryfunctions
{
    @PersistenceContext(type = PersistenceContextType.TRANSACTION)
    private EntityManager entityManager;
    
    public JSONArray func_listarChats(String pe_correousuario) 
    {
        try
        {
            Query query = entityManager.createNativeQuery("select * from func_listarChats(:pe_correousuario)");
            query.setParameter("pe_correousuario", pe_correousuario);
            //System.out.println(query.getSingleResult().toString());
            JSONArray ja=new JSONArray(query.getSingleResult().toString()); 
           
            //getSingleResult retorna un solo resultado solo utilizarlo si estamos seguro de lo que retornmos
            //si retorna mas de un resultado lanza error
            //si querememos varios resultados utilizar getResultList
            return ja;
        }
        catch(Exception ex)
        {
            System.out.println("Error= "+ex.getMessage());
            return null;
        }
    }
    
    
    public JSONObject func_insertMessages(String pe_jsondata) 
    {
        try
        {
            Query query = entityManager.createNativeQuery("select * from func_insertMessages(:pe_jsondata)");
            query.setParameter("pe_jsondata", pe_jsondata);
            //System.out.println(query.getSingleResult().toString());
            JSONObject jo=new JSONObject(query.getSingleResult().toString()); 
            return jo;
        }
        catch(Exception ex)
        {
            System.out.println("Error= "+ex.getMessage());
            return null;
        }
    }
    
    public JSONArray func_getPersonasGrupo(Long pe_idgrupo,Long idpersonaemisor) 
    {
        try
        {
            Query query = entityManager.createNativeQuery("select * from func_getPersonasGrupo(:pe_idgrupo,:pe_idpersona_emisor)");
            query.setParameter("pe_idgrupo", pe_idgrupo);
            query.setParameter("pe_idpersona_emisor", idpersonaemisor);
            
            JSONArray ja=new JSONArray(query.getSingleResult().toString()); 
            return ja;
        }
        catch(Exception ex)
        {
            System.out.println("Error= "+ex.getMessage());
            return null;
        }
    }
    
    
    public JSONArray func_searchUsers(Long pe_idpersonaprincipal,String textsearch) 
    {
        try
        {
            Query query = entityManager.createNativeQuery("select * from func_searchUsers(:pe_idpersonaprincipal,:textsearch)");
            query.setParameter("pe_idpersonaprincipal", pe_idpersonaprincipal);
            query.setParameter("textsearch", textsearch);

            JSONArray ja=new JSONArray(query.getSingleResult().toString()); 
            return ja;
        }
        catch(Exception ex)
        {
            System.out.println("Error= "+ex.getMessage());
            return null;
        }
    }
    
    
    public JSONArray func_createGrupo(String data) 
    {
        try
        {
            Query query = entityManager.createNativeQuery("select * from func_createGrupo(:pe_jsondata)");
            query.setParameter("pe_jsondata", data);
            JSONArray ja=new JSONArray(query.getSingleResult().toString()); 
            return ja;
        }
        catch(Exception ex)
        {
            System.out.println("Error= "+ex.getMessage());
            return null;
        }
    }

    public JSONArray listGroupMessagesByUser(Long pe_idgrupo,Long pe_idpersonagruporecibe) 
    {
        try
        {
            Query query = entityManager.createNativeQuery("select * from listGroupMessagesByUser(:pe_idgrupo,:pe_idpersonagruporecibe)");
            query.setParameter("pe_idgrupo", pe_idgrupo);
            query.setParameter("pe_idpersonagruporecibe", pe_idpersonagruporecibe);
            JSONArray ja=new JSONArray(query.getSingleResult().toString()); 
            return ja;
        }
        catch(Exception ex)
        {
            System.out.println("Error= "+ex.getMessage());
            return null;
        }
    }
    
}
