// Stats component - Balance, Contracts, Collaborators stats
const SplStats = {
  // Initialize stats cards
  initialize: function() {
    SplUI.log('Initializing stats cards');
    
    // Wait a short moment to ensure DOM is fully ready
    setTimeout(() => {
      // Update stats with mock data
      this.updateStats();
    }, 200);
  },
  
  // Update stats with mock data
  updateStats: function() {
    // Main stat values
    const statValues = {
      '.stat-value-balance': SplFormatting.formatCurrency(SplMockData.user.balance),
      '.stat-value-total': SplMockData.user.totalContracts.toString(),
      '.stat-value-active': SplMockData.user.activeContracts.toString(),
      '.stat-value-collab': SplMockData.user.activeCollaborators.toString()
    };
    
    // Bottom stat values (monthly metrics)
    const monthlyValues = {
      '.user-balance-value': '+1.2 ETH this month',
      '.total-contracts-value': '+3 contracts this month',
      '.active-contracts-value': '+2 activated this month',
      '.active-collaborators-value': '+5 joined this month'
    };
    
    // Update main stat values
    Object.entries(statValues).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = value;
        SplUI.log(`Updated ${selector} to ${value}`);
      }
    });
    
    // Update monthly values
    Object.entries(monthlyValues).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.textContent = value;
        SplUI.log(`Updated ${selector} to ${value}`);
      }
    });
    
    SplUI.log('All stats updated successfully');
  }
};
