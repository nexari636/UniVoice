/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
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
@Table(name="personagrupo")
public class ModelPersonaGrupo 
{    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long idpersonagrupo;
    
    @ManyToOne
    @JoinColumn(name = "grupo", nullable = false, unique = false)
    ModelGrupo grupo;
    
    @ManyToOne
    @JoinColumn(name = "persona", nullable = false, unique = false)
    ModelPersona persona;
    
    @Column(name = "salirgrupo", nullable = false, unique = false)
    Boolean salirgrupo=false;
    
    @Column(name = "pgfecha_creacion", nullable = false, unique = false)
    LocalDateTime  pgfecha_creacion;  
    
    @PrePersist 
    public  void  onPrePersist () { 
        this.pgfecha_creacion=LocalDateTime.now(); 
    } 
    
    
}
