@echo off

set /p opcion=¿Desea eliminar la compilación anterior? (S/N): 

set value=na
:: ejecuta comando de poweshell para convertir a minusculas
for /f "delims=" %%i in ('powershell -nologo -command "'%opcion%'.ToLower()"') do set "value=%%i"

IF %value% equ s (
  echo Eliminando....
  :: Se pone call caso contrario se ejecuta el script pero no regresa, es decir termina directamente en el otro script
  :: Sin call Reemplaza el proceso actual. El padre muere.
  call build_delete.bat
  pause
)

echo ----Compilando Proyecto----
cd build

echo Construyendo Archivos
cmake ../

echo Compilando....
cmake --build .

echo compilacion finalizada