import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getGeminiResponse } from '@/services/geminiService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "📊 Welcome to InvestWise AI! I'm your personal investment assistant. I can help you with portfolio analysis, market trends, investment strategies, and financial planning. How can I assist you with your investments today?",
      timestamp: new Date(),
      suggestions: [
        "Analyze my portfolio",
        "Best SIP plans for long-term growth",
        "Explain dollar-cost averaging",
        "Tax-saving investment options"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortControllerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);
  
  // Cleanup function to abort pending requests
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Generate context-aware suggestions based on user message
  const generateSuggestions = useCallback((text) => {
    const lowerText = text.toLowerCase();
    
    // Portfolio-related suggestions
    if (lowerText.includes('portfolio') || lowerText.includes('investment')) {
      return [
        'How should I allocate my assets?',
        'What\'s my risk profile?',
        'Best performing sectors',
        'How to rebalance my portfolio?'
      ];
    }
    
    // Market-related suggestions
    if (lowerText.includes('market') || lowerText.includes('trend') || lowerText.includes('nifty') || lowerText.includes('sensex')) {
      return [
        'Current market analysis',
        'Best stocks to buy now',
        'Sector-wise performance',
        'Market outlook for next quarter'
      ];
    }
    
    // SIP/Investment planning
    if (lowerText.includes('sip') || lowerText.includes('lump sum') || lowerText.includes('invest')) {
      return [
        'Top SIP funds for 2025',
        'SIP vs lump sum comparison',
        'How much should I invest monthly?',
        'Best time to start SIP'
      ];
    }
    
    // Tax planning
    if (lowerText.includes('tax') || lowerText.includes('80c') || lowerText.includes('deduction')) {
      return [
        'Best tax-saving instruments',
        'ELSS vs PPF vs NPS',
        'How to save tax on capital gains?',
        'Tax implications of mutual funds'
      ];
    }
    
    // Retirement planning
    if (lowerText.includes('retirement') || lowerText.includes('pension') || lowerText.includes('nps')) {
      return [
        'How much do I need for retirement?',
        'Best retirement plans in India',
        'NPS vs Mutual Funds',
        'How to create a retirement corpus?'
      ];
    }
    
    // Default investment-related suggestions
    return [
      'Best mutual funds for 2025',
      'How to start investing with ₹5,000?',
      'Gold vs Equity vs Real Estate',
      'How to analyze stocks?'
    ];
  }, []);

  const handleSendMessage = async (message = inputValue) => {
    if (!message.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    try {
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);
      setError(null);

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();
      
      // Prepare system prompt with investment context
      const systemPrompt = `You are an expert investment advisor for InvestWise platform. Provide clear, 
      actionable investment advice. Focus on Indian markets, SEBI regulations, and tax implications. 
      Be concise but thorough. If unsure, say so. Format responses with proper spacing and bullet points when needed.`;
      
      // Prepare conversation history for API
      const conversationHistory = [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'I am ready to provide investment advice. How can I help you with your investments today?' }] },
        ...messages.filter(m => m.type === 'bot').slice(-3).map(m => ({
          role: 'model',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: message }] }
      ];

      // Get response from Gemini API
      const response = await getGeminiResponse(conversationHistory, abortControllerRef.current.signal);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.text,
        timestamp: new Date(),
        suggestions: generateSuggestions(response.text)
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error getting response:', err);
        setError('Sorry, I encountered an error. Please try again.');
        
        const errorMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: 'Sorry, I encountered an error. Please try again in a moment.',
          timestamp: new Date(),
          isError: true
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const checkForRepeatedQuestion = (currentMessage, history) => {
    if (history.length < 2) return false;
    const normalized = currentMessage.trim().toLowerCase();
    return history.slice(-3).some(msg => msg.trim().toLowerCase() === normalized);
  };

  const handleSuggestionClick = useCallback((suggestion) => {
    handleSendMessage(suggestion);
  }, [handleSendMessage]);
  
  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);
  
  const handleToggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div className="fixed bottom-6 right-6 z-50" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}>
        <Button
          onClick={handleToggleChat}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-background border rounded-lg shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-muted/50">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Investment Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-muted-foreground/10"
                onClick={handleCloseChat}
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <Sparkles className="w-3 h-3 mr-1" /> AI Powered
            </Badge>

            {/* Messages */}
            <ScrollArea className="h-[380px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <Card className={`${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <CardContent className="p-3">
                          <div className="flex items-start space-x-2">
                            {message.type === 'bot' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                            <div className="flex-1">
                              <div className="whitespace-pre-line text-sm">{message.content}</div>
                              {message.suggestions && (
                                <div className="mt-3 space-y-2">
                                  {message.suggestions.map((suggestion, index) => (
                                    <Button
                                      key={index}
                                      variant="outline"
                                      size="sm"
                                      className="w-full justify-start text-xs h-auto p-2"
                                      onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                      {suggestion}
                                    </Button>
                                  ))}
                                </div>
                              )}
                            </div>
                            {message.type === 'user' && <User size={16} className="mt-1 flex-shrink-0" />}
                          </div>
                        </CardContent>
                      </Card>
                      <div className={`text-xs text-muted-foreground mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <Card className="bg-muted border-0 shadow-none">
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse delay-150"></div>
                          <div className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-pulse delay-300"></div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
                
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start p-3 text-sm text-destructive bg-destructive/10 rounded-md"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder={isTyping ? 'AI is thinking...' : 'Type your message...'}
                  className="flex-1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                  aria-label="Type your message"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => handleSendMessage()}
                  disabled={isTyping || !inputValue.trim()}
                  aria-label="Send message"
                >
                  {isTyping ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

