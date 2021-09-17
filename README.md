<p align="center">
  <img src="https://user-images.githubusercontent.com/34748469/133837934-3584c5a0-e650-46c1-a0c7-7125d30fd145.png" height="100" width="100" />
</p>
<h1 align="center">Driwwwle</h1>

<h3 align="center">The Social Network for Developers</h3>
 
 <p align="center">
  <img src="https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/-TailwindCSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/-JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white" />
  <img src="https://img.shields.io/badge/-Hetzner-D50C2D?style=flat-square&logo=hetzner&logoColor=white" />
  <img src="https://img.shields.io/badge/-Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white" />
 </p>
 
----
<h3 align="center">Features</h3>

<div align="center">
  <p>⚡ Server-side rendering with Next.js<br />
  🍪 Cookie-based authorization with JSON web tokens<br />
  📜 Infinite scrolling feed with React Query<br />
  🖼️ Cloud image upload with Cloudinary<br />
  ❤️ Like, save and comment on posts<br />
  💬 Realtime chat with Socket.io<br />
  🤝 Follow developers and build personal feed<br />
  and a lot more..</p>
</div>

## Running Locally

Clone this repository and install dependencies by running:
```
npm install
#or
yarn install
```

Create a new file named `config.env` with the following environment variables in the root of the project folder:
```
PORT = 
MONGO_URI = 
JWT_SECRET = 
CLOUDINARY_CLOUD_NAME = 
CLOUDINARY_API_KEY = 
CLOUDINARY_API_SECRET = 
SENDGRID_API_KEY = 
SENDER_EMAIL = 
```

Create a new file named `.env.local` with following configuration:
```
NEXT_PUBLIC_BASE_URL = http://localhost:3000
```

For development mode, run:
```
npm run dev
```

For production mode, run:
```
npm run build
npm start
```

Visit http://localhost:3000 or your custom port environment variable to view the app.
