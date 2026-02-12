document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) return;

    // Get all articles and detach them from DOM (except needed scripts/elements if any)
    // We will re-insert them as needed or just toggle display. 
    // Toggling display is safer to preserve event listeners if any (though unlikely for static articles)
    // But grouping them physically might be better for order?
    // The request says "sorted by year". They might be mixed in the HTML.
    // So I should physically sort them or just hide/show. 
    // If I hide/show, and they are mixed, the visible ones will appear in their DOM order.
    // So I should probably sort the DOM elements too.

    const articles = Array.from(document.querySelectorAll('.news-article'));
    
    // Data structure to hold year groups
    const articlesByYear = {};
    const years = [];

    // Process articles
    articles.forEach(article => {
        const badge = article.querySelector('.news-badge');
        let year = null;
        
        if (badge) {
            const dateText = badge.textContent.trim();
            // Try matching various formats
            // Common one seen: MM/DD/YY or MM/DD/YYYY
            const parts = dateText.split('/');
            if (parts.length === 3) {
                let y = parseInt(parts[2]);
                // Handle 2 digit year
                if (y < 100) {
                    y += 2000; // Assuming 2000s
                }
                year = y;
            }
        }

        if (year) {
            if (!articlesByYear[year]) {
                articlesByYear[year] = [];
                years.push(year);
            }
            articlesByYear[year].push(article);
        } else {
            // Handle articles with no date? Or put them in "Other"
            // For now, let's assume all have dates as per the file content
            console.warn('Could not parse date for article', article);
        }
    });

    // Sort years descending (newest first)
    years.sort((a, b) => b - a);
    
    // Sort articles within each year (newest first) if needed
    // The current articles seem to be mostly chronological, but let's ensure it.
    // To sort properly we need full date parsing.
    years.forEach(year => {
        articlesByYear[year].sort((a, b) => {
            const dateA = parseDate(a.querySelector('.news-badge').textContent);
            const dateB = parseDate(b.querySelector('.news-badge').textContent);
            return dateB - dateA;
        });
    });

    function parseDate(dateStr) {
        const parts = dateStr.trim().split('/');
        if (parts.length === 3) {
            let y = parseInt(parts[2]);
            if (y < 100) y += 2000;
            return new Date(y, parseInt(parts[0]) - 1, parseInt(parts[1]));
        }
        return new Date(0);
    }

    // Determine current view
    let currentYearIndex = 0;

    // Create Controls UI
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'news-pagination';

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'news-controls';

    const arrowsDiv = document.createElement('div');
    arrowsDiv.className = 'pagination-arrows';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'year-btn'; // Reuse year-btn style for consistency
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Newer';
    prevBtn.style.display = 'flex';
    prevBtn.style.alignItems = 'center';
    prevBtn.style.gap = '8px';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'year-btn';
    nextBtn.innerHTML = 'Older <i class="fas fa-chevron-right"></i>';
    nextBtn.style.display = 'flex';
    nextBtn.style.alignItems = 'center';
    nextBtn.style.gap = '8px';

    arrowsDiv.appendChild(prevBtn);
    arrowsDiv.appendChild(nextBtn);

    const yearListDiv = document.createElement('div');
    yearListDiv.className = 'year-list';

    controlsDiv.appendChild(arrowsDiv);
    controlsDiv.appendChild(yearListDiv);
    paginationContainer.appendChild(controlsDiv);

    // Insert pagination at the bottom of news container
    newsContainer.appendChild(paginationContainer);

    function render() {
        // Clear current articles from display (hide them)
        // Actually, let's re-append them in correct order to the container, 
        // ensuring the pagination stays at bottom.
        // Or simpler: Hide all, then show the ones for current year.
        // Since we want them sorted, we might need to re-order DOM nodes if they are out of order.
        
        // Remove all articles from DOM temporarily (except pagination)
        articles.forEach(a => {
            if(a.parentNode === newsContainer) {
                newsContainer.removeChild(a);
            }
        });

        // Get articles for current year
        const targetYear = years[currentYearIndex];
        const targetArticles = articlesByYear[targetYear] || [];

        // Append them before pagination
        targetArticles.forEach(article => {
            article.style.display = 'block';
            article.classList.add('fade-in');
            newsContainer.insertBefore(article, paginationContainer);
        });

        // Update Year Buttons
        yearListDiv.innerHTML = '';
        years.forEach((year, index) => {
            const btn = document.createElement('button');
            btn.className = 'year-btn';
            if (index === currentYearIndex) btn.classList.add('active');
            btn.textContent = year;
            btn.onclick = () => {
                currentYearIndex = index;
                render();
                // Scroll to top of news container
                const headerOffset = 100; // Account for sticky header
                const elementPosition = newsContainer.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            };
            yearListDiv.appendChild(btn);
        });

        // Update Arrows
        prevBtn.disabled = currentYearIndex === 0;
        prevBtn.style.opacity = currentYearIndex === 0 ? '0.5' : '1';
        prevBtn.style.cursor = currentYearIndex === 0 ? 'default' : 'pointer';

        nextBtn.disabled = currentYearIndex === years.length - 1;
        nextBtn.style.opacity = currentYearIndex === years.length - 1 ? '0.5' : '1';
        nextBtn.style.cursor = currentYearIndex === years.length - 1 ? 'default' : 'pointer';
    }

    prevBtn.onclick = () => {
        if (currentYearIndex > 0) {
            currentYearIndex--;
            render();
            // Scroll to top
            const headerOffset = 100;
            const elementPosition = newsContainer.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    nextBtn.onclick = () => {
        if (currentYearIndex < years.length - 1) {
            currentYearIndex++;
            render();
            // Scroll to top
            const headerOffset = 100;
            const elementPosition = newsContainer.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    // Initial render
    render();
});
