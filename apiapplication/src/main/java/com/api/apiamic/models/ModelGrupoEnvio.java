/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="grupoenvio")
public class ModelGrupoEnvio 
{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long idgrupoenvio;
    
    @ManyToOne
    @JoinColumn(name = "mensaje", nullable = false, unique = false)
    ModelMensaje mensaje;
    
    @ManyToOne
    @JoinColumn(name = "personagrupo", nullable = false, unique = false)
    ModelPersonaGrupo personagrupo;
    
}
