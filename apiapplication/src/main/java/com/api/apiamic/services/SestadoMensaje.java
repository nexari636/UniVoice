/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelEstadoMensaje;
import com.api.apiamic.repositorys.IestadoMensaje;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class SestadoMensaje 
{
    @Autowired
    IestadoMensaje iestadomensaje;
    
    public ModelEstadoMensaje Crear(ModelEstadoMensaje modelestadomensaje)
    {
        return iestadomensaje.save(modelestadomensaje);
    }
    
    public List<ModelEstadoMensaje> Listar()
    {
        return iestadomensaje.findAll();
    }
   
}
