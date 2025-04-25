# InvestWise - AI-Powered Investment Planning Platform

InvestWise is a sophisticated investment planning platform that leverages artificial intelligence to provide personalized investment strategies. Built with React and powered by Google's Gemini AI, it offers a comprehensive suite of tools for making informed investment decisions.

## Features

- **AI-Powered Investment Recommendations**: Get personalized investment suggestions based on your risk profile and financial goals
- **Risk Assessment**: Complete a detailed questionnaire to determine your investment risk tolerance
- **Dynamic Asset Allocation**: Visual representation of recommended portfolio distribution
- **Historical Performance Simulation**: See how your portfolio would have performed in past market conditions
- **Strategy Comparison**: Compare AI-recommended strategy with traditional investment approaches
- **Interactive Visualizations**: Beautiful charts and graphs powered by Chart.js
- **Immersive 3D Animations**: Background animations created with Three.js
- **PDF Reports**: Generate and download detailed investment plans

## Tech Stack

- React.js
- Tailwind CSS
- Chart.js
- Three.js
- Google Gemini AI
- Framer Motion
- Lucide Icons

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Gemini API key:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── context/           # React context providers
├── services/          # API and external service integrations
└── assets/           # Static assets
```

## Key Features Breakdown

### Risk Assessment
- Multi-step questionnaire
- Dynamic risk profile calculation
- Personalized risk tolerance analysis

### Investment Planning
- AI-generated investment recommendations
- Asset allocation visualization
- Monthly investment calculator
- Downloadable PDF reports

### Historical Simulation
- Past performance analysis
- Interactive performance charts
- Risk-adjusted return calculations

### Strategy Comparison
- Compare with traditional portfolios
- Performance metrics visualization
- Risk-return analysis

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powering investment recommendations
- [Three.js](https://threejs.org/) for 3D animations
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide Icons](https://lucide.dev/) for beautiful icons