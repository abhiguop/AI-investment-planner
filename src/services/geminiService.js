import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  "AIzaSyCjf4ADeYgaFXhATleNH5BxuWHdb_owp-Y";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: `You are InvestWise AI, an expert financial assistant. Your goal is to provide users with insightful, accurate, and easy-to-understand information about investing and personal finance.

**Your capabilities include:**
- Explaining complex financial concepts (e.g., diversification, dollar-cost averaging, ETFs).
- Providing overviews of different investment options (stocks, bonds, mutual funds, etc.).
- Discussing market trends and news in a neutral, informative way.
- Guiding users on how to use this application's features (like Risk Assessment and Investment Plan).

**Your personality:**
- **Knowledgeable and Trustworthy:** Provide well-researched and balanced information.
- **Encouraging and Supportive:** Help users feel confident in their financial journey.
- **Clear and Concise:** Avoid jargon where possible, and explain it when necessary.

**Important Rules:**
- **You are NOT a financial advisor.** You must not give direct financial advice or tell users what to buy or sell. Always include a disclaimer like "This is not financial advice. Please consult with a professional financial advisor before making any investment decisions." when appropriate.
- **Do not ask for or store personal identifiable information (PII).**
- When asked for suggestions, provide a range of options and explain the pros and cons of each.
- Keep responses focused on finance and investing. If the user asks something off-topic, gently guide them back to financial topics.`
});

// Chat history for context
const chatHistory = [];
const MAX_HISTORY_LENGTH = 10;

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
      
      Format your response as a JSON array like:
      [
        { "category": "Equity Mutual Funds", "options": ["Fund 1", "Fund 2"] },
        { "category": "Debt Instruments", "options": ["Bond 1", "Bond 2"] }
      ]
      
      Only return the JSON array and nothing else.
    `;

    const result = await model.generateContent([prompt]);
    const text = await result.response.text();

    const jsonStartIndex = text.indexOf("[");
    const jsonEndIndex = text.lastIndexOf("]") + 1;
    const jsonText = text.substring(jsonStartIndex, jsonEndIndex);

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating investment suggestions:", error);

    if (error.message && error.message.includes("quota")) {
      console.warn("Gemini API quota exceeded, using fallback recommendations");
    }

    return generateFallbackSuggestions(promptData);
  }
};

// Fallback function for when API fails
const generateFallbackSuggestions = (promptData) => {
  const { riskProfile, equityAllocation, bondsAllocation, goldAllocation, cryptoAllocation } = promptData;
  const suggestions = [];

  if (equityAllocation > 0) {
    const equityOptions = [];
    if (riskProfile === "Conservative") {
      equityOptions.push(
        "HDFC Top 100 Fund - Large-cap fund with stable returns",
        "SBI Bluechip Fund - Diversified large-cap exposure",
        "Axis Bluechip Fund - Quality large-cap stocks"
      );
    } else if (riskProfile === "Moderate") {
      equityOptions.push(
        "Parag Parikh Flexi Cap Fund - Multi-cap with international exposure",
        "Axis Midcap Fund - Growth-oriented midcap fund",
        "HDFC Balanced Advantage Fund - Dynamic asset allocation",
        "Kotak Equity Opportunities Fund - Flexible investment approach"
      );
    } else {
      equityOptions.push(
        "Nippon India Small Cap Fund - High growth potential",
        "Axis Small Cap Fund - Aggressive small-cap exposure",
        "SBI Small Cap Fund - Long-term wealth creation",
        "Kotak Emerging Equity Fund - Mid and small-cap focus"
      );
    }
    suggestions.push({ category: "Equity Mutual Funds", options: equityOptions });
  }

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

/**
 * Get response from Gemini for chat interactions
 */
export const getGeminiResponse = async (messages, signal = null) => {
  try {
    messages.forEach((msg) => {
      chatHistory.push({
        role: msg.role === "user" ? "user" : "model",
        parts: [...msg.parts]
      });
    });

    while (chatHistory.length > MAX_HISTORY_LENGTH * 2) {
      chatHistory.shift();
    }

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: { maxOutputTokens: 1000, temperature: 0.7 }
    });

    const userMessage = messages[messages.length - 1].parts[0].text;
    const result = await chat.sendMessage(userMessage, { signal });
    const response = await result.response;
    const text = response.text();

    chatHistory.push({ role: "model", parts: [{ text }] });

    return { text, suggestions: generateSuggestions(text) };
  } catch (error) {
    console.error("Error in getGeminiResponse:", error);

    if (error.message && (error.message.includes("quota") || error.message.includes("429"))) {
      return {
        text:
          "I'm currently experiencing high demand. Here's what I can tell you based on general knowledge:\n\n" +
          "• Consider index funds for long-term growth\n" +
          "• Diversify across asset classes\n" +
          "• Review your risk tolerance regularly",
        suggestions: [
          "Tell me about index funds",
          "How to diversify my portfolio?",
          "What is risk tolerance?"
        ]
      };
    }

    return {
      text:
        "I'm having trouble connecting to the AI service. Please try again later or check your internet connection.",
      suggestions: ["Try again", "Contact support", "Check your connection"]
    };
  }
};

// Helper function to generate suggestions based on AI text
const generateSuggestions = (text) => {
  const lowerText = text.toLowerCase();

  if (lowerText.includes("market") || lowerText.includes("nifty") || lowerText.includes("sensex")) {
    return ["What should I invest in today?", "Show me sector performance", "Market outlook for next month?"];
  }

  if (lowerText.includes("portfolio") || lowerText.includes("allocation")) {
    return ["How to rebalance my portfolio?", "Best allocation for my age?", "How often to review allocation?"];
  }

  if (lowerText.includes("sip") || lowerText.includes("systematic")) {
    return ["Best SIP funds to invest in", "Lump sum vs SIP", "How to increase my SIP amount?"];
  }

  return ["Tell me more", "What about other options?", "How does this compare?"];
};
