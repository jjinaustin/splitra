// Stats component - Balance, Contracts, Collaborators stats
const SplStats = {
  // Initialize stats cards
  initialize: function() {
    SplUI.log('Initializing stats cards');
    
    // Wait a short moment to ensure DOM is fully ready
    setTimeout(() => {
      // Update stats with mock data
      this.updateStats();
    }, 100);
    
    SplUI.log('Stats cards initialization scheduled');
  },
  
  // Update stats with mock data
  updateStats: function() {
    // Balance
    const balanceElement = document.querySelector('.stat-value-balance');
    if (balanceElement) {
      balanceElement.textContent = SplFormatting.formatCurrency(SplMockData.user.balance);
      SplUI.log('Updated balance stat');
    }
    
    // Total contracts
    const contractsElement = document.querySelector('.stat-value-total');
    if (contractsElement) {
      contractsElement.textContent = SplMockData.user.totalContracts.toString();
      SplUI.log('Updated total contracts stat');
    }
    
    // Active contracts
    const activeElement = document.querySelector('.stat-value-active');
    if (activeElement) {
      activeElement.textContent = SplMockData.user.activeContracts.toString();
      SplUI.log('Updated active contracts stat');
    }
    
    // Collaborators
    const collabElement = document.querySelector('.stat-value-collab');
    if (collabElement) {
      collabElement.textContent = SplMockData.user.activeCollaborators.toString();
      SplUI.log('Updated collaborators stat');
    }
    
    // Update monthly values
    const monthlyValue = '1.2 ETH this month.';
    
    const balanceMonthElement = document.querySelector('.user-balance-value');
    if (balanceMonthElement) {
      balanceMonthElement.textContent = monthlyValue;
    }
    
    const contractsMonthElement = document.querySelector('.total-contracts-value');
    if (contractsMonthElement) {
      contractsMonthElement.textContent = monthlyValue;
    }
    
    const activeMonthElement = document.querySelector('.active-contracts-value');
    if (activeMonthElement) {
      activeMonthElement.textContent = monthlyValue;
    }
    
    const collabMonthElement = document.querySelector('.active-collaborators-value');
    if (collabMonthElement) {
      collabMonthElement.textContent = monthlyValue;
    }
    
    SplUI.log('All stats updated successfully');
  }
};
