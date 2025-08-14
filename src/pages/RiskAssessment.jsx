import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Brain,
  Target
} from 'lucide-react';
import { useInvestmentContext } from '../context/InvestmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const RiskAssessment = () => {
  const navigate = useNavigate();
  const { updateRiskProfile } = useInvestmentContext();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "How long do you plan to invest your money before you need it?",
      options: [
        { value: 1, text: "Less than 3 years" },
        { value: 2, text: "3-5 years" },
        { value: 3, text: "5-10 years" },
        { value: 4, text: "10+ years" }
      ]
    },
    {
      id: 2,
      question: "How would you react if your investments lost 20% of their value in a year?",
      options: [
        { value: 1, text: "I would sell everything and move to safer investments" },
        { value: 2, text: "I would sell some investments and move to safer options" },
        { value: 3, text: "I would hold my investments and wait for recovery" },
        { value: 4, text: "I would see it as an opportunity to buy more" }
      ]
    },
    {
      id: 3,
      question: "Which statement best describes your investment experience?",
      options: [
        { value: 1, text: "I have no investment experience" },
        { value: 2, text: "I have some experience with mutual funds or stocks" },
        { value: 3, text: "I am comfortable with various investment types" },
        { value: 4, text: "I actively manage a diverse investment portfolio" }
      ]
    },
    {
      id: 4,
      question: "How important is liquidity (ability to access your money quickly) to you?",
      options: [
        { value: 1, text: "Extremely important - I may need to access all my money at any time" },
        { value: 2, text: "Important - I need to access a portion of my investments on short notice" },
        { value: 3, text: "Somewhat important - I have other emergency funds" },
        { value: 4, text: "Not important - I have sufficient emergency funds elsewhere" }
      ]
    },
    {
      id: 5,
      question: "Which investment approach appeals to you most?",
      options: [
        { value: 1, text: "Low risk, low return investments only" },
        { value: 2, text: "Mostly low risk with some higher risk investments" },
        { value: 3, text: "Balanced mix of low and high risk investments" },
        { value: 4, text: "Mostly high risk, high potential return investments" }
      ]
    },
    {
      id: 6,
      question: "Have you ever invested in cryptocurrency or other volatile assets?",
      options: [
        { value: 1, text: "No, and I'm not interested" },
        { value: 2, text: "No, but I might consider a small allocation" },
        { value: 3, text: "Yes, with a small portion of my portfolio" },
        { value: 4, text: "Yes, I actively trade volatile assets" }
      ]
    },
    {
      id: 7,
      question: "What is your primary financial goal?",
      options: [
        { value: 1, text: "Preserving capital and generating income" },
        { value: 2, text: "Balanced growth with some income" },
        { value: 3, text: "Growth over the long term" },
        { value: 4, text: "Maximum growth, even with significant risk" }
      ]
    },
    {
      id: 8,
      question: "How would you allocate ₹100,000 across these options?",
      options: [
        { value: 1, text: "80% in safe investments, 20% in growth investments" },
        { value: 2, text: "60% in safe investments, 40% in growth investments" },
        { value: 3, text: "40% in safe investments, 60% in growth investments" },
        { value: 4, text: "20% in safe investments, 80% in growth investments" }
      ]
    }
  ];

  const handleAnswer = (answerValue) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerValue;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskProfile(newAnswers);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateRiskProfile = (answers) => {
    const totalScore = answers.reduce((sum, value) => sum + value, 0);
    const maxPossibleScore = questions.length * 4;
    const scorePercentage = (totalScore / maxPossibleScore) * 10;
    const riskScore = Math.round(scorePercentage * 10) / 10;

    let riskProfile, riskDescription;
    let allocation = {};

    if (riskScore <= 3) {
      riskProfile = "Conservative";
      riskDescription = "You prioritize capital preservation over growth. Your portfolio focuses on stable, income-generating investments with minimal volatility.";
      allocation = { equityAllocation: 20, bondsAllocation: 55, goldAllocation: 15, cryptoAllocation: 0, cashAllocation: 10 };
    } else if (riskScore <= 5) {
      riskProfile = "Moderately Conservative";
      riskDescription = "You seek modest growth while protecting your capital. Your portfolio has a balanced approach, with a tilt toward safer investments.";
      allocation = { equityAllocation: 35, bondsAllocation: 40, goldAllocation: 15, cryptoAllocation: 2, cashAllocation: 8 };
    } else if (riskScore <= 7) {
      riskProfile = "Moderate";
      riskDescription = "You balance growth and security. Your portfolio has diversified exposure to both conservative and growth-oriented investments.";
      allocation = { equityAllocation: 50, bondsAllocation: 30, goldAllocation: 10, cryptoAllocation: 5, cashAllocation: 5 };
    } else if (riskScore <= 8.5) {
      riskProfile = "Growth-Oriented";
      riskDescription = "You prioritize long-term growth and can tolerate market fluctuations. Your portfolio emphasizes equity investments with some diversification.";
      allocation = { equityAllocation: 65, bondsAllocation: 15, goldAllocation: 7, cryptoAllocation: 10, cashAllocation: 3 };
    } else {
      riskProfile = "Aggressive";
      riskDescription = "You seek maximum growth and can handle significant volatility. Your portfolio focuses predominantly on high-growth investments with minimal stability-focused assets.";
      allocation = { equityAllocation: 75, bondsAllocation: 5, goldAllocation: 5, cryptoAllocation: 15, cashAllocation: 0 };
    }

    updateRiskProfile({
      riskScore,
      riskProfile,
      riskDescription,
      ...allocation
    });

    setIsCompleted(true);
  };

  const navigateToInvestmentPlan = () => {
    navigate('/investment-plan');
  };

  useEffect(() => {
    document.title = 'Risk Assessment | InvestWise';
    setAnswers(new Array(questions.length).fill(null));
  }, []);

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (isCompleted) {
    return (
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center p-8">
              <CardHeader>
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl mb-2">Assessment Complete!</CardTitle>
                <CardDescription>
                  Your risk profile has been calculated. Let's create your personalized investment plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={navigateToInvestmentPlan} size="lg" className="w-full">
                  View Your Investment Plan
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Risk Assessment</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Answer these questions to help us understand your investment preferences and create a personalized portfolio strategy.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-medium">{Math.round(progressPercentage)}% Complete</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">Question {currentQuestion + 1}</Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Analysis
                </Badge>
              </div>
              <CardTitle className="text-xl md:text-2xl">
                {questions[currentQuestion].question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion] === option.value ? "default" : "outline"}
                    className="w-full justify-start h-auto p-4 text-left"
                    onClick={() => handleAnswer(option.value)}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === option.value
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {answers[currentQuestion] === option.value && (
                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                        )}
                      </div>
                      <span className="text-sm md:text-base">{option.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={goToPreviousQuestion}
            disabled={currentQuestion === 0}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2" size={16} />
            Previous
          </Button>

          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {answers.filter(answer => answer !== null).length} of {questions.length} answered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
