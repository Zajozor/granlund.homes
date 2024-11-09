set -e

stage='local' # can set rasperry pi for Zajo's server ;)

echo "starting server on stage: $stage"

root_dir="$(dirname "$(readlink -f "$0")")/.."
source ${root_dir}/.env.$stage

if [ "$1" == "clean" ]; then
  npm run init -w db
fi

npx ts-node-dev --respawn src/index.ts 
echo 'server up, maybe run tests?\nnpm test'