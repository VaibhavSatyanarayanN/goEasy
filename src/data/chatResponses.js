export const getChatResponse = (message, destinationName = 'Japan') => {
  const msg = message.toLowerCase();
  
  if (msg.includes('hotel') || msg.includes('stay') || msg.includes('resort')) {
    return {
      text: `For your trip to ${destinationName}, I recommend looking at options close to primary transit points. For example, staying in Shinjuku for Tokyo or Ubud Center for Bali ensures you waste less time in traffic.\n\nWould you like me to find cheaper hotel options, or are you looking for luxury wellness resorts?`,
      chips: ['Show luxury hotels', 'Find cheaper stays', 'Close to city center']
    };
  }
  
  if (msg.includes('flight') || msg.includes('airline') || msg.includes('ticket')) {
    return {
      text: `For ${destinationName}, flights are currently averaging around the standard seasonal pricing. Direct flights save time, but a 1-stop overlay (like Singapore Airlines or VietJet) can cut your ticket price by up to 25%!\n\nWould you like to compare morning vs evening flights?`,
      chips: ['Compare flight prices', 'Direct flights only', 'Show overlay options']
    };
  }
  
  if (msg.includes('budget') || msg.includes('cost') || msg.includes('price')) {
    return {
      text: `I've optimized your itinerary for a standard mid-range budget. Approximately 45% is allocated to accommodation, 35% to travel, and the rest to activities and dining. You can easily save by opting for local dining spots and using public transport.\n\nWould you like to trim down the budget or add premium experiences?`,
      chips: ['Reduce budget', 'Upgrade to Luxury', 'Show cost breakdown']
    };
  }
  
  if (msg.includes('food') || msg.includes('eat') || msg.includes('restaurant') || msg.includes('dining')) {
    return {
      text: `Food is a major highlight in ${destinationName}! I've included traditional street food stalls and local favorites. In Ubud, try crispy duck; in Tokyo, do not miss Tsukiji Outer Market or the Omoide Yokocho ramen bars.\n\nDo you have any dietary preferences (e.g. vegetarian, vegan, halal)?`,
      chips: ['Vegetarian spots', 'Fine dining', 'Street food guide']
    };
  }

  if (msg.includes('extend') || msg.includes('days') || msg.includes('longer')) {
    return {
      text: `Extending your trip is a great idea! For ${destinationName}, adding 2 extra days would allow you to visit nearby regions (like Osaka/Nara in Japan or the Gili Islands in Bali).\n\nShall I add these to your current TripBoard?`,
      chips: ['Yes, add 2 days', 'No, keep it 5 days', 'Show extra activities']
    };
  }

  // Default response
  return {
    text: `That's a great question! I can adjust your ${destinationName} TripBoard based on what you need. We can swap activities, suggest local restaurants, or change stay details. Just tell me what you'd like to adjust.`,
    chips: ['Change hotel', 'Add activity', 'Cheaper flights', 'Local food spots']
  };
};

export default getChatResponse;
