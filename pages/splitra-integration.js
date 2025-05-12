// Initialize withdraw functionality
function initializeWithdrawFunctionality() {
  // Set up main withdraw button
  const mainWithdrawButton = document.querySelector('.balance-categorys-button.withdraw');
  if (mainWithdrawButton) {
    mainWithdrawButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get total balance
      const balanceText = document.querySelector('.wallets-balance-code').textContent;
      
      // Show withdraw modal for total balance
      showWithdrawModal('Total Balance', balanceText);
    });
  }
  
  // Set up contract withdraw buttons
  const contractWithdrawButtons = document.querySelectorAll('.withdraw-button.withdraw');
  contractWithdrawButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get contract details
      const contractCard = this.closest('.contract-balance-card');
      const contractName = contractCard.querySelector('.contract-balance-card-title').textContent;
      const balanceText = contractCard.querySelector('.available-balance-value1').textContent;
      
      // Show withdraw modal for contract
      showWithdrawModal(contractName, balanceText);
    });
  });
}

// Show withdraw modal
function showWithdrawModal(sourceName, balanceText) {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'withdraw-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';
  
  // Parse balance
  const balanceValue = parseFloat(balanceText);
  const balanceCurrency = balanceText.includes('ETH') ? 'ETH' : balanceText.split(' ')[1];
  
  // Estimated gas fee
  const estimatedGas = 0.002;
  
  // Load connected wallets
  loadConnectedWallets().then(wallets => {
    // If no wallets are connected, show error
    if (wallets.length === 0) {
      document.body.removeChild(modal);
      showErrorMessage('No wallet connected. Please connect a wallet in Payment Settings.');
      return;
    }
    
    // Find primary wallet
    const primaryWallet = wallets.find(wallet => wallet.isPrimary) || wallets[0];
    
    // Create wallet options HTML
    let walletOptionsHtml = '';
    wallets.forEach(wallet => {
      walletOptionsHtml += `
        <option value="${wallet.id}" ${wallet.isPrimary ? 'selected' : ''}>
          ${wallet.type} ${wallet.isPrimary ? '(Primary)' : ''} - ${wallet.address}
        </option>
      `;
    });
    
    // Create modal content
    modal.innerHTML = `
      <div class="modal-content" style="background-color: #1E293B; border-radius: 12px; padding: 24px; width: 400px; max-width: 90%; position: relative;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h3 style="margin: 0; color: white; font-size: 18px; font-weight: 600;">Withdraw from ${sourceName}</h3>
          <div class="close-modal" style="cursor: pointer; color: rgba(255, 255, 255, 0.6); font-size: 24px;">×</div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <div style="color: rgba(255, 255, 255, 0.6); font-size: 14px; margin-bottom: 6px;">Available Balance</div>
          <div style="color: #3B82F6; font-size: 22px; font-weight: 600;">${balanceText}</div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <div style="color: rgba(255, 255, 255, 0.6); font-size: 14px; margin-bottom: 6px;">Select Wallet</div>
          <select class="wallet-select" style="width: 100%; padding: 12px; background-color: #111927; border: 1px solid #2D3748; border-radius: 6px; color: white; font-size: 14px;">
            ${walletOptionsHtml}
          </select>
        </div>
        
        <div style="margin-bottom: 20px;">
          <div style="color: rgba(255, 255, 255, 0.6); font-size: 14px; margin-bottom: 6px;">Withdraw Amount</div>
          <div style="position: relative;">
            <input type="text" class="withdraw-amount" placeholder="0.00" value="${balanceValue}" style="width: 100%; padding: 12px; background-color: #111927; border: 1px solid #2D3748; border-radius: 6px; color: white; font-size: 14px; box-sizing: border-box;">
            <div style="position: absolute; right: 12px; top: 12px; color: rgba(255, 255, 255, 0.6);">${balanceCurrency}</div>
          </div>
          <div style="display: flex; justify-content: space-between; margin-top: 8px;">
            <div style="color: rgba(255, 255, 255, 0.6); font-size: 12px;">Est. Gas Fee: ${estimatedGas} ${balanceCurrency}</div>
            <div style="color: #3B82F6; font-size: 12px; cursor: pointer;" class="max-amount">Max</div>
          </div>
        </div>
        
        <button class="withdraw-submit" style="width: 100%; padding: 12px; background-color: #3B82F6; color: white; border: none; border-radius: 6px; font-size: 14px; font-weight: 500; cursor: pointer;">Withdraw</button>
      </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    
    // Set up close button
    const closeButton = modal.querySelector('.close-modal');
    closeButton.addEventListener('click', function() {
      document.body.removeChild(modal);
    });
    
    // Close when clicking outside the modal
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    // Set up max amount button
    const maxButton = modal.querySelector('.max-amount');
    const amountInput = modal.querySelector('.withdraw-amount');
    
    maxButton.addEventListener('click', function() {
      // Set to balance minus gas fee
      const maxAmount = Math.max(0, balanceValue - estimatedGas).toFixed(8);
      amountInput.value = maxAmount;
    });
    
    // Set up withdraw submit button
    const submitButton = modal.querySelector('.withdraw-submit');
    submitButton.addEventListener('click', function() {
      // Get values
      const selectedWalletId = modal.querySelector('.wallet-select').value;
      const withdrawAmount = parseFloat(amountInput.value);
      
      // Validate amount
      if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        showErrorMessage('Please enter a valid amount');
        return;
      }
      
      if (withdrawAmount > balanceValue) {
        showErrorMessage('Insufficient balance');
        return;
      }
      
      if (withdrawAmount + estimatedGas > balanceValue) {
        showErrorMessage(`Insufficient balance for gas fee. Maximum withdrawal: ${(balanceValue - estimatedGas).toFixed(8)} ${balanceCurrency}`);
        return;
      }
      
      // Process the withdrawal
      processWithdrawal(sourceName, selectedWalletId, withdrawAmount, balanceCurrency, modal);
    });
  }).catch(error => {
    console.error('Error loading wallets:', error);
    document.body.removeChild(modal);
    showErrorMessage('Failed to load wallet information. Please try again.');
  });
}

// Process withdrawal
async function processWithdrawal(sourceName, walletId, amount, currency, modal) {
  try {
    // Update UI
    const submitButton = modal.querySelector('.withdraw-submit');
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    submitButton.style.backgroundColor = '#2563EB';
    
    // Process with Firebase if available
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        
        // Get wallet details
        const walletDoc = await db.collection('users').doc(user.uid)
          .collection('paymentMethods')
          .doc(walletId)
          .get();
        
        let walletData = { address: 'Unknown wallet' };
        if (walletDoc.exists) {
          walletData = walletDoc.data();
        }
        
        // Create withdrawal record
        await db.collection('users').doc(user.uid).collection('withdrawals').add({
          source: sourceName,
          amount: amount,
          currency: currency,
          walletId: walletId,
          walletAddress: walletData.address,
          walletType: walletData.type || 'Unknown',
          status: 'pending',
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Close modal
        document.body.removeChild(modal);
        
        // Show success message
        showSuccessMessage(`Withdrawal initiated. ${amount} ${currency} will be sent to your wallet.`);
        
        // Reload after delay
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        
        return;
      }
    }
    
    // If no Firebase or not authenticated, simulate for development
    setTimeout(() => {
      // Close modal
      document.body.removeChild(modal);
      
      // Show success message
      showSuccessMessage(`Withdrawal initiated. ${amount} ${currency} will be sent to your wallet.`);
      
      // Reload after delay
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }, 2000);
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    
    // Reset button
    const submitButton = modal.querySelector('.withdraw-submit');
    submitButton.textContent = 'Withdraw';
    submitButton.disabled = false;
    submitButton.style.backgroundColor = '#3B82F6';
    
    // Show error
    showErrorMessage('Failed to process withdrawal. Please try again.');
  }
}

// Initialize common components
function initializeCommonComponents() {
  // Fix animations that might be hidden initially
  fixAnimations();
  
  // Initialize dark mode toggle
  initializeDarkMode();
  
  // Initialize mobile navigation
  initializeMobileNav();
  
  // Initialize tooltips
  initializeTooltips();
}

// Fix animations
function fixAnimations() {
  // Find elements with opacity 0 and reveal them
  const animatedElements = document.querySelectorAll('[data-w-id]');
  animatedElements.forEach(element => {
    if (element.style.opacity === '0') {
      element.style.opacity = '1';
    }
  });
}

// Initialize dark mode
function initializeDarkMode() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');
  if (!darkModeToggle) return;
  
  // Check saved preference
  const isDarkMode = localStorage.getItem('splitra-dark-mode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.classList.add('active');
  }
  
  // Set up toggle
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const isNowDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('splitra-dark-mode', isNowDark);
    
    // Update toggle appearance
    darkModeToggle.classList.toggle('active', isNowDark);
  });
}

// Initialize mobile navigation
function initializeMobileNav() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const sidebar = document.querySelector('.sidebar');
  
  if (!mobileMenuButton || !sidebar) return;
  
  mobileMenuButton.addEventListener('click', function() {
    sidebar.classList.toggle('open');
    mobileMenuButton.classList.toggle('active');
  });
  
  // Close sidebar when clicking outside
  document.addEventListener('click', function(e) {
    if (sidebar.classList.contains('open') && 
        !sidebar.contains(e.target) && 
        !mobileMenuButton.contains(e.target)) {
      sidebar.classList.remove('open');
      mobileMenuButton.classList.remove('active');
    }
  });
}

// Initialize tooltips
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    const tooltipText = element.getAttribute('data-tooltip');
    
    // Create tooltip
    element.addEventListener('mouseenter', function(e) {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = tooltipText;
      tooltip.style.position = 'absolute';
      tooltip.style.backgroundColor = 'rgba(30, 41, 59, 0.95)';
      tooltip.style.color = 'white';
      tooltip.style.padding = '8px 12px';
      tooltip.style.borderRadius = '4px';
      tooltip.style.fontSize = '12px';
      tooltip.style.zIndex = '1000';
      tooltip.style.pointerEvents = 'none';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
      
      // Position tooltip
      const rect = element.getBoundingClientRect();
      tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = rect.bottom + 8 + 'px';
      
      // Add to document
      document.body.appendChild(tooltip);
      
      // Store reference to tooltip
      element._tooltip = tooltip;
    });
    
    // Remove tooltip
    element.addEventListener('mouseleave', function() {
      if (element._tooltip && document.body.contains(element._tooltip)) {
        document.body.removeChild(element._tooltip);
        element._tooltip = null;
      }
    });
  });
}

// Initialize dashboard page
function initializeDashboardPage() {
  console.log('Initializing Dashboard Page');
  
  // Load Chart.js for dashboard charts
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js', function() {
    // Initialize dashboard components
    initializeRevenueOverTimeChart();
    initializeRevenueByCategoryChart();
    initializeRevenueByContractChart();
    initializeRecentActivity();
    
    console.log('Dashboard Page initialization complete');
  });
}

// Initialize contract details page
function initializeContractDetailsPage(contractId) {
  console.log('Initializing Contract Details Page for contract ID:', contractId);
  
  // Load Chart.js for contract charts
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js', function() {
    // Load contract data
    loadContractData(contractId).then(data => {
      // Initialize contract components
      initializeContractCard(data);
      initializeContributorsTable(data.contributors);
      initializeContractCharts(data);
      initializeBlockchainInfo(data.blockchain);
      initializeRecentActivity(data.recentActivity);
      
      console.log('Contract Details Page initialization complete');
    }).catch(error => {
      console.error('Error loading contract data:', error);
      showErrorMessage('Failed to load contract data. Please try again later.');
    });
  });
}

// Initialize contracts page
function initializeContractsPage() {
  console.log('Initializing Contracts Page');
  
  // Load contracts list
  loadContractsList().then(contracts => {
    // Initialize contracts list
    updateContractsList(contracts);
    
    // Set up filter/sort functionality
    initializeContractsFilters();
    
    console.log('Contracts Page initialization complete');
  }).catch(error => {
    console.error('Error loading contracts list:', error);
    showErrorMessage('Failed to load contracts. Please try again later.');
  });
}

// Data loading functions
async function loadPaymentData() {
  // Try to load from Firebase if available
  if (typeof firebase !== 'undefined' && firebase.auth) {
    try {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        const balanceDoc = await db.collection('users').doc(user.uid)
          .collection('payments')
          .doc('balance')
          .get();
        
        if (balanceDoc.exists) {
          return balanceDoc.data();
        }
      }
    } catch (error) {
      console.error('Error loading payment data from Firebase:', error);
    }
  }
  
  // Return sample data
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    pendingValues: [0.3, 0.35, 0.42, 0.38, 0.45, 0.52, 0.60, 0.67, 0.75],
    earnedValues: [0.4, 0.45, 0.53, 0.58, 0.67, 0.78, 0.92, 1.15, 1.30]
  };
}

async function loadContractBalances() {
  // Try to load from Firebase if available
  if (typeof firebase !== 'undefined' && firebase.auth) {
    try {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        const contractsQuery = await db.collection('users').doc(user.uid)
          .collection('contracts')
          .get();
        
        if (!contractsQuery.empty) {
          return contractsQuery.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name || 'Unnamed Contract',
              availableBalance: data.availableBalance || '0.00',
              lastPayment: data.lastPayment || '0.00',
              currency: data.currency || 'ETH'
            };
          });
        }
      }
    } catch (error) {
      console.error('Error loading contract balances from Firebase:', error);
    }
  }
  
  // Return sample data
  return [
    {
      id: 'contract-001',
      name: 'Summer Album Project',
      availableBalance: '3.45',
      lastPayment: '3.45',
      currency: 'ETH'
    },
    {
      id: 'contract-002',
      name: 'Music Video Collaboration',
      availableBalance: '1.75',
      lastPayment: '0.85',
      currency: 'ETH'
    },
    {
      id: 'contract-003',
      name: 'Podcast Series',
      availableBalance: '0.92',
      lastPayment: '0.45',
      currency: 'ETH'
    },
    {
      id: 'contract-004',
      name: 'NFT Collection',
      availableBalance: '2.10',
      lastPayment: '1.20',
      currency: 'ETH'
    }
  ];
}

async function loadTransactionHistory() {
  // Try to load from Firebase if available
  if (typeof firebase !== 'undefined' && firebase.auth) {
    try {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        const transactionsQuery = await db.collection('users').doc(user.uid)
          .collection('transactions')
          .orderBy('timestamp', 'desc')
          .limit(10)
          .get();
        
        if (!transactionsQuery.empty) {
          return transactionsQuery.docs.map(doc => {
            const data = doc.data();
            const timestamp = data.timestamp ? data.timestamp.toDate() : new Date();
            
            return {
              id: doc.id,
              contractId: data.contractId || '',
              contractName: data.contractName || 'Unknown Contract',
              date: formatDate(timestamp),
              category: data.category || 'Uncategorized',
              amount: `${data.amount || '0.00'} ${data.currency || 'ETH'}`,
              status: data.status || 'Completed'
            };
          });
        }
      }
    } catch (error) {
      console.error('Error loading transaction history from Firebase:', error);
    }
  }
  
  // Return sample data
  return [
    {
      id: 'TRX78965',
      contractId: 'contract-001',
      contractName: 'Art Collection NFT',
      date: 'Apr 29, 2025',
      category: 'Streaming',
      amount: '0.203150136249 ETH',
      status: 'Completed'
    },
    {
      id: 'TRX78964',
      contractId: 'contract-002',
      contractName: 'Art Collection NFT',
      date: 'Apr 25, 2025',
      category: 'Streaming',
      amount: '0.203150136249 ETH',
      status: 'Completed'
    },
    {
      id: 'TRX78963',
      contractId: 'contract-003',
      contractName: 'Art Collection NFT',
      date: 'Apr 20, 2025',
      category: 'Streaming',
      amount: '0.203150136249 ETH',
      status: 'Completed'
    },
    {
      id: 'TRX78962',
      contractId: 'contract-004',
      contractName: 'Art Collection NFT',
      date: 'Apr 15, 2025',
      category: 'Streaming',
      amount: '0.203150136249 ETH',
      status: 'Completed'
    },
    {
      id: 'TRX78961',
      contractId: 'contract-001',
      contractName: 'Art Collection NFT',
      date: 'Apr 10, 2025',
      category: 'Streaming',
      amount: '0.203150136249 ETH',
      status: 'Completed'
    },
    {
      id: 'TRX78960',
      contractId: 'contract-002',
      contractName: 'Art Collection NFT',
      date: 'Apr 5, 2025',
      category: 'Streaming',
      amount: '0.203150136249 ETH',
      status: 'Completed'
    }
  ];
}

async function loadConnectedWallets() {
  // Try to load from Firebase if available
  if (typeof firebase !== 'undefined' && firebase.auth) {
    try {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        
        // Get primary wallet
        const primaryDoc = await db.collection('users').doc(user.uid)
          .collection('paymentMethods')
          .doc('primary')
          .get();
        
        let primaryWalletId = null;
        if (primaryDoc.exists) {
          primaryWalletId = primaryDoc.data().walletId;
        }
        
        // Get all wallets
        const walletsQuery = await db.collection('users').doc(user.uid)
          .collection('paymentMethods')
          .where(firebase.firestore.FieldPath.documentId(), '!=', 'primary')
          .get();
        
        if (!walletsQuery.empty) {
          return walletsQuery.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              type: data.type || 'Unknown Wallet',
              address: data.address || 'Unknown Address',
              isPrimary: doc.id === primaryWalletId,
              icon: getWalletIcon(data.type)
            };
          });
        }
      }
    } catch (error) {
      console.error('Error loading connected wallets from Firebase:', error);
    }
  }
  
  // Return sample data
  return [
    {
      id: 'wallet-1',
      type: 'Metamask',
      address: '0x71C...F32B',
      isPrimary: true,
      icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681d2ca3d8039fa06c7a71d4_Notifications%20Img3.png'
    },
    {
      id: 'wallet-2',
      type: 'Coinbase Wallet',
      address: '0x71C...F32B',
      isPrimary: false,
      icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681d2ca3d8039fa06c7a71d4_Notifications%20Img3.png'
    }
  ];
}

// Helper Functions
function getCurrentUser() {
  return new Promise((resolve, reject) => {
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    } else {
      resolve(null);
    }
  });
}

function getContractIdFromUrl() {
  const path = window.location.pathname;
  const parts = path.split('/');
  
  // Return the last part of the URL
  return parts[parts.length - 1];
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatCurrency(value) {
  return parseFloat(value).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function updateElementText(selector, text) {
  const element = document.querySelector(selector);
  if (element) {
    element.textContent = text;
  } else {
    console.warn(`Element not found: ${selector}`);
  }
}

function loadScript(url, callback) {
  // Check if script is already loaded
  const existingScript = document.querySelector(`script[src="${url}"]`);
  if (existingScript) {
    callback();
    return;
  }
  
  // Create script element
  const script = document.createElement('script');
  script.src = url;
  script.onload = callback;
  script.onerror = function() {
    console.error(`Failed to load script: ${url}`);
  };
  
  // Add to document
  document.head.appendChild(script);
}

function getWalletIcon(walletType) {
  // Default icon
  const defaultIcon = 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681d2ca3d8039fa06c7a71d4_Notifications%20Img3.png';
  
  // Return wallet-specific icons in the future
  return defaultIcon;
}

function showLoadingState() {
  // Check if loading overlay already exists
  let loadingOverlay = document.getElementById('splitra-loading-overlay');
  
  if (!loadingOverlay) {
    // Create loading overlay
    loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'splitra-loading-overlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(17, 24, 39, 0.8)';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '9999';
    
    // Create spinner
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.style.width = '40px';
    spinner.style.height = '40px';
    spinner.style.border = '4px solid rgba(59, 130, 246, 0.3)';
    spinner.style.borderRadius = '50%';
    spinner.style.borderTop = '4px solid rgba(59, 130, 246, 1)';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Add keyframes for spinner animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    
    // Add spinner to overlay
    loadingOverlay.appendChild(spinner);
    
    // Add overlay to document
    document.body.appendChild(loadingOverlay);
  } else {
    // Show existing overlay
    loadingOverlay.style.display = 'flex';
  }
}

function hideLoadingState() {
  const loadingOverlay = document.getElementById('splitra-loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.style.display = 'none';
  }
}

function showSuccessMessage(message) {
  showMessage(message, 'success');
}

function showErrorMessage(message) {
  showMessage(message, 'error');
}

function showMessage(message, type = 'info') {
  // Remove any existing message
  const existingMessage = document.querySelector('.splitra-message');
  if (existingMessage) {
    document.body.removeChild(existingMessage);
  }
  
  // Create message element
  const messageElement = document.createElement('div');
  messageElement.className = 'splitra-message';
  messageElement.style.position = 'fixed';
  messageElement.style.bottom = '20px';
  messageElement.style.right = '20px';
  messageElement.style.padding = '12px 20px';
  messageElement.style.borderRadius = '6px';
  messageElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  messageElement.style.zIndex = '10000';
  messageElement.style.display = 'flex';
  messageElement.style.alignItems = 'center';
  messageElement.style.maxWidth = '90%';
  messageElement.style.transition = 'opacity 0.3s ease';
  
  // Set style based on message type
  if (type === 'success') {
    messageElement.style.backgroundColor = 'rgba(34, 197, 94, 0.9)';
    messageElement.style.color = 'white';
    messageElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px;">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  } else if (type === 'error') {
    messageElement.style.backgroundColor = 'rgba(239, 68, 68, 0.9)';
    messageElement.style.color = 'white';
    messageElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `;
  } else {
    messageElement.style.backgroundColor = 'rgba(59, 130, 246, 0.9)';
    messageElement.style.color = 'white';
    messageElement.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 12px;">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
      </svg>
    `;
  }
  
  // Add message text
  const textSpan = document.createElement('span');
  textSpan.textContent = message;
  messageElement.appendChild(textSpan);
  
  // Add close button
  const closeButton = document.createElement('div');
  closeButton.style.marginLeft = '16px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.opacity = '0.7';
  closeButton.style.transition = 'opacity 0.3s ease';
  closeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;
  
  closeButton.addEventListener('mouseenter', function() {
    closeButton.style.opacity = '1';
  });
  
  closeButton.addEventListener('mouseleave', function() {
    closeButton.style.opacity = '0.7';
  });
  
  closeButton.addEventListener('click', function() {
    document.body.removeChild(messageElement);
  });
  
  messageElement.appendChild(closeButton);
  
  // Add to document
  document.body.appendChild(messageElement);
  
  // Auto-hide after 5 seconds
  setTimeout(function() {
    if (document.body.contains(messageElement)) {
      messageElement.style.opacity = '0';
      setTimeout(function() {
        if (document.body.contains(messageElement)) {
          document.body.removeChild(messageElement);
        }
      }, 300);
    }
  }, 5000);
}

// Additional Chart Initialization Functions

// Initialize Revenue Over Time Chart for Dashboard
function initializeRevenueOverTimeChart() {
  const chartContainer = document.querySelector('.revenue-over-time-chart');
  if (!chartContainer) return;
  
  // Sample data
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [0.4, 0.5, 0.7, 0.8, 1.1, 1.3, 1.5, 1.8, 2.1]
  };
  
  // Create canvas
  chartContainer.innerHTML = '<canvas id="revenue-over-time-chart"></canvas>';
  const canvas = document.getElementById('revenue-over-time-chart');
  
  // Create gradient
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)');
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
  
  // Create chart
  new Chart(canvas, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Revenue',
        data: data.values,
        backgroundColor: gradient,
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#fff',
        pointRadius: 4,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + ' ETH';
            }
          }
        }
      }
    }
  });
  
  // Update total revenue display if it exists
  const totalRevenueElement = document.querySelector('.revenue-over-time-total');
  if (totalRevenueElement) {
    const totalRevenue = data.values.reduce((sum, value) => sum + value, 0).toFixed(2);
    totalRevenueElement.textContent = `${totalRevenue} ETH`;
  }
}

// Initialize Revenue By Category Chart for Dashboard
function initializeRevenueByCategoryChart() {
  const chartContainer = document.querySelector('.revenue-by-category-chart');
  if (!chartContainer) return;
  
  // Sample data
  const data = {
    labels: ['Streaming', 'Sync Licensing', 'Merchandise', 'Live Performances'],
    values: [45, 30, 15, 10],
    amounts: [0.639, 0.426, 0.213, 0.142]
  };
  
  // Create canvas
  chartContainer.innerHTML = '<canvas id="revenue-by-category-chart"></canvas>';
  const canvas = document.getElementById('revenue-by-category-chart');
  
  // Create chart
  new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.values,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: 'rgba(255, 255, 255, 0.7)',
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const amount = data.amounts[context.dataIndex];
              return `${label}: ${value}% (${amount} ETH)`;
            }
          }
        }
      }
    }
  });
}

// Initialize Revenue By Contract Chart for Dashboard
function initializeRevenueByContractChart() {
  const chartContainer = document.querySelector('.revenue-by-contract-chart');
  if (!chartContainer) return;
  
  // Sample data
  const data = {
    contracts: [
      { id: 'contract-001', name: 'Summer Album Project', amount: 1.42, percentage: 27.5 },
      { id: 'contract-002', name: 'Music Video Collaboration', amount: 1.16, percentage: 22.5 },
      { id: 'contract-003', name: 'Podcast Series', amount: 0.92, percentage: 17.8 },
      { id: 'contract-004', name: 'NFT Collection', amount: 0.88, percentage: 17.1 },
      { id: 'contract-005', name: 'Studio Session', amount: 0.78, percentage: 15.1 }
    ]
  };
  
  // Create hint text
  const hintText = document.createElement('div');
  hintText.textContent = 'Click on a contract to view details';
  hintText.style.textAlign = 'right';
  hintText.style.fontSize = '12px';
  hintText.style.marginBottom = '8px';
  hintText.style.color = 'rgba(59, 130, 246, 0.9)';
  chartContainer.appendChild(hintText);
  
  // Create canvas
  const canvas = document.createElement('canvas');
  canvas.id = 'revenue-by-contract-chart';
  chartContainer.appendChild(canvas);
  
  // Create chart
  const chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: data.contracts.map(contract => contract.name),
      datasets: [{
        data: data.contracts.map(contract => contract.amount),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(168, 85, 247, 0.7)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const contract = data.contracts[context.dataIndex];
              return [
                `Amount: ${contract.amount} ETH`,
                `Percentage: ${contract.percentage}%`
              ];
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            callback: function(value) {
              return value + ' ETH';
            }
          }
        }
      },
      onClick: function(e, elements) {
        if (!elements || elements.length === 0) return;
        
        const index = elements[0].index;
        const clickedContract = data.contracts[index];
        
        // Navigate to the contract details page
        window.location.href = `/dashboard/contracts/${clickedContract.id}`;
      }
    }
  });
}

// Initialize Recent Activity
function initializeRecentActivity(activities) {
  if (!activities) {
    // Sample data
    activities = [
      {
        id: 'activity-001',
        type: 'payment_received',
        description: 'Payment Received: 0.25 ETH',
        timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
        icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681378b2dac1c6c28790e495_nft-2025-05-01-44c.svg'
      },
      {
        id: 'activity-002',
        type: 'contributor_joined',
        description: 'Contributor Joined: Taylor Kim',
        timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
        icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681378b2dac1c6c28790e495_nft-2025-05-01-44c.svg'
      },
      {
        id: 'activity-003',
        type: 'contract_deployed',
        description: 'Contract Deployed Successfully',
        timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 hours ago
        icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681378b2dac1c6c28790e495_nft-2025-05-01-44c.svg'
      }
    ];
  }
  
  // Find activity containers
  const activityContainers = document.querySelectorAll('.recent-activity-contents');
  if (activityContainers.length === 0) return;
  
  // Update each activity container
  activities.forEach((activity, index) => {
    if (index < activityContainers.length) {
      updateActivityContainer(activityContainers[index], activity);
    }
  });
}

// Update Activity Container
function updateActivityContainer(container, activity) {
  // Update icon
  const iconImg = container.querySelector('.contract-icon img');
  if (iconImg && activity.icon) {
    iconImg.src = activity.icon;
    iconImg.alt = activity.type;
  }
  
  // Update description
  const description = container.querySelector('.recent-activity-note-d, .recent-activity-note-c');
  if (description) {
    description.textContent = activity.description;
  }
  
  // Update time
  const timeElement = container.querySelector('.recent-activity-time');
  if (timeElement) {
    timeElement.textContent = formatTimeAgo(activity.timestamp);
  }
}

// Format Time Ago
function formatTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  
  // Convert to appropriate time units
  const minutes = Math.floor(diff / (60 * 1000));
  const hours = Math.floor(diff / (60 * 60 * 1000));
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  if (days > 0) {
    return `${days} ${days === 1 ? 'Day' : 'Days'} Ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'Hour' : 'Hours'} Ago`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'} Ago`;
  } else {
    return 'Just Now';
  }
}

