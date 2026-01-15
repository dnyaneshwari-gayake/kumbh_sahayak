// Multilingual Support System
const translations = {
    en: {
        // Splash Screen
        app_title: "Kumbh Sahayak",
        tagline: "Smart Help. Safe Pilgrimage.",
        enter_app: "Enter Application",
        
        // Authentication
        select_role: "Select Your Role",
        pilgrim: "Pilgrim / Citizen",
        pilgrim_desc: "Access help, submit grievances, emergency services",
        admin: "Admin / Authority",
        admin_desc: "Monitor, manage, and resolve grievances",
        login: "Login",
        phone_number: "Phone Number",
        password: "Password",
        login_btn: "Login",
        back: "Back to Roles",
        
        // Dashboard
        welcome: "Welcome, Pilgrim",
        logout: "Logout",
        quick_actions: "Quick Actions",
        ai_chatbot: "AI Chatbot",
        ai_chatbot_desc: "Get instant answers in your language",
        submit_grievance: "Submit Grievance",
        submit_grievance_desc: "Report issues via text, audio or video",
        emergency_sos: "Emergency SOS",
        emergency_sos_desc: "One-tap emergency alert",
        smart_navigation: "Smart Navigation",
        smart_navigation_desc: "Maps with AR directions",
        verified_info: "Verified Information",
        verified_info_desc: "Official announcements & alerts",
        track_grievance: "Track Grievance",
        track_grievance_desc: "Check status of your reports",
        live_updates: "Live Updates",
        safety: "Safety",
        ritual: "Ritual",
        weather: "Weather",
        just_now: "Just now",
        "30_min": "30 min ago",
        "1_hr": "1 hour ago",
        update1: "Crowd density normal at Main Bathing Ghat",
        update2: "Evening Aarti scheduled at 7:00 PM",
        update3: "Clear weather expected throughout the day",
        
        // Chatbot
        ai_assistant: "AI Assistant",
        chat_welcome: "Namaste! I'm your AI assistant. How can I help you today? You can ask about facilities, directions, rituals, or report issues.",
        type_message: "Type your message...",
        send: "Send",
        
        // Grievance
        text: "Text",
        audio: "Audio",
        video: "Video",
        describe_issue: "Describe your issue...",
        record_audio: "Record Audio",
        record_video: "Record Video",
        category: "Category",
        sanitation: "Sanitation",
        security: "Security",
        medical: "Medical",
        crowd: "Crowd Management",
        other: "Other",
        
        // AI Processing
        ai_processing: "AI Processing Your Grievance",
        language_detection: "Language Detection",
        detecting: "Detecting...",
        department_routing: "Department Routing",
        analyzing: "Analyzing...",
        priority_assessment: "Priority Assessment",
        assessing: "Assessing...",
        submitting: "Submitting to Admin",
        sending: "Sending...",
        processing_message: "AI is processing your grievance...",
        detected: "Detected: Hindi",
        routing: "Routed to: Sanitation Dept",
        priority: "Priority: Medium",
        
        // Success Modal
        success_title: "Grievance Submitted Successfully!",
        grievance_id: "Grievance ID",
        department: "Department",
        estimated_time: "Estimated Resolution",
        success_message: "Your grievance has been sent to the concerned department. You can track the status in the Tracking section.",
        track_now: "Track Now",
        close: "Close",
        
        // Emergency
        sos_warning: "This will alert nearby authorities with your location",
        medical_emergency: "Medical Emergency",
        police_assistance: "Police Assistance",
        fire_emergency: "Fire Emergency",
        other_emergency: "Other Emergency",
        tap_emergency: "TAP FOR EMERGENCY",
        sos_note: "Your location will be shared automatically",
        
        // Navigation
        bathing_ghats: "Bathing Ghats",
        toilets: "Toilets",
        medical_camps: "Medical Camps",
        help_desks: "Help Desks",
        start_ar: "Start AR Navigation",
        
        // Tracking
        grievance_tracking: "Grievance Tracking",
        submitted: "Submitted",
        submitted_time: "2 hours ago",
        assigned: "Assigned",
        assigned_time: "1 hour ago",
        in_progress: "In Progress",
        progress_time: "Currently being resolved",
        resolved: "Resolved",
        eta: "ETA: 2 hours",
        sanitation_dept: "Sanitation Department",
        medium: "Medium",
        assigned_officer: "Assigned Officer",
        officer_name: "Officer Rajesh Kumar",
        
        // Information Hub
        verified: "✓ Verified",
        fake_news: "⚠ Fake News Detected",
        info_title1: "Main Ghat Capacity Update",
        info_desc1: "Current capacity at 65%. Normal entry permitted.",
        info_title2: "Weather Advisory",
        info_desc2: "Clear skies expected. No rain forecast for next 24 hours.",
        info_title3: "False Closure Alert",
        info_desc3: 'Report: "All ghats closed due to overcrowding" - THIS IS FALSE',
        info_title4: "Medical Camp Locations",
        info_desc4: "24/7 medical camps operational at Zones A, C, and E.",
        
        // Admin Panel
        admin_panel: "Admin Panel",
        dashboard: "Dashboard",
        total_grievances: "Total Grievances",
        active_cases: "Active Cases",
        emergency_cases: "Emergency Cases",
        avg_resolution: "Avg Resolution Time",
        department_control: "Department Control",
        police: "Police",
        new_cases: "New",
        in_progress: "Progress",
        delayed: "Delayed",
        crowd_mgmt: "Crowd Management",
        ai_routing: "AI Routing Oversight",
        ai_department: "AI Department",
        confidence: "Confidence",
        action: "Action",
        medical_dept: "Medical Department",
        police_dept: "Police Department",
        override: "Override",
        approve: "Approve",
        new_grievances: "New Grievances",
        clear_all: "Clear All"
    },
    
    hi: {
        // Splash Screen
        app_title: "कुंभ सहायक",
        tagline: "स्मार्ट सहायता। सुरक्षित तीर्थयात्रा।",
        enter_app: "एप्लिकेशन दर्ज करें",
        
        // Authentication
        select_role: "अपनी भूमिका चुनें",
        pilgrim: "तीर्थयात्री / नागरिक",
        pilgrim_desc: "सहायता प्राप्त करें, शिकायतें दर्ज करें, आपातकालीन सेवाएं",
        admin: "प्रशासन / अधिकारी",
        admin_desc: "शिकायतों की निगरानी, प्रबंधन और समाधान करें",
        login: "लॉग इन करें",
        phone_number: "फोन नंबर",
        password: "पासवर्ड",
        login_btn: "लॉग इन करें",
        back: "भूमिकाओं पर वापस जाएं",
        
        // Dashboard
        welcome: "स्वागत है, तीर्थयात्री",
        logout: "लॉग आउट",
        quick_actions: "त्वरित कार्रवाई",
        ai_chatbot: "एआई चैटबॉट",
        ai_chatbot_desc: "अपनी भाषा में तत्काल उत्तर प्राप्त करें",
        submit_grievance: "शिकायत दर्ज करें",
        submit_grievance_desc: "पाठ, ऑडियो या वीडियो के माध्यम से समस्याओं की रिपोर्ट करें",
        emergency_sos: "आपातकालीन एसओएस",
        emergency_sos_desc: "एक-टैप आपातकालीन अलर्ट",
        smart_navigation: "स्मार्ट नेविगेशन",
        smart_navigation_desc: "एआर दिशाओं के साथ मानचित्र",
        verified_info: "सत्यापित जानकारी",
        verified_info_desc: "आधिकारिक घोषणाएं और अलर्ट",
        track_grievance: "शिकायत ट्रैक करें",
        track_grievance_desc: "अपनी रिपोर्टों की स्थिति देखें",
        live_updates: "लाइव अपडेट",
        safety: "सुरक्षा",
        ritual: "धार्मिक अनुष्ठान",
        weather: "मौसम",
        just_now: "अभी अभी",
        "30_min": "30 मिनट पहले",
        "1_hr": "1 घंटा पहले",
        update1: "मुख्य स्नान घाट पर भीड़ घनत्व सामान्य",
        update2: "शाम की आरती शाम 7:00 बजे निर्धारित",
        update3: "पूरे दिन साफ मौसम की उम्मीद",
        
        // Chatbot
        ai_assistant: "एआई सहायक",
        chat_welcome: "नमस्ते! मैं आपका एआई सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं? आप सुविधाओं, दिशाओं, अनुष्ठानों के बारे में पूछ सकते हैं या समस्याओं की रिपोर्ट कर सकते हैं।",
        type_message: "अपना संदेश टाइप करें...",
        send: "भेजें",
        
        // Grievance
        text: "पाठ",
        audio: "ऑडियो",
        video: "वीडियो",
        describe_issue: "अपनी समस्या का वर्णन करें...",
        record_audio: "ऑडियो रिकॉर्ड करें",
        record_video: "वीडियो रिकॉर्ड करें",
        category: "श्रेणी",
        sanitation: "सफाई",
        security: "सुरक्षा",
        medical: "चिकित्सा",
        crowd: "भीड़ प्रबंधन",
        other: "अन्य",
        
        // AI Processing
        ai_processing: "आपकी शिकायत का एआई प्रसंस्करण",
        language_detection: "भाषा पहचान",
        detecting: "पहचान रहा है...",
        department_routing: "विभाग रूटिंग",
        analyzing: "विश्लेषण कर रहा है...",
        priority_assessment: "प्राथमिकता मूल्यांकन",
        assessing: "मूल्यांकन कर रहा है...",
        submitting: "प्रशासन को जमा करना",
        sending: "भेज रहा है...",
        processing_message: "एआई आपकी शिकायत को प्रोसेस कर रहा है...",
        detected: "पहचाना गया: हिंदी",
        routing: "रूट किया गया: स्वच्छता विभाग",
        priority: "प्राथमिकता: मध्यम",
        
        // Success Modal
        success_title: "शिकायत सफलतापूर्वक जमा हुई!",
        grievance_id: "शिकायत आईडी",
        department: "विभाग",
        estimated_time: "अनुमानित समाधान",
        success_message: "आपकी शिकायत संबंधित विभाग को भेज दी गई है। आप ट्रैकिंग सेक्शन में स्थिति ट्रैक कर सकते हैं।",
        track_now: "अभी ट्रैक करें",
        close: "बंद करें",
        
        // Emergency
        sos_warning: "यह आपके स्थान के साथ निकटतम अधिकारियों को सचेत करेगा",
        medical_emergency: "चिकित्सा आपातकाल",
        police_assistance: "पुलिस सहायता",
        fire_emergency: "अग्नि आपातकाल",
        other_emergency: "अन्य आपातकाल",
        tap_emergency: "आपातकाल के लिए टैप करें",
        sos_note: "आपका स्थान स्वचालित रूप से साझा किया जाएगा",
        
        // Navigation
        bathing_ghats: "स्नान घाट",
        toilets: "शौचालय",
        medical_camps: "चिकित्सा शिविर",
        help_desks: "सहायता डेस्क",
        start_ar: "एआर नेविगेशन शुरू करें",
        
        // Tracking
        grievance_tracking: "शिकायत ट्रैकिंग",
        submitted: "प्रस्तुत",
        submitted_time: "2 घंटे पहले",
        assigned: "नियत",
        assigned_time: "1 घंटा पहले",
        in_progress: "प्रगति में",
        progress_time: "वर्तमान में हल किया जा रहा है",
        resolved: "हल",
        eta: "अनुमानित समय: 2 घंटे",
        sanitation_dept: "स्वच्छता विभाग",
        medium: "मध्यम",
        assigned_officer: "नियत अधिकारी",
        officer_name: "अधिकारी राजेश कुमार",
        
        // Information Hub
        verified: "✓ सत्यापित",
        fake_news: "⚠ नकली खबर पाई गई",
        info_title1: "मुख्य घाट क्षमता अपडेट",
        info_desc1: "वर्तमान क्षमता 65%। सामान्य प्रवेश की अनुमति।",
        info_title2: "मौसम चेतावनी",
        info_desc2: "साफ आसमान की उम्मीद। अगले 24 घंटों तक बारिश का पूर्वानुमान नहीं।",
        info_title3: "झूठी बंदी चेतावनी",
        info_desc3: 'रिपोर्ट: "सभी घाट अधिक भीड़ के कारण बंद" - यह झूठ है',
        info_title4: "चिकित्सा शिविर स्थान",
        info_desc4: "जोन ए, सी, और ई में 24/7 चिकित्सा शिविर कार्यशील।",
        
        // Admin Panel
        admin_panel: "प्रशासन पैनल",
        dashboard: "डैशबोर्ड",
        total_grievances: "कुल शिकायतें",
        active_cases: "सक्रिय मामले",
        emergency_cases: "आपातकालीन मामले",
        avg_resolution: "औसत समाधान समय",
        department_control: "विभाग नियंत्रण",
        police: "पुलिस",
        new_cases: "नए",
        in_progress: "प्रगति",
        delayed: "विलंबित",
        crowd_mgmt: "भीड़ प्रबंधन",
        ai_routing: "एआई रूटिंग निगरानी",
        ai_department: "एआई विभाग",
        confidence: "विश्वास",
        action: "कार्रवाई",
        medical_dept: "चिकित्सा विभाग",
        police_dept: "पुलिस विभाग",
        override: "ओवरराइड",
        approve: "अनुमोदित",
        new_grievances: "नई शिकायतें",
        clear_all: "सभी साफ करें"
    },
    
    mr: {
        // Splash Screen
        app_title: "कुंभ सहाय्यक",
        tagline: "स्मार्ट मदत. सुरक्षित तीर्थयात्रा.",
        enter_app: "अॅप्लिकेशनमध्ये प्रवेश करा",
        
        // Authentication
        select_role: "तुमची भूमिका निवडा",
        pilgrim: "तीर्थयात्री / नागरिक",
        pilgrim_desc: "मदत मिळवा, तक्रारी सादर करा, आणीबाणी सेवा",
        admin: "प्रशासन / प्राधिकरण",
        admin_desc: "तक्रारींचे निरीक्षण, व्यवस्थापन आणि निराकरण करा",
        login: "लॉगिन करा",
        phone_number: "फोन नंबर",
        password: "पासवर्ड",
        login_btn: "लॉगिन करा",
        back: "भूमिकांकडे परत जा",
        
        // Dashboard
        welcome: "स्वागत आहे, तीर्थयात्री",
        logout: "लॉग आउट",
        quick_actions: "द्रुत क्रिया",
        ai_chatbot: "एआई चॅटबॉट",
        ai_chatbot_desc: "तुमच्या भाषेत त्वरित उत्तरे मिळवा",
        submit_grievance: "तक्रार सादर करा",
        submit_grievance_desc: "मजकूर, ऑडिओ किंवा व्हिडिओद्वारे समस्यांची नोंद करा",
        emergency_sos: "आणीबाणी एसओएस",
        emergency_sos_desc: "एक-टॅप आणीबाणी अलर्ट",
        smart_navigation: "स्मार्ट नेव्हिगेशन",
        smart_navigation_desc: "एआर दिशानिर्देशांसह नकाशे",
        verified_info: "प्रमाणित माहिती",
        verified_info_desc: "अधिकृत घोषणा आणि सतर्कता",
        track_grievance: "तक्रार ट्रॅक करा",
        track_grievance_desc: "तुमच्या अहवालांची स्थिती तपासा",
        live_updates: "लाइव अपडेट्स",
        safety: "सुरक्षा",
        ritual: "धार्मिक विधी",
        weather: "हवामान",
        just_now: "नुकतेच",
        "30_min": "30 मिनिटांपूर्वी",
        "1_hr": "1 तासापूर्वी",
        update1: "मुख्य स्नान घाटावर गर्दीची घनता सामान्य",
        update2: "संध्याकाळची आरती संध्याकाळी 7:00 वाजता नियोजित",
        update3: "संपूर्ण दिवसभर स्पष्ट हवामानाची अपेक्षा",
        
        // Chatbot
        ai_assistant: "एआई सहाय्यक",
        chat_welcome: "नमस्कार! मी तुमचा एआई सहाय्यक आहे. मी आज तुमची कशी मदत करू शकतो? तुम्ही सुविधा, दिशा, विधी याबद्दल विचारू शकता किंवा समस्यांची नोंद करू शकता.",
        type_message: "तुमचा संदेश टाइप करा...",
        send: "पाठवा",
        
        // Grievance
        text: "मजकूर",
        audio: "ऑडिओ",
        video: "व्हिडिओ",
        describe_issue: "तुमच्या समस्येचे वर्णन करा...",
        record_audio: "ऑडिओ रेकॉर्ड करा",
        record_video: "व्हिडिओ रेकॉर्ड करा",
        category: "श्रेणी",
        sanitation: "स्वच्छता",
        security: "सुरक्षा",
        medical: "वैद्यकीय",
        crowd: "गर्दी व्यवस्थापन",
        other: "इतर",
        
        // AI Processing
        ai_processing: "तुमच्या तक्रारीचे एआई प्रक्रिया",
        language_detection: "भाषा शोध",
        detecting: "शोधत आहे...",
        department_routing: "विभाग रूटिंग",
        analyzing: "विश्लेषण करत आहे...",
        priority_assessment: "प्राधान्य मूल्यांकन",
        assessing: "मूल्यांकन करत आहे...",
        submitting: "प्रशासनाकडे सादर करणे",
        sending: "पाठवत आहे...",
        processing_message: "एआई तुमची तक्रार प्रोसेस करत आहे...",
        detected: "शोधले: हिंदी",
        routing: "रूट केले: स्वच्छता विभाग",
        priority: "प्राधान्य: मध्यम",
        
        // Success Modal
        success_title: "तक्रार यशस्वीरित्या सादर केली!",
        grievance_id: "तक्रार आयडी",
        department: "विभाग",
        estimated_time: "अंदाजित निराकरण",
        success_message: "तुमची तक्रार संबंधित विभागाकडे पाठवली गेली आहे. तुम्ही ट्रॅकिंग विभागात स्थिती ट्रॅक करू शकता.",
        track_now: "आत्ताच ट्रॅक करा",
        close: "बंद करा",
        
        // Emergency
        sos_warning: "हे तुमच्या स्थानासह जवळच्या प्राधिकरणांना सतर्क करेल",
        medical_emergency: "वैद्यकीय आणीबाणी",
        police_assistance: "पोलिस मदत",
        fire_emergency: "आग आणीबाणी",
        other_emergency: "इतर आणीबाणी",
        tap_emergency: "आणीबाणीसाठी टॅप करा",
        sos_note: "तुमचे स्थान आपोआप सामायिक केले जाईल",
        
        // Navigation
        bathing_ghats: "स्नान घाट",
        toilets: "शौचालये",
        medical_camps: "वैद्यकीय शिबिरे",
        help_desks: "मदत डेस्क",
        start_ar: "एआर नेव्हिगेशन सुरू करा",
        
        // Tracking
        grievance_tracking: "तक्रार ट्रॅकिंग",
        submitted: "सादर केले",
        submitted_time: "2 तासांपूर्वी",
        assigned: "नियुक्त केले",
        assigned_time: "1 तासापूर्वी",
        in_progress: "प्रगतीपथावर",
        progress_time: "सध्या निराकरण केले जात आहे",
        resolved: "निराकरण",
        eta: "अंदाजित वेळ: 2 तास",
        sanitation_dept: "स्वच्छता विभाग",
        medium: "मध्यम",
        assigned_officer: "नियुक्त अधिकारी",
        officer_name: "अधिकारी राजेश कुमार",
        
        // Information Hub
        verified: "✓ प्रमाणित",
        fake_news: "⚠ बनावट बातमी आढळली",
        info_title1: "मुख्य घाट क्षमता अपडेट",
        info_desc1: "सध्याची क्षमता 65%. सामान्य प्रवेश परवानगी.",
        info_title2: "हवामान सल्ला",
        info_desc2: "स्पष्ट आकाशाची अपेक्षा. पुढील 24 तासांत पावसाचा अंदाज नाही.",
        info_title3: "खोटे बंद चेतावणी",
        info_desc3: 'अहवाल: "सर्व घाट जास्त गर्दीमुळे बंद" - हे खोटे आहे',
        info_title4: "वैद्यकीय शिबिर स्थान",
        info_desc4: "झोन ए, सी, आणि ई मध्ये 24/7 वैद्यकीय शिबिरे कार्यरत.",
        
        // Admin Panel
        admin_panel: "प्रशासन पॅनेल",
        dashboard: "डॅशबोर्ड",
        total_grievances: "एकूण तक्रारी",
        active_cases: "सक्रिय प्रकरणे",
        emergency_cases: "आणीबाणी प्रकरणे",
        avg_resolution: "सरासरी निराकरण वेळ",
        department_control: "विभाग नियंत्रण",
        police: "पोलिस",
        new_cases: "नवीन",
        in_progress: "प्रगती",
        delayed: "विलंबित",
        crowd_mgmt: "गर्दी व्यवस्थापन",
        ai_routing: "एआई रूटिंग देखरेख",
        ai_department: "एआई विभाग",
        confidence: "आत्मविश्वास",
        action: "क्रिया",
        medical_dept: "वैद्यकीय विभाग",
        police_dept: "पोलिस विभाग",
        override: "अधिलिखित",
        approve: "मंजुरी",
        new_grievances: "नवीन तक्रारी",
        clear_all: "सर्व साफ करा"
    }
};

