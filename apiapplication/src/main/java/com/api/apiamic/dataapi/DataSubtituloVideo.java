/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.dataapi;

import com.api.apiamic.utils.ApiConverter;
import com.api.apiamic.utils.ManagementFile;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.ws.rs.core.Form;
import org.json.JSONArray;
import org.json.JSONObject;
/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DataSubtituloVideo 
{
    private String videobase64;
    private String namefile;
    private ResourceVideo [] data_video;
    private String success;
    private JSONObject data;
    
    public void processData(byte[] bytes, String extencion)
    {
        Form form=new Form();
        form.param("file_base_64", ManagementFile.BytesToBase64(bytes));
        form.param("extencion", extencion);
        JSONObject jo= ApiConverter.ApiMensajes(form,"/subtitulo_video/");        
        loadData(jo);
    }
    
    public void loadData(JSONObject jo)
    {
        if(jo.equals(null)){
            System.out.println("Ha ocurrido un error");
            return;
        }
        
        JSONArray data_video=jo.getJSONArray("data_video");
        ResourceVideo [] rv=new ResourceVideo[data_video.length()];
        for(int x=0;x<data_video.length();x++)
        {
            JSONObject jodata=data_video.getJSONObject(x);
            rv[x]=new ResourceVideo(jodata.getFloat("start"),
                                            jodata.getFloat("end"),
                                      jodata.getFloat("diferencia"),
                                jodata.getString("textsegmenenglish"),
                               jodata.getString("textsegmenespanish"));
        }
        this.data_video=rv;
        this.videobase64=jo.getString("videobase64");
        this.namefile=jo.getString("namefile");
        this.success=jo.getString("success");
        this.data=jo;
        
    }
    
    
}
