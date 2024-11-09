set -e

branch=$(git rev-parse --abbrev-ref HEAD)
message=$1

if [ -z "$message" ]; then
  echo "Please provide a commit message"
  exit 1
fi

HEAD=$2

if [ -z "$HEAD" ]; then
  echo "Please provide number of HEAD commits to squash"
  exit 1
fi

echo "Squashing $HEAD commits"
git rebase HEAD~$HEAD

echo 'making a commit'
git add .
git commit -m $message

echo "Cheking out main"
git checkout main

echo "Pulling from main"
git pull

echo "Rebasing $branch onto main"
git checkout $branch

echo "Rebasing $branch to main"
git rebase main

echo "Pushing $branch to main"
git checkout main && git merge $branch --squash && git commit -m $message && git push

git checkout $branch
echo "Pushed to main. Op finished."