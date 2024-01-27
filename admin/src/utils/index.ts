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

export function parseLocationData(dataString: string | JSON) {
  try {
    const parsedData =
      typeof dataString === 'object' ? dataString : JSON.parse(dataString);

    if (parsedData && parsedData.lat) {
      const lat = parseFloat(parsedData.lat);
      const lon = parseFloat(parsedData.lon);
      const label = parsedData.label;
      if (!isNaN(lat) && !isNaN(lon)) {
        return { lat, lon, label };
      }
    }

    if (
      parsedData &&
      parsedData.raw &&
      typeof parsedData.raw.lat === 'string' &&
      typeof parsedData.raw.lon === 'string'
    ) {
      const lat = parseFloat(parsedData.raw.lat);
      const lon = parseFloat(parsedData.raw.lon);
      const label = parsedData.raw.label;

      if (!isNaN(lat) && !isNaN(lon)) {
        return { lat, lon, label };
      }
    }
  } catch (error) {
    console.error('Error parsing location data:', error);
  }
  // Return null or handle the case when parsing is not successful
  return {
    lat: +DEFAULT_LOCATION.raw.lat,
    lon: +DEFAULT_LOCATION.raw.lon,
    label: DEFAULT_LOCATION.label,
  };
}
