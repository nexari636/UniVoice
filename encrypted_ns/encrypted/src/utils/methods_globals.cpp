#include <iostream>
#include <fstream>
#include <ctime>
#include <cstdlib>
#include <string>
#include <vector>
#include "stmts_meths.h"
#include "stmts_trim.h"
#include <filesystem>
#include "data_static.h"

using namespace std;
namespace fs = filesystem;


int save_file()
{
	return 0;
}

char* create_name() {

	char* chain = (char*) malloc(sizeof(char) * 31);
	if (chain == NULL) {
		printf("Error!!! puntero nulo");
		return NULL;
	}
	int x = 0;
	for (x = 0;x < 10;x++) {
		*(chain + x) = ramdom_letter(true);
	}

	for (;x < 20;x++) {
		*(chain + x) = ramdom_letter(false);
	}

	//en hexadecimal
	//https://elcodigoascii.com.ar/codigos-ascii/numero-cero-0-codigo-ascii-48.html
	char number[] = {0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39}; //numeros en hexadecimal del 0 al 9

	for (;x < 30;x++) {
		*(chain + x) = number[ramdom_number(0,9)];
	}
	chain[30] = '\0';
	return chain;
}

int ramdom_number(int min, int max) {
	int numero = rand() % (max - min + 1) + min;
	printf("numero aleatorio entre %i y %i da como resultado: %i \n", min, max, numero);
	return numero;
}

char ramdom_letter(bool upper) {
	char letter = upper ? 'A' : 'a';
	return letter + rand() % 26;
}

char* copy_char(const char* pdata) {

	int size = strlen(pdata);
	char* data = (char*)malloc(sizeof(char)*size+1);
	if (data == NULL) return NULL;
	for (int x=0;x<size;x++)
	{
		*(data + x) = *(pdata + x);
	}
	data[size] = '\0'; //caracter que indica el final de la cadena
	return data;
}

vector<string> split_data(const char* data,const char delim) 
{

	string c_data = data;
	int pos = 0;
	vector<string> vector_data;

	while ((pos = c_data.find(delim))!=-1)
	{
		printf("**********************************\n");
		printf("Tamanio de cadena: %d\n",c_data.size());
		printf("posicion: %d\n", pos);
		string data_ob = c_data.substr(0, pos);
		data_ob = trim(data_ob);
		printf("cadena encontrada: %s\n", data_ob.c_str());
		vector_data.push_back(data_ob);
		printf("eliminando data encontrada...\n");
		c_data.erase(0, pos+1);
	}

	if (c_data.size()>0) {
		vector_data.push_back(trim(c_data));
	}

	return vector_data;
}

void create_paths() {
	Data_Static ds;

	vector<const char*> data= ds.folder_names_vc();

	for (int x = 0;x < data.size();x++) {
		fs::create_directory((ds.PATH_DATA+data[x])); //crea el directorio si no existe
	}
}