import uuid from 'react-native-uuid';


export function getRamdom(min:number, max:number) {
    return Math.random() * (max - min) + min;
}

export function create_name_ramdom()
{
    //208 bits = 26*8 // 1 byte representa a 8bits
    const byteArray = new Uint8Array(26);
    let binary="";

    for(let x=0;x<26;x++)
    {
        //se agrega 256 porque el ultimo es excluyente es decir solo hasta 255
        byteArray[x]=getRamdom(97,123); 
        binary+=String.fromCharCode(byteArray[x]); //cada byte a texto 
    }
    
    return binary;
}

export function generate_uuidv4()
{
    return uuid.v4();
}