// Export common functions to window object for use in other scripts
window.splitra = {
  getCurrentUser,
  showSuccessMessage,
  showErrorMessage,
  showLoadingState,
  hideLoadingState,
  formatCurrency,
  formatDate,
  formatTimeAgo
};

// Auto-initialize when document is ready
console.log('Splitra Webflow Integration Script loaded and ready');
// Initialize Firebase connection
function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not found. Loading app in development mode.');
    return;
  }
  
  try {
    // Check if Firebase is already initialized
    if (!firebase.apps.length) {
      // Initialize Firebase with your config
      const firebaseConfig = {
        apiKey: "AIzaSyDJOcBDsbUj1mMV3AkarkM6ItdUPgVUYDo",
        authDomain: "splitra-d3efc.firebaseapp.com",
        projectId: "splitra-d3efc",
        storageBucket: "splitra-d3efc.firebasestorage.app",
        messagingSenderId: "1006048798352",
        appId: "1:1006048798352:web:20b7b5788b8676b3301a15",
        measurementId: "G-EFZCDBJ523"
      };
      
      firebase.initializeApp(firebaseConfig);
    }
    
    // Set up authentication state observer
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in:', user.uid);
        loadUserProfileData(user);
      } else {
        console.log('No user is signed in');
        handleUnauthenticatedState();
      }
    });
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

