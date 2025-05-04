// Stats component - Balance, Contracts, Collaborators stats
const SplStats = {
  // Initialize stats cards
  initialize: function() {
    SplUI.log('Initializing stats cards');
    
    // Find stat values by the specific class names in your HTML
    const balanceElement = document.querySelector('.stat-value-balance');
    const totalContractsElement = document.querySelector('.stat-value-total');
    const activeContractsElement = document.querySelector('.stat-value-active');
    const collaboratorsElement = document.querySelector('.stat-value-collab');
    
    // Find monthly values
    const balanceMonthlyElement = document.querySelector('.user-balance-value');
    const totalContractsMonthlyElement = document.querySelector('.total-contracts-value');
    const activeContractsMonthlyElement = document.querySelector('.active-contracts-value');
    const collaboratorsMonthlyElement = document.querySelector('.active-collaborators-value');
    
    // Update with mock data
    if (balanceElement) {
      balanceElement.textContent = SplFormatting.formatCurrency(SplMockData.user.balance);
    }
    
    if (totalContractsElement) {
      totalContractsElement.textContent = SplMockData.user.totalContracts.toString();
    }
    
    if (activeContractsElement) {
      activeContractsElement.textContent = SplMockData.user.activeContracts.toString();
    }
    
    if (collaboratorsElement) {
      collaboratorsElement.textContent = SplMockData.user.activeCollaborators.toString();
    }
    
    // Update monthly values if they exist
    const monthlyValue = '1.2 ETH this month.'; // Mock monthly value
    
    if (balanceMonthlyElement) {
      balanceMonthlyElement.textContent = monthlyValue;
    }
    
    if (totalContractsMonthlyElement) {
      totalContractsMonthlyElement.textContent = monthlyValue;
    }
    
    if (activeContractsMonthlyElement) {
      activeContractsMonthlyElement.textContent = monthlyValue;
    }
    
    if (collaboratorsMonthlyElement) {
      collaboratorsMonthlyElement.textContent = monthlyValue;
    }
    
    SplUI.log('Stats cards initialized');
  }
};
