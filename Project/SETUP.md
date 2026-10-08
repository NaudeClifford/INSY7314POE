# HustleHub+ Development Setup

This guide explains how to set up the HustleHub+ project for local development using React (Vite), Express, MongoDB Atlas, migrations, seed data, Firebase authentication, and HTTPS with OpenSSL.

---

## Prerequisites

Install the following before starting:

* Node.js (LTS)
* Git
* OpenSSL (Windows)
* Visual Studio Code or Visual Studio 2022

---

## Project Structure

```text
HustleHubPlus/
│
├── client/                  # React (Vite) frontend
├── server/                  # Express API
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── scripts/
│
├── migrations/              # MongoDB migrations
├── .env                     # Local secrets/configuration
├── .env.example             # Example environment configuration
├── package.json
├── README.md
└── SETUP.md
```

---

## Clone the Repository

```bash
git clone <repository-url>

cd HustleHubPlus
```

---

# Frontend Setup

Navigate to the React project:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside `client/`.

```env
VITE_API_URL=https://localhost:4000
VITE_APP_NAME=HustleHub+
```

> Do not put passwords, JWT secrets, MongoDB credentials, or other server-side secrets in the Vite `.env` file. `VITE_` variables are exposed to the browser.

Start the frontend:

```bash
npm run dev
```

The frontend will run on:

```text
https://localhost:5173
```

---

# Backend Setup

From the project root, navigate to the server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create the backend `.env` file in the **project root**, not inside `server/`.

The structure should be:

```text
HustleHubPlus/
├── .env
├── client/
└── server/
```

Example `.env`:

```env
PORT=4000

USE_HTTPS=true

CLIENT_ORIGIN=https://localhost:5173

SSL_KEY_PATH=./server/certs/localhost-key.pem
SSL_CERT_PATH=./server/certs/localhost-cert.pem

MONGO_URI=<your MongoDB Atlas connection string>
MONGO_DB_NAME=HustleHub

JWT_SECRET=<your long random JWT secret>
JWT_EXPIRES_IN=1h

GOOGLE_MAPS_API_KEY=<your Google Maps API key>
OPENWEATHER_API_KEY=<your OpenWeather API key>
```

If Firebase authentication is configured, add the required Firebase configuration values provided by the backend implementation.

Never commit real secrets to Git.

---

# Environment Variables

The repository should contain an `.env.example` file containing placeholders only.

Example:

```env
PORT=4000
USE_HTTPS=true

CLIENT_ORIGIN=https://localhost:5173

SSL_KEY_PATH=./server/certs/localhost-key.pem
SSL_CERT_PATH=./server/certs/localhost-cert.pem

MONGO_URI=
MONGO_DB_NAME=HustleHub

JWT_SECRET=$bytes = New-Object byte[] 64; [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes); [Convert]::ToBase64String($bytes)
JWT_EXPIRES_IN=1h

GOOGLE_MAPS_API_KEY=
OPENWEATHER_API_KEY=
```

The real `.env` file must be included in `.gitignore`:

```text
.env
.env.*
!.env.example
```

---

# Generate Local HTTPS Certificates

Create the certificate folder:

```bash
mkdir certs
cd certs
```

Generate a self-signed certificate using OpenSSL:

```cmd
"C:\Program Files\OpenSSL-Win64\bin\openssl.exe" req -x509 -newkey rsa:2048 -keyout localhost-key.pem -out localhost-cert.pem -days 365 -nodes -subj "/CN=localhost"
```

```Powershell, add (&) in the beginning
& "C:\Program Files\OpenSSL-Win64\bin\openssl.exe" req -x509 -newkey rsa:2048 -keyout localhost-key.pem -out localhost-cert.pem -days 365 -nodes -subj "/CN=localhost"
```

This creates:

```text
localhost-key.pem
localhost-cert.pem
```

Return to the server directory:

```bash
cd ..
```

Start the backend:

```bash
npm run dev
```

The API will run on:

```text
https://localhost:4000
```

---

# Trust the Certificate (Optional)

To remove browser certificate warnings:

1. Double-click `localhost-cert.pem`.
2. Select **Install Certificate**.
3. Choose **Current User** or **Local Machine**.
4. Select **Trusted Root Certification Authorities**.
5. Complete the certificate installation.
6. Restart the browser if necessary.

---

# MongoDB Atlas

HustleHub+ uses MongoDB Atlas.

The main collections are:

```text
users
gigs
bookings
transactions
```

Additional collections such as categories and reviews can be added as the application develops.

The MongoDB connection string is stored in:

```text
MONGO_URI
```

Do not commit the connection string to Git.

---

# Database Migrations

Database changes are managed using `migrate-mongo`.

From the project root:

```bash
npx migrate-mongo status
```

To apply pending migrations:

