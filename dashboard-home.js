// Splitra Dashboard Implementation - FIXED VERSION
// This script integrates with your existing Webflow structure

// First, load Chart.js if not already loaded
(function loadChartJs() {
  if (typeof Chart !== 'undefined') return; // Already loaded
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = function() {
    console.log('Chart.js loaded dynamically');
    // Initialize charts after Chart.js loads
    if (typeof SplCharts !== 'undefined') {
      SplCharts.initializeDashboardCharts();
    }
  };
  document.head.appendChild(script);
})();

// ================================
// CONFIGURATION
// ================================
const SPLITRA_CONFIG = {
  useTestData: true,                   // Set to false for production
  apiUrl: 'https://api.splitra.com',   // Replace with your actual API endpoint
  enableConsoleLogging: true,          // Enable/disable console logging
  defaultCurrency: 'ETH',              // Default currency for display
  pages: {
    dashboard: '/dashboard',
    contractDetails: '/contract',
    activities: '/activities',
    profile: '/profile',
    settings: '/settings'
  }
};

// ================================
// MOCK DATA
// ================================
const SplMockData = {
  // User profile data
  user: {
    id: 'user-001',
    name: 'Demo User',
    wallet: '0x7A23C4A31C94e7895AC495f3669e4a26C877d9a6',
    walletShort: '0x7A23...9a6',
    email: 'demo@splitra.io',
    avatar: null,
    balance: 3.45,
    totalContracts: 12,
    activeContracts: 7, 
    activeCollaborators: 18,
    joinedAt: '2024-12-01T10:00:00Z'
  },
  
  // All contracts
  contracts: [
    {
      id: 'contract-001',
      title: 'Summery Album Project',
      description: 'Music album collaboration contract with revenue sharing for producers, artists, and engineers',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 54, isCurrentUser: true, role: 'Producer' },
        { id: 'user-002', name: 'John Smith', revenueShare: 21, role: 'Artist' },
        { id: 'user-003', name: 'Alice Johnson', revenueShare: 15, role: 'Engineer' },
        { id: 'user-004', name: 'Bob Williams', revenueShare: 10, role: 'Marketing' }
      ],
      type: 'Music',
      icon: 'music-note',
      participantsJoined: 3,
      participantsTotal: 4,
      contractValue: 0.21564984,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z',
      deploymentTx: '0x8a74d7f52c93568c3b0579fcce829e3a294c998a93b638e5e07350d7f37c1986',
      network: 'polygon'
    },
    {
      id: 'contract-002',
      title: 'Digital Art Collection',
      description: 'Visual art collaboration for NFT series',
      status: 'pending',
      statusDisplay: 'Pending',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 60, isCurrentUser: true, role: 'Artist' },
        { id: 'user-005', name: 'Emily Chen', revenueShare: 40, role: 'Designer' }
      ],
      type: 'Art',
      icon: 'art',
      participantsJoined: 2,
      participantsTotal: 2,
      contractValue: 0.5489,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z',
      deploymentTx: null,
      network: 'polygon'
    },
    {
      id: 'contract-003',
      title: 'Marketing Campaign',
      description: 'Collaborative marketing project for brand launch',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 35, isCurrentUser: true, role: 'Strategist' },
        { id: 'user-006', name: 'Marketing Agency', revenueShare: 45, role: 'Agency' },
        { id: 'user-007', name: 'Content Creator', revenueShare: 20, role: 'Creator' }
      ],
      type: 'Service',
      icon: 'service',
      participantsJoined: 3,
      participantsTotal: 3,
      contractValue: 1.23456,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z',
      deploymentTx: '0x9b45a7382a0ee1a37adeaa5bbffc3f5456ae4c7d5a4172e667bb3b99172e39a6',
      network: 'polygon'
    },
    {
      id: 'contract-004',
      title: 'Game Development Project',
      description: 'Revenue sharing for indie game development team',
      status: 'draft',
      statusDisplay: 'Draft',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 25, isCurrentUser: true, role: 'Developer' },
        { id: 'user-008', name: 'Sarah Parker', revenueShare: 25, role: 'Artist' },
        { id: 'user-009', name: 'Mike Johnson', revenueShare: 25, role: 'Designer' },
        { id: 'user-010', name: 'Laura Smith', revenueShare: 25, role: 'Sound' }
      ],
      type: 'Gaming',
      icon: 'gaming',
      participantsJoined: 1,
      participantsTotal: 4,
      contractValue: 0,
      totalRevenue: 0,
      currency: 'ETH',
      createdAt: '2025-04-25T09:00:00Z',
      lastUpdated: '2025-04-25T09:00:00Z',
      deploymentTx: null,
      network: 'polygon'
    }
  ],
  
  // Activities
  activities: [
    {
      id: 'activity-001',
      type: 'contract_created',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:00:00Z',
      description: 'Contract created'
    },
    {
      id: 'activity-002',
      type: 'invite_sent',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:05:00Z',
      description: 'Invited collaborators to join'
    },
    {
      id: 'activity-003',
      type: 'contract_signed',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-002', name: 'John Smith' },
      timestamp: '2025-04-16T09:30:00Z',
      description: 'Signed the contract'
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      amount: 0.05,
      currency: 'ETH',
      timestamp: '2025-04-20T15:45:00Z',
      description: 'Payment received'
    }
  ],
  
  // Upcoming payments (mock data)
  upcomingPayments: [
    { id: 'payment-001', contractId: 'contract-001', amount: 0.05, currency: 'ETH', date: '2025-05-10T12:00:00Z' },
    { id: 'payment-002', contractId: 'contract-003', amount: 0.08, currency: 'ETH', date: '2025-05-17T12:00:00Z' },
    { id: 'payment-003', contractId: 'contract-001', amount: 0.12, currency: 'ETH', date: '2025-05-24T12:00:00Z' },
    { id: 'payment-004', contractId: 'contract-003', amount: 0.07, currency: 'ETH', date: '2025-05-31T12:00:00Z' }
  ],
  
  // Helper methods to get specific data
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getContractsByType: function(type) {
    return this.contracts.filter(c => c.type.toLowerCase() === type.toLowerCase());
  },
  
  getActivitiesByContract: function(contractId) {
    return this.activities.filter(a => a.contractId === contractId);
  },
  
  getRecentActivities: function(limit = 5) {
    // Sort by timestamp (most recent first) and take the specified limit
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 4) {
    // Sort by date (earliest first) and take the specified limit
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================
const SplUtils = {
  // Logging with prefix
  log: function(message, data) {
    if (SPLITRA_CONFIG.enableConsoleLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging with prefix
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Format currency values
  formatCurrency: function(value, currency = SPLITRA_CONFIG.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
if (currency === 'ETH') {
  return value.toFixed(5) + ' ETH';
} else if (currency === 'USD') {
  return `// Splitra Dashboard Implementation - FIXED VERSION
// This script integrates with your existing Webflow structure`;
}

// First, load Chart.js if not already loaded
(function loadChartJs() {
  if (typeof Chart !== 'undefined') return; // Already loaded
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = function() {
    console.log('Chart.js loaded dynamically');
    // Initialize charts after Chart.js loads
    if (typeof SplCharts !== 'undefined') {
      SplCharts.initializeDashboardCharts();
    }
  };
  document.head.appendChild(script);
})();

// ================================
// CONFIGURATION
// ================================
const SPLITRA_CONFIG = {
  useTestData: true,                   // Set to false for production
  apiUrl: 'https://api.splitra.com',   // Replace with your actual API endpoint
  enableConsoleLogging: true,          // Enable/disable console logging
  defaultCurrency: 'ETH',              // Default currency for display
  pages: {
    dashboard: '/dashboard',
    contractDetails: '/contract',
    activities: '/activities',
    profile: '/profile',
    settings: '/settings'
  }
};

// ================================
// MOCK DATA
// ================================
const SplMockData = {
  // User profile data
  user: {
    id: 'user-001',
    name: 'Demo User',
    wallet: '0x7A23C4A31C94e7895AC495f3669e4a26C877d9a6',
    walletShort: '0x7A23...9a6',
    email: 'demo@splitra.io',
    avatar: null,
    balance: 3.45,
    totalContracts: 12,
    activeContracts: 7, 
    activeCollaborators: 18,
    joinedAt: '2024-12-01T10:00:00Z'
  },
  
  // All contracts
  contracts: [
    {
      id: 'contract-001',
      title: 'Summery Album Project',
      description: 'Music album collaboration contract with revenue sharing for producers, artists, and engineers',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 54, isCurrentUser: true, role: 'Producer' },
        { id: 'user-002', name: 'John Smith', revenueShare: 21, role: 'Artist' },
        { id: 'user-003', name: 'Alice Johnson', revenueShare: 15, role: 'Engineer' },
        { id: 'user-004', name: 'Bob Williams', revenueShare: 10, role: 'Marketing' }
      ],
      type: 'Music',
      icon: 'music-note',
      participantsJoined: 3,
      participantsTotal: 4,
      contractValue: 0.21564984,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z',
      deploymentTx: '0x8a74d7f52c93568c3b0579fcce829e3a294c998a93b638e5e07350d7f37c1986',
      network: 'polygon'
    },
    {
      id: 'contract-002',
      title: 'Digital Art Collection',
      description: 'Visual art collaboration for NFT series',
      status: 'pending',
      statusDisplay: 'Pending',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 60, isCurrentUser: true, role: 'Artist' },
        { id: 'user-005', name: 'Emily Chen', revenueShare: 40, role: 'Designer' }
      ],
      type: 'Art',
      icon: 'art',
      participantsJoined: 2,
      participantsTotal: 2,
      contractValue: 0.5489,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z',
      deploymentTx: null,
      network: 'polygon'
    },
    {
      id: 'contract-003',
      title: 'Marketing Campaign',
      description: 'Collaborative marketing project for brand launch',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 35, isCurrentUser: true, role: 'Strategist' },
        { id: 'user-006', name: 'Marketing Agency', revenueShare: 45, role: 'Agency' },
        { id: 'user-007', name: 'Content Creator', revenueShare: 20, role: 'Creator' }
      ],
      type: 'Service',
      icon: 'service',
      participantsJoined: 3,
      participantsTotal: 3,
      contractValue: 1.23456,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z',
      deploymentTx: '0x9b45a7382a0ee1a37adeaa5bbffc3f5456ae4c7d5a4172e667bb3b99172e39a6',
      network: 'polygon'
    },
    {
      id: 'contract-004',
      title: 'Game Development Project',
      description: 'Revenue sharing for indie game development team',
      status: 'draft',
      statusDisplay: 'Draft',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 25, isCurrentUser: true, role: 'Developer' },
        { id: 'user-008', name: 'Sarah Parker', revenueShare: 25, role: 'Artist' },
        { id: 'user-009', name: 'Mike Johnson', revenueShare: 25, role: 'Designer' },
        { id: 'user-010', name: 'Laura Smith', revenueShare: 25, role: 'Sound' }
      ],
      type: 'Gaming',
      icon: 'gaming',
      participantsJoined: 1,
      participantsTotal: 4,
      contractValue: 0,
      totalRevenue: 0,
      currency: 'ETH',
      createdAt: '2025-04-25T09:00:00Z',
      lastUpdated: '2025-04-25T09:00:00Z',
      deploymentTx: null,
      network: 'polygon'
    }
  ],
  
  // Activities
  activities: [
    {
      id: 'activity-001',
      type: 'contract_created',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:00:00Z',
      description: 'Contract created'
    },
    {
      id: 'activity-002',
      type: 'invite_sent',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:05:00Z',
      description: 'Invited collaborators to join'
    },
    {
      id: 'activity-003',
      type: 'contract_signed',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-002', name: 'John Smith' },
      timestamp: '2025-04-16T09:30:00Z',
      description: 'Signed the contract'
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      amount: 0.05,
      currency: 'ETH',
      timestamp: '2025-04-20T15:45:00Z',
      description: 'Payment received'
    }
  ],
  
  // Upcoming payments (mock data)
  upcomingPayments: [
    { id: 'payment-001', contractId: 'contract-001', amount: 0.05, currency: 'ETH', date: '2025-05-10T12:00:00Z' },
    { id: 'payment-002', contractId: 'contract-003', amount: 0.08, currency: 'ETH', date: '2025-05-17T12:00:00Z' },
    { id: 'payment-003', contractId: 'contract-001', amount: 0.12, currency: 'ETH', date: '2025-05-24T12:00:00Z' },
    { id: 'payment-004', contractId: 'contract-003', amount: 0.07, currency: 'ETH', date: '2025-05-31T12:00:00Z' }
  ],
  
  // Helper methods to get specific data
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getContractsByType: function(type) {
    return this.contracts.filter(c => c.type.toLowerCase() === type.toLowerCase());
  },
  
  getActivitiesByContract: function(contractId) {
    return this.activities.filter(a => a.contractId === contractId);
  },
  
  getRecentActivities: function(limit = 5) {
    // Sort by timestamp (most recent first) and take the specified limit
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 4) {
    // Sort by date (earliest first) and take the specified limit
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================
const SplUtils = {
  // Logging with prefix
  log: function(message, data) {
    if (SPLITRA_CONFIG.enableConsoleLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging with prefix
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Format currency values
  formatCurrency: function(value, currency = SPLITRA_CONFIG.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
    if (currency === 'ETH') {
      return value.toFixed(5) + ' ETH';
    } else if (currency === 'USD') {
      return '// Splitra Dashboard Implementation - FIXED VERSION
// This script integrates with your existing Webflow structure

// First, load Chart.js if not already loaded
(function loadChartJs() {
  if (typeof Chart !== 'undefined') return; // Already loaded
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = function() {
    console.log('Chart.js loaded dynamically');
    // Initialize charts after Chart.js loads
    if (typeof SplCharts !== 'undefined') {
      SplCharts.initializeDashboardCharts();
    }
  };
  document.head.appendChild(script);
})();

// ================================
// CONFIGURATION
// ================================
const SPLITRA_CONFIG = {
  useTestData: true,                   // Set to false for production
  apiUrl: 'https://api.splitra.com',   // Replace with your actual API endpoint
  enableConsoleLogging: true,          // Enable/disable console logging
  defaultCurrency: 'ETH',              // Default currency for display
  pages: {
    dashboard: '/dashboard',
    contractDetails: '/contract',
    activities: '/activities',
    profile: '/profile',
    settings: '/settings'
  }
};

// ================================
// MOCK DATA
// ================================
const SplMockData = {
  // User profile data
  user: {
    id: 'user-001',
    name: 'Demo User',
    wallet: '0x7A23C4A31C94e7895AC495f3669e4a26C877d9a6',
    walletShort: '0x7A23...9a6',
    email: 'demo@splitra.io',
    avatar: null,
    balance: 3.45,
    totalContracts: 12,
    activeContracts: 7, 
    activeCollaborators: 18,
    joinedAt: '2024-12-01T10:00:00Z'
  },
  
  // All contracts
  contracts: [
    {
      id: 'contract-001',
      title: 'Summery Album Project',
      description: 'Music album collaboration contract with revenue sharing for producers, artists, and engineers',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 54, isCurrentUser: true, role: 'Producer' },
        { id: 'user-002', name: 'John Smith', revenueShare: 21, role: 'Artist' },
        { id: 'user-003', name: 'Alice Johnson', revenueShare: 15, role: 'Engineer' },
        { id: 'user-004', name: 'Bob Williams', revenueShare: 10, role: 'Marketing' }
      ],
      type: 'Music',
      icon: 'music-note',
      participantsJoined: 3,
      participantsTotal: 4,
      contractValue: 0.21564984,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z',
      deploymentTx: '0x8a74d7f52c93568c3b0579fcce829e3a294c998a93b638e5e07350d7f37c1986',
      network: 'polygon'
    },
    {
      id: 'contract-002',
      title: 'Digital Art Collection',
      description: 'Visual art collaboration for NFT series',
      status: 'pending',
      statusDisplay: 'Pending',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 60, isCurrentUser: true, role: 'Artist' },
        { id: 'user-005', name: 'Emily Chen', revenueShare: 40, role: 'Designer' }
      ],
      type: 'Art',
      icon: 'art',
      participantsJoined: 2,
      participantsTotal: 2,
      contractValue: 0.5489,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z',
      deploymentTx: null,
      network: 'polygon'
    },
    {
      id: 'contract-003',
      title: 'Marketing Campaign',
      description: 'Collaborative marketing project for brand launch',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 35, isCurrentUser: true, role: 'Strategist' },
        { id: 'user-006', name: 'Marketing Agency', revenueShare: 45, role: 'Agency' },
        { id: 'user-007', name: 'Content Creator', revenueShare: 20, role: 'Creator' }
      ],
      type: 'Service',
      icon: 'service',
      participantsJoined: 3,
      participantsTotal: 3,
      contractValue: 1.23456,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z',
      deploymentTx: '0x9b45a7382a0ee1a37adeaa5bbffc3f5456ae4c7d5a4172e667bb3b99172e39a6',
      network: 'polygon'
    },
    {
      id: 'contract-004',
      title: 'Game Development Project',
      description: 'Revenue sharing for indie game development team',
      status: 'draft',
      statusDisplay: 'Draft',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 25, isCurrentUser: true, role: 'Developer' },
        { id: 'user-008', name: 'Sarah Parker', revenueShare: 25, role: 'Artist' },
        { id: 'user-009', name: 'Mike Johnson', revenueShare: 25, role: 'Designer' },
        { id: 'user-010', name: 'Laura Smith', revenueShare: 25, role: 'Sound' }
      ],
      type: 'Gaming',
      icon: 'gaming',
      participantsJoined: 1,
      participantsTotal: 4,
      contractValue: 0,
      totalRevenue: 0,
      currency: 'ETH',
      createdAt: '2025-04-25T09:00:00Z',
      lastUpdated: '2025-04-25T09:00:00Z',
      deploymentTx: null,
      network: 'polygon'
    }
  ],
  
  // Activities
  activities: [
    {
      id: 'activity-001',
      type: 'contract_created',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:00:00Z',
      description: 'Contract created'
    },
    {
      id: 'activity-002',
      type: 'invite_sent',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:05:00Z',
      description: 'Invited collaborators to join'
    },
    {
      id: 'activity-003',
      type: 'contract_signed',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-002', name: 'John Smith' },
      timestamp: '2025-04-16T09:30:00Z',
      description: 'Signed the contract'
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      amount: 0.05,
      currency: 'ETH',
      timestamp: '2025-04-20T15:45:00Z',
      description: 'Payment received'
    }
  ],
  
  // Upcoming payments (mock data)
  upcomingPayments: [
    { id: 'payment-001', contractId: 'contract-001', amount: 0.05, currency: 'ETH', date: '2025-05-10T12:00:00Z' },
    { id: 'payment-002', contractId: 'contract-003', amount: 0.08, currency: 'ETH', date: '2025-05-17T12:00:00Z' },
    { id: 'payment-003', contractId: 'contract-001', amount: 0.12, currency: 'ETH', date: '2025-05-24T12:00:00Z' },
    { id: 'payment-004', contractId: 'contract-003', amount: 0.07, currency: 'ETH', date: '2025-05-31T12:00:00Z' }
  ],
  
  // Helper methods to get specific data
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getContractsByType: function(type) {
    return this.contracts.filter(c => c.type.toLowerCase() === type.toLowerCase());
  },
  
  getActivitiesByContract: function(contractId) {
    return this.activities.filter(a => a.contractId === contractId);
  },
  
  getRecentActivities: function(limit = 5) {
    // Sort by timestamp (most recent first) and take the specified limit
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 4) {
    // Sort by date (earliest first) and take the specified limit
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================
const SplUtils = {
  // Logging with prefix
  log: function(message, data) {
    if (SPLITRA_CONFIG.enableConsoleLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging with prefix
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Format currency values
  formatCurrency: function(value, currency = SPLITRA_CONFIG.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
    if (currency === 'ETH') {
      return value.toFixed(5) + ' ETH';
    } else if (currency === 'USD') {
      return '$' + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as human readable
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Copy text to clipboard
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
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    // Create or find toast element
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
    
    // Hide after specified duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// ================================
// CHART IMPLEMENTATION
// ================================
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize chart with Chart.js
  initChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUtils.error(`Canvas not found with ID: ${canvasId}`);
      return null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUtils.error('Chart.js not loaded');
      return null;
    }
    
    // Create chart
    try {
      // Destroy existing chart if it exists
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      // Store for later reference
      this.charts[canvasId] = chart;
      SplUtils.log(`Chart created for ${canvasId}`);
      
      return chart;
    } catch (error) {
      SplUtils.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart (donut)
  createRevenueChart: function() {
    SplUtils.log('Creating revenue chart');
    
    // Find container and create canvas
    let chartContainer = document.querySelector('.revenue-chart, .revenue-chart-container, .pie-chart-parent, .pie-chart-placeholder');
    
    if (!chartContainer) {
      // Try to find a good container by looking for common elements
      const statsSection = document.querySelector('.home-stats-section, .stats-wrapper');
      if (statsSection) {
        // Look for chart placeholders in the stats section
        chartContainer = statsSection.querySelector('.chart-image');
        
        if (!chartContainer) {
          // Try to find any element that might be a chart container
          const possibleContainers = statsSection.querySelectorAll('div, img');
          for (let i = 0; i < possibleContainers.length; i++) {
            const el = possibleContainers[i];
            // If element contains img that might be a chart placeholder
            if (el.querySelector('img') || el.style.width || el.className.includes('chart')) {
              chartContainer = el;
              break;
            }
          }
        }
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Revenue chart container not found');
      return null;
    }
    
    SplUtils.log('Found revenue chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-distribution-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get first active contract for the chart
    const contract = SplMockData.getActiveContracts()[0];
    if (!contract) {
      SplUtils.error('No active contract found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = contract.participants.map(p => p.name);
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#6366F1'  // Indigo
    ];
    
    // Create chart
    const chart = this.initChart(canvas.id, 'doughnut', {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#FFF',
            font: {
              family: 'Inter, sans-serif',
              size: 12
            },
            boxWidth: 12,
            padding: 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text for user's share
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add centered text to doughnut chart
  addCenterText: function(chart, text) {
    const originalDraw = chart.draw;
    
    chart.draw = function() {
      originalDraw.apply(this, arguments);
      
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, width / 2, height / 2);
      ctx.save();
    };
    
    chart.update();
  },
  
  // Create upcoming payments chart
  createPaymentsChart: function() {
    SplUtils.log('Creating payments chart');
    
    // Find container
    let chartContainer = document.querySelector('.upcoming-chart, .upcoming-chart-container, .payments-chart');
    
    if (!chartContainer) {
      // Try to find by content
      const upcomingSection = Array.from(document.querySelectorAll('div')).find(el => {
        // Look for section titles that indicate upcoming payments
        const heading = el.querySelector('h2, h3, .heading');
        return heading && heading.textContent.includes('Upcoming');
      });
      
      if (upcomingSection) {
        // Look for chart placeholders
        chartContainer = upcomingSection.querySelector('img, .chart-image, [class*="chart"]');
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Payments chart container not found');
      return null;
    }
    
    SplUtils.log('Found payments chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'upcoming-payments-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get upcoming payments data
    const payments = SplMockData.getUpcomingPayments();
    
    // Prepare chart data
    const chartData = {
      labels: payments.map(p => SplUtils.formatDate(p.date)),
      datasets: [{
        label: 'ETH',
        data: payments.map(p => p.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
    
    // Create chart
    const chart = this.initChart(canvas.id, 'line', chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            callback: function(value) {
              return value.toFixed(2) + ' ETH';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#aaa'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
    
    return chart;
  },
  
  // Initialize all charts on the dashboard
  initializeDashboardCharts: function() {
    SplUtils.log('Initializing dashboard charts');
    
    try {
      // Check if Chart.js is available
      if (typeof Chart === 'undefined') {
        SplUtils.error('Chart.js not loaded. Please include Chart.js in your project.');
        return false;
      }
      
      // Create main revenue chart
      this.createRevenueChart();
      
      // Create upcoming payments chart
      this.createPaymentsChart();
      
      SplUtils.log('Dashboard charts initialized');
      return true;
    } catch (error) {
      SplUtils.error('Error initializing charts:', error);
      return false;
    }
  }
};

// ================================
// DASHBOARD IMPLEMENTATION
// ================================
const Splitra = {
  // Initialize application
  init: function() {
    SplUtils.log('Initializing Splitra application');
    
    try {
      // Add test mode indicator
      if (SPLITRA_CONFIG.useTestData) {
        this.addTestModeIndicator();
      }
      
      // Initialize dashboard components
      this.initializeContractCards();
      this.initializeFilterButtons();
      this.initializeStatCards();
      this.initializeRecentActivity();
      this.initializeUpcomingPayments();
      
      // Initialize charts if Chart.js is available
      if (typeof Chart !== 'undefined') {
        SplCharts.initializeDashboardCharts();
      } else {
        SplUtils.log('Chart.js not available, charts will not be initialized');
      }
      
      SplUtils.log('Splitra application initialized successfully');
      SplUtils.showToast('Dashboard initialized with test data', 'info');
    } catch (error) {
      SplUtils.error('Error initializing Splitra:', error);
      console.error('Splitra initialization error:', error);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
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
  },
  
  // Initialize contract cards
  initializeContractCards: function() {
    SplUtils.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUtils.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      cardsContainer.style.display = 'flex';
      cardsContainer.style.overflowX = 'auto';
      cardsContainer.style.padding = '4px 0 16px';
      cardsContainer.style.scrollSnapType = 'x mandatory';
      cardsContainer.style.scrollBehavior = 'smooth';
      cardsContainer.style.WebkitOverflowScrolling = 'touch';
      
      // Make scrollbar less obtrusive
      cardsContainer.style.scrollbarWidth = 'thin';
      cardsContainer.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
      
      // Add styling for cards
      contractCards.forEach((card, index) => {
        if (index < SplMockData.contracts.length) {
          const contract = SplMockData.contracts[index];
          
          // Set data attributes
          card.setAttribute('data-contract-id', contract.id);
          card.setAttribute('data-status', contract.status);
          card.setAttribute('data-type', contract.type.toLowerCase());
          
          // Set card style
          card.style.flex = '0 0 auto';
          card.style.marginRight = '16px';
          card.style.scrollSnapAlign = 'start';
          card.style.cursor = 'pointer';
          
          // Set card content
          this.populateContractCard(card, contract);
          
          // Make card clickable
          card.addEventListener('click', (e) => {
            // Prevent click if clicking on a button
            if (e.target.closest('. + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as human readable
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Copy text to clipboard
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
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    // Create or find toast element
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
    
    // Hide after specified duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// ================================
// CHART IMPLEMENTATION
// ================================
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize chart with Chart.js
  initChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUtils.error(`Canvas not found with ID: ${canvasId}`);
      return null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUtils.error('Chart.js not loaded');
      return null;
    }
    
    // Create chart
    try {
      // Destroy existing chart if it exists
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      // Store for later reference
      this.charts[canvasId] = chart;
      SplUtils.log(`Chart created for ${canvasId}`);
      
      return chart;
    } catch (error) {
      SplUtils.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart (donut)
  createRevenueChart: function() {
    SplUtils.log('Creating revenue chart');
    
    // Find container and create canvas
    let chartContainer = document.querySelector('.revenue-chart, .revenue-chart-container, .pie-chart-parent, .pie-chart-placeholder');
    
    if (!chartContainer) {
      // Try to find a good container by looking for common elements
      const statsSection = document.querySelector('.home-stats-section, .stats-wrapper');
      if (statsSection) {
        // Look for chart placeholders in the stats section
        chartContainer = statsSection.querySelector('.chart-image');
        
        if (!chartContainer) {
          // Try to find any element that might be a chart container
          const possibleContainers = statsSection.querySelectorAll('div, img');
          for (let i = 0; i < possibleContainers.length; i++) {
            const el = possibleContainers[i];
            // If element contains img that might be a chart placeholder
            if (el.querySelector('img') || el.style.width || el.className.includes('chart')) {
              chartContainer = el;
              break;
            }
          }
        }
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Revenue chart container not found');
      return null;
    }
    
    SplUtils.log('Found revenue chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-distribution-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get first active contract for the chart
    const contract = SplMockData.getActiveContracts()[0];
    if (!contract) {
      SplUtils.error('No active contract found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = contract.participants.map(p => p.name);
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#6366F1'  // Indigo
    ];
    
    // Create chart
    const chart = this.initChart(canvas.id, 'doughnut', {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#FFF',
            font: {
              family: 'Inter, sans-serif',
              size: 12
            },
            boxWidth: 12,
            padding: 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text for user's share
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add centered text to doughnut chart
  addCenterText: function(chart, text) {
    const originalDraw = chart.draw;
    
    chart.draw = function() {
      originalDraw.apply(this, arguments);
      
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, width / 2, height / 2);
      ctx.save();
    };
    
    chart.update();
  },
  
  // Create upcoming payments chart
  createPaymentsChart: function() {
    SplUtils.log('Creating payments chart');
    
    // Find container
    let chartContainer = document.querySelector('.upcoming-chart, .upcoming-chart-container, .payments-chart');
    
    if (!chartContainer) {
      // Try to find by content
      const upcomingSection = Array.from(document.querySelectorAll('div')).find(el => {
        // Look for section titles that indicate upcoming payments
        const heading = el.querySelector('h2, h3, .heading');
        return heading && heading.textContent.includes('Upcoming');
      });
      
      if (upcomingSection) {
        // Look for chart placeholders
        chartContainer = upcomingSection.querySelector('img, .chart-image, [class*="chart"]');
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Payments chart container not found');
      return null;
    }
    
    SplUtils.log('Found payments chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'upcoming-payments-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get upcoming payments data
    const payments = SplMockData.getUpcomingPayments();
    
    // Prepare chart data
    const chartData = {
      labels: payments.map(p => SplUtils.formatDate(p.date)),
      datasets: [{
        label: 'ETH',
        data: payments.map(p => p.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
    
    // Create chart
    const chart = this.initChart(canvas.id, 'line', chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            callback: function(value) {
              return value.toFixed(2) + ' ETH';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#aaa'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
    
    return chart;
  },
  
  // Initialize all charts on the dashboard
  initializeDashboardCharts: function() {
    SplUtils.log('Initializing dashboard charts');
    
    try {
      // Check if Chart.js is available
      if (typeof Chart === 'undefined') {
        SplUtils.error('Chart.js not loaded. Please include Chart.js in your project.');
        return false;
      }
      
      // Create main revenue chart
      this.createRevenueChart();
      
      // Create upcoming payments chart
      this.createPaymentsChart();
      
      SplUtils.log('Dashboard charts initialized');
      return true;
    } catch (error) {
      SplUtils.error('Error initializing charts:', error);
      return false;
    }
  }
};

// ================================
// DASHBOARD IMPLEMENTATION
// ================================
const Splitra = {
  // Initialize application
  init: function() {
    SplUtils.log('Initializing Splitra application');
    
    try {
      // Add test mode indicator
      if (SPLITRA_CONFIG.useTestData) {
        this.addTestModeIndicator();
      }
      
      // Initialize dashboard components
      this.initializeContractCards();
      this.initializeFilterButtons();
      this.initializeStatCards();
      this.initializeRecentActivity();
      this.initializeUpcomingPayments();
      
      // Initialize charts if Chart.js is available
      if (typeof Chart !== 'undefined') {
        SplCharts.initializeDashboardCharts();
      } else {
        SplUtils.log('Chart.js not available, charts will not be initialized');
      }
      
      SplUtils.log('Splitra application initialized successfully');
      SplUtils.showToast('Dashboard initialized with test data', 'info');
    } catch (error) {
      SplUtils.error('Error initializing Splitra:', error);
      console.error('Splitra initialization error:', error);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
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
  },
  
  // Initialize contract cards
  initializeContractCards: function() {
    SplUtils.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUtils.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      cardsContainer.style.display = 'flex';
      cardsContainer.style.overflowX = 'auto';
      cardsContainer.style.padding = '4px 0 16px';
      cardsContainer.style.scrollSnapType = 'x mandatory';
      cardsContainer.style.scrollBehavior = 'smooth';
      cardsContainer.style.WebkitOverflowScrolling = 'touch';
      
      // Make scrollbar less obtrusive
      cardsContainer.style.scrollbarWidth = 'thin';
      cardsContainer.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
      
      // Add styling for cards
      contractCards.forEach((card, index) => {
        if (index < SplMockData.contracts.length) {
          const contract = SplMockData.contracts[index];
          
          // Set data attributes
          card.setAttribute('data-contract-id', contract.id);
          card.setAttribute('data-status', contract.status);
          card.setAttribute('data-type', contract.type.toLowerCase());
          
          // Set card style
          card.style.flex = '0 0 auto';
          card.style.marginRight = '16px';
          card.style.scrollSnapAlign = 'start';
          card.style.cursor = 'pointer';
          
          // Set card content
          this.populateContractCard(card, contract);
          
          // Make card clickable
          card.addEventListener('click', (e) => {
            // Prevent click if clicking on a button
            if (e.target.closest('button') || e.target.tagName === 'BUTTON') {
              return;
            }
            
            SplUtils.log('Navigating to contract details:', contract.id);
            // For now, just show a toast since we don't have the contract details page yet
            SplUtils.showToast(`Viewing contract: ${contract.title}`);
            // In a real implementation, this would navigate to the contract details page
            // window.location.href = `/contract?id=${contract.id}`;
          });
        } else {
          // Hide extra cards
          card.style.display = 'none';
        }
      });
    }

    // Initialize contract buttons (view details & invite buttons)
    this.initializeContractButtons();
  },
  
  // Populate contract card with data
  populateContractCard: function(card, contract) {
    // Find elements within the card
    const titleElement = card.querySelector('.dashcard-name, .contract-title');
    const participantsElement = card.querySelector('.joined-stat');
    const statusElement = card.querySelector('.deployed-tag, .pending-tag, .ready-deploy-tag, .failed-deploy-tag');
    const valueElement = card.querySelector('.contract-value') || this.createContractValueElement(card);
    
    // Update elements if they exist
    if (titleElement) {
      titleElement.textContent = contract.title;
    }
    
    if (participantsElement) {
      participantsElement.textContent = `${contract.participantsJoined} of ${contract.participantsTotal} joined`;
    }
    
    if (statusElement) {
      // First clear all possible status classes
      statusElement.classList.remove('deployed-tag', 'pending-tag', 'ready-deploy-tag', 'failed-deploy-tag');
      
      // Add appropriate class based on status
      switch (contract.status) {
        case 'deployed':
          statusElement.classList.add('deployed-tag');
          statusElement.textContent = 'Active';
          break;
        case 'pending':
          statusElement.classList.add('pending-tag');
          statusElement.textContent = 'Pending';
          break;
        case 'draft':
          statusElement.classList.add('ready-deploy-tag');
          statusElement.textContent = 'Draft';
          break;
        default:
          statusElement.classList.add('failed-deploy-tag');
          statusElement.textContent = 'Failed';
      }
    }
    
    if (valueElement) {
      valueElement.textContent = SplUtils.formatCurrency(contract.totalRevenue, contract.currency);
    }
  },
  
  // Create contract value element
  createContractValueElement: function(card) {
    // Find a good place to insert the value (often before buttons)
    const buttonsContainer = card.querySelector('.div-block-28, .button-container, .card-buttons');
    if (!buttonsContainer) return null;
    
    // Create container for value
    const valueContainer = document.createElement('div');
    valueContainer.className = 'contract-value-container';
    valueContainer.style.display = 'flex';
    valueContainer.style.justifyContent = 'space-between';
    valueContainer.style.marginBottom = '12px';
    
    // Create label
    const label = document.createElement('div');
    label.className = 'contract-value-label';
    label.textContent = 'Total Revenue';
    label.style.fontSize = '14px';
    label.style.color = '#888';
    
    // Create value
    const value = document.createElement('div');
    value.className = 'contract-value';
    value.style.fontSize = '18px';
    value.style.fontWeight = 'bold';
    value.style.color = '#FFF';
    
    // Assemble
    valueContainer.appendChild(label);
    valueContainer.appendChild(value);
    
    // Insert before buttons container
    buttonsContainer.parentElement.insertBefore(valueContainer, buttonsContainer);
    
    return value;
  },
  
  // Initialize contract buttons
  initializeContractButtons: function() {
    // Find all view contract buttons
    const viewButtons = document.querySelectorAll('.contract-card .primary-button, .contract-card .view-button');
    viewButtons.forEach(button => {
      const card = button.closest('.contract-card');
      if (card) {
        const contractId = card.getAttribute('data-contract-id');
        if (contractId) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            SplUtils.showToast(`Viewing contract: ${contractId}`);
            // In a real implementation, this would navigate to the contract details page
            // window.location.href = `/contract?id=${contractId}`;
          });
        }
      }
    });
    
    // Find all invite buttons
    const inviteButtons = document.querySelectorAll('.contract-card .secondary-button-dull, .contract-card .invite-button');
    inviteButtons.forEach(button => {
      const card = button.closest('.contract-card');
      if (card) {
        const contractId = card.getAttribute('data-contract-id');
        if (contractId) {
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const inviteLink = `${window.location.origin}/contract/join?id=${contractId}`;
            SplUtils.copyToClipboard(inviteLink);
            SplUtils.showToast('Invite link copied to clipboard!');
          });
        }
      }
    });
  },
  
  // Initialize filter buttons
  initializeFilterButtons: function() {
    SplUtils.log('Initializing filter buttons');
    
    // Look for filter pill buttons
    const filterButtons = document.querySelectorAll('.filter-pill');
    
    if (filterButtons.length > 0) {
      SplUtils.log('Found existing filter buttons:', filterButtons.length);
      // Add click handler to filter buttons
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('inactive');
          });
          
          // Add active class to clicked button
          button.classList.remove('inactive');
          button.classList.add('active');
          
          // Get filter value (from data-filter attribute or button text)
          const filter = button.getAttribute('data-filter') || button.textContent.trim().toLowerCase();
          SplUtils.log('Filter selected:', filter);
          
          // Filter cards
          this.filterContractCards(filter);
        });
      });
    } else {
      SplUtils.log('No filter buttons found, creating them');
      this.createFilterButtons();
    }
  },
  
  // Create filter buttons if they don't exist
  createFilterButtons: function() {
    // Find a good place to add filter buttons (before contract cards)
    const contractCardsContainer = document.querySelector('.contract-card')?.parentElement;
    if (!contractCardsContainer) {
      SplUtils.error('Cannot find contract cards container for adding filters');
      return false;
    }
    
    // Find the heading above the cards (usually "My Contracts")
    const heading = Array.from(document.querySelectorAll('h1, h2, h3, .heading'))
      .find(el => el.textContent.includes('Contracts'));
    
    if (!heading) {
      SplUtils.error('Could not find heading for adding filters');
      return false;
    }
    
    // Create filter buttons container
    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-pills-wrapper';
    filterContainer.style.display = 'flex';
    filterContainer.style.marginBottom = '16px';
    filterContainer.style.marginTop = '12px';
    filterContainer.style.gap = '8px';
    
    // Create filter buttons
    const filters = [
      { label: 'All', filter: 'all', active: true },
      { label: 'Active', filter: 'deployed' },
      { label: 'Pending', filter: 'pending' },
      { label: 'Draft', filter: 'draft' }
    ];
    
    filters.forEach((filterObj, index) => {
      const button = document.createElement('div');
      button.className = `filter-pill ${index === 0 ? 'active' : 'inactive'}`;
      button.setAttribute('data-filter', filterObj.filter);
      button.textContent = filterObj.label;
      button.style.padding = '8px 16px';
      button.style.borderRadius = '20px';
      button.style.cursor = 'pointer';
      
      // Add to container
      filterContainer.appendChild(button);
      
      // Add click handler
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterContainer.querySelectorAll('.filter-pill').forEach(btn => {
          btn.classList.remove('active');
          btn.classList.add('inactive');
        });
        
        // Add active class to clicked button
        button.classList.remove('inactive');
        button.classList.add('active');
        
        // Apply filter
        this.filterContractCards(filterObj.filter);
      });
    });
    
    // Add filter container after heading
    heading.parentElement.insertBefore(filterContainer, heading.nextSibling);
    SplUtils.log('Added filter buttons');
    return true;
  },
  
  // Filter contract cards based on status or type
  filterContractCards: function(filter) {
    SplUtils.log('Filtering cards by:', filter);
    const cards = document.querySelectorAll('.contract-card');
    
    if (filter === 'all') {
      // Show all cards
      cards.forEach(card => {
        card.style.display = '';
      });
      return;
    }
    
    // Check if filtering by status or type
    cards.forEach(card => {
      const status = card.getAttribute('data-status');
      const type = card.getAttribute('data-type');
      
      if (status === filter || type === filter.toLowerCase()) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  },
  
  // Initialize stat cards with user data
  initializeStatCards: function() {
    SplUtils.log('Initializing stat cards');
    
    // Find stat cards or elements
    const balanceElement = document.querySelector('.total-balance-stat, .stat-balance');
    const contractsElement = document.querySelector('.total-contracts-stat, .stat-contracts');
    const collaboratorsElement = document.querySelector('.total-collaborators-stat, .stat-collaborators');
    
    // Update with mock data
    if (balanceElement) {
      balanceElement.textContent = SplUtils.formatCurrency(SplMockData.user.balance);
    }
    
    if (contractsElement) {
      contractsElement.textContent = SplMockData.user.totalContracts.toString();
    }
    
    if (collaboratorsElement) {
      collaboratorsElement.textContent = SplMockData.user.activeCollaborators.toString();
    }
  },
  
  // Initialize recent activity feed
  initializeRecentActivity: function() {
    SplUtils.log('Initializing recent activity');
    
    // Find activity container
    const activityContainer = document.querySelector('.activity-feed, .recent-activity');
    if (!activityContainer) {
      SplUtils.log('No activity feed container found');
      return;
    }
    
    // Get recent activities
    const activities = SplMockData.getRecentActivities();
    
    // Find existing activity items
    const existingItems = activityContainer.querySelectorAll('.activity-item');
    
    // If there are activity items, update them
    if (existingItems.length > 0) {
      existingItems.forEach((item, index) => {
        if (index < activities.length) {
          this.updateActivityItem(item, activities[index]);
        } else {
          item.style.display = 'none';
        }
      });
    } else {
      // Create activity items
      activities.forEach(activity => {
        const activityItem = this.createActivityItem(activity);
        activityContainer.appendChild(activityItem);
      });
    }
  },
  
  // Create activity item
  createActivityItem: function(activity) {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.setAttribute('data-activity-id', activity.id);
    item.style.display = 'flex';
    item.style.alignItems = 'flex-start';
    item.style.marginBottom = '16px';
    item.style.padding = '12px';
    item.style.borderRadius = '8px';
    item.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    
    // Create icon
    const icon = document.createElement('div');
    icon.className = 'activity-icon';
    icon.style.width = '32px';
    icon.style.height = '32px';
    icon.style.backgroundColor = '#3B82F6';
    icon.style.borderRadius = '50%';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.marginRight = '12px';
    icon.style.flexShrink = '0';
    
    // Set icon based on activity type
    let iconText = '';
    switch(activity.type) {
      case 'contract_created':
        iconText = '📝';
        icon.style.backgroundColor = '#10B981'; // Green
        break;
      case 'invite_sent':
        iconText = '📨';
        icon.style.backgroundColor = '#8B5CF6'; // Purple
        break;
      case 'contract_signed':
        iconText = '✅';
        icon.style.backgroundColor = '#3B82F6'; // Blue
        break;
      case 'payment_received':
        iconText = '💰';
        icon.style.backgroundColor = '#F59E0B'; // Amber
        break;
      default:
        iconText = '📋';
    }
    icon.textContent = iconText;
    
    // Create content
    const content = document.createElement('div');
    content.className = 'activity-content';
    content.style.flex = '1';
    
    // Create activity title
    const title = document.createElement('div');
    title.className = 'activity-title';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '4px';
    
    // Set title based on activity type
    let titleText = '';
    switch(activity.type) {
      case 'contract_created':
        titleText = 'Contract Created';
        break;
      case 'invite_sent':
        titleText = 'Invite Sent';
        break;
      case 'contract_signed':
        titleText = `${activity.actor.name} Signed`;
        break;
      case 'payment_received':
        titleText = 'Payment Received';
        break;
      default:
        titleText = activity.description;
    }
    title.textContent = titleText;
    
    // Create activity details
    const details = document.createElement('div');
    details.className = 'activity-details';
    details.style.fontSize = '14px';
    details.style.color = '#888';
    details.style.display = 'flex';
    details.style.justifyContent = 'space-between';
    
    // Create contract link
    const contractLink = document.createElement('div');
    contractLink.className = 'activity-contract';
    contractLink.style.cursor = 'pointer';
    contractLink.textContent = activity.contractTitle;
    contractLink.style.color = '#3B82F6';
    
    // Create timestamp
    const timestamp = document.createElement('div');
    timestamp.className = 'activity-time';
    timestamp.textContent = SplUtils.formatRelativeTime(activity.timestamp);
    
    // Assemble
    details.appendChild(contractLink);
    details.appendChild(timestamp);
    content.appendChild(title);
    content.appendChild(details);
    item.appendChild(icon);
    item.appendChild(content);
    
    // Add event listener to contract link
    contractLink.addEventListener('click', () => {
      SplUtils.showToast(`Viewing contract: ${activity.contractTitle}`);
    });
    
    return item;
  },
  
  // Update activity item
  updateActivityItem: function(item, activity) {
    // Find elements
    const title = item.querySelector('.activity-title');
    const contractLink = item.querySelector('.activity-contract');
    const timestamp = item.querySelector('.activity-time');
    
    // Update content
    if (title) {
      // Set title based on activity type
      let titleText = '';
      switch(activity.type) {
        case 'contract_created':
          titleText = 'Contract Created';
          break;
        case 'invite_sent':
          titleText = 'Invite Sent';
          break;
        case 'contract_signed':
          titleText = `${activity.actor.name} Signed`;
          break;
        case 'payment_received':
          titleText = 'Payment Received';
          break;
        default:
          titleText = activity.description;
      }
      title.textContent = titleText;
    }
    
    if (contractLink) {
      contractLink.textContent = activity.contractTitle;
    }
    
    if (timestamp) {
      timestamp.textContent = SplUtils.formatRelativeTime(activity.timestamp);
    }
  },
  
  // Initialize upcoming payments section
  initializeUpcomingPayments: function() {
    SplUtils.log('Initializing upcoming payments');
    
    // Find payments container
    const paymentsContainer = document.querySelector('.upcoming-payments, .payments-list');
    if (!paymentsContainer) {
      SplUtils.log('No upcoming payments container found');
      return;
    }
    
    // Get upcoming payments
    const payments = SplMockData.getUpcomingPayments();
    
    // Find existing payment items
    const existingItems = paymentsContainer.querySelectorAll('.payment-item');
    
    // If there are payment items, update them
    if (existingItems.length > 0) {
      existingItems.forEach((item, index) => {
        if (index < payments.length) {
          this.updatePaymentItem(item, payments[index]);
        } else {
          item.style.display = 'none';
        }
      });
    } else {
      // Create payment items
      payments.forEach(payment => {
        const paymentItem = this.createPaymentItem(payment);
        paymentsContainer.appendChild(paymentItem);
      });
    }
  },
  
  // Create payment item
  createPaymentItem: function(payment) {
    // Get contract info
    const contract = SplMockData.getContractById(payment.contractId);
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
    
    // Create contract info
    const contractInfo = document.createElement('div');
    contractInfo.className = 'payment-contract';
    contractInfo.style.display = 'flex';
    contractInfo.style.alignItems = 'center';
    
    // Create contract icon
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
    icon.style.flexShrink = '0';
    icon.textContent = '💰';
    
    // Create contract name
    const contractName = document.createElement('div');
    contractName.className = 'payment-contract-name';
    contractName.style.fontWeight = 'bold';
    contractName.textContent = contract.title;
    
    // Create payment details
    const paymentDetails = document.createElement('div');
    paymentDetails.className = 'payment-details';
    paymentDetails.style.display = 'flex';
    paymentDetails.style.alignItems = 'center';
    
    // Create payment amount
    const amount = document.createElement('div');
    amount.className = 'payment-amount';
    amount.style.fontWeight = 'bold';
    amount.style.marginRight = '12px';
    amount.textContent = SplUtils.formatCurrency(payment.amount, payment.currency);
    
    // Create payment date
    const date = document.createElement('div');
    date.className = 'payment-date';
    date.style.fontSize = '14px';
    date.style.color = '#888';
    date.textContent = SplUtils.formatDate(payment.date);
    
    // Assemble
    contractInfo.appendChild(icon);
    contractInfo.appendChild(contractName);
    paymentDetails.appendChild(amount);
    paymentDetails.appendChild(date);
    item.appendChild(contractInfo);
    item.appendChild(paymentDetails);
    
    return item;
  },
  
  // Update payment item
  updatePaymentItem: function(item, payment) {
    // Get contract info
    const contract = SplMockData.getContractById(payment.contractId);
    if (!contract) return;
    
    // Find elements
    const contractName = item.querySelector('.payment-contract-name');
    const amount = item.querySelector('.payment-amount');
    const date = item.querySelector('.payment-date');
    
    // Update content
    if (contractName) {
      contractName.textContent = contract.title;
    }
    
    if (amount) {
      amount.textContent = SplUtils.formatCurrency(payment.amount, payment.currency);
    }
    
    if (date) {
      date.textContent = SplUtils.formatDate(payment.date);
    }
  }
    }
    
    // Initialize contract buttons
    this.init// Splitra Dashboard Implementation - FIXED VERSION
// This script integrates with your existing Webflow structure

// First, load Chart.js if not already loaded
(function loadChartJs() {
  if (typeof Chart !== 'undefined') return; // Already loaded
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = function() {
    console.log('Chart.js loaded dynamically');
    // Initialize charts after Chart.js loads
    if (typeof SplCharts !== 'undefined') {
      SplCharts.initializeDashboardCharts();
    }
  };
  document.head.appendChild(script);
})();

// ================================
// CONFIGURATION
// ================================
const SPLITRA_CONFIG = {
  useTestData: true,                   // Set to false for production
  apiUrl: 'https://api.splitra.com',   // Replace with your actual API endpoint
  enableConsoleLogging: true,          // Enable/disable console logging
  defaultCurrency: 'ETH',              // Default currency for display
  pages: {
    dashboard: '/dashboard',
    contractDetails: '/contract',
    activities: '/activities',
    profile: '/profile',
    settings: '/settings'
  }
};

// ================================
// MOCK DATA
// ================================
const SplMockData = {
  // User profile data
  user: {
    id: 'user-001',
    name: 'Demo User',
    wallet: '0x7A23C4A31C94e7895AC495f3669e4a26C877d9a6',
    walletShort: '0x7A23...9a6',
    email: 'demo@splitra.io',
    avatar: null,
    balance: 3.45,
    totalContracts: 12,
    activeContracts: 7, 
    activeCollaborators: 18,
    joinedAt: '2024-12-01T10:00:00Z'
  },
  
  // All contracts
  contracts: [
    {
      id: 'contract-001',
      title: 'Summery Album Project',
      description: 'Music album collaboration contract with revenue sharing for producers, artists, and engineers',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 54, isCurrentUser: true, role: 'Producer' },
        { id: 'user-002', name: 'John Smith', revenueShare: 21, role: 'Artist' },
        { id: 'user-003', name: 'Alice Johnson', revenueShare: 15, role: 'Engineer' },
        { id: 'user-004', name: 'Bob Williams', revenueShare: 10, role: 'Marketing' }
      ],
      type: 'Music',
      icon: 'music-note',
      participantsJoined: 3,
      participantsTotal: 4,
      contractValue: 0.21564984,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z',
      deploymentTx: '0x8a74d7f52c93568c3b0579fcce829e3a294c998a93b638e5e07350d7f37c1986',
      network: 'polygon'
    },
    {
      id: 'contract-002',
      title: 'Digital Art Collection',
      description: 'Visual art collaboration for NFT series',
      status: 'pending',
      statusDisplay: 'Pending',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 60, isCurrentUser: true, role: 'Artist' },
        { id: 'user-005', name: 'Emily Chen', revenueShare: 40, role: 'Designer' }
      ],
      type: 'Art',
      icon: 'art',
      participantsJoined: 2,
      participantsTotal: 2,
      contractValue: 0.5489,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z',
      deploymentTx: null,
      network: 'polygon'
    },
    {
      id: 'contract-003',
      title: 'Marketing Campaign',
      description: 'Collaborative marketing project for brand launch',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 35, isCurrentUser: true, role: 'Strategist' },
        { id: 'user-006', name: 'Marketing Agency', revenueShare: 45, role: 'Agency' },
        { id: 'user-007', name: 'Content Creator', revenueShare: 20, role: 'Creator' }
      ],
      type: 'Service',
      icon: 'service',
      participantsJoined: 3,
      participantsTotal: 3,
      contractValue: 1.23456,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z',
      deploymentTx: '0x9b45a7382a0ee1a37adeaa5bbffc3f5456ae4c7d5a4172e667bb3b99172e39a6',
      network: 'polygon'
    },
    {
      id: 'contract-004',
      title: 'Game Development Project',
      description: 'Revenue sharing for indie game development team',
      status: 'draft',
      statusDisplay: 'Draft',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 25, isCurrentUser: true, role: 'Developer' },
        { id: 'user-008', name: 'Sarah Parker', revenueShare: 25, role: 'Artist' },
        { id: 'user-009', name: 'Mike Johnson', revenueShare: 25, role: 'Designer' },
        { id: 'user-010', name: 'Laura Smith', revenueShare: 25, role: 'Sound' }
      ],
      type: 'Gaming',
      icon: 'gaming',
      participantsJoined: 1,
      participantsTotal: 4,
      contractValue: 0,
      totalRevenue: 0,
      currency: 'ETH',
      createdAt: '2025-04-25T09:00:00Z',
      lastUpdated: '2025-04-25T09:00:00Z',
      deploymentTx: null,
      network: 'polygon'
    }
  ],
  
  // Activities
  activities: [
    {
      id: 'activity-001',
      type: 'contract_created',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:00:00Z',
      description: 'Contract created'
    },
    {
      id: 'activity-002',
      type: 'invite_sent',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:05:00Z',
      description: 'Invited collaborators to join'
    },
    {
      id: 'activity-003',
      type: 'contract_signed',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-002', name: 'John Smith' },
      timestamp: '2025-04-16T09:30:00Z',
      description: 'Signed the contract'
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      amount: 0.05,
      currency: 'ETH',
      timestamp: '2025-04-20T15:45:00Z',
      description: 'Payment received'
    }
  ],
  
  // Upcoming payments (mock data)
  upcomingPayments: [
    { id: 'payment-001', contractId: 'contract-001', amount: 0.05, currency: 'ETH', date: '2025-05-10T12:00:00Z' },
    { id: 'payment-002', contractId: 'contract-003', amount: 0.08, currency: 'ETH', date: '2025-05-17T12:00:00Z' },
    { id: 'payment-003', contractId: 'contract-001', amount: 0.12, currency: 'ETH', date: '2025-05-24T12:00:00Z' },
    { id: 'payment-004', contractId: 'contract-003', amount: 0.07, currency: 'ETH', date: '2025-05-31T12:00:00Z' }
  ],
  
  // Helper methods to get specific data
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getContractsByType: function(type) {
    return this.contracts.filter(c => c.type.toLowerCase() === type.toLowerCase());
  },
  
  getActivitiesByContract: function(contractId) {
    return this.activities.filter(a => a.contractId === contractId);
  },
  
  getRecentActivities: function(limit = 5) {
    // Sort by timestamp (most recent first) and take the specified limit
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 4) {
    // Sort by date (earliest first) and take the specified limit
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================
const SplUtils = {
  // Logging with prefix
  log: function(message, data) {
    if (SPLITRA_CONFIG.enableConsoleLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging with prefix
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Format currency values
  formatCurrency: function(value, currency = SPLITRA_CONFIG.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
    if (currency === 'ETH') {
      return value.toFixed(5) + ' ETH';
    } else if (currency === 'USD') {
      return '$' + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as human readable
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Copy text to clipboard
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
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    // Create or find toast element
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
    
    // Hide after specified duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// ================================
// CHART IMPLEMENTATION
// ================================
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize chart with Chart.js
  initChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUtils.error(`Canvas not found with ID: ${canvasId}`);
      return null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUtils.error('Chart.js not loaded');
      return null;
    }
    
    // Create chart
    try {
      // Destroy existing chart if it exists
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      // Store for later reference
      this.charts[canvasId] = chart;
      SplUtils.log(`Chart created for ${canvasId}`);
      
      return chart;
    } catch (error) {
      SplUtils.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart (donut)
  createRevenueChart: function() {
    SplUtils.log('Creating revenue chart');
    
    // Find container and create canvas
    let chartContainer = document.querySelector('.revenue-chart, .revenue-chart-container, .pie-chart-parent, .pie-chart-placeholder');
    
    if (!chartContainer) {
      // Try to find a good container by looking for common elements
      const statsSection = document.querySelector('.home-stats-section, .stats-wrapper');
      if (statsSection) {
        // Look for chart placeholders in the stats section
        chartContainer = statsSection.querySelector('.chart-image');
        
        if (!chartContainer) {
          // Try to find any element that might be a chart container
          const possibleContainers = statsSection.querySelectorAll('div, img');
          for (let i = 0; i < possibleContainers.length; i++) {
            const el = possibleContainers[i];
            // If element contains img that might be a chart placeholder
            if (el.querySelector('img') || el.style.width || el.className.includes('chart')) {
              chartContainer = el;
              break;
            }
          }
        }
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Revenue chart container not found');
      return null;
    }
    
    SplUtils.log('Found revenue chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-distribution-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get first active contract for the chart
    const contract = SplMockData.getActiveContracts()[0];
    if (!contract) {
      SplUtils.error('No active contract found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = contract.participants.map(p => p.name);
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#6366F1'  // Indigo
    ];
    
    // Create chart
    const chart = this.initChart(canvas.id, 'doughnut', {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#FFF',
            font: {
              family: 'Inter, sans-serif',
              size: 12
            },
            boxWidth: 12,
            padding: 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text for user's share
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add centered text to doughnut chart
  addCenterText: function(chart, text) {
    const originalDraw = chart.draw;
    
    chart.draw = function() {
      originalDraw.apply(this, arguments);
      
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, width / 2, height / 2);
      ctx.save();
    };
    
    chart.update();
  },
  
  // Create upcoming payments chart
  createPaymentsChart: function() {
    SplUtils.log('Creating payments chart');
    
    // Find container
    let chartContainer = document.querySelector('.upcoming-chart, .upcoming-chart-container, .payments-chart');
    
    if (!chartContainer) {
      // Try to find by content
      const upcomingSection = Array.from(document.querySelectorAll('div')).find(el => {
        // Look for section titles that indicate upcoming payments
        const heading = el.querySelector('h2, h3, .heading');
        return heading && heading.textContent.includes('Upcoming');
      });
      
      if (upcomingSection) {
        // Look for chart placeholders
        chartContainer = upcomingSection.querySelector('img, .chart-image, [class*="chart"]');
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Payments chart container not found');
      return null;
    }
    
    SplUtils.log('Found payments chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'upcoming-payments-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get upcoming payments data
    const payments = SplMockData.getUpcomingPayments();
    
    // Prepare chart data
    const chartData = {
      labels: payments.map(p => SplUtils.formatDate(p.date)),
      datasets: [{
        label: 'ETH',
        data: payments.map(p => p.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
    
    // Create chart
    const chart = this.initChart(canvas.id, 'line', chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            callback: function(value) {
              return value.toFixed(2) + ' ETH';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#aaa'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
    
    return chart;
  },
  
  // Initialize all charts on the dashboard
  initializeDashboardCharts: function() {
    SplUtils.log('Initializing dashboard charts');
    
    try {
      // Check if Chart.js is available
      if (typeof Chart === 'undefined') {
        SplUtils.error('Chart.js not loaded. Please include Chart.js in your project.');
        return false;
      }
      
      // Create main revenue chart
      this.createRevenueChart();
      
      // Create upcoming payments chart
      this.createPaymentsChart();
      
      SplUtils.log('Dashboard charts initialized');
      return true;
    } catch (error) {
      SplUtils.error('Error initializing charts:', error);
      return false;
    }
  }
};

// ================================
// DASHBOARD IMPLEMENTATION
// ================================
const Splitra = {
  // Initialize application
  init: function() {
    SplUtils.log('Initializing Splitra application');
    
    try {
      // Add test mode indicator
      if (SPLITRA_CONFIG.useTestData) {
        this.addTestModeIndicator();
      }
      
      // Initialize dashboard components
      this.initializeContractCards();
      this.initializeFilterButtons();
      this.initializeStatCards();
      this.initializeRecentActivity();
      this.initializeUpcomingPayments();
      
      // Initialize charts if Chart.js is available
      if (typeof Chart !== 'undefined') {
        SplCharts.initializeDashboardCharts();
      } else {
        SplUtils.log('Chart.js not available, charts will not be initialized');
      }
      
      SplUtils.log('Splitra application initialized successfully');
      SplUtils.showToast('Dashboard initialized with test data', 'info');
    } catch (error) {
      SplUtils.error('Error initializing Splitra:', error);
      console.error('Splitra initialization error:', error);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
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
  },
  
  // Initialize contract cards
  initializeContractCards: function() {
    SplUtils.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUtils.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      cardsContainer.style.display = 'flex';
      cardsContainer.style.overflowX = 'auto';
      cardsContainer.style.padding = '4px 0 16px';
      cardsContainer.style.scrollSnapType = 'x mandatory';
      cardsContainer.style.scrollBehavior = 'smooth';
      cardsContainer.style.WebkitOverflowScrolling = 'touch';
      
      // Make scrollbar less obtrusive
      cardsContainer.style.scrollbarWidth = 'thin';
      cardsContainer.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
      
      // Add styling for cards
      contractCards.forEach((card, index) => {
        if (index < SplMockData.contracts.length) {
          const contract = SplMockData.contracts[index];
          
          // Set data attributes
          card.setAttribute('data-contract-id', contract.id);
          card.setAttribute('data-status', contract.status);
          card.setAttribute('data-type', contract.type.toLowerCase());
          
          // Set card style
          card.style.flex = '0 0 auto';
          card.style.marginRight = '16px';
          card.style.scrollSnapAlign = 'start';
          card.style.cursor = 'pointer';
          
          // Set card content
          this.populateContractCard(card, contract);
          
          // Make card clickable
          card.addEventListener('click', (e) => {
            // Prevent click if clicking on a button
            if (e.target.closest('. + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as human readable
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Copy text to clipboard
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
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    // Create or find toast element
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
    
    // Hide after specified duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// ================================
// CHART IMPLEMENTATION
// ================================
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize chart with Chart.js
  initChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUtils.error(`Canvas not found with ID: ${canvasId}`);
      return null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUtils.error('Chart.js not loaded');
      return null;
    }
    
    // Create chart
    try {
      // Destroy existing chart if it exists
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      // Store for later reference
      this.charts[canvasId] = chart;
      SplUtils.log(`Chart created for ${canvasId}`);
      
      return chart;
    } catch (error) {
      SplUtils.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart (donut)
  createRevenueChart: function() {
    SplUtils.log('Creating revenue chart');
    
    // Find container and create canvas
    let chartContainer = document.querySelector('.revenue-chart, .revenue-chart-container, .pie-chart-parent, .pie-chart-placeholder');
    
    if (!chartContainer) {
      // Try to find a good container by looking for common elements
      const statsSection = document.querySelector('.home-stats-section, .stats-wrapper');
      if (statsSection) {
        // Look for chart placeholders in the stats section
        chartContainer = statsSection.querySelector('.chart-image');
        
        if (!chartContainer) {
          // Try to find any element that might be a chart container
          const possibleContainers = statsSection.querySelectorAll('div, img');
          for (let i = 0; i < possibleContainers.length; i++) {
            const el = possibleContainers[i];
            // If element contains img that might be a chart placeholder
            if (el.querySelector('img') || el.style.width || el.className.includes('chart')) {
              chartContainer = el;
              break;
            }
          }
        }
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Revenue chart container not found');
      return null;
    }
    
    SplUtils.log('Found revenue chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-distribution-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get first active contract for the chart
    const contract = SplMockData.getActiveContracts()[0];
    if (!contract) {
      SplUtils.error('No active contract found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = contract.participants.map(p => p.name);
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#6366F1'  // Indigo
    ];
    
    // Create chart
    const chart = this.initChart(canvas.id, 'doughnut', {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#FFF',
            font: {
              family: 'Inter, sans-serif',
              size: 12
            },
            boxWidth: 12,
            padding: 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text for user's share
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add centered text to doughnut chart
  addCenterText: function(chart, text) {
    const originalDraw = chart.draw;
    
    chart.draw = function() {
      originalDraw.apply(this, arguments);
      
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, width / 2, height / 2);
      ctx.save();
    };
    
    chart.update();
  },
  
  // Create upcoming payments chart
  createPaymentsChart: function() {
    SplUtils.log('Creating payments chart');
    
    // Find container
    let chartContainer = document.querySelector('.upcoming-chart, .upcoming-chart-container, .payments-chart');
    
    if (!chartContainer) {
      // Try to find by content
      const upcomingSection = Array.from(document.querySelectorAll('div')).find(el => {
        // Look for section titles that indicate upcoming payments
        const heading = el.querySelector('h2, h3, .heading');
        return heading && heading.textContent.includes('Upcoming');
      });
      
      if (upcomingSection) {
        // Look for chart placeholders
        chartContainer = upcomingSection.querySelector('img, .chart-image, [class*="chart"]');
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Payments chart container not found');
      return null;
    }
    
    SplUtils.log('Found payments chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'upcoming-payments-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get upcoming payments data
    const payments = SplMockData.getUpcomingPayments();
    
    // Prepare chart data
    const chartData = {
      labels: payments.map(p => SplUtils.formatDate(p.date)),
      datasets: [{
        label: 'ETH',
        data: payments.map(p => p.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
    
    // Create chart
    const chart = this.initChart(canvas.id, 'line', chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            callback: function(value) {
              return value.toFixed(2) + ' ETH';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#aaa'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
    
    return chart;
  },
  
  // Initialize all charts on the dashboard
  initializeDashboardCharts: function() {
    SplUtils.log('Initializing dashboard charts');
    
    try {
      // Check if Chart.js is available
      if (typeof Chart === 'undefined') {
        SplUtils.error('Chart.js not loaded. Please include Chart.js in your project.');
        return false;
      }
      
      // Create main revenue chart
      this.createRevenueChart();
      
      // Create upcoming payments chart
      this.createPaymentsChart();
      
      SplUtils.log('Dashboard charts initialized');
      return true;
    } catch (error) {
      SplUtils.error('Error initializing charts:', error);
      return false;
    }
  }
};

// ================================
// DASHBOARD IMPLEMENTATION
// ================================
const Splitra = {
  // Initialize application
  init: function() {
    SplUtils.log('Initializing Splitra application');
    
    try {
      // Add test mode indicator
      if (SPLITRA_CONFIG.useTestData) {
        this.addTestModeIndicator();
      }
      
      // Initialize dashboard components
      this.initializeContractCards();
      this.initializeFilterButtons();
      this.initializeStatCards();
      this.initializeRecentActivity();
      this.initializeUpcomingPayments();
      
      // Initialize charts if Chart.js is available
      if (typeof Chart !== 'undefined') {
        SplCharts.initializeDashboardCharts();
      } else {
        SplUtils.log('Chart.js not available, charts will not be initialized');
      }
      
      SplUtils.log('Splitra application initialized successfully');
      SplUtils.showToast('Dashboard initialized with test data', 'info');
    } catch (error) {
      SplUtils.error('Error initializing Splitra:', error);
      console.error('Splitra initialization error:', error);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
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
  },
  
  // Initialize contract cards
  initializeContractCards: function() {
    SplUtils.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUtils.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      cardsContainer.style.display = 'flex';
      cardsContainer.style.overflowX = 'auto';
      cardsContainer.style.padding = '4px 0 16px';
      cardsContainer.style.scrollSnapType = 'x mandatory';
      cardsContainer.style.scrollBehavior = 'smooth';
      cardsContainer.style.WebkitOverflowScrolling = 'touch';
      
      // Make scrollbar less obtrusive
      cardsContainer.style.scrollbarWidth = 'thin';
      cardsContainer.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
      
      // Add styling for cards
      contractCards.forEach((card, index) => {
        if (index < SplMockData.contracts.length) {
          const contract = SplMockData.contracts[index];
          
          // Set data attributes
          card.setAttribute('data-contract-id', contract.id);
          card.setAttribute('data-status', contract.status);
          card.setAttribute('data-type', contract.type.toLowerCase());
          
          // Set card style
          card.style.flex = '0 0 auto';
          card.style.marginRight = '16px';
          card.style.scrollSnapAlign = 'start';
          card.style.cursor = 'pointer';
          
          // Set card content
          this.populateContractCard(card, contract);
          
          // Make card clickable
          card.addEventListener('click', (e) => {
            // Prevent click if clicking on a button
            if (e.target.closest('button') || e.target.tagName === 'BUTTON') {
              return;
            }
            
            SplUtils.log('Navigating to contract details:', contract.id);
            // For now, just show a toast since we don't have the contract details page yet
            SplUtils.showToast(`Viewing contract: ${contract.title}`);
            // In a real implementation, this would navigate to the contract details page
            // window.location.href = `/contract?id=${contract.id}`;
          });
        } else {
          // Hide extra cards
          card.style.display = 'none';
        }
      });// Splitra Dashboard Implementation - FIXED VERSION
// This script integrates with your existing Webflow structure

// First, load Chart.js if not already loaded
(function loadChartJs() {
  if (typeof Chart !== 'undefined') return; // Already loaded
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = function() {
    console.log('Chart.js loaded dynamically');
    // Initialize charts after Chart.js loads
    if (typeof SplCharts !== 'undefined') {
      SplCharts.initializeDashboardCharts();
    }
  };
  document.head.appendChild(script);
})();

// ================================
// CONFIGURATION
// ================================
const SPLITRA_CONFIG = {
  useTestData: true,                   // Set to false for production
  apiUrl: 'https://api.splitra.com',   // Replace with your actual API endpoint
  enableConsoleLogging: true,          // Enable/disable console logging
  defaultCurrency: 'ETH',              // Default currency for display
  pages: {
    dashboard: '/dashboard',
    contractDetails: '/contract',
    activities: '/activities',
    profile: '/profile',
    settings: '/settings'
  }
};

// ================================
// MOCK DATA
// ================================
const SplMockData = {
  // User profile data
  user: {
    id: 'user-001',
    name: 'Demo User',
    wallet: '0x7A23C4A31C94e7895AC495f3669e4a26C877d9a6',
    walletShort: '0x7A23...9a6',
    email: 'demo@splitra.io',
    avatar: null,
    balance: 3.45,
    totalContracts: 12,
    activeContracts: 7, 
    activeCollaborators: 18,
    joinedAt: '2024-12-01T10:00:00Z'
  },
  
  // All contracts
  contracts: [
    {
      id: 'contract-001',
      title: 'Summery Album Project',
      description: 'Music album collaboration contract with revenue sharing for producers, artists, and engineers',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 54, isCurrentUser: true, role: 'Producer' },
        { id: 'user-002', name: 'John Smith', revenueShare: 21, role: 'Artist' },
        { id: 'user-003', name: 'Alice Johnson', revenueShare: 15, role: 'Engineer' },
        { id: 'user-004', name: 'Bob Williams', revenueShare: 10, role: 'Marketing' }
      ],
      type: 'Music',
      icon: 'music-note',
      participantsJoined: 3,
      participantsTotal: 4,
      contractValue: 0.21564984,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z',
      deploymentTx: '0x8a74d7f52c93568c3b0579fcce829e3a294c998a93b638e5e07350d7f37c1986',
      network: 'polygon'
    },
    {
      id: 'contract-002',
      title: 'Digital Art Collection',
      description: 'Visual art collaboration for NFT series',
      status: 'pending',
      statusDisplay: 'Pending',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 60, isCurrentUser: true, role: 'Artist' },
        { id: 'user-005', name: 'Emily Chen', revenueShare: 40, role: 'Designer' }
      ],
      type: 'Art',
      icon: 'art',
      participantsJoined: 2,
      participantsTotal: 2,
      contractValue: 0.5489,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z',
      deploymentTx: null,
      network: 'polygon'
    },
    {
      id: 'contract-003',
      title: 'Marketing Campaign',
      description: 'Collaborative marketing project for brand launch',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 35, isCurrentUser: true, role: 'Strategist' },
        { id: 'user-006', name: 'Marketing Agency', revenueShare: 45, role: 'Agency' },
        { id: 'user-007', name: 'Content Creator', revenueShare: 20, role: 'Creator' }
      ],
      type: 'Service',
      icon: 'service',
      participantsJoined: 3,
      participantsTotal: 3,
      contractValue: 1.23456,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z',
      deploymentTx: '0x9b45a7382a0ee1a37adeaa5bbffc3f5456ae4c7d5a4172e667bb3b99172e39a6',
      network: 'polygon'
    },
    {
      id: 'contract-004',
      title: 'Game Development Project',
      description: 'Revenue sharing for indie game development team',
      status: 'draft',
      statusDisplay: 'Draft',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 25, isCurrentUser: true, role: 'Developer' },
        { id: 'user-008', name: 'Sarah Parker', revenueShare: 25, role: 'Artist' },
        { id: 'user-009', name: 'Mike Johnson', revenueShare: 25, role: 'Designer' },
        { id: 'user-010', name: 'Laura Smith', revenueShare: 25, role: 'Sound' }
      ],
      type: 'Gaming',
      icon: 'gaming',
      participantsJoined: 1,
      participantsTotal: 4,
      contractValue: 0,
      totalRevenue: 0,
      currency: 'ETH',
      createdAt: '2025-04-25T09:00:00Z',
      lastUpdated: '2025-04-25T09:00:00Z',
      deploymentTx: null,
      network: 'polygon'
    }
  ],
  
  // Activities
  activities: [
    {
      id: 'activity-001',
      type: 'contract_created',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:00:00Z',
      description: 'Contract created'
    },
    {
      id: 'activity-002',
      type: 'invite_sent',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:05:00Z',
      description: 'Invited collaborators to join'
    },
    {
      id: 'activity-003',
      type: 'contract_signed',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-002', name: 'John Smith' },
      timestamp: '2025-04-16T09:30:00Z',
      description: 'Signed the contract'
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      amount: 0.05,
      currency: 'ETH',
      timestamp: '2025-04-20T15:45:00Z',
      description: 'Payment received'
    }
  ],
  
  // Upcoming payments (mock data)
  upcomingPayments: [
    { id: 'payment-001', contractId: 'contract-001', amount: 0.05, currency: 'ETH', date: '2025-05-10T12:00:00Z' },
    { id: 'payment-002', contractId: 'contract-003', amount: 0.08, currency: 'ETH', date: '2025-05-17T12:00:00Z' },
    { id: 'payment-003', contractId: 'contract-001', amount: 0.12, currency: 'ETH', date: '2025-05-24T12:00:00Z' },
    { id: 'payment-004', contractId: 'contract-003', amount: 0.07, currency: 'ETH', date: '2025-05-31T12:00:00Z' }
  ],
  
  // Helper methods to get specific data
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getContractsByType: function(type) {
    return this.contracts.filter(c => c.type.toLowerCase() === type.toLowerCase());
  },
  
  getActivitiesByContract: function(contractId) {
    return this.activities.filter(a => a.contractId === contractId);
  },
  
  getRecentActivities: function(limit = 5) {
    // Sort by timestamp (most recent first) and take the specified limit
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 4) {
    // Sort by date (earliest first) and take the specified limit
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================
const SplUtils = {
  // Logging with prefix
  log: function(message, data) {
    if (SPLITRA_CONFIG.enableConsoleLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging with prefix
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Format currency values
  formatCurrency: function(value, currency = SPLITRA_CONFIG.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
    if (currency === 'ETH') {
      return value.toFixed(5) + ' ETH';
    } else if (currency === 'USD') {
      return '// Splitra Dashboard Implementation - FIXED VERSION
// This script integrates with your existing Webflow structure

// First, load Chart.js if not already loaded
(function loadChartJs() {
  if (typeof Chart !== 'undefined') return; // Already loaded
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = function() {
    console.log('Chart.js loaded dynamically');
    // Initialize charts after Chart.js loads
    if (typeof SplCharts !== 'undefined') {
      SplCharts.initializeDashboardCharts();
    }
  };
  document.head.appendChild(script);
})();

// ================================
// CONFIGURATION
// ================================
const SPLITRA_CONFIG = {
  useTestData: true,                   // Set to false for production
  apiUrl: 'https://api.splitra.com',   // Replace with your actual API endpoint
  enableConsoleLogging: true,          // Enable/disable console logging
  defaultCurrency: 'ETH',              // Default currency for display
  pages: {
    dashboard: '/dashboard',
    contractDetails: '/contract',
    activities: '/activities',
    profile: '/profile',
    settings: '/settings'
  }
};

// ================================
// MOCK DATA
// ================================
const SplMockData = {
  // User profile data
  user: {
    id: 'user-001',
    name: 'Demo User',
    wallet: '0x7A23C4A31C94e7895AC495f3669e4a26C877d9a6',
    walletShort: '0x7A23...9a6',
    email: 'demo@splitra.io',
    avatar: null,
    balance: 3.45,
    totalContracts: 12,
    activeContracts: 7, 
    activeCollaborators: 18,
    joinedAt: '2024-12-01T10:00:00Z'
  },
  
  // All contracts
  contracts: [
    {
      id: 'contract-001',
      title: 'Summery Album Project',
      description: 'Music album collaboration contract with revenue sharing for producers, artists, and engineers',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 54, isCurrentUser: true, role: 'Producer' },
        { id: 'user-002', name: 'John Smith', revenueShare: 21, role: 'Artist' },
        { id: 'user-003', name: 'Alice Johnson', revenueShare: 15, role: 'Engineer' },
        { id: 'user-004', name: 'Bob Williams', revenueShare: 10, role: 'Marketing' }
      ],
      type: 'Music',
      icon: 'music-note',
      participantsJoined: 3,
      participantsTotal: 4,
      contractValue: 0.21564984,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z',
      deploymentTx: '0x8a74d7f52c93568c3b0579fcce829e3a294c998a93b638e5e07350d7f37c1986',
      network: 'polygon'
    },
    {
      id: 'contract-002',
      title: 'Digital Art Collection',
      description: 'Visual art collaboration for NFT series',
      status: 'pending',
      statusDisplay: 'Pending',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 60, isCurrentUser: true, role: 'Artist' },
        { id: 'user-005', name: 'Emily Chen', revenueShare: 40, role: 'Designer' }
      ],
      type: 'Art',
      icon: 'art',
      participantsJoined: 2,
      participantsTotal: 2,
      contractValue: 0.5489,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z',
      deploymentTx: null,
      network: 'polygon'
    },
    {
      id: 'contract-003',
      title: 'Marketing Campaign',
      description: 'Collaborative marketing project for brand launch',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 35, isCurrentUser: true, role: 'Strategist' },
        { id: 'user-006', name: 'Marketing Agency', revenueShare: 45, role: 'Agency' },
        { id: 'user-007', name: 'Content Creator', revenueShare: 20, role: 'Creator' }
      ],
      type: 'Service',
      icon: 'service',
      participantsJoined: 3,
      participantsTotal: 3,
      contractValue: 1.23456,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z',
      deploymentTx: '0x9b45a7382a0ee1a37adeaa5bbffc3f5456ae4c7d5a4172e667bb3b99172e39a6',
      network: 'polygon'
    },
    {
      id: 'contract-004',
      title: 'Game Development Project',
      description: 'Revenue sharing for indie game development team',
      status: 'draft',
      statusDisplay: 'Draft',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 25, isCurrentUser: true, role: 'Developer' },
        { id: 'user-008', name: 'Sarah Parker', revenueShare: 25, role: 'Artist' },
        { id: 'user-009', name: 'Mike Johnson', revenueShare: 25, role: 'Designer' },
        { id: 'user-010', name: 'Laura Smith', revenueShare: 25, role: 'Sound' }
      ],
      type: 'Gaming',
      icon: 'gaming',
      participantsJoined: 1,
      participantsTotal: 4,
      contractValue: 0,
      totalRevenue: 0,
      currency: 'ETH',
      createdAt: '2025-04-25T09:00:00Z',
      lastUpdated: '2025-04-25T09:00:00Z',
      deploymentTx: null,
      network: 'polygon'
    }
  ],
  
  // Activities
  activities: [
    {
      id: 'activity-001',
      type: 'contract_created',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:00:00Z',
      description: 'Contract created'
    },
    {
      id: 'activity-002',
      type: 'invite_sent',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:05:00Z',
      description: 'Invited collaborators to join'
    },
    {
      id: 'activity-003',
      type: 'contract_signed',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-002', name: 'John Smith' },
      timestamp: '2025-04-16T09:30:00Z',
      description: 'Signed the contract'
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      amount: 0.05,
      currency: 'ETH',
      timestamp: '2025-04-20T15:45:00Z',
      description: 'Payment received'
    }
  ],
  
  // Upcoming payments (mock data)
  upcomingPayments: [
    { id: 'payment-001', contractId: 'contract-001', amount: 0.05, currency: 'ETH', date: '2025-05-10T12:00:00Z' },
    { id: 'payment-002', contractId: 'contract-003', amount: 0.08, currency: 'ETH', date: '2025-05-17T12:00:00Z' },
    { id: 'payment-003', contractId: 'contract-001', amount: 0.12, currency: 'ETH', date: '2025-05-24T12:00:00Z' },
    { id: 'payment-004', contractId: 'contract-003', amount: 0.07, currency: 'ETH', date: '2025-05-31T12:00:00Z' }
  ],
  
  // Helper methods to get specific data
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getContractsByType: function(type) {
    return this.contracts.filter(c => c.type.toLowerCase() === type.toLowerCase());
  },
  
  getActivitiesByContract: function(contractId) {
    return this.activities.filter(a => a.contractId === contractId);
  },
  
  getRecentActivities: function(limit = 5) {
    // Sort by timestamp (most recent first) and take the specified limit
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 4) {
    // Sort by date (earliest first) and take the specified limit
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================
const SplUtils = {
  // Logging with prefix
  log: function(message, data) {
    if (SPLITRA_CONFIG.enableConsoleLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging with prefix
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Format currency values
  formatCurrency: function(value, currency = SPLITRA_CONFIG.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
    if (currency === 'ETH') {
      return value.toFixed(5) + ' ETH';
    } else if (currency === 'USD') {
      return '$' + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as human readable
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Copy text to clipboard
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
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    // Create or find toast element
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
    
    // Hide after specified duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// ================================
// CHART IMPLEMENTATION
// ================================
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize chart with Chart.js
  initChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUtils.error(`Canvas not found with ID: ${canvasId}`);
      return null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUtils.error('Chart.js not loaded');
      return null;
    }
    
    // Create chart
    try {
      // Destroy existing chart if it exists
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      // Store for later reference
      this.charts[canvasId] = chart;
      SplUtils.log(`Chart created for ${canvasId}`);
      
      return chart;
    } catch (error) {
      SplUtils.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart (donut)
  createRevenueChart: function() {
    SplUtils.log('Creating revenue chart');
    
    // Find container and create canvas
    let chartContainer = document.querySelector('.revenue-chart, .revenue-chart-container, .pie-chart-parent, .pie-chart-placeholder');
    
    if (!chartContainer) {
      // Try to find a good container by looking for common elements
      const statsSection = document.querySelector('.home-stats-section, .stats-wrapper');
      if (statsSection) {
        // Look for chart placeholders in the stats section
        chartContainer = statsSection.querySelector('.chart-image');
        
        if (!chartContainer) {
          // Try to find any element that might be a chart container
          const possibleContainers = statsSection.querySelectorAll('div, img');
          for (let i = 0; i < possibleContainers.length; i++) {
            const el = possibleContainers[i];
            // If element contains img that might be a chart placeholder
            if (el.querySelector('img') || el.style.width || el.className.includes('chart')) {
              chartContainer = el;
              break;
            }
          }
        }
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Revenue chart container not found');
      return null;
    }
    
    SplUtils.log('Found revenue chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-distribution-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get first active contract for the chart
    const contract = SplMockData.getActiveContracts()[0];
    if (!contract) {
      SplUtils.error('No active contract found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = contract.participants.map(p => p.name);
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#6366F1'  // Indigo
    ];
    
    // Create chart
    const chart = this.initChart(canvas.id, 'doughnut', {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#FFF',
            font: {
              family: 'Inter, sans-serif',
              size: 12
            },
            boxWidth: 12,
            padding: 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text for user's share
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add centered text to doughnut chart
  addCenterText: function(chart, text) {
    const originalDraw = chart.draw;
    
    chart.draw = function() {
      originalDraw.apply(this, arguments);
      
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, width / 2, height / 2);
      ctx.save();
    };
    
    chart.update();
  },
  
  // Create upcoming payments chart
  createPaymentsChart: function() {
    SplUtils.log('Creating payments chart');
    
    // Find container
    let chartContainer = document.querySelector('.upcoming-chart, .upcoming-chart-container, .payments-chart');
    
    if (!chartContainer) {
      // Try to find by content
      const upcomingSection = Array.from(document.querySelectorAll('div')).find(el => {
        // Look for section titles that indicate upcoming payments
        const heading = el.querySelector('h2, h3, .heading');
        return heading && heading.textContent.includes('Upcoming');
      });
      
      if (upcomingSection) {
        // Look for chart placeholders
        chartContainer = upcomingSection.querySelector('img, .chart-image, [class*="chart"]');
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Payments chart container not found');
      return null;
    }
    
    SplUtils.log('Found payments chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'upcoming-payments-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get upcoming payments data
    const payments = SplMockData.getUpcomingPayments();
    
    // Prepare chart data
    const chartData = {
      labels: payments.map(p => SplUtils.formatDate(p.date)),
      datasets: [{
        label: 'ETH',
        data: payments.map(p => p.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
    
    // Create chart
    const chart = this.initChart(canvas.id, 'line', chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            callback: function(value) {
              return value.toFixed(2) + ' ETH';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#aaa'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
    
    return chart;
  },
  
  // Initialize all charts on the dashboard
  initializeDashboardCharts: function() {
    SplUtils.log('Initializing dashboard charts');
    
    try {
      // Check if Chart.js is available
      if (typeof Chart === 'undefined') {
        SplUtils.error('Chart.js not loaded. Please include Chart.js in your project.');
        return false;
      }
      
      // Create main revenue chart
      this.createRevenueChart();
      
      // Create upcoming payments chart
      this.createPaymentsChart();
      
      SplUtils.log('Dashboard charts initialized');
      return true;
    } catch (error) {
      SplUtils.error('Error initializing charts:', error);
      return false;
    }
  }
};

// ================================
// DASHBOARD IMPLEMENTATION
// ================================
const Splitra = {
  // Initialize application
  init: function() {
    SplUtils.log('Initializing Splitra application');
    
    try {
      // Add test mode indicator
      if (SPLITRA_CONFIG.useTestData) {
        this.addTestModeIndicator();
      }
      
      // Initialize dashboard components
      this.initializeContractCards();
      this.initializeFilterButtons();
      this.initializeStatCards();
      this.initializeRecentActivity();
      this.initializeUpcomingPayments();
      
      // Initialize charts if Chart.js is available
      if (typeof Chart !== 'undefined') {
        SplCharts.initializeDashboardCharts();
      } else {
        SplUtils.log('Chart.js not available, charts will not be initialized');
      }
      
      SplUtils.log('Splitra application initialized successfully');
      SplUtils.showToast('Dashboard initialized with test data', 'info');
    } catch (error) {
      SplUtils.error('Error initializing Splitra:', error);
      console.error('Splitra initialization error:', error);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
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
  },
  
  // Initialize contract cards
  initializeContractCards: function() {
    SplUtils.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUtils.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      cardsContainer.style.display = 'flex';
      cardsContainer.style.overflowX = 'auto';
      cardsContainer.style.padding = '4px 0 16px';
      cardsContainer.style.scrollSnapType = 'x mandatory';
      cardsContainer.style.scrollBehavior = 'smooth';
      cardsContainer.style.WebkitOverflowScrolling = 'touch';
      
      // Make scrollbar less obtrusive
      cardsContainer.style.scrollbarWidth = 'thin';
      cardsContainer.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
      
      // Add styling for cards
      contractCards.forEach((card, index) => {
        if (index < SplMockData.contracts.length) {
          const contract = SplMockData.contracts[index];
          
          // Set data attributes
          card.setAttribute('data-contract-id', contract.id);
          card.setAttribute('data-status', contract.status);
          card.setAttribute('data-type', contract.type.toLowerCase());
          
          // Set card style
          card.style.flex = '0 0 auto';
          card.style.marginRight = '16px';
          card.style.scrollSnapAlign = 'start';
          card.style.cursor = 'pointer';
          
          // Set card content
          this.populateContractCard(card, contract);
          
          // Make card clickable
          card.addEventListener('click', (e) => {
            // Prevent click if clicking on a button
            if (e.target.closest('. + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as human readable
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Copy text to clipboard
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
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    // Create or find toast element
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
    
    // Hide after specified duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// ================================
// CHART IMPLEMENTATION
// ================================
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize chart with Chart.js
  initChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUtils.error(`Canvas not found with ID: ${canvasId}`);
      return null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUtils.error('Chart.js not loaded');
      return null;
    }
    
    // Create chart
    try {
      // Destroy existing chart if it exists
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      // Store for later reference
      this.charts[canvasId] = chart;
      SplUtils.log(`Chart created for ${canvasId}`);
      
      return chart;
    } catch (error) {
      SplUtils.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart (donut)
  createRevenueChart: function() {
    SplUtils.log('Creating revenue chart');
    
    // Find container and create canvas
    let chartContainer = document.querySelector('.revenue-chart, .revenue-chart-container, .pie-chart-parent, .pie-chart-placeholder');
    
    if (!chartContainer) {
      // Try to find a good container by looking for common elements
      const statsSection = document.querySelector('.home-stats-section, .stats-wrapper');
      if (statsSection) {
        // Look for chart placeholders in the stats section
        chartContainer = statsSection.querySelector('.chart-image');
        
        if (!chartContainer) {
          // Try to find any element that might be a chart container
          const possibleContainers = statsSection.querySelectorAll('div, img');
          for (let i = 0; i < possibleContainers.length; i++) {
            const el = possibleContainers[i];
            // If element contains img that might be a chart placeholder
            if (el.querySelector('img') || el.style.width || el.className.includes('chart')) {
              chartContainer = el;
              break;
            }
          }
        }
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Revenue chart container not found');
      return null;
    }
    
    SplUtils.log('Found revenue chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-distribution-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get first active contract for the chart
    const contract = SplMockData.getActiveContracts()[0];
    if (!contract) {
      SplUtils.error('No active contract found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = contract.participants.map(p => p.name);
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#6366F1'  // Indigo
    ];
    
    // Create chart
    const chart = this.initChart(canvas.id, 'doughnut', {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#FFF',
            font: {
              family: 'Inter, sans-serif',
              size: 12
            },
            boxWidth: 12,
            padding: 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text for user's share
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add centered text to doughnut chart
  addCenterText: function(chart, text) {
    const originalDraw = chart.draw;
    
    chart.draw = function() {
      originalDraw.apply(this, arguments);
      
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, width / 2, height / 2);
      ctx.save();
    };
    
    chart.update();
  },
  
  // Create upcoming payments chart
  createPaymentsChart: function() {
    SplUtils.log('Creating payments chart');
    
    // Find container
    let chartContainer = document.querySelector('.upcoming-chart, .upcoming-chart-container, .payments-chart');
    
    if (!chartContainer) {
      // Try to find by content
      const upcomingSection = Array.from(document.querySelectorAll('div')).find(el => {
        // Look for section titles that indicate upcoming payments
        const heading = el.querySelector('h2, h3, .heading');
        return heading && heading.textContent.includes('Upcoming');
      });
      
      if (upcomingSection) {
        // Look for chart placeholders
        chartContainer = upcomingSection.querySelector('img, .chart-image, [class*="chart"]');
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Payments chart container not found');
      return null;
    }
    
    SplUtils.log('Found payments chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'upcoming-payments-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get upcoming payments data
    const payments = SplMockData.getUpcomingPayments();
    
    // Prepare chart data
    const chartData = {
      labels: payments.map(p => SplUtils.formatDate(p.date)),
      datasets: [{
        label: 'ETH',
        data: payments.map(p => p.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
    
    // Create chart
    const chart = this.initChart(canvas.id, 'line', chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            callback: function(value) {
              return value.toFixed(2) + ' ETH';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#aaa'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
    
    return chart;
  },
  
  // Initialize all charts on the dashboard
  initializeDashboardCharts: function() {
    SplUtils.log('Initializing dashboard charts');
    
    try {
      // Check if Chart.js is available
      if (typeof Chart === 'undefined') {
        SplUtils.error('Chart.js not loaded. Please include Chart.js in your project.');
        return false;
      }
      
      // Create main revenue chart
      this.createRevenueChart();
      
      // Create upcoming payments chart
      this.createPaymentsChart();
      
      SplUtils.log('Dashboard charts initialized');
      return true;
    } catch (error) {
      SplUtils.error('Error initializing charts:', error);
      return false;
    }
  }
};

// ================================
// DASHBOARD IMPLEMENTATION
// ================================
const Splitra = {
  // Initialize application
  init: function() {
    SplUtils.log('Initializing Splitra application');
    
    try {
      // Add test mode indicator
      if (SPLITRA_CONFIG.useTestData) {
        this.addTestModeIndicator();
      }
      
      // Initialize dashboard components
      this.initializeContractCards();
      this.initializeFilterButtons();
      this.initializeStatCards();
      this.initializeRecentActivity();
      this.initializeUpcomingPayments();
      
      // Initialize charts if Chart.js is available
      if (typeof Chart !== 'undefined') {
        SplCharts.initializeDashboardCharts();
      } else {
        SplUtils.log('Chart.js not available, charts will not be initialized');
      }
      
      SplUtils.log('Splitra application initialized successfully');
      SplUtils.showToast('Dashboard initialized with test data', 'info');
    } catch (error) {
      SplUtils.error('Error initializing Splitra:', error);
      console.error('Splitra initialization error:', error);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
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
  },
  
  // Initialize contract cards
  initializeContractCards: function() {
    SplUtils.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUtils.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      cardsContainer.style.display = 'flex';
      cardsContainer.style.overflowX = 'auto';
      cardsContainer.style.padding = '4px 0 16px';
      cardsContainer.style.scrollSnapType = 'x mandatory';
      cardsContainer.style.scrollBehavior = 'smooth';
      cardsContainer.style.WebkitOverflowScrolling = 'touch';
      
      // Make scrollbar less obtrusive
      cardsContainer.style.scrollbarWidth = 'thin';
      cardsContainer.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
      
      // Add styling for cards
      contractCards.forEach((card, index) => {
        if (index < SplMockData.contracts.length) {
          const contract = SplMockData.contracts[index];
          
          // Set data attributes
          card.setAttribute('data-contract-id', contract.id);
          card.setAttribute('data-status', contract.status);
          card.setAttribute('data-type', contract.type.toLowerCase());
          
          // Set card style
          card.style.flex = '0 0 auto';
          card.style.marginRight = '16px';
          card.style.scrollSnapAlign = 'start';
          card.style.cursor = 'pointer';
          
          // Set card content
          this.populateContractCard(card, contract);
          
          // Make card clickable
          card.addEventListener('click', (e) => {
            // Prevent click if clicking on a button
            if (e.target.closest('button') || e.target.tagName === 'BUTTON') {
              return;
            }
            
            SplUtils.log('Navigating to contract details:', contract.id);
            // For now, just show a toast since we don't have the contract details page yet
            SplUtils.showToast(`Viewing contract: ${contract.title}`);
            // In a real implementation, this would navigate to the contract details page
            // window.location.href = `/contract?id=${contract.id}`;
          });
        } else {
          // Hide extra cards
          card.style.display = 'none';
        }
      });
    }
    
    // Initialize contract buttons
    this.init// Splitra Dashboard Implementation - FIXED VERSION
// This script integrates with your existing Webflow structure

// First, load Chart.js if not already loaded
(function loadChartJs() {
  if (typeof Chart !== 'undefined') return; // Already loaded
  
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = function() {
    console.log('Chart.js loaded dynamically');
    // Initialize charts after Chart.js loads
    if (typeof SplCharts !== 'undefined') {
      SplCharts.initializeDashboardCharts();
    }
  };
  document.head.appendChild(script);
})();

// ================================
// CONFIGURATION
// ================================
const SPLITRA_CONFIG = {
  useTestData: true,                   // Set to false for production
  apiUrl: 'https://api.splitra.com',   // Replace with your actual API endpoint
  enableConsoleLogging: true,          // Enable/disable console logging
  defaultCurrency: 'ETH',              // Default currency for display
  pages: {
    dashboard: '/dashboard',
    contractDetails: '/contract',
    activities: '/activities',
    profile: '/profile',
    settings: '/settings'
  }
};

// ================================
// MOCK DATA
// ================================
const SplMockData = {
  // User profile data
  user: {
    id: 'user-001',
    name: 'Demo User',
    wallet: '0x7A23C4A31C94e7895AC495f3669e4a26C877d9a6',
    walletShort: '0x7A23...9a6',
    email: 'demo@splitra.io',
    avatar: null,
    balance: 3.45,
    totalContracts: 12,
    activeContracts: 7, 
    activeCollaborators: 18,
    joinedAt: '2024-12-01T10:00:00Z'
  },
  
  // All contracts
  contracts: [
    {
      id: 'contract-001',
      title: 'Summery Album Project',
      description: 'Music album collaboration contract with revenue sharing for producers, artists, and engineers',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 54, isCurrentUser: true, role: 'Producer' },
        { id: 'user-002', name: 'John Smith', revenueShare: 21, role: 'Artist' },
        { id: 'user-003', name: 'Alice Johnson', revenueShare: 15, role: 'Engineer' },
        { id: 'user-004', name: 'Bob Williams', revenueShare: 10, role: 'Marketing' }
      ],
      type: 'Music',
      icon: 'music-note',
      participantsJoined: 3,
      participantsTotal: 4,
      contractValue: 0.21564984,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z',
      deploymentTx: '0x8a74d7f52c93568c3b0579fcce829e3a294c998a93b638e5e07350d7f37c1986',
      network: 'polygon'
    },
    {
      id: 'contract-002',
      title: 'Digital Art Collection',
      description: 'Visual art collaboration for NFT series',
      status: 'pending',
      statusDisplay: 'Pending',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 60, isCurrentUser: true, role: 'Artist' },
        { id: 'user-005', name: 'Emily Chen', revenueShare: 40, role: 'Designer' }
      ],
      type: 'Art',
      icon: 'art',
      participantsJoined: 2,
      participantsTotal: 2,
      contractValue: 0.5489,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z',
      deploymentTx: null,
      network: 'polygon'
    },
    {
      id: 'contract-003',
      title: 'Marketing Campaign',
      description: 'Collaborative marketing project for brand launch',
      status: 'deployed',
      statusDisplay: 'Active',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 35, isCurrentUser: true, role: 'Strategist' },
        { id: 'user-006', name: 'Marketing Agency', revenueShare: 45, role: 'Agency' },
        { id: 'user-007', name: 'Content Creator', revenueShare: 20, role: 'Creator' }
      ],
      type: 'Service',
      icon: 'service',
      participantsJoined: 3,
      participantsTotal: 3,
      contractValue: 1.23456,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z',
      deploymentTx: '0x9b45a7382a0ee1a37adeaa5bbffc3f5456ae4c7d5a4172e667bb3b99172e39a6',
      network: 'polygon'
    },
    {
      id: 'contract-004',
      title: 'Game Development Project',
      description: 'Revenue sharing for indie game development team',
      status: 'draft',
      statusDisplay: 'Draft',
      participants: [
        { id: 'user-001', name: 'You', revenueShare: 25, isCurrentUser: true, role: 'Developer' },
        { id: 'user-008', name: 'Sarah Parker', revenueShare: 25, role: 'Artist' },
        { id: 'user-009', name: 'Mike Johnson', revenueShare: 25, role: 'Designer' },
        { id: 'user-010', name: 'Laura Smith', revenueShare: 25, role: 'Sound' }
      ],
      type: 'Gaming',
      icon: 'gaming',
      participantsJoined: 1,
      participantsTotal: 4,
      contractValue: 0,
      totalRevenue: 0,
      currency: 'ETH',
      createdAt: '2025-04-25T09:00:00Z',
      lastUpdated: '2025-04-25T09:00:00Z',
      deploymentTx: null,
      network: 'polygon'
    }
  ],
  
  // Activities
  activities: [
    {
      id: 'activity-001',
      type: 'contract_created',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:00:00Z',
      description: 'Contract created'
    },
    {
      id: 'activity-002',
      type: 'invite_sent',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      timestamp: '2025-04-15T12:05:00Z',
      description: 'Invited collaborators to join'
    },
    {
      id: 'activity-003',
      type: 'contract_signed',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-002', name: 'John Smith' },
      timestamp: '2025-04-16T09:30:00Z',
      description: 'Signed the contract'
    },
    {
      id: 'activity-004',
      type: 'payment_received',
      contractId: 'contract-001',
      contractTitle: 'Summery Album Project',
      actor: { id: 'user-001', name: 'You' },
      amount: 0.05,
      currency: 'ETH',
      timestamp: '2025-04-20T15:45:00Z',
      description: 'Payment received'
    }
  ],
  
  // Upcoming payments (mock data)
  upcomingPayments: [
    { id: 'payment-001', contractId: 'contract-001', amount: 0.05, currency: 'ETH', date: '2025-05-10T12:00:00Z' },
    { id: 'payment-002', contractId: 'contract-003', amount: 0.08, currency: 'ETH', date: '2025-05-17T12:00:00Z' },
    { id: 'payment-003', contractId: 'contract-001', amount: 0.12, currency: 'ETH', date: '2025-05-24T12:00:00Z' },
    { id: 'payment-004', contractId: 'contract-003', amount: 0.07, currency: 'ETH', date: '2025-05-31T12:00:00Z' }
  ],
  
  // Helper methods to get specific data
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getContractsByType: function(type) {
    return this.contracts.filter(c => c.type.toLowerCase() === type.toLowerCase());
  },
  
  getActivitiesByContract: function(contractId) {
    return this.activities.filter(a => a.contractId === contractId);
  },
  
  getRecentActivities: function(limit = 5) {
    // Sort by timestamp (most recent first) and take the specified limit
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 4) {
    // Sort by date (earliest first) and take the specified limit
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};

// ================================
// UTILITY FUNCTIONS
// ================================
const SplUtils = {
  // Logging with prefix
  log: function(message, data) {
    if (SPLITRA_CONFIG.enableConsoleLogging) {
      console.log(`[Splitra] ${message}`, data || '');
    }
  },
  
  // Error logging with prefix
  error: function(message, error) {
    console.error(`[Splitra Error] ${message}`, error || '');
  },
  
  // Format currency values
  formatCurrency: function(value, currency = SPLITRA_CONFIG.defaultCurrency) {
    if (typeof value !== 'number') return '0';
    
    if (currency === 'ETH') {
      return value.toFixed(5) + ' ETH';
    } else if (currency === 'USD') {
      return '$' + value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
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
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  },
  
  // Format date as human readable
  formatDate: function(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  },
  
  // Copy text to clipboard
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
  
  // Show toast notification
  showToast: function(message, type = 'success', duration = 3000) {
    this.log('Showing toast:', message);
    
    // Create or find toast element
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
    
    // Hide after specified duration
    setTimeout(() => {
      toast.style.opacity = '0';
    }, duration);
  }
};

// ================================
// CHART IMPLEMENTATION
// ================================
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize chart with Chart.js
  initChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUtils.error(`Canvas not found with ID: ${canvasId}`);
      return null;
    }
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUtils.error('Chart.js not loaded');
      return null;
    }
    
    // Create chart
    try {
      // Destroy existing chart if it exists
      if (this.charts[canvasId]) {
        this.charts[canvasId].destroy();
      }
      
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      // Store for later reference
      this.charts[canvasId] = chart;
      SplUtils.log(`Chart created for ${canvasId}`);
      
      return chart;
    } catch (error) {
      SplUtils.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart (donut)
  createRevenueChart: function() {
    SplUtils.log('Creating revenue chart');
    
    // Find container and create canvas
    let chartContainer = document.querySelector('.revenue-chart, .revenue-chart-container, .pie-chart-parent, .pie-chart-placeholder');
    
    if (!chartContainer) {
      // Try to find a good container by looking for common elements
      const statsSection = document.querySelector('.home-stats-section, .stats-wrapper');
      if (statsSection) {
        // Look for chart placeholders in the stats section
        chartContainer = statsSection.querySelector('.chart-image');
        
        if (!chartContainer) {
          // Try to find any element that might be a chart container
          const possibleContainers = statsSection.querySelectorAll('div, img');
          for (let i = 0; i < possibleContainers.length; i++) {
            const el = possibleContainers[i];
            // If element contains img that might be a chart placeholder
            if (el.querySelector('img') || el.style.width || el.className.includes('chart')) {
              chartContainer = el;
              break;
            }
          }
        }
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Revenue chart container not found');
      return null;
    }
    
    SplUtils.log('Found revenue chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-distribution-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get first active contract for the chart
    const contract = SplMockData.getActiveContracts()[0];
    if (!contract) {
      SplUtils.error('No active contract found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = contract.participants.map(p => p.name);
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B', // Amber
      '#10B981', // Emerald
      '#6366F1'  // Indigo
    ];
    
    // Create chart
    const chart = this.initChart(canvas.id, 'doughnut', {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: '#FFF',
            font: {
              family: 'Inter, sans-serif',
              size: 12
            },
            boxWidth: 12,
            padding: 10
          }
        },
        tooltip: {
          enabled: true,
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text for user's share
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add centered text to doughnut chart
  addCenterText: function(chart, text) {
    const originalDraw = chart.draw;
    
    chart.draw = function() {
      originalDraw.apply(this, arguments);
      
      const width = chart.width;
      const height = chart.height;
      const ctx = chart.ctx;
      
      ctx.restore();
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(text, width / 2, height / 2);
      ctx.save();
    };
    
    chart.update();
  },
  
  // Create upcoming payments chart
  createPaymentsChart: function() {
    SplUtils.log('Creating payments chart');
    
    // Find container
    let chartContainer = document.querySelector('.upcoming-chart, .upcoming-chart-container, .payments-chart');
    
    if (!chartContainer) {
      // Try to find by content
      const upcomingSection = Array.from(document.querySelectorAll('div')).find(el => {
        // Look for section titles that indicate upcoming payments
        const heading = el.querySelector('h2, h3, .heading');
        return heading && heading.textContent.includes('Upcoming');
      });
      
      if (upcomingSection) {
        // Look for chart placeholders
        chartContainer = upcomingSection.querySelector('img, .chart-image, [class*="chart"]');
      }
    }
    
    if (!chartContainer) {
      SplUtils.error('Payments chart container not found');
      return null;
    }
    
    SplUtils.log('Found payments chart container:', chartContainer);
    
    // Create canvas
    let canvas = chartContainer.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'upcoming-payments-chart';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
      // Hide any existing image
      const existingImg = chartContainer.querySelector('img');
      if (existingImg) {
        existingImg.style.display = 'none';
      }
      
      // Clear container and add canvas
      chartContainer.innerHTML = '';
      chartContainer.appendChild(canvas);
    }
    
    // Get upcoming payments data
    const payments = SplMockData.getUpcomingPayments();
    
    // Prepare chart data
    const chartData = {
      labels: payments.map(p => SplUtils.formatDate(p.date)),
      datasets: [{
        label: 'ETH',
        data: payments.map(p => p.amount),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    };
    
    // Create chart
    const chart = this.initChart(canvas.id, 'line', chartData, {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#aaa',
            callback: function(value) {
              return value.toFixed(2) + ' ETH';
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#aaa'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(30, 30, 30, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#e0e0e0',
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
    
    return chart;
  },
  
  // Initialize all charts on the dashboard
  initializeDashboardCharts: function() {
    SplUtils.log('Initializing dashboard charts');
    
    try {
      // Check if Chart.js is available
      if (typeof Chart === 'undefined') {
        SplUtils.error('Chart.js not loaded. Please include Chart.js in your project.');
        return false;
      }
      
      // Create main revenue chart
      this.createRevenueChart();
      
      // Create upcoming payments chart
      this.createPaymentsChart();
      
      SplUtils.log('Dashboard charts initialized');
      return true;
    } catch (error) {
      SplUtils.error('Error initializing charts:', error);
      return false;
    }
  }
};

// ================================
// DASHBOARD IMPLEMENTATION
// ================================
const Splitra = {
  // Initialize application
  init: function() {
    SplUtils.log('Initializing Splitra application');
    
    try {
      // Add test mode indicator
      if (SPLITRA_CONFIG.useTestData) {
        this.addTestModeIndicator();
      }
      
      // Initialize dashboard components
      this.initializeContractCards();
      this.initializeFilterButtons();
      this.initializeStatCards();
      this.initializeRecentActivity();
      this.initializeUpcomingPayments();
      
      // Initialize charts if Chart.js is available
      if (typeof Chart !== 'undefined') {
        SplCharts.initializeDashboardCharts();
      } else {
        SplUtils.log('Chart.js not available, charts will not be initialized');
      }
      
      SplUtils.log('Splitra application initialized successfully');
      SplUtils.showToast('Dashboard initialized with test data', 'info');
    } catch (error) {
      SplUtils.error('Error initializing Splitra:', error);
      console.error('Splitra initialization error:', error);
    }
  },
  
  // Add test mode indicator
  addTestModeIndicator: function() {
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
  },
  
  // Initialize contract cards
  initializeContractCards: function() {
    SplUtils.log('Initializing contract cards');
    
    // Get all contract cards
    const contractCards = document.querySelectorAll('.contract-card');
    if (contractCards.length === 0) {
      SplUtils.error('No contract cards found');
      return;
    }
    
    // Set up horizontal scrolling container
    const cardsContainer = contractCards[0].parentElement;
    if (cardsContainer) {
      cardsContainer.style.display = 'flex';
      cardsContainer.style.overflowX = 'auto';
      cardsContainer.style.padding = '4px 0 16px';
      cardsContainer.style.scrollSnapType = 'x mandatory';
      cardsContainer.style.scrollBehavior = 'smooth';
      cardsContainer.style.WebkitOverflowScrolling = 'touch';
      
      // Make scrollbar less obtrusive
      cardsContainer.style.scrollbarWidth = 'thin';
      cardsContainer.style.scrollbarColor = 'rgba(156, 163, 175, 0.5) transparent';
      
      // Add styling for cards
      contractCards.forEach((card, index) => {
        if (index < SplMockData.contracts.length) {
          const contract = SplMockData.contracts[index];
          
          // Set data attributes
          card.setAttribute('data-contract-id', contract.id);
          card.setAttribute('data-status', contract.status);
          card.setAttribute('data-type', contract.type.toLowerCase());
          
          // Set card style
          card.style.flex = '0 0 auto';
          card.style.marginRight = '16px';
          card.style.scrollSnapAlign = 'start';
          card.style.cursor = 'pointer';
          
          // Set card content
          this.populateContractCard(card, contract);
          
          // Make card clickable
          card.addEventListener('click', (e) => {
            // Prevent click if clicking on a button
            if (e.target.closest('.
