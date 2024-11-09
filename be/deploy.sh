#/bin/sh

out() { echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&1; }
err() { echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2; }
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
reset_dir() {
    cd "$SCRIPT_DIR"
}

out "deploying backend"
reset_dir
 
out "pulling latest"
git pull
out "building npm"
npm install

npm run build
out "copying over"
rsync -av -e ssh ./* root@sidekala:/var/www/granlund.backend/
out "restarting backend"
ssh sidekala "sudo -- bash -c 'cd /var/www/granlund.backend && source ../granlund.env && npx prisma migrate deploy &&  npx prisma generate'"
ssh sidekala "sudo systemctl restart granlund.service"


