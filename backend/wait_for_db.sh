#!/bin/sh
# Espera a que la base de datos esté disponible
until nc -z -v -w30 db 5432
do
  echo "Esperando a que la base de datos esté disponible..."
  sleep 1
done

echo "Base de datos lista. Ejecutando migraciones..."
