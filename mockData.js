const routes = [
  {
    id: "r4",
    name: "Anand Vihar ISBT - Ambedkar Nagar Terminal",
    number: "469",
    color: "#f59e0b", // Orange
    startPoint: "Anand Vihar ISBT",
    endPoint: "Ambedkar Nagar Terminal",
    stops: [
      { name: "Anand Vihar ISBT (Viveka Nand ISBT)", coords: [28.6465, 77.3159] },
      { name: "Hasan Pur Depot (Patparganj Depot)", coords: [28.6322, 77.3045] },
      { name: "Shakar Pur", coords: [28.6295, 77.2785] },
      { name: "Mother Dairy", coords: [28.6265, 77.2885] },
      { name: "Pusta X-ing (N.H. 24)", coords: [28.6150, 77.2850] },
      { name: "Road Bridge East", coords: [28.6050, 77.2750] },
      { name: "Sarai Kale Khan", coords: [28.5910, 77.2605] },
      { name: "Ashram", coords: [28.5710, 77.2610] },
      { name: "Sri Niwas Puri Depot", coords: [28.5630, 77.2550] },
      { name: "Punj Sons", coords: [28.5550, 77.2650] },
      { name: "Kalka Ji DDA Flats", coords: [28.5410, 77.2610] },
      { name: "Hamdard Nagar", coords: [28.5140, 77.2450] },
      { name: "Ambedkar Nagar Terminal", coords: [28.5190, 77.2340] }
    ],
    totalStops: 13
  },
  {
    id: "r5",
    name: "New Delhi Rly Stn - Badarpur Border",
    number: "433",
    color: "#3b82f6", // Blue
    startPoint: "New Delhi Rly Stn",
    endPoint: "Badarpur Border",
    stops: [
      { name: "New Delhi Railway Station Gate 2", coords: [28.6430, 77.2223] },
      { name: "Regal", coords: [28.6290, 77.2150] },
      { name: "Krishi Bhawan", coords: [28.6180, 77.2130] },
      { name: "Police Station Tughlak Road", coords: [28.6050, 77.2110] },
      { name: "Safdarjung Airport", coords: [28.5850, 77.2100] },
      { name: "A.I.I.M.S.", coords: [28.5670, 77.2100] },
      { name: "Andrews Ganj", coords: [28.5570, 77.2250] },
      { name: "Lajpat Nagar", coords: [28.5680, 77.2450] },
      { name: "Sri Niwas Puri Depot", coords: [28.5630, 77.2550] },
      { name: "Punj Sons", coords: [28.5550, 77.2650] },
      { name: "C. Lal Chowk", coords: [28.5450, 77.2750] },
      { name: "ESI Hospital Okhla", coords: [28.5350, 77.2850] },
      { name: "Prahlad Pur (Tughlakabad)", coords: [28.5150, 77.2950] },
      { name: "Badarpur Border", coords: [28.4950, 77.3050] }
    ],
    totalStops: 14
  },
  {
    id: "r6",
    name: "Okhla Enclave - Mehrauli Terminal",
    number: "463",
    color: "#8b5cf6", // Purple
    startPoint: "Okhla Enclave",
    endPoint: "Mehrauli Terminal",
    stops: [
      { name: "Okhla Enclave", coords: [28.5500, 77.2900] },
      { name: "Okhla", coords: [28.5600, 77.2800] },
      { name: "Holy Family Hospital", coords: [28.5620, 77.2750] },
      { name: "Modi Flour Mills", coords: [28.5580, 77.2680] },
      { name: "Punj Sons", coords: [28.5550, 77.2650] },
      { name: "Madan Pur", coords: [28.5450, 77.2600] },
      { name: "Hamdard Nagar", coords: [28.5140, 77.2450] },
      { name: "Ambedkar Nagar Terminal", coords: [28.5190, 77.2340] },
      { name: "Said-Ul-Azaib", coords: [28.5150, 77.2100] },
      { name: "Lado Sarai", coords: [28.5200, 77.1950] },
      { name: "Mehrauli Terminal", coords: [28.5250, 77.1800] }
    ],
    totalStops: 11
  },
  {
    id: "r7",
    name: "Outer Mudrika Night Service",
    number: "OMS-NS",
    color: "#ef4444", // Red
    startPoint: "Uttam Nagar Terminal",
    endPoint: "Uttam Nagar Terminal",
    stops: [
      { name: "Uttam Nagar Terminal", coords: [28.6210, 77.0650] },
      { name: "District Centre Outer Ring Road", coords: [28.6280, 77.0750] },
      { name: "Major Bhupinder Singh Nagar", coords: [28.6350, 77.0850] },
      { name: "Sunder Vihar", coords: [28.6420, 77.0950] },
      { name: "Peera Garhi Depot", coords: [28.6750, 77.0900] },
      { name: "Mangol Pur School", coords: [28.6900, 77.1000] },
      { name: "Saraswati Vihar C-Block", coords: [28.6950, 77.1150] },
      { name: "Uttari Pitam Pura", coords: [28.7050, 77.1300] },
      { name: "Haider Pur Water Works", coords: [28.7200, 77.1450] },
      { name: "G.T.K. By Pass", coords: [28.7350, 77.1650] },
      { name: "Mukand Pur", coords: [28.7450, 77.1850] },
      { name: "Burari X-ing", coords: [28.7550, 77.2050] },
      { name: "Jagat Pur X-ing", coords: [28.7650, 77.2250] },
      { name: "Nanak Sar", coords: [28.7750, 77.2450] },
      { name: "Bhajanpura", coords: [28.7050, 77.2650] }
    ],
    totalStops: 15
  },
  {
    id: "r8",
    name: "Badarpur Border - Aya Nagar",
    number: "525",
    color: "#ec4899", // Pink
    startPoint: "Badarpur Border",
    endPoint: "Aya Nagar",
    stops: [
      { name: "Badarpur Border", coords: [28.4950, 77.3050] },
      { name: "Prahlad Pur (Tughlakabad)", coords: [28.5150, 77.2950] },
      { name: "Tughlakabad Village", coords: [28.5250, 77.2650] },
      { name: "Hamdard Nagar", coords: [28.5140, 77.2450] },
      { name: "Ambedkar Nagar Terminal", coords: [28.5190, 77.2340] },
      { name: "Said-Ul-Azaib", coords: [28.5150, 77.2100] },
      { name: "Lado Sarai", coords: [28.5200, 77.1950] },
      { name: "Andheria More", coords: [28.5080, 77.1780] },
      { name: "Sultanpur", coords: [28.4980, 77.1650] },
      { name: "Ghitorni", coords: [28.4850, 77.1480] },
      { name: "Airforce Station NICF", coords: [28.4750, 77.1350] },
      { name: "Aya Nagar", coords: [28.4650, 77.1250] }
    ],
    totalStops: 12
  }
];

