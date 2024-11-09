set -e

stage='local'

npm i

echo "starting server on stage: $stage"

root_dir="$(dirname "$(readlink -f "$0")")/.."
source ${root_dir}/.env.$stage

cd database
docker-compose up -d
cd ..


npx ts-node-dev --respawn src/index.ts 
echo 'server up, maybe run tests?\nnpm test'
