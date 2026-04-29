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
@Table(name="idioma")
public class ModelIdioma 
{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long ididioma;
    
    @Column(name = "idioma", nullable = false, unique = true, length = 50)
    String idioma;
    
    @Column(name = "prefix", nullable = true, unique = false, length = 50)
    String prefix;
  
}
