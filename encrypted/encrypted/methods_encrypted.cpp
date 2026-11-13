#define _CRT_SECURE_NO_WARNINGS

#include <openssl/ssl.h>
#include <openssl/err.h>
#include <openssl/rand.h>
#include <openssl/conf.h>
#include <openssl/evp.h>
//
#include <stdlib.h>
#include <cstdio>
#include "stmts_meths.h"
#include "stmts_encr.h"
#include <iostream>

#include "stmts_file.h"
#include "data_static.h"

//#include "stmts_structs.h"
#include <fstream>


using namespace std;


//test 
void success_openssl() {
	SSL_library_init();
	OpenSSL_add_all_algorithms();
	SSL_load_error_strings();
	std::cout << "OpenSSL inicializado correctamente\n";
}

unsigned char* create_key() {
	printf("Algoritmo: AES\n");
	unsigned char key[32]; //256 bits

	if (!RAND_bytes(key, sizeof(key))) {
		cerr << "Error generando clave\n";
		return NULL;
	}

	printf("llave creada correctamente.\n");
	for (int x = 0;x < 32;x++)
	{
		printf("%x", key[x]);
	}
	printf("\n");
	return key;
}


unsigned char* generate_iv() {

	int positions = 16;
	unsigned char* iv = (unsigned char*)malloc(sizeof(unsigned char*) * positions);
	if (iv == NULL) return NULL;
	for (int x = 0;x < positions;x++)
	{
		*(iv + x) = ramdom_number(48, 58);
	}

	printf("****\n");

	for (int x = 0;x < positions;x++)
	{
		printf("Caracter: %c, Valor: %u , hexadecimal: %02X\n", iv[x], iv[x], iv[x]);
	}
	printf("****\n");

	return iv;
}

int encrypt_test(unsigned char* plaintext, int plaintext_len, unsigned char* key,
	unsigned char* iv, unsigned char* ciphertext)
{
	printf("*********************cifrado test************************\n");
	EVP_CIPHER_CTX* ctx;
	int len;
	int ciphertext_len;

	/* Crear e inicializar el contexto */
	if (!(ctx = EVP_CIPHER_CTX_new()))
		handleErrors();

	/*
	* Inicialice la operación de cifrado. IMPORTANTE: asegúrese de usar una clave
	* y un tamaño de IV apropiado para su algoritmo de cifrado.
	* En este ejemplo, usamos AES de 256 bits (es decir, una clave de 256 bits).
	* El tamaño del IV para *la mayoría* de los modos es el mismo que el tamaño del bloque. Para AES, este
	* es de 128 bits.
	 */
	if (1 != EVP_EncryptInit_ex(ctx, EVP_aes_256_cfb128(), NULL, key, iv))
		handleErrors();

	/*
	* Proporcione el mensaje que se va a cifrar y obtenga el resultado cifrado.
	* Se puede llamar a EVP_EncryptUpdate varias veces si es necesario.
	*/
	if (1 != EVP_EncryptUpdate(ctx, ciphertext, &len, plaintext, plaintext_len))
		handleErrors();
	ciphertext_len = len;

	//printf("longitud actual (bytes): %d\n", ciphertext_len);

	/*
	* Finalizar el cifrado. Se pueden escribir bytes adicionales del texto cifrado en
	* esta etapa.
	 */
	if (1 != EVP_EncryptFinal_ex(ctx, ciphertext + len, &len))
		handleErrors();
	ciphertext_len += len;

	/*
	* len sirve para ver cuantos bytes se escribieron y si luego de eso se tienen que escribir nuevos bytes comenzar desde donde se quedaron
	*/


	//printf("longitud actual (bytes): %d\n", ciphertext_len);
	//printf("texto cifrado: %s\n", ciphertext);


	/* Limpiar */
	EVP_CIPHER_CTX_free(ctx);

	return ciphertext_len;
}

