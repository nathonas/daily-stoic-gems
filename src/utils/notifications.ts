
import { LocalNotifications } from '@capacitor/local-notifications';
import { QuoteType } from '../data/quotes';

export const requestNotificationPermissions = async () => {
  try {
    await LocalNotifications.requestPermissions();
  } catch (e) {
    console.error('Error requesting notification permissions:', e);
  }
};

export const scheduleQuoteNotification = async (quote: QuoteType, index: number, scheduleTime: Date) => {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: 'Daily Stoic Quote',
          body: `"${quote.text.substring(0, 100)}${quote.text.length > 100 ? '...' : ''}" - ${quote.author}`,
          id: 1,
          schedule: { at: scheduleTime },
          extra: {
            quoteIndex: index
          }
        }
      ]
    });
  } catch (e) {
    console.error('Error scheduling notification:', e);
  }
};
