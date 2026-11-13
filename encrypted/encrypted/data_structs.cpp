#include "stmts_structs.h"
#include <stdlib.h>
#include <cstdio>



NodeSt* instance_node() {
	return (NodeSt*)malloc(sizeof(NodeSt));
}

void list_insert(NodeSt** nodest,const char* data) {
	printf("Creando un nodo para cadenas\n");
	NodeSt* q = instance_node(); //reservar memoria
	q->data = data;
	q->next = NULL;

	if (*nodest==NULL)
	{
		*nodest = q;
	}
	else {
		bool search = true;
		NodeSt* nd_aux = *nodest;
		while (search) {

			if (nd_aux->next==NULL)
			{
				printf("final de lista encontrado..\n");
				nd_aux->next = q;
				search = false;
			}
			else {
				nd_aux = nd_aux->next;
				printf("Avanzando...\n");
			}
		}
	}
}
