import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { URL_BACK } from "./UrlBase";


export function UseFetchPOSTEventFormatJson(form:FormData,url:string)
{
    const myHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const config:AxiosRequestConfig  = {
        headers:myHeaders,
        withCredentials:true,
    };
    return axios.post(`${URL_BACK}/${url}`,form,config)
}

export function UseFetchGETEventUrlExterna(params:Record<string, string>,url:string)
{
    const myHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const paramsOBJ = params;
    const config:AxiosRequestConfig  = {
        headers:myHeaders,
        withCredentials:true,
        params: paramsOBJ
    };
    return axios.get(`${url}`,config);
}


export function UseFetchPOSTEvent(form:FormData,url:string)
{
    const myHeaders: Record<string, string> = {
        'Content-Type': 'multipart/form-data',
    };
    const config:AxiosRequestConfig  = {
        headers:myHeaders,
        withCredentials:true,
    };
    return axios.post(`${URL_BACK}/${url}`,form,config)
}


export function UseFetchGETEvent(params:Record<string, string>,url:string)
{
    const myHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const paramsOBJ = params;
    const config:AxiosRequestConfig  = {
        headers:myHeaders,
        withCredentials:true,
        params: paramsOBJ
    };
    return axios.get(`${URL_BACK}/${url}`,config);
}