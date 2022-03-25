# Sprintly.

Application MERN with gamification-inspired features including a drag and drop interface for Prioritizing with an Agile roadmap.

The app is available [here](https://sprintly-io.herokuapp.com/).

## Table of contents
* [Scope](#scope)
* [Technologies](#technologies)
* [Features](#features)

* [Install](#install)


## Scope
The app was built as a final project during Ironhack's Full Stack Developer Bootcamp.

## Technologies
This project is built with:
* react: 17.0.2
* react-dnd-html5-backend: 15.1.2
* react-dom: 17.0.2
* react-router-dom: 5.3.0
* axios: 0.25.0
* bcrypt: 5.0.1
* express: 4.17.2
* mongoose: 6.2.0
* node: 14.17.5
* multer: 1.4.4
* csvtojson: 2.0.10


## Features
* Registration & Authentication for Admins
* Admin user Dashboard
* Admin data stored in a MongoDB database
* Projets & Story cards: full CRUD operations
* Story Cards selection for Action
* Generate and Launch Prioritization
* Allow Participants to join open Prioritization 
* Enable Participants prioritize with drag and drop interaction
* Collect Prioritization results

## Install

```sh
$ npm install
```

## The .env file

Create a .env file containing this line:

```
REACT_APP_APIURL="http://localhost:5005"
```

## Dev

```sh
$ npm run dev & cd client && npm start
```

## Deploy

You need to be `heroku login` before being able to deploy.

```
$ git push heroku main
```