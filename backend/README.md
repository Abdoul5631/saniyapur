# Backend J&B SANIYAPUR

1. Créez un environnement virtuel Python puis installez les dépendances : `pip install -r requirements.txt`.
2. Copiez `.env.example` vers `.env`, puis remplacez les valeurs de secret et de PostgreSQL.
3. Créez la base PostgreSQL indiquée dans `.env`.
4. Exécutez `python manage.py migrate`, puis `python manage.py createsuperuser`.
5. Démarrez le serveur avec `python manage.py runserver`.

L’API est disponible sous `/api/` et l’administration sous `/admin/`. Les fichiers envoyés sont stockés dans `media/`, ignoré par Git.
