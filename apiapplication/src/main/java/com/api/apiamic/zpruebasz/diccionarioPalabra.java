/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.swabunga.spell.engine.SpellDictionaryHashMap;
import com.swabunga.spell.event.SpellChecker;
import java.io.File;
import java.io.IOException;

/**
 *
 * @author Jhon (TheBlack)
 */
public class diccionarioPalabra {

    
    //https://github.com/LibreOffice/dictionaries
    //https://mvnrepository.com/artifact/net.sf.jazzy/jazzy/0.5.2-rtext-1.4.1-2
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException 
    {
        SpellDictionaryHashMap dictionary = new SpellDictionaryHashMap(
                new File("C:\\Users\\USUARIO\\Desktop\\DICCIONARIOS\\Spanish.dic"),
                new File("C:\\Users\\USUARIO\\Desktop\\DICCIONARIOS\\Spanish.aff")
        );

        SpellChecker spellChecker = new SpellChecker(dictionary);

        String palabra = "usurio";
        if (!spellChecker.isCorrect(palabra)) {
            System.out.println("Palabra incorrecta: " + palabra);
            System.out.println("Sugerencias: " + spellChecker.getSuggestions(palabra, 5));
        }
        
        
        
    }
    
}
