/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.api.apiamic.repositorys;

import com.api.apiamic.models.ModelMensaje;
import com.api.apiamic.models.ModelPersona;
import com.api.apiamic.models.ModelTipoGrupo;
import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jhon (TheBlack)
 */
@Repository
public interface Imensaje extends JpaRepository<ModelMensaje,Serializable>
{
    /*@Query(value="select * from func_buscartransporte(:idpersonagrupo)",nativeQuery=true)
    public List<ModelPersona> findByIdpersonagrupo(Long idpersonagrupo);  */
    
}
