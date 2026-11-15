cmake_minimum_required(VERSION 3.13)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
enable_language(CXX)
project(encrypted)

#file(GLOB_RECURSE SOURCE_FILES CONFIGURE_DEPENDS src/*.c src/*.cpp)

set(SOURCE_FILES
    src/b64/b64ossl.cpp
    src/encrypted/methods_encrypted.cpp
    src/file_manager/file_manager.cpp
    src/utils/data_structs.cpp
    src/utils/methods_globals.cpp
    src/utils/process_trim.cpp
    encrypted.cpp
)

# Creamos tu ejecutable a partir de tu archivo main.c
add_executable(${PROJECT_NAME} ${SOURCE_FILES})

# incluimos los headers
# la variable ${PROJECT_SOURCE_DIR} apunta al directorio que contiene el archivo CMakeLists.txt donde se ejecutó el comando project()
target_include_directories(${PROJECT_NAME} PUBLIC ${PROJECT_SOURCE_DIR}/includes/)

