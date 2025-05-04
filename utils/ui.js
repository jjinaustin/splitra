// UI utility functions
const SplUI = {
  // Log with prefix
  log: function(message, data) {
    if (SplConfig.enableLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    let toast = document.getElementById('splitra-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'splitra-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.padding = '12px 20px';
      toast.style.backgroundColor = '#1c1c1c';
      toast.style.color = '#ffffff';
      toast.style.borderRadius = '6px';
      toast.style.zIndex = '9999';
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      toast.style.border = '1px solid rgba(255, 255, 255, 0.1)';
      toast.style.maxWidth = '300px';
      toast.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      
      document.body.appendChild(toast);
    }
    
    // Set message and style
    toast.textContent = message;
    toast.style.borderLeft = type === 'success' 
      ? '4px solid #4CAF50' 
      : type === 'error'
        ? '4px solid #F44336'
        : '4px solid #2196F3';
    
    // Show toast
    setTimeout(() => {
      toast.style.opacity = '1';
    }, 10);
    
    // Hide after duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  },
  
  // Copy to clipboard
  copyToClipboard: function(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => this.log('Text copied to clipboard'))
        .catch(err => this.error('Failed to copy: ', err));
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
        this.log('Text copied to clipboard (fallback)');
      } catch (err) {
        this.error('Failed to copy: ', err);
      }
      document.body.removeChild(textarea);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
    if (!SplConfig.useTestData) return;
    
    const indicator = document.createElement('div');
    indicator.id = 'test-mode-indicator';
    indicator.textContent = 'TEST MODE';
    indicator.style.position = 'fixed';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.backgroundColor = 'rgba(255, 87, 34, 0.9)';
    indicator.style.color = 'white';
    indicator.style.padding = '4px 8px';
    indicator.style.borderRadius = '4px';
    indicator.style.fontSize = '12px';
    indicator.style.fontWeight = 'bold';
    indicator.style.zIndex = '9999';
    
    document.body.appendChild(indicator);
  }
};
