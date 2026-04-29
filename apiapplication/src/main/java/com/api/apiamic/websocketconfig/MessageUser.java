/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.api.apiamic.websocketconfig;

import com.api.apiamic.dataapi.DataAudioToText;
import com.api.apiamic.dataapi.DataDescriptionImage;
import com.api.apiamic.dataapi.DataSubtituloVideo;
import com.api.apiamic.dataapi.DataTextToAudio;
import com.api.apiamic.models.ModelPersona;
import com.api.apiamic.utils.ModelDateFormats;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;
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
public class MessageUser 
{
    int idmensaje;
    User useremisor;
    User[] userobjetivos; //lista de id usuarios para mensajes individualers o grupales 
    Long idgrupo; //(USER)
    String mensaje_texto; //(USER)
    String extencion; //la extencion va sin el punto es decir si es .jpg es jpg  (USER)
    String recursobase64; //si el mensaje es video, audio, etc (mensaje_texto) estara vacio (USER)
    int idtipomensaje; //si es video, texto, audio etc
    Date datetime_envio; //fecha envio
    @Deprecated boolean enlinea; //true o false //esto ya no va
    boolean emisor; //si lo envia es true caso contrario false //esto ya no va
    String recursomensajejson; //el json que contiene los recursos de conversion de mensajes (contiene los datos de python api)
    String name_file_mensaje; //el nombre con que se guardo el json de conversion en formato .bin
    @Deprecated Long idpersonagruporecibe; //la persona que recibe el mensaje
    String estadomensaje;
    ModelDateFormats dateformats;
    String idtemporalmessage;
    Boolean estadotemp;
}
