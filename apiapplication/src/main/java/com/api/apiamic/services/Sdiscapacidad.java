/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelDiscapacidad;
import com.api.apiamic.repositorys.Idiscapacidad;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class Sdiscapacidad 
{
    @Autowired
    Idiscapacidad idiscapacidad;
    
    public ModelDiscapacidad Crear(ModelDiscapacidad modeldiscapacidad)
    {
        return idiscapacidad.save(modeldiscapacidad);
    }
    
    public List<ModelDiscapacidad> Listar()
    {
        return idiscapacidad.findAll();
    }
    
    public List<ModelDiscapacidad> BuscarPorDiscapacidad(String discapacidad)
    {
        return idiscapacidad.findByDiscapacidad(discapacidad);
    }
  
}
