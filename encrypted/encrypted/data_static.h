#include <iostream>
#include <string>
#include <vector>

using namespace std;

#ifndef MYHEADER_H
#define MYHEADER_DATA_STATIC

class Data_Static {
public:
	// El uso de 'inline static' permite definir e inicializar la ruta aquí mismo
	inline static const string PATH_DATA = "D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/";
	inline static const string NAME_FOLDER_FILES = "files";
	inline static const string NAME_FOLDER_DATA_ENCRY = "data_encry";
	inline static const string NAME_FOLDER_INDEX = "index_files";
	inline static const string NAME_FOLDER_OUTPUT = "output";
	inline static const string NAME_FOLDER_TEMP = "temp";
	//
	inline static const string NAME_FOLDER_KEYS = "keys";

	vector<const char*> folder_names_vc() {

	/*	const char** vc = (const char**)malloc(sizeof(char*)*5);
		if (vc==NULL) 
			return NULL;
		vc[0] = NAME_FOLDER_FILES.c_str();
		vc[1] = NAME_FOLDER_DATA_ENCRY.c_str();
		vc[2] = NAME_FOLDER_INDEX.c_str();
		vc[3] = NAME_FOLDER_OUTPUT.c_str();
		vc[4] = NAME_FOLDER_TEMP.c_str();*/


		vector<const char*> vc;
		vc.push_back(NAME_FOLDER_FILES.c_str());
		vc.push_back(NAME_FOLDER_DATA_ENCRY.c_str());
		vc.push_back(NAME_FOLDER_INDEX.c_str());
		vc.push_back(NAME_FOLDER_OUTPUT.c_str());
		vc.push_back(NAME_FOLDER_TEMP.c_str());
		vc.push_back(NAME_FOLDER_KEYS.c_str());

		return vc;
	}



};

#endif