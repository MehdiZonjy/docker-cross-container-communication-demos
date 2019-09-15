#! /bin/bash
set -xe

BRIDGE="custom-bridge1"


docker run -d --rm  --name db --hostname db --env-file ./db.env mysql:5.7 --lower_case_table_names=1
docker run -d --rm --link db --name app -p 3000:3000 --hostname app --env-file app.env mysql-webapp error 


echo 'press anything to exit'
read q

! docker stop db
! docker stop app