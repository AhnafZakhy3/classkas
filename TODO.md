# ClassKas MVP Development TODO

## Backend Setup
- [x] Create /server/package.json
- [x] Create /server/server.js
- [x] Create /server/config/database.js
- [x] Create /server/models/User.js
- [x] Create /server/models/Transaction.js
- [x] Create /server/models/Reminder.js
- [x] Create /server/models/index.js
- [x] Create /server/middleware/auth.js
- [x] Create /server/controllers/authController.js
- [x] Create /server/controllers/transactionController.js
- [x] Create /server/controllers/reminderController.js
- [x] Create /server/routes/auth.js
- [x] Create /server/routes/transactions.js
- [x] Create /server/routes/reminders.js
- [x] Create /server/middleware/errorHandler.js

## Frontend Setup
- [x] Create /client/package.json
- [x] Create /client/public/index.html
- [x] Create /client/src/index.js
- [x] Create /client/src/App.js
- [x] Create /client/src/components/Navbar.js
- [x] Create /client/src/components/Sidebar.js
- [x] Create /client/src/components/Card.js
- [x] Create /client/src/components/Table.js
- [x] Create /client/src/components/Modal.js
- [x] Create /client/src/components/Button.js
- [x] Create /client/src/components/Input.js
- [x] Create /client/src/pages/Login.js
- [x] Create /client/src/pages/Register.js
- [x] Create /client/src/pages/Dashboard.js
- [x] Create /client/src/pages/Transactions.js
- [x] Create /client/src/pages/Reminders.js
- [x] Create /client/src/pages/Reports.js
- [x] Create /client/src/context/AuthContext.js
- [x] Create /client/src/utils/api.js
- [x] Create /client/src/index.css (Tailwind)

## Root Files
- [x] Create .env
- [x] Create README.md

## Role-Based Permissions Implementation
- [x] Update server routes to require treasurer role for CRUD operations on transactions and reminders
- [x] Update frontend components to hide edit/delete/add buttons for students
- [x] Ensure all users can view transactions and reminders

## Followup Steps
- [x] Install backend dependencies (npm install in /server)
- [x] Install frontend dependencies (npm install in /client)
- [ ] Set up MySQL database (create classkas_db)
- [ ] Run sequelize sync to create tables
- [ ] Start backend server (npm start in /server)
- [ ] Start frontend (npm start in /client)
- [ ] Test the app
