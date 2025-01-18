#!/bin/bash

# Charger les variables d'environnement depuis le fichier .env
export $(grep -v '^#' /root/Cedrik2.0/.env | xargs)

# Tester la connexion à la base de données
mysql -h $DB_HOST -P $DB_PORT -u $DB_USER -p$DB_PASSWORD -e "USE $DB_NAME;" 2>/dev/null

if [ $? -eq 0 ]; then
  echo "Connexion réussie à la base de données $DB_NAME."
else
  echo "Échec de la connexion à la base de données $DB_NAME."
fi