/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;
import java.security.SecureRandom;
import java.util.Random;
import java.util.UUID;

/**
 *
 * @author Jhon (TheBlack)
 */
public class RamdomCN 
{
    
    public static int GenerateNumRamdom()
    {
        try
        {
            Random ramdom =  SecureRandom.getInstance("SHA1PRNG");
            return ramdom.nextInt();
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return -1;
        }
    }
    
    
    public static int GenerateNumRamdom(Integer origin, Integer bound)
    {
        try
        {
            Random ramdom =  SecureRandom.getInstance("SHA1PRNG");
            return ramdom.nextInt(origin,bound);
        }
        catch(Exception ex)
        {
            System.out.println(ex.getMessage());
            return -1;
        }
    }
    
    
    public static String Generate_UUID()
    {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }
    
    
}
