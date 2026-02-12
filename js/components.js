// Shared HTML Components

const navbarHTML = `
    <nav class="navbar">
        <div class="container">
            <a href="index.html" class="logo">
                <img src="images/logo.gif" alt="GT Aeronautics Logo">
            </a>
            <button class="mobile-menu-btn" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <ul class="nav-links">
                <li><a href="index.html">Home</a></li>
                <li class="dropdown">
                    <a href="aboutus.html">About Us <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content">
                        <a href="aboutus.html">Company Overview</a>
                        <a href="management.html">Management Team</a>
                        <a href="employment.html">Employment</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="#">Products & Services <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content">
                        <div class="dropdown-group">
                            <h4>Defense (DoD)</h4>
                            <a href="bandit-rpas.html">BANDIT RPAS</a>
                            <a href="tacamo-rpas.html">TACAMO RPAS</a>
                            <a href="bandito-pglm.html">BANDITO PGLM</a>
                            <a href="sru.html">Stores Release Unit (SRU)</a>
                        </div>
                        <div class="dropdown-group">
                            <h4>Services</h4>
                            <a href="cfmt.html">Composite Manufacturing</a>
                            <a href="cctm.html">Custom Tooling</a>
                            <a href="uasfc.html">Flight Crews & Training</a>
                            <a href="consulting.html">Engineering Consulting</a>
                            <a href="research.html">Research & Development</a>
                        </div>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="#">Commercial Aircraft <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-content">
                        <a href="gt50t-rpas.html">GT-50T RPAS</a>
                        <a href="gt380-rpas.html">GT-380 RPAS</a>
                        <a href="gt1500-rpas.html">GT-1500 RPAS</a>
                        <a href="gt100hl-rpas.html">GT-100HL RPAS</a>
                    </div>
                </li>
                <li><a href="news.html">Company News</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="contactus.html" class="btn-contact">Contact Us</a></li>
            </ul>
        </div>
    </nav>
`;

const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col">
                    <img src="images/logo.gif" alt="GT Aeronautics" class="footer-logo">
                    <p>Homeland Security Through Innovations in Aerospace.</p>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-linkedin"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-facebook"></i></a>
                    </div>
                </div>
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="aboutus.html">About Us</a></li>
                        <li><a href="pna.html">Products</a></li>
                        <li><a href="research.html">Research & Development</a></li>
                        <li><a href="contactus.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Contact Info</h4>
                    <ul class="contact-list">
                        <li><i class="fas fa-map-marker-alt"></i> 26 Elk Road, Cody, WY 82414-7810</li>
                        <li><i class="fas fa-phone"></i> (307) 587-5221</li>
                        <li><i class="fas fa-envelope"></i> info@gtaeronautics.com</li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <span id="year"></span> GT Aeronautics, LLC. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
`;

// Function to inject components
function loadComponents() {
    // Inject Navbar
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = navbarHTML;
        highlightActiveLink();
    }

    // Inject Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
        
        // Update Copyright Year
        const yearSpan = document.getElementById('year');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    }
    
    // Dispatch event to signal components are loaded
    document.dispatchEvent(new Event('componentsLoaded'));
}

// Function to highlight the active link based on current URL
function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find all links in navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Remove active class first
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        
        // Check if link matches current path
        if (linkHref === currentPath) {
            link.classList.add('active');
            
            // If link is inside a dropdown, highlight the parent dropdown toggle
            const dropdownContent = link.closest('.dropdown-content');
            if (dropdownContent) {
                const dropdownParent = dropdownContent.parentElement;
                const dropdownToggle = dropdownParent.querySelector('a');
                if (dropdownToggle) {
                    dropdownToggle.classList.add('active');
                }
            }
        }
    });
}

// Run immediately if DOM is ready, otherwise wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
