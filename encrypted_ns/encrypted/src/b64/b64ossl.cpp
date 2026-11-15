#include <openssl/bio.h>
#include <openssl/evp.h>
#include <openssl/buffer.h>
#include <string>

using namespace std;

string b64_enconde(string data) {

	BIO *bio=NULL, *b64=NULL;
	BUF_MEM *bufferPtr=NULL;

	b64 = BIO_new(BIO_f_base64()); //le dice para trabajar on b64
	bio = BIO_new(BIO_s_mem()); //crea un buffer
	bio = BIO_push(b64, bio); //se conectan los dos bios el b64 y bio

	BIO_write(bio, data.c_str(), data.length()); //convierte los datos en b64

	//permite decir que se finalizo de escribir para que se complete el bloque
	// Base64 trabaja con bloques de 3 bytes.
	//EJEMPLO: LA CADENA "ABC" en base 64 es "QUJD" es decir si cumple con el bloque de 3 bytes
	//imagina que escribes AB no sabe si llegara a 3 bytes entonces esta instruccion completa dando el resultado "QUI="
	//Sin BIO_flush() podrías obtener un resultado incompleto.
	BIO_flush(bio); 

	//hace que el bio apunte a bufferPtr
	BIO_get_mem_ptr(bio, &bufferPtr);

	//finalmente copia los datos desde bufferPtr a la variable encoded
	string encoded(bufferPtr->data, bufferPtr->length);

	//Libera toda la cadena. 
	//es decir elimina la conexion b64 y bio 
	BIO_free_all(bio);

	return encoded;
}

string b64_decode(string data) {
	//crea dos punteros (apuntan a null)
	BIO *bio=NULL, *b64=NULL;

	//crea un buffer del tamaño de la cadena
	char* buffer = new char[data.size()]; 

	//Se crea un BIO cuyo trabajo ahora será decodificar Base64.
	b64 = BIO_new(BIO_f_base64());
	//La diferencia respecto al encode es importante.
	//En el encode usábamos "BIO_s_mem()"
	//porque íbamos a escribir.
	//ahora usamos "BIO_new_mem_buf" porque ya tenemos datos en memoria y queremos leerlos.
	// el -1 Significa "La cadena termina en '\0'. Calcula tú la longitud." Es equivalente a "strlen(data.c_str())"
	//También podrías escribir BIO_new_mem_buf(data.c_str(), data.length()); funcionaria igual
	bio = BIO_new_mem_buf(data.c_str(), -1);
	//Se conectan ambos BIO. al igual que el encode
	bio = BIO_push(b64, bio);
	//decodifica la cadena ejemplo "SG9sYQ==" -> "Hola"
	//retorna la cantidad de bytes realmente escritos.
	int read_bytes=BIO_read(bio, buffer, data.size());

	//Se destruyen ambos BIO.
	//Libera toda la cadena. 
	//es decir elimina la conexion b64 y bio 
	BIO_free_all(bio);

	//escribe el resultado del buffer donde estara el resultado pero utiliza read_bytes para solo asignar los caracteres escritorios
	//Porque BIO_read() no añade ese carácter nulo.
	//Imagina que el buffer contiene: H o l a X Y Z
	//donde X, Y y Z son basura de memoria. std::string(buffer) seguirá leyendo hasta encontrar un '\0' en algún lugar, pudiendo incluir caracteres basura o incluso provocar comportamiento indefinido.
	//Así la cadena copia exactamente len bytes, sin depender de un terminador nulo.
	//Incluso podrías reservar un byte extra y terminar manualmente: buffer[len] = '\0'; esto seria abajo de BIO_read
	//por cierto string copia los datos a su propia memoria por lo que hay que liberar buffer porque ya no es necesaria
	string decoded(buffer, read_bytes);
	
	//Esto le dice al sistema operativo:
	//"La memoria que reservé con new[] ya no la necesito. Puedes liberarla."
	delete[] buffer;

	return decoded;
}
