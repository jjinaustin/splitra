// Combined Splitra Dashboard Script - Stats Only
document.addEventListener('DOMContentLoaded', function() {
  console.log('Combined Splitra Script Running');
  
  // Mock data
  const mockData = {
    user: {
      balance: 3.45,
      totalContracts: 12,
      activeContracts: 7,
      activeCollaborators: 18
    }
  };
  
  // Format currency function
  function formatCurrency(value) {
    return value.toFixed(5) + ' ETH';
  }
  
  // Initialize stats
  function initializeStats() {
    console.log('Initializing stats in combined script');
    
    setTimeout(function() {
      // Balance
      const balanceElement = document.querySelector('.stat-value-balance');
      if (balanceElement) {
        console.log('Found balance element:', balanceElement);
        balanceElement.textContent = formatCurrency(mockData.user.balance);
        console.log('Set balance to:', formatCurrency(mockData.user.balance));
      } else {
        console.log('Could not find balance element');
      }
      
      // Total contracts
      const contractsElement = document.querySelector('.stat-value-total');
      if (contractsElement) {
        console.log('Found contracts element:', contractsElement);
        contractsElement.textContent = mockData.user.totalContracts.toString();
        console.log('Set contracts to:', mockData.user.totalContracts);
      } else {
        console.log('Could not find contracts element');
      }
      
      // Active contracts
      const activeElement = document.querySelector('.stat-value-active');
      if (activeElement) {
        console.log('Found active element:', activeElement);
        activeElement.textContent = mockData.user.activeContracts.toString();
        console.log('Set active contracts to:', mockData.user.activeContracts);
      } else {
        console.log('Could not find active element');
      }
      
      // Collaborators
      const collabElement = document.querySelector('.stat-value-collab');
      if (collabElement) {
        console.log('Found collab element:', collabElement);
        collabElement.textContent = mockData.user.activeCollaborators.toString();
        console.log('Set collaborators to:', mockData.user.activeCollaborators);
      } else {
        console.log('Could not find collab element');
      }
      
      // Update monthly values
      const monthlyValue = '1.2 ETH this month.';
      
      const balanceMonthElement = document.querySelector('.user-balance-value');
      if (balanceMonthElement) {
        balanceMonthElement.textContent = monthlyValue;
        console.log('Updated balance monthly value');
      }
      
      console.log('Stats initialization complete');
    }, 500); // Slightly longer timeout
  }
  
  // Run initialization
  initializeStats();
});
