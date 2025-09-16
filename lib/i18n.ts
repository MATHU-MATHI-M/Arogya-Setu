"use client"

export type Language = "en" | "hi" | "bn" | "te" | "kn" | "ml" | "ta"

export interface LanguageOption {
  code: Language
  name: string
  nativeName: string
}

export const languages: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
]

export const translations = {
  en: {
    // Common
    welcome: "Welcome",
    login: "Login",
    signup: "Sign Up",
    logout: "Logout",
    dashboard: "Dashboard",
    consultation: "Consultation",
    records: "Patient Records",
    settings: "Settings",
    analytics: "Analytics",
    knowledge: "Knowledge Base",

    // Dashboard
    welcomeBack: "Welcome back",
    healthCenterOverview: "Here's your healthcare center overview for today",
    startNewConsultation: "Start New Consultation",
    beginAIAssisted: "Begin AI-assisted patient diagnosis",
    viewPatientRecords: "View Patient Records",
    accessPatientHistory: "Access patient history and data",
    syncData: "Sync Data",
    updateOfflineDatabase: "Update offline database",
    patientsToday: "Patients Today",
    consultations: "Consultations",
    referrals: "Referrals",
    successRate: "Success Rate",
    commonDiagnoses: "Common Diagnoses This Week",
    mostFrequentConditions: "Most frequent conditions diagnosed",
    recentAlerts: "Recent Alerts",
    systemNotifications: "System notifications and updates",

    // Authentication
    welcomeBackTitle: "Welcome Back",
    signInAccess: "Sign in to access your medical diagnosis platform",
    createAccount: "Create Account",
    joinHealthcareRevolution: "Join the healthcare revolution",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
    role: "Role",
    healthCenter: "Health Center",
    confirmPassword: "Confirm Password",
    forgotPassword: "Forgot your password?",
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: "Already have an account?",
    signInHere: "Sign in here",

    // Medical Terms
    hypertension: "Hypertension",
    diabetesType2: "Diabetes Type 2",
    respiratoryInfection: "Respiratory Infection",
    gastritis: "Gastritis",
    migraine: "Migraine",

    // Voice
    voiceNarration: "Voice Narration",
    listenToContent: "Listen to page content",
  },
  hi: {
    // Common
    welcome: "स्वागत",
    login: "लॉगिन",
    signup: "साइन अप",
    logout: "लॉगआउट",
    dashboard: "डैशबोर्ड",
    consultation: "परामर्श",
    records: "रोगी रिकॉर्ड",
    settings: "सेटिंग्स",
    analytics: "विश्लेषण",
    knowledge: "ज्ञान आधार",

    // Dashboard
    welcomeBack: "वापसी पर स्वागत",
    healthCenterOverview: "यहाँ आज के लिए आपके स्वास्थ्य केंद्र का अवलोकन है",
    startNewConsultation: "नया परामर्श शुरू करें",
    beginAIAssisted: "AI-सहायक रोगी निदान शुरू करें",
    viewPatientRecords: "रोगी रिकॉर्ड देखें",
    accessPatientHistory: "रोगी इतिहास और डेटा तक पहुंचें",
    syncData: "डेटा सिंक करें",
    updateOfflineDatabase: "ऑफलाइन डेटाबेस अपडेट करें",
    patientsToday: "आज के रोगी",
    consultations: "परामर्श",
    referrals: "रेफरल",
    successRate: "सफलता दर",
    commonDiagnoses: "इस सप्ताह के सामान्य निदान",
    mostFrequentConditions: "सबसे आम निदान की गई स्थितियां",
    recentAlerts: "हाल की अलर्ट",
    systemNotifications: "सिस्टम सूचनाएं और अपडेट",

    // Authentication
    welcomeBackTitle: "वापसी पर स्वागत",
    signInAccess: "अपने चिकित्सा निदान प्लेटफॉर्म तक पहुंचने के लिए साइन इन करें",
    createAccount: "खाता बनाएं",
    joinHealthcareRevolution: "स्वास्थ्य सेवा क्रांति में शामिल हों",
    email: "ईमेल",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
    role: "भूमिका",
    healthCenter: "स्वास्थ्य केंद्र",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    forgotPassword: "अपना पासवर्ड भूल गए?",
    dontHaveAccount: "खाता नहीं है?",
    alreadyHaveAccount: "पहले से खाता है?",
    signInHere: "यहाँ साइन इन करें",

    // Medical Terms
    hypertension: "उच्च रक्तचाप",
    diabetesType2: "मधुमेह टाइप 2",
    respiratoryInfection: "श्वसन संक्रमण",
    gastritis: "गैस्ट्राइटिस",
    migraine: "माइग्रेन",

    // Voice
    voiceNarration: "आवाज़ वर्णन",
    listenToContent: "पृष्ठ सामग्री सुनें",
  },
  bn: {
    // Common
    welcome: "স্বাগতম",
    login: "লগইন",
    signup: "সাইন আপ",
    logout: "লগআউট",
    dashboard: "ড্যাশবোর্ড",
    consultation: "পরামর্শ",
    records: "রোগীর রেকর্ড",
    settings: "সেটিংস",
    analytics: "বিশ্লেষণ",
    knowledge: "জ্ঞান ভিত্তি",

    // Dashboard
    welcomeBack: "ফিরে আসার জন্য স্বাগতম",
    healthCenterOverview: "আজকের জন্য আপনার স্বাস্থ্য কেন্দ্রের সংক্ষিপ্ত বিবরণ এখানে",
    startNewConsultation: "নতুন পরামর্শ শুরু করুন",
    beginAIAssisted: "AI-সহায়ক রোগী নির্ণয় শুরু করুন",
    viewPatientRecords: "রোগীর রেকর্ড দেখুন",
    accessPatientHistory: "রোগীর ইতিহাস এবং ডেটা অ্যাক্সেস করুন",
    syncData: "ডেটা সিঙ্ক করুন",
    updateOfflineDatabase: "অফলাইন ডেটাবেস আপডেট করুন",
    patientsToday: "আজকের রোগী",
    consultations: "পরামর্শ",
    referrals: "রেফারেল",
    successRate: "সাফল্যের হার",
    commonDiagnoses: "এই সপ্তাহের সাধারণ নির্ণয়",
    mostFrequentConditions: "সবচেয়ে ঘন ঘন নির্ণয় করা অবস্থা",
    recentAlerts: "সাম্প্রতিক সতর্কতা",
    systemNotifications: "সিস্টেম বিজ্ঞপ্তি এবং আপডেট",

    // Authentication
    welcomeBackTitle: "ফিরে আসার জন্য স্বাগতম",
    signInAccess: "আপনার চিকিৎসা নির্ণয় প্ল্যাটফর্মে অ্যাক্সেস করতে সাইন ইন করুন",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",
    joinHealthcareRevolution: "স্বাস্থ্যসেবা বিপ্লবে যোগ দিন",
    email: "ইমেইল",
    password: "পাসওয়ার্ড",
    fullName: "পূর্ণ নাম",
    role: "ভূমিকা",
    healthCenter: "স্বাস্থ্য কেন্দ্র",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    forgotPassword: "আপনার পাসওয়ার্ড ভুলে গেছেন?",
    dontHaveAccount: "অ্যাকাউন্ট নেই?",
    alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    signInHere: "এখানে সাইন ইন করুন",

    // Medical Terms
    hypertension: "উচ্চ রক্তচাপ",
    diabetesType2: "ডায়াবেটিস টাইপ ২",
    respiratoryInfection: "শ্বাসযন্ত্রের সংক্রমণ",
    gastritis: "গ্যাস্ট্রাইটিস",
    migraine: "মাইগ্রেন",

    // Voice
    voiceNarration: "কণ্ঠস্বর বর্ণনা",
    listenToContent: "পৃষ্ঠার বিষয়বস্তু শুনুন",
  },
  te: {
    // Common
    welcome: "స్వాగతం",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    logout: "లాగ్అవుట్",
    dashboard: "డ్యాష్‌బోర్డ్",
    consultation: "సంప్రదింపులు",
    records: "రోగి రికార్డులు",
    settings: "సెట్టింగ్‌లు",
    analytics: "విశ్లేషణలు",
    knowledge: "జ్ఞాన స్థావరం",

    // Dashboard
    welcomeBack: "తిరిగి స్వాగతం",
    healthCenterOverview: "ఈరోజు మీ ఆరోగ్య కేంద్రం యొక్క అవలోకనం ఇక్కడ ఉంది",
    startNewConsultation: "కొత్త సంప్రదింపు ప్రారంభించండి",
    beginAIAssisted: "AI-సహాయక రోగి నిర్ధారణ ప్రారంభించండి",
    viewPatientRecords: "రోగి రికార్డులను చూడండి",
    accessPatientHistory: "రోగి చరిత్ర మరియు డేటాను యాక్సెస్ చేయండి",
    syncData: "డేటాను సింక్ చేయండి",
    updateOfflineDatabase: "ఆఫ్‌లైన్ డేటాబేస్‌ను అప్‌డేట్ చేయండి",
    patientsToday: "ఈరోజు రోగులు",
    consultations: "సంప్రదింపులు",
    referrals: "రెఫరల్స్",
    successRate: "విజయ రేటు",
    commonDiagnoses: "ఈ వారం సాధారణ నిర్ధారణలు",
    mostFrequentConditions: "అత్యధికంగా నిర్ధారించబడిన పరిస్థితులు",
    recentAlerts: "ఇటీవలి హెచ్చరికలు",
    systemNotifications: "సిస్టమ్ నోటిఫికేషన్లు మరియు అప్‌డేట్‌లు",

    // Authentication
    welcomeBackTitle: "తిరిగి స్వాగతం",
    signInAccess: "మీ వైద్య నిర్ధారణ ప్లాట్‌ఫారమ్‌ను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి",
    createAccount: "ఖాతా సృష్టించండి",
    joinHealthcareRevolution: "ఆరోగ్య సంరక్షణ విప్లవంలో చేరండి",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    fullName: "పూర్తి పేరు",
    role: "పాత్ర",
    healthCenter: "ఆరోగ్య కేంద్రం",
    confirmPassword: "పాస్‌వర్డ్‌ను నిర్ధారించండి",
    forgotPassword: "మీ పాస్‌వర్డ్ మర్చిపోయారా?",
    dontHaveAccount: "ఖాతా లేదా?",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?",
    signInHere: "ఇక్కడ సైన్ ఇన్ చేయండి",

    // Medical Terms
    hypertension: "అధిక రక్తపోటు",
    diabetesType2: "మధుమేహం టైప్ 2",
    respiratoryInfection: "శ్వాసకోశ సంక్రమణ",
    gastritis: "గ్యాస్ట్రైటిస్",
    migraine: "మైగ్రేన్",

    // Voice
    voiceNarration: "వాయిస్ వర్ణన",
    listenToContent: "పేజీ కంటెంట్‌ను వినండి",
  },
  kn: {
    // Common
    welcome: "ಸ್ವಾಗತ",
    login: "ಲಾಗಿನ್",
    signup: "ಸೈನ್ ಅಪ್",
    logout: "ಲಾಗ್ಔಟ್",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    consultation: "ಸಮಾಲೋಚನೆ",
    records: "ರೋಗಿ ದಾಖಲೆಗಳು",
    settings: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು",
    analytics: "ವಿಶ್ಲೇಷಣೆ",
    knowledge: "ಜ್ಞಾನ ಆಧಾರ",

    // Dashboard
    welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ",
    healthCenterOverview: "ಇಂದಿನ ನಿಮ್ಮ ಆರೋಗ್ಯ ಕೇಂದ್ರದ ಅವಲೋಕನ ಇಲ್ಲಿದೆ",
    startNewConsultation: "ಹೊಸ ಸಮಾಲೋಚನೆ ಪ್ರಾರಂಭಿಸಿ",
    beginAIAssisted: "AI-ಸಹಾಯಕ ರೋಗಿ ರೋಗನಿರ್ಣಯ ಪ್ರಾರಂಭಿಸಿ",
    viewPatientRecords: "ರೋಗಿ ದಾಖಲೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    accessPatientHistory: "ರೋಗಿ ಇತಿಹಾಸ ಮತ್ತು ಡೇಟಾವನ್ನು ಪ್ರವೇಶಿಸಿ",
    syncData: "ಡೇಟಾವನ್ನು ಸಿಂಕ್ ಮಾಡಿ",
    updateOfflineDatabase: "ಆಫ್‌ಲೈನ್ ಡೇಟಾಬೇಸ್ ಅನ್ನು ಅಪ್‌ಡೇಟ್ ಮಾಡಿ",
    patientsToday: "ಇಂದಿನ ರೋಗಿಗಳು",
    consultations: "ಸಮಾಲೋಚನೆಗಳು",
    referrals: "ರೆಫರಲ್‌ಗಳು",
    successRate: "ಯಶಸ್ಸಿನ ದರ",
    commonDiagnoses: "ಈ ವಾರದ ಸಾಮಾನ್ಯ ರೋಗನಿರ್ಣಯಗಳು",
    mostFrequentConditions: "ಹೆಚ್ಚಾಗಿ ರೋಗನಿರ್ಣಯ ಮಾಡಿದ ಪರಿಸ್ಥಿತಿಗಳು",
    recentAlerts: "ಇತ್ತೀಚಿನ ಎಚ್ಚರಿಕೆಗಳು",
    systemNotifications: "ಸಿಸ್ಟಂ ಅಧಿಸೂಚನೆಗಳು ಮತ್ತು ಅಪ್‌ಡೇಟ್‌ಗಳು",

    // Authentication
    welcomeBackTitle: "ಮರಳಿ ಸ್ವಾಗತ",
    signInAccess: "ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್ ಅನ್ನು ಪ್ರವೇಶಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
    createAccount: "ಖಾತೆ ರಚಿಸಿ",
    joinHealthcareRevolution: "ಆರೋಗ್ಯ ಸೇವಾ ಕ್ರಾಂತಿಯಲ್ಲಿ ಸೇರಿ",
    email: "ಇಮೇಲ್",
    password: "ಪಾಸ್‌ವರ್ಡ್",
    fullName: "ಪೂರ್ಣ ಹೆಸರು",
    role: "ಪಾತ್ರ",
    healthCenter: "ಆರೋಗ್ಯ ಕೇಂದ್ರ",
    confirmPassword: "ಪಾಸ್‌ವರ್ಡ್ ದೃಢೀಕರಿಸಿ",
    forgotPassword: "ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?",
    dontHaveAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
    alreadyHaveAccount: "ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?",
    signInHere: "ಇಲ್ಲಿ ಸೈನ್ ಇನ್ ಮಾಡಿ",

    // Medical Terms
    hypertension: "ಅಧಿಕ ರಕ್ತದೊತ್ತಡ",
    diabetesType2: "ಮಧುಮೇಹ ಪ್ರಕಾರ 2",
    respiratoryInfection: "ಉಸಿರಾಟದ ಸೋಂಕು",
    gastritis: "ಗ್ಯಾಸ್ಟ್ರೈಟಿಸ್",
    migraine: "ಮೈಗ್ರೇನ್",

    // Voice
    voiceNarration: "ಧ್ವನಿ ವರ್ಣನೆ",
    listenToContent: "ಪುಟದ ವಿಷಯವನ್ನು ಕೇಳಿ",
  },
  ml: {
    // Common
    welcome: "സ്വാഗതം",
    login: "ലോഗിൻ",
    signup: "സൈൻ അപ്പ്",
    logout: "ലോഗൗട്ട്",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    consultation: "കൺസൾട്ടേഷൻ",
    records: "രോഗി രേഖകൾ",
    settings: "ക്രമീകരണങ്ങൾ",
    analytics: "വിശകലനം",
    knowledge: "അറിവിന്റെ അടിസ്ഥാനം",

    // Dashboard
    welcomeBack: "തിരിച്ചുവരവിൽ സ്വാഗതം",
    healthCenterOverview: "ഇന്നത്തെ നിങ്ങളുടെ ആരോഗ്യ കേന്ദ്രത്തിന്റെ അവലോകനം ഇതാ",
    startNewConsultation: "പുതിയ കൺസൾട്ടേഷൻ ആരംഭിക്കുക",
    beginAIAssisted: "AI-സഹായിത രോഗി രോഗനിർണയം ആരംഭിക്കുക",
    viewPatientRecords: "രോഗി രേഖകൾ കാണുക",
    accessPatientHistory: "രോഗി ചരിത്രവും ഡാറ്റയും ആക്സസ് ചെയ്യുക",
    syncData: "ഡാറ്റ സിങ്ക് ചെയ്യുക",
    updateOfflineDatabase: "ഓഫ്‌ലൈൻ ഡാറ്റാബേസ് അപ്ഡേറ്റ് ചെയ്യുക",
    patientsToday: "ഇന്നത്തെ രോഗികൾ",
    consultations: "കൺസൾട്ടേഷനുകൾ",
    referrals: "റഫറലുകൾ",
    successRate: "വിജയ നിരക്ക്",
    commonDiagnoses: "ഈ ആഴ്ചയിലെ സാധാരണ രോഗനിർണയങ്ങൾ",
    mostFrequentConditions: "ഏറ്റവും കൂടുതൽ രോഗനിർണയം നടത്തിയ അവസ്ഥകൾ",
    recentAlerts: "സമീപകാല മുന്നറിയിപ്പുകൾ",
    systemNotifications: "സിസ്റ്റം അറിയിപ്പുകളും അപ്ഡേറ്റുകളും",

    // Authentication
    welcomeBackTitle: "തിരിച്ചുവരവിൽ സ്വാഗതം",
    signInAccess: "നിങ്ങളുടെ മെഡിക്കൽ ഡയഗ്നോസിസ് പ്ലാറ്റ്‌ഫോം ആക്സസ് ചെയ്യാൻ സൈൻ ഇൻ ചെയ്യുക",
    createAccount: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    joinHealthcareRevolution: "ആരോഗ്യ സംരക്ഷണ വിപ്ലവത്തിൽ ചേരുക",
    email: "ഇമെയിൽ",
    password: "പാസ്‌വേഡ്",
    fullName: "പൂർണ്ണ നാമം",
    role: "പങ്ക്",
    healthCenter: "ആരോഗ്യ കേന്ദ്രം",
    confirmPassword: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
    forgotPassword: "നിങ്ങളുടെ പാസ്‌വേഡ് മറന്നോ?",
    dontHaveAccount: "അക്കൗണ്ട് ഇല്ലേ?",
    alreadyHaveAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ?",
    signInHere: "ഇവിടെ സൈൻ ഇൻ ചെയ്യുക",

    // Medical Terms
    hypertension: "ഉയർന്ന രക്തസമ്മർദ്ദം",
    diabetesType2: "പ്രമേഹം ടൈപ്പ് 2",
    respiratoryInfection: "ശ്വാസകോശ അണുബാധ",
    gastritis: "ഗ്യാസ്ട്രൈറ്റിസ്",
    migraine: "മൈഗ്രേൻ",

    // Voice
    voiceNarration: "ശബ്ദ വിവരണം",
    listenToContent: "പേജ് ഉള്ളടക്കം കേൾക്കുക",
  },
  ta: {
    // Common
    welcome: "வரவேற்கிறோம்",
    login: "உள்நுழைவு",
    signup: "பதிவு செய்யுங்கள்",
    logout: "வெளியேறு",
    dashboard: "டாஷ்போர்டு",
    consultation: "ஆலோசனை",
    records: "நோயாளி பதிவுகள்",
    settings: "அமைப்புகள்",
    analytics: "பகுப்பாய்வு",
    knowledge: "அறிவு தளம்",

    // Dashboard
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    healthCenterOverview: "இன்றைய உங்கள் சுகாதார மையத்தின் கண்ணோட்டம் இங்கே",
    startNewConsultation: "புதிய ஆலோசனையைத் தொடங்குங்கள்",
    beginAIAssisted: "AI-உதவி நோயாளி நோய் கண்டறிதலைத் தொடங்குங்கள்",
    viewPatientRecords: "நோயாளி பதிவுகளைப் பார்க்கவும்",
    accessPatientHistory: "நோயாளி வரலாறு மற்றும் தரவை அணுகவும்",
    syncData: "தரவை ஒத்திசைக்கவும்",
    updateOfflineDatabase: "ஆஃப்லைன் தரவுத்தளத்தை புதுப்பிக்கவும்",
    patientsToday: "இன்றைய நோயாளிகள்",
    consultations: "ஆலோசனைகள்",
    referrals: "பரிந்துரைகள்",
    successRate: "வெற்றி விகிதம்",
    commonDiagnoses: "இந்த வாரத்தின் பொதுவான நோய் கண்டறிதல்கள்",
    mostFrequentConditions: "அடிக்கடி கண்டறியப்படும் நிலைமைகள்",
    recentAlerts: "சமீபத்திய எச்சரிக்கைகள்",
    systemNotifications: "கணினி அறிவிப்புகள் மற்றும் புதுப்பிப்புகள்",

    // Authentication
    welcomeBackTitle: "மீண்டும் வரவேற்கிறோம்",
    signInAccess: "உங்கள் மருத்துவ நோய் கண்டறிதல் தளத்தை அணுக உள்நுழையவும்",
    createAccount: "கணக்கை உருவாக்கவும்",
    joinHealthcareRevolution: "சுகாதார புரட்சியில் சேரவும்",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    fullName: "முழு பெயர்",
    role: "பங்கு",
    healthCenter: "சுகாதார மையம்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    forgotPassword: "உங்கள் கடவுச்சொல்லை மறந்துவிட்டீர்களா?",
    dontHaveAccount: "கணக்கு இல்லையா?",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?",
    signInHere: "இங்கே உள்நுழையவும்",

    // Medical Terms
    hypertension: "உயர் இரத்த அழுத்தம்",
    diabetesType2: "நீரிழிவு வகை 2",
    respiratoryInfection: "சுவாச தொற்று",
    gastritis: "இரைப்பை அழற்சி",
    migraine: "ஒற்றைத் தலைவலி",

    // Voice
    voiceNarration: "குரல் விவரணை",
    listenToContent: "பக்க உள்ளடக்கத்தைக் கேளுங்கள்",
  },
}

