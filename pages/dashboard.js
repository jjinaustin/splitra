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

