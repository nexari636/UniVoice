#ifndef MYHEADER_H
#define MYHEADER_STMTS_STRUCTS

struct NodeSt {
	const char* data;
	NodeSt* next;
};

NodeSt* instance_node();
void list_insert(NodeSt** nodest, const char* data);

#endif