# happijs
Happi-based Web API Framework


## Installation

**After [nodejs](http://nodejs.org) installed:**

```sh
# Get the latest stable release of Happi
$ npm install happi -g
```

## Your First Happi Project

**Create a new app:**

```sh
# Create the app
$ happi new testProject
```

**Run the app:**

```sh
# cd into the new folder
$ cd testProject

# fire up the server
$ happi run
```

**Generate a REST API:**


```sh
# Generate new api
$ hapi generate api user

# Result
# ./api/models/User.js
# ./api/controllers/UserController.js
# ./api/services/UserService.js

# Generate individual components
$ happi generate [controller, model, service, apdapter, policy, response, config] << component name >>

# [[** Project structure **]]
# ./api/models
# ./api/controllers
# ./api/services
# ./api/policies
# ./api/responses
# ./api/config
```

## Compatibility

Happi is built on [Node.js v6.x](http://nodejs.org/), [Express v4.x](http://expressjs.com/), and [Socket.io v1.x](http://socket.io/).

