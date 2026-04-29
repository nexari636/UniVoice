/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.controllers;

import com.api.apiamic.dataapi.DataAudioToText;
import com.api.apiamic.dataapi.DataDescriptionImage;
import com.api.apiamic.dataapi.DataMsgTranslate;
import com.api.apiamic.dataapi.DataSubtituloVideo;
import com.api.apiamic.dataapi.DataTextToAudio;
import com.api.apiamic.models.ModelGrupo;
import com.api.apiamic.models.ModelMensaje;
import com.api.apiamic.models.ModelPersona;
import com.api.apiamic.repositorys.Imensaje;
import com.api.apiamic.services.Queryfunctions;
import com.api.apiamic.services.Sgrupo;
import com.api.apiamic.services.Spersona;
import com.api.apiamic.utils.ConfigAES;
import com.api.apiamic.utils.ManagementFile;
import com.api.apiamic.utils.RamdomCN;
import com.api.apiamic.utils.Chunks;
import com.api.apiamic.utils.DataChunksClass;
import com.api.apiamic.utils.DataEncTranslateMsg;
import com.api.apiamic.utils.DataTranslateMessage;
import com.api.apiamic.utils.GrupoMng;
import com.api.apiamic.utils.MessagesResponce;
import com.api.apiamic.utils.ModelDateFormats;
import com.api.apiamic.utils.dateCurrent;
import com.api.apiamic.utils.encryptString;
import com.api.apiamic.utils.resourceAvailability;
import com.api.apiamic.websocketconfig.DataMensaje;
import com.api.apiamic.websocketconfig.MessageUser;
import com.api.apiamic.websocketconfig.StoreUsers;
import com.api.apiamic.websocketconfig.User;
import static com.api.apiamic.zpruebasz.MensajesUsuariosDesconectados.mapmensajetemp;
import static com.api.apiamic.zpruebasz.MensajesUsuariosDesconectados.userstores;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.StreamReadConstraints;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import jakarta.servlet.http.HttpServletRequest;
import java.io.ByteArrayInputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import org.springframework.web.socket.messaging.SessionSubscribeEvent;
import org.springframework.web.socket.messaging.SessionUnsubscribeEvent;

/**
 *
 * @author Jhon (TheBlack)
 */
@Controller
@RestController
@RequestMapping("/api/wsocket")
public class WSChatsController 
{
    private static String USER="user";
    
    @Autowired
    StoreUsers userstores;
    
    @Autowired
    Spersona spersona;
    
    @Autowired
    Imensaje imensaje;
    
    @Autowired
    Sgrupo sgrupo;
    
    @Autowired
    Queryfunctions ifunctions;
      
    SimpMessagingTemplate simpMessagingTemplate;

    public WSChatsController(SimpMessagingTemplate simpMessagingTemplate)
    {
        this.simpMessagingTemplate=simpMessagingTemplate;
    }
    
