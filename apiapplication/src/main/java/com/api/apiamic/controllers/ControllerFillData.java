/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.controllers;

import com.api.apiamic.models.ModelDiscapacidad;
import com.api.apiamic.models.ModelEstadoMensaje;
import com.api.apiamic.models.ModelExtencionArchivo;
import com.api.apiamic.models.ModelIdioma;
import com.api.apiamic.models.ModelTipoGrupo;
import com.api.apiamic.models.ModelTipoMensaje;
import com.api.apiamic.services.Sdiscapacidad;
import com.api.apiamic.services.SestadoMensaje;
import com.api.apiamic.services.SextencionArchivo;
import com.api.apiamic.services.Sidioma;
import com.api.apiamic.services.StipoGrupo;
import com.api.apiamic.services.StipoMensaje;
import com.api.apiamic.utils.MessagesResponce;
import com.api.apiamic.utils.encryptString;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Jhon (TheBlack)
 */
@RestController
@RequestMapping("/api/filldata")
public class ControllerFillData 
{
    @Autowired
    Sdiscapacidad sdiscapacidad;
    
    @Autowired
    Sidioma sidioma;
    
    @Autowired
    SextencionArchivo sextencionarchivo;
    
    @Autowired
    SestadoMensaje sestadomensaje;
    
    @Autowired
    StipoGrupo stipogrupo;
   
    @Autowired
    StipoMensaje stipomensaje;
    
    @PostMapping("/insertdata")
    public ResponseEntity<?> InsertData()
    {
        System.out.println("Se van a añadir valores por defecto a la base de datos");
        Map<String,Object> response=new HashMap();
        try
        {
            List<ModelDiscapacidad> lstDiscapacidad = new ArrayList<>(); //respeta el orden de insersion
            lstDiscapacidad.add(new ModelDiscapacidad(1L,"visual"));
            lstDiscapacidad.add(new ModelDiscapacidad(2L,"auditiva"));
            lstDiscapacidad.add(new ModelDiscapacidad(3L,"n/a"));

            List<ModelExtencionArchivo> lstModelExtencionArchivo = new ArrayList<>(); //respeta el orden de insersion
            lstModelExtencionArchivo.add(new ModelExtencionArchivo(1l,"mp3"));
            lstModelExtencionArchivo.add(new ModelExtencionArchivo(2l,"mp4"));
            lstModelExtencionArchivo.add(new ModelExtencionArchivo(3l,"text"));
            lstModelExtencionArchivo.add(new ModelExtencionArchivo(4l,"jpg"));
            lstModelExtencionArchivo.add(new ModelExtencionArchivo(5l,"png"));
            lstModelExtencionArchivo.add(new ModelExtencionArchivo(6l,"jpeg"));
            
            List<ModelEstadoMensaje> lstEstadoMensaje = new ArrayList<>(); //respeta el orden de insersion
            lstEstadoMensaje.add(new ModelEstadoMensaje(1l,"eliminado"));
            lstEstadoMensaje.add(new ModelEstadoMensaje(2l,"editado"));
            lstEstadoMensaje.add(new ModelEstadoMensaje(3l,"enviado"));
            lstEstadoMensaje.add(new ModelEstadoMensaje(4l,"espera"));
            
            List<ModelTipoGrupo> lstTipoGrupo = new ArrayList<>(); //respeta el orden de insersion
            lstTipoGrupo.add(new ModelTipoGrupo(1l,"grupal"));
            lstTipoGrupo.add(new ModelTipoGrupo(2l,"2p2"));
            
            List<ModelTipoMensaje> lstTipoMensaje = new ArrayList<>(); //respeta el orden de insersion
            lstTipoMensaje.add(new ModelTipoMensaje(1l,"texto"));
            lstTipoMensaje.add(new ModelTipoMensaje(2l,"imagen"));
            lstTipoMensaje.add(new ModelTipoMensaje(3l,"video"));
            lstTipoMensaje.add(new ModelTipoMensaje(4l,"audio"));

            List<ModelIdioma> lstIdioma = new ArrayList<>(); //respeta el orden de insersion
            lstIdioma.add(new ModelIdioma(1l,"Español","es"));
            lstIdioma.add(new ModelIdioma(2l,"Ingles","en"));
            lstIdioma.add(new ModelIdioma(3l,"Hindi","hi"));
            lstIdioma.add(new ModelIdioma(4l,"Portugués","pt"));
            lstIdioma.add(new ModelIdioma(5l,"Francés","fr"));
            lstIdioma.add(new ModelIdioma(6l,"Ruso","ru"));
            lstIdioma.add(new ModelIdioma(7l,"Alemán","de"));
            lstIdioma.add(new ModelIdioma(8l,"Japonés","ja"));
            lstIdioma.add(new ModelIdioma(9l,"Coreano","ko"));
            lstIdioma.add(new ModelIdioma(10l,"Italiano","it"));
            lstIdioma.add(new ModelIdioma(11l,"Turco","tr"));
            lstIdioma.add(new ModelIdioma(12l,"Indonesio","id"));
            lstIdioma.add(new ModelIdioma(13l,"Vietnamita","vi"));
            lstIdioma.add(new ModelIdioma(14l,"Chino (Mandarín)","zh"));

            System.out.println("********** Comenzando a añadir los datos **********");
            
            for(ModelDiscapacidad md : lstDiscapacidad)
                sdiscapacidad.Crear(md);
            
            System.out.println("Datos de discapacidad añadidos correctamente");

            for(ModelExtencionArchivo md : lstModelExtencionArchivo)
                sextencionarchivo.Crear(md);
            
            System.out.println("Datos de extencion añadidos correctamente");

            for(ModelEstadoMensaje md : lstEstadoMensaje)
                sestadomensaje.Crear(md);
            
            System.out.println("Datos de estado de mensajes añadidos correctamente");

            for(ModelTipoGrupo md : lstTipoGrupo)
                stipogrupo.Crear(md);
            
            System.out.println("Datos de tipo grupo añadidos correctamente");
            
            for(ModelTipoMensaje md : lstTipoMensaje)
                stipomensaje.Crear(md);
            
            System.out.println("Datos de tipo mensaje añadidos correctamente");         
            
            for(ModelIdioma md : lstIdioma)
                sidioma.Crear(md);

            System.out.println("Datos de model idioma añadidos correctamente");         
                
            response.put("message","Datos añadidos correctamente");
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK); 
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR= "+error);
            response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
        }
    }
    
 
    
}
