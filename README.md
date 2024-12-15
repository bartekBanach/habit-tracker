<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/bartekBanach/habit-tracker">
    <img src="https://i.postimg.cc/90Fgb42Z/Group-1-2.png" alt="Logo" width="80" height="80">
  </a>
<h3 align="center">Habit tracker</h3
  <p align="center">
    MERN stack habit tracker app.
    <br />
    <a href="https://habit-tracker-60l3.onrender.com/">View Demo</a>
  </p>
</div>

## About

Web application designed to help users build and maintain good habits by tracking their progress and visualizing their efforts.

## Functionality

- Create and manage habits.
- Set timers to track time spent on each activity.
- Define daily and deadline-based goals.
- Monitor your progress with charts powered by Recharts.

## Technologies

- [![React][React.js]][React-url]
- [![TypeScript][TypeScript]][TypeScript-url]
- [![Vite][Vite]][Vite-url]
- [![Express][Express]][Express-url]
- [![Tailwind][Tailwind]][Tailwind-url]
- [![Redux][Redux]][Redux-url]

## Installation and usage

### Prerequisites

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

### Server-side usage (PORT: 4000)

1. Create a `.env` file in the `api` folder with the following content:
   ```sh
   MONGO_URL="YOUR MONGO CONNECTION STRING"
   PORT=4000
   FRONTEND_URL="http://localhost:5173"
   JWT_SECRET="A strong random secret string used for signing JWTs"
   ACCESS_TOKEN_SECRET="A strong random secret string for access tokens"
   REFRESH_TOKEN_SECRET="A strong random secret string for refresh tokens"
   ```
2. Install NPM packages
   ```sh
   cd api
   npm install
   ```
3. Run development server
   ```sh
   npm run dev
   ```

### Client-side usage (PORT: 5173)

1. In client folder create .env file with server url
   ```sh
   VITE_PROXY_URL = 'http://localhost:4000';
   ```
2. Install NPM packages
   ```sh
   cd client
   npm install
   ```
3. Run development server
   ```sh
   npm run dev
   ```

[Vite]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwind-url]: https://tailwindcss.com/
[Redux]: https://img.shields.io/badge/-Redux-black?style=flat-square&logo=redux
[Redux-url]: https://redux.js.org/
