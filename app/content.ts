export type Card = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  image: string;
  location: string;
  category: string;
  accessible?: boolean;
  family?: boolean;
  featured?: boolean;
  status?: string;
  href?: string;
  sourceUrl?: string;
  sourceName?: string;
  lastReviewed?: string;
  contentType?: "experience" | "food" | "hotel" | "nightlife" | "shopping" | "story";
};

export const experiences: Card[] = [
  { slug: "nairobi-national-park", title: "Nairobi National Park: The city’s wild edge", eyebrow: "Nature & wildlife", summary: "Experience open grasslands and wildlife with Nairobi’s skyline in the distance.", image: "/images/hero.jpg", location: "Lang’ata", category: "Nature", accessible: true, family: true, featured: true },
  { slug: "a-day-in-karen", title: "A day in Karen", eyebrow: "Neighbourhood guide", summary: "Combine conservation, museums, gardens, craft and relaxed dining in one of Nairobi’s best-known districts.", image: "/images/market.jpg", location: "Karen", category: "Culture", family: true, featured: true },
  { slug: "flavours-of-nairobi", title: "Flavours of Nairobi", eyebrow: "Food & drink", summary: "Kenyan classics, contemporary African menus, neighbourhood favourites, coffee culture and late-night dining.", image: "/images/food.jpg", location: "Across Nairobi", category: "Food", accessible: true, featured: true },
  { slug: "creative-nairobi", title: "Creative Nairobi", eyebrow: "Art & culture", summary: "Follow the city’s art, fashion, music, photography, theatre and independent design scene.", image: "/images/craft.jpg", location: "Citywide", category: "Culture", accessible: true, featured: true },
  { slug: "karura-forest", title: "Karura Forest", eyebrow: "Nature & wellness", summary: "Trade the city’s pace for walking, cycling, waterfalls and cool forest trails.", image: "/images/karura.jpg", location: "Karura", category: "Nature", family: true, featured: true },
  { slug: "nairobi-after-dark", title: "Nairobi after dark", eyebrow: "Music & nightlife", summary: "Discover live music, lounges, performances, rooftop venues and the city’s social energy.", image: "/images/business.jpg", location: "Westlands", category: "Nightlife", featured: true },
  { slug: "market-mornings", title: "Market mornings", eyebrow: "Craft & design", summary: "Meet makers and browse jewellery, textiles and objects while buying thoughtfully and asking before taking photographs.", image: "/images/market.jpg", location: "Various locations", category: "Shopping", family: true },
  { slug: "coffee-and-city", title: "Coffee and the city", eyebrow: "Food & drink", summary: "A considered introduction to Nairobi’s roasters, cafés and unhurried morning rituals.", image: "/images/food.jpg", location: "Kilimani", category: "Food", accessible: true },
];

export const itineraries = [
  ["Nairobi in 24 Hours", "A confident first day: wildlife at dawn, city culture by afternoon and dinner with a view."],
  ["A Long Weekend in Nairobi", "Three days of nature, neighbourhoods, design, food and enough breathing room."],
  ["Nairobi for Families", "Flexible, child-friendly days with practical pauses and accessible options."],
  ["Culture and Creativity", "Studios, galleries, markets, live performance and independent design."],
  ["Wild Nairobi", "Forest paths, conservation stories and skyline-framed grasslands."],
  ["Business Trip, Better", "Turn the hours around your agenda into a genuine sense of place."],
  ["Five Days: Nairobi and Beyond", "Begin in the capital, then continue towards the Rift Valley or the coast."],
];

export const destinations = [
  { slug: "nairobi", title: "Nairobi", intro: "Kenya’s capital is a city of contrasts that work beautifully together: wildlife and skyline, heritage and experimentation, global ambition and unmistakably local character.", image: "/images/business.jpg", time: "You are here" },
  { slug: "mombasa", title: "Mombasa", intro: "Continue east to a coastal city shaped by the Indian Ocean, centuries of exchange, Swahili heritage, historic architecture and an easy relationship with the sea.", image: "/images/market.jpg", time: "Continue by air, rail or road" },
  { slug: "nakuru", title: "Nakuru", intro: "A gateway to Rift Valley landscapes, lake country, wildlife, farms and some of Kenya’s most memorable road-trip scenery.", image: "/images/hero.jpg", time: "Continue west by road" },
  { slug: "malindi", title: "Malindi", intro: "A relaxed coastal destination where beaches, marine life, Swahili culture and layers of history invite a slower pace.", image: "/images/karura.jpg", time: "Continue by air or road" },
  { slug: "kisumu", title: "Kisumu", intro: "A lively lakeside city with distinctive cuisine, cultural experiences, sunsets and access to western Kenya’s landscapes and communities.", image: "/images/food.jpg", time: "Continue by air or road" },
];

