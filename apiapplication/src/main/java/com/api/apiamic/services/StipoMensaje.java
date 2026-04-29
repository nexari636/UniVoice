/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelTipoMensaje;
import com.api.apiamic.repositorys.ItipoMensaje;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class StipoMensaje
{
    @Autowired
    ItipoMensaje itipomensaje;
    
    public ModelTipoMensaje Crear(ModelTipoMensaje modeltipomensaje)
    {
        return itipomensaje.save(modeltipomensaje);
    }
    
    public List<ModelTipoMensaje> Listar()
    {
        return itipomensaje.findAll();
    }
    
}
