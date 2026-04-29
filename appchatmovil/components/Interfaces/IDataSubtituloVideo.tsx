
export interface IDataSubtituloVideo
{
    videobase64:string,
    namefile:string,
    data_video:IResourceVideo[],
    success:string
}

export interface IResourceVideo
{
    start:number,
    end:number,
    diferencia:number,
    textsegmenenglish:string,
    textsegmenespanish:string
}