export class I18nService {
  private currentLanguage: Language = "en"
  private listeners: ((lang: Language) => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("arogya_language")
      if (saved && this.isValidLanguage(saved)) {
        this.currentLanguage = saved as Language
      }
    }
  }

  private isValidLanguage(lang: string): boolean {
    return languages.some((l) => l.code === lang)
  }

  getCurrentLanguage(): Language {
    return this.currentLanguage
  }

  setLanguage(lang: Language) {
    this.currentLanguage = lang
    if (typeof window !== "undefined") {
      localStorage.setItem("arogya_language", lang)
    }
    this.listeners.forEach((listener) => listener(lang))
  }

  subscribe(listener: (lang: Language) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  t(key: string): string {
    const translation = translations[this.currentLanguage]
    return (translation as any)[key] || translations.en[key as keyof typeof translations.en] || key
  }

  // Text-to-speech functionality
  speak(text: string) {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)

      // Set language-specific voice settings
      const langMap: Record<Language, string> = {
        en: "en-US",
        hi: "hi-IN",
        bn: "bn-IN",
        te: "te-IN",
        kn: "kn-IN",
        ml: "ml-IN",
        ta: "ta-IN",
      }

      utterance.lang = langMap[this.currentLanguage] || "en-US"
      utterance.rate = 0.8
      utterance.pitch = 1

      speechSynthesis.speak(utterance)
    }
  }

  stopSpeaking() {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel()
    }
  }
}

export const i18n = new I18nService()
