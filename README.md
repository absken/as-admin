# AbsenceSoft Admin

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What's included

Within the download you'll find the following directories and files. You'll see something like this:

```
├── mock_server/        # mock server
│   └── start.js   # starting js file
│
├── packages/        # private react libraries
│   └── as.ui.react.core   # react core library
│
├── public/          # static files
│   └── index.html   # html template
│
├── src/             # project root
│   ├── assets/      # images, icons, etc.
│   ├── components/  # common components across features
│   ├── features/    # application's features
│   ├── store/       # redux application store definition
│   ├── layout/      # layout components
│   ├── styles/      # scss styles and mui theme definition
│   ├── App.tsx
│   ├── ...
│   ├── index.tsx
│   ├── routes.tsx   # routes config
│   └── nav.tsx      # navigation config
│
├── package.json
└── tailwind.config.json # tailwind cofiguration
```

## Installation & Build

### Clone repo

```bash
# clone the repo
$ git clone git clone  https://(MY ACCOUNT)@bitbucket.org/absencesoft/as.admin.git my-project

# go into app's directory
$ cd my-project
```

### Install all the dependency packages

(USE YARN, DO NOT USE NPM Command) : npm installation causes multiple REACT instances in the app

If you do not have yarn installed, you can run 'npm install --global yarn'

(THIS COMMAND TAKES MORE THAN npm install FOR THE FIRST TIME, SO BE PATIENT )

```bash
# go into app's directory
$ cd my-project

# install all app's dependencies
$ yarn install
```

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

### Local Mock Server (Docker)

```bash
# if there is mongodb running in your local
$ sudo service mongod stop

# start docker node server and mongodb
$ cd mock_server
$ docker-compose up -d

# load sample data
$ cd mock_server
$ npm run sample-data
# want to clear all data
$ npm run blow-sample-data

# to stop docker node server and mongodb
$ cd mock_server
$ docker-compose down

```

### AbsenceSoft Admin

```bash
$ yarn start
```

### Run App in Your Local

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Login with admin/admin account

## Test

```bash
$ yarn test
```
