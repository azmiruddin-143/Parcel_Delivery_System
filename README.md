📦 Parcel Delivery System API

🌟 Project Overview

This project is a robust, secure, and modular backend API built with Express.js and TypeScript. It supports a parcel delivery system with role-based access for Senders, Receivers, and Admins.

🛠️ Technology Stack

{
  "Runtime": "Node.js",
  "Framework": "Express.js",
  "Language": "TypeScript",
  "Database": "MongoDB",
  "Database Library": "Mongoose",
  "Security": ["JWT", "bcrypt"],
  "Validation": "Zod"
}

📦 Local Setup

1. Clone the Repository

git clone <your-repo-link>
cd parcel-delivery-system

2. Install Dependencies

npm install

3. Create .env File

PORT=5000
DATABASE_URL=mongodb://localhost:27017/parcel_db
JWT_SECRET=YOUR_VERY_SECRET_KEY
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

4. Start the Server

npm run dev

The server will run at: http://localhost:5000

🔑 Admin Access (for Testing)

{
  "email": "azmiruddin05@gmail.com",
  "password": "Azmir1@"
}

🚀 API Base URL

https://parcel-delivery-system-nine.vercel.app/api/v1

🔐 Authentication Routes

Register

POST /auth/register

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password@123",
  "role": "Sender"
}

Login

POST /auth/login

{
  "email": "john.doe@example.com",
  "password": "Password@123"
}

Reset Password

POST /auth/reset-password

{
  "oldPassword": "Password@123",
  "newPassword": "NewPassword@123"
}

Logout

POST /auth/logout (No body required)

📦 Parcel Routes

Create Parcel (Sender)

POST /parcels

{
  "receiver": {
    "name": "Jane Smith",
    "phone": "01911223344",
    "address": "123 Test Street, Dhaka",
    "userId": "60c72b2f9c1d44001c8c8c8c"
  },
  "parcelType": "Electronics",
  "weight": 1.5,
  "deliveryAddress": "123 Test Street, Dhaka"
}

All Parcels (Admin)

GET /parcels

My Parcels (Sender)

GET /parcels/my

Incoming Parcels (Receiver)

GET /parcels/incoming

Cancel Parcel (Sender)

PATCH /parcels/:id/cancel (No body required)

Update Parcel Status (Admin)

PATCH /parcels/:id/status

{
  "status": "Approved",
  "location": "Dhaka Hub",
  "note": "Parcel has been approved for delivery."
}

👤 User Routes

Register (Public)

POST /users/register

{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Password@123",
  "role": "Sender"
}

All Users (Admin)

GET /users/all-users

Single User (Authenticated)

GET /users/:id

Update User (Authenticated)

PATCH /users/:id

{
  "name": "Updated Name",
  "phone": "01655667788"
}

Change User Status (Admin)

PATCH /users/:id/status

{
  "status": "Blocked"
}

Delete User (Admin)

DELETE /users/:id

✅ Testing & Demo

All endpoints have been tested with Postman. A demo video showcasing all features is available.

🔒 Secure, 🚀 Fast, and ⚙️ Modular — this Parcel Delivery API is built for real-world production use.

