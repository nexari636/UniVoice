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
@Table(name="grupo")
public class ModelGrupo 
{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long idgrupo;
    
    @ManyToOne
    @JoinColumn(name = "tipogrupo", nullable = false, unique = false)
    ModelTipoGrupo tipogrupo;
    
    @Column(name = "nombregrupo", nullable = true, unique = true, length = 100) //unique
    String nombregrupo;
    
    @Column(name = "grutafoto", nullable = true, unique = true, length = 200) //unique
    String grutafoto;
    
    @Column(name = "gdescripcion", nullable = true, unique = false, length = 200) 
    String gdescripcion;
    
    @Column(name = "gfecha_creacion", nullable = false, unique = false)
    LocalDateTime  gfecha_creacion;
    
    
    @PrePersist 
    public  void  onPrePersist () { 
        this.gfecha_creacion=LocalDateTime.now(); 
    } 
    
}
