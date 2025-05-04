// Dashboard page initialization
const SplDashboard = {
  // Initialize dashboard
  initialize: function() {
    console.log('Initializing Splitra Dashboard');
    
    // Add test mode indicator
    if (SplConfig.useTestData) {
      SplUI.addTestModeIndicator();
    }
    
    // Initialize components
    this.initializeComponents();
    
    console.log('Splitra Dashboard initialized');
  },
  
  // Initialize dashboard components
  initializeComponents: function() {
    try {
      // Initialize stats
      SplStats.initialize();
      
      // Initialize contract cards
      SplContracts.initialize();
      
      // Initialize filter buttons
      SplFilters.initialize();
      
      // Initialize activities
      SplActivities.initialize();
      
      // Initialize upcoming payments
      SplPayments.initialize();
      
      // Initialize charts
      SplCharts.initialize();
      
      // Show success message
      SplUI.showToast('Dashboard initialized with test data');
    } catch (error) {
      console.error('Error initializing dashboard:', error);
      SplUI.showToast('Error initializing dashboard', 'error');
    }
  }
};

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  SplDashboard.initialize();
});

// Debug code to check if all necessary objects are loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM content loaded');
  console.log('SplConfig available:', typeof SplConfig !== 'undefined');
  console.log('SplMockData available:', typeof SplMockData !== 'undefined');
  console.log('SplFormatting available:', typeof SplFormatting !== 'undefined');
  console.log('SplUI available:', typeof SplUI !== 'undefined');
  console.log('SplStats available:', typeof SplStats !== 'undefined');
  
  // Check if data is available
  if (typeof SplMockData !== 'undefined') {
    console.log('User balance:', SplMockData.user.balance);
  }
  
  // Force direct DOM updates for testing
  setTimeout(function() {
    console.log('Attempting direct DOM updates');
    const balanceElement = document.querySelector('.stat-value-balance');
    if (balanceElement) {
      balanceElement.textContent = '3.45 ETH';
      console.log('Directly updated balance element');
    } else {
      console.log('Could not find balance element for direct update');
    }
  }, 1000);
});
