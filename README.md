Parcel Delivery System API
🌟 Project Overview
This project is a robust, secure, and modular backend API built with Express.js and TypeScript. It is designed for a parcel delivery system where users can perform various tasks as Senders, Receivers, and Admins.

🛠️ Technology Stack
The application is built using the following technologies:

Runtime: Node.js

Framework: Express.js

Language: TypeScript

Database: MongoDB

Database Library: Mongoose

Security: JWT (JSON Web Tokens), bcrypt

Validation: Zod

📦 Local Setup
Follow these steps to set up the project on your local machine:

Clone the Repository:

git clone <your-repo-link>
cd parcel-delivery-system

Install Dependencies:

npm install

Create an Environment File:
Create a .env file in the project root and set the necessary variables.

PORT=5000
DATABASE_URL=mongodb://localhost:27017/parcel_db
JWT_SECRET=YOUR_VERY_SECRET_KEY
JWT_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

Start the Server:

npm run dev

Your server will run on http://localhost:5000.

🔑 ADMIN ACCESS
For testing and administrative purposes, you can log in with the following admin credentials:

Key

Value

Email

azmiruddin05@gmail.com

Password

Azmir1@

🚀 API Documentation
The base URL for our backend API is:
https://parcel-delivery-system-nine.vercel.app/api/v1

🔐 Authentication Routes
POST /auth/register: Register a new user (Sender/Receiver).

Body:

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password@123",
  "role": "Sender"
}

POST /auth/login: Log in a user.

Body:

{
  "email": "john.doe@example.com",
  "password": "Password@123"
}

POST /auth/reset-password: Reset the password of the logged-in user.

Body:

{
  "oldPassword": "Password@123",
  "newPassword": "NewPassword@123"
}

POST /auth/logout: Log out a user.

This endpoint does not require a request body.

📦 Parcel Routes
POST /parcels: Create a new parcel. Access: Sender

Body:

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

GET /parcels: View the list of all parcels. Access: Admin

GET /parcels/my: View all parcels sent by you. Access: Sender

GET /parcels/incoming: View all parcels addressed to you. Access: Receiver

PATCH /parcels/:id/cancel: Cancel a parcel (before delivery starts). Access: Sender

This endpoint does not require a request body.

PATCH /parcels/:id/status: Update a parcel's status. Access: Admin

Body:

{
  "status": "Approved",
  "location": "Dhaka Hub",
  "note": "Parcel has been approved for delivery."
}

🧑 User Routes
POST /users/register: Register a new user (Sender/Receiver). Access: Public

Body:

{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Password@123",
  "role": "Sender"
}

GET /users/all-users: View the list of all users. Access: Admin

GET /users/:id: Get a single user's details. Access: Any Authenticated

PATCH /users/:id: Update a user's details. Access: Any Authenticated

Body:

{
  "name": "Updated Name",
  "email": "User email must requred"
}

PATCH /users/:id/status: Change a user's status (Active/Blocked). Access: Admin

Body:

{
  "status": "Blocked"
}

DELETE /users/:id: Delete a user. Access: Admin

✅ Testing and Demo
All API endpoints for this project have been tested using Postman. A screen-recorded video will be provided to demonstrate all features, showcasing the complete functionality of the project.