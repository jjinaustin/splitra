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
    item.style.flexDirection = 'column';
    item.style.marginBottom = '12px';
    item.style.padding = '12px';
    item.style.borderRadius = '8px';
    item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    
    // Top row with contract info and amount
    const topRow = document.createElement('div');
    topRow.style.display = 'flex';
    topRow.style.justifyContent = 'space-between';
    topRow.style.alignItems = 'center';
    topRow.style.marginBottom = '8px';
    
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
    
    // Right side - Payment amount
    const amount = document.createElement('div');
    amount.className = 'payment-amount';
    amount.style.fontWeight = 'bold';
    amount.textContent = SplFormatting.formatCurrency(payment.amount, payment.currency);
    
    // Bottom row with date and progress
    const bottomRow = document.createElement('div');
    bottomRow.style.display = 'flex';
    bottomRow.style.flexDirection = 'column';
    
    // Payment info row
    const infoRow = document.createElement('div');
    infoRow.style.display = 'flex';
    infoRow.style.justifyContent = 'space-between';
    infoRow.style.marginBottom = '4px';
    
    // User share
    const userShare = document.createElement('div');
    userShare.className = 'payment-share';
    userShare.style.fontSize = '14px';
    userShare.style.color = '#888';
    
    // Find user's share in the contract
    const userParticipant = contract.participants.find(p => p.isCurrentUser);
    if (userParticipant) {
      userShare.textContent = `Your share: ${userParticipant.revenueShare}%`;
    } else {
      userShare.textContent = 'Your share: -';
    }
    
    // Payment date
    const date = document.createElement('div');
    date.className = 'payment-date';
    date.style.fontSize = '14px';
    date.style.color = '#888';
    date.textContent = `Expected: ${SplFormatting.formatDate(payment.date)}`;
    
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
    
    // Assemble the payment item
    contractInfo.appendChild(icon);
    contractInfo.appendChild(contractName);
    
    topRow.appendChild(contractInfo);
    topRow.appendChild(amount);
    
    infoRow.appendChild(userShare);
    infoRow.appendChild(date);
    
    progressContainer.appendChild(progressBar);
    
    bottomRow.appendChild(infoRow);
    bottomRow.appendChild(progressContainer);
    
    item.appendChild(topRow);
    item.appendChild(bottomRow);
    
    return item;
  },
  
  // Update payment item
  updatePaymentItem: function(item, payment) {
    // Get contract
    const contract = SplMockData.getContractById ? 
      SplMockData.getContractById(payment.contractId) : 
      SplMockData.contracts.find(c => c.id === payment.contractId);
      
    if (!contract) return;
    
    // Find elements
    const contractName = item.querySelector('.payment-contract-name');
    const amount = item.querySelector('.payment-amount');
    const date = item.querySelector('.payment-date');
    const progressBar = item.querySelector('.payment-progress');
    
    // Update content
    if (contractName) {
      contractName.textContent = contract.title;
    }
    
    if (amount) {
      amount.textContent = SplFormatting.formatCurrency(payment.amount, payment.currency);
    }
    
    if (date) {
      date.textContent = `Expected: ${SplFormatting.formatDate(payment.date)}`;
    }
    
    if (progressBar) {
      // Update progress
      const now = new Date();
      const paymentDate = new Date(payment.date);
      const daysDiff = Math.round((paymentDate - now) / (1000 * 60 * 60 * 24));
      const progressPercent = Math.max(0, Math.min(100, (30 - daysDiff) / 30 * 100));
      
      progressBar.style.width = `${progressPercent}%`;
    }
  }
};
