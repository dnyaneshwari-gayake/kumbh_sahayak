// Admin Dashboard System with Proper Department Mapping
class AdminSystem {
    constructor() {
        this.grievances = [];
        this.notifications = [];
        this.departmentMap = {
            'sanitation': 'Sanitation Department',
            'security': 'Police Department', 
            'medical': 'Medical Department',
            'crowd': 'Crowd Management',
            'other': 'General Administration'
        };
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadData();
        this.initRealTimeUpdates();
        this.setupSampleData();
    }
    
    bindEvents() {
        // Notification badge click
        document.getElementById('adminNotificationBadge')?.addEventListener('click', () => {
            this.toggleNotificationPanel();
        });
        
        // Clear notifications
        document.getElementById('clearNotifications')?.addEventListener('click', () => {
            this.clearNotifications();
        });
        
        // Department card clicks to view department details
        document.querySelectorAll('.department-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const deptType = Array.from(e.currentTarget.classList)
                    .find(cls => ['police', 'medical', 'sanitation', 'crowd'].includes(cls));
                if (deptType) {
                    this.showDepartmentDetails(deptType);
                }
            });
        });
        
        // Close notification panel when clicking outside
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('grievanceNotificationPanel');
            const badge = document.getElementById('adminNotificationBadge');
            
            if (panel && panel.style.display === 'block' &&
                !panel.contains(e.target) && 
                !badge.contains(e.target)) {
                this.hideNotificationPanel();
            }
        });
    }
    
    setupSampleData() {
        // If no grievances exist, create sample data
        const grievances = JSON.parse(localStorage.getItem('kumbh_grievances') || '[]');
        if (grievances.length === 0) {
            const sampleGrievances = [
                {
                    id: 'KM2024-00001',
                    userPhone: '9876543210',
                    userName: 'Rahul Sharma',
                    type: 'text',
                    category: 'sanitation',
                    description: 'Garbage accumulation near main bathing ghat needs immediate cleaning',
                    location: { lat: 25.4358, lng: 81.8463 },
                    priority: 'high',
                    status: 'in_progress',
                    department: 'Sanitation Department',
                    assignedTo: 'Officer Raj',
                    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    updates: [
                        { status: 'submitted', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
                        { status: 'in_progress', timestamp: new Date().toISOString() }
                    ]
                },
                {
                    id: 'KM2024-00002',
                    userPhone: '9876543211',
                    userName: 'Priya Patel',
                    type: 'audio',
                    category: 'medical',
                    description: 'Medical emergency near zone C, need ambulance',
                    location: { lat: 25.4365, lng: 81.8470 },
                    priority: 'emergency',
                    status: 'pending',
                    department: 'Medical Department',
                    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
                    updates: [
                        { status: 'submitted', timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() }
                    ]
                },
                {
                    id: 'KM2024-00003',
                    userPhone: '9876543212',
                    userName: 'Amit Kumar',
                    type: 'text',
                    category: 'security',
                    description: 'Lost wallet near police checkpoint',
                    location: { lat: 25.4350, lng: 81.8455 },
                    priority: 'medium',
                    status: 'pending',
                    department: 'Police Department',
                    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                    updates: [
                        { status: 'submitted', timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() }
                    ]
                },
                {
                    id: 'KM2024-00004',
                    userPhone: '9876543213',
                    userName: 'Sunita Devi',
                    type: 'text',
                    category: 'crowd',
                    description: 'Overcrowding at entrance gate, need crowd management',
                    location: { lat: 25.4370, lng: 81.8480 },
                    priority: 'high',
                    status: 'pending',
                    department: 'Crowd Management',
                    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
                    updates: [
                        { status: 'submitted', timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() }
                    ]
                },
                {
                    id: 'KM2024-00005',
                    userPhone: '9876543214',
                    userName: 'Vikram Singh',
                    type: 'text',
                    category: 'other',
                    description: 'Request for drinking water facility',
                    location: { lat: 25.4360, lng: 81.8460 },
                    priority: 'low',
                    status: 'resolved',
                    department: 'General Administration',
                    assignedTo: 'Officer Sharma',
                    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                    updates: [
                        { status: 'submitted', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
                        { status: 'resolved', timestamp: new Date().toISOString() }
                    ]
                }
            ];
            
            localStorage.setItem('kumbh_grievances', JSON.stringify(sampleGrievances));
            
            // Create notifications for new grievances
            const notifications = sampleGrievances
                .filter(g => g.status === 'pending')
                .map(g => ({
                    id: `notif_${Date.now()}_${g.id}`,
                    type: 'new_grievance',
                    grievanceId: g.id,
                    title: 'New Grievance Received',
                    description: g.description.substring(0, 100) + '...',
                    category: g.category,
                    department: g.department,
                    priority: g.priority,
                    timestamp: new Date().toISOString(),
                    read: false
                }));
            
            localStorage.setItem('kumbh_notifications', JSON.stringify(notifications));
        }
    }
    
    loadData() {
        // Load grievances
        this.grievances = JSON.parse(localStorage.getItem('kumbh_grievances') || '[]');
        
        // Load notifications
        this.notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        
        console.log('Loaded grievances:', this.grievances.length);
        console.log('Loaded notifications:', this.notifications.length);
        
        // Update UI
        this.updateDashboard();
        this.updateNotifications();
    }
    
    updateDashboard() {
        // Update KPI cards
        this.updateKPICards();
        
        // Update department stats
        this.updateDepartmentStats();
        
        // Update AI routing table
        this.updateRoutingTable();
    }
    
    updateKPICards() {
        const grievances = this.grievances;
        
        // Total grievances
        document.getElementById('totalGrievances').textContent = grievances.length;
        
        // Active cases (pending + in_progress)
        const activeCases = grievances.filter(g => 
            g.status === 'pending' || g.status === 'in_progress'
        ).length;
        document.getElementById('activeCases').textContent = activeCases;
        
        // Emergency cases (high/emergency priority)
        const emergencyCases = grievances.filter(g => 
            g.priority === 'high' || g.priority === 'emergency'
        ).length;
        document.getElementById('emergencyCases').textContent = emergencyCases;
        
        // Average resolution time (simplified)
        const resolvedCases = grievances.filter(g => g.status === 'resolved');
        let totalHours = 0;
        
        resolvedCases.forEach(g => {
            const submitted = new Date(g.timestamp);
            const resolved = new Date(g.updates?.find(u => u.status === 'resolved')?.timestamp || submitted);
            const hours = (resolved - submitted) / (1000 * 60 * 60);
            totalHours += hours;
        });
        
        const avgHours = resolvedCases.length > 0 ? (totalHours / resolvedCases.length).toFixed(1) : 0;
        document.getElementById('avgResolution').textContent = `${avgHours}h`;
    }
    
    updateDepartmentStats() {
        const grievances = this.grievances;
        
        // Initialize department counters
        const departmentStats = {
            police: { new: 0, progress: 0, delayed: 0 },
            medical: { new: 0, progress: 0, delayed: 0 },
            sanitation: { new: 0, progress: 0, delayed: 0 },
            crowd: { new: 0, progress: 0, delayed: 0 },
            other: { new: 0, progress: 0, delayed: 0 }
        };
        
        // Count grievances by category and status
        grievances.forEach(grievance => {
            let dept = '';
            
            // Map category to department
            switch(grievance.category) {
                case 'security': dept = 'police'; break;
                case 'medical': dept = 'medical'; break;
                case 'sanitation': dept = 'sanitation'; break;
                case 'crowd': dept = 'crowd'; break;
                default: dept = 'other'; break;
            }
            
            if (departmentStats[dept]) {
                // New = pending
                if (grievance.status === 'pending') {
                    departmentStats[dept].new++;
                }
                // Progress = in_progress
                else if (grievance.status === 'in_progress') {
                    departmentStats[dept].progress++;
                }
                // Delayed = pending for more than 2 hours
                else if (grievance.status === 'pending') {
                    const submitted = new Date(grievance.timestamp);
                    const now = new Date();
                    const hours = (now - submitted) / (1000 * 60 * 60);
                    if (hours > 2) {
                        departmentStats[dept].delayed++;
                    }
                }
            }
        });
        
        console.log('Department Stats:', departmentStats);
        
        // Update Police Department
        document.getElementById('policeNew').textContent = departmentStats.police.new;
        document.getElementById('policeProgress').textContent = departmentStats.police.progress;
        document.getElementById('policeDelayed').textContent = departmentStats.police.delayed;
        
        // Update Medical Department
        document.getElementById('medicalNew').textContent = departmentStats.medical.new;
        document.getElementById('medicalProgress').textContent = departmentStats.medical.progress;
        document.getElementById('medicalDelayed').textContent = departmentStats.medical.delayed;
        
        // Update Sanitation Department
        document.getElementById('sanitationNew').textContent = departmentStats.sanitation.new;
        document.getElementById('sanitationProgress').textContent = departmentStats.sanitation.progress;
        document.getElementById('sanitationDelayed').textContent = departmentStats.sanitation.delayed;
        
        // Update Crowd Management
        document.getElementById('crowdNew').textContent = departmentStats.crowd.new;
        document.getElementById('crowdProgress').textContent = departmentStats.crowd.progress;
        document.getElementById('crowdDelayed').textContent = departmentStats.crowd.delayed;
    }
    
    updateRoutingTable() {
        const table = document.getElementById('routingTable');
        if (!table) return;
        
        // Clear existing rows except header
        const existingRows = table.querySelectorAll('.routing-row');
        existingRows.forEach(row => row.remove());
        
        // Get pending grievances
        const pendingGrievances = this.grievances
            .filter(g => g.status === 'pending')
            .slice(0, 5); // Show only 5 most recent
        
        console.log('Pending grievances for routing:', pendingGrievances.length);
        
        if (pendingGrievances.length === 0) {
            const row = document.createElement('div');
            row.className = 'routing-row';
            row.innerHTML = `
                <span colspan="4" style="grid-column: 1 / -1; text-align: center; padding: 20px; color: #666;">
                    No pending grievances for routing
                </span>
            `;
            table.appendChild(row);
            return;
        }
        
        pendingGrievances.forEach(grievance => {
            const row = document.createElement('div');
            row.className = 'routing-row';
            row.innerHTML = `
                <span>${grievance.id}</span>
                <span>${grievance.department || this.getDepartmentName(grievance.category)}</span>
                <span class="confidence-high">${this.calculateConfidence(grievance)}%</span>
                <div>
                    <button class="btn-small approve-btn" data-id="${grievance.id}">Approve</button>
                    <button class="btn-small override-btn" data-id="${grievance.id}">Override</button>
                </div>
            `;
            
            table.appendChild(row);
        });
        
        // Add event listeners to buttons
        table.querySelectorAll('.approve-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const grievanceId = e.target.dataset.id;
                this.approveGrievance(grievanceId);
            });
        });
        
        table.querySelectorAll('.override-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const grievanceId = e.target.dataset.id;
                this.showOverrideModal(grievanceId);
            });
        });
    }
    
    getDepartmentName(category) {
        return this.departmentMap[category] || 'General Administration';
    }
    
    calculateConfidence(grievance) {
        // Simple confidence calculation
        let confidence = 85;
        
        if (grievance.type === 'text' && grievance.description.length > 50) confidence += 10;
        if (grievance.location) confidence += 5;
        if (grievance.priority === 'high' || grievance.priority === 'emergency') confidence += 5;
        
        return Math.min(confidence, 95);
    }
    
    approveGrievance(grievanceId) {
        const grievanceIndex = this.grievances.findIndex(g => g.id === grievanceId);
        
        if (grievanceIndex !== -1) {
            // Update grievance status
            this.grievances[grievanceIndex].status = 'in_progress';
            this.grievances[grievanceIndex].assignedAt = new Date().toISOString();
            
            // Add update log
            if (!this.grievances[grievanceIndex].updates) {
                this.grievances[grievanceIndex].updates = [];
            }
            this.grievances[grievanceIndex].updates.push({
                status: 'in_progress',
                timestamp: new Date().toISOString(),
                action: 'approved_by_ai'
            });
            
            // Save to localStorage
            localStorage.setItem('kumbh_grievances', JSON.stringify(this.grievances));
            
            // Mark notification as read
            this.markNotificationAsRead(grievanceId);
            
            // Show success message
            this.showToast(`Grievance ${grievanceId} approved and assigned`, 'success');
            
            // Update UI
            this.updateDashboard();
            this.updateNotifications();
        }
    }
    
    showOverrideModal(grievanceId) {
        const grievance = this.grievances.find(g => g.id === grievanceId);
        if (!grievance) return;
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3>Override AI Routing for ${grievanceId}</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="grievance-info" style="margin-bottom: 20px;">
                        <p><strong>Current Assignment:</strong> ${grievance.department || this.getDepartmentName(grievance.category)}</p>
                        <p><strong>AI Confidence:</strong> ${this.calculateConfidence(grievance)}%</p>
                        <p><strong>Description:</strong> ${grievance.description.substring(0, 100)}...</p>
                    </div>
                    
                    <div class="form-group">
                        <label>Select New Department</label>
                        <select class="department-select" style="width: 100%; padding: 10px; margin: 10px 0;">
                            <option value="">Select Department</option>
                            <option value="police" ${grievance.category === 'security' ? 'selected' : ''}>Police Department</option>
                            <option value="medical" ${grievance.category === 'medical' ? 'selected' : ''}>Medical Department</option>
                            <option value="sanitation" ${grievance.category === 'sanitation' ? 'selected' : ''}>Sanitation Department</option>
                            <option value="crowd" ${grievance.category === 'crowd' ? 'selected' : ''}>Crowd Management</option>
                            <option value="other" ${grievance.category === 'other' ? 'selected' : ''}>General Administration</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Override Reason</label>
                        <textarea class="override-reason" 
                                  placeholder="Explain why you're overriding AI routing..." 
                                  style="width: 100%; padding: 10px; min-height: 80px; margin: 10px 0;"></textarea>
                    </div>
                    
                    <div class="modal-actions" style="display: flex; gap: 10px; margin-top: 20px;">
                        <button class="btn-primary confirm-override" style="flex: 1;">Confirm Override</button>
                        <button class="btn-secondary cancel-override" style="flex: 1;">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.cancel-override').addEventListener('click', () => modal.remove());
        
        modal.querySelector('.confirm-override').addEventListener('click', () => {
            const newDept = modal.querySelector('.department-select').value;
            const reason = modal.querySelector('.override-reason').value;
            
            if (!newDept || !reason.trim()) {
                this.showToast('Please select department and provide reason', 'error');
                return;
            }
            
            // Update grievance department
            const grievanceIndex = this.grievances.findIndex(g => g.id === grievanceId);
            if (grievanceIndex !== -1) {
                const newDeptName = this.getDepartmentNameByCode(newDept);
                this.grievances[grievanceIndex].department = newDeptName;
                this.grievances[grievanceIndex].overridden = true;
                this.grievances[grievanceIndex].overrideReason = reason;
                this.grievances[grievanceIndex].overriddenBy = 'admin';
                this.grievance[grievanceIndex].overrideTime = new Date().toISOString();
                
                // Add update log
                if (!this.grievances[grievanceIndex].updates) {
                    this.grievances[grievanceIndex].updates = [];
                }
                this.grievances[grievanceIndex].updates.push({
                    status: 'department_overridden',
                    timestamp: new Date().toISOString(),
                    action: 'manual_override',
                    reason: reason,
                    newDepartment: newDeptName
                });
                
                // Save to localStorage
                localStorage.setItem('kumbh_grievances', JSON.stringify(this.grievances));
                
                this.showToast(`Grievance ${grievanceId} overridden to ${newDeptName}`, 'success');
            }
            
            modal.remove();
            this.updateDashboard();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    getDepartmentNameByCode(code) {
        const names = {
            'police': 'Police Department',
            'medical': 'Medical Department',
            'sanitation': 'Sanitation Department',
            'crowd': 'Crowd Management',
            'other': 'General Administration'
        };
        return names[code] || code;
    }
    
    updateNotifications() {
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        const unreadCount = notifications.filter(n => !n.read).length;
        
        // Update notification badge
        const badge = document.getElementById('notificationCount');
        if (badge) {
            badge.textContent = unreadCount;
            badge.parentElement.style.display = unreadCount > 0 ? 'flex' : 'none';
            
            // Add pulse animation for new notifications
            if (unreadCount > 0) {
                badge.parentElement.classList.add('pulse');
                setTimeout(() => {
                    badge.parentElement.classList.remove('pulse');
                }, 1000);
            }
        }
        
        // Update notification panel
        this.updateNotificationPanel();
    }
    
    updateNotificationPanel() {
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        const list = document.getElementById('notificationList');
        
        if (!list) return;
        
        // Clear existing items
        list.innerHTML = '';
        
        // Show recent notifications (newest first)
        const recentNotifications = notifications.slice().reverse().slice(0, 10);
        
        if (recentNotifications.length === 0) {
            list.innerHTML = `
                <div class="notification-item" style="text-align: center; padding: 30px; color: #666;">
                    No new notifications
                </div>
            `;
            return;
        }
        
        recentNotifications.forEach(notification => {
            const item = document.createElement('div');
            item.className = `notification-item ${notification.read ? 'read' : 'unread'}`;
            item.innerHTML = `
                <div class="notification-info">
                    <div class="notification-id">${notification.grievanceId || 'New Grievance'}</div>
                    <div class="notification-desc">${notification.description || notification.title || 'New notification'}</div>
                    <div class="notification-meta">
                        <span class="notification-category">${notification.category || 'General'}</span>
                        <span class="notification-priority priority-${notification.priority || 'medium'}">${notification.priority || 'Medium'}</span>
                        <span class="notification-time">${this.formatTime(notification.timestamp)}</span>
                    </div>
                </div>
                <div class="notification-actions">
                    ${!notification.read ? `
                        <button class="btn-small mark-read-btn" data-id="${notification.id || ''}">
                            Mark Read
                        </button>
                    ` : ''}
                    <button class="btn-small view-details-btn" data-id="${notification.grievanceId || ''}">
                        View
                    </button>
                </div>
            `;
            
            list.appendChild(item);
        });
        
        // Add event listeners
        list.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const notificationId = e.target.dataset.id;
                this.markNotificationAsRead(notificationId);
            });
        });
        
        list.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const grievanceId = e.target.dataset.id;
                this.showGrievanceDetails(grievanceId);
            });
        });
    }
    
    markNotificationAsRead(grievanceId) {
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        let updated = false;
        
        // Find and mark notification as read
        const updatedNotifications = notifications.map(notification => {
            if (notification.grievanceId === grievanceId || !notification.read) {
                updated = true;
                return { ...notification, read: true };
            }
            return notification;
        });
        
        if (updated) {
            localStorage.setItem('kumbh_notifications', JSON.stringify(updatedNotifications));
            this.updateNotifications();
        }
    }
    
    showGrievanceDetails(grievanceId) {
        const grievance = this.grievances.find(g => g.id === grievanceId);
        if (!grievance) {
            this.showToast('Grievance not found', 'error');
            return;
        }
        
        // Create modal with grievance details
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h3>Grievance Details: ${grievanceId}</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body" style="padding: 20px;">
                    <div class="grievance-details">
                        <div class="detail-row">
                            <strong>User:</strong> ${grievance.userName} (${grievance.userPhone})
                        </div>
                        <div class="detail-row">
                            <strong>Category:</strong> ${grievance.category}
                        </div>
                        <div class="detail-row">
                            <strong>Department:</strong> ${grievance.department}
                        </div>
                        <div class="detail-row">
                            <strong>Priority:</strong> <span class="priority-${grievance.priority}">${grievance.priority}</span>
                        </div>
                        <div class="detail-row">
                            <strong>Status:</strong> ${grievance.status}
                        </div>
                        <div class="detail-row">
                            <strong>Submitted:</strong> ${this.formatDateTime(grievance.timestamp)}
                        </div>
                        <div class="detail-row">
                            <strong>Description:</strong><br>
                            <p style="margin-top: 5px; background: #f5f5f5; padding: 10px; border-radius: 5px;">
                                ${grievance.description}
                            </p>
                        </div>
                        
                        ${grievance.updates && grievance.updates.length > 0 ? `
                            <div class="detail-row">
                                <strong>Updates:</strong>
                                <div class="updates-list" style="margin-top: 10px;">
                                    ${grievance.updates.map(update => `
                                        <div class="update-item" style="padding: 5px 0; border-bottom: 1px solid #eee;">
                                            <span style="color: #666;">${this.formatTime(update.timestamp)}:</span>
                                            <span style="color: #333; margin-left: 10px;">${update.status}</span>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${grievance.status === 'pending' ? `
                        <div class="action-buttons" style="margin-top: 20px; display: flex; gap: 10px;">
                            <button class="btn-primary assign-btn" data-id="${grievanceId}">
                                Assign to Department
                            </button>
                            <button class="btn-secondary close-btn">
                                Close
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.querySelector('.close-btn')?.addEventListener('click', () => modal.remove());
        
        modal.querySelector('.assign-btn')?.addEventListener('click', () => {
            this.approveGrievance(grievanceId);
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    toggleNotificationPanel() {
        const panel = document.getElementById('grievanceNotificationPanel');
        if (!panel) return;
        
        if (panel.style.display === 'none' || panel.style.display === '') {
            this.showNotificationPanel();
        } else {
            this.hideNotificationPanel();
        }
    }
    
    showNotificationPanel() {
        const panel = document.getElementById('grievanceNotificationPanel');
        if (panel) {
            panel.style.display = 'block';
            this.updateNotificationPanel();
        }
    }
    
    hideNotificationPanel() {
        const panel = document.getElementById('grievanceNotificationPanel');
        if (panel) {
            panel.style.display = 'none';
        }
    }
    
    clearNotifications() {
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        
        // Mark all as read
        const updatedNotifications = notifications.map(notification => ({
            ...notification,
            read: true
        }));
        
        localStorage.setItem('kumbh_notifications', JSON.stringify(updatedNotifications));
        this.updateNotifications();
        this.showToast('All notifications cleared', 'success');
    }
    
    showDepartmentDetails(departmentCode) {
        const departmentName = this.getDepartmentNameByCode(departmentCode);
        const grievances = this.grievances.filter(g => {
            const dept = this.getDepartmentFromCategory(g.category);
            return dept === departmentCode;
        });
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3>${departmentName} - Department Details</h3>
                    <span class="close-modal">&times;</span>
                </div>
                <div class="modal-body" style="padding: 20px; max-height: 70vh; overflow-y: auto;">
                    <div class="dept-stats-detailed" style="margin-bottom: 30px;">
                        <h4>Current Statistics</h4>
                        <div class="stats-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0;">
                            <div class="stat-card" style="background: #e3f2fd; padding: 15px; border-radius: 8px; text-align: center;">
                                <h5 style="margin: 0 0 10px 0; color: #1976d2;">Pending Cases</h5>
                                <p style="font-size: 2rem; margin: 0; font-weight: bold;">
                                    ${grievances.filter(g => g.status === 'pending').length}
                                </p>
                            </div>
                            <div class="stat-card" style="background: #fff8e1; padding: 15px; border-radius: 8px; text-align: center;">
                                <h5 style="margin: 0 0 10px 0; color: #f57c00;">In Progress</h5>
                                <p style="font-size: 2rem; margin: 0; font-weight: bold;">
                                    ${grievances.filter(g => g.status === 'in_progress').length}
                                </p>
                            </div>
                            <div class="stat-card" style="background: #e8f5e9; padding: 15px; border-radius: 8px; text-align: center;">
                                <h5 style="margin: 0 0 10px 0; color: #2e7d32;">Resolved</h5>
                                <p style="font-size: 2rem; margin: 0; font-weight: bold;">
                                    ${grievances.filter(g => g.status === 'resolved').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="dept-grievances">
                        <h4>Recent Grievances</h4>
                        <div class="grievance-list" style="margin-top: 20px;">
                            ${grievances.length === 0 ? 
                                '<p style="text-align: center; color: #666; padding: 20px;">No grievances in this department</p>' : 
                                grievances.slice(0, 5).map(g => `
                                    <div style="background: #f5f5f5; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid ${this.getPriorityColor(g.priority)};">
                                        <div style="display: flex; justify-content: space-between; align-items: center;">
                                            <strong>${g.id}</strong>
                                            <span style="font-size: 0.9rem; color: #666;">${this.formatTime(g.timestamp)}</span>
                                        </div>
                                        <p style="margin: 8px 0;">${g.description.substring(0, 100)}...</p>
                                        <div style="display: flex; justify-content: space-between;">
                                            <span style="background: ${this.getPriorityColor(g.priority)}20; color: ${this.getPriorityColor(g.priority)}; padding: 3px 10px; border-radius: 12px; font-size: 0.8rem;">
                                                ${g.priority.toUpperCase()}
                                            </span>
                                            <span style="font-size: 0.9rem; color: #666;">${g.status}</span>
                                        </div>
                                    </div>
                                `).join('')
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }
    
    getDepartmentFromCategory(category) {
        switch(category) {
            case 'security': return 'police';
            case 'medical': return 'medical';
            case 'sanitation': return 'sanitation';
            case 'crowd': return 'crowd';
            default: return 'other';
        }
    }
    
    getPriorityColor(priority) {
        switch(priority) {
            case 'emergency': return '#d32f2f';
            case 'high': return '#f57c00';
            case 'medium': return '#1976d2';
            case 'low': return '#388e3c';
            default: return '#666';
        }
    }
    
    formatTime(timestamp) {
        if (!timestamp) return 'Just now';
        
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }
    
    formatDateTime(timestamp) {
        if (!timestamp) return 'Unknown';
        
        const date = new Date(timestamp);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    showToast(message, type = 'info', duration = 3000) {
        // Remove existing toast
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        
        // Create toast
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Auto-remove after duration
        setTimeout(() => {
            if (toast.parentElement) {
                toast.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    }
    
    initRealTimeUpdates() {
        // Check for new data every 10 seconds
        setInterval(() => {
            this.loadData();
        }, 10000);
        
        // Simulate new grievances for demo
        setInterval(() => {
            if (Math.random() > 0.8) { // 20% chance
                this.simulateNewGrievance();
            }
        }, 30000);
    }
    
    simulateNewGrievance() {
        const categories = ['sanitation', 'medical', 'security', 'crowd', 'other'];
        const category = categories[Math.floor(Math.random() * categories.length)];
        
        const sampleGrievance = {
            id: 'KM' + new Date().getFullYear() + '-' + 
                (this.grievances.length + 1001).toString().padStart(5, '0'),
            userPhone: '98765' + Math.floor(Math.random() * 10000),
            userName: 'Demo User',
            type: 'text',
            category: category,
            description: `Sample ${category} grievance for testing`,
            priority: Math.random() > 0.7 ? 'high' : 'medium',
            status: 'pending',
            department: this.getDepartmentName(category),
            timestamp: new Date().toISOString(),
            updates: [
                { status: 'submitted', timestamp: new Date().toISOString() }
            ]
        };
        
        // Add to grievances
        this.grievances.push(sampleGrievance);
        localStorage.setItem('kumbh_grievances', JSON.stringify(this.grievances));
        
        // Create notification
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        notifications.push({
            id: `notif_${Date.now()}`,
            type: 'new_grievance',
            grievanceId: sampleGrievance.id,
            title: 'New Grievance Received',
            description: sampleGrievance.description,
            category: category,
            department: sampleGrievance.department,
            priority: sampleGrievance.priority,
            timestamp: new Date().toISOString(),
            read: false
        });
        
        localStorage.setItem('kumbh_notifications', JSON.stringify(notifications));
        
        // Update UI
        this.updateDashboard();
        this.updateNotifications();
        
        console.log('Simulated new grievance:', sampleGrievance.id);
    }
}

// Initialize admin system
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if on admin dashboard
    if (document.getElementById('adminDashboard')) {
        window.adminSystem = new AdminSystem();
    }
});