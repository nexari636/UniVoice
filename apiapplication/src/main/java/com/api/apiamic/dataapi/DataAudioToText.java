/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.dataapi;

import com.api.apiamic.utils.ApiConverter;
import com.api.apiamic.utils.ManagementFile;
import jakarta.ws.rs.core.Form;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.json.JSONObject;

/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataAudioToText 
{
    private String audiobase64;
    private String namefile;
    private String messageingles;
    private String messageespanol;
    private String success;
    private JSONObject data;
    
    public void processData(byte[] bytes, String extencion)
    {
        Form form=new Form();
        form.param("file_base_64", ManagementFile.BytesToBase64(bytes));
        form.param("extencion", extencion);
        JSONObject jo= ApiConverter.ApiMensajes(form,"/audio_to_text/");        
        loadData(jo);
    }
    
    public void loadData(JSONObject jo)
    {
        if(jo.equals(null)){
            System.out.println("Ha ocurrido un error");
            return;
        }

        this.namefile=jo.getString("namefile");
        this.messageingles=jo.getString("messageingles");
        this.messageespanol=jo.getString("messageespanol");
        this.audiobase64=jo.getString("audiobase64");
        this.success=jo.getString("success");
        this.data=jo;
    }
    
    
    
}
