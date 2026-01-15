// Main Application Controller
let routingControl;

class KumbhSahayakApp {
    constructor() {
        this.currentScreen = 'splash';
        this.userRole = null;
        this.userData = null;
        this.grievances = [];
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.checkSession();
        this.initStorage();
        console.log('Kumbh Sahayak App Initialized');
    }
    
    bindEvents() {
        // Splash screen
        document.getElementById('enterApp')?.addEventListener('click', () => this.showScreen('auth'));
        
        // Role selection
        document.getElementById('pilgrimRole')?.addEventListener('click', () => this.selectRole('pilgrim'));
        document.getElementById('adminRole')?.addEventListener('click', () => this.selectRole('admin'));
        
        // Back to roles
        document.getElementById('backToRoles')?.addEventListener('click', () => {
            document.getElementById('loginForm').style.display = 'none';
        });
        
        // Login button
        document.getElementById('loginBtn')?.addEventListener('click', () => {
            const role = this.userRole;
            if (role) this.login(role);
        });
        
        // Logout buttons
        document.getElementById('pilgrimLogout')?.addEventListener('click', () => this.logout());
        document.getElementById('adminLogout')?.addEventListener('click', () => this.logout());
        
        // Modal close buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal);
            });
        });
        
        // Action cards (pilgrim dashboard)
        const actionCards = {
            'openChatbot': 'chatbotModal',
            'openGrievance': 'grievanceModal',
            'openEmergency': 'emergencyModal',
            'openNavigation': 'navigationModal',
            'openTracking': 'trackingModal',
            'openInfo': 'infoModal'
        };
        
        Object.entries(actionCards).forEach(([btnId, modalId]) => {
            document.getElementById(btnId)?.addEventListener('click', () => {
                if (this.userRole === 'pilgrim') {
                    this.showModal(modalId);
                }
            });
        });
        
        // Close modals when clicking outside
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal);
                }
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // ESC to close modal
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal').forEach(modal => {
                    if (modal.style.display === 'flex') {
                        this.hideModal(modal);
                    }
                });
            }
        });
        
        // Success modal buttons
        document.getElementById('trackGrievanceBtn')?.addEventListener('click', () => {
            this.hideModal(document.getElementById('successModal'));
            this.showModal('trackingModal');
        });
        
        document.getElementById('closeSuccessBtn')?.addEventListener('click', () => {
            this.hideModal(document.getElementById('successModal'));
        });
        
        // Emergency SOS
        document.getElementById('triggerSOS')?.addEventListener('click', () => {
            this.triggerEmergency();
        });
        
        // Emergency type selection
        document.querySelectorAll('.emergency-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectEmergencyType(e.currentTarget.dataset.type);
            });
        });
        
        // Navigation options
        
        
        // AR Navigation
        document.getElementById('startAR')?.addEventListener('click', () => {
            this.showToast('AR Navigation starting... Point your camera towards the street', 'info');
        });
        
        // Grievance type selection
        document.querySelectorAll('.type-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectGrievanceType(e.currentTarget.dataset.type);
            });
        });
    }
    
    initStorage() {
        // Initialize localStorage data
        if (!localStorage.getItem('kumbh_grievances')) {
            localStorage.setItem('kumbh_grievances', JSON.stringify([]));
        }
        
        if (!localStorage.getItem('kumbh_users')) {
            const users = [
                {
                    phone: '9876543210',
                    password: 'pilgrim123',
                    name: 'Rahul Sharma',
                    role: 'pilgrim'
                },
                {
                    phone: 'admin@kumbh',
                    password: 'admin123',
                    name: 'Admin Officer',
                    role: 'admin'
                }
            ];
            localStorage.setItem('kumbh_users', JSON.stringify(users));
        }
        
        if (!localStorage.getItem('kumbh_notifications')) {
            localStorage.setItem('kumbh_notifications', JSON.stringify([]));
        }
    }
    
    showScreen(screenName) {
        // Hide all screens
        const screens = ['splashScreen', 'authScreen', 'pilgrimDashboard', 'adminDashboard'];
        screens.forEach(screenId => {
            const screen = document.getElementById(screenId);
            if (screen) screen.style.display = 'none';
        });
        
        // Show selected screen
        switch(screenName) {
            case 'splash':
                document.getElementById('splashScreen').style.display = 'block';
                break;
            case 'auth':
                document.getElementById('authScreen').style.display = 'block';
                document.getElementById('loginForm').style.display = 'none';
                break;
            case 'pilgrim':
                document.getElementById('pilgrimDashboard').style.display = 'block';
                break;
            case 'admin':
                document.getElementById('adminDashboard').style.display = 'block';
                // Initialize admin system
                if (window.adminSystem) {
                    window.adminSystem.loadData();
                }
                break;
        }
        
        this.currentScreen = screenName;
    }
    
    selectRole(role) {
        this.userRole = role;
        const loginForm = document.getElementById('loginForm');
        
        if (loginForm) {
            // Show login form
            loginForm.style.display = 'block';
            
            // Auto-fill demo credentials
            if (role === 'pilgrim') {
                document.getElementById('phoneNumber').value = '9876543210';
                document.getElementById('password').value = 'pilgrim123';
            } else {
                document.getElementById('phoneNumber').value = 'admin@kumbh';
                document.getElementById('password').value = 'admin123';
            }
        }
    }
    
    login(role) {
        const phone = document.getElementById('phoneNumber').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!phone || !password) {
            this.showToast('Please enter phone number and password', 'error');
            return;
        }
        
        // Check credentials
        const users = JSON.parse(localStorage.getItem('kumbh_users') || '[]');
        const user = users.find(u => u.phone === phone && u.password === password);
        
        if (!user) {
            this.showToast('Invalid credentials. Please try again.', 'error');
            return;
        }
        
        // Save session
        this.userData = {
            phone: user.phone,
            name: user.name,
            role: user.role,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('kumbh_session', JSON.stringify(this.userData));
        
        // Update UI
        document.getElementById('userName').textContent = `Welcome, ${user.name}`;
        
        // Show success message
        this.showToast('Login successful!', 'success');
        
        // Navigate to appropriate dashboard
        setTimeout(() => {
            if (role === 'pilgrim') {
                this.showScreen('pilgrim');
            } else {
                this.showScreen('admin');
            }
        }, 500);
    }
    
    logout() {
        // Clear session
        localStorage.removeItem('kumbh_session');
        this.userData = null;
        this.userRole = null;
        
        // Show splash screen
        this.showScreen('splash');
        
        // Show logout notification
        this.showToast('Logged out successfully', 'info');
    }
    
    checkSession() {
        const session = localStorage.getItem('kumbh_session');
        if (session) {
            try {
                this.userData = JSON.parse(session);
                this.userRole = this.userData.role;
                
                // Update UI
                document.getElementById('userName').textContent = `Welcome, ${this.userData.name}`;
                
                // Navigate to appropriate dashboard
                if (this.userRole === 'pilgrim') {
                    this.showScreen('pilgrim');
                } else if (this.userRole === 'admin') {
                    this.showScreen('admin');
                }
            } catch (e) {
                localStorage.removeItem('kumbh_session');
            }
        }
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Play notification sound for non-emergency modals
            if (modalId !== 'emergencyModal') {
                this.playNotificationSound();
            }
        }
    }
    
    hideModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    selectGrievanceType(type) {
        // Update active class
        document.querySelectorAll('.type-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.type === type) {
                option.classList.add('active');
            }
        });
        
        // Show corresponding form section
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.remove('active');
            if (section.classList.contains(`${type}-section`)) {
                section.classList.add('active');
            }
        });
    }
    
    selectEmergencyType(type) {
        // Update selection
        document.querySelectorAll('.emergency-option').forEach(option => {
            option.style.background = '';
            if (option.dataset.type === type) {
                option.style.background = 'rgba(255, 255, 255, 0.4)';
            }
        });
        
        this.selectedEmergencyType = type;
    }
    
    async triggerEmergency() {
        if (!this.selectedEmergencyType) {
            this.showToast('Please select emergency type first', 'error');
            return;
        }
        
        // Play emergency sound
        this.playSOSSound();
        
        // Get location
        const location = await this.getLocation();
        
        // Create emergency alert
        const emergencyAlert = {
            id: 'EMG-' + Date.now(),
            type: this.selectedEmergencyType,
            location: location,
            timestamp: new Date().toISOString(),
            user: this.userData?.phone || 'unknown',
            status: 'alert_sent'
        };
        
        // Save to notifications
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        notifications.push({
            ...emergencyAlert,
            title: 'Emergency Alert',
            description: `${this.selectedEmergencyType} emergency reported`,
            read: false
        });
        localStorage.setItem('kumbh_notifications', JSON.stringify(notifications));
        
        // Show emergency alert
        this.showToast('EMERGENCY ALERT SENT! Authorities notified with your location.', 'error');
        
        // Simulate sending to server
        setTimeout(() => {
            this.showToast('Help is on the way! Estimated arrival: 5 minutes', 'success');
            this.hideModal(document.getElementById('emergencyModal'));
        }, 2000);
        
        // Reset selection
        this.selectedEmergencyType = null;
        document.querySelectorAll('.emergency-option').forEach(option => {
            option.style.background = '';
        });
    }
    
    selectNavLocation(location) {
        // Update active class
        document.querySelectorAll('.nav-option').forEach(option => {
            option.classList.remove('active');
            if (option.dataset.location === location) {
                option.classList.add('active');
            }
        });
        
        // Initialize map if needed
        this.initMap();
    }
    
    initMap() {
        // Initialize Leaflet map when navigation modal opens
        const mapElement = document.getElementById('map');
        if (mapElement && !mapElement._leaflet_id) {
            const map = L.map('map').setView([25.4358, 81.8463], 15);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Add markers
            const locations = [
                { lat: 25.4358, lng: 81.8463, title: 'Main Bathing Ghat', type: 'ghat' },
                { lat: 25.4365, lng: 81.8470, title: 'Medical Camp A', type: 'medical' },
                { lat: 25.4350, lng: 81.8455, title: 'Help Desk 1', type: 'help' },
                { lat: 25.4370, lng: 81.8480, title: 'Toilet Complex', type: 'toilet' }
            ];
            
            locations.forEach(loc => {
                L.marker([loc.lat, loc.lng])
                    .addTo(map)
                    .bindPopup(loc.title);
            });
            
            mapElement._map = map;
        }
    }
    
    async getLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        });
                    },
                    () => {
                        // Fallback to Prayagraj coordinates
                        resolve({ lat: 25.4358, lng: 81.8463, accuracy: 1000 });
                    }
                );
            } else {
                resolve({ lat: 25.4358, lng: 81.8463, accuracy: 5000 });
            }
        });
    }
    
    playNotificationSound() {
        const sound = document.getElementById('notificationSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio play failed:', e));
        }
    }
    
    playSOSSound() {
        const sound = document.getElementById('sosSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('SOS sound play failed:', e));
        }
    }
    
    playSuccessSound() {
        const sound = document.getElementById('successSound');
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Success sound play failed:', e));
        }
    }
    
    showToast(message, type = 'info', duration = 5000) {
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
    
    // Public methods for other modules
    showAIProcessingModal() {
        this.showModal('aiProcessingModal');
    }
    
    hideAIProcessingModal() {
        this.hideModal(document.getElementById('aiProcessingModal'));
    }
    
    showSuccessModal(grievance) {
        // Update success modal with grievance details
        if (grievance) {
            document.getElementById('grievanceIdDisplay').textContent = grievance.id;
            document.getElementById('departmentDisplay').textContent = grievance.department;
            document.getElementById('priorityDisplay').textContent = grievance.priority;
            document.getElementById('priorityDisplay').className = `priority-${grievance.priority}`;
            
            // Calculate ETA
            const eta = this.calculateETA(grievance.priority);
            document.getElementById('etaDisplay').textContent = eta;
            
            // Update tracking modal
            document.getElementById('trackingGrievanceId').textContent = grievance.id;
        }
        
        this.showModal('successModal');
        this.playSuccessSound();
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new KumbhSahayakApp();
});





