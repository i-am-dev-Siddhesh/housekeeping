export const formatTimestamp = (timestamp: Date) => {
  const options: any = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = new Date(timestamp).toLocaleString('en-US', options);

  return formattedDate;
};
