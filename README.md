# 📝 To-Do List App

A simple full-stack task management app using React, TypeScript, Express, Prisma, and PostgreSQL.

## 🔧 Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js + Express + Prisma
- **Database:** PostgreSQL

## 📦 Features

- Add, edit, delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status
- Responsive UI

## 🚀 Getting Started

### 1. Clone the Repository

git clone https://github.com/your-username/todo-list.git
cd todo-list

### 2. Set Up Backend

cd server
npm install

## Create a .env file and add your PostgreSQL database URL:

DATABASE_URL="postgresql://user:password@localhost:5432/tododb"

## Run migrations:

npx prisma generate
npx prisma migrate dev --name init
npm run dev

### et Up Frontend

cd ../client
npm install
npm run dev


### Notes

Make sure PostgreSQL is running and the database is created.
You can edit .env to match your local database credentials.