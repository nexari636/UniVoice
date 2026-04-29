/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.controllers;

import com.api.apiamic.dataapi.CommandsAPP;
import com.api.apiamic.models.ModelDiscapacidad;
import com.api.apiamic.models.ModelIdioma;
import com.api.apiamic.models.ModelMensaje;
import com.api.apiamic.models.ModelPersona;
import com.api.apiamic.services.Queryfunctions;
import com.api.apiamic.services.SMensaje;
import com.api.apiamic.services.Sdiscapacidad;
import com.api.apiamic.services.Sidioma;
import com.api.apiamic.services.Spersona;
import com.api.apiamic.utils.ApiConverter;
import com.api.apiamic.utils.ConfigAES;
import com.api.apiamic.utils.GrupoMng;
import com.api.apiamic.utils.ManagementFile;
import com.api.apiamic.utils.MessagesResponce;
import com.api.apiamic.utils.RamdomCN;
import com.api.apiamic.utils.RecogAudio;
import com.api.apiamic.utils.UserPhotoFile;
import com.api.apiamic.utils.encryptString;
import com.api.apiamic.utils.generatePassword;
import com.api.apiamic.utils.resourceAvailability;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.core.Form;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author Jhon (TheBlack)
 */
@RestController
@RequestMapping("/api/persona")
public class ControllerPerson 
{
    @Autowired
    Sdiscapacidad sdiscapacidad;
    
    @Autowired
    Sidioma sidioma;
    
    @Autowired
    Spersona spersona;
    
    @Autowired
    Queryfunctions ifunctions;
    
    @Autowired
    SMensaje smensaje;
    
