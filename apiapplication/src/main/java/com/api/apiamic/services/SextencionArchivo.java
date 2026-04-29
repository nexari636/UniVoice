/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.services;

import com.api.apiamic.models.ModelExtencionArchivo;
import com.api.apiamic.repositorys.IextencionArchivo;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Jhon (TheBlack)
 */
@Service
//@Deprecated
public class SextencionArchivo {
    
    @Autowired
    IextencionArchivo iextencionarchivo;
    
    public ModelExtencionArchivo Crear(ModelExtencionArchivo modelextencionarchivo)
    {
        return iextencionarchivo.save(modelextencionarchivo);
    }
    
    public List<ModelExtencionArchivo> Listar()
    {
        return iextencionarchivo.findAll();
    }
    
}
