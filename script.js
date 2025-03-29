// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}); 

//--------------PROJECTS SECTION--------------

const projectCards =[{
    title: "Project 1",
    description: "Description of your first project goes here.",
    link: "www.youtube.com"

},
{
    title: "Project 2",
    description: "Description of your first project goes here.",
    link: "www.youtube.com"


},
{
    title: "Project 3",
    description: "Description of your first project goes here.",
    link: "www.youtube.com"


}]


// GitHub username
const username = 'ALIEHTISHAM'; // Replace with your GitHub username

// Function to fetch GitHub repositories
async function fetchGitHubProjects() {
    const projectsContainer = document.querySelector('.projects-grid');
    if (!projectsContainer) return;

    // Show loading state
    projectsContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading projects...</div>';

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        const repos = await response.json();

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        // Clear loading state
        projectsContainer.innerHTML = '';

        // Display repositories
        repos.forEach(repo => {
            const card = createProjectCard(repo);
            projectsContainer.appendChild(card);
        });
    } catch (error) {
        projectsContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                Failed to load projects. Please try again later.
            </div>
        `;
        console.error('Error fetching GitHub projects:', error);
    }
}

// Function to create a project card
function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const technologies = repo.language ? `Technologies: ${repo.language}` : 'No technologies specified';

    card.innerHTML = `
        <h3>${repo.name}</h3>
        <p class="project-description">${repo.description || 'No description available'}</p>
        <p class="project-tech">${technologies}</p>
        <div class="project-stats">
            <span><i class="far fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
        <div class="project-links">
            <a href="${repo.html_url}" target="_blank" class="project-link">
                <i class="fab fa-github"></i> View Code
            </a>
            ${repo.homepage ? `
                <a href="${repo.homepage}" target="_blank" class="project-link">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
            ` : ''}
        </div>
    `;

    return card;
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', fetchGitHubProjects); 
