#include <string>
#include <vector>

using namespace std;

#ifndef MYHEADER_H
#define MYHEADER_STMTS_METHS

int save_file();
int ramdom_number(int min, int max);
char ramdom_letter(bool upper);
char* create_name();
unsigned char* generate_iv();
char* copy_char(const char* pdata);
vector<string> split_data(const char* data, const char delim);
void create_paths();

#endif