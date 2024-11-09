# bash script to test the program with jest
# Usage: bash test.sh
set -e

npm i

npx eslint

npx jest