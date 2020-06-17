#!/bin/sh
cd mybackend
docker build -t lucypowalowska/mybackendfinal .
docker push lucypowalowska/mybackendfinal
cd ..
cd myfrontend
docker build -t lucypowalowska/myfrontendfinal .
docker push lucypowalowska/myfrontendfinal
cd ..
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f mycluster/myapp-configMap.yml
kubectl apply -f mycluster/redis-all.yml
kubectl apply -f mycluster/postgres-all.yml
kubectl apply -f mycluster/mybackend-all.yml
kubectl apply -f mycluster/myfrontend-all.yml
kubectl apply -f mycluster/ingress-service.yml