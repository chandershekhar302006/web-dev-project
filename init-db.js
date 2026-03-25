const { Pool } = require('pg');

// Configuration - Update these with your database credentials
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'Roshan@4321',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres' // Connect to default database first
});

const initDatabase = async () => {
    try {
        // Create database if it doesn't exist
        await pool.query('CREATE DATABASE portfolio_db;');
        console.log('✓ Database created successfully');
        await pool.end();
        
        // Connect to new database
        const newPool = new Pool({
            user: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'Roshan@4321',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 5432,
            database: 'portfolio_db'
        });

        // Create projects table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                tags JSON,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ Projects table created');

        // Create skills table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS skills (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                category VARCHAR(100),
                proficiency INT DEFAULT 80,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ Skills table created');

        // Create contacts table
        await newPool.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('✓ Contacts table created');

        // Insert sample projects
        await newPool.query(`
            INSERT INTO projects (title, description, tags) VALUES
            ('Responsive Website', 'A modern, responsive website built with HTML5 and CSS3. Features smooth animations and mobile optimization.', '["HTML", "CSS", "JavaScript"]'),
            ('Interactive Web App', 'A dynamic web application with real-time interactions and data processing capabilities.', '["JavaScript", "API", "Responsive"]'),
            ('E-Commerce Platform', 'Full-featured e-commerce website with product catalog, shopping cart, and checkout system.', '["HTML", "CSS", "JavaScript"]')
            ON CONFLICT DO NOTHING;
        `);
        console.log('✓ Sample projects inserted');

        // Insert sample skills
        await newPool.query(`
            INSERT INTO skills (name, category, proficiency) VALUES
            ('HTML5', 'Frontend', 95),
            ('CSS3', 'Frontend', 95),
            ('JavaScript', 'Frontend', 90),
            ('Responsive Design', 'Frontend', 90),
            ('UI/UX Design', 'Design', 85)
            ON CONFLICT DO NOTHING;
        `);
        console.log('✓ Sample skills inserted');

        console.log('\n✓ Database initialized successfully!');
        await newPool.end();
    } catch (err) {
        if (err.message.includes('already exists')) {
            console.log('✓ Database already exists, setting up tables...');
            
            const newPool = new Pool({
                user: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || 'Roshan@4321',
                host: process.env.DB_HOST || 'localhost',
                port: process.env.DB_PORT || 5432,
                database: 'portfolio_db'
            });

            // Create tables if they don't exist
            await newPool.query(`
                CREATE TABLE IF NOT EXISTS projects (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    description TEXT NOT NULL,
                    tags JSON,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            await newPool.query(`
                CREATE TABLE IF NOT EXISTS skills (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL UNIQUE,
                    category VARCHAR(100),
                    proficiency INT DEFAULT 80,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            await newPool.query(`
                CREATE TABLE IF NOT EXISTS contacts (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    message TEXT NOT NULL,
                    read BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `);

            console.log('✓ Tables are ready');
            await newPool.end();
        } else {
            console.error('Error initializing database:', err.message);
        }
    }
};

initDatabase();