    @MessageMapping("/usuario")
    public void Usuario(@Payload String jsondata, SimpMessageHeaderAccessor headerAccessor) 
    {
        try
        {
            String correo=new JSONObject(jsondata).getString("correo");
            System.out.println("Correo= "+correo);
            System.out.println("*********** Informacion headerAccessor *******");
            System.out.println("Suscripcion ID= "+headerAccessor.getSubscriptionId());
            System.out.println("Session ID= "+headerAccessor.getSessionId());
            System.out.println("Tipo mensaje= "+headerAccessor.getMessageType());
            System.out.println("SESSION ATRIBUTES= "+headerAccessor.getSessionAttributes());
            System.out.println("User= "+headerAccessor.getUser());

            System.out.println(encryptString.textDecryptor(correo.trim()));
            
            ModelPersona mp=spersona.BuscarPorCorreo(encryptString.textDecryptor(correo.trim())).get(0);
            User user=new User(mp.getIdpersona(),0L,mp.getPcorreo(),mp.getPcontrasenia(),mp.getPnombres(),mp.getPapellidos(),mp.getPusername(),mp.getPrutakey());
            
            System.out.println("*********** Informacion de usuario *******");
            System.out.println("ID= "+user.getId());
            System.out.println("SEREAL ID= "+user.getCorreo());
            System.out.println("USERNAME ID= "+user.getPassword());
            System.out.println("NOMBRES= "+user.getNombres());
            System.out.println("APELLIDOS= "+user.getApellidos());
            System.out.println("USERNAME= "+user.getUsername());
            
            //mapaUsuarios.put(encryptString.textEncryptor(user.getId().toString()), Collections.synchronizedList(new ArrayList<>()));
            
            headerAccessor.getSessionAttributes().put(USER, user);
            userstores.addUser(user);
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println(error);
        }
    }
    
    
    @PostMapping("/creategrupo")
    public ResponseEntity<?> CrearGrupo(@RequestBody GrupoMng grupomng)
    {
        System.out.println("iduserprincipal= "+grupomng.getIduserprincipal());
        System.out.println("iduseramigo= "+grupomng.getIduseramigo());

        Map<String,Object> response=new HashMap();
        try
        {
            grupomng.setCorreouserprincipal(encryptString.textDecryptor(grupomng.getCorreouserprincipal().trim()));
            Long iduserprincipaldescry=Long.valueOf(encryptString.textDecryptor(grupomng.getIduserprincipal()));
            grupomng.setUsers(new Long[]{iduserprincipaldescry,grupomng.getIduseramigo()});
            
            Gson gson = new Gson();
            String jsonString = gson.toJson(grupomng); 
            System.out.println(jsonString);
            //JsonObject jsonObject = gson.fromJson(jsonString, JsonObject.class); //CONVIERTE DE STRING JSON A jsonobject
            JSONArray ja=ifunctions.func_createGrupo(jsonString);
            response.put("data", ja.toList());
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_GRUPO_GUARDADOS);
                        
            JsonObject objectGsonDataNotification = new JsonObject();
            objectGsonDataNotification.addProperty("iduser", encryptString.encriptPassword(grupomng.getIduserprincipal()));

            for(Long ids : new Long[]{iduserprincipaldescry,grupomng.getIduseramigo()})
            {
                String iduserscriptado=encryptString.textEncryptor(ids.toString());
                String iduserhash=encryptString.encriptPassword(iduserscriptado);
                simpMessagingTemplate.convertAndSend("/queue/newgroup"+iduserhash,objectGsonDataNotification.toString(),Map.of("persistent", "true"));
                Thread.sleep(200);
            }
            
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
    

    @PostMapping("/deletefilemessagetemp")
    public ResponseEntity<?> DeleteFileMessageTemp(@RequestParam(value="filename",defaultValue="")String filename)
    {
        Map<String,Object> response=new HashMap();
        try
        {
            ManagementFile.DeleteFile("static/datatemp", filename);
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.ARCHIVO_ELIMINADO);
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
    
    @PostMapping("/translate_message")
    public ResponseEntity<?> TranslateMessage(DataEncTranslateMsg data_message)
    {
        Map<String,Object> response=new HashMap();
        try
        {
            /*******************proceso normal (descifrado de datos)*************************/
            System.out.println("Correo: "+encryptString.textDecryptor(data_message.getCorreo_user().trim()));
            /***********************************************************************************/
            ModelPersona mp=spersona.BuscarPorCorreo(encryptString.textDecryptor(data_message.getCorreo_user().trim())).get(0);
            System.out.println(mp.getPcorreo());
            ConfigAES caes=new ConfigAES(mp.getPrutakey());
            String datadesencry=caes.DesencriptarInformacion(data_message.getData_encript(), data_message.getIv_b64().trim());

            if(datadesencry==null)
                throw new IllegalStateException("Error en el descifrado");
            /****************************************************************************/
            
            System.out.println("**************************");
            System.out.println(datadesencry.trim());
            System.out.println("**************************");
       
            Gson gson = new Gson();
            String jsonClean = gson.fromJson(datadesencry, String.class);
            System.out.println("**************************");
            System.out.println(jsonClean);
            System.out.println("**************************");

            DataTranslateMessage message = gson.fromJson(jsonClean.trim(), DataTranslateMessage.class);

            DataMsgTranslate dmt=new DataMsgTranslate();
            dmt.processData(message.getMessage(),message.getTarget_language());
            
            response.put(MessagesResponce.DATA, dmt.getTranslation_text());
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
    
      
    @PostMapping("/messagesfile")
    public ResponseEntity<?> ObtenerMessage(HttpServletRequest request,@RequestParam("file") MultipartFile objfile) 
    {
        System.out.println("Nuevo metodo para el envio de mensajes");
        Map<String,Object> response=new HashMap();
        try
        {
            System.out.println("Size= "+objfile.getSize());
            System.out.println("GetName= "+objfile.getName());
            System.out.println("GetName= "+objfile.getOriginalFilename());
            System.out.println("Bytes= "+objfile.getBytes());
            String name_file_mensaje=RamdomCN.Generate_UUID();
   
            //le el flujo de bytes como si fuera un archivo
            ByteArrayInputStream inputStream = new ByteArrayInputStream(objfile.getBytes());
            //parcea a la clase deseada
            JsonFactory jsonFactoryobj = JsonFactory.builder().streamReadConstraints(StreamReadConstraints.builder().maxStringLength(100_000_000).maxDocumentLength(100_000_000).build()).build();
            DataMensaje datamsg = new ObjectMapper(jsonFactoryobj).readValue(inputStream, DataMensaje.class);
            
            System.out.println("iv pepa= "+datamsg.getIv_b64());
            
            inputStream.close(); //cierra el recurso 
            inputStream = null; //apunta el recurso null para que el (garbage collector) lo libere
            jsonFactoryobj=null; //lo mismo de arriva :V

            /*******************proceso normal*************************/
        
            System.out.println("Correo: "+encryptString.textDecryptor(datamsg.getCorreouser().trim()));
            /***********************************************************************************/
            String extencion="json";
            ModelPersona mp=spersona.BuscarPorCorreo(encryptString.textDecryptor(datamsg.getCorreouser().trim())).get(0);
            
            System.out.println(mp.getPcorreo());
            
            ConfigAES caes=new ConfigAES(mp.getPrutakey());
            String datadesencry=caes.DesencriptarInformacion(datamsg.getData(), datamsg.getIv_b64().trim());

            if(datadesencry==null)
                throw new IllegalStateException("Error en el descifrado");
            
            System.out.println(datadesencry.trim());
                      
            Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();
            MessageUser message = gson.fromJson(datadesencry.trim(), MessageUser.class);
            message.setDatetime_envio(new Date());
            message.setName_file_mensaje(String.format("%s.%s", name_file_mensaje,extencion));
            datadesencry=""; //limpia la variable
            message.setUseremisor(new User(
                    mp.getIdpersona(),
                    message.getUseremisor().getIdpersonagrupo(),
                    mp.getPcorreo(),
                    "",
                    mp.getPnombres(),
                    mp.getPapellidos(),
                    mp.getPusername(),
                    mp.getPrutakey()
            ));

            message.setEstadomensaje(CheckUserConnected(mp.getIdpersona())?"enviado":"espera");
            JSONArray ja=ifunctions.func_getPersonasGrupo(message.getIdgrupo(),mp.getIdpersona());
            User [] users=new User[ja.length()];

            String[] name_file_message_vector=new String[ja.length()];
            DataMensaje[] datamessagevector=new DataMensaje[ja.length()];

            for(int x=0;x<ja.length();x++)
            {
                name_file_message_vector[x]=String.format("%s", RamdomCN.Generate_UUID());

                JSONObject jo=ja.getJSONObject(x);

                users[x]=new User(
                    jo.getLong("idpersona"),
                    jo.getLong("idpersonagrupo"),
                    jo.getString("pcorreo"),
                    "",
                    jo.getString("pnombres"),
                    jo.getString("papellidos"),
                    jo.getString("pusername"),
                    jo.getString("prutakey")
                );
            }
            message.setUserobjetivos(users);
            
            /**** PROCESO PARA EL ENVIO DE MENSAJES DE MANERA TEMPORAL PARA LOS DEMAS USUARIOS DEL GRUPO ******/
            int conttemp=0;
            List<String> lstdatamsg=new ArrayList<>();            
            
            for(String name_filese : name_file_message_vector)
            {
                String name_file=String.format("%s.%s", name_filese,extencion);

                if (conttemp==0) {conttemp++; continue;}
                //message.setName_file_mensaje(name_file);
                System.out.println("ESSS EL ID PERSONA OBJETIVO= "+message.getUserobjetivos()[conttemp].getIdpersonagrupo());
                
                MessageUser mu=new MessageUser(
                                        0,
                                        message.getUseremisor(),
                                        message.getUserobjetivos(),
                                        message.getIdgrupo(),
                                        message.getMensaje_texto(),
                                        message.getExtencion(),
                                        message.getRecursobase64(),
                                        message.getIdtipomensaje(),
                                        message.getDatetime_envio(),
                                        false,
                                        false,
                                        message.getRecursomensajejson(),
                                        name_file,
                                        0L,
                                        "",
                                        message.getDateformats(),
                                        message.getIdtemporalmessage(),
                                        message.getEstadotemp()
                                    );


                String jsondata=gson.toJson(mu);
                ConfigAES caesobjetivos=new ConfigAES(message.getUserobjetivos()[conttemp].getPrutakey());
                String [] dataencry=caesobjetivos.EncriptarInformacion(jsondata,name_filese);                     //se utiliza asi por la longitud de nombres y mensajes son iguales y siempre van el orden de la lista
                DataMensaje datamensajefinalusersobjetivos=new DataMensaje(dataencry[3],dataencry[2],encryptString.textEncryptor(message.getUserobjetivos()[conttemp].getCorreo()),true,0,0,true,datamsg.getIduser(),datamsg.getIdgrupohash());
                String jsondataFinalusersobjetivos=gson.toJson(datamensajefinalusersobjetivos);
                lstdatamsg.add(jsondataFinalusersobjetivos);
                conttemp++;
            }
            
            
            conttemp=0;
            for(User objuser : message.getUserobjetivos())
            {
                if(conttemp==0) {conttemp++; continue;}
                
                System.out.println("Se va a enviar al usuario= "+objuser.getCorreo()+" - "+objuser.getId());
                //envia el mensaje
                //String iduserscriptado=encryptString.textEncryptor(objuser.getId().toString());

                String jsondataclassfinal=lstdatamsg.get(conttemp-1); //se le resta uno porque se esta saltando al usuario emisor que tambien forma parte de la lista de usuarios objetivos
                String name_file_final=name_file_message_vector[conttemp];
                ManagementFile.escribir(name_file_final,"static/datatemp", extencion, jsondataclassfinal.getBytes());
                String namefilefinalextencion=String.format("%s.%s", name_file_final,extencion);
                String keyusermessagetemp=encryptString.textEncryptor(objuser.getId().toString())+""+datamsg.getIdgrupohash();
                String idchat=encryptString.encriptPassword(keyusermessagetemp);

                if(resourceAvailability.Availability(request, "/datatemp/"+namefilefinalextencion))
                {
                    System.out.println("Se va a enviar un mensaje temporal");
                    simpMessagingTemplate.convertAndSend("/queue/chat"+idchat,namefilefinalextencion.trim(),Map.of("persistent", "true"));
                    Thread.sleep(200);
                }
                conttemp++;
            }
            
            lstdatamsg.clear(); //limpia la lista para recuperar memoria.
            
            /*****************************************************************************************/
            //datamessagevector=new DataMensaje[ja.length()]; //limpiar vector
            String data="";
            int idtipomensaje=0;
            String tipomensaje="";

            if(message.getIdtipomensaje()==1) //TEXTO
            {
                System.out.println("ES MENSAJE DE TEXTO");
                DataTextToAudio dtto=new DataTextToAudio();
                dtto.processData(message.getMensaje_texto());
                data=dtto.getData().toString();
                idtipomensaje=1;
                tipomensaje="texto";
            }
            else if(message.getIdtipomensaje()==2) //IMAGEN
            {
                System.out.println("ES MENSAJE DE IMAGEN");            
                DataDescriptionImage ddim=new DataDescriptionImage();
                ddim.processData(ManagementFile.Base64ToBytes(message.getRecursobase64()), message.getExtencion());
                data=ddim.getData().toString();
                idtipomensaje=2;
                tipomensaje="imagen";
            }
            else if(message.getIdtipomensaje()==3) //VIDEO
            {
                System.out.println("ES MENSAJE DE VIDEO");
                DataSubtituloVideo dsv=new DataSubtituloVideo();
                dsv.processData(ManagementFile.Base64ToBytes(message.getRecursobase64()), message.getExtencion());
                data=dsv.getData().toString();
                idtipomensaje=3;
                tipomensaje="video";
            } 
            else if(message.getIdtipomensaje()==4) //AUDIO
            {
                System.out.println("ES MENSAJE DE AUDIO");
                DataAudioToText datt=new DataAudioToText();
                datt.processData(ManagementFile.Base64ToBytes(message.getRecursobase64()), message.getExtencion());
                data=datt.getData().toString();
                idtipomensaje=4;
                tipomensaje="audio";
            }
            else
            {
                System.out.println("Opcion de mensaje desconocida");
            }

            System.out.println("Mensajes python");
            //System.out.println(data);
            message.setMensaje_texto("");
            message.setRecursobase64("");
            message.setIdpersonagruporecibe(message.getUseremisor().getIdpersonagrupo());
            message.setDateformats(new ModelDateFormats());
            message.setEstadotemp(false);
            //message.setRecursomensajejson(data); //--> encriptado
            String jsondata=gson.toJson(message);
            System.out.println("************************");
            //System.out.println(jsondata);
            System.out.println("************************");

            int idmensaje=ifunctions.func_insertMessages(jsondata).getInt("idmensaje");
            //se llena aqui porque los datyos codificados de los recursos no se guardan en la bd seria incrementar carga transaccional a la bd sin razon
            message.setRecursomensajejson(data); //lena con los recursos que se obtengan del procesado de python
            message.setIdmensaje(idmensaje);
            
            jsondata=gson.toJson(message); //se actualiza el json de la clase con el idmensaje

            String [] dataencry=caes.EncriptarInformacion(jsondata,name_file_mensaje);
            DataMensaje datamensajefinal=new DataMensaje(dataencry[3],dataencry[2],datamsg.getCorreouser(),true,0,0,true,datamsg.getIduser(),datamsg.getIdgrupohash());
            String jsondataFinal=gson.toJson(datamensajefinal);
            ManagementFile.escribir(name_file_mensaje,"archivos", extencion, jsondataFinal.getBytes());

            //guardar mensaje de useremisor objetivos
            datamessagevector[0]=datamensajefinal;
            int cont=0;

            for(String name_filese : name_file_message_vector)
            {
                String name_file=String.format("%s.%s", name_filese,extencion);

                if (cont==0) {cont++; continue;}
                //message.setName_file_mensaje(name_file);
                System.out.println("ESSS EL ID PERSONA OBJETIVO= "+message.getUserobjetivos()[cont].getIdpersonagrupo());
                //copia de objeto superficial no profunda
                MessageUser mu=new MessageUser(
                                        0,
                                        message.getUseremisor(),
                                        message.getUserobjetivos(),
                                        message.getIdgrupo(),
                                        message.getMensaje_texto(),
                                        message.getExtencion(),
                                        message.getRecursobase64(),
                                        message.getIdtipomensaje(),
                                        message.getDatetime_envio(),
                                        false,
                                        false,
                                        message.getRecursomensajejson(),
                                        name_file,
                                        message.getUserobjetivos()[cont].getIdpersonagrupo(),
                                        CheckUserConnected(message.getUserobjetivos()[cont].getId())?"enviado":"espera",
                                        new  ModelDateFormats(),
                                        message.getIdtemporalmessage(),
                                        false
                                    );

                jsondata=gson.toJson(mu);
                idmensaje=ifunctions.func_insertMessages(jsondata).getInt("idmensaje");
                mu.setIdmensaje(idmensaje);
                jsondata=gson.toJson(mu);

                //jsondata=gson.toJson(mu);
                ConfigAES caesobjetivos=new ConfigAES(message.getUserobjetivos()[cont].getPrutakey());
                dataencry=caesobjetivos.EncriptarInformacion(jsondata,name_filese);                     //se utiliza asi por la longitud de nombres y mensajes son iguales y siempre van el orden de la lista
                DataMensaje datamensajefinalusersobjetivos=new DataMensaje(dataencry[3],dataencry[2],encryptString.textEncryptor(message.getUserobjetivos()[cont].getCorreo()),true,0,0,true,datamsg.getIduser(),datamsg.getIdgrupohash());
                String jsondataFinalusersobjetivos=gson.toJson(datamensajefinalusersobjetivos);
                ManagementFile.escribir(name_filese,"archivos", extencion, jsondataFinalusersobjetivos.getBytes());
                datamessagevector[cont]=datamensajefinalusersobjetivos;
                cont++;
            }

            JsonObject objectGsonDataNotification = new JsonObject();
            objectGsonDataNotification.addProperty("name_user", String.format("%s %s (%s)", message.getUseremisor().getNombres(),message.getUseremisor().getApellidos(),message.getUseremisor().getUsername()));
            objectGsonDataNotification.addProperty("type_message", tipomensaje);
            
            cont=0;
            for(User objuser : message.getUserobjetivos())
            {
                System.out.println("Se va a enviar al usuario= "+objuser.getCorreo()+" - "+objuser.getId());
                //envia el mensaje
                String iduserscriptado=encryptString.textEncryptor(objuser.getId().toString());

                String jsondataclassfinal=gson.toJson(datamessagevector[cont]);
                String name_file_final=cont==0?name_file_mensaje:name_file_message_vector[cont];
                ManagementFile.escribir(name_file_final,"static/datatemp", extencion, jsondataclassfinal.getBytes());
                String namefilefinalextencion=String.format("%s.%s", name_file_final,extencion);
                String keyusermessagetemp=encryptString.textEncryptor(objuser.getId().toString())+""+datamessagevector[cont].getIdgrupohash();

                if(resourceAvailability.Availability(request, "/datatemp/"+namefilefinalextencion))
                {
                    String idchat=encryptString.encriptPassword(keyusermessagetemp);
                    String iduserhash=encryptString.encriptPassword(iduserscriptado);

                    simpMessagingTemplate.convertAndSend("/queue/chat"+idchat,namefilefinalextencion.trim(),Map.of("persistent", "true"));
                    Thread.sleep(200);
                    simpMessagingTemplate.convertAndSend("/queue/chatall"+iduserhash,objectGsonDataNotification.toString(),Map.of("persistent", "true"));
                    Thread.sleep(200);
                }
                cont++;
            }
            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_GUARDADOS);
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

    /*est es un metodo de testo para verificar la obtencion y guardado de un archivo*/
    @PostMapping("/messagesfiletest")
    public ResponseEntity<?> ObtenerMessagetest(@RequestParam("file") MultipartFile objfile) 
    {
        Map<String,Object> response=new HashMap();
        try
        {
            System.out.println("Size= "+objfile.getSize());
            System.out.println("GetName= "+objfile.getName());
            System.out.println("GetName= "+objfile.getOriginalFilename());
            System.out.println("Bytes= "+objfile.getBytes());
            String name_file_mensaje=RamdomCN.Generate_UUID();
            String originalfilename=objfile.getOriginalFilename();
            String extencion=objfile.getOriginalFilename().substring(originalfilename.indexOf(".")+1, originalfilename.length());
            
            ManagementFile.escribir(name_file_mensaje,"temp", extencion, objfile.getBytes());

            response.put(MessagesResponce.SUCCESSFUL_KEY, MessagesResponce.DATOS_GUARDADOS);
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
    
 
    /* EVENTOS */
    
    @MessageExceptionHandler
    public void handleException(Throwable exception) {
        System.err.println("Error!! al manejar mensaje: " + exception.getMessage());
    }
    
    @EventListener
    public void handleSessionConnectEvent(SessionConnectEvent event) {
        System.out.println("Session Connect Event");
    }
    
    @EventListener
    public void SessionUnsubscribeEvent(SessionUnsubscribeEvent event) 
    {
        System.out.println("Session Unsubscribe Event");
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String idgrupohashheader= headerAccessor.getFirstNativeHeader("idhrupohash");
        String iduser= headerAccessor.getFirstNativeHeader("iduser");
        System.out.println("idgrupohashheader= "+idgrupohashheader);
        System.out.println("iduser= "+iduser);
        
    }
        

    @EventListener
    public void handleSuscribeEvent(SessionSubscribeEvent event) {
        System.out.println("User Subcribe");
  
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();

        String idgrupohashheader= headerAccessor.getFirstNativeHeader("idhrupohash");
        
        System.out.println("HEADER GRUPO MENSAJE HASH= "+idgrupohashheader);
        
        User user = (User) sessionAttributes.get(USER);
        System.out.println("************* El usuario suscrito es: **************");
        System.out.println("ID= "+user.getId());
        System.out.println("Correo= "+user.getCorreo());
        System.out.println("Contraseña= "+user.getPassword());
        System.out.println("Nombres= "+user.getNombres());
        System.out.println("Apellidos= "+user.getApellidos());
        System.out.println("Username= "+user.getUsername());
        System.out.println("************************************");
        
        String key=encryptString.textEncryptor(user.getId().toString())+""+idgrupohashheader;
        System.out.println("key user map grupo= "+key);

    }
        
    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent event) 
    {
        System.out.println("Session Disconnect Event");
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        Map<String, Object> sessionAttributes = headerAccessor.getSessionAttributes();
        
        System.out.println("*********** Informacion headerAccessor *******");
        System.out.println("Suscripcion ID= "+headerAccessor.getSubscriptionId());
        System.out.println("Session ID= "+headerAccessor.getSessionId());
        System.out.println("Tipo mensaje= "+headerAccessor.getMessageType());
        System.out.println("SESSION ATRIBUTES= "+headerAccessor.getSessionAttributes());
        
        if (sessionAttributes == null) 
            return;

        User user = (User) sessionAttributes.get(USER);
        
         if (user == null) 
            return;
        
        System.out.println(user.getId());
        System.out.println(user.getCorreo());
        System.out.println(user.getPassword());
        System.out.println(user.getNombres());
        System.out.println(user.getApellidos());
        System.out.println(user.getUsername());
        userstores.RemoveUser(user);
    }
    
    private boolean CheckUserConnected(Long iduser)
    {
        return userstores.getUserByID(iduser)!=null;
    }
    
}
