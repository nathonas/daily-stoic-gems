import { useState, useEffect } from 'react';
import { Quote } from '@/components/Quote';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, isAfter, isBefore, addDays, setHours, setMinutes } from 'date-fns';

interface QuoteType {
  text: string;
  author: string;
  source?: string;
}

const QUOTES: QuoteType[] = [
  {
    text: "Don't just say you have read books. Show that through them you have learned to think better, to be a more discriminating and reflective person. Books are the training weights of the mind.",
    author: "Epictetus",
    source: "The Art of Living"
  },
  {
    text: "There is only one way to happiness and that is to cease worrying about things which are beyond the power of our will.",
    author: "Epictetus"
  },
  {
    text: "Man is not worried by real problems so much as by his imagined anxieties about real problems.",
    author: "Epictetus"
  },
  {
    text: "It's not what happens to you, but how you react to it that matters.",
    author: "Epictetus"
  },
  {
    text: "First say to yourself what you would be; and then do what you have to do.",
    author: "Epictetus"
  },
  {
    text: "If you want to improve, be content to be thought foolish and stupid.",
    author: "Epictetus"
  },
  {
    text: "Any person capable of angering you becomes your master; he can anger you only when you permit yourself to be disturbed by him.",
    author: "Epictetus"
  },
  {
    text: "The key is to keep company only with people who uplift you, whose presence calls forth your best.",
    author: "Epictetus"
  },
  {
    text: "It is impossible for a man to learn what he thinks he already knows.",
    author: "Epictetus"
  },
  {
    text: "Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.",
    author: "Epictetus"
  },
  {
    text: "He who laughs at himself never runs out of things to laugh at.",
    author: "Epictetus"
  },
  {
    text: "Circumstances don't make the man, they only reveal him to himself.",
    author: "Epictetus"
  },
  {
    text: "People are not disturbed by things, but by the views they take of them.",
    author: "Epictetus",
    source: "Enchiridion"
  },
  {
    text: "Only the educated are free.",
    author: "Epictetus"
  },
  {
    text: "First learn the meaning of what you say, and then speak.",
    author: "Epictetus"
  },

  {
    text: "The happiness of your life depends upon the quality of your thoughts.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Waste no more time arguing about what a good man should be. Be one.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "When you arise in the morning, think of what a precious privilege it is to be alive - to breathe, to think, to enjoy, to love.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Do not waste what remains of your life in speculating about your neighbors. Anything that distracts you from fidelity to the ruler within you means a loss of opportunity for some other task.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Accept the things to which fate binds you, and love the people with whom fate brings you together, but do so with all your heart.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "The best revenge is not to be like your enemy.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "If it is not right, do not do it, if it is not true, do not say it.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Never let the future disturb you. You will meet it, if you have to, with the same weapons of reason which today arm you against the present.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "You have power over your mind - not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "Dwell on the beauty of life. Watch the stars, and see yourself running with them.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "The soul becomes dyed with the color of its thoughts.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },
  {
    text: "The best revenge is not to be like your enemy.",
    author: "Marcus Aurelius",
    source: "Meditations"
  },

  {
    text: "We suffer more often in imagination than in reality.",
    author: "Seneca",
    source: "Letters from a Stoic"
  },
  {
    text: "True happiness is to enjoy the present, without anxious dependence upon the future.",
    author: "Seneca",
    source: "Letters from a Stoic"
  },
  {
    text: "Difficulties strengthen the mind, as labor does the body.",
    author: "Seneca"
  },
  {
    text: "Life is long if you know how to use it.",
    author: "Seneca",
    source: "On the Shortness of Life"
  },
  {
    text: "Begin at once to live, and count each separate day as a separate life.",
    author: "Seneca"
  },
  {
    text: "As is a tale, so is life: not how long it is, but how good it is, is what matters.",
    author: "Seneca"
  },
  {
    text: "If a man knows not to which port he sails, no wind is favorable.",
    author: "Seneca"
  },
  {
    text: "It is not that we have so little time but that we lose so much.",
    author: "Seneca",
    source: "On the Shortness of Life"
  },
  {
    text: "Associate with people who are likely to improve you.",
    author: "Seneca"
  },
  {
    text: "If you live in harmony with nature you will never be poor; if you live according to what others think, you will never be rich.",
    author: "Seneca",
    source: "Letters from a Stoic"
  },
  {
    text: "Only time can heal what reason cannot.",
    author: "Seneca"
  },
  {
    text: "Most powerful is he who has himself in his own power.",
    author: "Seneca"
  },
  {
    text: "He who is brave is free.",
    author: "Seneca"
  },
  {
    text: "While we wait for life, life passes.",
    author: "Seneca"
  },
  {
    text: "There is no genius without a touch of madness.",
    author: "Seneca"
  },
  {
    text: "Nothing is more honorable than a grateful heart.",
    author: "Seneca"
  },
  {
    text: "We learn not in the school, but in life.",
    author: "Seneca"
  },
  {
    text: "Anger, if not restrained, is frequently more hurtful to us than the injury that provokes it.",
    author: "Seneca"
  },
  {
    text: "To wish to be well is a part of becoming well.",
    author: "Seneca"
  },
  {
    text: "Fire tests gold, suffering tests brave men.",
    author: "Seneca"
  },
  {
    text: "The greatest obstacle to living is expectancy, which hangs upon tomorrow and loses today.",
    author: "Seneca",
    source: "On the Shortness of Life"
  },
  {
    text: "Leisure without books is death, and burial of a man alive.",
    author: "Seneca"
  },
  {
    text: "What need is there to weep over parts of life? The whole of it calls for tears.",
    author: "Seneca"
  },
  {
    text: "No man was ever wise by chance.",
    author: "Seneca"
  },
  {
    text: "They lose the day in expectation of the night, and the night in fear of the dawn.",
    author: "Seneca",
    source: "On the Shortness of Life"
  },
  {
    text: "He suffers more than necessary, who suffers before it is necessary.",
    author: "Seneca"
  },
  {
    text: "The sun also shines on the wicked.",
    author: "Seneca"
  },
  {
    text: "A sword never kills anybody; it is a tool in the killer's hand.",
    author: "Seneca"
  },
  {
    text: "It is not the man who has too little that is poor, but the one who hankers after more.",
    author: "Seneca",
    source: "Letters from a Stoic"
  }
];

const Index = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateDailyQuote = () => {
      const now = new Date();
      const today8AM = setHours(setMinutes(new Date(), 0), 8);
      const tomorrow8AM = addDays(today8AM, 1);
      
      // Generate a seed based on the current date (will be same all day)
      const dateStr = format(now, 'yyyy-MM-dd');
      const seed = Array.from(dateStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const todayIndex = seed % QUOTES.length;
      
      setCurrentQuoteIndex(todayIndex);
      setIsLoading(false);

      // Schedule next update
      if (isAfter(now, today8AM) && isBefore(now, tomorrow8AM)) {
        const timeUntilTomorrow = tomorrow8AM.getTime() - now.getTime();
        setTimeout(updateDailyQuote, timeUntilTomorrow);
      } else if (isBefore(now, today8AM)) {
        const timeUntil8AM = today8AM.getTime() - now.getTime();
        setTimeout(updateDailyQuote, timeUntil8AM);
      }
    };

    updateDailyQuote();
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
