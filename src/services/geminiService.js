import { GoogleGenerativeAI } from "@google/generative-ai";

<<<<<<< HEAD
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyCjf4ADeYgaFXhATleNH5BxuWHdb_owp-Y";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Chat history for context
const chatHistory = [];

// Maximum number of messages to keep in history
const MAX_HISTORY_LENGTH = 10;
=======
const API_KEY = "AIzaSyCjf4ADeYgaFXhATleNH5BxuWHdb_owp-Y"; // Replace with your actual API Key

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53

// Function to fetch investment suggestions
export const getGeminiInvestmentSuggestions = async (promptData) => {
  try {
    const prompt = `
      As a financial advisor, please provide specific investment recommendations based on the following information:
      
      Monthly Investment Amount: ₹${promptData.monthlyAmount}
      Risk Profile: ${promptData.riskProfile}
      Asset Allocation:
      - Equity: ${promptData.equityAllocation}%
      - Bonds: ${promptData.bondsAllocation}%
      - Gold: ${promptData.goldAllocation}%
      - Cryptocurrency: ${promptData.cryptoAllocation}%
      - Cash: ${promptData.cashAllocation}%
      
      I need specific investment recommendations for each asset class that are available in India. For each asset class, provide 2-4 specific investment options including names of actual funds, ETFs, or investment vehicles that match this allocation.
      
      For example:
      1. For equity allocation, suggest specific mutual funds or ETFs
      2. For bonds, suggest specific government bonds or debt funds
      3. For gold, suggest specific gold ETFs or gold funds
      4. For cryptocurrency (if allocated), suggest specific cryptocurrencies
      
      Format your response as a JSON array with this structure:
      [
        {
          "category": "Equity Mutual Funds",
          "options": ["Fund 1 - Description", "Fund 2 - Description", "Fund 3 - Description"]
        },
        {
          "category": "Debt Instruments",
          "options": ["Bond 1 - Description", "Bond 2 - Description"]
        }
      ]
      
      Only return the JSON array and nothing else.
    `;

    // Use the correct format for prompt input (as an array)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent([prompt]);

    // Correctly call text() as a function
    const text = await result.response.text();

    // Extract the JSON part from the response
    const jsonStartIndex = text.indexOf("[");
    const jsonEndIndex = text.lastIndexOf("]") + 1;
    const jsonText = text.substring(jsonStartIndex, jsonEndIndex);

    const suggestions = JSON.parse(jsonText);
    return suggestions;

  } catch (error) {
    console.error("Error generating investment suggestions:", error);
<<<<<<< HEAD
    
    // Check if it's a quota error
    if (error.message && error.message.includes('quota')) {
      console.warn('Gemini API quota exceeded, using fallback recommendations');
    }

    // Return comprehensive fallback data based on risk profile
    const fallbackSuggestions = generateFallbackSuggestions(promptData);
    return fallbackSuggestions;
  }
};

// Fallback function for when API fails
const generateFallbackSuggestions = (promptData) => {
  const { riskProfile, equityAllocation, bondsAllocation, goldAllocation, cryptoAllocation } = promptData;
  
  const suggestions = [];
  
  // Equity suggestions based on allocation
  if (equityAllocation > 0) {
    const equityOptions = [];
    
    if (riskProfile === 'Conservative') {
      equityOptions.push(
        "HDFC Top 100 Fund - Large-cap fund with stable returns",
        "SBI Bluechip Fund - Diversified large-cap exposure",
        "Axis Bluechip Fund - Quality large-cap stocks"
      );
    } else if (riskProfile === 'Moderate') {
      equityOptions.push(
        "Parag Parikh Flexi Cap Fund - Multi-cap with international exposure",
        "Axis Midcap Fund - Growth-oriented midcap fund",
        "HDFC Balanced Advantage Fund - Dynamic asset allocation",
        "Kotak Equity Opportunities Fund - Flexible investment approach"
      );
    } else { // Aggressive
      equityOptions.push(
        "Nippon India Small Cap Fund - High growth potential",
        "Axis Small Cap Fund - Aggressive small-cap exposure",
        "SBI Small Cap Fund - Long-term wealth creation",
        "Kotak Emerging Equity Fund - Mid and small-cap focus"
      );
    }
    
    suggestions.push({
      category: "Equity Mutual Funds",
      options: equityOptions
    });
  }
  
  // Debt suggestions
  if (bondsAllocation > 0) {
    suggestions.push({
      category: "Debt Instruments",
      options: [
        "HDFC Corporate Bond Fund - High-quality corporate bonds",
        "SBI Magnum Gilt Fund - Government securities for stability",
        "Axis Liquid Fund - Short-term liquidity management",
        "ICICI Prudential All Seasons Bond Fund - Duration management"
      ]
    });
  }
  
  // Gold suggestions
  if (goldAllocation > 0) {
    suggestions.push({
      category: "Gold Investment",
      options: [
        "SBI Gold ETF - Direct gold price tracking",
        "HDFC Gold Fund - Gold fund of fund",
        "Nippon India Gold Savings Fund - Systematic gold investment",
        "Digital Gold - Convenient online gold purchase"
      ]
    });
  }
  
  // Crypto suggestions (if allocated)
  if (cryptoAllocation > 0) {
    suggestions.push({
      category: "Cryptocurrency (High Risk)",
      options: [
        "Bitcoin (BTC) - Leading cryptocurrency",
        "Ethereum (ETH) - Smart contract platform",
        "Note: Crypto investments are highly volatile and speculative",
        "Consider only 5-10% allocation maximum"
      ]
    });
  }
  
  return suggestions;
};

