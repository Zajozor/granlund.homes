# granlund.homes
A FlyHighDiveDeep submission for Junction 2024 for the Granlund challenge.
We hope you loved the hackathon, as much as we did.

Live deployed version over at [granlund.homes](https://granlund.homes).

```markdown
# 🌐 Full Stack App with React, Node.js, Prisma, and PostgreSQL

Welcome to the **Full Stack App** project! This repository is structured into two main parts: a React frontend (fe) and a Node.js backend (be) with Docker and Prisma for PostgreSQL. Below, you'll find the setup, running instructions, and other helpful details to get you started.

## 🗂 Project Structure

```plaintext
.
├── fe/               # Frontend (React, Vite)
└── be/               # Backend (Node.js, Docker, Prisma, PostgreSQL)
```

---

## 🚀 Quick Start

#### Frontend (fe)
- **Directory**: `./fe`
- **Framework**: React (Vite)
  
##### Commands:
1. Install dependencies
    ```bash
    cd fe
    npm install
    ```
2. Run the app
    ```bash
    npm start
    ```
3. Access the frontend at `http://localhost:5371`

#### Backend (be)
- **Directory**: `./be`
- **Framework**: Node.js with Docker & Prisma for PostgreSQL
  
##### Commands:
1. Install dependencies
    ```bash
    cd be
    npm install
    ```
3. **Start PostgreSQL Database** via Docker
    ```bash
    docker-compose up -d
    ```
4. Initialize the Prisma database
    ```bash
    npm run init
    ```
5. Run the backend server
    ```bash
    npm start
    ```
6. Access the backend at `http://localhost:4001`

---

## 🛠 Technologies Used

- **Frontend**:
  - React (Vite)
  - Leaflet (maps)
- **Backend**:
  - Node.js
  - Express
  - Docker
  - Prisma ORM
  - PostgreSQL

## 📂 Directory Structure Details

```plaintext
fullstack-app/
├── fe/                # Frontend
│   ├── src/           # React source files
│   ├── public/        # Static assets
│   ├── index.html     # Main HTML file
│   └── vite.config.js # Vite config
│
└── be/                              # Backend
    ├── src/                         # Node.js source files
    ├── prisma/                      # Prisma schema and migrations
    ├── database/docker-compose.yml  # Docker setup for PostgreSQL
    └── .env.example                 # Environment variables example
```

---

## 🐳 Docker Setup for PostgreSQL

The Docker setup is defined in the `docker-compose.yml` file within the `be` directory. To start up the PostgreSQL instance:

```bash
cd be/database
docker-compose up -d
```

---

## 💻 Available Scripts

### Frontend (fe)

- **`yarn start`**: Starts the frontend on `localhost:5371`.

### Backend (be)

- **`yarn init`**: Runs Prisma database migrations and sets up the database.
- **`yarn start`**: Starts the backend server on `localhost:4001`.


---

## 📜 License

This project is public, according to the Junction 2024 participation conditions.

