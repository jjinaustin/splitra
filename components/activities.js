// Activities component
const SplActivities = {
  // Initialize activities list
  initialize: function() {
    SplUI.log('Initializing activities');
    
    // Find activities container
    const container = document.querySelector('.activity-feed, .recent-activity');
    if (!container) {
      SplUI.log('No activity feed container found');
      return;
    }
    
    // Get recent activities
    const activities = SplMockData.getRecentActivities ? 
      SplMockData.getRecentActivities(5) : 
      SplMockData.activities.slice(0, 5);
    
    // Check for existing activity items
    const existingItems = container.querySelectorAll('.activity-item');
    
    if (existingItems.length > 0) {
      // Update existing items
      existingItems.forEach((item, index) => {
        if (index < activities.length) {
          this.updateActivityItem(item, activities[index]);
        } else {
          item.style.display = 'none';
        }
      });
    } else {
      // Create new items
      activities.forEach(activity => {
        const item = this.createActivityItem(activity);
        container.appendChild(item);
      });
    }
    
    SplUI.log('Activities initialized');
  },
  
  // Create a new activity item
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
    
    // Create icon based on activity type
    const icon = document.createElement('div');
    icon.className = 'activity-icon';
    icon.style.width = '32px';
    icon.style.height = '32px';
    icon.style.borderRadius = '50%';
    icon.style.display = 'flex';
    icon.style.alignItems = 'center';
    icon.style.justifyContent = 'center';
    icon.style.marginRight = '12px';
    icon.style.flexShrink = '0';
    
    let iconText = '';
    let iconColor = '#3B82F6';
    
    switch(activity.type) {
      case 'contract_created':
        iconText = '📝';
        iconColor = '#10B981'; // Green
        break;
      case 'invite_sent':
        iconText = '📨';
        iconColor = '#8B5CF6'; // Purple
        break;
      case 'contract_signed':
        iconText = '✅';
        iconColor = '#3B82F6'; // Blue
        break;
      case 'payment_received':
        iconText = '💰';
        iconColor = '#F59E0B'; // Amber
        break;
      default:
        iconText = '📋';
    }
    
    icon.textContent = iconText;
    icon.style.backgroundColor = iconColor;
    
    // Create content
    const content = document.createElement('div');
    content.className = 'activity-content';
    content.style.flex = '1';
    
    // Create title
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
    
    // Create details
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
    timestamp.textContent = SplFormatting.formatRelativeTime(activity.timestamp);
    
    // Add event listener to contract link
    contractLink.addEventListener('click', () => {
      SplUI.showToast(`Viewing contract: ${activity.contractTitle}`);
    });
    
    // Assemble
    details.appendChild(contractLink);
    details.appendChild(timestamp);
    content.appendChild(title);
    content.appendChild(details);
    item.appendChild(icon);
    item.appendChild(content);
    
    return item;
  },
  
  // Update existing activity item
  updateActivityItem: function(item, activity) {
    // Find elements
    const title = item.querySelector('.activity-title');
    const contractLink = item.querySelector('.activity-contract');
    const timestamp = item.querySelector('.activity-time');
    
    // Update elements
    if (title) {
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
      timestamp.textContent = SplFormatting.formatRelativeTime(activity.timestamp);
    }
  }
};
