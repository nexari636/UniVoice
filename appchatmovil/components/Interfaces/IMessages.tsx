import IModelDateFormats from './IModelDateFormats';
import IUser from './IUser';


export default interface IMessages {
  idmensaje: number;
  useremisor: IUser;
  userobjetivos: IUser[];
  idgrupo: number;
  mensaje_texto: string;
  extencion: string;
  recursobase64: string;
  idtipomensaje: number;
  datetime_envio: string;
  enlinea: boolean;
  emisor: boolean;
  recursomensajejson: any | null; //porque se esta manejando diferentes estructuras para mensajes de audios, videos, texto o imagenes
  name_file_mensaje: string | null;
  idpersonagruporecibe: number;
  estadomensaje:string,
  dateformats:IModelDateFormats | null,
  idtemporalmessage:string,
  estadotemp:boolean
}

