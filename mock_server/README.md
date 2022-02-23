
# Create and Deploy your own mock server on Heroku

Step 1: Install Heroku CLI.

Step 2: Heroku Logging from Terminal
``` bash
heroku login
```

Step 3: Initialize git
``` bash
git init
heroku create <app-name>
git add -A (stages all changes)
git commit -m “< Any message you want to give>”
git push heroku master
```

Step 4: If Your App Has a Separate .env file
``` bash
heroku config:set <key=value>
```

Step 5: View Your Heroku App on The Browser.
``` bash
heroku open
```

Step 6: If there is an error
``` bash
heroku logs --tail
```

# Only update changes
``` bash
git add -A (stages all changes)
git commit -m “< Any message you want to give>”
git push heroku master
heroku open
```
