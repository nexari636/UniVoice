/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebasubstring {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        String url="http://localhost:8080/api/saludo";
        int index=url.indexOf("/api");
        System.out.println(index);
        System.out.println(url.substring(0, index));
        
        //ddddddddddddddddddddddddddddddddddddd
        String info="hola yo soy jhon jajaj me da mucha risa";

        Integer chunk_bandera=2;
        Integer cantidad_chunk=(int) Math.ceil(Double.parseDouble(String.valueOf(info.length()))/chunk_bandera);
        String [] datachunk=new String[cantidad_chunk];
        if(info.length()<chunk_bandera)
        {
            datachunk[0]=info;
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
                    datachunk[x]=info.substring(pos_inferior,info.length());
                }
                else
                {
                    datachunk[x]=info.substring(pos_inferior,pos_superior);
                    pos_inferior=pos_superior;
                    pos_superior+=chunk_bandera;
                }
                System.out.println("infooo="+datachunk[x]);
            }
            
            String uniondata="";
            for(String dat : datachunk)
            {
                uniondata+=dat;
            }
            System.out.println("****** data unida **********");
            System.out.println(uniondata);
            System.out.println(uniondata.equals(info));


        }


    }
    
}
