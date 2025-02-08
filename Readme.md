# Project Setup Guide

## How the Project Works

## 1. Database Setup (MySQL)

### Create a Database
Open Command Prompt (CMD) or MySQL Workbench and run:

CREATE DATABASE petpoojadb;

### Import Database (Using CMD)
To import an existing database, run:

mysql -u root -p petpoojadb < petpoojadb.sql

Replace "root" with your MySQL username and "database.sql" with your file name.


### Check Tables
To verify the tables, run:

SHOW TABLES;

The database contains tables like:
- employee (Stores employee details)
- department (Stores department details)

## 2. Backend Setup (Node.js + Express.js)

### Install Dependencies
Navigate to the backend folder and run:

cd backend
npm install

### Run the Backend Server
Start the backend server using:

npm start

If using nodemon for automatic restarts:

npm start

The backend runs at http://localhost:8000

### API Endpoints
- Fetch all employees - GET /viewemployee
- Add a new employee - POST /addemployee
- Update an employee - PUT /editemployee/:id
- Delete an employee - DELETE /deleteemployee/:id
- Fetch highest salary (by department) - GET /highestsalary
- Fetch employee count (by salary range) - GET /salaryrangewise
- Fetch youngest employee details - GET /youngestemployee

## 3. Frontend Setup (React.js)

### Install Dependencies
Navigate to the frontend folder and run:

cd Frontend 
npm install

### Start the React App
To start the frontend, run:

cd view
npm start

The frontend runs at http://localhost:3000

## Project is Now Set Up
The backend is running at http://localhost:8000 and the frontend at http://localhost:3000. You can now use the application.