int decrypt_test(unsigned char* ciphertext, int ciphertext_len, unsigned char* key,
	unsigned char* iv, unsigned char* plaintext)
{
	printf("*********************descifrado test************************\n");

	EVP_CIPHER_CTX* ctx;
	int len;
	int plaintext_len;

	/* Crear e inicializar el contexto */
	if (!(ctx = EVP_CIPHER_CTX_new()))
		handleErrors();

	/*
	* Inicializa la operación de descifrado. IMPORTANTE: asegúrate de usar una clave
	* y un tamaño de IV apropiado para tu cifrado.
	* En este ejemplo, usamos AES de 256 bits (es decir, una clave de 256 bits).
	* El tamaño del IV para *la mayoría* de los modos es el mismo que el tamaño del bloque. Para AES, este
	* es de 128 bits.
	*/
	if (1 != EVP_DecryptInit_ex(ctx, EVP_aes_256_cfb128(), NULL, key, iv))
		handleErrors();

	/*
	* Proporciona el mensaje que se va a descifrar y obtiene la salida en texto plano.
	* Se puede llamar a EVP_DecryptUpdate varias veces si es necesario.
	*/
	if (1 != EVP_DecryptUpdate(ctx, plaintext, &len, ciphertext, ciphertext_len))
		handleErrors();
	plaintext_len = len;

	printf("longitud actual (bytes): %d\n", plaintext_len);


	/*
	* Finaliza el descifrado. En esta etapa se pueden escribir más bytes en texto plano.
	*/
	if (1 != EVP_DecryptFinal_ex(ctx, plaintext + len, &len))
		handleErrors();
	plaintext_len += len;

	printf("longitud actual (bytes): %d\n", plaintext_len);
	//printf("texto descifrado111: %s\n", plaintext);


	/* Limpieza */
	EVP_CIPHER_CTX_free(ctx);

	return plaintext_len;
}


