# Foot Management System Challenge Project

The purpose of this project is for demonstrating ability of organizing project structure, reusable components and how to use modern languages such as typescript and html5 also scss and other relevant technologies.

## Setting Up Environment

* `node.js` and `npm` is primarily required to run this project on your local.
* There's no need to have [React](https://react.dev/) environment but maybe helpful.
* Clone the repository or just download the `.zip` or `.tar.gz` file and extract it.

```bash
# Setting up node_modules (npm packages)
$ npm install or yarn install
# Run the project on the local
$ npm run start or yarn run start
```

* After following above steps, navigate to `http://localhost:3000` on your browser to check the running website.

## Short Description

Design implementation, functional implementation along with the mobile responsive is the core feature of this test task.

## Implementation Details

* There are three pages `/` (root page - showing random foods, latest foods, search foods by name), `/filter` (filter page - getting filtered by `area`, `ingredients`, `name`, `category`) and `/category` (category page - Showing foods by category).
* All pages are fully mobile responsive in different devices including phone and tablet view.
* Application is storing the data as in a service and work similar as `useContext` hook. This will demonstrate that developer is just familiar with all progressive programing.
* Design specifications are correctly implemented using [Tailwind CSS](https://tailwindcss.com) and [SASS](https://sass-lang.com/) along with recommended fonts.
* General code quality is supported by the [Prettier](https://prettier.io) and also IDE configuration. (If you use VS Code or Webstorm, you need to install prettier plugin on your editor.)
* Typescript - Defined all types and models using the typescript to make sure developer is following the best practice and modern cookbooks.
* Using different method of handling asynchronous actions using axios and so on, used different methods in different places to show you cases.
