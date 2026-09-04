#!/bin/sh
set -e

echo "==> Migrations en cours..."
python manage.py migrate --noinput

echo "==> Collecte des fichiers statiques..."
python manage.py collectstatic --noinput --clear

echo "==> Démarrage du serveur..."
exec "$@"
