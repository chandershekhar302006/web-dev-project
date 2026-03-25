# Portfolio Website with Database

This is a full-stack portfolio website built with Node.js/Express backend and PostgreSQL database.

## Features

- ✓ Responsive portfolio website
- ✓ Project management with database
- ✓ Skills stored in database
- ✓ Contact form submissions saved to database
- ✓ RESTful API endpoints

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Server Port**: 5000

## Prerequisites

Before you begin, make sure you have installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/

2. **PostgreSQL** (v12 or higher)
   - Download from: https://www.postgresql.org/download/

## Setup Instructions

### 1. Install Node Packages

Open terminal/PowerShell in the project folder and run:

```bash
npm install
```

### 2. Configure Database Connection

1. Open `.env.example` and copy it:
```bash
cp .env.example .env
```

2. Edit `.env` and update with your PostgreSQL credentials:
```
DB_USER=postgres
DB_PASSWORD=your_postgresql_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=portfolio_db
```

### 3. Initialize Database

After configuring your database credentials, run:

```bash
npm run init-db
```

This will:
- Create the `portfolio_db` database
- Create tables for projects, skills, and contacts
- Insert sample data

## Running the Website

### Start the Server

```bash
npm start
```

The server will run on `http://localhost:5000`

### For Development (with auto-reload)

```bash
npm run dev
```

## API Endpoints

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project

### Skills

- `GET /api/skills` - Get all skills

### Contact Form

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contact submissions (admin)

## Example API Calls

### Submit Contact Form
```javascript
fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello!'
    })
})
```

### Get All Projects
```javascript
fetch('http://localhost:5000/api/projects')
    .then(res => res.json())
    .then(projects => console.log(projects))
```

## Database Schema

### Projects Table
```sql
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    tags JSON,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

### Skills Table
```sql
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    category VARCHAR(100),
    proficiency INT,
    created_at TIMESTAMP
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    message TEXT,
    read BOOLEAN,
    created_at TIMESTAMP
);
```

## Accessing Your Site

1. **Local**: Open `http://localhost:5000` in your browser
2. **Static Files**: The server serves HTML/CSS/JS files from the project folder

## Managing Your Portfolio

### Add a New Project

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","description":"Description here","tags":["HTML","CSS"]}'
```

### View Contact Submissions

```bash
curl http://localhost:5000/api/contacts
```

## Troubleshooting

**"Database connection error"**
- Check your PostgreSQL is running
- Verify credentials in `.env` file
- Make sure PostgreSQL service is active

**"Cannot find module 'pg'"**
- Run `npm install` to install dependencies

**"Port 5000 is already in use"**
- Change the PORT in `.env` or kill the process using port 5000

**"CORS error"**
- The server has CORS enabled for development
- If issues persist, check your API_URL in the browser console

## Next Steps

1. Customize your portfolio data in the database
2. Add more projects via API calls
3. Update contact form styling if needed
4. Deploy to a web host (Heroku, Render, DigitalOcean, etc.)

## Deployment

To deploy this to a production server:

1. Host on a platform like Heroku, Render, or DigitalOcean
2. Set environment variables on the hosting platform
3. Use a PostgreSQL database service (Heroku Postgres, AWS RDS, etc.)
4. Update API_URL in script.js if needed

---

**Need help?** Check your console (F12) for error messages when things don't work!
