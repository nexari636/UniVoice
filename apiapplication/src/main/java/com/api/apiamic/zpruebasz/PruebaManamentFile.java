/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.zpruebasz;

import com.api.apiamic.utils.ManagementFile;

/**
 *
 * @author Jhon (TheBlack)
 */
public class PruebaManamentFile {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)
    {
        System.out.println(ManagementFile.BytesToBase64(ManagementFile.leerbytes("archivos", "comandos.txt")));
        System.out.println(ManagementFile.Base64ToBytes("ZGVzYWN0aXZhciBhbmltYWNpb25lcyBsaW51eCBzaSBzZSBxdWllcmUgdm9sdmVyIGEgYWN0aXZhciBjYW1iaWFyIGZhbHNlIHBvciB0cnVlIC0tPiB4ZmNvbmYtcXVlcnkgLWMgeGZ3bTQgLXAgL2dlbmVyYWwvdXNlX2NvbXBvc2l0aW5nIC1zIGZhbHNlDQo="));
    
        System.out.println(ManagementFile.BytesToBase64(ManagementFile.leerbytes("llaves", "e3f9b699-6351-415c-a05f-c665d3ae76b1.key")));

        System.out.println(ManagementFile.BytesToBase64(ManagementFile.leerbytes("llaves", "06f6147f-b493-4c78-bec7-e2468b5b012c.key")));
        
        System.out.println(ManagementFile.BytesToBase64(ManagementFile.leerbytes("llaves", "3388fde5-ddba-4473-9ba2-c04612bb2d83.key")));

    }
    
}
