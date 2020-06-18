# DevOps

This is a repository with notes and projects from DevOps class.<br />
dockerhub: [lucypowalowska](https://hub.docker.com/u/lucypowalowska)

## Table of contents
* [Projects](#projects)
  * [Max Calculator (Kubernetes)](#max-calculator-Kubernetes)
  * [Max Calculator (docker-compose)](#max-calculator-docker-compose)
  * [Exercises from labs](#exercises-from-labs)
* [Notes](#notes)
  * [Docker](#docker)
  * [Kubernetes](#kubernetes)
  
  
## Projects

### Max Calculator (Kubernetes)
Open [here](/final)
### Max Calculator (docker-compose)
Open [here](/multi3)
### Exercises from labs
Open [here](/other-labs)


## Notes
### Docker
```
docker info
```
Check Docker information.
```
docker version
```
Get the currently installed version of docker.
```
docker ps
```
List of containers.
  - `docker ps -a` - all containers (also with status Exited).
```
docker logs CONTAINERID
```
Show container logs.
```
docker run IMAGE COMMAND
docker run -p HOSTPORT:CONTAINERPORT IMAGE
docker run -p 90:80 nginx
```
Run a command in a new container (`-p HOSTPORT:CONTAINERPORT IMAGE` - port mapping).
```
docker run --rm IMAGE
```
Removes a container after it exits.
```
docker rm CONTAINER
```
Delete a container (if it is not running).
```
docker images
```
Lists images on the docker host.
```
docker rmi IMAGE
```
Delete an image.
```
docker system prune -a
```
Remove sll stopped containers, all build cache, unused images, networks (`-a` all images, networks not used by existing containers).
```
docker exec <options> <container> <command>
docker exec -it CONTAINERID sh
docker exec -it CONTAINERID bash (/bin/bash)
docker exec -e UID='test' CONTAINERID printenv UID 
//test
```
Execute commands on running container.
For example set the UID environment variable just to print it out within the container (`-e` option in order to set the environment variable).
```
docker exec -it CONTAINERID redis-cli
set message Hello
get message
//Hello
```
Run a command in a running container, example above run Redis command line interface (`-t` - pseudo TTY).
`docker exec --help` for help.
```
docker start -a CONTAINERID
```
Start one or more running containers.
```
docker stop CONTAINERID
```
Stop one or more running containers.
```
docker build -t DOCKERHUBID/NAME (for example mybbox:latest) .
```
Build image, `-t` tags image with names of your choosing.
```
docker push DOCKERHUBID/NAME:TAG
docker pull DOCKERHUBID/NAME:TAG
```
Upload / download image.
```
docker-compose up
docker-compose up --build
```
Builds images if the images do not exist and starts the containers (`--build` - force build images even when not needed).
```
docker-compose down
```
Stops containers and removes containers, networks, volumes, and images created by up.
```
docker network create NAME
```
Create network.
```
docker network ls
```
List networks.
```
docker network connect NETWORK CONTAINER
```
Connects a container to a network.
```
docker network disconnect NETWORK CONTAINER
```
Disconnect a container from a network.
```
docker network inspect NETWORK
```
Show information on one or more networks.
```
docker network rm NETWORK
```
Remove one or more networks.
```
docker run --name CONTAINER1 --network NETWORKNAME -d IMAGE1 --rm
docker run --name CONTAINER2 --network NETWORKNAME -d IMAGE2 --rm
```
Run two containers and join network. `-d` with `--rm` - container is removed when it exits or when the daemon exits.

### Kubernetes
```
kubectl cluster-info
```
Display addresses of the master and services with label kubernetes.io/cluster-service=true.
```
kubectl config current-context
```
Displays the current-context (e.g. docker-desktop).
```
kubectl get pods
kubectl get rs
kubectl get deploy
kubectl get svc
kubectl get pvc
kubectl get pv
kubectl get secret
kubectl get ingress
kubectl get ns (namespaces)
kubectl get sc (storageclasses)
```
List all pods (or service, replicaset, service etc.) in ps output format.
`kubectl get all` - show all (pod, service, deployment etc.).
```
kubectl get pods --namespace=kube-system
```
Get information about system pods.
```
kubectl create -f FILENAME
kubectl create -f pod-template.yml
```
Create pod, `-f` - filename.
```
kubectl apply -f FILENAME
kubectl apply -f pvc-deployment.yml
```
Apply a configuration to a resource by filename. This resource will be created if it doesn't exist yet.
```
kubectl delete pod NAME
kubectl delete deploy NAME
kubectl delete svc NAME
kubectl delete secret NAME
kubectl delete ingress NAME
...
```
Delete pod/deployment/service etc.
```
kubectl describe pod NAME
kubectl describe deploy NAME
kubectl describe svc NAME
kubectl describe secret NAME
kubectl describe ingress NAME
...
```
Describe pod/deployment/service etc.
```
kubectl logs PODNAME
kubectl logs SERVICENAME
...
```
Show logs of pod/service etc.
```
kubectl scale --replicas=NUMBER replicaset REPLICASETNAME
kubectl scale --replicas=5 replicaset myapp-rs
```
Set number of replicas.
```
kubectl replace -f FILENAME
kubectl replace -f rs-template.yml
```
Replace a resource by filename.
```
kubectl exec -ti dnsutils -- nslookup SERVICENAME
kubectl exec -ti dnsutils -- nslookup redis-service
```
DNS information for service.
```
kubectl get pods -n ingress-nginx
winpty kubectl exec -it ingress-nginx-controller-579fddb54f-wjmwj -n ingress-nginx -- //nginx-ingress-controller --version
-------------------------------------------------------------------------------
NGINX Ingress controller
  Release:       0.33.0
  Build:         git-589187c35
  Repository:    https://github.com/kubernetes/ingress-nginx
  nginx version: nginx/1.19.0
-------------------------------------------------------------------------------
```
Checks version.