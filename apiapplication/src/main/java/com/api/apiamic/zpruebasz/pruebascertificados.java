/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.ConfigAES;
import com.api.apiamic.utils.ManagementFile;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebascertificados {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        //crearcertificado();
        //encriptartexto();
        desencriptartexto();
    }
    
    private static void crearcertificado()
    {
        ConfigAES caes=new ConfigAES();
        String [] data=caes.CrearLlave();
        System.out.println(data[0]);
        System.out.println(data[1]);
    }
    
    private static void encriptartexto()
    {
        ConfigAES caes=new ConfigAES("e3f9b699-6351-415c-a05f-c665d3ae76b1.key");
        String [] data=caes.EncriptarInformacion("Hola","");
        System.out.println(data[0]);
        System.out.println(data[1]);
        System.out.println(data[2]);
    }

    private static void desencriptartexto() 
    {
        ConfigAES caes=new ConfigAES("e3f9b699-6351-415c-a05f-c665d3ae76b1.key");
        String data=caes.DesencriptarInformacion("NZ7WbA==","tzogeNh9/p4QHo6YJy0uaA==");
        //String sii=caes.SIII("U2FsdGVkX18Y/V6pCF8tZ+QvDpsokX0zLnKOMHKkaaU=");
        System.out.println(data);
        //System.out.println("SII= "+sii);
        
        ConfigAES caes2=new ConfigAES("e3f9b699-6351-415c-a05f-c665d3ae76b1.key");
        System.out.println("nuevoooo");
        String dataaa=caes2.DesencriptarInformacion("L7A4Ak2fWE5ST44qIQ==","YjzbqJEz0LQUgH8tDjZc/A==");
        System.out.println(dataaa);
        
        
        /*prueba con el cifrado de kotlin*/
        System.out.println("********prueba cifrado de kotlin************");
        if(false){
            String llavebase64="riEaa2Ba2km0bHw6pSrteb5vz5iTl0cnGG/7iEt0ziQ=";
            byte[] llaveb=ManagementFile.Base64ToBytes(llavebase64);
            ManagementFile.escribir("llaves", "key", llaveb);
        }
        //5f069f7f-d0ec-4d27-a9e5-1eff88c4fc73.key --> original creada para el usuario jleturnep@uteq.edu.ec
        ConfigAES caes3=new ConfigAES("34024428-3d43-4377-bf87-212357b0f12b.key");
        String dataaanuevaa=caes3.DesencriptarInformacion("PA6yxdzDGagGsw==","PqRe2B+TTPuCVJXiSr15tA==");
        System.out.println("Data descifrada: "+dataaanuevaa);

        

    }
}
