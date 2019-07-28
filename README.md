<img src="https://github.com/nyalsadiq/Feed/blob/master/FEED.png" alt="logo" width="150"/>

[![Build Status](https://travis-ci.com/nyalsadiq/Feed.svg?token=mNFauez84pnLuDczxfbh&branch=master)](https://travis-ci.com/nyalsadiq/Feed) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/845868fc921843ad8e681f2818e24543)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=nyalsadiq/Feed&amp;utm_campaign=Badge_Grade) ![TripAdvisor Rating](https://img.shields.io/amo/stars/a-worthless-background.svg?colorB=yellow&label=TripAdvisor&style=flat) ![Review](https://img.shields.io/badge/Washington%20Post-%2210%2F10%20Best%20robot%20we%27ve%20ever%20seen%22-blue.svg)

### The easy way to feed your pets the right amount at the right time!

## To Clone
* Run `git clone https://github.com/nyalsadiq/Feed.git`

## To Build and Run
* Install Docker and Docker Compose.
* Navigate to the root directory of the project.
* Run `docker-compose up`. This might take longer the first time as it needs to install all dependencies.
* Go to `localhost:3000`.

You can check out the messaging demo at `localhost:8080`. Open up the javascript console to see what's going on.  
Run `docker-compose stop` to stop running the project.

## Docker Installation
* [For Mac](https://docs.docker.com/docker-for-mac/install/)
* [For Windows](https://docs.docker.com/docker-for-windows/install/)
* [For Linux](https://docs.docker.com/compose/install/) 

The Mac and Windows downloads come with Docker Compose. Linux users will have to install Docker Compose seperately.

## Workflow
For each new feature you want to add, do the following:
* Create a branch from development, using `git checkout -b yourbranchname development`
* Build your feature and then commit, eg `git commit -m "your message"`
* Checkout development with `git checkout development`
* Pull any changes into development with `git pull`
* Merge your branch into development with `git merge --no-ff yourbranchname`
* Fix any conflicts and make sure everything runs and tests pass.
* Push to github with `git push origin development`

We will periodically merge development into master.

## What is Docker? <img src="https://cdn-images-1.medium.com/max/1600/1*OToiKcFuZC982kt3SHV5AA.png" alt="docker-logo" width="90"/>
"Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. By doing so, thanks to the container, the developer can rest assured that the application will run on any other Linux machine regardless of any customized settings that machine might have that could differ from the machine used for writing and testing the code."  
* [More Info](https://opensource.com/resources/what-docker)  
* [Docker Docs](https://docs.docker.com/get-started/)


## Spring Resources <img src="https://cdn.freebiesupply.com/logos/large/2x/spring-3-logo-png-transparent.png" alt="spring-logo" width="40">
We use the Spring Framework to build the backend.  
Helpful Links:
* [Building a REST service with Spring](https://spring.io/guides/gs/rest-service/)
* [Building a messaging app with Spring](https://spring.io/guides/gs/messaging-stomp-websocket/)
* [More Guides](https://spring.io/guides)

## React Resources <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2000px-React-icon.svg.png" alt="react-logo" width="50">
We use React to build the frontend.  
Helpful Links:
* [React Homepage](https://reactjs.org/)
* [Tutorial](https://reactjs.org/tutorial/tutorial.html)
