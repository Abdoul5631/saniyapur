#!/bin/bash
# Renouvellement du certificat HTTPS (Let's Encrypt) de J&B SANIYAPUR.
# Lancé deux fois par semaine par cron : certbot ne renouvelle que si le certificat expire dans moins de 30 jours.
set -euo pipefail

cd /var/www/saniyapur

docker run --rm \
  -v "$PWD/certbot/conf:/etc/letsencrypt" \
  -v "$PWD/certbot/www:/var/www/certbot" \
  certbot/certbot renew --quiet

# nginx relit les certificats au rechargement (sans coupure du site).
docker compose exec -T nginx nginx -s reload

echo "$(date '+%F %T') OK  fin du certificat : $(echo | openssl s_client -connect jb-saniyapur.com:443 -servername jb-saniyapur.com 2>/dev/null | openssl x509 -noout -enddate)"
