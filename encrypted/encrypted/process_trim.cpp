#include <algorithm> 
#include <functional> 
#include <cctype>
#include <string>
#include "stmts_trim.h"

using namespace std;

string& ltrim(string& data) {
    data.erase(data.begin(), find_if(data.begin(), data.end(),
        [](unsigned char c) { return !isspace(c);}));
    return data;
}

string& rtrim(string& data) {
    data.erase(find_if(data.rbegin(), data.rend(),
        [](unsigned char c) { return !isspace(c);}).base(), data.end());
    return data;
}


string& trim(string& s) {
    return ltrim(rtrim(s));
}