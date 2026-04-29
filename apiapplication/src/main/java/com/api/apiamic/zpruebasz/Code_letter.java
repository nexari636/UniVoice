/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import org.json.JSONObject;

/**
 *
 * @author Jhon (TheBlack)
 */
public class Code_letter {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        
        JSONObject jo=new JSONObject();
        jo.put("a", "0");
        jo.put("b", "1");
        jo.put("c", "2");
        jo.put("d", "3");
        jo.put("e", "4");
        jo.put("f", "5");
        jo.put("g", "6");
        jo.put("h", "7");
        jo.put("i", "8");
        jo.put("j", "9");
        
        //System.out.println(jo.getString("asdf"));
        System.out.println(jo.getString("a"));


        String cad="JAFG".toLowerCase();
        char [] vec_tokens=cad.toCharArray();
        String data="";
        
        Integer.valueOf("5");
        
        try{
            for(char c : vec_tokens)
            {
                data+=jo.getString(String.valueOf(c));
            }
        }
        catch(Exception ex)
        {
            String error=ex.getMessage();
            System.out.println("ERROR= "+error);
        }

        System.out.println("Data= "+data);
    }
    
}
