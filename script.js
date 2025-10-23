/**
 * scripts.js
 * * This file contains the primary JavaScript functions for the website, 
 * focusing on navigation, form handling, and page-specific interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation & Active Link Highlight ---
    
    /**
     * Highlights the current page link in the navigation bar.
     */
    function highlightActiveNav() {
        // Get the current URL path (e.g., /about.html, /contact.html, or / for index.html)
        const currentPath = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
        
        // Find all navigation links
        const navLinks = document.querySelectorAll('nav ul li a');

        navLinks.forEach(link => {
            // Get the link's target file name
            const linkPath = link.href.split('/').pop().toLowerCase();
            
            // Check if the current page path is included in the link's path
            if (linkPath === currentPath) {
                link.classList.add('active-nav');
            } else if (currentPath === 'index.html' && linkPath === '') {
                 // Special handling for the root path pointing to the home link
                 link.classList.add('active-nav');
            } else {
                link.classList.remove('active-nav');
            }
        });
    }

    highlightActiveNav();

    // --- 2. Form Submission Handlers ---

    /**
     * Generic form submission handler to simulate processing and provide feedback.
     * @param {string} formSelector - The CSS selector for the form element.
     */
    function setupFormHandler(formSelector, successMessage) {
        const form = document.querySelector(formSelector);
        if (form) {
            form.addEventListener('submit', function(event) {
                event.preventDefault(); // Stop the actual form submission
                
                const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
                const originalButtonText = submitButton.textContent;
                
                // Show submission feedback
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;

                // Simulate an API call delay
                setTimeout(() => {
                    // Alert the user (in a real app, you would update a message on the page)
                    alert(successMessage);
                    
                    // Reset the form and button
                    form.reset();
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }, 1500);
            });
        }
    }

    // Setup handlers for all forms based on your CSS classes
    setupFormHandler('.registration-form', '🎉 Registration successful! Welcome aboard!'); // Join Page
    setupFormHandler('.contact-form', '✅ Message sent! We\'ll be in touch soon.');      // Contact Page
    setupFormHandler('.review-form', '⭐ Thanks for your review! We appreciate your feedback!'); // Review Page
    
    // --- 3. Projects Page Interactivity (Optional) ---
    
    /**
     * Handles the filtering and display of projects based on the selected level button.
     * This assumes a project-grid structure and project cards that might have a data-level attribute.
     */
    function setupProjectFilter() {
        const container = document.querySelector('.project-level-container');
        const projects = document.querySelectorAll('.project-grid .project-card'); // Assumes this class is used

        if (container && projects.length > 0) {
            container.addEventListener('click', (event) => {
                const target = event.target;
                if (target.classList.contains('project-level-btn')) {
                    // 1. Update active button state
                    document.querySelectorAll('.project-level-btn').forEach(btn => {
                        btn.classList.remove('active-level');
                    });
                    target.classList.add('active-level');

                    // 2. Get the filter level (e.g., 'beginner', 'intermediate', 'all')
                    const filterLevel = target.dataset.level || 'all'; // Assumes data-level="beginner" attribute on button

                    // 3. Filter projects
                    projects.forEach(card => {
                        const cardLevel = card.dataset.level; // Assumes data-level="intermediate" attribute on project card

                        if (filterLevel === 'all' || cardLevel === filterLevel) {
                            card.style.display = 'block'; // Show matching projects
                        } else {
                            card.style.display = 'none';  // Hide non-matching projects
                        }
                    });
                }
            });
            // Optionally, trigger a click on the 'all' button to show everything on load
            document.querySelector('.project-level-btn[data-level="all"]')?.click();
        }
    }
    
    setupProjectFilter();
});