/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelPersonaGrupo;
import com.api.apiamic.repositorys.IpersonaGrupo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class SpersonaGrupo 
{
    @Autowired
    IpersonaGrupo ipersonagrupo;
    
    public ModelPersonaGrupo Crear(ModelPersonaGrupo modelpersonagrupo)
    {
        return ipersonagrupo.save(modelpersonagrupo);
    }
    
    public ModelPersonaGrupo Actualizar(ModelPersonaGrupo modelpersonagrupo)
    {
        return ipersonagrupo.save(modelpersonagrupo);
    }
    
    public List<ModelPersonaGrupo> Listar()
    {
        return ipersonagrupo.findAll();
    }
    
}
