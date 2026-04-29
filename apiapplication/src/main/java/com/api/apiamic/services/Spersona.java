/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelDiscapacidad;
import com.api.apiamic.models.ModelPersona;
import com.api.apiamic.repositorys.Ipersona;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class Spersona 
{
    @Autowired
    Ipersona ipersona;
    
    public ModelPersona Crear(ModelPersona modelpersona)
    {
        return ipersona.save(modelpersona);
    }
    
    public ModelPersona Actualizar(ModelPersona modelpersona)
    {
        return ipersona.save(modelpersona);
    }
    
    public List<ModelPersona> Listar()
    {
        return ipersona.findAll();
    }
    
    public List<ModelPersona> BuscarPorUsername(String username)
    {
        return ipersona.findByPusername(username);
    }
    
    public List<ModelPersona> BuscarPorCorreo(String correo)
    {
        return ipersona.findByPcorreo(correo);
    }
    
    public List<ModelPersona> BuscarPorIdPersona(Long idpersona)
    {
        return ipersona.findByIdpersona(idpersona);
    }
    
}
