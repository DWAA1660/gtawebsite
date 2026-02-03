document.addEventListener('DOMContentLoaded', function() {
    // Date Update (in info-bar, usually static)
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
});

// Initialize Navbar/Footer dependent logic after components are loaded
document.addEventListener('componentsLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Mobile Dropdown Toggles
    const dropdowns = document.querySelectorAll('.dropdown > a');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            // Only on mobile/tablet where the hamburger menu is shown
            // Using matchMedia to exactly match CSS media query
            if (window.matchMedia('(max-width: 1350px)').matches) {
                e.preventDefault();
                e.stopPropagation(); // Stop bubbling
                
                const parent = this.parentElement;
                const wasActive = parent.classList.contains('active');
                
                // 1. Reset ALL dropdowns to closed state
                document.querySelectorAll('.dropdown').forEach(d => {
                    d.classList.remove('active');
                    const icon = d.querySelector('a i');
                    if (icon) icon.style.transform = 'rotate(0deg)';
                });

                // 2. If the clicked dropdown was NOT active, open it now
                // (If it WAS active, we just closed it in step 1, so we're done - toggled off)
                if (!wasActive) {
                    parent.classList.add('active');
                    const icon = this.querySelector('i');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // Sticky Navbar Transition
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
            }
        });
    }
});
