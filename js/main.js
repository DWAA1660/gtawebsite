document.addEventListener('DOMContentLoaded', function() {
    
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
            // Only on mobile
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
                
                // Toggle chevron
                const icon = this.querySelector('i');
                if (parent.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Sticky Navbar Transition
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
        }
    });

    // Date Update
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
});