```bash
npx migrate-mongo up
```

Current migrations create database indexes for:

```text
users
gigs
bookings
transactions
```

Do not manually create these indexes in MongoDB Atlas when an equivalent migration already exists.

---

# Development Seed Data

Development data is created using the seed script.

From the server directory:

```bash
npm run seed
```

The seed script creates development users, gigs, bookings, and transactions.

The development seed currently includes test accounts for:

```text
Client
Freelancer
Freelancer
```

The seed script clears the existing development users, gigs, bookings, and transactions before recreating them.

> Only run the seed script against the development database. Do not run it against a production database.

---

# Authentication and Security

The backend is responsible for authentication and authorization.

The project should use:

* HTTPS
* Helmet security headers
* CORS restricted to the frontend origin
* JWT authentication
* HttpOnly cookies for JWT sessions
* Secure cookies in production
* Appropriate `SameSite` cookie configuration
* bcrypt password hashing
* Firebase token verification for Google/Microsoft authentication
* Rate limiting on authentication endpoints
* Request validation
* Role-based authorization
* MongoDB/ObjectId validation
* Protected API routes

## JWT Security

The JWT should **not** be returned to the React application for storage in:

```text
localStorage
sessionStorage
```

Instead, the API should set the JWT in an HttpOnly cookie.

The browser automatically sends the cookie with appropriate API requests.

The frontend should restore the session through:

```text
GET /api/auth/me
```

Logout should be handled through:

```text
POST /api/auth/logout
```

The frontend must not be responsible for deciding whether a user is authorized to perform an API operation.

---

# Authentication Roles

HustleHub+ supports:

```text
Client
Freelancer
Admin
```

Public registration must only allow:

```text
Client
Freelancer
```

Users must not be able to select `Admin` during public registration.

Admin authorization must be enforced by the backend.

Hiding an admin link in React is not sufficient security.

---

# Firebase Authentication

Google and Microsoft authentication use Firebase authentication.

The expected flow is:

```text
Google/Microsoft
       ↓
Firebase Authentication
       ↓
Firebase identity token
       ↓
HustleHub+ API
       ↓
Verify Firebase token
       ↓
Find/create MongoDB User
       ↓
Create HustleHub+ session
```

When a Google or Microsoft user signs in for the first time, the API should create the corresponding HustleHub+ user in MongoDB.

The API must verify Firebase tokens server-side.

The frontend must never be trusted to provide a Firebase user ID or role as proof of authorization.

---

# API Authorization

The backend must enforce authorization for protected resources.

For example:

```text
Client
 └── Can access their own bookings

Freelancer
 └── Can manage their own gigs
 └── Can access their own bookings
 └── Can access their own transactions

Admin
 └── Can access administrative functionality
```

The API must verify resource ownership.

For example, a freelancer should not be able to modify another freelancer's gig simply by changing the gig ID in the URL.

---

# CORS

CORS should be restricted to the configured frontend origin.

Example:

```text
CLIENT_ORIGIN=https://localhost:5173
```

Avoid allowing unrestricted origins such as:

```text
*
```

when credentials/cookies are being used.

---

# Google Maps

Google Maps is used for gig locations.

Gig locations contain:

```text
address
placeId
latitude
longitude
```

Bookings store a snapshot of the gig location so that changing a gig's location later does not modify historical bookings.

---

# OpenWeather

Weather information can be retrieved using:

```text
booking date
+
latitude
+
longitude
```

Weather forecasts should preferably be retrieved when required rather than permanently storing an entire forecast response.

---

# Running the Application

## Option 1 — Run everything from the project root

```bash
npm run dev
```

This starts the frontend and backend according to the root project's configured scripts.

## Option 2 — Run the backend separately

```bash
cd server
npm run dev
```

## Option 3 — Run the frontend separately

```bash
cd client
npm run dev
```

---

# Development Workflow

1. Pull the latest changes.

2. Install dependencies if required:

```bash
npm install
```

3. Make sure the local `.env` exists.

4. Make sure MongoDB Atlas is configured.

5. Check migrations:

```bash
npx migrate-mongo status
```

6. Apply pending migrations:

```bash
npx migrate-mongo up
```

7. Seed the development database when required:

```bash
cd server
npm run seed
```

8. Start the API:

```bash
npm run dev
```

9. Start the React frontend:

```bash
cd client
npm run dev
```

10. Develop using HTTPS locally.

---

# Important Security Rules

Never commit:

```text
.env
MongoDB credentials
JWT secrets
Firebase private credentials
API secrets
SSL private keys
```

Never store passwords as plaintext.

Never store JWTs in `localStorage`.

Never allow users to self-register as Admin.

Never rely on React to enforce authorization.

Always validate and authorize requests on the API.

Use HTTPS when testing authentication and cookies locally.
