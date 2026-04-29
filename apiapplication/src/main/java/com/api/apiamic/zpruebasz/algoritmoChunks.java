/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.ManagementFile;

/**
 *
 * @author Jhon (TheBlack)
 */
public class algoritmoChunks {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        String data=ManagementFile.LeerTxt("archivos", "pruebachunk1.txt");
        System.out.println(data);
        //diez mil caracteres por chunks
        //System.out.println(70000/10000); //tamaño de 104
        //Math.ceil --> redondeo hacia arriva ejemplo: 1.2 ->> 2
        Integer chunk_bandera=20000;
        Integer cantidad_chunk=(int) Math.ceil(Double.parseDouble(String.valueOf(data.length()))/chunk_bandera);
        String [] datachunk=new String[cantidad_chunk];
        System.out.println("Longitud de cadena= "+data.length());
        System.out.println("Cantidad de chunk= "+cantidad_chunk);
        System.out.println("Longitud de vector= "+datachunk.length);

        //System.out.println(Math.ceil(0.0104));
        //System.out.println(500D/60000);
        
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
            
            String uniondata="";
            for(String dat : datachunk)
            {
                uniondata+=dat;
            }
            ManagementFile.escribir("infochunk", "archivos", "mp4", ManagementFile.Base64ToBytes(uniondata));
        }
        

        
    }
    
}
