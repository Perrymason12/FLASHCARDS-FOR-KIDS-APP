# Flashcards Learning App

A web-based application for children to learn different concepts using
flashcards.\
Built with **HTML, CSS, JavaScript (frontend)**, **Node.js + Express
(backend)**, and **MySQL (database)**.\
Includes **login and signup** with JWT authentication.

------------------------------------------------------------------------

## 🚀 Features

-   User signup & login (JWT-based authentication, bcrypt password
    hashing)
-   Create, read, update, delete flashcards
-   Each flashcard has a **front (question)** and **back (answer)**
-   User-specific flashcards (each user only sees their own)
-   Clean, responsive UI for kids
-   Secure database access (via environment variables)

------------------------------------------------------------------------

## 🛠 Tech Stack

-   **Frontend**: HTML, CSS, JavaScript\
-   **Backend**: Node.js, Express\
-   **Database**: MySQL\
-   **Authentication**: JWT, bcrypt

------------------------------------------------------------------------

## 📂 Project Structure

    flashcards-learning-app/
    │── public/          # Frontend files (HTML, CSS, JS)
    │── routes/          # Express routes (auth, flashcards)
    │── models/          # Database queries
    │── server.js        # Main server file
    │── db.sql           # Database schema
    │── .env.example     # Example environment variables
    │── package.json     # Dependencies
    │── README.md        # Project documentation

------------------------------------------------------------------------

## ⚙️ Setup Instructions

### 1. Clone & Install

``` bash
git clone <your-repo-url>
cd flashcards-learning-app
npm install
```

### 2. Configure Database

Run the SQL schema:

``` bash
mysql -u root -p < db.sql
```

### 3. Configure Environment

Copy `.env.example` to `.env`:

``` bash
cp .env.example .env
```

Edit `.env` with your MySQL username/password and a strong JWT secret:

    DB_HOST=localhost
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=flashcards_db
    JWT_SECRET=your-secret-key

### 4. Run the App

``` bash
npm run dev
```

Visit: <http://localhost:4000>

------------------------------------------------------------------------

## 🔑 API Endpoints

### Auth

-   `POST /api/auth/signup` → create account\
-   `POST /api/auth/login` → login & receive token

### Flashcards (protected)

-   `GET /api/flashcards` → list flashcards\
-   `POST /api/flashcards` → create a new flashcard\
-   `PUT /api/flashcards/:id` → update flashcard\
-   `DELETE /api/flashcards/:id` → delete flashcard

------------------------------------------------------------------------

## 📌 Original Prompts from User

> Imagine you're a software developer in the Ministry of Education, and
> the minister requests that you create a web-based application using
> HTML, CSS, JavaScript for the frontend, Node.js for the backend, and
> MySQL for the database. This application is an app to help children
> learn different concepts using flash cards. Include login and signup

> could you create for me a read.me file for me about the app you have
> just created for me and include the promts i wrote in the file

------------------------------------------------------------------------

## 👨‍💻 Author

Developed with ❤️ for learning and exploration.
