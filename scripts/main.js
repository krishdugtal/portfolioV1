const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section.card');

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        sections.forEach(s => s.classList.remove('active'));
        target.classList.add('active');
        window.scrollTo({top: 0, behavior: 'smooth'});
    });
});