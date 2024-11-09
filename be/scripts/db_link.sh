#!/bin/bash

set -e

stage='local' # can set rasperry pi for Zajo's server ;)

root_dir="$(dirname "$(readlink -f "$0")")/.."

source ${root_dir}/.env.${stage}

# Function to URL-encode a string
urlencode() {
    local string="$1"
    local length="${#string}"
    for (( i = 0; i < length; i++ )); do
        local c="${string:i:1}"
        case $c in
            [a-zA-Z0-9.~_-]) printf "$c" ;;
            *) printf '%%%02X' "'$c" ;;
        esac
    done
}

db_name='postgres'
db_user='postgres'
db_password='postgres'
db_port=5432

encoded_password=$(urlencode "$db_password")
url="postgresql://${db_user}:${encoded_password}@localhost/${db_name}?port=${db_port}&nickname=granlund-homes"

# Print the stage specific Postico connection url
echo ""
echo "Here is the generated Postico 2 database server url."
echo ""
echo ${url}
echo ""
echo "1. Copy the url"
echo "2. Open Postico 2"
echo "3. Press \"New Server from URL...\""
echo "4. Paste the url"
echo "5. Connect to the database"
echo ""
