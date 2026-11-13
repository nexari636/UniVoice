
#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <fstream>
#include <string>
#include "stmts_file.h"
#include <vector>
#include <filesystem>
#include "stmts_meths.h"

using namespace std;
namespace fs = filesystem;


void File_Manager::write_file(const char* path,const char* data)
{
	ofstream file;

	// se usa el operador OR (|) para combinar los modos de apertura
	file.open(path,ios::out | ios::app); //abre archivo  //app de "append" es decir si existe va anexando mas info

	if (file.fail())
	{
		printf("Error no se pudo abrir el archivo");
		return;
	}
	file << data << endl;
	file.close();
}


/*void File_Manager::write_file(const char* path, const char* abs_path, const unsigned char* data)
{
	ofstream file;

	fs::create_directory(path);

	// se usa el operador OR (|) para combinar los modos de apertura
	file.open(abs_path, ios::out | ios::app); //abre archivo  //app de "append" es decir si existe va anexando mas info

	if (file.fail())
	{
		printf("Error no se pudo crear el archivo");
		return;
	}
	file << data << endl;
	file.close();
}
*/


void File_Manager::write_file(const char* path, const char* abs_path, const unsigned char* data,int out_lenght)
{
	fs::create_directory(path); //crea el directorio si no existe
	FILE* file = fopen(abs_path, "wb");

	if (file == nullptr) {
		std::cerr << "Error al abrir el archivo para escribir.\n";
		return;
	}

	size_t write_bytes = fwrite(data, 1, out_lenght, file);

	if (write_bytes >= 1) {
		cout << "Archivo binario guardado con exito.\n";
	}
	else {
		cerr << "Error al escribir los datos.\n";
	}

	fclose(file);
}


void File_Manager::write_file(const char* path, const char* abs_path, const char* data)
{
	ofstream file;

	fs::create_directory(path);

	// se usa el operador OR (|) para combinar los modos de apertura
	file.open(abs_path, ios::out | ios::app); //abre archivo  //app de "append" es decir si existe va anexando mas info

	if (file.fail())
	{
		printf("Error no se pudo crear el archivo");
		return;
	}
	file << data << endl;
	file.close();
}


vector<string> File_Manager::read_file(const char* path)
{
	ifstream file;
	string data;

	file.open(path,ios::in);

	if (file.fail()) //retorna true si existe un error
	{
		printf("Error no se pudo abrir el archivo");
		return {};
	}

	vector<string> vector_data;

	while (getline(file, data)) //mientras no sea final del archivo el bucle sera verdadero
	{
		vector_data.push_back(data.c_str());
	}

	printf("lectura de archivo finalizada.\n");
	file.close();
	return vector_data;
}

void read_binary(const char* path,char** buffer)
{
	ifstream archivo(path, ios::binary);

	if (!archivo) {
		printf("Error no se pudo abrir el archivo");
	}

	printf("tamanio de buffer: %zu\n",sizeof(*buffer));
	archivo.read(*buffer, sizeof(*buffer));
	archivo.close();
}



[[deprecated("Esta funcion será eliminada pronto.")]]
void File_Manager::list_directory(NodeSt** nodest,const char* path) {

	printf("listando directorios\n");

	if (fs::exists(path) && fs::is_directory(path))
	{
		NodeSt* p=NULL;

		for (auto const& dir_entry : fs::directory_iterator(path))
		{
			//cout << dir_entry.path().filename().string() << std::endl;
			string name_file = dir_entry.path().filename().string().c_str();
			printf("%s\n", dir_entry.path().filename().string().c_str());
			list_insert(&p, copy_char(name_file.c_str()));
			//printf("ddd: %d\n", strlen(name_file.c_str()));
		}
		*nodest = p;
	} else {
		printf("Directorio no encontrado\n");
	}
}