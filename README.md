# 🦾 Accessible Campus Services

A comprehensive web application designed to provide essential services for physically challenged individuals on campus. This project combines modern web technologies with AI-powered assistance to create an inclusive and accessible digital platform.

**🔗 Repository:** [https://github.com/Akhileshvankayala/physically-challenged-campus-services](https://github.com/Akhileshvankayala/physically-challenged-campus-services)

## 🌟 Features

### 🤖 AI-Powered Assistant
- **Smart Chat Bot**: Interactive AI assistant powered by Google's Gemini API
- **Voice Recognition**: Speech-to-text functionality for hands-free interaction
- **Image Analysis**: Capture and analyze images for equipment maintenance and medical assistance
- **Text-to-Speech**: Audio responses for visually impaired users

### 🚌 Mobility Services
- **Buggy Booking**: Easy booking system for campus transportation
- **Location-Based Routing**: Pre-configured routes between campus blocks (A-H)
- **Distance Calculation**: Automatic distance calculation between pickup and drop-off points
- **Real-time Notifications**: Email notifications for service providers

### 🍽️ Canteen Services
- **Online Ordering**: Browse menu and place food orders
- **Location-Based Delivery**: Order delivery to specific campus locations
- **Order Management**: Detailed order tracking and billing

### 📋 Task Management
- **Task Submission**: Submit maintenance and assistance requests
- **Priority Levels**: Categorize tasks by urgency
- **Email Notifications**: Automatic notifications to service teams

### 🏥 Health & Safety
- **Equipment Monitoring**: Report broken accessibility equipment
- **Medical Assistance**: Medication identification and symptom analysis
- **Emergency Services**: Quick access to campus emergency services

## 🛠️ Technology Stack

### Frontend
- **React 18.3+** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Google Generative AI** - Gemini API integration
- **OpenCV** - Computer vision for image capture
- **SpeechRecognition** - Voice input processing
- **pyttsx3** - Text-to-speech synthesis

### Database & Authentication
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Relational database

### Communication
- **SMTP** - Email notifications
- **Gmail API** - Email service integration

## 🚀 Getting Started

### ⚠️ IMPORTANT SECURITY NOTICE
**Before running this application, you MUST configure your environment variables!**

For security reasons, sensitive credentials (email passwords, API keys, database URLs) have been removed from this public repository. You need to set up your own credentials to run the application.

**🚨 CRITICAL:** GitHub has detected exposed API keys in previous commits. If you fork this repository, make sure to:
- Never commit your actual API keys to Git
- Always use environment variables for sensitive data
- Regularly rotate your API keys and passwords
- Check GitHub's "Security" tab for any secret scanning alerts

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- Git
- Gmail account with App Password enabled
- Google Gemini AI API key
- Supabase account and project

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/Akhileshvankayala/physically-challenged-campus-services.git
cd physically-challenged-campus-services

# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Install Python dependencies
pip install flask flask-cors pillow opencv-python pyttsx3 google-generativeai speechrecognition python-dotenv

# Copy environment template and configure your credentials
copy .env.example .env

# Edit .env file with your actual credentials (see Environment Variables section below)

# Run Flask server
python app.py
```

### Environment Variables Setup
**CRITICAL:** Copy `.env.example` to `.env` and replace ALL placeholder values with your actual credentials:

```env
# Supabase Configuration (Get from your Supabase project dashboard)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_supabase_anon_key

# Google Gemini AI API Key (Get from Google AI Studio)
VITE_API_KEY=your_actual_gemini_api_key

# Email Configuration (Gmail App Password required)
SENDER_EMAIL=your_actual_gmail@gmail.com
SENDER_PASSWORD=your_gmail_app_password_16_chars
RECIPIENT_EMAIL=service_recipient@gmail.com
```

### 🔐 How to Get Required Credentials

#### 1. Gmail App Password
1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings > Security > App Passwords
3. Generate a new app password for "Mail"
4. Use this 16-character password (not your regular Gmail password)

#### 2. Google Gemini AI API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to your `.env` file
4. **NEVER** share or commit this key to version control

#### 3. Supabase Credentials
1. Create a new project at [Supabase](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon/public key

### ⚠️ Security Warnings
- **NEVER** commit your `.env` file to Git
- **NEVER** share your actual API keys or passwords
- Use different credentials for development and production
- Regularly rotate your API keys and passwords
- The `.env` file is already in `.gitignore` for your protection
- **Check GitHub Security tab** regularly for secret scanning alerts
- If you accidentally commit secrets, immediately rotate them and contact the service provider

### 🔍 GitHub Secret Scanning
This repository may trigger GitHub's secret scanning if API keys are detected. This is a security feature that helps prevent credential leaks. If you see alerts:
1. Immediately rotate the exposed credentials
2. Update your `.env` file with new credentials
3. Never ignore these security warnings

## 📁 Project Structure
```
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── contexts/           # React contexts
│   └── lib/               # Utility libraries
├── supabase/
│   └── migrations/         # Database migrations
├── app.py                 # Flask backend server
├── package.json           # Node.js dependencies
└── README.md             # Project documentation
```

## 🎯 Key Components

### Frontend Pages
- **Home**: Landing page with service overview
- **AI Bot**: Interactive assistant with chat, voice, and image features
- **Buggy Service**: Transportation booking system
- **Canteen Service**: Food ordering platform
- **Task Desk**: Maintenance request system
- **Mobility Service**: Accessibility equipment requests

### Backend Endpoints
- `/chat` - AI chat functionality
- `/speech` - Voice recognition
- `/capture` - Image analysis
- `/place_order` - Canteen orders
- `/book_buggy` - Transportation booking
- `/submit_task` - Task submissions
- `/request_service` - Mobility services

## 🏢 Campus Integration

The system includes predefined campus blocks (A-H) with calculated distances for optimal routing:
- Block-to-block distance mapping
- Automated route optimization
- Location-based service delivery

## 🔧 Build & Deployment

```bash
# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy

# Preview production build
npm run preview
```

## 🐛 Troubleshooting

### Common Issues

#### "No environment variables found" Error
- Ensure you've copied `.env.example` to `.env`
- Verify all required variables are set in `.env`
- Check that `.env` is in the project root directory

#### Email Service Not Working
- Verify Gmail App Password is correctly set (16 characters, no spaces)
- Ensure 2FA is enabled on your Gmail account
- Check SENDER_EMAIL and RECIPIENT_EMAIL are valid

#### AI Chat Not Responding
- Verify your Gemini API key is valid and active
- Check API quota and billing in Google AI Studio
- Ensure the API key has proper permissions

#### Camera/Image Capture Issues
- Grant camera permissions to your browser
- Check if camera is being used by another application
- Ensure OpenCV is properly installed: `pip install opencv-python`

### Getting Help
If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are correctly set
3. Ensure all Python dependencies are installed
4. Check the Flask server logs for backend errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Akhilesh Vankayala**
- GitHub: [@Akhileshvankayala](https://github.com/Akhileshvankayala)
- Email: akhileshvankayala158@gmail.com

## 📜 License

This project is part of the InnoQuest initiative for creating accessible campus solutions.

## 🎉 Acknowledgments

- Google Gemini AI for intelligent assistance
- Supabase for backend infrastructure
- React community for excellent documentation
- InnoQuest program for supporting accessibility initiatives

---

**Built with ❤️ for accessibility and inclusion**