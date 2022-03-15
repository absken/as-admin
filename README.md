# AbsenceSoft Admin

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What's included

Within the download you'll find the following directories and files. You'll see something like this:

```
├── mock_server/        # mock server
│   └── serverMock.js   # starting js file
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
└── package.json
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

### Installation

If you do not have yarn installed, you can run 'npm install --global yarn'

```bash
$ yarn install
```

### Install all the dependency packages

(USE YARN, DO NOT USE NPM Command) : npm installation causes multiple REACT instances in the app

If you do not have yarn installed, you can run 'npm install --global yarn'

(THIS COMMAND TAKES MORE THAN 10 MINUTES FOR THE FIRST TIME, SO BE PATIENT )

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

## Run App in Your Local

Do this after install and build the app
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Local Mock Server

```bash
$ yarn run mockapi
```

### AbsenceSoft Admin

```bash
$ yarn start
```

Login with admin/admin account

## Test

```bash
$ yarn test
```
