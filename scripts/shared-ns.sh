#! /bin/bash
set -xe

docker run -d --rm  --name db -p 3000:3000 --env-file ./db.env mysql:5.7 --lower_case_table_names=1
docker run -d --rm --network container:db --name app --env-file app.env -e DB_HOST=localhost mysql-webapp error 


echo 'press anything to exit'
read

! docker stop db
! docker stop app