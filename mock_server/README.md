# Run the server in your local

## Use Docker Compose

```bash
# if there is mongodb running in your local
$ sudo service mongod stop

# start docker node server and mongodb
$ docker-compose up -d

# load sample data
$ npm run sample-data
# want to clear all data
$ npm run blow-sample-data

# to stop docker node server and mongodb
$ docker-compose down
```

## Run in Debugging Mode

Change the last line of Dockerfile

Step 1: CMD ["npm", "start"] --> CMD ["npm", "run", "start-debug"]

Step 2: Rebuild docker container and run

```bash
# build docker container
$ docker-compose build
# start docker node server and mongodb
$ docker-compose up -d
```

Step 2: Press the play button in "Run and Debug" menu

&nbsp;

# Create and Deploy your own mock server on Heroku

Step 1: Install Heroku CLI.

Step 2: Heroku Logging from Terminal

```bash
heroku login
```

Step 3: Initialize git

```bash
git init
heroku create <app-name>
git add -A (stages all changes)
git commit -m “< Any message you want to give>”
git push heroku master
```

Step 4: If Your App Has a Separate .env file

```bash
heroku config:set <key=value>
```

Step 5: View Your Heroku App on The Browser.

```bash
heroku open
```

Step 6: If there is an error

```bash
heroku logs --tail
```

&nbsp;

# Only update changes

```bash
git add -A (stages all changes)
git commit -m “< Any message you want to give>”
git push heroku master
heroku open
```
