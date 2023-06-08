dev-up:
	docker compose -f docker-compose.dev.yaml up -d

prod-up:
	docker --context mastyka compose -f docker-compose.prod.yaml up -d

prod-upb:
	docker --context mastyka compose -f docker-compose.prod.yaml up -d --build
