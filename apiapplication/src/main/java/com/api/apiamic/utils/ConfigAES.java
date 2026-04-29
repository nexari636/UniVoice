/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

/**
 *
 * @author Jhon (TheBlack)
 */
public class ConfigAES 
{
    private String CARPETA="llaves";
    public String RUTA="";
    public String RUTA_ABSOLUTA="";
    private String OOID_NAME="";
    public String NAME_FILE_KEY="";
    private boolean TIPO; //true --> solo crear la llave ; false --> encriptar/desencriptar
    
    
    //para cuando se vaya a desencriptar o encriptar
    public ConfigAES(String name_file_key)
    {
        this.RUTA=Ruta.ObtenerRuta(this.CARPETA)[1];
        this.NAME_FILE_KEY=name_file_key;
        this.RUTA_ABSOLUTA=this.RUTA+this.NAME_FILE_KEY;
        this.TIPO=false;
    }
            
    //para crear certificados
    public ConfigAES()
    {
        this.RUTA=Ruta.ObtenerRuta(this.CARPETA)[1];
        this.OOID_NAME=RamdomCN.Generate_UUID();
        this.NAME_FILE_KEY=String.format("%s.key", this.OOID_NAME);
        this.RUTA_ABSOLUTA=this.RUTA+this.NAME_FILE_KEY;
        this.TIPO=true;
    }
    
    
    public String[] CrearLlave()
    {
        try
        {
            KeyGenerator kgen = KeyGenerator.getInstance("AES");
            kgen.init(256);
            
            System.out.println("Algoritmo: "+kgen.generateKey().getAlgorithm());
            System.out.println("Formato: "+kgen.generateKey().getFormat());
            System.out.println("Key: "+kgen.generateKey());
            System.out.println("Ecoded key: "+kgen.generateKey().getEncoded());
            
            SecretKey key = kgen.generateKey();
            String base64secretkey=Base64.getEncoder().encodeToString(key.getEncoded());
            System.out.println("Base64 key: "+base64secretkey);
                        
            return escribirArchivo("","bin",key.getEncoded());
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    public String[] EncriptarInformacion(String mensaje,String name_file)
    {
        try
        {
            byte[] keyBytes = Files.readAllBytes(Paths.get(this.RUTA_ABSOLUTA));
            SecretKey mySecretKey = new SecretKeySpec(keyBytes, "AES"); //reconstruir la llave a partir de los bytes
            
            String secretMessage = mensaje; //mensaje a codificar
            /*ENCRIPTAR*/
            //se instancia la clase cipher que nos permite encriptar mensajes con la llave publica y privada
            //algoritmo/modo/tipo_relleno
            //se utiliza el modo CFB para mas seguridad
            Cipher encryptCipher = Cipher.getInstance("AES/CFB/NoPadding"); 
            //se pasa por argumento de iniciacion la clave privada y el modo de encriptamiento
            encryptCipher.init(Cipher.ENCRYPT_MODE, mySecretKey);
            //java genera solo el iv (vector de inicializacion) auque opcionalmente lo podemos crear 
            //nosotros mismos. ademas esto es unico para cada ecnriptamiento de informacion.
            //es unico porque no se puede volver a reutilizar para cifrar
            //el tamaño maximo es de 128 bits o 16 bytes (128/8)
            byte[] iv = encryptCipher.getIV();
            
            //la cadena de string se codifica en bytes pero con el estandar UTF_8 
            byte[] secretMessageBytes = secretMessage.getBytes(StandardCharsets.UTF_8);

            //finalmente codificamos los bytes anteriores y nos retornara un arreglo de bytes pero ya codificados
            byte[] encryptedMessageBytes = encryptCipher.doFinal(secretMessageBytes);
            //si se desea guardar el mensaje codificado seria mas conveniente guardarlo en base 64 para eso se convierte
            String encodedMessage = Base64.getEncoder().encodeToString(encryptedMessageBytes);
            //se imprime el base 64
            System.out.println("*** MENSAJE ENCRIPTADO: *********");
            //System.out.println(encodedMessage);
            
            //esta se puede eliminar :V
            String [] data_file=escribirArchivo(name_file,"bin",encryptedMessageBytes);
            
            //en la posiicon 0 esta la ruta completa del archivo en la 1 esta solo el nombre con su extencion 
            //en la 2 posicion esta el vector de inicializacion
            //en la ultima posicion se encuentra el mensaje en base64
            return new String[]{data_file[0],data_file[1],ManagementFile.BytesToBase64(iv),encodedMessage};
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
        return null;
    }
    
    
    public String DesencriptarInformacion(String name_file_message,String iv)
    {
        try
        {
            //regeneramos el vector de inicializacion para que se valide la firma y se desencripte el resultado
            IvParameterSpec ips=new IvParameterSpec(ManagementFile.Base64ToBytes(iv.trim()));
            
            byte[] BytesMessage=null;
            //este if solo para pruebas
            if(name_file_message.contains(".bin"))
                BytesMessage = Files.readAllBytes(Paths.get(Ruta.ObtenerRuta("archivos")[1]+name_file_message));
            else
                BytesMessage=ManagementFile.Base64ToBytes(name_file_message);
                
            byte[] keyBytes = Files.readAllBytes(Paths.get(this.RUTA_ABSOLUTA));
            SecretKey mySecretKey = new SecretKeySpec(keyBytes, "AES"); //reconstruir la llave a partir de los bytes
            
            //se instancia nuevamente la clase Cipher pero ahora para poder desencriptar
            Cipher decryptCipher = Cipher.getInstance("AES/CFB/NoPadding");
            //Se inicializa con el modo de desencriptamiento ademas de pasar la llave privada
            decryptCipher.init(Cipher.DECRYPT_MODE, mySecretKey,ips);
            
            //hay que tener en cuenta que si convertimos el array de bytes enceriptado a base 64 debemos volver a 
            //convertirlo a bytes para poderlo desencriptar como se muestra en la siguiente linea.
            byte[] decryptedMessageBytes = decryptCipher.doFinal(BytesMessage);
            
            String decryptedMessage = new String(decryptedMessageBytes, StandardCharsets.UTF_8);
            //System.out.println("Mensaje desencriptado: "+decryptedMessage);
            return decryptedMessage;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
        return null;
    }
    
        
    private String[] escribirArchivo(String name_file,String formato,byte[] bytes)
    {
        try
        {
            if(!this.TIPO){ //escribe los mensajes
                this.OOID_NAME=name_file.equals("")?RamdomCN.Generate_UUID():name_file;
                String name_archivo=String.format("%s.%s", this.OOID_NAME,formato);
                FileOutputStream streamsd = new FileOutputStream(Ruta.ObtenerRuta("archivos")[1]+name_archivo);
                streamsd.write(bytes);
                streamsd.close();
                return new String[]{this.RUTA+name_archivo,name_archivo};
            }
            else{ //escribe los certificados creados
                FileOutputStream streamsd = new FileOutputStream(this.RUTA_ABSOLUTA);
                streamsd.write(bytes);
                streamsd.close();
                String base64secretkey=Base64.getEncoder().encodeToString(bytes);
                return new String[]{this.RUTA_ABSOLUTA,this.NAME_FILE_KEY,base64secretkey};
            }
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    
    @Deprecated
    public String SIII(String base64)
    {
        try
        {
            byte[] BytesMessage = ManagementFile.Base64ToBytes(base64);
            
            byte[] keyBytes = Files.readAllBytes(Paths.get(this.RUTA_ABSOLUTA));
            SecretKey mySecretKey = new SecretKeySpec(keyBytes, "AES"); //reconstruir la llave a partir de los bytes
            
            //se instancia nuevamente la clase Cipher pero ahora para poder desencriptar
            Cipher decryptCipher = Cipher.getInstance("AES");
            //Se inicializa con el modo de desencriptamiento ademas de pasar la llave privada
            decryptCipher.init(Cipher.DECRYPT_MODE, mySecretKey);
            //hay que tener en cuenta que si convertimos el array de bytes enceriptado a base 64 debemos volver a 
            //convertirlo a bytes para poderlo desencriptar como se muestra en la siguiente linea.
            byte[] decryptedMessageBytes = decryptCipher.doFinal(BytesMessage);
            
            String decryptedMessage = new String(decryptedMessageBytes, StandardCharsets.UTF_8);
            System.out.println("Mensaje desencriptado: "+decryptedMessage);
            return decryptedMessage;
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
        return null;
    }
    
    
    
    @Deprecated
    private String[] EncriptarInformacion(String mensaje,byte[]inf_desencrip)
    {
        try
        {
            byte[] keyBytes = Files.readAllBytes(Paths.get(this.RUTA_ABSOLUTA));
            SecretKey mySecretKey = new SecretKeySpec(keyBytes, "AES"); //reconstruir la llave a partir de los bytes
            
            String secretMessage = mensaje; //mensaje a codificar
            /*ENCRIPTAR*/
            //se instancia la clase cipher que nos permite encriptar mensajes con la llave publica y privada
            Cipher encryptCipher = Cipher.getInstance("AES"); 
            //se pasa por argumento de iniciacion la clave privada y el modo de encriptamiento
            encryptCipher.init(Cipher.ENCRYPT_MODE, mySecretKey);
            
            byte[] secretMessageBytes=null;
            
            if(!mensaje.equals(""))
            {
                //la cadena de string se codifica en bytes pero con el estandar UTF_8 
                secretMessageBytes = secretMessage.getBytes(StandardCharsets.UTF_8);
            }
            else
                secretMessageBytes=inf_desencrip;
          
            //finalmente codificamos los bytes anteriores y nos retornara un arreglo de bytes pero ya codificados
            byte[] encryptedMessageBytes = encryptCipher.doFinal(secretMessageBytes);
            //si se desea guardar el mensaje codificado seria mas conveniente guardarlo en base 64 para eso se convierte
            String encodedMessage = Base64.getEncoder().encodeToString(encryptedMessageBytes);
            //se imprime el base 64
            System.out.println(encodedMessage);
            
            if(!mensaje.equals(""))
                return new String[]{encodedMessage};
            else
                return escribirArchivo("","bin",encryptedMessageBytes);
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
        return null;
    }

    
    @Deprecated
    //si el parametro formato es vacio es porque es un mensaje de texto caso contrario no
    private String[] DesencriptarInformacion(byte[]inf_encrip,String formato)
    {
        try
        {
            byte[] keyBytes = Files.readAllBytes(Paths.get(this.RUTA_ABSOLUTA));
            SecretKey mySecretKey = new SecretKeySpec(keyBytes, "AES"); //reconstruir la llave a partir de los bytes
            
            //se instancia nuevamente la clase Cipher pero ahora para poder desencriptar
            Cipher decryptCipher = Cipher.getInstance("AES");
            //Se inicializa con el modo de desencriptamiento ademas de pasar la llave privada
            decryptCipher.init(Cipher.DECRYPT_MODE, mySecretKey);
            //hay que tener en cuenta que si convertimos el array de bytes enceriptado a base 64 debemos volver a 
            //convertirlo a bytes para poderlo desencriptar como se muestra en la siguiente linea.
            byte[] decryptedMessageBytes = decryptCipher.doFinal(inf_encrip);
            
            
            if(formato.equals(""))
            {
                String decryptedMessage = new String(decryptedMessageBytes, StandardCharsets.UTF_8);
                System.out.println("Mensaje desencriptado: "+decryptedMessage);
                return new String[]{decryptedMessage};
            }else
            {
               return escribirArchivo("",formato,decryptedMessageBytes);
            }
            
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
        }
        return null;
    }
    
}
