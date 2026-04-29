/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.dataapi;

import com.api.apiamic.utils.ApiConverter;
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
public class DataMsgTranslate {

    String translation_text;
    
    public void processData(String message,String target_language)
    {
        Form form=new Form();
        form.param("text_message", message);
        form.param("target_language", target_language);

        JSONObject jo= ApiConverter.ApiMensajes(form,"/translate_message/");        
        loadData(jo);
    }
    
    public void loadData(JSONObject jo)
    {
        if(jo.equals(null)){
            System.out.println("Ha ocurrido un error");
            return;
        }
        this.translation_text=jo.getString("translation_text");
    }
    
    
}
