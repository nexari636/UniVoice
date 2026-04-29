/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.dataapi;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.ws.rs.core.Form;
import org.json.JSONObject;
import com.api.apiamic.utils.ApiConverter;
import com.api.apiamic.utils.ManagementFile;

/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataDescriptionImage 
{
    private ResourceAudioIn dataaudioingles;
    private ResourceAudioEs dataaudioespanol;
    private String messageingles;
    private String messageespanol;
    private String imagenbase64;
    private String nameimagen;
    private String success;
    private JSONObject data;
    
    public void processData(byte[] bytes, String extencion)
    {
        Form form=new Form();
        form.param("file_base_64", ManagementFile.BytesToBase64(bytes));
        form.param("extencion", extencion);
        JSONObject jo= ApiConverter.ApiMensajes(form,"/descripcion_imagen/");        
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
        this.imagenbase64=jo.getString("imagenbase64");
        this.imagenbase64=jo.getString("nameimagen");
        this.success=jo.getString("success");
        this.data=jo;
    }
    
}
