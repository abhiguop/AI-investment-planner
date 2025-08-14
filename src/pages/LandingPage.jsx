import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, DollarSign, PieChart, Shield, Award, LineChart, FileText, Sparkles, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LandingPage = () => {
  const featuresRef = useRef(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    document.title = 'InvestWise | AI-Powered Investment Planning';
  }, []);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Hero Text */}
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge variant="outline">New Features</Badge>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Plan Your Financial Future with AI
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Get personalized investment strategies powered by artificial intelligence. Plan your SIPs, crypto, and gold investments to maximize returns based on your risk profile. Chat with our AI assistant for real-time market insights and investment advice.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/dashboard">
                    Start Planning
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToFeatures}
                  className="text-lg px-8 py-6"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>10,000+ Users</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </motion.div>

            {/* Hero Card */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-6 md:p-8 overflow-hidden relative border-0 shadow-2xl bg-gradient-to-br from-background to-muted/50">
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    AI Powered
                  </Badge>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Quick Investment Planner</CardTitle>
                  <CardDescription>Get started in minutes with our AI-powered assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Monthly Income</label>
                      <div className="relative">
                        <DollarSign className="absolute top-3 left-3 text-muted-foreground" size={20} />
                        <Input
                          type="number"
                          placeholder="Enter your monthly income"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Risk Level</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your risk tolerance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservative">Conservative</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="aggressive">Aggressive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link to="/risk-assessment">
                      Get Full Assessment
                      <ArrowRight className="ml-2" size={18} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-4">Features</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Smart Features for Smart Investors
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI-powered platform provides comprehensive tools to help you make informed investment decisions.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Shield className="text-primary" size={32} />, title: "Risk Assessment", description: "Complete a detailed risk tolerance assessment to understand your investment style.", link: "/risk-assessment" },
              { icon: <PieChart className="text-primary" size={32} />, title: "Portfolio Allocation", description: "Get AI-generated asset allocation suggestions tailored to your financial goals.", link: "/investment-plan" },
              { icon: <LineChart className="text-primary" size={32} />, title: "Historical Simulation", description: "See how your recommended portfolio would have performed in past market conditions.", link: "/historical-simulation" },
              { icon: <Award className="text-primary" size={32} />, title: "Strategy Comparison", description: "Compare AI suggestions with traditional investment approaches to make the best choice.", link: "/comparison" },
              { icon: <FileText className="text-primary" size={32} />, title: "Downloadable Reports", description: "Generate comprehensive PDF reports of your investment plan to review offline.", link: "/investment-plan" },
              { icon: <TrendingUp className="text-primary" size={32} />, title: "Market Insights", description: "Access AI-powered market analysis and investment recommendations.", link: "/market-status" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="p-0 h-auto">
                      <Link to={feature.link} className="text-primary font-medium flex items-center group">
                        Learn more
                        <ArrowRight className="ml-1 transition-transform group-hover:translate-x-1" size={16} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to secure your financial future?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Start your personalized investment journey today with our AI-powered planning tools.
            </p>
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link to="/dashboard">
                Create Your Investment Plan
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