const initialBuses = [
  // Route 469
  { id: "b401", routeId: "r4", driver: "Priya Sharma", capacity: 75, occupancy: 45, speed: "20 Km/h", status: "On Time", currentStopIndex: 3, progress: 0.4, waitTime: 0 },
  { id: "b402", routeId: "r4", driver: "Arjun Das", capacity: 75, occupancy: 20, speed: "30 Km/h", status: "On Time", currentStopIndex: 8, progress: 0.1, waitTime: 0 },
  { id: "b403", routeId: "r4", driver: "Sita Ram", capacity: 75, occupancy: 65, speed: "15 Km/h", status: "Delayed", currentStopIndex: 0, progress: 0.7, waitTime: 0 },

  // Route 433
  { id: "b501", routeId: "r5", driver: "Rajesh Kumar", capacity: 80, occupancy: 60, speed: "25 Km/h", status: "On Time", currentStopIndex: 1, progress: 0.2, waitTime: 0 },
  { id: "b502", routeId: "r5", driver: "Vikram Negi", capacity: 80, occupancy: 10, speed: "35 Km/h", status: "On Time", currentStopIndex: 10, progress: 0.5, waitTime: 0 },

  // Route 463
  { id: "b601", routeId: "r6", driver: "Amit Singh", capacity: 70, occupancy: 30, speed: "30 Km/h", status: "On Time", currentStopIndex: 4, progress: 0.5, waitTime: 0 },
  { id: "b602", routeId: "r6", driver: "Kavita Devi", capacity: 70, occupancy: 55, speed: "22 Km/h", status: "On Time", currentStopIndex: 8, progress: 0.8, waitTime: 0 },

  // Route OMS-NS
  { id: "b701", routeId: "r7", driver: "Suresh Yadav", capacity: 90, occupancy: 50, speed: "35 Km/h", status: "On Time", currentStopIndex: 0, progress: 0.1, waitTime: 0 },
  { id: "b702", routeId: "r7", driver: "Mohit Jain", capacity: 90, occupancy: 85, speed: "20 Km/h", status: "On Time", currentStopIndex: 7, progress: 0.4, waitTime: 0 },
  { id: "b703", routeId: "r7", driver: "Anil Kapoor", capacity: 90, occupancy: 30, speed: "40 Km/h", status: "On Time", currentStopIndex: 12, progress: 0.9, waitTime: 0 },

  // Route 525
  { id: "b801", routeId: "r8", driver: "Deepak Rawat", capacity: 80, occupancy: 55, speed: "28 Km/h", status: "On Time", currentStopIndex: 2, progress: 0.6, waitTime: 0 },
  { id: "b802", routeId: "r8", driver: "Sanjay Gupta", capacity: 80, occupancy: 40, speed: "24 Km/h", status: "On Time", currentStopIndex: 9, progress: 0.3, waitTime: 0 }
];

