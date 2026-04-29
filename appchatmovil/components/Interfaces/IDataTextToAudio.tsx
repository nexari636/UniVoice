export default interface IDataTextToAudio
{
    dataaudioingles:IResourceAudioIn,
    dataaudioespanol:IResourceAudioEs,
    messageingles:string,
    messageespanol:string,
    success:string,
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