# Todo Lists

This is a simple todo lists web app made using Next.js. The backend serves GraphQL via Next.js API routes (serverless functions) using Apollo server. It uses NextAuth for OAuth based passwordless authentication.
## How to use locally
* Make sure to have postgres installed locally.
* Make your own Github OAuth token with callback url `/api/auth/callback/github` 
* Setup the environment variables in the `.env` file:
```
DATABASE_URL="postgresql://user@localhost:5432/tmpdb"
GITHUB_ID="" 
GITHUB_SECRET=""
NEXTAUTH_URL="http://localhost:port"
```
* Install the dependencies and run:
```bash
# install dependencies
yarn
# run
yarn dev
# or
yarn build && yarn start
```
