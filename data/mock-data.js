// Expanded mock data to include upcoming payments
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
  
  // Contracts
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
      participantsJoined: 3,
      participantsTotal: 4,
      totalRevenue: 0.21564984,
      currency: 'ETH',
      createdAt: '2025-04-15T12:00:00Z',
      lastUpdated: '2025-04-20T15:45:00Z'
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
      participantsJoined: 2,
      participantsTotal: 2,
      totalRevenue: 0.5489,
      currency: 'ETH',
      createdAt: '2025-04-21T14:30:00Z',
      lastUpdated: '2025-04-21T14:30:00Z'
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
      participantsJoined: 3,
      participantsTotal: 3,
      totalRevenue: 1.23456,
      currency: 'ETH',
      createdAt: '2025-03-15T10:15:00Z',
      lastUpdated: '2025-04-18T16:20:00Z'
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
  
  // Upcoming payments
  upcomingPayments: [
    { 
      id: 'payment-001', 
      contractId: 'contract-001', 
      amount: 0.05, 
      currency: 'ETH', 
      date: '2025-05-10T12:00:00Z' 
    },
    { 
      id: 'payment-002', 
      contractId: 'contract-003', 
      amount: 0.08, 
      currency: 'ETH', 
      date: '2025-05-17T12:00:00Z' 
    },
    { 
      id: 'payment-003', 
      contractId: 'contract-001', 
      amount: 0.12, 
      currency: 'ETH', 
      date: '2025-05-24T12:00:00Z' 
    },
    { 
      id: 'payment-004', 
      contractId: 'contract-003', 
      amount: 0.07, 
      currency: 'ETH', 
      date: '2025-05-31T12:00:00Z' 
    }
  ],
  
  // Helper methods
  getContractById: function(contractId) {
    return this.contracts.find(c => c.id === contractId);
  },
  
  getActiveContracts: function() {
    return this.contracts.filter(c => c.status === 'deployed');
  },
  
  getDraftContracts: function() {
    return this.contracts.filter(c => c.status === 'draft');
  },
  
  getPendingContracts: function() {
    return this.contracts.filter(c => c.status === 'pending');
  },
  
  getRecentActivities: function(limit = 5) {
    return [...this.activities]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  },
  
  getUpcomingPayments: function(limit = 5) {
    return [...this.upcomingPayments]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, limit);
  }
};
