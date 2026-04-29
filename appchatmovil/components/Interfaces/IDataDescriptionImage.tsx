
export interface IDataDescriptionImage
{
    dataaudioingles:IResourceAudioIn,
    dataaudioespanol:IResourceAudioEs,
    messageingles:string,
    messageespanol:string,
    imagenbase64:string,
    nameimagen:string,
    success:string
}

export interface IResourceAudioIn
{
    name_file:string,
    audiobase64ingles:string
}

export interface IResourceAudioEs
{
    name_file:string,
    audiobase64espanol:string
}