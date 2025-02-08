
import { useState, useEffect } from 'react';
import { format, isAfter, isBefore, addDays, setHours, setMinutes } from 'date-fns';
import { QUOTES } from '../data/quotes';
import { LocalNotifications } from '@capacitor/local-notifications';
import { requestNotificationPermissions, scheduleQuoteNotification } from '../utils/notifications';

export const useDailyQuote = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    requestNotificationPermissions();

    const updateDailyQuote = async () => {
      const now = new Date();
      const today8AM = setHours(setMinutes(new Date(), 0), 8);
      const tomorrow8AM = addDays(today8AM, 1);
      
      // Generate a seed based on the current date (will be same all day)
      const dateStr = format(now, 'yyyy-MM-dd');
      const seed = Array.from(dateStr).reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const todayIndex = seed % QUOTES.length;
      
      setCurrentQuoteIndex(todayIndex);
      setIsLoading(false);

      // Schedule notification for today's quote
      await scheduleQuoteNotification(QUOTES[todayIndex], todayIndex, today8AM);

      // Schedule next update
      if (isAfter(now, today8AM) && isBefore(now, tomorrow8AM)) {
        const timeUntilTomorrow = tomorrow8AM.getTime() - now.getTime();
        setTimeout(updateDailyQuote, timeUntilTomorrow);
      } else if (isBefore(now, today8AM)) {
        const timeUntil8AM = today8AM.getTime() - now.getTime();
        setTimeout(updateDailyQuote, timeUntil8AM);
      }
    };

    // Handle notification clicks
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      const quoteIndex = notification.notification.extra.quoteIndex;
      setCurrentQuoteIndex(quoteIndex);
    });

    updateDailyQuote();

    return () => {
      LocalNotifications.removeAllListeners();
    };
  }, []);

  const handlePrevious = () => {
    setCurrentQuoteIndex((prev) => (prev === 0 ? QUOTES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentQuoteIndex((prev) => (prev === QUOTES.length - 1 ? 0 : prev + 1));
  };

  return {
    currentQuoteIndex,
    isLoading,
    handlePrevious,
    handleNext,
    currentQuote: QUOTES[currentQuoteIndex]
  };
};
