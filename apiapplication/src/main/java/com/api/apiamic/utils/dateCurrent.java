/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Locale;
/**
 *
 * @author Jhon (TheBlack)
 */
public class dateCurrent 
{
    public static Date getDateCurrent()
    {
        try
        {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"); 
            //se hace asi porque SimpleDateFormat no es compatible con el formato de LocalDateTime.now() directo         
            //poreso primero DateTimeFormatter.ofPattern y luego se formatea en SimpleDateFormat
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(dtf.format(LocalDateTime.now()));
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
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
    
    
    public static LocalDateTime getDateCurrentLocalDateTime()
    {
        try
        {
            return LocalDateTime.now();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return null;
        }
    }
    
    
    
}