int encrypt(const char* name_file,unsigned char* key, unsigned char* iv)
{
	printf("*********************cifrado************************\n");
	const int size_bytes = 4096;
	EVP_CIPHER_CTX* ctx;
	File_Manager fm;
	int len;
	int ciphertext_len;
	unsigned char ciphertext[size_bytes+ EVP_MAX_BLOCK_LENGTH];
	int cont = 0;
	//
	FILE* fp;
	unsigned char buffer[size_bytes]; //tiene un tamaño de 4096 bytes

	string pif = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_INDEX);
	string pf = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_FILES + "/" + name_file);
	string pde = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_DATA_ENCRY);

	const char* path_index_file= pif.c_str();
	const char* path_file= pf.c_str();
	const char* path_data_encry= pde.c_str();

	/* Crear e inicializar el contexto */
	if (!(ctx = EVP_CIPHER_CTX_new())) {
		handleErrors();
		return 0;
	}

	/*
	* Inicialice la operación de cifrado. IMPORTANTE: asegúrese de usar una clave
	* y un tamaño de IV apropiado para su algoritmo de cifrado.
	* En este ejemplo, usamos AES de 256 bits (es decir, una clave de 256 bits).
	* El tamaño del IV para *la mayoría* de los modos es el mismo que el tamaño del bloque. Para AES, este
	* es de 128 bits.
	 */
	if (1 != EVP_EncryptInit_ex(ctx, EVP_aes_256_cfb128(), NULL, key, iv)) {
		handleErrors();
		return 0;
	}

	//fp = fopen("D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/base64IMG-PNG.txt", "rb"); //rb --> "read binary" (lectura en modo binario).
	fp = fopen(path_file, "rb"); //rb --> "read binary" (lectura en modo binario).
	size_t read_bytes;

	if(fp==NULL)
	{
		printf("ERROR AL ABRIR EL ARCHIVO\n");
		return 0;
	}
	else {
		printf("Archivo abierto correctamente!!\n");
	}

	char* index_name_file = create_name();

	while (true)
	{
		//fread lee un bloque del tamaño del buffer especificado este caso 4096 retorna "1" si le ese bloque completo
		//caso contrario retorna 0 si lee menos que el bloque especificado.
		//ejemplo: un archivo de 10 bytes retorna 0 porque no completa los 4096 pero igual copia esos datos al buffer
		//el parametro que dice "1" es la cantidad de bloques del tamaño del buffer que retornara.

		//esta funcion se la puede utilizar de dos maneras:
		/*
		Caso 1:
		fread(buffer, 4096, 1, fp);

		Le estás diciendo:
			tamaño de cada elemento = 4096 bytes
			cantidad de elementos = 1

		Entonces el retorno será: 0 o 1 elementos leídos

		Caso 2
		fread(buffer, 1, 4096, fp);

		Le estás diciendo:
			tamaño de cada elemento = 1 byte
			cantidad de elementos = 4096
		Entonces el retorno será:
		0 a 4096 elementos leídos
		*/
		read_bytes = fread(buffer,1, sizeof(buffer), fp);
		printf("Bytes leidos: %zu\n", read_bytes);

		//finalización de lectura (salida del bucle)
		if (read_bytes == 0) {
			printf("Finalizacion de lectura del archivo por partes, finalizada.\n");
			break;
		}

		/*
		* Proporcione el mensaje que se va a cifrar y obtenga el resultado cifrado.
		* Se puede llamar a EVP_EncryptUpdate varias veces si es necesario.
		*/
		if (1 != EVP_EncryptUpdate(ctx, ciphertext, &len, buffer, read_bytes)) {
			handleErrors();
			return 0;
		}
		ciphertext_len = len;

		/*
		* Finalizar el cifrado. Se pueden escribir bytes adicionales del texto cifrado en
		* esta etapa.
		*/
		if (1 != EVP_EncryptFinal_ex(ctx, ciphertext + len, &len)) {
			handleErrors();
			return 0;
		}
		ciphertext_len += len;

		//escritura de bytes cifrados
		const char* name_file = create_name();
		string nf = to_string(cont) + "_" + name_file + ".bin";
		string path_out= path_data_encry;
		string name_file_cv = path_out+"/"+ nf;
		fm.write_file(path_out.c_str(), name_file_cv.c_str(), ciphertext,ciphertext_len);


		//crear archivo de indices
		string str_index_name_file = index_name_file;
		string path_index_name_file = (string) path_index_file + "/" + str_index_name_file + ".txt";
		string data_instante = nf + ";" + to_string(ciphertext_len);
		fm.write_file(path_index_file, path_index_name_file.c_str(), data_instante.c_str());

	
		cont++;
		len = 0;
	}

	//for (int x=0;x<20;x++)
	//{
	//	printf("index: %d ; valor buffer: %u\n", x,buffer[x]);
	//}

	/* Limpiar */
	EVP_CIPHER_CTX_free(ctx);
	fclose(fp);
	printf("proceso finalizado\n");

	return 1;
}

