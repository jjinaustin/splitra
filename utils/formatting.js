// Utility functions for formatting data
const SplFormatting = {
  // Format currency values
  formatCurrency: function(value, currency = SplConfig.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
    if (currency === 'ETH') {
      return value.toFixed(5) + ' ETH';
    } else if (currency === 'USD') {
      return '$' + value.toLocaleString('en-US', {
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2
      });
    }
    
    return value.toString();
  },
  
  // Format date to relative time (e.g., "2 days ago")
  formatRelativeTime: function(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as readable string
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Format percentage
  formatPercentage: function(value) {
    return Math.round(value) + '%';
  }
};
