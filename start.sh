docker compose build --no-cache
docker compose up -d --build --force-recrse eate && sleep 5
docker compose exec -T db mysql -uroot -p134679258 < damagewizdb.sql
