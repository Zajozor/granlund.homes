set -e

stage='local' # can set rasperry pi for Zajo's server ;)

npm i

echo "starting server on stage: $stage"

root_dir="$(dirname "$(readlink -f "$0")")/.."
source ${root_dir}/.env.$stage

npm run local:up -w db

# npm test jest tests/unit

if [ "$1" = "clean" ] && [ $stage = 'local' ]; then
  npm run init -w db # Only init in local. This cleans the db.
fi

npx ts-node-dev --respawn src/index.ts 
echo 'server up, maybe run tests?\nnpm test'
