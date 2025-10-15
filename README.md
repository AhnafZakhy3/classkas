# ClassKas - Class Finance and Reminder System

A full-stack MVP web app for managing class funds and reminders, built with React, Node.js, Express, MySQL, and more.

## Features

- User authentication (JWT) with roles (Treasurer/Student)
- Transaction management (Income/Expense)
- Reminder system for tasks and payments
- Dashboard with charts and summaries
- Reports with PDF export
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React + Tailwind CSS + Axios + Chart.js + jsPDF
- **Backend:** Node.js + Express.js + Sequelize ORM
- **Database:** MySQL (local)
- **Auth:** JWT + bcrypt

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- MySQL (local installation)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Set up MySQL Database

Create a local MySQL database named `classkas`:

```sql
CREATE DATABASE classkas;
```

Update `.env` file with your MySQL credentials if different.

### 3. Run the Application

```bash
# Start backend server (from /server)
npm start

# Start frontend (from /client in another terminal)
npm start
```

The app will run on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 4. Initialize Database

The Sequelize models will auto-create tables on first run via `sequelize.sync()`.

## Project Structure

```
/classkas
├── /client → React frontend
├── /server → Express backend
│   ├── models/ → Sequelize models
│   ├── routes/ → API routes
│   ├── controllers/
│   ├── config/
│   └── middleware/
├── .env
├── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Reminders
- `GET /api/reminders` - Get all reminders
- `POST /api/reminders` - Create reminder
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Admin (Administrator only)
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/roles` - Get available roles

## Usage

1. **Create Admin Account:**
   ```sql
   INSERT INTO users (name, email, password, role, createdAt, updatedAt)
   VALUES ('Admin', 'admin@classkas.com', 'admin123', 'administrator', NOW(), NOW());
   ```
   *Note: Password disimpan sebagai plain text untuk kemudahan admin melihatnya*

2. Login as Administrator to create other users
3. Login to access the dashboard
4. Add transactions and reminders
5. View reports and export to PDF

## User Roles

- **Administrator:** Full access to user management, can create/edit/delete users
- **Treasurer:** Can manage transactions and reminders
- **Student:** Read-only access to dashboard and reports
