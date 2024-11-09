# DaySave Database for Local Development

Adminer URL: http://localhost:8080

## Installing databases and docker to EC2 instance

* install Docker
* install Docker Compose latest
* Set permission: sudo chmod +x /usr/local/bin/docker-compose
* Start docker in system
* Login to Docker Hub in terminal
* Start Docker: sudo systemctl start docker
* Run docker compose (sudo)


## Backup database and restore to localhost

You can only access the database from the same VPC in AWS. There is EC2 virtual machine instance running in the same VPC where you user with correct AWS IAM access rights can connect via SSH to access the database to create Postgresql port-forwarding tunnel to localhost (rds_tunnel.sh).

### Backup database
``` bash
PGPASSWORD=${POSTGRES_PASSWORD} pg_dump -U ${POSTGRES_USER} -h ${DB_HOST} db > db_backup_$(date +%Y-%m-%d_%H-%M-%S).sql
```

### Restore database from the backup
``` bash
PGPASSWORD=${POSTGRES_PASSWORD} psql -U ${POSTGRES_USER} -h ${DB_HOST} db < db_backup_2024-04-29_16-35-07.sql
```
