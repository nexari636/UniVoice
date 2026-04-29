/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.List;
/**
 *
 * @author Jhon (TheBlack)
 */
@Deprecated
public class Chunks 
{
    
    public static String DataUnion(JsonArray lstjson,String campoclave)
    {
        String data="";
        for(JsonElement datajson : lstjson)
        {
            //JsonObject jsonObject = JsonParser.parseString(datajson).getAsJsonObject();
            JsonObject jsonObject=datajson.getAsJsonObject();
            data+=jsonObject.get(campoclave).getAsString();
            System.out.println("orden= "+jsonObject.get("chunk_actual").getAsInt());
        }
        return data;
    }
    
    
    public static DataChunksClass ChunksParts(String data)
    {
        Integer chunk_bandera=20000;
        Integer cantidad_chunk=(int) Math.ceil(Double.parseDouble(String.valueOf(data.length()))/chunk_bandera);
        String [] datachunk=new String[cantidad_chunk];
        System.out.println("Longitud de cadena= "+data.length());
        System.out.println("Cantidad de chunk= "+cantidad_chunk);
        System.out.println("Longitud de vector= "+datachunk.length);
        
        if(data.length()<chunk_bandera)
        {
            datachunk[0]=data;
        }
        else
        {
            System.out.println("rellenando chunks....");
            int pos_superior=chunk_bandera;
            int pos_inferior=0;
            for(int x=0;x<cantidad_chunk;x++)  
            {
                if((x+1)==cantidad_chunk)
                {
                    System.out.println("Final...");
                    datachunk[x]=data.substring(pos_inferior,data.length());
                }
                else
                {
                    datachunk[x]=data.substring(pos_inferior,pos_superior);
                    pos_inferior=pos_superior;
                    pos_superior+=chunk_bandera;
                    System.out.println(pos_superior);
                }
            }
        }
        return new DataChunksClass(chunk_bandera,cantidad_chunk,datachunk);
    }
    
    
    
    
}
