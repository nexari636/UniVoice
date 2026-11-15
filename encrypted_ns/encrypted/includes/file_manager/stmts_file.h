#include <string>
#include <vector>
#include "stmts_structs.h"


using namespace std;

#ifndef MYHEADER_H
#define MYHEADER_STMTS_METHS

class File_Manager {
	public:
		void write_file(const char* path, const char* data);
		void write_file(const char* path, const char* abs_path, const unsigned char* data, int out_lenght);
		void write_file(const char* path, const char* abs_path, const char* data);
		vector<string> read_file(const char* path);

		[[deprecated("Esta funcion será eliminada pronto.")]]
		void list_directory(NodeSt** nodest, const char* path);
};

#endif