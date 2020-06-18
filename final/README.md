# Max Calculator (Kubernetes)

Calculate max with three numbers.

* frontend - React.js
* backend - Express.js
* redis
* postgres
* nginx ingress

## commands
### apply
`cd mybackend`

`docker build -t lucypowalowska/mybackendfinal .`<br />
`docker push lucypowalowska/mybackendfinal`<br />
`cd ..`<br />
`cd myfrontend`<br />
`docker build -t lucypowalowska/myfrontendfinal .`<br />
`docker push lucypowalowska/myfrontendfinal`<br />
`cd ..`<br />
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml`<br />
`kubectl apply -f mycluster/myapp-configMap.yml`<br />
`kubectl apply -f mycluster/redis-all.yml`<br />
`kubectl apply -f mycluster/postgres-all.yml`<br />
`kubectl apply -f mycluster/mybackend-all.yml`<br />
`kubectl apply -f mycluster/myfrontend-all.yml`<br />
`kubectl apply -f mycluster/ingress-service.yml`<br />

You can also apply separated files from separatedfiles folder or run `./mycluster/apply.sh`.

### delete
`kubectl delete ingress ingress-service`<br />
`kubectl delete svc myfrontend-service`<br />
`kubectl delete deploy my-frontend-deployment`<br />
`kubectl delete svc mybackend-service`<br />
`kubectl delete deploy my-backend-deployment`<br />
`kubectl delete svc postgres-service`<br />
`kubectl delete deploy postgres-deployment`<br />
`kubectl delete secret postgres-secret`<br />
`kubectl delete pvc postgres-pvc`<br />
`kubectl delete svc redis-service`<br />
`kubectl delete deploy my-redis-deployment`<br />
`kubectl delete configmap myapp-config`<br />

You can also run `./mycluster/delete.sh`.

## Show in browser
### frontend
* `localhost` or `localhost:80`
### backend
* `localhost/api` or `localhost:80/api` - to show id<br />
* previous path and `/max/firstnumber,secondnumber,thirdnumber` - calculate max and check if it is calculated or from cache, for example `localhost/api/max/10,9,77`<br />
* previous path and `/results` - show all calculated results