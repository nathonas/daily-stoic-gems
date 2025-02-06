import { useState, useEffect } from 'react';
import { Quote } from '@/components/Quote';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const QUOTES = [
  {
    text: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius"
  },
  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius"
  },
  {
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius"
  },
  {
    text: "The best revenge is not to be like your enemy.",
    author: "Marcus Aurelius"
  },
  {
    text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    author: "Marcus Aurelius"
  }
];

const Index = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get today's date and use it to generate a consistent quote for the day
    const today = new Date().toDateString();
    const hash = Array.from(today).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const todayIndex = hash % QUOTES.length;
    setCurrentQuoteIndex(todayIndex);
    setIsLoading(false);
  }, []);

  const handlePrevious = () => {
    setCurrentQuoteIndex((prev) => (prev === 0 ? QUOTES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentQuoteIndex((prev) => (prev === QUOTES.length - 1 ? 0 : prev + 1));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sage-50 to-sage-100">
        <div className="animate-pulse">Loading wisdom...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sage-50 to-sage-100">
      <div className="flex items-center justify-between w-full max-w-md px-4">
        <Button variant="ghost" onClick={handlePrevious} className="text-sage-600">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Quote {...QUOTES[currentQuoteIndex]} />
        <Button variant="ghost" onClick={handleNext} className="text-sage-600">
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;