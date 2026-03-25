# Quick Start Guide

## 5-Minute Setup (Windows)

### Step 1: Install PostgreSQL
1. Download from:
2. Run installer and remember your password!
3. Keep default settings (port 5432)

### Step 2: Install Node.js
1. Download from: https://nodejs.org/
2. Run installer and follow prompts
3. Verify installation in PowerShell:
```
node --version
npm --version
```

### Step 3: Setup Your Database
1. Open PowerShell in your project folder
2. Create `.env` file from `.env.example`:
```
Copy-Item .env.example .env
```

3. Edit `.env` with your PostgreSQL password (use Notepad):
```
DB_PASSWORD=your_password_here
```

### Step 4: Install Dependencies
```
npm install
```

### Step 5: Initialize Database
```
npm run init-db
```

### Step 6: Start Server
```
npm start
```

### Step 7: Open In Browser
Go to: **t
git branch -M main
git push -u origin main:5000**

---

## That's It! 🎉

Your portfolio website with database is now running!

- Fill out the contact form → saves to database
- Projects load from database
- Skills display from database

## Next: Add Your Own Content

**Update sample projects:**
```
npm install -g curl
```

Or use a tool like Postman to send requests to:
- http://localhost:5000/api/projects
- http://localhost:5000/api/skills

**View contact submissions:**
http://localhost:5000/api/contacts

---

## Common Issues?

**Error: "Cannot find module"**
```
npm install
```

**Error: "Connection refused"**
- Check PostgreSQL is running (search "Services" on Windows)
- Check password in .env

**Port 5000 already in use**
- Change `PORT=5000` to `PORT=3000` in .env

---

See `DATABASE_SETUP.md` for detailed documentation!
