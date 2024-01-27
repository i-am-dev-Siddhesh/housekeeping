import { DEFAULT_LOCATION } from './constant';

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

export function parseLocationData(dataString: string) {
  try {
    const parsedData = JSON.parse(dataString);

    if (
      parsedData &&
      parsedData.raw &&
      typeof parsedData.raw.lat === 'string' &&
      typeof parsedData.raw.lon === 'string'
    ) {
      const lat = parseFloat(parsedData.raw.lat);
      const lon = parseFloat(parsedData.raw.lon);

      if (!isNaN(lat) && !isNaN(lon)) {
        return { lat, lon };
      }
    }
  } catch (error) {
    console.error('Error parsing location data:', error);
  }

  // Return null or handle the case when parsing is not successful
  return { lat: +DEFAULT_LOCATION.raw.lat, lon: +DEFAULT_LOCATION.raw.lon };
}
