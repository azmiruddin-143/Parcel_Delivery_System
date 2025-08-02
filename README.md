🚚 Parcel Delivery System API
🌟 Project Overview
Parcel Delivery System API is a robust and secure backend application designed to handle all operations of a modern courier service. The platform offers a seamless and efficient way for users to register as senders or receivers, create parcel requests, and track their delivery status in real-time. Admins have complete control over user management and delivery status updates, ensuring a streamlined operation.

🚀 Live Project Link
🔗 Live Site https://parcel-delivery-system-nine

🛠️ Technologies Used
Backend: Node.js, Express.js, TypeScript

Database: MongoDB

Database Library: Mongoose

Security: JWT (JSON Web Tokens), bcrypt

Validation: Zod

Deployment: Vercel

✨ Core Features
✅ Role-Based Access Control: Advanced role management with dedicated features for Admins, Senders, and Receivers, ensuring personalized functionality for each role.
✅ Secure Authentication with Token Management: Robust authentication system with JSON Web Tokens (JWT) to enhance security and manage user sessions effectively.
✅ Comprehensive Parcel Management: An organized system for creating, viewing, and managing parcels with real-time status updates.
✅ Real-Time Status Tracking: Every parcel's status change is logged and can be tracked by both senders and receivers for complete transparency.
✅ Parcel Cancellation Logic: Senders can cancel parcels only if they have not yet been dispatched, ensuring business rules are followed.
✅ User & Admin Dashboards: Admin dashboard for managing all users and parcels, including blocking users and updating parcel statuses with ease.
✅ RESTful API Design: A clean and intuitive API design that uses standard REST principles for easy integration and use.

📦 Dependencies Used
{
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "http-status-codes": "^2.3.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.4.4",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/express": "^4.17.21",
    "@types/jsonwebtoken": "^9.0.6",
    "eslint": "^8.57.0",
    "nodemon": "^3.1.4",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.5.3"
  }
}

🛠️ How to Run Locally
Clone the repository:

git clone <your-repo-link>

Navigate to the project folder:

cd parcel-delivery-system

Install dependencies:

npm install

Start the development server:

npm run dev

Your project will run on http://localhost:5000 (or the port specified in your .env file).

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
মেথড

এন্ডপয়েন্ট

অ্যাক্সেস

বডি ডেটা

POST

/auth/register

Public

{"name": "...", "email": "...", "password": "...", "role": "Sender"}

POST

/auth/login

Public

{"email": "...", "password": "..."}

POST

/auth/reset-password

Protected

{"oldPassword": "...", "newPassword": "..."}

POST

/auth/logout

Protected

No Body Required

📦 Parcel Routes
মেথড

এন্ডপয়েন্ট

অ্যাক্সেস

বডি ডেটা

POST

/parcels

Sender

{"receiver": {"name": "...", "phone": "...", "address": "...", "userId": "..."}, "parcelType": "...", "weight": ..., "deliveryAddress": "..."}

GET

/parcels

Admin

No Body Required

GET

/parcels/my

Sender

No Body Required

GET

/parcels/incoming

Receiver

No Body Required

PATCH

/parcels/:id/cancel

Sender

{"status": "...", "location": "...", "note": "..."}

PATCH

/parcels/:id/status

Admin

{"status": "...", "location": "...", "note": "..."}

🧑 User Routes
মেথড

এন্ডপয়েন্ট

অ্যাক্সেস

বডি ডেটা

GET

/users/all-users

Admin

No Body Required

GET

/users/:id

Any Authenticated

No Body Required

PATCH

/users/:id

Any Authenticated

{"name": "...", "phone": "..."}

PATCH

/users/:id/status

Admin

{"status": "Blocked"}

DELETE

/users/:id

Admin

No Body Required

Testing and Demo
All API endpoints for this project have been tested using Postman. A screen-recorded video will be provided to demonstrate all features, showcasing the complete functionality of the project.