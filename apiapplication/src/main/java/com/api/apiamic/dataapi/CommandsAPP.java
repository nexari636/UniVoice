/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.dataapi;

import com.api.apiamic.utils.ApiConverter;
import com.api.apiamic.utils.CommandAppInf;
import com.api.apiamic.utils.ManagementFile;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import jakarta.ws.rs.core.Form;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;

/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
public class CommandsAPP 
{
    Form form;
    private String language;
    

    public CommandsAPP(String base64,String extencion,String language)
    {
        form=new Form();
        form.param("file_base_64", base64);
        form.param("extencion",extencion);
        this.setLanguage(language);
    }
    
    
    public JSONObject ProcessCommand()
    {
        JSONObject jo= ApiConverter.ApiMensajes(form,"/transcribe_audio/");
        String resultado=jo.getString("result");
        System.out.println(resultado);
        resultado=resultado.toLowerCase();
        CommandAppInf cappinf=new CommandAppInf(resultado,this.getLanguage());
        System.out.println(cappinf.getJoData().toString());
        return cappinf.getJoData();
    }
    
    
}
