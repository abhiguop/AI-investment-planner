import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const ActionCard = ({ icon, title, description, link, buttonText, color }) => {
  const IconComponent = icon;
  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-cyan-400',
      bg: 'bg-blue-500/10',
      hoverBg: 'group-hover:bg-blue-500/20',
      text: 'text-blue-400',
      hoverText: 'group-hover:text-blue-400',
      buttonText: 'text-blue-400',
      buttonHoverText: 'hover:text-blue-400/80',
      border: 'group-hover:border-primary/30',
    },
    emerald: {
      gradient: 'from-emerald-500 to-teal-400',
      bg: 'bg-emerald-500/10',
      hoverBg: 'group-hover:bg-emerald-500/20',
      text: 'text-emerald-400',
      hoverText: 'group-hover:text-emerald-400',
      buttonText: 'text-emerald-400',
      buttonHoverText: 'hover:text-emerald-400/80',
      border: 'group-hover:border-emerald-500/30',
    },
    purple: {
      gradient: 'from-purple-500 to-indigo-400',
      bg: 'bg-purple-500/10',
      hoverBg: 'group-hover:bg-purple-500/20',
      text: 'text-purple-400',
      hoverText: 'group-hover:text-purple-400',
      buttonText: 'text-purple-400',
      buttonHoverText: 'hover:text-purple-400/80',
      border: 'group-hover:border-purple-500/30',
    },
  };

  const selectedColor = colorClasses[color] || colorClasses.blue;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="relative group"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${selectedColor.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300 group-hover:duration-200`}></div>
      <Card className={`relative bg-card/50 backdrop-blur-sm border border-border/50 overflow-hidden ${selectedColor.border} transition-colors h-full`}>
        <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${selectedColor.bg} ${selectedColor.hoverBg} transition-colors`}></div>
        <CardContent className="p-6 relative z-10">
          <div className={`w-12 h-12 rounded-lg ${selectedColor.bg} flex items-center justify-center mb-4 ${selectedColor.hoverBg} transition-colors`}>
            <IconComponent className={selectedColor.text} size={24} />
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${selectedColor.hoverText} transition-colors`}>{title}</h3>
          <p className="text-muted-foreground text-sm mb-4">{description}</p>
          <Button asChild variant="ghost" className={`px-0 ${selectedColor.buttonText} ${selectedColor.buttonHoverText} hover:bg-transparent -ml-2 group-hover:translate-x-1 transition-transform`}>
            <Link to={link} className="flex items-center">
              {buttonText}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ActionCard;
