# J&B SANIYAPUR SARL — Site officiel

« PROPRETÉ SUR ORDONNANCE »

Site vitrine et panneau d'administration pour J&B SANIYAPUR SARL, société spécialisée dans la maintenance immobilière, le nettoyage industriel, le bionettoyage et l'hygiène professionnelle (Ouagadougou et Bobo-Dioulasso, Burkina Faso).

## Architecture

```
frontend/   Next.js (App Router, TypeScript, Tailwind CSS) — site public + panneau /admin
backend/    Django + Django REST Framework + PostgreSQL — API
```

Le frontend consomme l'API Django via `NEXT_PUBLIC_API_URL`. Aucun secret n'est stocké côté frontend.

## Démarrage

### Backend

```
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env   # puis renseigner les valeurs
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```
cd frontend
npm install
# créer .env.local avec NEXT_PUBLIC_API_URL=http://localhost:8000/api
npm run dev
```

Site public : http://localhost:3000
Administration : http://localhost:3000/admin
API : http://localhost:8000/api/
Admin Django : http://localhost:8000/admin/
