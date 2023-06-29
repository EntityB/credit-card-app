# Credit card app

## Realization

[API doc](doc/api.md)

### Code location

- source code is in `src`
- unit tests for `src` out of scope
- e2e tests located in `tests-e2e`
- I used POSIX shell script to run localy only

### Data storage

This application loses data upon restart, because it is not connected to the persistant storage. The connector would be implemented in `src/database`. 

### Scenario complexity

I was suggesting that single user can have multiple credit cards. Also two different users can have credit card with matching partial details. I tried to show this in e2e tests. 

### E2E tests

For application with rest api, E2E tests are basically API tests. Tests are running outside, one docker container to another. This currently allows: 
1. running API tests localy with docker-compose
2. be able to run API tests in test environment in google cloud or different cloud
3. API tests are running on production image which is IMHO better than running them on not-production code.  

Tests are using separate project for the sake of simplicity. 

### Primary focus

I would rather have a working prototype of the project than complete code implementation yet missing infrastructure of the project. Such as ways to run, test and deploy. Thus my `src` might not be as stelar. 

### Out of scope

Things I didn't do because of out of time:
- some logic, such as validators logic
- some better logic in controllers
- didn't use GCP SDK and deploy (tbh seems pointless to do, I think working docker image is more)
- didn't include postman or any curl (even tho I used it)

### Extras

- docker-compose for local e2e testing
- docker multistage build

## Running

Run localy without build:  
*this will require nodejs18 installed*
```
npm ci
chmod +x start.sh
./start.sh
```

Run localy with docker-compose:  
*this will do multistage build*
```
docker-compose up --build app
```

Running e2e tests: 
```
docker-compose up --build tests-e2e
```
