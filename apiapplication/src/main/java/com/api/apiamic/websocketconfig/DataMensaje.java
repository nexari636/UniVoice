/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.websocketconfig;

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
public class DataMensaje {
    
    String data;
    String iv_b64; //vector de inicializacion;
    String correouser; 
    @Deprecated boolean emisor;
    int chunk_actual;
    int chunks_totales;
    boolean chunkshabilitado;
    String iduser;
    String idgrupohash;
}
