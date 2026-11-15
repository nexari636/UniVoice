@echo off

echo Eliminando archivos de compilación....
cd build

:: ===== BLOQUE DE COMENTARIOS =====
:: /a-d Excluye directorios (carpetas)
:: /s Excluye archivos de sistema
:: /h Excluye archivos ocultos
:: /b Modo simple (solo nombres)
:: ===================================
for /f %%A in ('dir /a-d-s /b ^| find /v /c ""') do set cnt=%%A
echo File count = %cnt%

if %cnt% gtr 0 (
    echo Existen archivos
    goto delp
) else (
    echo Pueden existir careptas vacias, analizando....
    goto delete_empty_folders
)

:: ===== BLOQUE DE COMENTARIOS =====
:: /q Modo silencioso (no pregunta confirmación)
:: /f Fuerza la eliminación de archivos de solo lectura
:: /s Elimina también en subcarpetas
:: /a Elimina archivos con atributos específicos
:: ===================================
:delp
echo Borrando archivos...
del /q /s "*.*"

:delete_empty_folders
echo Borrando carpetas vacías...
for /f "delims=" %%d in ('dir /s /b /ad "%carpeta%" ^| sort /r') do rd "%%d" 2>nul

echo Archivos y carpetas eliminados con exito
