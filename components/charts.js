// Charts component for visualizations
const SplCharts = {
  charts: {}, // Store chart instances
  
  // Initialize charts
  initialize: function() {
    SplUI.log('Initializing charts');
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      SplUI.error('Chart.js not loaded');
      this.loadChartJS();
      return;
    }
    
    // Create revenue distribution chart
    this.createRevenueChart();
    
    // Create payment chart
    this.createPaymentsChart();
    
    SplUI.log('Charts initialized');
  },
  
  // Load Chart.js dynamically
  loadChartJS: function() {
    SplUI.log('Loading Chart.js');
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = () => {
      SplUI.log('Chart.js loaded');
      this.initialize();
    };
    script.onerror = () => {
      SplUI.error('Failed to load Chart.js');
    };
    
    document.head.appendChild(script);
  },
  
  // Create chart instance
  createChart: function(canvasId, type, data, options) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      SplUI.error(`Canvas not found: ${canvasId}`);
      return null;
    }
    
    // Destroy existing chart if it exists
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy();
    }
    
    // Create chart
    try {
      const chart = new Chart(canvas, {
        type: type,
        data: data,
        options: options
      });
      
      this.charts[canvasId] = chart;
      return chart;
    } catch (error) {
      SplUI.error('Error creating chart:', error);
      return null;
    }
  },
  
  // Create revenue distribution chart
  createRevenueChart: function() {
    // Find container
    const container = document.querySelector('.revenue-chart, .pie-chart-parent');
    if (!container) {
      SplUI.error('Revenue chart container not found');
      return null;
    }
    
    // Create canvas if needed
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'revenue-chart';
      
      // Hide any existing image
      const img = container.querySelector('img');
      if (img) img.style.display = 'none';
      
      container.appendChild(canvas);
    }
    
    // Get first active contract
    const contract = SplMockData.getActiveContracts ? 
      SplMockData.getActiveContracts()[0] : 
      SplMockData.contracts.find(c => c.status === 'deployed');
      
    if (!contract) {
      SplUI.error('No active contract found for chart');
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
    const chart = this.createChart(canvas.id, 'doughnut', {
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
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      }
    });
    
    // Add center text
    if (chart) {
      const userShare = contract.participants.find(p => p.isCurrentUser)?.revenueShare || 0;
      this.addCenterText(chart, `${userShare}%`);
    }
    
    return chart;
  },
  
  // Add center text to doughnut chart
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
    // Find container
    const container = document.querySelector('.payments-chart, .upcoming-chart');
    if (!container) {
      SplUI.error('Payments chart container not found');
      return null;
    }
    
    // Create canvas if needed
    let canvas = container.querySelector('canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'payments-chart';
      
      // Hide any existing image
      const img = container.querySelector('img');
      if (img) img.style.display = 'none';
      
      container.appendChild(canvas);
    }
    
    // Get upcoming payments
    const payments = SplMockData.getUpcomingPayments ? 
      SplMockData.getUpcomingPayments(5) : 
      SplMockData.upcomingPayments.slice(0, 5);
      
    if (!payments || payments.length === 0) {
      SplUI.error('No payments found for chart');
      return null;
    }
    
    // Prepare chart data
    const labels = payments.map(p => SplFormatting.formatDate(p.date));
    const amounts = payments.map(p => p.amount);
    
    // Create chart
    return this.createChart(canvas.id, 'line', {
      labels: labels,
      datasets: [{
        label: 'ETH',
        data: amounts,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4
      }]
    }, {
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
          callbacks: {
            label: function(context) {
              return context.parsed.y.toFixed(5) + ' ETH';
            }
          }
        }
      }
    });
  },
  
  // Create mini chart for contract card
  createMiniChart: function(id, contract, container) {
    if (!container) return null;
    
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.id = `mini-chart-${id}`;
    container.innerHTML = '';
    container.appendChild(canvas);
    
    // Create data
    const data = contract.participants.map(p => p.revenueShare);
    const colors = [
      '#3B82F6', // Blue
      '#8B5CF6', // Purple
      '#EC4899', // Pink
      '#F59E0B'  // Amber
    ];
    
    // Create chart
    return this.createChart(canvas.id, 'doughnut', {
      labels: contract.participants.map(p => p.name),
      datasets: [{
        data: data,
        backgroundColor: colors.slice(0, data.length),
        borderWidth: 0
      }]
    }, {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      },
      events: [] // Disable all interactions
    });
  }
};
