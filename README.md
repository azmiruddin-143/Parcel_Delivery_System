# Parcel Delivery System API
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

# 📦 Local Setup
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

# 🔑 ADMIN ACCESS
For testing and administrative purposes, you can log in with the following admin credentials:

Key

Value

Email: azmiruddin05@gmail.com 
Password: Azmir1@

# 🚀 API Documentation
The base URL for our backend API is:
https://parcel-delivery-system-nine.vercel.app/api/v1

# 🔐 Authentication Routes
POST /auth/register: Register a new user (Sender/Receiver).

POST /auth/login: Log in a user.

POST /auth/reset-password: Reset the password of the logged-in user.

POST /auth/logout: Log out a user.

# 📦 Parcel Routes
POST /parcel: Create a new parcel. Access: Sender

GET /parcel/all-parcels: View the list of all parcels. Access: Admin

GET /parcel/my: View all parcels sent by you. Access: Sender

GET /parcel/incoming: View all parcels addressed to you. Access: Receiver

PATCH /parcel/:id/cancel: Cancel a parcel (before delivery starts). Access: Sender

PATCH /parcel/:id/status: Update a parcel's status. Access: Admin

 # 🧑 User Routes
POST /user/register: Register a new user (Sender/Receiver). Access: Public

GET /user/all-users: View the list of all users. Access: Admin

GET /user/:id: Get a single user's details. Access: Any Authenticated

PATCH /user/:id: Update a user's details. Access: Any Authenticated

PATCH /user/:id/status: Change a user's status (Active/Blocked). Access: Admin

DELETE /user/:id: Delete a user. Access: Admin

# Testing and Demo
All API endpoints for this project have been tested using Postman. A screen-recorded video will be provided to demonstrate all features, showcasing the complete functionality of the project.