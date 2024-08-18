import { addDays } from 'date-fns';
export const getNextDayOfWeek = (dayOfWeek: number) => {
  const now = new Date();
  const targetDay = dayOfWeek; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysUntilTarget = (targetDay - now.getDay() + 7) % 7;
  now.setDate(now.getDate() + daysUntilTarget);
  return now;
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


export const getNextSaturday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;
  const nextSaturday = addDays(today, daysUntilSaturday);
  const date = new Date(nextSaturday);
  return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  });
};