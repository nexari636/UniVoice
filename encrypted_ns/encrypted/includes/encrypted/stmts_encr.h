#ifndef MYHEADER_H
#define MYHEADER_STMTS_ENCR


struct data_crp {
	unsigned char* ciphertext;
	int ciphertext_len;
	unsigned char* plaintext;
	int plaintext_len;
};

void success_openssl();
unsigned char* create_key();
unsigned char* generate_iv();
int encrypt_test(unsigned char* plaintext, int plaintext_len, unsigned char* key,
	unsigned char* iv, unsigned char* ciphertext);
int decrypt_test(unsigned char* ciphertext, int ciphertext_len, unsigned char* key,
	unsigned char* iv, unsigned char* plaintext);


//int encrypt(const char* path_index_file, const char* path_file, const char* path_output, unsigned char* key, unsigned char* iv);
//int decrypt(const char* path_files, const char* path_output, unsigned char* key, unsigned char* iv);

int encrypt(const char* name_file, unsigned char* key, unsigned char* iv);
int decrypt(const char* index_file_name, unsigned char* key, unsigned char* iv);

void handleErrors(void);

#endif