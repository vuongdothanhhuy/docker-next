This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Introduction

This is the demo project to apply to Remitano as Developer.

This is a simplified Youtube video sharing social site, with some key features:

- User registration and login
- Share Youtube video
- View a list of everyone shared videos

## Pre-requisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node LTS v18
- Prisma credentials for a PostgesSQL database. (Or use the example `.env.sample` file)

## Installation & Configuration

0. Ensure you have Docker installed and working.
1. Clone the repo to your folder, for example: `~/renec`
2. `cd ~/renec`
3. Install deps by running `npm install`
4. Create an `.env` file at root folder and put your Prisma creds inside: `touch .env`
5. Or, use the sample provided database: `cp .env.sample .env`
6. Seed some data into the database if you use your own database setup: `npx prisma db seed`
7. Now you are ready to go. Run `npm run dev` to start the dev server.
8. Visit `http://localhost:3000` and voila!

There is also a Docker file setup if anyone want to run with Docker:

3. `cp .env.sample .env`
4. Run `docker-compose up --build` and wait for it to complete
5. Now the Docker container is up and serve you at `http://localhost:3000`

## Database Setup

If you want to use your own Prisma database. Do this:

1. Sign up for Prisma and spin up a PostgresSQL database instance.
2. Create a .env file and put the configurations Prisma give to you.
3. Run the command to init the db: `npx prisma generate` && `npx prisma db push`
4. Run the command to seed the new db `npx prisma db seed`

## Running the Application

1. Start the dev server if you haven't yet: `npm run dev`
2. Visit `http://localhost:3000` and the Homepage will appear
3. Run `npm run test` to run full test suite

## Usage

1. The Homepage contains the big main part listing out all shared videos in the system.
2. On the top right corner is the login/register form.
3. Enter an email and a password and click "**Register**" button and your account will be created immediately. The
   system
   will also log you in automatically.
4. Or, to login using existing account: enter the email and password and click "**Login**" button, and the system will
   log
   you in. Otherwise, an alert will pop out telling you what went wrong.
5. Once logged in, the top-right corner will turn into My Account section, telling you your email, as well as allowing
   you to share a video or logout of the system.
6. Click on the button "**Share a movie**" and the Sharing form will appear under.
7. Or, click on "**Logout**" button and you are out!
8. To Share a video, in the Share form, paste your Youtube link (for
   example: https://www.youtube.com/watch?v=l9-KNJTc_UU) into the input and click "**Share**".
9. If success, then you are back to the main screen and the newly shared video will appear at the top of the list.
10. Otherwise, an alert will pop out telling you what went wrong.

## Troubleshooting

1. **npm install failed**: You might have permission issue with your Node installation. We recommend using NVM to
   install
   and manage Node installation on the machine.
2. **no data**: You forgot to run the seeding process on your new fresh database instance! Go back to the **Database
   Setup**
   section and follow the instructions.
3. **port conflict**: by default, dev server will be using port 3000. If any other guy is using it, then the
   command `npm run dev` will be upset and complain a lot. Terminate any other process that is locking port 3000 and try
   again.