    @PostMapping("/save")
    public ResponseEntity<?> registro(ModelPersona modelpersona,@RequestParam(value="idiomap",defaultValue="")String idiomap)
    {
        Map<String,Object> response=new HashMap();
        try
        {
            if(modelpersona.getPusername().trim().equals("") && modelpersona.getPnombres().equals("") &&
                    modelpersona.getPapellidos().equals("") && modelpersona.getPcorreo().equals("") &&
                    modelpersona.getPtelefono().equals("") && modelpersona.getDiscapacidad()!=null 
                    && modelpersona.getIdioma()!=null)
            {
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_DATOS_INCOMPLETOS);
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
            }
            
            System.out.println("**** Datos completos ****");
            System.out.println("Idioma: "+idiomap);
            System.out.println("Discapacidad: "+modelpersona.getDiscapacidad().getDiscapacidad());
            modelpersona.setIdioma(sidioma.BuscarPorIdiomaPrefix(idiomap).get(0));
            //modelpersona.setDiscapacidad(sdiscapacidad.BuscarPorDiscapacidad("n/a").get(0));

            ConfigAES configaes=new ConfigAES();
            String [] datakey=configaes.CrearLlave();
            String[] datapassword=generatePassword.password();
            modelpersona.setPrutakey(datakey[1]);
            modelpersona.setPcontrasenia(datapassword[0]);
            modelpersona.setPrutafoto("user.png");
            if(spersona.Crear(modelpersona).getIdpersona()>0)
            {
                response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_GUARDADOS);
                response.put("base64key", datakey[2]);
                response.put("iduser", encryptString.textEncryptor(modelpersona.getIdpersona().toString()));
                response.put("correo", encryptString.textEncryptor(modelpersona.getPcorreo()));
                response.put("password",encryptString.textEncryptor( datapassword[1]));
                response.put("idioma",modelpersona.getIdioma().getPrefix());
                response.put("discapacidad",modelpersona.getDiscapacidad().getDiscapacidad());
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK); 
            }
            else
            {
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
            }
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR= "+error);
            
            if(error.contains(MessagesResponce.EX_PUSERNAME))
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.PUSERNAME_EXISTENTE);
            else if(error.contains(MessagesResponce.EX_PCORREO))
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.PCORREO_EXISTENTE);
            else if(error.contains(MessagesResponce.EX_PTELEFONO))
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.PTELEFONO_EXISTENTE);
            else
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
            
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
        }
    }
    
    @PostMapping("/update")
    public ResponseEntity<?> update(ModelPersona modelpersona)
    {
        Map<String,Object> response=new HashMap();
        try
        {
            System.out.println("****************************************************UPDATE");
            System.out.println(modelpersona.getDiscapacidad().getDiscapacidad());
            
            if(modelpersona.getPusername().trim().equals("") && modelpersona.getPnombres().equals("") &&
                    modelpersona.getPapellidos().equals("") && modelpersona.getPcorreo().equals("") &&
                    modelpersona.getPtelefono().equals("") && modelpersona.getDiscapacidad()==null &&  modelpersona.getIdioma()==null)
            {
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_DATOS_INCOMPLETOS);
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
            }
            
            System.out.println("**** Datos completos ****");
            ModelPersona mp=spersona.BuscarPorCorreo(encryptString.textDecryptor(modelpersona.getPcorreo())).get(0);

            mp.setPnombres(modelpersona.getPnombres());
            mp.setPapellidos(modelpersona.getPapellidos());
            mp.setPtelefono(modelpersona.getPtelefono());
            mp.setPdescripcion(modelpersona.getPdescripcion());
            mp.setDiscapacidad(modelpersona.getDiscapacidad());
            mp.setPusername(modelpersona.getPusername());
            mp.setIdioma(modelpersona.getIdioma());

            ModelPersona mpa=spersona.Actualizar(mp);
            if(mpa.getIdpersona()>0)
            {
                mpa.setPcontrasenia("");
                mpa.setPrutakey("");

                response.put("data", mpa);
                response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_GUARDADOS);
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK); 
            }
            else
            {
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
            }
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR= "+error);
            
            if(error.contains(MessagesResponce.EX_PUSERNAME))
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.PUSERNAME_EXISTENTE);
            else if(error.contains(MessagesResponce.EX_PCORREO))
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.PCORREO_EXISTENTE);
            else if(error.contains(MessagesResponce.EX_PTELEFONO))
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.PTELEFONO_EXISTENTE);
            else
                response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
            
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
        }
    }
    

    
    @PostMapping("/obtenerchats")
    public ResponseEntity<?> ObtenerChats(@RequestParam(value="correousuario",defaultValue="")String correousuario)
    {
        System.out.println("siiiiiiiiiiiiiiiiiiiiii");
        System.out.println("Correo fial:V "+correousuario);
        Map<String,Object> response=new HashMap();
        try
        {
            JSONArray ja=ifunctions.func_listarChats(encryptString.textDecryptor(correousuario.trim()));
            System.out.println(ja.toList());
            response.put("data", ja.toList());
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
    
    
    @PostMapping("/updatephoto")
    public ResponseEntity<?> UpdatePhoto(HttpServletRequest request,@RequestBody UserPhotoFile obj)
    {
        Map<String,Object> response=new HashMap();
        try
        {
            System.out.println("Base 64 index 0-10= "+obj.getFilebase64().substring(0, 10));
            System.out.println("extencion: "+obj.getExtencion());
            System.out.println("correo encriptado: "+obj.getCorreo());

            String name_file=RamdomCN.Generate_UUID();
            ManagementFile.escribir(name_file,"static/fotosperfil", obj.getExtencion().trim(),  ManagementFile.Base64ToBytes(obj.getFilebase64()));
            
            String name_file_obsoluto=String.format("%s.%s", name_file,obj.getExtencion());
            String correouserdescry=encryptString.textDecryptor(obj.getCorreo().trim());
            
            List<ModelPersona> mp=spersona.BuscarPorCorreo(correouserdescry.trim());
            
            if(mp.isEmpty())
                throw new IllegalStateException("La lista está vacía y no se puede procesar.");
            
            ModelPersona mperson=mp.get(0);
            mperson.setPrutafoto(name_file_obsoluto); //contiene el nombre del archivo con su extencion
            spersona.Actualizar(mperson);
              
            if(resourceAvailability.Availability(request, "/fotosperfil/"+name_file_obsoluto))
            {
                response.put("namefoto", name_file_obsoluto);
                response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.FOTO_ACTUALIZADA);
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK); 
            }
            else
                throw new IllegalArgumentException("Ha ocurrido un error en la carga del recurso");                       
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR= "+error);
            response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
        }
    }
    

    @PostMapping("/getuserbyemail")
    public ResponseEntity<?> GetUserByEmail(@RequestParam(value="correouser",defaultValue="")String correouser)
    {
        String correouserdescry=encryptString.textDecryptor(correouser.trim());
        System.out.println("correo encriptado= "+correouser);
        System.out.println("correo desecriptado: "+correouser);

        Map<String,Object> response=new HashMap();
        try
        {
            if(correouserdescry.isEmpty() || correouserdescry==null)
                throw new IllegalArgumentException("El correo no puede estar vacío ni ser nulo.");            
            
            List<ModelPersona> mp=spersona.BuscarPorCorreo(correouserdescry.trim());
            
            if(mp.isEmpty())
                throw new IllegalStateException("La lista está vacía y no se puede procesar.");
            
            
            ModelPersona mperson=mp.get(0);
            mperson.setPrutakey("");
            mperson.setPcontrasenia("");
            response.put("data",mperson );
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_CARGADOS_CORRECTAMENTE);
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
    
    
    @PostMapping("/getuserbyid")
    public ResponseEntity<?> GetUserById(@RequestParam(value="iduser",defaultValue="")String iduser,
            @RequestParam(value="cifrado",defaultValue="false")Boolean cifrado)
    {
        
        System.out.println("param iduser= "+iduser);
        System.out.println("param cifrado= "+cifrado);

        String iduseruserdescry="";
        
        if(cifrado)
            iduseruserdescry=encryptString.textDecryptor(iduser.trim());
        else
            iduseruserdescry=iduser.trim();
        
        System.out.println("id encriptado= "+iduser.trim());
        System.out.println("id desecriptado: "+iduseruserdescry);

        Map<String,Object> response=new HashMap();
        try
        {
            if(iduser.isEmpty() || iduser==null || cifrado==null)
                throw new IllegalArgumentException("El correo no puede estar vacío ni ser nulo.");            
            
            List<ModelPersona> mp=spersona.BuscarPorIdPersona(Long.valueOf(iduseruserdescry.trim()));
            
            if(mp.isEmpty())
                throw new IllegalStateException("La lista está vacía y no se puede procesar.");
            
            ModelPersona mperson=mp.get(0);
            mperson.setPrutakey("");
            mperson.setPcontrasenia("");
            response.put("data",mperson );
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_CARGADOS_CORRECTAMENTE);
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
    
    
    @PostMapping("/getdiscapacidades")
    public ResponseEntity<?> GetDisabilities()
    {
        
        Map<String,Object> response=new HashMap();
        try
        {
            List<ModelDiscapacidad> listdiscapacidades=sdiscapacidad.Listar();
            
            if(listdiscapacidades.isEmpty())
                throw new IllegalStateException("La lista está vacía y no se puede procesar.");
            
            response.put("data", listdiscapacidades);
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_CARGADOS_CORRECTAMENTE);
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
    
    
    @PostMapping("/getidiomas")
    public ResponseEntity<?> GetLanguages()
    {
        
        Map<String,Object> response=new HashMap();
        try
        {
            List<ModelIdioma> lstidioma=sidioma.Listar();
            
            if(lstidioma.isEmpty())
                throw new IllegalStateException("La lista está vacía y no se puede procesar.");
            
            response.put("data", lstidioma);
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_CARGADOS_CORRECTAMENTE);
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

    
    @PostMapping("/searchusers")
    public ResponseEntity<?> SearchUsers(@RequestParam(value="iduser",defaultValue="")String iduser,
           @RequestParam(value="textsearch",defaultValue="")String textsearch)
    {
        String iduserdescry=encryptString.textDecryptor(iduser.trim());
        Long iduservar=Long.valueOf(iduserdescry.trim()); //no primitivo (es un objeto) 
        System.out.println("Id encriptado= "+iduser);
        System.out.println("Id persona: "+iduservar);

        Map<String,Object> response=new HashMap();
        try
        {
            JSONArray ja=ifunctions.func_searchUsers(iduservar,textsearch.trim());
            response.put("data", ja.toList());
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_CARGADOS_CORRECTAMENTE);
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

        
    @PostMapping("/listarcotenidochat")
    public ResponseEntity<?> ListChatContent(@RequestParam(value="idgrupo",defaultValue="")Long idgrupo,
                                                @RequestParam(value="idpersonagruporecibe",defaultValue="")Long idpersonagruporecibe)
    {
        System.out.println("idgrupo= "+idgrupo);
        System.out.println("idpersonagruporecibe= "+idpersonagruporecibe);

        Map<String,Object> response=new HashMap();
        try
        {
            JSONArray lstmensajeschats=ifunctions.listGroupMessagesByUser(idgrupo, idpersonagruporecibe);
            
            if(lstmensajeschats.isEmpty()) throw new IllegalStateException("La lista está vacía y no se puede procesar.");

            response.put("data", lstmensajeschats.toList());
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_CARGADOS_CORRECTAMENTE);
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
    
    
    @PostMapping("/resourcemic")
    public ResponseEntity<?> GetMessage(HttpServletRequest request,@RequestParam("file") MultipartFile objfile) 
    {
       Map<String,Object> response=new HashMap();
        try
        { 
            String original_name=objfile.getOriginalFilename();
            String extencion=original_name.substring(original_name.indexOf(".")+1, original_name.length());
            Form form=new Form();
            form.param("file_base_64", ManagementFile.BytesToBase64(objfile.getBytes()));
            form.param("extencion",extencion);
                    
            JSONObject jo= ApiConverter.ApiMensajes(form,"/transcribe_audio/");   
            System.out.println("data:= "+jo.toString());
            response.put("data", jo.toMap());
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK); 
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            String error=ex.getMessage();
            System.out.println("ERROR= "+error);
            response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
        }
    }
    
    
    
    @PostMapping("/capp1")
    public ResponseEntity<?> CommandsApplication1(@RequestBody RecogAudio recogaudio)
    {
        System.out.println(recogaudio.getExtencion());
        System.out.println(recogaudio.getBase64());

        Map<String,Object> response=new HashMap();
        try
        {
            CommandsAPP capp=new CommandsAPP(recogaudio.getBase64(),recogaudio.getExtencion(),recogaudio.getLanguage());
            JSONObject jocmd=capp.ProcessCommand();
            response.put("data", jocmd.toMap());
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK); 
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR de CommandsApplication");
            System.out.println("ERROR= "+error);
            response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
        }
    }
    
    
    @PostMapping("/capp")
    public ResponseEntity<?> CommandsApplication(@RequestParam("file") MultipartFile objfile,
            @RequestParam("language") String language) throws IOException
    {
        String original_name=objfile.getOriginalFilename();
        String extencion=original_name.substring(original_name.indexOf(".")+1, original_name.length());
        String base64=ManagementFile.BytesToBase64(objfile.getBytes());
        
        System.out.println(language);
        System.out.println(extencion);
        System.out.println(base64);

        Map<String,Object> response=new HashMap();
        try
        {
            CommandsAPP capp=new CommandsAPP(base64,extencion,language);
            JSONObject jocmd=capp.ProcessCommand();
            response.put("data", jocmd.toMap());
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.OK); 
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR de CommandsApplication");
            System.out.println("ERROR= "+error);
            response.put(MessagesResponce.ERROR_KEY, MessagesResponce.ERROR_SISTEMA);
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.BAD_REQUEST);
        }
    }
    
    
    
    
    @GetMapping("/helloworld")
    public ResponseEntity<Map<String, String>> helloworld() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Hello World!!!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    
    
}
