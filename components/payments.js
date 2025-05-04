// Upcoming payments component
const SplPayments = {
  // Initialize upcoming payments
  initialize: function() {
    SplUI.log('Initializing upcoming payments');
    
    // Find container
    const container = document.querySelector('.upcoming-payments, .payments-list');
    if (!container) {
      SplUI.log('No upcoming payments container found');
      return;
    }
    
    // Get payments data
    const payments = SplMockData.getUpcomingPayments ? 
      SplMockData.getUpcomingPayments(4) : 
      SplMockData.upcomingPayments.slice(0, 4);
    
    // Check for existing payment items
    const existingItems = container.querySelectorAll('.payment-item');
    
    if (existingItems.length > 0) {
      // Update existing items
      existingItems.forEach((item, index) => {
        if (index < payments.length) {
          this.updatePaymentItem(item, payments[index]);
        } else {
          item.style.display = 'none';
        }
      });
    } else {
      // Create new items
      payments.forEach(payment => {
        const item = this.createPaymentItem(payment);
        container.appendChild(item);
      });
    }
    
    SplUI.log('Upcoming payments initialized');
  },
  
  // Create payment item
  createPaymentItem: function(payment) {
    // Get contract info
    const contract = SplMockData.getContractById ? 
      SplMockData.getContractById(payment.contractId) : 
      SplMockData.contracts.find(c => c.id === payment.contractId);
      
    if (!contract) return null;
    
    const item = document.createElement('div');
    item.className = 'payment-item';
    item.setAttribute('data-payment-id', payment.id);
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.justifyContent = 'space-between';
    item.style.marginBottom = '12px';
    item.style.padding = '12px';
    item.style.borderRadius = '8px';
    item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    
    // Left side - Contract info
    const contractInfo = document.createElement('div');
    contractInfo.className = 'payment-contract';
    contractInfo.style.display = 'flex';
    contractInfo.style.alignItems = 'center';
    
    // Contract icon
    const icon = document.createElement('div');
    icon.className = 'payment-icon';
    icon.style.width = '32px';
    icon.style.height = '32px';
    icon.style.backgroundColor = '#3B82F6';
    icon.style.borderRadius = '50%';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.marginRight = '12px';
    icon.textContent = '💰';
    
    // Contract name
    const contractName = document.createElement('div');
    contractName.className = 'payment-contract-name';
    contractName.style.fontWeight = 'bold';
    contractName.textContent = contract.title;
    
    // Right side - Payment details
    const paymentDetails = document.createElement('div');
    paymentDetails.className = 'payment-details';
    paymentDetails.style.display = 'flex';
    paymentDetails.style.alignItems = 'center';
    
    // Payment amount
    const amount = document.createElement('div');
    amount.className = 'payment-amount';
    amount.style.fontWeight = 'bold';
    amount.style.marginRight = '12px';
    amount.textContent = SplFormatting.formatCurrency(payment.amount, payment.currency);
    
    // Payment date
    const date = document.createElement('div');
    date.className = 'payment-date';
    date.style.fontSize = '14px';
    date.style.color = '#888';
    date.textContent = SplFormatting.formatDate(payment.date);
    
    // Progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'payment-progress-container';
    progressContainer.style.width = '100%';
    progressContainer.style.height = '4px';
    progressContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    progressContainer.style.borderRadius = '2px';
    progressContainer.style.marginTop = '8px';
    
    // Calculate days until payment
    const now = new Date();
    const paymentDate = new Date(payment.date);
    const daysDiff = Math.round((paymentDate - now) / (1000 * 60 * 60 * 24));
    const progressPercent = Math.max(0, Math.min(100, (30 - daysDiff) / 30 * 100));
    
    // Progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'payment-progress';
    progressBar.style.width = `${progressPercent}%`;
    progressBar.style.height = '100%';
    progressBar.style.backgroundColor = '#3B82F6';
    progressBar.style.borderRadius = '2px';
    
    //
