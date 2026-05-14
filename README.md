# FoodieExpress - Full Stack Food Delivery Application

A complete MERN (MongoDB, Express, React, Node.js) food delivery application featuring user authentication, restaurant browsing, and a fully functional shopping cart.

## Features
-   User Registration and Login with JWT authentication
-   Browse various restaurants with dynamic data fetching
-   Detailed menu view for each restaurant
-   Add items to shopping cart and manage quantities
-   Responsive UI built with React and Tailwind CSS
-   Realistic images sourced from Unsplash

## Prerequisites
-   Node.js (v16.x or higher)
-   npm or yarn
-   MongoDB Atlas account or local MongoDB instance

## Installation & Setup

### 1. Clone the repository and navigate to the project folder

### 2. Backend Setup
1.  Navigate to the backend directory:
    `cd backend`
2.  Install dependencies:
    `npm install`
3.  Create a `.env` file based on `.env.example`:
    -   Update `MONGO_URI` with your connection string.
    -   Set a `JWT_SECRET` of your choice.
4.  Seed the database with initial restaurant data:
    `npm run seed`
5.  Start the backend server:
    `npm run dev`

The backend will be running at `http://localhost:5000`.

### 3. Frontend Setup
1.  Open a new terminal and navigate to the frontend directory:
    `cd frontend`
2.  Install dependencies:
    `npm install`
3.  Start the development server:
    `npm run dev`

The application will be live at `http://localhost:5173`.

## Usage
1.  Open `http://localhost:5173` in your browser.
2.  You should see the home page with featured restaurants.
3.  Register a new account or log in with test credentials.
4.  Click on any restaurant to see its menu.
5.  Add items to your cart and proceed to the cart page to view the total.

## Project Structure
-   `/backend`: Node/Express server, MongoDB models, routes, and seeding scripts.
-   `/frontend`: React application with Tailwind CSS, context for auth and cart, and modern UI components.

## Troubleshooting
-   **Restaurants not showing?** Make sure you ran `npm run seed` in the backend folder and that your MongoDB connection is successful.
-   **Auth errors?** Ensure the `JWT_SECRET` is defined in your `.env` file.
-   **Network errors?** Verify both servers (backend on 5000 and frontend on 5173) are running simultaneously.
