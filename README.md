# 🛒 Smart Shop - MERN Stack E-Commerce Web Application with Session & Cookie Authentication

I developed a full-stack e-commerce web application using the MERN stack. The application uses session-based authentication with cookies for secure login and role-based authorization for Admin and User accounts. Users can browse products, view product details, add items to their cart, and save products to favorites. Admins can manage products and users through a dedicated dashboard with complete CRUD functionality. Product images are uploaded using Multer and stored on the server.

---

## Table of Content
- About Project
- Features
- Tech Stack
- Project Structure
- Screenshots
- Installation
- Usage
- Security
- Future Improvement

---

## 🏠 About Project

The **Smert Shop** is a **MERN E-Commerce Web Application is a full-stack** online shopping platform.The application provides a secure shopping experience through session and cookie-based authentication and implements role-based access control for both Admin and User accounts.

- User Registration and Login
- Session & Cookie Authentication
- Protected Routes
- Role-Based Authorization
- Secure Logout

---

## Features

### User Features

- Register and Login
- Session & Cookie Authentication
- Home Page
- Product Listing
- Product Details
- Add to Cart
- Add to Favorites
- Remove from Cart
- Remove from Favorites
- Logout

**Each user has:**
- Their own shopping cart
- Their own favorites
- Their own authenticated session

### Admin Features
- Admin Login
- Dashboard
- Add Product
- Edit Product
- Delete Product
- Upload Product Image using Multer
- Manage Users
- Change User Role
- Delete Users
- View Total Users
- View Total Products

---

## ⚙️ Tech Stack
 
### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Context API
- React Toastify
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication
- Express Session
- Cookie Parser
- HTTP Cookies
- Role-Based Authorization

### File Upload
- Multer

---

## Project Structure

### Backend
- config/ – Database connection (db.js).
- controllers/ – Contains business logic for authentication, products, carts, favorites, users, and - admin features.
- middleware/ – Authentication, role checking, and file upload middleware.
- models/ – Mongoose schemas for MongoDB collections.
- routes/ – Defines REST API endpoints.
- uploads/ – Stores product images uploaded with Multer.
- app.js – Configures Express, middleware, routes, sessions, cookies, and static files.
- server.js – Starts the server and connects to MongoDB.

### Frontend
- api/ – Axios configuration for API requests.
- components/ – Reusable UI components.
- context/ – Global authentication state using React Context.
- pages/ – Individual application pages.
- App.jsx – Defines routing and layout.
- main.jsx – Entry point for the React application.

### Architecture Pattern

**backend follows the MVC (Model–View–Controller) pattern:**
- Model → MongoDB schemas (models/)
- View → React frontend (frontend/src)
- Controller → Business logic (controllers/)
- Routes → Maps HTTP requests to controllers (routes/)
- Database Collections

**MongoDB database contains these collections:**
- users
- products
- carts
- favorites