// Load user profile data from Firebase
async function loadUserProfileData(user) {
  try {
    const db = firebase.firestore();
    const userDoc = await db.collection('users').doc(user.uid).get();
    
    if (userDoc.exists) {
      const userData = userDoc.data();
      
      // Update user profile display elements if they exist
      updateUserProfileDisplay(userData);
    } else {
      console.log('User document does not exist in Firestore');
      // Create user profile in Firestore if it doesn't exist
      await createUserProfile(user);
    }
  } catch (error) {
    console.error('Error loading user profile data:', error);
  }
}

// Create user profile in Firestore
async function createUserProfile(user) {
  try {
    const db = firebase.firestore();
    
    // Create basic user profile
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      role: 'creator',
      tier: 'free'
    });
    
    console.log('User profile created for:', user.uid);
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
}

// Update user profile display elements
function updateUserProfileDisplay(userData) {
  // Update username displays if they exist
  const usernameElements = document.querySelectorAll('.user-name, .username-display');
  usernameElements.forEach(element => {
    if (userData.displayName) {
      element.textContent = userData.displayName;
    }
  });
  
  // Update user avatar if it exists
  const avatarElements = document.querySelectorAll('.user-avatar img, .profile-image img');
  avatarElements.forEach(element => {
    if (userData.photoURL) {
      element.src = userData.photoURL;
    }
  });
  
  // Update user email displays if they exist
  const emailElements = document.querySelectorAll('.user-email, .email-display');
  emailElements.forEach(element => {
    if (userData.email) {
      element.textContent = userData.email;
    }
  });
  
  // Update user tier badges if they exist
  const tierElements = document.querySelectorAll('.user-tier, .tier-badge');
  tierElements.forEach(element => {
    if (userData.tier) {
      element.textContent = userData.tier.charAt(0).toUpperCase() + userData.tier.slice(1);
    }
  });
}

