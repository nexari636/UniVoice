import IDiscapacidad from "./IDiscapacidad";
import Idioma from "./IIdioma";

export default interface IPersona {
    idpersona:           number;
    pusername:           string;
    pnombres:            string;
    papellidos:          string;
    ptelefono:           string;
    pcorreo:             string;
    prutafoto:           string;
    pdescripcion:        string;
    prutakey:            string;
    pcontrasenia:        string;
    idioma:              Idioma;
    discapacidad:        IDiscapacidad;
    pfecha_creacion:     Date;
    pfecha_modificacion: Date;
}