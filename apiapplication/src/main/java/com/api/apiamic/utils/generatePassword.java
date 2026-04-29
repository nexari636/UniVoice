/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

/**
 *
 * @author Jhon (TheBlack)
 */
public class generatePassword 
{
    public static String[] password()
    {
        String uuid=RamdomCN.Generate_UUID();
        return new String[]{encryptString.encriptPassword(uuid),uuid};
    }
}