int decrypt(const char* index_file_name,unsigned char* key, unsigned char* iv)
{
	printf("*********************descifrado************************\n");

	const int size_bytes = 4096;
	EVP_CIPHER_CTX* ctx;
	int len;
	File_Manager fm;
	unsigned char plaintext[size_bytes];
	int plaintext_len;
	//
	FILE* fp;
	unsigned char buffer[size_bytes]; //tiene un tamaño de 4096 bytes

	string pde = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_DATA_ENCRY);
	string po = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_OUTPUT);
	string pt = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_TEMP);
	string nfi = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_INDEX);

	const char* path_data_encry= pde.c_str();
	const char* path_output= po.c_str();
	const char* path_temp=pt.c_str();
	//
	const char* name_index_path = nfi.c_str();
	const char* name_file_index = index_file_name;

	/* Crear e inicializar el contexto */
	if (!(ctx = EVP_CIPHER_CTX_new())) {
		handleErrors();
		return 0;
	}

	/*
	* Inicializa la operación de descifrado. IMPORTANTE: asegúrate de usar una clave
	* y un tamaño de IV apropiado para tu cifrado.
	* En este ejemplo, usamos AES de 256 bits (es decir, una clave de 256 bits).
	* El tamaño del IV para *la mayoría* de los modos es el mismo que el tamaño del bloque. Para AES, este
	* es de 128 bits.
	*/
	if (1 != EVP_DecryptInit_ex(ctx, EVP_aes_256_cfb128(), NULL, key, iv)) {
		handleErrors();
		return 0;
	}

	//const char* name_index_path = "D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/index_files/";
	//const char* name_file_index = "FPTRHZYAZKsgkpixipgu9469596157.txt";
	vector<string>  data_file=fm.read_file(((string)name_index_path+"/"+ (string)name_file_index).c_str());


	const char* name_file_op = create_name();

	//ofstream filep("D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/datos.txt", ios::binary);
	ofstream filep(((string)path_output+"/"+ (string)name_file_op+".txt").c_str(), ios::binary);

	if (!filep) {
		printf("ERROR DE ESCRITURA!!!\n");
		return 1;
	}
	
	for (int x=0;x< data_file.size();x++)
	{
		printf("name file: %s\n", data_file[x].c_str());

		vector<string> data_file_N=split_data(data_file[x].c_str(),';');

		fp = fopen(((string)path_data_encry+"/"+ data_file_N[0]).c_str(), "rb"); //rb --> "read binary" (lectura en modo binario).
		size_t read_bytes;

		//fread lee un bloque del tamaño del buffer especificado este caso 4096 retorna "1" si le ese bloque completo
		//caso contrario retorna 0 si lee menos que el bloque especificado.
		//ejemplo: un archivo de 10 bytes retorna 0 porque no completa los 4096 pero igual copia esos datos al buffer
		//el parametro que dice "1" es la cantidad de bloques del tamaño del buffer que retornara.
		read_bytes = fread(buffer, 1,sizeof(buffer), fp);
		printf("Bytes leidos: %zu\n", read_bytes);


		/*
		* Proporciona el mensaje que se va a descifrar y obtiene la salida en texto plano.
		* Se puede llamar a EVP_DecryptUpdate varias veces si es necesario.
		*/
		if (1 != EVP_DecryptUpdate(ctx, plaintext, &len, buffer, read_bytes)) //4096
			handleErrors();
		plaintext_len = len;

		printf("longitud actual (bytes): %d\n", plaintext_len);


		/*
		* Finaliza el descifrado. En esta etapa se pueden escribir más bytes en texto plano.
		*/
		if (1 != EVP_DecryptFinal_ex(ctx, plaintext + len, &len))
			handleErrors();
		plaintext_len += len;

		printf("longitud actual (bytes) doss: %d\n", plaintext_len);


		//escritura de bytes descifrados
		const char* name_file = create_name();
		string nf = "temp_" + to_string(x) + "_" + name_file + ".bin";
		string path_out = path_temp;
		string name_file_cv = path_out+"/"+ nf;
		fm.write_file(path_out.c_str(), name_file_cv.c_str(), plaintext, plaintext_len);

		fclose(fp);

		//reinterpret_cast<const char*>(plaintext) --> No copia datos, no convierte bytes, no cambia el contenido de la memoria. Solo cambia el tipo del puntero.
		// es decir solo le dice Interpreta la dirección almacenada en plaintext como si fuera un const char*
		//no cambia los datos internos solo cambia el tipo
		//Los dos apuntan exactamente a la misma memoria.
		//si se imprimen los datos datos plaint text y luego el reinterpret imprimira lo mismo
		filep.write(reinterpret_cast<const char*>(plaintext), plaintext_len);

	}

	filep.close();

	/* Limpieza */
	EVP_CIPHER_CTX_free(ctx);

	return 1;
}

void handleErrors(void)
{
	ERR_print_errors_fp(stderr);
	abort();
}