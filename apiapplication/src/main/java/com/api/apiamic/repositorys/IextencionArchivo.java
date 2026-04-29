/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.api.apiamic.repositorys;

import com.api.apiamic.models.ModelExtencionArchivo;
import com.api.apiamic.models.ModelMensaje;
import java.io.Serializable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Jhon (TheBlack)
 */
@Repository
//@Deprecated
public interface IextencionArchivo extends JpaRepository<ModelExtencionArchivo,Serializable>
{
}
