# Service-oriented Computing - Assignment 1

## Simple Node.js Server Application

The simple Node.js server application used in this exercise is found inside the [nodejs-server](./nodejs-server) directory.

### Prerequisits

1. Ensure that [Node.js is installed](https://nodejs.org/en/download/)
2. (Recommended) [Visual Studio Code] (https://code.visualstudio.com/) is an extensible code editor that will help you work on small applications like this one.
3. (Recommended) [Git](https://git-scm.com/downloads) Helps you manage git repositories, and comes with `bash`, a handy linux shell that allows us to execute certain commands easily.
4. The application runs on port `3000`, so ensure it is free.

### How to start the server application (Windows)?

1. Open `Git Bash` in an empty directory.
2. Clone the repository locally: `git clone https://github.com/iaas-exercises/soc-assignment-1.git .`.
3. Open the respective code directory: `cd ./nodejs-server`.
4. Install dependencies: `npm install`.
5. Start the application: `npm start`.
6. You can stop the application by pressing `Ctrl+C`.

### Exposed endpoints

- `http://127.0.0.1:3000/shopping-cart`
- `http://127.0.0.1:3000/shopping-cart/{id}`
- `http://127.0.0.1:3000/wisdom`
- `http://127.0.0.1:3000/login`
