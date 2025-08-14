# InvestWise - AI-Powered Investment Planning Platform

A modern, responsive web application that helps users create personalized investment plans using artificial intelligence. Built with React, TypeScript, and Google's Gemini AI.

## 🚀 Features

### Core Functionality
- **AI-Powered Investment Planning** - Get personalized investment recommendations using Google's Gemini AI
- **Risk Assessment** - Interactive questionnaire to determine your investment risk tolerance
- **Portfolio Allocation** - Smart asset allocation across equity, bonds, gold, crypto, and cash
- **Financial Dashboard** - Track income, expenses, and calculate investment potential
- **Historical Simulation** - See how your recommended portfolio would have performed historically
- **Plan Comparison** - Compare different investment strategies side-by-side
- **PDF Report Generation** - Download comprehensive investment plans

### Technical Features
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Data Persistence** - Local storage for saving user preferences and data
- **Error Handling** - Comprehensive error boundaries and fallback states
- **Performance Monitoring** - Built-in analytics and performance tracking
- **Form Validation** - Robust input validation for all user inputs
- **Modern UI/UX** - Beautiful animations and smooth interactions

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Language**: JavaScript/TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2
- **AI Integration**: Google Generative AI (Gemini)
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd planer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit .env and add your Gemini API key
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Required: Gemini AI API Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Optional: Application Configuration
VITE_APP_NAME=InvestWise
VITE_APP_VERSION=1.0.0

# Optional: Analytics and Monitoring
VITE_ANALYTICS_ID=your_analytics_id_here
```

### Getting a Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env` file

## 📁 Project Structure

```
src/
├── components/
│   ├── animations/          # Animation components
│   ├── common/             # Reusable UI components
│   ├── dashboard/          # Dashboard-specific components
│   └── layout/             # Layout components (Navbar, Footer)
├── context/                # React Context providers
├── pages/                  # Page components
├── services/               # API services and external integrations
├── utils/                  # Utility functions
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles
```

## 🎯 Key Components

### Investment Context
- Manages global state for financial data and investment plans
- Handles data persistence with localStorage
- Provides methods for updating user data

### Risk Assessment
- Interactive questionnaire with 8 key questions
- Calculates risk score and profile
- Provides personalized investment recommendations

### AI Integration
- Uses Google's Gemini AI for investment suggestions
- Handles API errors gracefully with fallback data
- Formats responses for easy consumption

### Data Persistence
- Automatic saving of user data to localStorage
- Handles storage errors gracefully
- Provides data export/import capabilities

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔒 Security Features

- Environment variable configuration for API keys
- Input validation and sanitization
- Error boundaries for graceful error handling
- Secure API key management

## 📊 Performance Optimizations

- Lazy loading of components
- Optimized bundle size with Vite
- Efficient state management
- Performance monitoring and analytics

## 🎨 UI/UX Features

- Responsive design for all screen sizes
- Smooth animations with Framer Motion
- Modern glass-morphism design
- Accessible color schemes and typography
- Interactive charts and visualizations

## 🔧 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by modifying:
- `src/index.css` - Global styles and custom components
- `tailwind.config.js` - Tailwind configuration
- Component-specific CSS classes

### Adding New Features
1. Create new components in the appropriate directory
2. Add routes in `App.jsx`
3. Update the navigation in `Navbar.jsx`
4. Add any new context providers if needed

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Ensure your Gemini API key is correctly set in `.env`
   - Check that the API key has the necessary permissions
   - Verify the key is not expired

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for TypeScript errors: `npm run lint`

3. **Performance Issues**
   - Check browser console for errors
   - Verify all dependencies are up to date
   - Monitor network requests in browser dev tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI capabilities
- React and Vite teams for the excellent development tools
- Tailwind CSS for the utility-first CSS framework
- Chart.js for the beautiful charting library

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the troubleshooting section above
- Review the documentation

---

**Note**: This application is for educational and demonstration purposes. Always consult with a qualified financial advisor before making investment decisions.




