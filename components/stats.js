// Stats component - Balance, Contracts, Collaborators stats
const SplStats = {
  // Initialize stats cards
  initialize: function() {
    SplUI.log('Initializing stats cards');
    
    // Find stat cards by class names
    const balanceElement = document.querySelector('.stat-balance, .total-balance-stat');
    const contractsElement = document.querySelector('.stat-contracts, .total-contracts-stat');
    const activeContractsElement = document.querySelector('.stat-active-contracts, .active-contracts-stat');
    const collaboratorsElement = document.querySelector('.stat-collaborators, .active-collaborators-stat');
    
    // Update with data
    if (balanceElement) {
      balanceElement.textContent = SplFormatting.formatCurrency(SplMockData.user.balance);
    }
    
    if (contractsElement) {
      contractsElement.textContent = SplMockData.user.totalContracts.toString();
    }
    
    if (activeContractsElement) {
      activeContractsElement.textContent = SplMockData.user.activeContracts.toString();
    }
    
    if (collaboratorsElement) {
      collaboratorsElement.textContent = SplMockData.user.activeCollaborators.toString();
    }
    
    SplUI.log('Stats cards initialized');
  }
};
