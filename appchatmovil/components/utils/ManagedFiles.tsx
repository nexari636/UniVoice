
import * as FileSystem from 'expo-file-system';

export const NAME_FILE_USER="userdata.json";
export const NAME_FILE_KEY="userkey.json";
export const NAME_FILE_CONFIG_APP="configapp.json";


export const main_directory=FileSystem.documentDirectory+"filesamic/";
export const data_user_directory="datauser/";
export const key_directory="keyuser/";
export const messages_directory="messages/";
export const audio_directory="audios/";
export const video_directory="video/";
export const imagenes_directory="imagenes/";
export const temps_directory="temps/";
export const configapp_directory="configapp/";


//guarda en base64 como para escribir imagenes, files entre otras cosas
//esta variables ejemplo: name_file.png || name_file.mp4
export async function create_file(name_folder_root:string,name_file:string,filebase64:string)
{
    const name_file_data=`${name_folder_root}${name_file}`;
    const absolute_path = main_directory + name_file_data;
    const data_exists_file=await check_route(name_file_data);
    if(!data_exists_file)
    {
        try {
            await FileSystem.writeAsStringAsync(absolute_path, filebase64, {
              encoding: FileSystem.EncodingType.Base64,
            });
        } catch (error) {
        console.error('Error al guardar archivo:', error);
        }
    }
    else console.log("Archivo no guardado porque ya existe");
    return absolute_path;
}

//tp=texto plano
//esta funcion guarda el archivo en texto plano nomas
export async function create_file_tp(name_folder_root:string,name_file:string,datatexto:string)
{
    const name_file_data=`${name_folder_root}${name_file}`;
    const absolute_path = main_directory + name_file_data;
    const data_exists_file=await check_route(name_file_data);
    if(!data_exists_file)
    {
        try {
            await FileSystem.writeAsStringAsync(absolute_path, datatexto, {
              encoding: FileSystem.EncodingType.UTF8,
            });
            console.log("Se guardooo el archivo bien");
        } catch (error) {
        console.error('Error al guardar archivo:', error);
        }
    }
    else console.log("");
}


export async function delete_file(path_absolute:string,name_folder_root:string,name_file:string)
{
    try {

        if(path_absolute!="")
        {
            const dirInfo = await FileSystem.getInfoAsync(path_absolute);
            if (!dirInfo.exists) 
                return;
            
            await FileSystem.deleteAsync(path_absolute);
            console.log("Archivo eliminado correctamente v1");
            return;
        }

        const name_file_data=`${name_folder_root}${name_file}`;
        const absolute_path = main_directory + name_file_data;
        const data_exists_file=await check_route(name_file_data);
        if(data_exists_file)
        {
            await FileSystem.deleteAsync(absolute_path);
            console.log("Archivo eliminado correctamente v2");
        }
        else console.log("El archivo no se puede eliminar porque no existe");
    } 
    catch (error) {
        console.error('Error al eliminar archivo:', error);
    }
}

//retorna el contenido de un archivo determinado
export async function read_file_text(name_folder_root:string,name_file:string)
{
    const directorio=main_directory+`${name_folder_root}${name_file}`;

    const data_exists_file=await check_route(`${name_folder_root}${name_file}`);
    if(!data_exists_file)
    {
        console.log("Archivo no existe");
        return "";
    }

    const contenidoArchivo = await FileSystem.readAsStringAsync(directorio,{
        encoding: FileSystem.EncodingType.UTF8,
    });
    return contenidoArchivo;
}


//retorna el contenido de un archivo determinado mediante uri
export async function read_file_text_by_uri(uri:string)
{
    const dirInfo = await FileSystem.getInfoAsync(uri);
    if (dirInfo.exists) 
    {
        const contenidoArchivo = await FileSystem.readAsStringAsync(uri,{
            encoding: FileSystem.EncodingType.UTF8,
        });
        return contenidoArchivo;
    }
    return "";
}

//retorna el archivo en base64
export async function read_file_base64(path_absolute:string,name_folder_root:string,name_file:string)
{
    if(path_absolute!='')
    {
        const filebase64 = await FileSystem.readAsStringAsync(path_absolute,{
            encoding: FileSystem.EncodingType.Base64,
        });
        return filebase64;
    }
    if(name_folder_root=='' || name_file=='') return ''
    
    const directorio=main_directory+`${name_folder_root}${name_file}`;
    const filebase64 = await FileSystem.readAsStringAsync(directorio,{
        encoding: FileSystem.EncodingType.Base64,
    });
    return filebase64;
}



//retorna una URL de donde esta guardado determinado archivo
export function read_file(name_folder_root:string,name_file:string)
{
    return main_directory+`${name_folder_root}${name_file}`;
}

export async function check_route(name_file_or_folder:string)
{
    const path = main_directory + `${name_file_or_folder}`;
    const dirInfo = await FileSystem.getInfoAsync(path);
    if (!dirInfo.exists) 
        return false;
    else
        return true;
}


export async function create_folder_main()
{
    const path = main_directory;
    const data_exists_file=await check_route("");
    if(!data_exists_file){
        await FileSystem.makeDirectoryAsync(path, { intermediates: true }); 
        console.log("se creo el directorio principal");
    }

    for(const folder of [data_user_directory,key_directory,messages_directory,audio_directory,video_directory,imagenes_directory,temps_directory,configapp_directory])
    {
        const path_sub_folder = `${main_directory}${folder}`;
        const data_exists_file=await check_route(folder);
        if(!data_exists_file){
            await FileSystem.makeDirectoryAsync(path_sub_folder, { intermediates: true }); 
            console.log("se crearon los subdiretorios principales");
        }
    }
}

export function ConstuirRuta(name_folder_root:string,name_file:string)
{
    return main_directory +name_folder_root + name_file;
}