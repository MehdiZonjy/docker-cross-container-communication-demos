#! /bin/bash
set -xe

BRIDGE="custom-bridge1"

! docker network rm $BRIDGE > /dev/null 2>&1
docker network create $BRIDGE


docker run -d --rm --net $BRIDGE --name db --hostname db --env-file ./db.env mysql:5.7 --lower_case_table_names=1
docker run -d --rm --net $BRIDGE --name app -p 3000:3000 --hostname app --env-file app.env mysql-webapp error 


echo 'press anything to exit'
read

! docker stop db
! docker stop app
! docker network rm $BRIDGE