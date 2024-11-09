set -e

stage='local' # can set rasperry pi for Zajo's server ;)

root_dir="$(dirname "$(readlink -f "$0")")/.."
source ${root_dir}/.env.$stage

npx prisma migrate dev
npx prisma generate

