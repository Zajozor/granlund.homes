set -e

git checkout main
git pull
git checkout feature/desktop-client
git rebase main
git push --force-with-lease
git checkout main
git merge feature/desktop-client --squash
git push
git checkout feature/desktop-client