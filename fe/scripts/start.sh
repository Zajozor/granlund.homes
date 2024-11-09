set -e

slow_flag=$1

if [ "$slow_flag" == '--slow' ]; then
  echo 'running a slow mode of build'
  eslint .
  npm i
  tsc -b && vite build
fi

echo 'starting client server'
vite
