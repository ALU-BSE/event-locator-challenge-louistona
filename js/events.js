// Sample Events Data (shared data)
const eventsData = [
    {
        id: 1,
        name: "Summer Music Festival",
        date: "2024-07-20",
        time: "18:00",
        location: "Central Park, New York",
        city: "new-york",
        category: "music",
        price: "$75",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Join us for an unforgettable evening of live music featuring top artists from around the world. This outdoor festival promises to be the highlight of your summer with multiple stages, food vendors, and an amazing atmosphere.",
        organizer: "Music Events Co.",
        capacity: "5,000 people",
        duration: "6 hours",
        language: "English"
    },
    {
        id: 2,
        name: "Tech Innovation Summit",
        date: "2024-07-25",
        time: "09:00",
        location: "Convention Center, Los Angeles",
        city: "los-angeles",
        category: "technology",
        price: "$150",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Discover the latest technological innovations and network with industry leaders. This summit features keynote speakers, interactive workshops, and exhibitions from leading tech companies.",
        organizer: "TechWorld Events",
        capacity: "2,000 people",
        duration: "8 hours",
        language: "English"
    },
    {
        id: 3,
        name: "Food & Wine Expo",
        date: "2024-07-22",
        time: "12:00",
        location: "Navy Pier, Chicago",
        city: "chicago",
        category: "food",
        price: "$45",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Experience culinary delights from world-renowned chefs and sample premium wines from local and international vineyards. Perfect for food enthusiasts and wine lovers.",
        organizer: "Culinary Events LLC",
        capacity: "1,500 people",
        duration: "5 hours",
        language: "English"
    },
    {
        id: 4,
        name: "Art Gallery Opening",
        date: "2024-07-18",
        time: "19:00",
        location: "Museum District, Houston",
        city: "houston",
        category: "arts",
        price: "Free",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Celebrate the opening of our new contemporary art exhibition featuring works from emerging and established artists. Enjoy complimentary refreshments and meet the artists.",
        organizer: "Houston Arts Foundation",
        capacity: "300 people",
        duration: "3 hours",
        language: "English"
    },
    {
        id: 5,
        name: "Sports Championship",
        date: "2024-07-28",
        time: "15:00",
        location: "Stadium, Miami",
        city: "miami",
        category: "sports",
        price: "$85",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Witness an exciting championship match featuring top teams competing for the title. Experience the thrill of live sports with thousands of passionate fans.",
        organizer: "Sports Events Miami",
        capacity: "10,000 people",
        duration: "3 hours",
        language: "English"
    },
    {
        id: 6,
        name: "Business Networking Gala",
        date: "2024-07-30",
        time: "18:30",
        location: "Grand Hotel, New York",
        city: "new-york",
        category: "business",
        price: "$200",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Connect with business leaders and entrepreneurs at this exclusive networking event. Features keynote presentations, panel discussions, and premium dining experience.",
        organizer: "Business Network Pro",
        capacity: "500 people",
        duration: "4 hours",
        language: "English"
    }
];

// Utility Functions
function formatDateShort(dateString) {
    const date = new Date(dateString);
    return {
        day: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' })
    };
}

function getCategoryClass(category) {
    return `category-${category}`;
}

function filterEvents(searchQuery = '', city = '', date = '', category = '') {
    return eventsData.filter(event => {
        const matchesSearch = !searchQuery || 
            event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCity = !city || event.city === city;
        const matchesDate = !date || event.date === date;
        const matchesCategory = !category || event.category === category;
        
        return matchesSearch && matchesCity && matchesDate && matchesCategory;
    });
}

function sortEvents(events, sortBy) {
    switch (sortBy) {
        case 'name':
            return events.sort((a, b) => a.name.localeCompare(b.name));
        case 'category':
            return events.sort((a, b) => a.category.localeCompare(b.category));
        case 'date':
        default:
            return events.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
}

// Event Card Creation
function createEventCard(event) {
    const dateInfo = formatDateShort(event.date);
    
    return `
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card event-card shadow-sm h-100">
                <div class="position-relative">
                    <img src="${event.image}" class="event-image" alt="${event.name}">
                    <div class="event-date-badge">
                        <div class="day">${dateInfo.day}</div>
                        <div class="month">${dateInfo.month}</div>
                    </div>
                    <div class="event-category">
                        <span class="badge ${getCategoryClass(event.category)}">${event.category.charAt(0).toUpperCase() + event.category.slice(1)}</span>
                    </div>
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text text-muted mb-3">${event.description.substring(0, 100)}...</p>
                    <div class="mt-auto">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <small class="text-muted">
                                <i class="fas fa-map-marker-alt me-1"></i>${event.location}
                            </small>
                            <strong class="text-primary">${event.price}</strong>
                        </div>
                        <a href="event-details.html?id=${event.id}" class="btn btn-primary w-100">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize Events Page
function initEventsPage() {
    const eventsList = document.getElementById('eventsList');
    const noEventsMessage = document.getElementById('noEvents');
    const filterForm = document.getElementById('eventFilters');
    const sortSelect = document.getElementById('sortEvents');
    const clearFiltersBtn = document.getElementById('clearFilters');
    
    let currentEvents = [...eventsData];
    
    // Load search parameters from localStorage
    const savedParams = localStorage.getItem('searchParams');
    if (savedParams) {
        const params = JSON.parse(savedParams);
        document.getElementById('filterSearch').value = params.searchQuery || '';
        document.getElementById('filterCity').value = params.city || '';
        document.getElementById('filterDate').value = params.date || '';
        document.getElementById('filterCategory').value = params.category || '';
        
        // Clear saved parameters
        localStorage.removeItem('searchParams');
    }
    
    function displayEvents() {
        const searchQuery = document.getElementById('filterSearch').value;
        const city = document.getElementById('filterCity').value;
        const date = document.getElementById('filterDate').value;
        const category = document.getElementById('filterCategory').value;
        const sortBy = sortSelect.value;
        
        currentEvents = filterEvents(searchQuery, city, date, category);
        currentEvents = sortEvents(currentEvents, sortBy);
        
        if (currentEvents.length === 0) {
            eventsList.style.display = 'none';
            noEventsMessage.style.display = 'block';
        } else {
            eventsList.style.display = 'flex';
            noEventsMessage.style.display = 'none';
            eventsList.innerHTML = currentEvents.map(createEventCard).join('');
        }
    }
    
    // Initial display
    displayEvents();
    
    // Event listeners
    if (filterForm) {
        filterForm.addEventListener('input', displayEvents);
        filterForm.addEventListener('change', displayEvents);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', displayEvents);
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            document.getElementById('filterSearch').value = '';
            document.getElementById('filterCity').value = '';
            document.getElementById('filterDate').value = '';
            document.getElementById('filterCategory').value = '';
            displayEvents();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEventsPage();
    
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            if (this.type === 'submit' || this.classList.contains('btn-primary')) {
                this.innerHTML = '<span class="loading-spinner me-2"></span>Loading...';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 1000);
            }
        });
    });
});