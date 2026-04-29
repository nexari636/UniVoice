/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelGrupo;
import com.api.apiamic.repositorys.Igrupo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class Sgrupo 
{
    @Autowired
    Igrupo igrupo;
    
    public ModelGrupo Crear(ModelGrupo modelgrupo)
    {
        return igrupo.save(modelgrupo);
    }
    
    public ModelGrupo Actualizar(ModelGrupo modelgrupo)
    {
        return igrupo.save(modelgrupo);
    }
    
    public List<ModelGrupo> Listar()
    {
        return igrupo.findAll();
    }

    
    public List<ModelGrupo> BuscarPorIdGrupo(Long idgrupo)
    {
        return igrupo.findByIdgrupo(idgrupo);
    }
}
