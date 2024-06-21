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