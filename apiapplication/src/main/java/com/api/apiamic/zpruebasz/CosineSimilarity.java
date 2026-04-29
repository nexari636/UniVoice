/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.simmetrics.StringMetric;
import org.simmetrics.metrics.StringMetrics;

/**
 *
 * @author Jhon (TheBlack)
 */

//METRICA
public class CosineSimilarity {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        
        String cadena="hola como estas";
        System.out.println(cadena.substring(10, 10+"estas".length()));
        System.out.println(cadena.indexOf("estas"));
        
        StringBuilder sb=new StringBuilder(cadena);
        sb.setCharAt(10,'A');
        
        System.out.println(sb.toString());
        
        int h=cant_palabra("hola como estas estas estas estas estas","estas");
        System.out.println("Cantidad de veces que aparece la palabra= "+h);
        //CosineSimilarity_process();
        CosineSimilarity_process_library();
    }
    
    private static List<String> tokenizer(String texto)
    {
        //solo permite caracteres de la a-z y záéíóúñü los demas los elimina, ademas mediante \\s+ separa entre espacios la frase
        return Arrays.asList(texto.toLowerCase().replaceAll("[^a-záéíóúñü ]", "").split("\\s+"));
    }
    
    private static int cant_palabra(String texto,String buscar)
    {
        int cantidad=0;
        int pos_actual=0;
        String cadena=texto;
        StringBuilder sb=new StringBuilder(cadena);

        while(true)
        {
            pos_actual=sb.indexOf(buscar);
            System.out.println(pos_actual);
            
            if(pos_actual==-1)
                return cantidad;
            else
                sb.setCharAt(pos_actual, '<');

            cantidad++;
        }
    }
    
    
    private static void CosineSimilarity_process()
    {
        String fraseuno="enviar mensaje de texto";
        String frasedos="enviar audio mensaje";
        
        List<String> tokenizer_lstsfraseuno=tokenizer(fraseuno);
        List<String> tokenizer_lstsfrasedos=tokenizer(frasedos);
        
        Set<String> conjuntoUnico = new HashSet<>(tokenizer_lstsfraseuno);
        conjuntoUnico.addAll(tokenizer_lstsfrasedos);
        
        for(String cad : conjuntoUnico)
        {
            System.out.println(cad);
        }
        
        int[][] matrix_tok=new int[2][conjuntoUnico.size()];
        String [] frases=new String[]{fraseuno,frasedos};
        List<String> miLista = new ArrayList<>(conjuntoUnico);
        
        System.out.println("longitud= "+matrix_tok[0].length);
        
        for(int x=0;x<matrix_tok.length;x++) //filas
        {
            String cadena=frases[x];
            
            for(int i=0;i<matrix_tok[0].length;i++) //columnas
            {
                matrix_tok[x][i]=cant_palabra(frases[x],miLista.get(i));
            }
        }
       
    }
    
    
    
    
    private static void CosineSimilarity_process_library()
    {
        String texto1 = "enviar mensaje de texto";
        String texto2 = "mandar texto mensaje";

        StringMetric metric = StringMetrics.cosineSimilarity();
        float similarity = metric.compare(texto1, texto2);

        System.out.println("Similitud de coseno: " + similarity);
        
    }
    
}
