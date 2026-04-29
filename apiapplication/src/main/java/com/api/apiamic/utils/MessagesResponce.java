/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;

/**
 *
 * @author Jhon (TheBlack)
 */
public class MessagesResponce 
{
    public static String ARCHIVO_ELIMINADO="Archivo eliminado correctamente";
    public static String FOTO_ACTUALIZADA="Foto actualizada correctamente";
    public static String DATOS_CARGADOS_CORRECTAMENTE="Datos cargados correctamente";
    public static String DATOS_GUARDADOS="Los datos se han guardado correctamente";
    public static String DATOS_GRUPO_GUARDADOS="Grupo creado correctamente";
    public static String ERROR_DATOS_INCOMPLETOS="Datos incompletos";
    public static String ERROR_SISTEMA="Ha ocurrido un error en el sistema";
    public static String DATA="data";
    public static String SUCCESSFUL_KEY="successful";
    public static String ERROR_KEY="error";


    private static final String EX_MESSAGE_UNIQUE="could not execute statement [ERROR: llave duplicada viola restricción de unicidad «%s_%s_key»";
    public static String EX_PUSERNAME=String.format(EX_MESSAGE_UNIQUE,"persona" ,"pusername"); //tabla-campo
    public static String EX_PTELEFONO=String.format(EX_MESSAGE_UNIQUE, "persona","ptelefono");
    public static String EX_PCORREO=String.format(EX_MESSAGE_UNIQUE, "persona","pcorreo");
            
    public static String PUSERNAME_EXISTENTE="El username ya existe";
    public static String PTELEFONO_EXISTENTE="El telefono ya existe";
    public static String PCORREO_EXISTENTE="El correo ya existe";

   
}
