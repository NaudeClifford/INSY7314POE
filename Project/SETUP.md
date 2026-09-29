# HustleHub+ Development Setup

This guide explains how to set up the HustleHub+ project for local development using React (Vite), Express, MongoDB Atlas, and HTTPS with OpenSSL.

## Prerequisites

Install the following before starting:

- Node.js (LTS)
- Git
- OpenSSL (Windows)
- Visual Studio Code or Visual Studio 2022

---

## Project Structure

```text
HustleHubPlus/
│
├── client/     # React (Vite)
├── api/        # Express API
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

## Frontend Setup

Navigate to the React project.

```bash
cd client
npm install
```

Create a `.env` file inside `client/`.

```env
VITE_API_URL=https://localhost:4000
VITE_APP_NAME=HustleHub+
```

Start the frontend.

```bash
npm run dev
```

The frontend will run on:

```
https://localhost:5173
```

---

## Backend Setup

Navigate to the API.

```bash
cd api
npm install
```

Create an `.env` file.

```env
PORT=4000
USE_HTTPS=true

CLIENT_ORIGIN=https://localhost:5173

SSL_KEY_PATH=./certs/localhost-key.pem
SSL_CERT_PATH=./certs/localhost-cert.pem

MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<your JWT secret>
```

---

## Generate Local HTTPS Certificates

Create the certificate folder.

```bash
mkdir certs
cd certs
```

Generate a self-signed certificate using OpenSSL.

```cmd
"C:\Program Files\OpenSSL-Win64\bin\openssl.exe" req -x509 -newkey rsa:2048 -keyout localhost-key.pem -out localhost-cert.pem -days 365 -nodes -subj "/CN=localhost"
```

This creates:

```
localhost-key.pem
localhost-cert.pem
```

Return to the API folder.

```bash
cd ..
```

Start the backend.

```bash
npm run dev
```

The API will run on:

```
https://localhost:4000
```

---

## Trust the Certificate (Optional)

To remove browser warnings:

1. Double-click `localhost-cert.pem`.
2. Install Certificate.
3. Choose **Current User** or **Local Machine**.
4. Place it in **Trusted Root Certification Authorities**.
5. Finish.

---

## Security Configuration

The project uses:

- HTTPS (OpenSSL)
- Helmet security headers
- CORS restricted to the frontend origin
- JWT authentication
- HttpOnly Secure cookies
- bcrypt password hashing
- MongoDB Atlas
- Rate limiting on authentication endpoints

---

## Database

MongoDB Atlas will be used.

Collections include:

- users
- gigs
- bookings
- transactions
- categories
- reviews

Database changes should be managed through migrations, and development data should be added through seed scripts rather than hardcoded application data.

---

## Development Workflow

1. Pull the latest changes.
2. Run `npm install` if dependencies changed.
3. Start the API (`npm run dev`).
4. Start the React frontend (`npm run dev`).
5. Develop using HTTPS locally.