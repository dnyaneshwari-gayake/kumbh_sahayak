// Grievance System with AI Processing
class GrievanceSystem {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.videoChunks = [];
        this.isRecording = false;
        this.init();
    }
    
    init() {
        this.bindEvents();
    }
    
    bindEvents() {
        // Grievance type selection
        document.querySelectorAll('.type-option').forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectGrievanceType(e.currentTarget.dataset.type);
            });
        });
        
        // Submit grievance button
        document.getElementById('submitGrievanceBtn')?.addEventListener('click', () => {
            this.submitGrievance();
        });
        
        // Audio recording
        document.getElementById('recordAudio')?.addEventListener('click', () => {
            this.toggleAudioRecording();
        });
        
        // Video recording
        document.getElementById('recordVideo')?.addEventListener('click', () => {
            this.toggleVideoRecording();
        });
    }
    
    selectGrievanceType(type) {
        // Update UI
        document.querySelectorAll('.type-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector(`.type-option[data-type="${type}"]`)?.classList.add('active');
        
        // Show corresponding form section
        document.querySelectorAll('.form-section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelector(`.${type}-section`)?.classList.add('active');
    }
    
    async submitGrievance() {
        const activeType = document.querySelector('.type-option.active')?.dataset.type;
        const category = document.getElementById('grievanceCategory')?.value;
        const description = document.getElementById('grievanceText')?.value;
        
        // Validation
        if (!this.validateGrievance(activeType, description)) return;
        
        // Get user data
        const userData = JSON.parse(localStorage.getItem('kumbh_session'));
        if (!userData) {
            window.app.showToast('Please login to submit grievance', 'error');
            return;
        }
        
        // Create grievance object
        const grievance = {
            id: this.generateGrievanceId(),
            userPhone: userData.phone,
            userName: userData.name,
            type: activeType,
            category: category,
            description: activeType === 'text' ? description : `${activeType} grievance`,
            priority: this.calculatePriority(category),
            department: this.routeToDepartment(category),
            language: 'hi', // Default, would be detected in real app
            timestamp: new Date().toISOString(),
            status: 'pending'
        };
        
        // Close grievance modal
        window.app.hideModal(document.getElementById('grievanceModal'));
        
        // Show AI processing modal
        window.app.showAIProcessingModal();
        
        // Process AI steps
        await this.processAISteps(grievance);
        
        // Save grievance
        this.saveGrievance(grievance);
        
        // Show success modal
        window.app.showSuccessModal(grievance);
        
        // Reset form
        this.resetForm();
    }
    
    validateGrievance(type, description) {
        if (!type) {
            window.app.showToast('Please select a grievance type', 'error');
            return false;
        }
        
        if (type === 'text' && (!description || description.trim().length < 10)) {
            window.app.showToast('Please describe your issue in at least 10 characters', 'error');
            return false;
        }
        
        return true;
    }
    
    async processAISteps(grievance) {
        return new Promise((resolve) => {
            // Step 1: Language Detection
            this.processStep(1, 1500, languageManager.getTranslation('detected'), () => {
                // Step 2: Department Routing
                this.processStep(2, 2000, `${languageManager.getTranslation('routing')} ${grievance.department}`, () => {
                    // Step 3: Priority Assessment
                    this.processStep(3, 1500, `${languageManager.getTranslation('priority')} ${grievance.priority}`, () => {
                        // Step 4: Submission to Admin
                        this.processStep(4, 1000, 'Submitted successfully!', () => {
                            setTimeout(() => {
                                window.app.hideAIProcessingModal();
                                resolve();
                            }, 500);
                        });
                    });
                });
            });
        });
    }
    
    processStep(stepNumber, duration, resultText, callback) {
        return new Promise((resolve) => {
            const progressFill = document.getElementById(`progress${stepNumber}`);
            const statusElement = document.getElementById(`status${stepNumber}`);
            const stepElement = document.getElementById(`step${stepNumber}`);
            
            if (progressFill && statusElement && stepElement) {
                // Activate step
                stepElement.classList.add('active');
                
                // Animate progress bar
                let progress = 0;
                const interval = setInterval(() => {
                    progress += 2;
                    progressFill.style.width = `${progress}%`;
                    
                    if (progress >= 100) {
                        clearInterval(interval);
                        
                        // Show result
                        setTimeout(() => {
                            statusElement.textContent = resultText;
                            stepElement.classList.remove('active');
                            stepElement.classList.add('completed');
                            callback();
                            resolve();
                        }, 300);
                    }
                }, duration / 50);
            } else {
                callback();
                resolve();
            }
        });
    }
    
    saveGrievance(grievance) {
        // Get existing grievances
        const grievances = JSON.parse(localStorage.getItem('kumbh_grievances') || '[]');
        
        // Add new grievance
        grievances.push(grievance);
        localStorage.setItem('kumbh_grievances', JSON.stringify(grievances));
        
        // Create notification for admin
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        notifications.push({
            id: grievance.id,
            type: 'new_grievance',
            title: 'New Grievance Received',
            description: grievance.description.substring(0, 100) + '...',
            category: grievance.category,
            priority: grievance.priority,
            timestamp: new Date().toISOString(),
            read: false
        });
        localStorage.setItem('kumbh_notifications', JSON.stringify(notifications));
        
        // Update notification count for admin
        this.updateAdminNotificationCount();
        
        console.log('Grievance saved:', grievance);
    }
    
    updateAdminNotificationCount() {
        const notifications = JSON.parse(localStorage.getItem('kumbh_notifications') || '[]');
        const unreadCount = notifications.filter(n => !n.read).length;
        
        // Update badge if admin dashboard is active
        const badge = document.getElementById('notificationCount');
        if (badge) {
            badge.textContent = unreadCount;
            badge.parentElement.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }
    
    generateGrievanceId() {
        const year = new Date().getFullYear();
        const grievances = JSON.parse(localStorage.getItem('kumbh_grievances') || '[]');
        const sequence = (grievances.length + 1).toString().padStart(5, '0');
        return `KM${year}-${sequence}`;
    }
    
    calculatePriority(category) {
        const priorities = {
            'medical': 'high',
            'security': 'high',
            'sanitation': 'medium',
            'crowd': 'medium',
            'other': 'low'
        };
        return priorities[category] || 'medium';
    }
    
    routeToDepartment(category) {
        const departments = {
            'medical': 'Medical Department',
            'security': 'Police Department',
            'sanitation': 'Sanitation Department',
            'crowd': 'Crowd Management',
            'other': 'General Administration'
        };
        return departments[category] || 'General Administration';
    }
    
    calculateETA(priority) {
        const etas = {
            'high': '1-2 hours',
            'medium': '2-4 hours',
            'low': '4-8 hours'
        };
        return etas[priority] || '2-4 hours';
    }
    
    async toggleAudioRecording() {
        const recordBtn = document.getElementById('recordAudio');
        const audioPreview = document.getElementById('audioPreview');
        
        if (!this.isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];
                
                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.audioChunks.push(event.data);
                    }
                };
                
                this.mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    
                    audioPreview.src = audioUrl;
                    audioPreview.style.display = 'block';
                    
                    stream.getTracks().forEach(track => track.stop());
                };
                
                this.mediaRecorder.start();
                this.isRecording = true;
                recordBtn.classList.add('recording');
                recordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
                
            } catch (error) {
                console.error('Error accessing microphone:', error);
                window.app.showToast('Please allow microphone access', 'error');
            }
        } else {
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
                this.isRecording = false;
                recordBtn.classList.remove('recording');
                recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Record Audio';
            }
        }
    }
    
    async toggleVideoRecording() {
        const recordBtn = document.getElementById('recordVideo');
        const videoPreview = document.getElementById('videoPreview');
        
        if (!this.isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ 
                    video: true, 
                    audio: true 
                });
                
                this.mediaRecorder = new MediaRecorder(stream);
                this.videoChunks = [];
                
                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.videoChunks.push(event.data);
                    }
                };
                
                this.mediaRecorder.onstop = () => {
                    const videoBlob = new Blob(this.videoChunks, { type: 'video/webm' });
                    const videoUrl = URL.createObjectURL(videoBlob);
                    
                    videoPreview.src = videoUrl;
                    videoPreview.style.display = 'block';
                    
                    stream.getTracks().forEach(track => track.stop());
                };
                
                this.mediaRecorder.start();
                this.isRecording = true;
                recordBtn.classList.add('recording');
                recordBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Recording';
                
                // Show camera preview
                videoPreview.srcObject = stream;
                videoPreview.style.display = 'block';
                videoPreview.muted = true;
                videoPreview.play();
                
            } catch (error) {
                console.error('Error accessing camera:', error);
                window.app.showToast('Please allow camera access', 'error');
            }
        } else {
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
                this.isRecording = false;
                recordBtn.classList.remove('recording');
                recordBtn.innerHTML = '<i class="fas fa-video"></i> Record Video';
                
                videoPreview.srcObject = null;
            }
        }
    }
    
    resetForm() {
        // Reset text input
        document.getElementById('grievanceText').value = '';
        
        // Reset media previews
        document.getElementById('audioPreview').style.display = 'none';
        document.getElementById('audioPreview').src = '';
        document.getElementById('videoPreview').style.display = 'none';
        document.getElementById('videoPreview').src = '';
        
        // Reset recording state
        this.isRecording = false;
        const recordBtns = document.querySelectorAll('.btn-record');
        recordBtns.forEach(btn => {
            btn.classList.remove('recording');
            if (btn.id === 'recordAudio') {
                btn.innerHTML = '<i class="fas fa-microphone"></i> Record Audio';
            } else {
                btn.innerHTML = '<i class="fas fa-video"></i> Record Video';
            }
        });
        
        // Reset AI processing steps for next use
        for (let i = 1; i <= 4; i++) {
            const stepElement = document.getElementById(`step${i}`);
            const progressFill = document.getElementById(`progress${i}`);
            const statusElement = document.getElementById(`status${i}`);
            
            if (stepElement) {
                stepElement.classList.remove('active', 'completed');
            }
            if (progressFill) {
                progressFill.style.width = '0%';
            }
            if (statusElement) {
                statusElement.textContent = i === 1 ? 'Detecting...' : 
                                          i === 2 ? 'Analyzing...' : 
                                          i === 3 ? 'Assessing...' : 'Sending...';
            }
        }
    }
}

// Initialize grievance system
document.addEventListener('DOMContentLoaded', () => {
    window.grievanceSystem = new GrievanceSystem();
});