# `Simple Login And Sign Up`

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [API Endpoints](#api-endpoints)

## General info
![login](https://github.com/Magar0/simple-assignment/assets/35245789/0a33ca3f-be32-49ba-bdcd-236276339695)

https://youtu.be/gKa_PQkvSBU  a short live demo video of my project. 

https://simple-assignment-frontend.vercel.app/ live page link.

* Developed a simple Login & Sign Up page using React JS, Node JS, Mongo DB.
* Decrypt password using jwt.
* Email verified if present then login ,if not present redirected to sign up page.
* After login redirected to dashboard with successful popup message.
* In dashboard also included navbar with logout button, when clicked user sign out and redirected to login page.
* Used Bootstrap for Design.
* Made a decrypt button on homepage ,which will decrypt the JSON Web Token and take out email from it.
  
## Technologies
* React JS, Bootstrap
* Redux Toolkit, React Router.
* Node JS., Express JS.
* Bcrypt js, Json Web Token (JWT).
	
## Setup
1. Set up environment variables:
   - Create a `.env` file in the `frontend` directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     REACT_APP_URL="your backend URL" (like "http://localhost:4000")
     ```

   - Create a `.env` file in the `backend` directory.
   - Add the following variables to the `.env` file, replacing the placeholder values with your actual credentials:
     ```
     MONGODB_URI="your_mongo_uri"
     JWT_SECRET="your_secret_key"
     ```
2. Install dependencies and run server:
#### Frontend
```
 cd ../frontend
 npm install
 npm start
```
#### Backend
```
cd ../backend
npm install
node server.js
```

## API Endpoints

## API Endpoints

| Endpoint | Description | Method | Request Body | Authentication |
|---|---|---|---|---|
| `/` | Welcome message | GET | None | None |
| `/user/signup` | Create a new user account | POST | `{ "name": "string", "email": "string", "password": "string" }` | None |
| `/user/login` | Login a user and get authentication token | POST | `{ "email": "string", "password": "string" }` | None |
| `/decrypt` | Get currently logged-in user information | GET | None | Requires valid JWT token |


