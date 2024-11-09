set -e

fast_flag=$1

if [ "$fast_flag" != '--fast' ]; then
  echo 'running a slow mode of build'
  eslint .
  npm i
  tsc -b && vite build
fi

echo 'starting client server'
vite