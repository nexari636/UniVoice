

export function convertorTiempo(milisegundos:number):string[]
{
    //constante de cuanto milisegundos hay un un segundo
    const milisegundosXsegundo=1000;
    //constante de cuentos segundos hay por minuto
    const segundosXminuto=60;
    //constante de cuantos milisegundos hay por minuto
    const milisegundosXminuto=milisegundosXsegundo*segundosXminuto;
    //constante de cuantos minutos hay por hora
    const minutosXhora=60;
  
    //convierte de milisegundos a minuto se utiliza Math.floor para redondear a uno para abajo es decir
    //si el numero es 8.99 lo redondea a 8
    let milisegundosAminuto=Math.floor(milisegundos/milisegundosXminuto);
    let milisegundosAsegundos=0;
    let horas=0;

    //verifica si es igual a 0 quiere decir que el audio es de segundos nomas.
    if(milisegundosAminuto==0)
        milisegundosAsegundos=milisegundos/milisegundosXsegundo
    else //caso contrario saca el residuo de los milisegundos que vendrian ser los segundos restantes del audio es decir 1:02 segundos 
        milisegundosAsegundos=(milisegundos%milisegundosXminuto)/milisegundosXsegundo  

    //hace el redondeo debido a que el residuo que vienen a ser los segundos restantes y el audio
    //se los esta calculando de manera separada
    milisegundosAsegundos=Math.floor(milisegundosAsegundos)

    //verifica si existen mas de 60 minutos si es verdadero dibide los minutos para los minutos que
    //hay en una hora para que nos retornen las horas totales
    //si existen minutos restantes tambien los calcula si no hay el redondeo seria 0
    if(milisegundosAminuto>60){
        horas=Math.floor(milisegundosAminuto/minutosXhora);
        milisegundosAminuto=Math.floor(milisegundosAminuto%minutosXhora);
    }

    let tiempo_final:string[]=[horas.toString(),
        milisegundosAminuto.toString(),
        milisegundosAsegundos.toString(),
        `${horas.toString().padStart(2,"0")}:${milisegundosAminuto.toString().padStart(2,"0")}:${milisegundosAsegundos.toString().padStart(2,"0")}`]

    return tiempo_final //retorna un vector con [hora,minuto,segundo,"formato de tiempo 00:00:00"]
}

export function sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
}

