/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelIdioma;
import com.api.apiamic.repositorys.Iidioma;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
public class Sidioma 
{
    @Autowired
    Iidioma iidioma;
    
    public ModelIdioma Crear(ModelIdioma modelidioma)
    {
        return iidioma.save(modelidioma);
    }
    
    public List<ModelIdioma> Listar()
    {
        return iidioma.findAll();
    }
    
    public List<ModelIdioma> BuscarPorIdiomaPrefix(String idioma)
    {
        return iidioma.findByPrefix(idioma);
    }

}
