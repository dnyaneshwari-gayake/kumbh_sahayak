// AI Chatbot System
class AIChatbot {
    constructor() {
        this.messages = [];
        this.isListening = false;
        this.recognition = null;
        this.responses = {
            'hi': ['Namaste! How can I assist you today?', 'Hello! Welcome to Kumbh Sahayak.'],
            'help': ['I can help you with directions, facility locations, emergency services, and grievance submission. What do you need?'],
            'medical': ['There are medical camps at Zones A, C, and E. Emergency medical services are available 24/7.'],
            'police': ['Police help desks are located at all major ghats. Emergency police assistance is available at 112.'],
            'toilet': ['Toilet complexes are available every 500 meters along the main route. See the navigation map for exact locations.'],
            'water': ['Drinking water stations are available at all major ghats and help desks. Look for blue signage.'],
            'lost': ['Don\'t worry! Share your current location or nearby landmark. I\'ll guide you to the nearest help desk.'],
            'crowd': ['Current crowd status: Main ghat at 65% capacity. Alternative less-crowded ghats are available.'],
            'emergency': ['For emergencies, use the SOS button on your dashboard. This will alert authorities with your location immediately.'],
            'grievance': ['You can submit grievances through text, audio, or video. Select the type and describe your issue.'],
            'default': ['I understand. Let me connect you with the appropriate department. Is there anything else I can help with?']
        };
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.initSpeechRecognition();
    }
    
    bindEvents() {
        // Send message button
        document.getElementById('sendMessage')?.addEventListener('click', () => this.sendMessage());
        
        // Voice input button
        document.getElementById('voiceInput')?.addEventListener('click', () => this.toggleVoiceInput());
        
        // Enter key to send message
        document.getElementById('chatInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }
    
    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Get AI response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.getAIResponse(message);
            this.addMessage(response, 'ai');
        }, 1000);
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${this.escapeHtml(text)}</p>`;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Store message
        this.messages.push({ text, sender, timestamp: new Date() });
    }
    
    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        if (!messagesContainer) return;
        
        const indicator = document.createElement('div');
        indicator.className = 'message ai-message typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        messagesContainer.appendChild(indicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }
    
    getAIResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // Check for keywords
        for (const [keyword, responses] of Object.entries(this.responses)) {
            if (lowerMessage.includes(keyword)) {
                return this.getRandomResponse(responses);
            }
        }
        
        // Check for greetings
        if (lowerMessage.match(/\b(hello|hi|namaste|namaskar)\b/)) {
            return this.getRandomResponse(this.responses.hi);
        }
        
        // Default response
        return this.getRandomResponse(this.responses.default);
    }
    
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    initSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            
            // Set language based on current selection
            this.updateRecognitionLanguage();
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chatInput').value = transcript;
                this.sendMessage();
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateVoiceButton();
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton();
            };
        }
    }
    
    updateRecognitionLanguage() {
        if (!this.recognition) return;
        
        const lang = localStorage.getItem('kumbh_lang') || 'en';
        const langCodes = {
            'en': 'en-IN',
            'hi': 'hi-IN',
            'mr': 'mr-IN'
        };
        
        this.recognition.lang = langCodes[lang] || 'en-IN';
    }
    
    toggleVoiceInput() {
        if (!this.recognition) {
            window.app.showToast('Speech recognition is not supported in your browser', 'error');
            return;
        }
        
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.updateRecognitionLanguage();
            this.recognition.start();
            this.isListening = true;
        }
        
        this.updateVoiceButton();
    }
    
    updateVoiceButton() {
        const button = document.getElementById('voiceInput');
        if (!button) return;
        
        if (this.isListening) {
            button.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            button.style.background = '#d32f2f';
        } else {
            button.innerHTML = '<i class="fas fa-microphone"></i>';
            button.style.background = '';
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
    window.chatbot = new AIChatbot();
});