// User data for tables
export const userData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'pending', lastLogin: '2024-01-12' },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'active', lastLogin: '2024-01-16' },
  { id: 6, name: 'Diana Ross', email: 'diana@example.com', role: 'User', status: 'active', lastLogin: '2024-01-13' },
  { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'Editor', status: 'inactive', lastLogin: '2024-01-08' },
  { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'User', status: 'active', lastLogin: '2024-01-15' },
  { id: 9, name: 'George Martin', email: 'george@example.com', role: 'Admin', status: 'pending', lastLogin: '2024-01-11' },
  { id: 10, name: 'Helen Keller', email: 'helen@example.com', role: 'User', status: 'active', lastLogin: '2024-01-14' }
];

// Generate additional users for pagination demo
for (let i = 11; i <= 50; i++) {
  userData.push({
    id: i,
    name: `User ${i}`,
    email: `user${i}@example.com`,
    role: ['User', 'Editor', 'Admin'][Math.floor(Math.random() * 3)],
    status: ['active', 'inactive', 'pending'][Math.floor(Math.random() * 3)],
    lastLogin: `2024-01-${String(Math.floor(Math.random() * 16) + 1).padStart(2, '0')}`
  });
}

// Dashboard metrics
export const dashboardMetrics = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1% from last month',
    changeType: 'positive',
    icon: 'DollarSign',
    color: 'green'
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1% from last month',
    changeType: 'positive',
    icon: 'Users',
    color: 'blue'
  },
  {
    title: 'Orders',
    value: '12,234',
    change: '-19% from last month',
    changeType: 'negative',
    icon: 'ShoppingCart',
    color: 'red'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+2.5% from last month',
    changeType: 'positive',
    icon: 'Percent',
    color: 'purple'
  }
];

// Recent activity data
export const recentActivity = [
  {
    id: 1,
    type: 'user_registered',
    message: 'New user registered',
    time: '2 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40'
  },
  {
    id: 2,
    type: 'order_completed',
    message: 'Order #1234 completed',
    time: '5 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40'
  },
  {
    id: 3,
    type: 'payment_received',
    message: 'Payment received',
    time: '10 minutes ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=40&h=40'
  }
];

// Chart data
export const chartData = {
  revenue: [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 19000 },
    { name: 'Mar', value: 15000 },
    { name: 'Apr', value: 25000 },
    { name: 'May', value: 22000 },
    { name: 'Jun', value: 30000 }
  ],
  products: [
    { name: 'Product A', sales: 65 },
    { name: 'Product B', sales: 59 },
    { name: 'Product C', sales: 80 },
    { name: 'Product D', sales: 81 },
    { name: 'Product E', sales: 56 }
  ],
  users: [
    { name: 'Week 1', users: 12 },
    { name: 'Week 2', users: 19 },
    { name: 'Week 3', users: 15 },
    { name: 'Week 4', users: 25 },
    { name: 'Week 5', users: 22 },
    { name: 'Week 6', users: 30 }
  ],
  devices: [
    { name: 'Desktop', value: 60 },
    { name: 'Mobile', value: 30 },
    { name: 'Tablet', value: 10 }
  ],
  visitors: [
    { name: 'Jan', visitors: 30 },
    { name: 'Feb', visitors: 45 },
    { name: 'Mar', visitors: 35 },
    { name: 'Apr', visitors: 50 },
    { name: 'May', visitors: 40 },
    { name: 'Jun', visitors: 60 }
  ]
};

// Calendar events
export const initialEvents = [
  { id: 1, title: 'Team Meeting', date: '2024-01-15', description: 'Weekly team sync' },
  { id: 2, title: 'Project Deadline', date: '2024-01-20', description: 'Final submission' },
  { id: 3, title: 'Client Call', date: '2024-01-25', description: 'Quarterly review' }
];

// Kanban tasks
export const initialTasks = {
  todo: [
    { id: 1, title: 'Design Homepage', description: 'Create wireframes and mockups', priority: 'high', assignee: 'John Doe' },
    { id: 2, title: 'Setup Database', description: 'Configure MySQL database', priority: 'medium', assignee: 'Jane Smith' },
    { id: 3, title: 'Write Documentation', description: 'API documentation', priority: 'low', assignee: 'Bob Johnson' }
  ],
  progress: [
    { id: 4, title: 'Implement Authentication', description: 'JWT-based auth system', priority: 'high', assignee: 'Alice Brown' },
    { id: 5, title: 'Create User Dashboard', description: 'User management interface', priority: 'medium', assignee: 'Charlie Wilson' }
  ],
  done: [
    { id: 6, title: 'Project Setup', description: 'Initialize repository and dependencies', priority: 'high', assignee: 'Diana Ross' }
  ]
};
