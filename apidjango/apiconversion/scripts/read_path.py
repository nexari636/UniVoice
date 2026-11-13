from pathlib import Path
import csv
import os

PATH_SCRIPT = os.path.dirname(os.path.abspath(__file__))

#carpeta = Path(PATH_SCRIPT) / ".." / "api" / "recursos" /"audios"
#carpeta = carpeta.resolve()

#sube un nivel
carpeta = Path(PATH_SCRIPT).parent
carpeta = Path(carpeta) / "api" / "recursos" /"audios"
carpeta = carpeta.resolve()

print(carpeta)
#carpeta=Path("C:/Users/jhon/Desktop/audios/799/")

csv_salida = "archivos.csv"

with open(csv_salida, mode="w", newline="", encoding="utf-8") as archivo_csv:
    writer = csv.writer(archivo_csv)
    
    # Recorrer archivos
    for archivo in carpeta.rglob("*"):
        if archivo.is_file():
            writer.writerow([
                archivo.name,
            ])

print(f"CSV generado: {csv_salida}")