// Handle unauthenticated state
function handleUnauthenticatedState() {
  // Check if we're on a protected page
  const protectedPages = [
    '/dashboard',
    '/contracts',
    '/payments',
    '/profile',
    '/settings'
  ];
  
  // Get current path
  const currentPath = window.location.pathname;
  
  // Check if the current path is protected
  const isProtectedPage = protectedPages.some(page => currentPath.includes(page));
  
  if (isProtectedPage) {
    // Redirect to login page
    const loginUrl = '/login?redirect=' + encodeURIComponent(currentPath);
    window.location.href = loginUrl;
  }
}

// Initialize the page based on the current URL
function initializePageByUrl() {
  // Get current path
  const currentPath = window.location.pathname;
  
  // Initialize appropriate functionality based on path
  if (currentPath.includes('/payments')) {
    initializePaymentsPage();
  } else if (currentPath.includes('/contracts/')) {
    // Single contract detail page
    const contractId = getContractIdFromUrl();
    if (contractId) {
      initializeContractDetailsPage(contractId);
    }
  } else if (currentPath.includes('/contracts')) {
    // Contracts list page
    initializeContractsPage();
  } else if (currentPath.includes('/dashboard')) {
    initializeDashboardPage();
  }
  
  // Always initialize common components
  initializeCommonComponents();
}

