## Bazaar deployment

Note: This requires docker to run

Steps:

1. Clone Repo
2. Add .env and necessary config files eg. aws.config.json to root
3. Run `docker compose up -d` to start the server.
4. Run `docker compose down` to stop the server. (in case env vars changed need to restart server)
5. Run `docker compose logs -f` to see logs
