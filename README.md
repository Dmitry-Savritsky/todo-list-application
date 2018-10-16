# todo-list-application
A To-Do App build with React.js,Redux,Material UI. [MongoDB-api](https://github.com/Dmitry-Savritsky/mongodb-api) is used for backend.

This application provides an opportunity to split your todos into categories. Categories can be nested inside each other and have an infinite hierarchy. When you click on category you will see its todos. Also you can add, change or delete category. There is a progress bar which shows what percentage of the category are done. Completed category is a category in which all tasks are done or if it’s empty.

## Main page

![Main page](https://github.com/Dmitry-Savritsky/todo-list-application/blob/master/docs/images/Main%20page.png)

## Task edit page

![Task edit page](https://github.com/Dmitry-Savritsky/todo-list-application/blob/master/docs/images/Task%20edit%20page.png)


## Getting Started
To get the code you can just clone the repo.
```
$ git clone https://github.com/Dmitry-Savritsky/todo-list-application.git
$ cd todo-list-application
$ npm install
```
Install all the dependencies listed within package.json in the local node_modules folder.
```
$ npm start
```
Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

## Running the tests
```
$ npm test
```
Launches the test runner in the interactive watch mode.
App uses Jest as its test runner.
