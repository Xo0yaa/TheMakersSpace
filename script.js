document.addEventListener('DOMContentLoaded', () => {
    
    function highlightActiveNav() {
        const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
        
        const navLinks = document.querySelectorAll('nav ul li a');

        navLinks.forEach(link => {
            const linkPath = link.href.split('/').pop().toLowerCase();
            
            if (linkPath === currentPath) {
                link.classList.add('active-nav');
            } else if (currentPath === 'index.html' && linkPath === '') {
                 link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    highlightActiveNav();

    function setupFormHandler(formSelector, successMessage) {
        const form = document.querySelector(formSelector);
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                const originalButtonText = submitButton.textContent;
                
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                setTimeout(() => {
                    alert(successMessage);
                    
                    form.reset();
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 1500);
            });
        }
    }

    setupFormHandler('.registration-form', '🎉 Registration successful! Welcome aboard!');
    setupFormHandler('.contact-form', '✅ Message sent! We\'ll be in touch soon.');
    setupFormHandler('.review-form', '⭐ Thanks for your review! We appreciate your feedback!');
    
    function setupProjectFilter() {
        const container = document.querySelector('.project-level-container');
        const projects = document.querySelectorAll('.project-grid .project-card');

        if (container && projects.length > 0) {
            container.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('project-level-btn')) {
                    document.querySelectorAll('.project-level-btn').forEach(btn => {
                        btn.classList.remove('active-level');
                    });
                    target.classList.add('active-level');

                    const filterLevel = target.dataset.level || 'all';

                    projects.forEach(card => {
                        const cardLevel = card.dataset.level;

                        if (filterLevel === 'all' || cardLevel === filterLevel) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
            document.querySelector('.project-level-btn[data-level="all"]')?.click();
        }
    }
    
    setupProjectFilter();
});