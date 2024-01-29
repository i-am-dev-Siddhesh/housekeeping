import { ILocationData } from '@/types';

export const PAGE_DATA_COUNT = 9;

export const DEFAULT_LOCATION: ILocationData = {
  x: 74.0041726,
  y: 17.688321,
  label: 'Satara, Maharashtra, 415002, India',
  bounds: [
    [17.528321, 73.8441726],
    [17.848321, 74.1641726],
  ],
  raw: {
    place_id: 216593445,
    licence:
      'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
    osm_type: 'node',
    osm_id: 245641635,
    lat: '17.688321',
    lon: '74.0041726',
    class: 'place',
    type: 'city',
    place_rank: 16,
    importance: 0.3942581232679697,
    addresstype: 'city',
    name: 'Satara',
    display_name: 'Satara, Maharashtra, 415002, India',
    boundingbox: ['17.5283210', '17.8483210', '73.8441726', '74.1641726'],
  },
};
export const staticSlotData = [
  { label: '9:00 AM - 9:25 AM', value: 1 },
  { label: '9:30 AM - 9:55 AM', value: 2 },
  { label: '10:00 AM - 10:25 AM', value: 3 },
  { label: '10:30 AM - 10:55 AM', value: 4 },
  { label: '11:00 AM - 11:25 AM', value: 5 },
  { label: '11:30 AM - 11:55 AM', value: 6 },
  { label: '12:00 PM - 12:25 PM', value: 7 },
  { label: '12:30 PM - 12:55 PM', value: 8 },
  { label: '1:00 PM - 1:30 PM', value: -1 }, // Break from 1:00 PM to 1:30 PM
  { label: '1:35 PM - 2:00 PM', value: 9 },
  { label: '2:05 PM - 2:30 PM', value: 10 },
  { label: '2:35 PM - 3:00 PM', value: 11 },
  { label: '3:05 PM - 3:30 PM', value: 12 },
  { label: '3:35 PM - 4:00 PM', value: 13 },
  { label: '4:05 PM - 4:30 PM', value: 14 },
  { label: '4:35 PM - 5:00 PM', value: 15 },
  { label: '5:05 PM - 5:30 PM', value: 16 },
  { label: '5:35 PM - 6:00 PM', value: 17 },
];