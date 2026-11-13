
#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
//#include <openssl/aes.h>
#include "stmts_meths.h"
#include "stmts_encr.h"
#include <stdlib.h>
#include "stmts_ossl.h"

#include <openssl/applink.c> 
#include <openssl/bio.h>

#include "stmts_file.h"
#include "stmts_trim.h"
#include "data_static.h"


using namespace std;
void encrypt_and_decrypt_data_test();

void cambio(int* a);

int main()
{
    srand(time(0));
    std::cout << "Hello World!\n";
    success_openssl();
    char* name = create_name();
    printf("%s\n", name);
    //create_key();

    //generate_iv();

    /*
    printf("*********************");
    int cantidad = 10;
    char number1[] = { 0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39 };
    char number2[] = { 30,31,32,33,34,35,36,37,38,39 }; //si el valor pasa los 256 se comienza a sacar el modulo para ese valor ejem: 1000 mod 256 y el resultado es el valor decimal que se representa


    printf("11111111111111111111111111111111111111\n");
    for (int x=0;x<cantidad;x++)
    {
        printf("Caracter: %c, Valor: %u , hexadecimal: %02X\n", number1[x], number1[x], number1[x]);
    }
    printf("11111111111111111111111111111111111111\n");
    printf("22222222222222222222222222222222222222\n");
    for (int x = 0;x < cantidad;x++)
    {
        printf("Caracter: %c, Valor: %u , hexadecimal: %02X\n", number2[x], number2[x], number2[x]);
    }
    printf("22222222222222222222222222222222222222\n");
    */

    /*
    int longitud = 8;
    char *p=(char*) malloc(sizeof(char*)*10);
    if (p == NULL) return;
    char *value_pos = (p + longitud);

    *value_pos = 'a';
    *(p + longitud+1) = 'B';

    for (int x=0;x<10;x++)
    {
        if (p[x] == NULL) {
            printf("vacio posicion %d\n", x);
            continue;
        }
        printf("valor inter: %c ; hex: %02X; valor: %u\n",p[x],p[x],p[x]);
    }
    */


    encrypt_and_decrypt_data_test();

    File_Manager file_manager;
    file_manager.write_file("C:/Users/jhon/Desktop/cnyprueba/data.txt", "esto es un mensaje de prueba");

    vector<string> data_vector = file_manager.read_file("C:/Users/jhon/Desktop/cnyprueba/data.txt");
    printf("tamanio de vector: %u\n", data_vector.size());

    printf("**Imprimiendo vector**\n");

    for (int x = 0;x < data_vector.size();x++)
    {
        printf("data: %s\n", data_vector[x].c_str());
    }

    printf("*************kkkkkkkkkkkkkkkkkkk********************\n");
    //unsigned char* text = (unsigned char*)"The quick brown fox jumps over the lazy dog";
    //unsigned char ciphertext[4096];

    //unsigned char* key = create_key();
    //unsigned char* iv = generate_iv();

    /* A 256 bit key */
    unsigned char key[] = { 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
                           0x38, 0x39, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35,
                           0x36, 0x37, 0x38, 0x39, 0x30, 0x31, 0x32, 0x33,
                           0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x30, 0x31
    };

    /* A 128 bit IV */
    unsigned char iv[] = { 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
                          0x38, 0x39, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35
    };

    //int ciphertext_len = encrypt(
    //    "D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/index_files/",
    //    "D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/prueba.txt",
    //    "D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/data/", key, iv);

    //decrypt("D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/data/",
    //        "D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/output/", key, iv);



    /*NodeSt* q = NULL;
    file_manager.list_directory(&q,"D:/recurso/proyectoChatMovilAmic/proyectov1/encrypted/resource/data/");

    NodeSt* aux = q;

    printf("imprimiendo lista\n");
    bool c = false;
    while (true)
    {
        if (aux->next == NULL)
        {
            c = true;
        }
        printf("name file: %s\n",aux->data);
        aux = aux->next;

        if(c) {
            break;
        }
    }*/


    //const char* pepa = "dfdgdfgdfgdfgdfsdssdsd";
    //printf("el tamaniooo es: %zu\n", sizeof(pepa));
    //printf("el tamaniooo es: %zu\n", strlen(pepa));


    //string pp = "hola mundo; data final; oooo";
    //int pos = pp.find("100");
    //printf("posicion: %d\n", pos);

    //printf("cadena: %s\n", pp.substr(0, pos).c_str());


    ////pp.erase(10,(pp.size()-10));
    //pp.erase(0, 10+1);
    //printf("data: %s\n", pp.c_str());
    /* ddd*/

    vector<string> dt = split_data("hola como estas; yo bien ;", ';');
    for (int x = 0;x < dt.size();x++) {
        printf("data: %s\n",dt[x].c_str());
    }

    //printf("espacio: %d\n", isspace('d'));


   /* string dt_t = "   Hola como estas     ";    
    
    printf("dt_t: 111 %s\n", dt_t.c_str());

    trim(dt_t);

    printf("dt_t: %s\n",dt_t.c_str());*/

    const char* jj = "hola";
    string sal = "mundo";
    printf("ooo: %s\n",(jj+sal).c_str());

    //int state = encrypt("datos.txt", key, iv);
    //decrypt("UTGFBXDNEKmxduluqclo6459169645.txt", key, iv);

    //string ddd = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_DATA_ENCRY);
    //const char* path_data_encry = ddd.c_str();
    //printf("ppeee: %s\n", path_data_encry);


    create_paths();

    Data_Static ds;
    printf("holaaa: %zu\n",sizeof(ds.folder_names_vc()));
    printf("holaaa: %zu\n", ds.folder_names_vc().size());
    printf("holaaa: %s\n", ds.folder_names_vc()[0]);


    string data_cad = "hola mundo";
    string b64_encoded=b64_enconde(data_cad);
    string b64_decoded = b64_decode(b64_encoded);
    printf("b64 encoded: %s\n", trim(b64_encoded).c_str());
    printf("b64 decoded: %s\n", trim(b64_decoded).c_str());

    unsigned char keyp[1564];
    printf("999999999999: %zu\n", sizeof(keyp));


    int p = 89;
    printf("numero: %d\n", p);
    cambio(&p);
    printf("numero: %d\n",p);
    
    int x = 99;
    int y = 8;

    int* h = &x;
    int*& jjo = h;

    printf("valor: %d\n",*h);
    jjo = &y;
    //*jjo = y;
    printf("valor: %d\n", *h);


    int u = 8;
    int *vv = &u;
    printf("valor v1: %d\n", *vv);
    cambio(vv);
    printf("valor v2: %d\n", *vv);


    system("pause");
    return 0;
}


