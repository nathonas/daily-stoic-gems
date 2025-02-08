
import { Quote } from '@/components/Quote';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDailyQuote } from '@/hooks/useDailyQuote';

const Index = () => {
  const { currentQuote, isLoading, handlePrevious, handleNext } = useDailyQuote();

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
        <Quote {...currentQuote} />
        <Button variant="ghost" onClick={handleNext} className="text-sage-600">
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