// Keep the original dummy data as final fallback
const getBasicFallbackData = () => {
  return [
    {
      category: 'Equity Mutual Funds',
      options: [
        'Nifty 50 Index Fund - Tracks the Nifty 50 index',
        'SBI Bluechip Fund - Large cap equity fund',
        'Axis Midcap Fund - Midcap opportunities'
      ]
    },
    {
      category: 'Debt Instruments',
      options: [
        'SBI Magnum Gilt Fund - Government securities',
        'HDFC Corporate Bond Fund - High quality corporate bonds'
      ]
    },
    {
      category: 'Gold',
      options: [
        'SBI Gold ETF - Physical gold investment',
        'HDFC Gold Fund - Fund of funds investing in gold ETFs'
      ]
    },
    {
      category: 'Cash & Liquid Funds',
      options: [
        'ICICI Prudential Liquid Fund - Short-term liquid investment',
        'Axis Liquid Fund - High liquidity with low risk'
      ]
    }
  ];
};

/**
 * Get response from Gemini for chat interactions
 * @param {Array} messages - Array of message objects with role and parts
 * @param {AbortSignal} signal - Optional AbortSignal for request cancellation
 * @returns {Promise<Object>} - Response object with text and suggestions
 */
export const getGeminiResponse = async (messages, signal = null) => {
  try {
    // Update chat history with new messages
    messages.forEach(msg => {
      chatHistory.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [...msg.parts]
      });
    });

    // Keep only the most recent messages to manage context length
    while (chatHistory.length > MAX_HISTORY_LENGTH * 2) {
      chatHistory.shift();
    }

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const userMessage = messages[messages.length - 1].parts[0].text;
    const result = await chat.sendMessage(userMessage, { signal });
    const response = await result.response;
    const text = response.text();

    // Add response to history
    chatHistory.push({
      role: 'model',
      parts: [{ text }]
    });

    // Generate suggestions based on response
    const suggestions = generateSuggestions(text);
    
    return {
      text,
      suggestions
    };

  } catch (error) {
    console.error('Error in getGeminiResponse:', error);
    
    // Handle quota exceeded or other API errors
    if (error.message && (error.message.includes('quota') || error.message.includes('429'))) {
      return {
        text: "I'm currently experiencing high demand. Here's what I can tell you based on general knowledge:" +
              "\n\n• Consider index funds for long-term growth\n" +
              "• Diversify across asset classes\n" +
              "• Review your risk tolerance regularly",
        suggestions: [
          'Tell me about index funds',
          'How to diversify my portfolio?',
          'What is risk tolerance?'
        ]
      };
    }

    // Fallback for other errors
    return {
      text: "I'm having trouble connecting to the AI service. Please try again later or check your internet connection.",
      suggestions: [
        'Try again',
        'Contact support',
        'Check your connection'
      ]
    };
  }
};

// Helper function to generate relevant suggestions based on response
const generateSuggestions = (text) => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('market') || lowerText.includes('nifty') || lowerText.includes('sensex')) {
    return [
      'What should I invest in today?',
      'Show me sector performance',
      'Market outlook for next month?'
    ];
  }
  
  if (lowerText.includes('portfolio') || lowerText.includes('allocation')) {
    return [
      'How to rebalance my portfolio?',
      'Best allocation for my age?',
      'How often to review allocation?'
    ];
  }
  
  if (lowerText.includes('sip') || lowerText.includes('systematic')) {
    return [
      'Best SIP funds to invest in',
      'Lump sum vs SIP',
      'How to increase my SIP amount?'
    ];
  }
  
  // Default suggestions
  return [
    'Tell me more',
    'What about other options?',
    'How does this compare?'
  ];
};

=======

    // Return dummy data in case of API failure
    return [
      {
        category: "Equity Mutual Funds",
        options: [
          "SBI Blue Chip Fund - Large-cap fund with consistent performance",
          "Axis Midcap Fund - Growth-oriented midcap exposure",
          "Parag Parikh Flexi Cap Fund - Diversified across market caps"
        ]
      },
      {
        category: "Debt Instruments",
        options: [
          "SBI Magnum Gilt Fund - Government securities for stability",
          "HDFC Corporate Bond Fund - Fixed income with moderate risk",
          "Kotak Bond Fund - Diversified debt portfolio"
        ]
      },
      {
        category: "Gold Investments",
        options: [
          "Nippon India Gold ETF - Tracks gold prices efficiently",
          "SBI Gold Fund - Fund of fund investing in gold ETFs"
        ]
      },
      {
        category: "Cryptocurrency",
        options: [
          "Bitcoin (BTC) - Market leader with highest market cap",
          "Ethereum (ETH) - Smart contract platform with utility",
          "Consider investing through CoinDCX or WazirX platforms"
        ]
      },
      {
        category: "Cash & Liquid Funds",
        options: [
          "ICICI Prudential Liquid Fund - Short-term liquid investment",
          "Axis Liquid Fund - High liquidity with low risk"
        ]
      }
    ];
  }
};
>>>>>>> e80474b994ee653dd3d63b06b54f21776c430b53
