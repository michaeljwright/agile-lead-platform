## Requirements

- [Node.js 18v >=](https://nodejs.org/en/) _always use NVM locally_
- Firebase (Auth, Firestore, Analytics)

## Clone the repo

```bash
$ git clone https://github.com/michaeljwright/agile-lead-app.git

$ cd agile-lead-app
```

## Setup

1. Copy .env-example and rename to .env-local
2. Go to https://firebase.google.com and create a project for a webapp. Then add the details to the .env-local file.
3. Create a Firebase firestore db and set rules to those within firestore-rules.txt
4. Remember to change the SITE_URL in .env-local if you are using a different server or port.
5. If you're deploying to a live environment, its worth setting ANONYMOUS_SIGNIN_ENABLED in your env to blank (not false).

## Install & Run

```bash
$ npm install
# or
$ yarn

# Run in Development
$ npm run dev
# or
$ yarn dev

# Run in Production
$ npm run build
$ npm run start
#or
$ yarn build
$ yarn start
```
