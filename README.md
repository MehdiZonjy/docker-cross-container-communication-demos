# Docker Cross Container Communication Demos
Configuring two containers to talk to each other.
- db: mysql database
- app: a simple nodejs app


## User Defined Bridge:
At the time of writing this appears to be the recommended way
- Create network
- Run both containers on the network


## Default Network With --link
This has been deprecated and will be removed at some point
- Run db container 
- `--link` the app container


## Default Network and manually update /etc/hosts
a Really bad idea. If app container restarts with different ip, the /etc/hosts will be out of sync
- Run db container
- Run app container
- grab db ip and update /etc/hosts in app container
