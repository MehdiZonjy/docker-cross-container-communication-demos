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
a Really bad idea. If containers restarts with different ip, the /etc/hosts will be out of sync
- Run db container
- Run app container
- grab db ip and update /etc/hosts in app container

## Shared Network Stack
It's possible for multiple containers to share the same network namespace `--network container:<containerName>`.
In such case they can communicate via loopback interface `localhost`.
- Containers can't publish any ports, only the container which owns the network stack can publish ports
- in such case it might be better to create an intial dummy container owns the network stack and publishes all the necessery ports. Then make all other containers share its network stack



References:
- [Legacy container links](https://docs.docker.com/network/links/)
- [Bridge Networks](https://docs.docker.com/network/bridge/)
- [Shared Network Stack](https://docs.docker.com/engine/reference/run/#network-container)
