docker compose up -d && sleep 5
docker compose exec -T db mysql -uroot -p134679258 < damagewizdb.sql
