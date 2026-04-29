/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Main.java to edit this template
 */
package com.api.apiamic.utils;

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
public class ModelDateFormats 
{
    private String date;
    private String datetime;
    private String timecc;
    private String timecn;
    private String datelongenglish;
    private String datelongspanish;
    private String timepmam;
    
    public ModelDateFormats()
    {
        String [] formatsdate=dateCurrent.FormatsDate();
        this.date=formatsdate[0];
        this.datetime=formatsdate[1];
        this.timecc=formatsdate[2];
        this.timecn=formatsdate[3];
        this.datelongenglish=formatsdate[4];
        this.datelongspanish=formatsdate[5];
        this.timepmam=formatsdate[6];
    }
}
