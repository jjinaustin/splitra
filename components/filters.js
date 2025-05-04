// Filters component
const SplFilters = {
  // Initialize filter buttons
  initialize: function() {
    SplUI.log('Initializing filter buttons');
    
    // Find existing filter buttons
    const filterButtons = document.querySelectorAll('.filter-pill');
    
    if (filterButtons.length > 0) {
      // Use existing filter buttons
      this.activateFilterButtons(filterButtons);
    } else {
      // Create filter buttons
      this.createFilterButtons();
    }
  },
  
  // Activate existing filter buttons
  activateFilterButtons: function(buttons) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active state
        buttons.forEach(btn => {
          btn.classList.remove('active');
          btn.classList.add('inactive');
        });
        
        button.classList.remove('inactive');
        button.classList.add('active');
        
        // Get filter value
        const filter = button.getAttribute('data-filter') || button.textContent.trim().toLowerCase();
        SplUI.log('Filter selected:', filter);
        
        // Apply filter
        this.applyFilter(filter);
      });
    });
    
    SplUI.log('Filter buttons activated');
  },
  
  // Create filter buttons
  createFilterButtons: function() {
    // Find a place to add filters
    const contractCards = document.querySelector('.contract-card');
    if (!contractCards) {
      SplUI.error('Cannot find contract cards for filters');
      return;
    }
    
    // Find heading or a good insertion point
    const heading = Array.from(document.querySelectorAll('h1, h2, h3, .heading'))
      .find(el => el.textContent.includes('Contract'));
      
    if (!heading) {
      SplUI.error('Could not find heading for filters');
      return;
    }
    
    // Create filter container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.style.display = 'flex';
    filterContainer.style.gap = '10px';
    filterContainer.style.marginTop = '16px';
    filterContainer.style.marginBottom = '16px';
    
    // Filter options
    const filters = [
      { label: 'All', filter: 'all', active: true },
      { label: 'Active', filter: 'deployed' },
      { label: 'Pending', filter: 'pending' },
      { label: 'Draft', filter: 'draft' }
    ];
    
    // Create filter buttons
    filters.forEach(filter => {
      const button = document.createElement('div');
      button.className = `filter-pill ${filter.active ? 'active' : 'inactive'}`;
      button.setAttribute('data-filter', filter.filter);
      button.textContent = filter.label;
      button.style.padding = '8px 16px';
      button.style.borderRadius = '20px';
      button.style.cursor = 'pointer';
      
      // Add click event
      button.addEventListener('click', () => {
        // Update active state
        filterContainer.querySelectorAll('.filter-pill').forEach(btn => {
          btn.classList.remove('active');
          btn.classList.add('inactive');
        });
        
        button.classList.remove('inactive');
        button.classList.add('active');
        
        // Apply filter
        this.applyFilter(filter.filter);
      });
      
      filterContainer.appendChild(button);
    });
    
    // Insert after heading
    heading.parentElement.insertBefore(filterContainer, heading.nextSibling);
    SplUI.log('Filter buttons created');
  },
  
  // Apply filter to contract cards
  applyFilter: function(filter) {
    const cards = document.querySelectorAll('.contract-card');
    
    cards.forEach(card => {
      if (filter === 'all') {
        card.style.display = '';
      } else {
        const status = card.getAttribute('data-status');
        const type = card.getAttribute('data-type');
        
        if (status === filter || type === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      }
    });
    
    SplUI.log('Filter applied:', filter);
  }
};
