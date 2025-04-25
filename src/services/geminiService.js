import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCjf4ADeYgaFXhATleNH5BxuWHdb_owp-Y"; // Replace with your actual API Key

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

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
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
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