export const stories: Card[] = [
  { slug: "nairobi-between-meetings", title: "Nairobi Between Meetings", eyebrow: "City guide · Draft concept", summary: "How to find rewarding hours between a morning briefing and an evening reception.", image: "/images/business.jpg", location: "Nairobi", category: "Business", status: "Draft concept" },
  { slug: "food-scene", title: "The People Shaping Nairobi’s Food Scene", eyebrow: "Food · Draft concept", summary: "A future story about the cooks, growers, hosts and entrepreneurs changing how the city eats.", image: "/images/food.jpg", location: "Nairobi", category: "Food", status: "Draft concept" },
  { slug: "contemporary-art", title: "A Guide to Nairobi’s Contemporary Art", eyebrow: "Culture · Draft concept", summary: "Studios, galleries and artist-led spaces to approach with curiosity.", image: "/images/craft.jpg", location: "Nairobi", category: "Culture", status: "Draft concept" },
  { slug: "slow-sunday", title: "How to Spend a Slow Sunday in Nairobi", eyebrow: "City life · Draft concept", summary: "Coffee, green space, an easy lunch and somewhere to hear the city exhale.", image: "/images/karura.jpg", location: "Nairobi", category: "Guide", status: "Draft concept" },
  { slug: "rift-valley", title: "From Nairobi to the Rift Valley", eyebrow: "Kenya · Draft concept", summary: "A responsible continuation from the capital into changing landscapes.", image: "/images/hero.jpg", location: "Nairobi & beyond", category: "Kenya", status: "Draft concept" },
  { slug: "innovation-ecosystem", title: "Inside the City’s Innovation Ecosystem", eyebrow: "Innovation · Draft concept", summary: "The people, institutions and ideas behind Nairobi’s entrepreneurial energy.", image: "/images/business.jpg", location: "Nairobi", category: "Innovation", status: "Draft concept" },
];

export const neighbourhoods = [
  ["Central Business District", "Architecture, institutions, markets and everyday urban rhythm sit close together. Visit with a plan and allow extra time between stops."],
  ["Westlands", "A busy mixed-use district for work, dining, shopping and nightlife, with character changing from street to street."],
  ["Karen and Lang’ata", "Leafy, widely spread areas associated with museums, conservation organisations, gardens, craft and relaxed dining."],
  ["Kilimani and Hurlingham", "Residential streets meet cafés, restaurants, offices and independent retail in a fast-changing part of the city."],
  ["Gigiri and Runda", "Diplomatic and residential areas with international institutions, hotels and green streets; access requirements vary by venue."],
  ["Parklands", "A layered neighbourhood known for community life, commerce and a rich range of places to eat."],
  ["Lavington", "A residential district with shopping centres, restaurants and quieter pockets, connected to several western neighbourhoods."],
  ["Eastlands", "A large, diverse part of Nairobi with influential music, food, sport and entrepreneurial cultures; no single description captures it."],
];

export const sectors = ["Technology", "Tourism & hospitality", "Creative industries", "Financial & professional services", "Logistics", "Sustainability", "Health", "Education"];

export const practical = [
  ["Before you travel", "Confirm your passport validity, entry requirements and travel insurance before departure."],
  ["Entry requirements", "Requirements may change. Check the linked official source before booking or travelling."],
  ["Health and safety", "Seek current advice from qualified health authorities and use trusted transport providers."],
  ["Weather and what to pack", "Nairobi’s elevation can mean warm days, cool evenings and seasonal rain. Bring adaptable layers."],
  ["Currency and payments", "The Kenyan shilling is the local currency. Cards and mobile payments are common, but availability varies."],
  ["Getting to Nairobi", "Jomo Kenyatta International Airport is the main international gateway; Wilson Airport serves many domestic routes."],
  ["Airport transfers", "Arrange transfers through your accommodation or a trusted, clearly identified transport service."],
  ["Getting around the city", "Allow time for traffic. Routes and travel times vary considerably by hour and weather."],
  ["Connectivity", "Local mobile services are widely used. Confirm current registration requirements with the operator."],
  ["Accessibility", "Access conditions vary. Contact venues directly and use the accessibility filter when planning."],
  ["Emergency contacts", "Use official sources for current emergency and embassy contact information."],
  ["Travelling for business", "Plan journeys around your schedule and ask venues about security, access and arrival procedures."],
];

export const mediaCredits = [
  "Hero: Alex Mbogoh / Wikimedia Commons, CC BY-SA 4.0",
  "Karura Forest: Ninara / Wikimedia Commons, CC BY 2.0",
  "Kenyan breakfast: Bahnfrend / Wikimedia Commons, CC BY-SA 4.0",
  "Jewellery: Laurakomanga / Wikimedia Commons, CC BY-SA 4.0",
  "Nairobi skyline: Lebu Ayiga / Wikimedia Commons, CC BY-SA 4.0",
  "Maasai Market: khym54 / Wikimedia Commons, CC BY 2.0",
];
