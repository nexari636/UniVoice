/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.dateCurrent;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 *
 * @author Jhon (TheBlack)
 */
public class pruebafecha 
{

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) 
    {
        String [] dateformats=FormatsDate();
        for(String ff : dateformats)
        {
            System.out.println(ff);
        }
        
    }
    
       
    public static String[] FormatsDate()
    {
        Date todayDate = new Date();
        SimpleDateFormat fechacompleta = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat fechacompletatime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat time = new SimpleDateFormat("HH:mm:ss");
        SimpleDateFormat timessn = new SimpleDateFormat("HH:mm");
        SimpleDateFormat fm1 = new SimpleDateFormat("MMMM d, yyyy", Locale.ENGLISH);
        SimpleDateFormat fm2 = new SimpleDateFormat("MMMM d, yyyy",new Locale.Builder().setLanguage("es").setRegion("EC").build());
        SimpleDateFormat fm3ampm = new SimpleDateFormat("hh:mm a");
        
        return new String[]
        {
            fechacompleta.format(todayDate),
            fechacompletatime.format(todayDate),
            time.format(todayDate),
            timessn.format(todayDate),
            fm1.format(todayDate),
            fm2.format(todayDate),
            fm3ampm.format(todayDate)
        };
    }
    
    public static void prueba1()
    {
        System.out.println(dateCurrent.getDateCurrent().toString());
        SimpleDateFormat dia = new SimpleDateFormat("dd-MM-yyyy");
        Date todayDate = new Date();
        System.out.println(dia.format(todayDate));
        
        SimpleDateFormat fm2 = new SimpleDateFormat("MMMM d, yyyy", Locale.ENGLISH);
        System.out.println(fm2.format(todayDate));

        SimpleDateFormat fm3 = new SimpleDateFormat("hh:mm a");
        System.out.println(fm3.format(todayDate));
    }
    
    
}
