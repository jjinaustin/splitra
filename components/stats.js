// Updated Stats component with more debugging and direct DOM manipulation
const SplStats = {
  // Initialize stats cards
  initialize: function() {
    SplUI.log('Initializing stats cards');
    
    // Find stat values by the specific class names in your HTML
    const balanceElement = document.querySelector('.stat-value-balance');
    const totalContractsElement = document.querySelector('.stat-value-total');
    const activeContractsElement = document.querySelector('.stat-value-active');
    const collaboratorsElement = document.querySelector('.stat-value-collab');
    
    // Debug logging to verify elements were found
    SplUI.log('Balance element found:', balanceElement !== null);
    SplUI.log('Total contracts element found:', totalContractsElement !== null);
    SplUI.log('Active contracts element found:', activeContractsElement !== null);
    SplUI.log('Collaborators element found:', collaboratorsElement !== null);
    
    // Log the current values before updating
    if (balanceElement) SplUI.log('Current balance text:', balanceElement.textContent);
    if (totalContractsElement) SplUI.log('Current total contracts text:', totalContractsElement.textContent);
    
    // Update with mock data using direct innerHTML assignment
    if (balanceElement) {
      balanceElement.innerHTML = SplFormatting.formatCurrency(SplMockData.user.balance);
      SplUI.log('Updated balance to:', SplFormatting.formatCurrency(SplMockData.user.balance));
    }
    
    if (totalContractsElement) {
      totalContractsElement.innerHTML = SplMockData.user.totalContracts.toString();
      SplUI.log('Updated total contracts to:', SplMockData.user.totalContracts.toString());
    }
    
    if (activeContractsElement) {
      activeContractsElement.innerHTML = SplMockData.user.activeContracts.toString();
      SplUI.log('Updated active contracts to:', SplMockData.user.activeContracts.toString());
    }
    
    if (collaboratorsElement) {
      collaboratorsElement.innerHTML = SplMockData.user.activeCollaborators.toString();
      SplUI.log('Updated collaborators to:', SplMockData.user.activeCollaborators.toString());
    }
    
    // Try with direct document.getElementById for additional targeting options
    // In case the Webflow generated IDs are more reliable
    try {
      const balanceByID = document.querySelector('#stat-value-balance');
      if (balanceByID) {
        balanceByID.innerHTML = SplFormatting.formatCurrency(SplMockData.user.balance);
        SplUI.log('Updated balance by ID');
      }
    } catch (e) {
      SplUI.log('No element with ID stat-value-balance');
    }
    
    SplUI.log('Stats cards initialization completed');
  }
};
