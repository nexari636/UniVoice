

export function GetDate()
{
    const fecha = new Date();
    const fecha_format=fecha.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const fechasp=fecha_format;
    console.log("fecha"+fecha_format);
    const fecha_edit=fechasp.split("/");
    const pos=fechasp.indexOf(" ");
    let fecha_final=`${fecha_edit[2].substring(0,4)}-${fecha_edit[1]}-${fecha_edit[0]} ${fechasp.substring(pos+1,fechasp.length).trim()}`;
    return fecha_final; //retorna la fecha en este formato: yyyy-MM-dd HH:mm:ss
}

/**
 *  @deprecated  Este método está obsoleto
*/
export function GetDatePC()
{
    const fecha = new Date();
    const fecha_format=fecha.toLocaleString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const fechasp=fecha_format.replaceAll(" ","");
    console.log("fecha"+fecha_format);
    const fecha_edit=fechasp.split("/");
    const pos=fechasp.indexOf(",");
    let fecha_final=`${fecha_edit[2].substring(0,4)}-${fecha_edit[1]}-${fecha_edit[0]} ${fechasp.substring(pos+1,fechasp.length).trim()}`;
    return fecha_final; //retorna la fecha en este formato: yyyy-MM-dd HH:mm:ss
}

export function FormatsDate()
{
    let todayDate = new Date();
    const anio=todayDate.getFullYear();
    const mes=todayDate.getMonth()+1;
    const dia=todayDate.getDate();
    const hora=todayDate.getHours();
    const minuto=todayDate.getMinutes();
    const segundo=todayDate.getSeconds();

    const fechacompleta=`${anio}-${mes.toString().padStart(2,"0")}-${dia.toString().padStart(2,"0")}` //"yyyy-MM-dd"
    const fechacompletatime=`${fechacompleta} ${hora.toString().padStart(2,"0")}:${minuto.toString().padStart(2,"0")}:${segundo.toString().padStart(2,"0")}` //"yyyy-MM-dd HH:mm:ss"
    const time=`${hora.toString().padStart(2,"0")}:${minuto.toString().padStart(2,"0")}:${segundo.toString().padStart(2,"0")}` //"HH:mm:ss"
    const timessn=`${hora.toString().padStart(2,"0")}:${minuto.toString().padStart(2,"0")}` //"HH:mm"

    const fm1 = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(todayDate); //"MMMM d, yyyy"

    const mesname = new Intl.DateTimeFormat('es-EC', { month: 'long' }).format(todayDate);
    const fm2=`${mesname} ${dia}, ${anio}` //"MMMM d, yyyy"

    const fm3ampm = new Intl.DateTimeFormat('es-EC', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(todayDate); //"hh:mm a"

    console.log(fechacompleta);
    console.log(fechacompletatime);
    console.log(time);
    console.log(timessn);
    console.log(fm1);
    console.log(fm2);
    console.log(fm3ampm);

    return [
        fechacompleta,
        fechacompletatime,
        time,
        timessn,
        fm1,
        fm2,
        fm3ampm
    ];
}