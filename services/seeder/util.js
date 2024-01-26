const coords = [
  { lat: '17.671123', long: '73.859129' },
  { lat: '18.421654', long: '73.778222' },
  { lat: '18.519615', long: '73.851743' },
  { lat: '18.964053', long: '72.931438' },
  { lat: '18.589705', long: '73.416032' },
  { lat: '20.522839', long: '75.678935' },
  { lat: '18.796844', long: '73.383988' },
  { lat: '18.561762', long: '73.701272' },
  { lat: '18.561762', long: '73.701272' },
  { lat: '18.561762', long: '73.701272' },
  { lat: '18.123319', long: '73.816300' },
  { lat: '18.921845', long: '72.833592' },
  { lat: 18.5204, long: 73.8567 }, // Pune
  { lat: 19.076, long: 72.8777 }, // Mumbai
  { lat: 20.2961, long: 85.8245 }, // Nagpur
  { lat: 19.9975, long: 73.7898 }, // Nashik
  { lat: 19.2183, long: 73.086 }, // Thane
  { lat: 21.1458, long: 79.0882 }, // Amravati
  { lat: 17.6868, long: 74.0183 }, // Solapur
  { lat: 18.4088, long: 76.5604 }, // Aurangabad
  { lat: 19.0759, long: 74.518 }, // Jalgaon
  { lat: 20.3974, long: 74.855 }, // Akola
  { lat: 19.8782, long: 75.3497 }, // Dhule
  { lat: 16.705, long: 74.2433 }, // Kolhapur
  { lat: 20.921, long: 77.7567 }, // Chandrapur
  { lat: 20.5337, long: 78.8295 }, // Yavatmal
  { lat: 17.6795, long: 74.0001 }, // Sangli
  { lat: 19.573, long: 74.3324 }, // Malegaon
  { lat: 20.9925, long: 77.2385 }, // Gondia
  { lat: 17.0217, long: 74.856 }, // Ichalkaranji
  { lat: 20.3888, long: 78.1358 }, // Wardha
  { lat: 19.6935, long: 72.7653 }, // Vasai-Virar
  { lat: 18.7543, long: 73.4062 }, // Pimpri-Chinchwad
  { lat: 19.1663, long: 76.4237 }, // Parbhani
  { lat: 19.9753, long: 73.1577 }, // Latur
  { lat: 20.3896, long: 78.1353 }, // Wardha
  { lat: 18.5034, long: 73.8627 }, // Pimpri-Chinchwad
  { lat: 19.4025, long: 74.6613 }, // Nanded
  { lat: 18.62, long: 73.7736 }, // Kalyan-Dombivli
  { lat: 17.6599, long: 75.9064 }, // Osmanabad
  { lat: 20.7927, long: 78.1348 }, // Chimur
  { lat: 20.7605, long: 78.5025 }, // Wani
  { lat: 17.6868, long: 74.0183 }, // Solapur
  { lat: 18.5567, long: 73.4265 }, // Lonavala
  { lat: 18.5567, long: 73.4265 }, // Lonavala
  { lat: 16.8498, long: 74.1247 }, // Miraj
  { lat: 17.3006, long: 74.1788 }, // Sangli
  { lat: 17.6719, long: 74.4704 }, // Satara
  { lat: 17.1865, long: 74.2096 }, // Karad
  { lat: 17.6164, long: 75.8083 }, // Latur
  { lat: 18.7166, long: 77.1767 }, // Hingoli
  { lat: 19.3924, long: 76.5139 }, // Parli
  { lat: 18.9778, long: 75.756 }, // Jalna
  { lat: 19.1552, long: 77.3147 }, // Basmat
  { lat: 19.8786, long: 79.3304 }, // Udgir
  { lat: 18.8683, long: 76.8339 }, // Khamgaon
  { lat: 19.612, long: 73.7152 }, // Ahmadnagar
  { lat: 20.4946, long: 78.1334 }, // Hinganghat
  { lat: 20.8194, long: 78.7564 }, // Warora
  { lat: 20.6886, long: 78.8818 }, // Wani
  { lat: 19.4387, long: 77.3201 }, // Parbhani
];

const listing_status = ['approved', 'rejected', 'reviewing', null];
function generateRandomDate() {
  // Get the current date
  const currentDate = new Date();

  // Calculate a random number of milliseconds within the last 10 years
  const randomMilliseconds = Math.random() * 10 * 365 * 24 * 60 * 60 * 1000;

  // Subtract the random number of milliseconds from the current date
  const tenYearsAgo = new Date(currentDate - randomMilliseconds);

  // Format the date as a string in the desired format
  const formattedDate = tenYearsAgo.toISOString();

  return formattedDate;
}

function generateRandomCattleTitle() {
  const titles = [
    'Holstein',
    'Jersey',
    'Angus',
    'Hereford',
    'Simmental',
    'Charolais',
    'Limousin',
    // Add more worker breeds here
  ];

  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
}

function generateRandomCattleDescription() {
  const descriptions = [
    'Healthy and well-fed worker.',
    'Ideal for dairy farming.',
    'Great for breeding purposes.',
    'High milk production capacity.',
    'Good price for the value.',
    'Negotiable price.',
    'Friendly and easy to manage.',
  ];

  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
}

function generateRandomCattleData() {
  const randomCordsIndex = Math.floor(Math.random() * coords.length);
  const randomListingStatusIndex = Math.floor(
    Math.random() * listing_status.length
  );
  // Sample data to serve as a template
  const sampleData = {
    is_sold: Math.random() < 0.5, // Randomly true or false with equal probability
    title: generateRandomCattleTitle(),
    description: generateRandomCattleDescription(),
    current_milk_capacity: Math.floor(Math.random() * 101), // Random value between 0 and 100
    maximum_milk_capacity: Math.floor(Math.random() * 101), // Random value between 0 and 100
    pregnancy_number: Math.floor(Math.random() * 16), // Random value between 0 and 15
    price: Math.floor(Math.random() * 1000001), // Random value between 0 and 1,000,000
    is_negotiable: Math.random() < 0.5,
    videos: [
      'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleVideos/13b4561c20f25ce64f2df866f0f18146.mp4',
    ],
    images: [
      'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleImages/0de78e1c332902c4bb1b2dd3d22e2600.jpg',
      'https://cattlemart.s3.ap-south-1.amazonaws.com/cattleImages/8800788ee78a401258298757510fd0eb.jpg',
    ],
    birth_date: generateRandomDate(),
    lat: Number(coords[randomCordsIndex].lat),
    long: Number(coords[randomCordsIndex].long),
    is_sold: Math.random() < 0.5,
    listing_status: listing_status[randomListingStatusIndex],
    seller: {
      connect: {
        id: 1, // Replace with the desired seller ID
      },
    },
    category: {
      connect: {
        id: 1, // Replace with the desired category ID
      },
    },
  };
  return sampleData;
}

module.exports = { generateRandomCattleData };