// Initialize Payments Page
function initializePaymentsPage() {
  console.log('Initializing Payments Page');
  
  // Load and initialize payments page components
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js', function() {
    // Initialize balance chart
    initializeBalanceChart();
    
    // Initialize payment tabs
    initializePaymentTabs();
    
    // Initialize payment overview
    initializePaymentOverview();
    
    // Initialize payment history
    initializePaymentHistory();
    
    // Initialize payment settings
    initializePaymentSettings();
    
    // Initialize withdraw functionality
    initializeWithdrawFunctionality();
    
    console.log('Payments Page initialization complete');
  });
}

// Initialize the balance chart for payments page
function initializeBalanceChart() {
  // Check if chart container exists
  const chartContainer = document.querySelector('.pending-total-chart');
  if (!chartContainer) {
    console.warn('Balance chart container not found');
    return;
  }
  
  // Load payment data
  loadPaymentData().then(data => {
    // Create canvas for chart
    chartContainer.innerHTML = '<canvas id="balance-chart"></canvas>';
    const canvas = document.getElementById('balance-chart');
    
    // Create gradients for chart
    const ctx = canvas.getContext('2d');
    const pendingGradient = ctx.createLinearGradient(0, 0, 0, 300);
    pendingGradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    pendingGradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');
    
    const earnedGradient = ctx.createLinearGradient(0, 0, 0, 300);
    earnedGradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    earnedGradient.addColorStop(1, 'rgba(34, 197, 94, 0.0)');
    
    // Create chart
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Pending Payments',
            data: data.pendingValues,
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: pendingGradient,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: '#fff',
            pointRadius: 4
          },
          {
            label: 'Total Earned',
            data: data.earnedValues,
            borderColor: 'rgba(34, 197, 94, 1)',
            backgroundColor: earnedGradient,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(34, 197, 94, 1)',
            pointBorderColor: '#fff',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false  // Hide the legend as we have custom legend
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)'
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              callback: function(value) {
                return value + ' ETH';
              }
            }
          }
        }
      }
    });
    
    // Update balance text displays
    updateBalanceDisplays(data);
  });
}

