/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelTipoGrupo;
import com.api.apiamic.repositorys.Itipogrupo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class StipoGrupo 
{
    @Autowired
    Itipogrupo itipogrupo;
    
    public ModelTipoGrupo Crear(ModelTipoGrupo modeltipogrupo)
    {
        return itipogrupo.save(modeltipogrupo);
    }
    
    public List<ModelTipoGrupo> Listar()
    {
        return itipogrupo.findAll();
    }
}