class LanguageManager {
    constructor() {
        this.currentLang = 'en';
        this.selectors = [];
        this.init();
    }
    
    init() {
        this.initializeSelectors();
        
        // Load saved language
        const savedLang = localStorage.getItem('kumbh_lang') || 'en';
        this.setLanguage(savedLang);
        
        // Listen for language changes on all selectors
        this.selectors.forEach(select => {
            select.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        });
    }
    
    initializeSelectors() {
        // Find all language selectors
        const selectorIds = [
            'languageSelect',
            'languageSelectAuth',
            'languageSelectPilgrim',
            'languageSelectAdmin'
        ];
        
        selectorIds.forEach(id => {
            const select = document.getElementById(id);
            if (select) {
                this.selectors.push(select);
            }
        });
    }
    
    setLanguage(lang) {
        if (!translations[lang]) return;
        
        this.currentLang = lang;
        localStorage.setItem('kumbh_lang', lang);
        
        // Update all selectors
        this.selectors.forEach(select => {
            if (select) select.value = lang;
        });
        
        // Update all translatable elements
        this.updateAllText();
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    updateAllText() {
        // Update elements with data-translate attribute
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[this.currentLang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[this.currentLang][key];
                } else {
                    element.textContent = translations[this.currentLang][key];
                }
            }
        });
    }
    
    getTranslation(key) {
        return translations[this.currentLang][key] || key;
    }
}

// Initialize language manager
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
});