void cambio(int *a) {
    *a = 0;
}



void m_write_file_s1(const char* name_folder,const char* name_file, const char* data,const char* extension) {
    File_Manager fm;
    const string psnf = (Data_Static::PATH_DATA + (string)name_folder + "/" + (string)name_file+"."+ (string) extension);
    const char* path = psnf.c_str();
    fm.write_file(path, data);
}

void m_write_file_s2(const char* name_folder, const char* name_file, const char* extension, const unsigned char* data,int out_lenght) {
    File_Manager fm;
    const string pdnf = (Data_Static::PATH_DATA + (string)name_folder);
    const string pdnff = (Data_Static::PATH_DATA + (string)name_folder + "/" + (string)name_file + "." + (string)extension);
    const char* path = pdnf.c_str();
    const char* path_file = pdnff.c_str();
    fm.write_file(path, path_file,data, out_lenght);
}

void m_write_file_s3(const char* name_folder, const char* name_file, const char* extension, const char* data) {
    File_Manager fm;
    const string pdnf = (Data_Static::PATH_DATA + (string)name_folder);
    const string pdnff = (Data_Static::PATH_DATA + (string)name_folder + "/" + (string)name_file + "." + (string)extension);
    const char* path = pdnf.c_str();
    const char* path_file = pdnff.c_str();
    fm.write_file(path, path_file, data);
}

string m_generate_key() {
    File_Manager fm;
    string po = (Data_Static::PATH_DATA + Data_Static::NAME_FOLDER_KEYS);
    const char* name_file = create_name();
    unsigned char* key =create_key();
    m_write_file_s2(Data_Static::NAME_FOLDER_KEYS.c_str(), name_file,"key", key, sizeof(key));
    string nf = (string)name_file + ".key";
    return nf;
}





void encrypt_and_decrypt_data_test() {
    unsigned char* text = (unsigned char*)"The quick brown fox jumps over the lazy dog";
    unsigned char ciphertext[128];
    unsigned char decryptedtext[128];

    unsigned char* key= create_key();
    unsigned char* iv = generate_iv();

    printf("numero: %u\n", strlen((char*)text));

    int ciphertext_len = encrypt_test(text, strlen((char*)text), key, iv,ciphertext);

    printf("longitud actual (bytes): %d\n", ciphertext_len);
    printf("texto cifrado (CODE ANCI)\n");

    printf("[");
    for (int x = 0;x < ciphertext_len;x++) {
        if(x== ciphertext_len-1)
            printf("%u", ciphertext[x]);
        else
            printf("%u;", ciphertext[x]);
    }
    printf("]");
    printf("\n");

    /* Do something useful with the ciphertext here */
    printf("Ciphertext is:\n");
    BIO_dump_fp(stdout, (const char*)ciphertext, ciphertext_len);

    printf("numero2: %d\n", strlen((char*)ciphertext));

    //descifrado

    int decryptedtext_len = decrypt_test(ciphertext, ciphertext_len, key, iv, decryptedtext);
    /* Add a NULL terminator. We are expecting printable text */
    decryptedtext[decryptedtext_len] = '\0';
    printf("longitud actual (bytes): %d\n", decryptedtext_len);
    printf("texto descifrado: %s\n", decryptedtext);
}



