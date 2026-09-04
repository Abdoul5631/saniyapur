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
Admin Django : http://localhost:8000/admin/ ou http://localhost:8000/django-admin/

---

## Déploiement avec Docker

### 1. En développement local avec Docker Compose

```bash
docker compose -f docker-compose.dev.yml up --build
```

- Site public & Admin : http://localhost:3000
- API Backend : http://localhost:8000/api/

### 2. En production avec Docker & Nginx

1. Copier le fichier d'environnement modèle :
   ```bash
   cp .env.production.example .env
   ```
2. Éditer `.env` et renseigner les variables sensibles (`DJANGO_SECRET_KEY`, `POSTGRES_PASSWORD`, nom de domaine).
3. Lancer la pile complète :
   ```bash
   docker compose up -d --build
   ```
4. Créer le compte administrateur initial :
   ```bash
   docker compose exec backend python manage.py createsuperuser
   ```

---

## Intégration Continue & Déploiement Continu (CI/CD)

- **Workflow CI** (`.github/workflows/ci.yml`) : vérifie les types, tests et builds du frontend Next.js et du backend Django à chaque push/PR.
- **Workflow CD** (`.github/workflows/deploy.yml`) : déploie automatiquement sur votre serveur VPS via SSH lors des pushs sur `main`.

