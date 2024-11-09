set -e

echo 'Switch to the main branch'
git checkout main

echo 'Update the local main branch'
git pull

echo 'Switch to the feature branch'
git checkout feature/desktop-client

echo 'Rebase the feature branch onto the main branch'
git rebase main

echo 'Push the rebased feature branch to the remote repository'
git push --force-with-lease

echo 'Switch back to the main branch'
git checkout main

echo 'Merge the feature branch into main as a single commit'
git merge --squash feature/desktop-client

echo 'Push the updated main branch to the remote repository'
git push

echo 'Switch back to the feature branch'
git checkout feature/desktop-client