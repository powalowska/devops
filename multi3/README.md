# Max Calculator (docker-compose)

Calculate max with three numbers.

* frontend - React.js
* backend - Express.js
* redis
* postgres
* nginx

##commands
`docker-compose up --build`<br />
`docker-compose down`

## Show in browser
### frontend
* `localhost:8080`
### backend
* `localhost/5000` or `localhost:8080/api` to show 'Hello from Backend'<br />
* previous path and `/max/firstnumber,secondnumber,thirdnumber` - calculate max and check if it is calculated or from cache, for example `localhost:5000/max/10,9,77` / `localhost:8080/api/max/10,9,77` <br />
* previous path and `/results` - show all calculated results