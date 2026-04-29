
export function Base64ToBlob(database64:string)
{
    //descodifica una cadena de datos que ha sido codificada utilizando la codificación en base-64
    //los decodifica en caracteres videos en notacion ancii de 8bits
    const byteCharacters = atob(database64); 
        
    //crea un array y mediante charCodeAt obtiene el valor o codigo unico de cada caracter de byteCharacters
    //ejemplo: caracter: A Codigo unicode 65 y asi por cada posicion de byteCharacters
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    //convierte el array anterior en un array que solo puede almacenar por posicion de 0 a 255 
    //esto devido al tamaño maximo de bytes que viene siendo 255 empezando 2^0 .... 2^7
    //new Array puede almacenar strings, objetos, numeros, etc.. mientras Uint8Array no (solo bytes).
    const byteArray = new Uint8Array(byteNumbers);

    console.log(byteNumbers);
    console.log(byteArray);

    //console.log(byteCharacters);
    const blob = new Blob([byteArray]);

    return blob;
}


export function BlobToUrl(blob:Blob)
{
    const url=URL.createObjectURL(blob);
    return url;
}