// Update balance text displays
function updateBalanceDisplays(data) {
  // Get latest values from data
  const latestPending = data.pendingValues[data.pendingValues.length - 1];
  const latestEarned = data.earnedValues[data.earnedValues.length - 1];
  const totalBalance = latestPending; // In a real app, this might be calculated differently
  
  // Calculate USD values (using a sample exchange rate)
  const ethToUsdRate = 1700; // Sample ETH to USD rate
  const pendingUsd = (latestPending * ethToUsdRate).toFixed(2);
  const earnedUsd = (latestEarned * ethToUsdRate).toFixed(2);
  const totalUsd = (totalBalance * ethToUsdRate).toFixed(2);
  
  // Update elements
  updateElementText('.wallets-balance-code', `${totalBalance.toFixed(8)} ETH`);
  updateElementText('.wallets-balance-price', `${formatCurrency(totalUsd)} USD`);
  updateElementText('.wallets-balance-details-price:first-of-type', `${latestPending.toFixed(2)} ETH`);
  updateElementText('.wallets-balance-details-small:first-of-type', `${formatCurrency(pendingUsd)} USD`);
  updateElementText('.wallets-balance-details-price:last-of-type', `${latestEarned.toFixed(2)} ETH`);
  updateElementText('.wallets-balance-details-small:last-of-type', `${formatCurrency(earnedUsd)} USD`);
}

// Initialize payment tabs
function initializePaymentTabs() {
  // Webflow already handles tabs, but we can add additional functionality if needed
  // For example, saving the last active tab in localStorage
  
  const tabs = document.querySelectorAll('.w-tab-link');
  const tabContent = document.querySelectorAll('.w-tab-pane');
  
  // Get the active tab from localStorage or use the default
  const savedTab = localStorage.getItem('spllitra-payment-active-tab');
  if (savedTab) {
    // Find the tab with the matching data-w-tab attribute
    const tabToActivate = Array.from(tabs).find(tab => tab.getAttribute('data-w-tab') === savedTab);
    if (tabToActivate) {
      // Simulate a click on the tab to activate it
      tabToActivate.click();
    }
  }
  
  // Add click listeners to save the active tab
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabId = this.getAttribute('data-w-tab');
      localStorage.setItem('spllitra-payment-active-tab', tabId);
    });
  });
}

// Initialize payment overview tab
function initializePaymentOverview() {
  // Find the contract balance cards
  const contractCards = document.querySelectorAll('.contract-balance-card');
  if (contractCards.length === 0) {
    console.warn('No contract balance cards found');
    return;
  }
  
  // Load contract data
  loadContractBalances().then(contracts => {
    // Update each contract card
    contracts.forEach((contract, index) => {
      if (index < contractCards.length) {
        updateContractCard(contractCards[index], contract);
      }
    });
    
    // Show all cards (they may be hidden initially)
    contractCards.forEach(card => {
      card.style.opacity = '1';
    });
  });
  
  // Set up withdraw buttons
  const withdrawButtons = document.querySelectorAll('.withdraw-button');
  withdrawButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get contract data
      const card = this.closest('.contract-balance-card');
      const contractName = card.querySelector('.contract-balance-card-title').textContent;
      const availableBalance = card.querySelector('.available-balance-value1').textContent;
      
      // Show withdraw modal
      showWithdrawModal(contractName, availableBalance);
    });
  });
}

// Update a contract card with data
function updateContractCard(card, contract) {
  // Update contract name
  const nameElement = card.querySelector('.contract-balance-card-title');
  if (nameElement) {
    nameElement.textContent = contract.name;
  }
  
  // Update available balance
  const balanceElement = card.querySelector('.available-balance-value1');
  if (balanceElement) {
    balanceElement.textContent = `${contract.availableBalance} ${contract.currency}`;
  }
  
  // Update last payment
  const lastPaymentElement = card.querySelector('.last-payment-value');
  if (lastPaymentElement) {
    lastPaymentElement.textContent = `${contract.lastPayment} ${contract.currency}`;
  }
}

