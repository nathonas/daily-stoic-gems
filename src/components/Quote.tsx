import { useState } from 'react';
import { Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface QuoteProps {
  text: string;
  author: string;
}

export const Quote = ({ text, author }: QuoteProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Daily Stoic Quote',
        text: `${text} - ${author}`,
      });
    } catch (error) {
      toast({
        title: "Copied to clipboard!",
        description: "The quote has been copied to your clipboard.",
      });
      await navigator.clipboard.writeText(`${text} - ${author}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-md text-center space-y-6">
        <blockquote className="font-serif text-2xl leading-relaxed text-sage-800">
          "{text}"
        </blockquote>
        <footer className="font-sans text-sage-600">
          — {author}
        </footer>
        <Button 
          variant="outline" 
          className="mt-8"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share Quote
        </Button>
      </div>
    </div>
  );
};