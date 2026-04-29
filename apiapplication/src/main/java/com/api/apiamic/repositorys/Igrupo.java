/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.api.apiamic.repositorys;

import com.api.apiamic.models.ModelDiscapacidad;
import com.api.apiamic.models.ModelGrupo;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jhon (TheBlack)
 */
@Repository
public interface Igrupo extends JpaRepository<ModelGrupo,Serializable>
{
    public List<ModelGrupo> findByIdgrupo(Long idgrupo);  
}
