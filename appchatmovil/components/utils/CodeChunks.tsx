export default function chunk(dataparam:string)
{
    let data=dataparam.trim();
    let chunk_bandera=20000;
    let cantidad_chunk=parseInt(Math.ceil(parseFloat(data.length.toString())/chunk_bandera).toString());
    let datachunk=[];
    console.log("Cantidad chunk= "+cantidad_chunk);
    console.log("Longitud cadena= "+data.length);

    if(data.length<cantidad_chunk)
    {
        datachunk.push(data);
    }
    else
    {
        console.log("rellenando chunks....");
        let pos_superior=chunk_bandera;
        let pos_inferior=0;

        for(let x=0;x<cantidad_chunk;x++)
        {
            if((x+1)==cantidad_chunk)
            {
                console.log("Final...");
                datachunk.push(data.substring(pos_inferior,data.length));
            }
            else
            {
                datachunk.push(data.substring(pos_inferior,pos_superior));
                pos_inferior=pos_superior;
                pos_superior+=chunk_bandera;
            }
        }
    }

    return [chunk_bandera.toString(),cantidad_chunk.toString(),datachunk];
}