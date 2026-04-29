/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.utils;
import lombok.*;

/**
 *
 * @author Jhon (TheBlack)
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrupoMng {
    private String tipogrupo;
    private String nombregrupo;
    private String gdescripcion;
    private String base64foto;
    private String correouserprincipal;
    private Long[] users;
    //
    private String iduserprincipal; //en string porque esta encriptado
    private Long iduseramigo;

}