/**********************
 * SMART NAVIGATION MAP
 **********************/

let map;
let mapInitialized = false;

function initMap() {
  if (mapInitialized) return;

  // Ramkund, Nashik (default center)
  map = L.map("map").setView([19.9975, 73.7898], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap contributors"
  }).addTo(map);

  mapInitialized = true;
}




const openNavigationBtn = document.getElementById("openNavigation");
const navigationModal = document.getElementById("navigationModal");

if (openNavigationBtn) {
  openNavigationBtn.addEventListener("click", () => {
    navigationModal.style.display = "block";

    setTimeout(() => {
      initMap();
      map.invalidateSize(); // IMPORTANT
    }, 300);
  });
}



const locations = {
  ghat: [19.9975, 73.7898],
  toilet: [19.9988, 73.7880],
  medical: [19.9964, 73.7903],
  help: [19.9990, 73.7915]
};

document.querySelectorAll(".nav-option").forEach(option => {
  option.addEventListener("click", () => {
    if (!map) return;

    const key = option.dataset.location;
    const coords = locations[key];

    map.setView(coords, 16);

    L.marker(coords)
      .addTo(map)
      .bindPopup(key.toUpperCase())
      .openPopup();
  });
});

const arBtn = document.getElementById("startAR");

if (arBtn) {
  arBtn.addEventListener("click", () => {
    alert("AR Navigation will be available in the mobile app version.");
  });
}



document.querySelectorAll(".nav-option").forEach(option => {
  option.addEventListener("click", () => {
    if (!map) return;

    const destinationKey = option.dataset.location;
    const destinationCoords = locations[destinationKey];

    // Get user's current location
    navigator.geolocation.getCurrentPosition(
      position => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        // Remove old route
        if (routingControl) {
          map.removeControl(routingControl);
        }

        routingControl = L.Routing.control({
          waypoints: [
            L.latLng(userLat, userLng),
            L.latLng(destinationCoords[0], destinationCoords[1])
          ],
          routeWhileDragging: false,
          show: false,
          addWaypoints: false,
          draggableWaypoints: false
        }).addTo(map);

        map.setView([userLat, userLng], 15);
      },
      () => {
        alert("Location access denied. Please allow location.");
      }
    );
  });
});

// Navigation option active state fix
document.querySelectorAll(".nav-option").forEach(option => {
  option.addEventListener("click", () => {

    // Remove active from all
    document.querySelectorAll(".nav-option").forEach(btn => {
      btn.classList.remove("active");
    });

    // Add active to clicked
    option.classList.add("active");

    // Navigation logic
    const locationType = option.dataset.location;
    selectNavigation(locationType); // already existing function
  });
});
