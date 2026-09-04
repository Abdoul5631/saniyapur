#!/bin/bash
set -e

echo "==> 1. Création des répertoires certbot..."
mkdir -p certbot/conf certbot/www

echo "==> 2. Redémarrage de Nginx avec les volumes certbot et le port 443..."
docker compose up -d nginx

echo "==> 3. Génération du certificat SSL Let's Encrypt pour jb-saniyapur.com et www.jb-saniyapur.com..."
docker run --rm --name certbot \
  -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  -d jb-saniyapur.com -d www.jb-saniyapur.com \
  --email info@jb-saniyapur.com --agree-tos --no-eff-email --non-interactive

echo "==> 4. Activation de la configuration Nginx HTTPS..."
cp nginx/nginx.ssl.conf nginx/nginx.conf

echo "==> 5. Redémarrage des services avec HTTPS..."
docker compose restart backend
docker compose restart nginx

echo "==> 6. Configuration du renouvellement automatique du certificat SSL..."
(crontab -l 2>/dev/null; echo "0 3 * * * docker run --rm -v $(pwd)/certbot/conf:/etc/letsencrypt -v $(pwd)/certbot/www:/var/www/certbot certbot/certbot renew --quiet && docker compose exec -T nginx nginx -s reload") | sort -u | crontab -

echo "=========================================================================="
echo "🎉 SUCCÈS TOTAL ! https://jb-saniyapur.com est maintenant sécurisé en HTTPS !"
echo "=========================================================================="
