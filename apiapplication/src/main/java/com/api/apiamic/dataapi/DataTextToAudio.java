/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.dataapi;

import com.api.apiamic.utils.ApiConverter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.ws.rs.core.Form;
import org.json.JSONObject;

/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataTextToAudio 
{
    private ResourceAudioIn dataaudioingles;
    private ResourceAudioEs dataaudioespanol;
    private String messageingles;
    private String messageespanol;
    private String success;
    private JSONObject data;
    
    public void processData(String mensaje_texto)
    {
        Form form=new Form();
        form.param("mensaje_texto", mensaje_texto);
        System.out.println("menjae api: "+mensaje_texto);
        JSONObject jo= ApiConverter.ApiMensajes(form,"/texto_to_audio/");        
        loadData(jo);
    }
    
    public void loadData(JSONObject jo)
    {
        if(jo.equals(null)){
            System.out.println("Ha ocurrido un error");
            return;
        }
        
        JSONObject dataaudioin=jo.getJSONObject("dataaudioingles");
        JSONObject dataaudioes=jo.getJSONObject("dataaudioespanol");

        this.dataaudioingles=new ResourceAudioIn(dataaudioin.getString("name_file"),dataaudioin.getString("audiobase64ingles"));
        this.dataaudioespanol=new ResourceAudioEs(dataaudioes.getString("name_file"),dataaudioes.getString("audiobase64espanol"));
        this.messageingles=jo.getString("messageingles");
        this.messageespanol=jo.getString("messageespanol");
        this.success=jo.getString("success");
        this.data=jo;
        
    }
    
    
    
  
}
