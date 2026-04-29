/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.models;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="mensaje")
public class ModelMensaje 
{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long idmensaje;
    
    @ManyToOne
    @JoinColumn(name = "extencionarchivo", nullable = false, unique = false)
    ModelExtencionArchivo extencionarchivo;
    
    @ManyToOne
    @JoinColumn(name = "estadomensaje", nullable = false, unique = false)
    ModelEstadoMensaje estadomensaje;
    
    @ManyToOne
    @JoinColumn(name = "tipomensaje", nullable = false, unique = false)
    ModelTipoMensaje tipomensaje;
    
    @ManyToOne
    @JoinColumn(name = "grupo", nullable = false, unique = false)
    ModelGrupo grupo;
    
    @ManyToOne
    @JoinColumn(name = "personagrupoemite", nullable = false, unique = false)
    ModelPersonaGrupo personagrupoemite;
    
    @ManyToOne
    @JoinColumn(name = "personagruporecibe", nullable = true, unique = false)
    ModelPersonaGrupo personagruporecibe;
    
    @Column(name = "namefilemensaje", nullable = true, unique = false)
    String namefilemensaje;
    
    @Column(name = "datadatemessage", nullable = true, unique = false)
    String datadatemessage;
    
    @Column(name = "mfecha_envio", nullable = false, unique = false)
    LocalDateTime  mfecha_envio;
    
    @Column(name = "mfecha_modificacion", nullable = false, unique = false)
    LocalDateTime mfecha_modificacion;
    
    
    @PrePersist 
    public  void  onPrePersist () { 
        this.mfecha_envio=LocalDateTime.now(); 
        this.mfecha_modificacion=LocalDateTime.now(); 
    } 

    @PreUpdate 
    public  void  onPreUpdate () { 
        this.mfecha_modificacion=LocalDateTime.now(); 
    } 
   
}