// Helper for Haversine distance
function getDistance(coords1, coords2) {
    const [lat1, lon1] = coords1;
    const [lat2, lon2] = coords2;
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Helper to simulate bus movement
function simulateMovement(busesToUpdate) {
  return busesToUpdate.map(bus => {
    // If bus is waiting at a stop
    if (bus.waitTime > 0) {
      return {
        ...bus,
        waitTime: bus.waitTime - 1,
        speed: "0 Km/h",
        status: "At Stop"
      };
    }

    const route = routes.find(r => r.id === bus.routeId);
    let newProgress = bus.progress;
    let newStopIndex = bus.currentStopIndex;
    let newStatus = bus.status;
    let newOccupancy = bus.occupancy;
    let newWaitTime = 0;

    // Calculate dynamic increment based on distance
    if (route && newStopIndex < route.stops.length - 1) {
        const d = getDistance(route.stops[newStopIndex].coords, route.stops[newStopIndex + 1].coords);
        // Base speed factor (0.002 units per km per 100ms tick)
        // We add some randomness for traffic
        const trafficFactor = (Math.random() * 0.4 + 0.8); 
        const increment = (0.002 / Math.max(0.1, d)) * trafficFactor;
        newProgress += increment;
    } else {
        newProgress += 0.002; // Fallback
    }

    if (newProgress >= 1) {
      newProgress = 0;
      newStopIndex = bus.currentStopIndex + 1;
      newWaitTime = 400; // 40 seconds / 0.1s interval = 400 ticks
      newStatus = "At Stop";
      
      if (newStopIndex >= route.totalStops - 1) {
        newStopIndex = 0;
      }

      // Randomly increase/decrease occupancy at each stop
      const isBigExchange = Math.random() > 0.8;
      const changeRange = isBigExchange ? 50 : 25;
      const change = Math.floor(Math.random() * (changeRange * 2)) - changeRange;
      newOccupancy = Math.max(2, Math.min(bus.capacity, bus.occupancy + change));
    } else {
      // If it just finished waiting or is moving
      if (newStatus === "At Stop") {
        newStatus = "On Time";
      }
    }

    // Fluctuating speed for display
    const baseSpeed = 25 + Math.sin(Date.now() / 2000) * 10; 

    return {
      ...bus,
      progress: newProgress,
      currentStopIndex: newStopIndex,
      occupancy: newOccupancy,
      status: newStatus,
      speed: newProgress === 0 ? "0 Km/h" : `${Math.floor(baseSpeed)} Km/h`,
      waitTime: newWaitTime
    };
  });
}
