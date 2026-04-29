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
import jakarta.persistence.PreUpdate;
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
@Table(name="persona")
public class ModelPersona {
    
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long idpersona;
    
    @Column(name = "pusername", nullable = false, unique = true, length = 50) //unique
    String pusername;
    
    @Column(name = "pnombres", nullable = false, unique = false, length = 100)
    String pnombres;
    
    @Column(name = "papellidos", nullable = false, unique = false, length = 100)
    String papellidos;
    
    @Column(name = "ptelefono", nullable = false, unique = true, length = 10) //unique
    String ptelefono;
    
    @Column(name = "pcorreo", nullable = false, unique = true, length = 100) //unique
    String pcorreo;
   
    @Column(name = "prutafoto", nullable = true, unique = false, length = 200) //unique
    String prutafoto;
    
    @Column(name = "pdescripcion", nullable = true, unique = false, length = 200) 
    String pdescripcion;
    
    @Column(name = "prutakey", nullable = false, unique = false, length = 200) 
    String prutakey;
    
    @Column(name = "pcontrasenia", nullable = false, length = 100)
    String pcontrasenia;
    
    @ManyToOne
    @JoinColumn(name = "idioma", nullable = false, unique = false)
    ModelIdioma idioma;
    
    @ManyToOne
    @JoinColumn(name = "discapacidad", nullable = false, unique = false)
    ModelDiscapacidad discapacidad;
    
    @Column(name = "pfecha_creacion", nullable = false, unique = false)
    LocalDateTime  pfecha_creacion;
    
    @Column(name = "pfecha_modificacion", nullable = false, unique = false)
    LocalDateTime pfecha_modificacion;
    
    
    @PrePersist 
    public  void  onPrePersist () { 
        this.pfecha_creacion=LocalDateTime.now(); 
        this.pfecha_modificacion=LocalDateTime.now(); 
    } 

    @PreUpdate 
    public  void  onPreUpdate () { 
        this.pfecha_modificacion=LocalDateTime.now(); 
    } 
    
    
}