// Initialize payment history tab
function initializePaymentHistory() {
  // Find all cryptocurrency tables in the payment history section
  const tables = document.querySelectorAll('.payment-history-wrap .cryptocurrency-table');
  if (tables.length === 0) {
    console.warn('No payment history tables found');
    return;
  }
  
  // Load transaction data
  loadTransactionHistory().then(transactions => {
    // Update each table with transaction data
    transactions.forEach((transaction, index) => {
      if (index < tables.length) {
        updateTransactionTable(tables[index], transaction);
      }
    });
    
    // Show the payment history wrap (it may be hidden initially)
    const paymentHistoryWrap = document.querySelector('.payment-history-wrap');
    if (paymentHistoryWrap) {
      paymentHistoryWrap.style.opacity = '1';
    }
  });
}

// Update a transaction table with data
function updateTransactionTable(table, transaction) {
  // Find the grid with values
  const grid = table.querySelector('.revenue-table-grid-values');
  if (!grid) return;
  
  // Update transaction ID
  const idElement = grid.querySelector('.transaction-id');
  if (idElement) {
    idElement.textContent = '#' + transaction.id;
  }
  
  // Update contract name
  const nameElement = grid.querySelector('.rev-contract-name');
  if (nameElement) {
    nameElement.textContent = transaction.contractName;
  }
  
  // Update date
  const dateElement = grid.querySelector('.rev-date');
  if (dateElement) {
    dateElement.textContent = transaction.date;
  }
  
  // Update category
  const categoryElement = grid.querySelector('.rev-category');
  if (categoryElement) {
    categoryElement.textContent = transaction.category;
  }
  
  // Update amount
  const amountElement = grid.querySelector('.rev-amount');
  if (amountElement) {
    amountElement.textContent = transaction.amount;
  }
  
  // Update status
  const statusElement = grid.querySelector('.completed-tag');
  if (statusElement) {
    statusElement.textContent = transaction.status;
    
    // Apply appropriate styling based on status
    if (transaction.status.toLowerCase() === 'completed') {
      statusElement.style.backgroundColor = 'rgba(34, 197, 94, 0.2)';
      statusElement.style.color = '#4ADE80';
    } else if (transaction.status.toLowerCase() === 'pending') {
      statusElement.style.backgroundColor = 'rgba(250, 204, 21, 0.2)';
      statusElement.style.color = '#FACC15';
    } else if (transaction.status.toLowerCase() === 'failed') {
      statusElement.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
      statusElement.style.color = '#F87171';
    }
  }
}

// Initialize payment settings tab
function initializePaymentSettings() {
  // Check if payment settings tab exists
  const paymentSettings = document.querySelector('.tab-pane-tab-3');
  if (!paymentSettings) {
    console.warn('Payment settings tab not found');
    return;
  }
  
  // Load connected wallets
  loadConnectedWallets().then(wallets => {
    // Set up the "Add Method" button
    const addMethodButton = document.querySelector('.add-method-btn');
    if (addMethodButton) {
      addMethodButton.addEventListener('click', function(e) {
        e.preventDefault();
        showAddWalletModal();
      });
    }
    
    // Set up wallet management functionality
    setupWalletManagement(wallets);
  });
}

// Set up wallet management
function setupWalletManagement(wallets) {
  // Find wallet elements
  const walletElements = document.querySelectorAll('.notifications-box');
  
  // Setup primary wallet toggle
  const makePrimaryElements = document.querySelectorAll('.make-primary-wallet');
  makePrimaryElements.forEach(element => {
    element.addEventListener('click', function() {
      // Get wallet details
      const walletBox = this.closest('.notifications-box');
      const walletName = walletBox.querySelector('.payment-methods-title').textContent;
      const walletAddress = walletBox.querySelector('.address-truncated').textContent;
      
      // Make this wallet primary
      makeWalletPrimary(walletName, walletAddress);
    });
  });
  
  // Setup wallet removal
  const removeElements = document.querySelectorAll('.notifications-date-text-block');
  removeElements.forEach(element => {
    element.addEventListener('click', function() {
      // Get wallet details
      const walletBox = this.closest('.notifications-box');
      const walletName = walletBox.querySelector('.payment-methods-title').textContent;
      const walletAddress = walletBox.querySelector('.address-truncated').textContent;
      
      // Check if this is the primary wallet
      const isPrimary = walletBox.querySelector('.primary-tag') !== null;
      if (isPrimary) {
        showErrorMessage('You cannot remove your primary wallet. Please set another wallet as primary first.');
        return;
      }
      
      // Confirm removal
      if (confirm(`Are you sure you want to remove this ${walletName} wallet?`)) {
        removeWallet(walletName, walletAddress);
      }
    });
  });
}

