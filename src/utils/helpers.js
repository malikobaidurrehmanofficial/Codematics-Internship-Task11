export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const formatRating = (rating = 0) => Number(rating).toFixed(1);

export const truncateText = (text, maxLength = 170) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}...` : text;
};

export const getYearFromDate = (dateStr) => {
  if (!dateStr) return 'TBA';
  return new Date(dateStr).getFullYear();
};

export const formatRuntime = (minutes = 0) => {
  if (!minutes) return 'Runtime unavailable';

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!hours) {
    return `${remainingMinutes}m`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

export const formatVoteCount = (count = 0) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M votes`;
  }

  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K votes`;
  }

  return `${count} votes`;
};
