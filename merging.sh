echo "fDev initalizing"
git stash
git checkout fDev
git pull
git stash
echo "Initalizing Master branch"
git checkout master
git pull
git commit -am "the merge"
echo "saving data"
git merge fDev
echo "Attemped merge complete"