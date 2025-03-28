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


let cardElement='';

projectCards.forEach((cardData)=>{
    cardElement+= `
                <div class="project-card">
                    <h3>${cardData.title}</h3>
                    <p>${cardData.description}</p>
                    <div class="project-links">
                        <a href="${cardData.link}" class="project-link">View Project</a>
                    </div>
                </div>
    
    `
});
console.log(cardElement);

document.querySelector('.project-grid').innerHTML=cardElement;

