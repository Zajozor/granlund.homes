set -e

stage='local' # can set rasperry pi for Zajo's server ;)

root_dir="$(dirname "$(readlink -f "$0")")/.."
source ${root_dir}/.env.$stage

npm run create -w database
npm run migrate -w database

echo 'Database up. Starting server'
${root_dir}/scripts/start.sh