// API Base URL
const API_URL = process.env.API_URL || 'http://localhost:5000/api';

// Contact form handling with database submission
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    const submitBtn = this.querySelector('.submit-btn');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }
    
    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        // Submit to database via API
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(`Thank you, ${name}! I've received your message and will get back to you soon.`);
            this.reset();
        } else {
            alert(data.error || 'Error submitting form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Network error. Make sure the server is running on http://localhost:5000');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Load projects from database
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const projects = await response.json();
        
        const projectsGrid = document.querySelector('.projects-grid');
        projectsGrid.innerHTML = '';
        
        projects.forEach(project => {
            const tags = Array.isArray(project.tags) ? project.tags : JSON.parse(project.tags);
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <div class="project-header">Project ${project.id}</div>
                <div class="project-body">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            projectsGrid.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Error loading projects:', error);
        console.log('Make sure your server is running: npm start');
    }
}

// Load skills from database
async function loadSkills() {
    try {
        const response = await fetch(`${API_URL}/skills`);
        const skills = await response.json();
        
        const skillsList = document.querySelector('.skills-list');
        if (skillsList) {
            skillsList.innerHTML = '';
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.name;
                skillsList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Load projects and skills when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProjects();
    loadSkills();
});

// Smooth scroll navigation (browser handles this with scroll-behavior: smooth)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation links on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        opacity: 0.6;
        border-bottom: 2px solid white;
    }
`;
document.head.appendChild(style);
