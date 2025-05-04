// Contract cards component
const SplContracts = {
  // Initialize contract cards
  initialize: function() {
    SplUI.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUI.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      // Style container for horizontal scrolling
      this.styleContainer(cardsContainer);
      
      // Add data to cards
      this.populateCards(contractCards, cardsContainer);
      
      // Initialize buttons
      this.initializeButtons();
      
      SplUI.log('Contract cards initialized');
    }
  },
  
  // Style container for horizontal scrolling
  styleContainer: function(container) {
    container.style.display = 'flex';
    container.style.overflowX = 'auto';
    container.style.padding = '4px 0 16px';
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollBehavior = 'smooth';
    container.style.WebkitOverflowScrolling = 'touch';
    
    // Make scrollbar less obtrusive
    container.style.scrollbarWidth = 'thin';
    container.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
  },
  
  // Populate cards with data
  populateCards: function(cards, container) {
    // Add data to each card
    cards.forEach((card, index) => {
      if (index < SplMockData.contracts.length) {
        const contract = SplMockData.contracts[index];
        
        // Add data attributes
        card.setAttribute('data-contract-id', contract.id);
        card.setAttribute('data-status', contract.status);
        card.setAttribute('data-type', contract.type.toLowerCase());
        
        // Style card
        card.style.flex = '0 0 auto';
        card.style.marginRight = '16px';
        card.style.scrollSnapAlign = 'start';
        card.style.cursor = 'pointer';
        
        // Update card content
        this.updateCardContent(card, contract);
        
        // Make card clickable
        card.addEventListener('click', (e) => {
          // Don't navigate if clicking on a button
          if (e.target.closest('button') || e.target.tagName === 'BUTTON') {
            return;
          }
          
          SplUI.log('Contract card clicked:', contract.id);
          SplUI.showToast(`Viewing contract: ${contract.title}`);
        });
      } else {
        // Hide extra cards
        card.style.display = 'none';
      }
    });
  },
  
  // Update card content with contract data
  updateCardContent: function(card, contract) {
    // Find elements within the card
    const titleElement = card.querySelector('.dashcard-name, .contract-title');
    const participantsElement = card.querySelector('.joined-stat');
    const statusElement = card.querySelector('.deployed-tag, .pending-tag, .ready-deploy-tag, .failed-deploy-tag');
    const valueElement = card.querySelector('.contract-value') || this.createValueElement(card);
    
    // Update elements if they exist
    if (titleElement) {
      titleElement.textContent = contract.title;
    }
    
    if (participantsElement) {
      participantsElement.textContent = `${contract.participantsJoined} of ${contract.participantsTotal} joined`;
    }
    
    if (statusElement) {
      // Clear previous status classes
      statusElement.classList.remove('deployed-tag', 'pending-tag', 'ready-deploy-tag', 'failed-deploy-tag');
      
      // Set new status
      switch (contract.status) {
        case 'deployed':
          statusElement.classList.add('deployed-tag');
          statusElement.textContent = 'Active';
          break;
        case 'pending':
          statusElement.classList.add('pending-tag');
          statusElement.textContent = 'Pending';
          break;
        case 'draft':
          statusElement.classList.add('ready-deploy-tag');
          statusElement.textContent = 'Draft';
          break;
        default:
          statusElement.classList.add('failed-deploy-tag');
          statusElement.textContent = 'Failed';
      }
    }
    
    if (valueElement) {
      valueElement.textContent = SplFormatting.formatCurrency(contract.totalRevenue, contract.currency);
    }
    
    // Create mini chart if chart container exists
    const chartContainer = card.querySelector('.mini-chart-container');
    if (chartContainer && typeof SplCharts !== 'undefined') {
      SplCharts.createMiniChart(contract.id, contract, chartContainer);
    }
  },
  
  // Create value element if it doesn't exist
  createValueElement: function(card) {
    // Find a good place to insert the value
    const buttonsContainer = card.querySelector('.button-container, .card-buttons');
    if (!buttonsContainer) return null;
    
    // Create container
    const valueContainer = document.createElement('div');
    valueContainer.className = 'contract-value-container';
    valueContainer.style.display = 'flex';
    valueContainer.style.justifyContent = 'space-between';
    valueContainer.style.marginBottom = '12px';
    
    // Create label
    const label = document.createElement('div');
    label.className = 'contract-value-label';
    label.textContent = 'Total Revenue';
    label.style.fontSize = '14px';
    label.style.color = '#888';
    
    // Create value
    const value = document.createElement('div');
    value.className = 'contract-value';
    value.style.fontSize = '18px';
    value.style.fontWeight = 'bold';
    value.style.color = '#FFF';
    
    // Assemble
    valueContainer.appendChild(label);
    valueContainer.appendChild(value);
    
    // Insert into card
    buttonsContainer.parentElement.insertBefore(valueContainer, buttonsContainer);
    
    return value;
  },
  
  // Initialize contract buttons
  initializeButtons: function() {
    // View buttons
    const viewButtons = document.querySelectorAll('.contract-card .primary-button, .contract-card .view-button');
    viewButtons.forEach(button => {
      const card = button.closest('.contract-card');
      if (card) {
        const contractId = card.getAttribute('data-contract-id');
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          SplUI.showToast(`Viewing contract details: ${contractId}`);
        });
      }
    });
    
    // Invite buttons
    const inviteButtons = document.querySelectorAll('.contract-card .secondary-button-dull, .contract-card .invite-button');
    inviteButtons.forEach(button => {
      const card = button.closest('.contract-card');
      if (card) {
        const contractId = card.getAttribute('data-contract-id');
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const inviteLink = `${window.location.origin}/contract/join?id=${contractId}`;
          SplUI.copyToClipboard(inviteLink);
          SplUI.showToast('Invite link copied to clipboard!');
        });
      }
    });
  }
};
