# Secure Notes & To-Do List REST API Backend 🚀

A production-ready, secure backend API ecosystem built using Node.js, Express, and MongoDB. This project covers comprehensive CRUD functionalities, user onboarding with password encryption, and endpoint path securing using JSON Web Tokens (JWT).

## 📌 Project Milestones Complete

- **Assignment 1: To-Do List REST API**
  - Full CRUD operations for managing tasks.
  - Seamless data persistence using Mongoose and MongoDB.
- **Assignment 2: User Authentication API**
  - Secure user registration and login workflows.
  - Automatic password hashing and encryption via `bcryptjs`.
  - Identity verification using `jsonwebtoken` (JWT).
- **Mini Project: Secure Notes App Backend**
  - Isolated Notes CRUD engine.
  - Middleware security that locks routes so users can only access their own notes.

---

## 🛠️ Tech Stack & Architecture

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database Engine:** MongoDB (Local instance via Mongoose ODM)
- **Security & Utilities:** Bcrypt.js, JSON Web Tokens (JWT), Dotenv, Nodemon

---

## 🚀 Local Installation & Quick Start

Follow these steps to run this project locally on your machine:

### 1. Clone & Set Up Dependencies
```bash
cd notes-backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory and add the following keys:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notesdb
JWT_SECRET=your_super_secret_jwt_key_123
```

### 3. Start the Server
```bash
npm start
```
The console will log:
> `Server running on port 5000`
> `MongoDB Connected Successfully`

---

## 🧪 Postman Endpoint Testing Guide

Import these configurations into Postman to quickly test and verify all running routes:

| Feature Route | HTTP Method | URL Path Target | Headers Required | Sample JSON Body Payload |
| :--- | :--- | :--- | :--- | :--- |
| **Add Task** | `POST` | `http://localhost:5000/api/tasks` | `Content-Type: application/json` | `{"title": "Complete Backend", "description": "Test via Postman"}` |
| **Get Tasks** | `GET` | `http://localhost:5000/api/tasks` | *None* | *Leave Empty* |
| **Register User** | `POST` | `http://localhost:5000/api/users/register` | `Content-Type: application/json` | `{"username": "Angel", "email": "angel@test.com", "password": "securePass123"}` |
| **User Login** | `POST` | `http://localhost:5000/api/users/login` | `Content-Type: application/json` | `{"email": "angel@test.com", "password": "securePass123"}` |
| **Create Note (Protected)** | `POST` | `http://localhost:5000/api/notes` | `Authorization: Bearer <JWT_TOKEN>` | `{"title": "Architecture Notes", "content": "Routes are locked securely."}` |
| **Get Notes (Protected)** | `GET` | `http://localhost:5000/api/notes` | `Authorization: Bearer <JWT_TOKEN>` | *None (Fetches logged-in user's notes only)* |

> 💡 *Note: To test the secure Note routes, copy the `"token"` value received after a successful login response, navigate to the **Authorization** tab in Postman, choose **Bearer Token**, and paste your string into the token input box.*