// Make a wallet primary
async function makeWalletPrimary(walletName, walletAddress) {
  try {
    showLoadingState();
    
    // Update in Firebase if available
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        
        // Update the primary wallet
        await db.collection('users').doc(user.uid).collection('paymentMethods').doc('primary').set({
          type: walletName,
          address: walletAddress,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Show success message and refresh
        showSuccessMessage(`${walletName} is now your primary wallet`);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return;
      }
    }
    
    // Fallback for development
    showSuccessMessage(`${walletName} is now your primary wallet`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error('Error making wallet primary:', error);
    showErrorMessage('Failed to update primary wallet. Please try again.');
  } finally {
    hideLoadingState();
  }
}

// Remove a wallet
async function removeWallet(walletName, walletAddress) {
  try {
    showLoadingState();
    
    // Remove from Firebase if available
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        
        // Find the wallet to remove
        const walletsQuery = await db.collection('users').doc(user.uid).collection('paymentMethods')
          .where('address', '==', walletAddress)
          .get();
        
        if (!walletsQuery.empty) {
          // Delete the wallet
          await walletsQuery.docs[0].ref.delete();
          
          // Show success message and refresh
          showSuccessMessage(`${walletName} wallet removed successfully`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          return;
        }
      }
    }
    
    // Fallback for development
    showSuccessMessage(`${walletName} wallet removed successfully`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error('Error removing wallet:', error);
    showErrorMessage('Failed to remove wallet. Please try again.');
  } finally {
    hideLoadingState();
  }
}

// Show add wallet modal
function showAddWalletModal() {
  // Create modal element
  const modal = document.createElement('div');
  modal.className = 'add-wallet-modal';
  modal.style.position = 'fixed';
  modal.style.top = '0';
  modal.style.left = '0';
  modal.style.width = '100%';
  modal.style.height = '100%';
  modal.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  modal.style.display = 'flex';
  modal.style.justifyContent = 'center';
  modal.style.alignItems = 'center';
  modal.style.zIndex = '1000';
  
  // Wallet options
  const walletOptions = [
    { id: 'metamask', name: 'Metamask', icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681d2ca3d8039fa06c7a71d4_Notifications%20Img3.png' },
    { id: 'coinbase', name: 'Coinbase Wallet', icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681d2ca3d8039fa06c7a71d4_Notifications%20Img3.png' },
    { id: 'walletconnect', name: 'WalletConnect', icon: 'https://cdn.prod.website-files.com/67fe35b109b78d4e95b26b74/681d2ca3d8039fa06c7a71d4_Notifications%20Img3.png' }
  ];
  
  // Create modal content
  let modalContent = `
    <div class="modal-content" style="background-color: #1E293B; border-radius: 12px; padding: 24px; width: 400px; max-width: 90%; position: relative;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0; color: white; font-size: 18px; font-weight: 600;">Connect Wallet</h3>
        <div class="close-modal" style="cursor: pointer; color: rgba(255, 255, 255, 0.6); font-size: 24px;">×</div>
      </div>
      
      <div style="margin-bottom: 20px;">
  `;
  
  // Add wallet options
  walletOptions.forEach(wallet => {
    modalContent += `
      <div class="wallet-option" data-wallet-id="${wallet.id}" style="background-color: #111927; border-radius: 8px; padding: 12px; margin-bottom: 10px; display: flex; align-items: center; cursor: pointer;">
        <img src="${wallet.icon}" alt="${wallet.name}" style="width: 32px; height: 32px; margin-right: 12px;">
        <span style="color: white; font-weight: 500;">${wallet.name}</span>
      </div>
    `;
  });
  
  // Close the modal content
  modalContent += `
      </div>
      <p style="color: rgba(255, 255, 255, 0.6); font-size: 14px; text-align: center; margin-bottom: 0;">
        Connect a wallet to receive payments from your contracts
      </p>
    </div>
  `;
  
  // Set modal content
  modal.innerHTML = modalContent;
  
  // Add to document
  document.body.appendChild(modal);
  
  // Set up close button
  const closeButton = modal.querySelector('.close-modal');
  closeButton.addEventListener('click', function() {
    document.body.removeChild(modal);
  });
  
  // Close when clicking outside the modal
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
  
  // Set up wallet option buttons
  const walletButtons = modal.querySelectorAll('.wallet-option');
  walletButtons.forEach(button => {
    button.addEventListener('click', function() {
      const walletId = this.getAttribute('data-wallet-id');
      const walletName = this.querySelector('span').textContent;
      
      // Close modal
      document.body.removeChild(modal);
      
      // Connect wallet
      connectWallet(walletId, walletName);
    });
    
    // Add hover effect
    button.addEventListener('mouseenter', function() {
      this.style.backgroundColor = '#1E293B';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.backgroundColor = '#111927';
    });
  });
}

// Connect wallet
async function connectWallet(walletId, walletName) {
  try {
    showLoadingState();
    console.log(`Connecting to ${walletName}...`);
    
    let walletAddress = '';
    
    // Connect to different wallet types
    if (walletId === 'metamask') {
      walletAddress = await connectMetamask();
    } else if (walletId === 'coinbase') {
      walletAddress = await connectCoinbaseWallet();
    } else if (walletId === 'walletconnect') {
      walletAddress = await connectWalletConnect();
    }
    
    if (!walletAddress) {
      showErrorMessage(`Failed to connect to ${walletName}. Please try again.`);
      return;
    }
    
    // Save wallet to Firebase if available
    if (typeof firebase !== 'undefined' && firebase.auth) {
      const user = await getCurrentUser();
      
      if (user) {
        const db = firebase.firestore();
        
        // Check if it's the first wallet
        const existingWallets = await db.collection('users').doc(user.uid).collection('paymentMethods').get();
        const isFirstWallet = existingWallets.empty;
        
        // Add the wallet
        const walletRef = await db.collection('users').doc(user.uid).collection('paymentMethods').add({
          type: walletName,
          address: walletAddress,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // If it's the first wallet, make it primary
        if (isFirstWallet) {
          await db.collection('users').doc(user.uid).collection('paymentMethods').doc('primary').set({
            type: walletName,
            address: walletAddress,
            walletId: walletRef.id,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      }
    }
    
    // Show success and refresh
    showSuccessMessage(`${walletName} connected successfully`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } catch (error) {
    console.error(`Error connecting to ${walletName}:`, error);
    showErrorMessage(`Failed to connect to ${walletName}: ${error.message}`);
  } finally {
    hideLoadingState();
  }
}

// Connect to Metamask
async function connectMetamask() {
  if (typeof window.ethereum === 'undefined') {
    showErrorMessage('MetaMask is not installed. Please install MetaMask to continue.');
    return null;
  }
  
  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (error) {
    console.error('MetaMask connection error:', error);
    throw error;
  }
}

// Connect to Coinbase Wallet (simplified implementation)
async function connectCoinbaseWallet() {
  // In a real application, you would use the Coinbase Wallet SDK
  // For this example, we'll simulate a successful connection
  
  if (typeof window.ethereum !== 'undefined' && window.ethereum.isCoinbaseWallet) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('Coinbase Wallet connection error:', error);
      throw error;
    }
  } else {
    // Simulate a wallet connection for development
    return '0x' + Math.random().toString(16).substring(2, 42);
  }
}

// Connect to WalletConnect (simplified implementation)
async function connectWalletConnect() {
  // In a real application, you would use the WalletConnect SDK
  // For this example, we'll simulate a successful connection
  return '0x' + Math.random().toString(16).substring(2, 42);
}

// Initialize withdraw functionality
function initializeWithdrawFunctionality() {
  // Set up main withdraw button
  const mainWithdrawButton = document.querySelector('.balance-categorys-button.withdraw');
  if (main/* 
 * Splitra Webflow Integration Script
 * This script integrates all Splitra platform functionality into the Webflow site
 */

// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('Splitra Webflow Integration - Initializing');
  
  // Initialize Firebase if available
  initializeFirebase();
  
  // Initialize the page based on the current URL
  initializePageByUrl();
});

// Initialize Firebase connection
function initializeFirebase() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not found. Loading app in development mode.');
    return;
  }
  
  try {
    // Check if Firebase is already initialized
    if (!firebase.apps.length) {
      // Initialize Firebase with your config
      const firebaseConfig = {
        apiKey: "AIzaSyDJOcBDsbUj1mMV3AkarkM6ItdUPgVUYDo",
        authDomain: "splitra-d3efc.firebaseapp.com",
        projectId: "splitra-d3efc",
        storageBucket: "splitra-d3efc.firebasestorage.app",
        messagingSenderId: "1006048798352",
        appId: "1:1006048798352:web:20b7b5788b8676b3301a15",
        measurementId: "G-EFZCDBJ523"
      };
      
      firebase.initializeApp(firebaseConfig);
    }
    
    // Set up authentication state observer
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in:', user.uid);
        loadUserProfileData(user);
      } else {
        console.log('No user is signed in');
        handleUnauthenticatedState();
      }
    });
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
}

// Load user
