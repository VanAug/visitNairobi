import { experiences as originalExperiences, type Card } from "./content";

const reviewed = "23 July 2026";
const countySource = "https://nairobi.go.ke/explore-nairobi";
const images = ["/images/hero.jpg","/images/karura.jpg","/images/food.jpg","/images/craft.jpg","/images/business.jpg","/images/market.jpg"];
const nairobiImageBySlug:Record<string,string> = {
  "giraffe-centre":"/images/nairobi/giraffe-manor.jpg",
  "bomas-of-kenya":"/images/nairobi/bomas.jpg",
  "nairobi-national-museum":"/images/nairobi/national-museum.jpg",
  "railway-museum":"/images/nairobi/railway-museum.jpg",
  "nairobi-arboretum":"/images/nairobi/arboretum.jpg",
  "kenyatta-international-convention-centre":"/images/nairobi/kicc.jpg",
};

export const experiences: Card[] = [
  ...originalExperiences.map(x => ({ ...x, contentType:"experience" as const, href:`/experiences/${x.slug}`, sourceName:"Nairobi City County — Explore Nairobi", sourceUrl:countySource, lastReviewed:reviewed })),
  ["giraffe-centre","Giraffe Centre","Conservation visit","Karen and Lang’ata","Learn about giraffe conservation and check current visitor arrangements directly with the centre.","https://www.giraffecentre.org/"],
  ["sheldrick-wildlife-trust","Sheldrick Wildlife Trust Nairobi Nursery","Conservation","Nairobi National Park area","Discover the organisation’s elephant-orphan care and conservation work; advance booking requirements can change.","https://www.sheldrickwildlifetrust.org/"],
  ["karen-blixen-museum","Karen Blixen Museum","Heritage","Karen","Explore the preserved house, gardens and historical interpretation at this National Museums of Kenya site.","https://museums.or.ke/"],
  ["bomas-of-kenya","Bomas of Kenya","Culture and performance","Lang’ata","A cultural institution presenting Kenyan architecture, music and dance; confirm the current programme before travelling.","https://www.bomasofkenya.co.ke/"],
  ["nairobi-national-museum","Nairobi National Museum","Museums and heritage","Museum Hill","Collections and exhibitions introduce Kenya’s natural history, cultures, art and heritage.","https://museums.or.ke/"],
  ["railway-museum","Nairobi Railway Museum","Industrial heritage","Central Nairobi","Trace the railway story that shaped Nairobi through preserved locomotives, rolling stock and archival material.","https://museums.or.ke/"],
  ["nairobi-gallery","Nairobi Gallery","Art and heritage","Kenyatta Avenue","A national monument and gallery near the city centre, with changing displays managed by National Museums of Kenya.","https://museums.or.ke/"],
  ["nairobi-arboretum","Nairobi Arboretum","Green Nairobi","Kileleshwa","A long-established urban green space for walking, picnics, trees and birdlife close to the centre.","https://nairobi.go.ke/explore-nairobi"],
  ["uhuru-park","Uhuru Park","Parks and public space","Central Nairobi","A central public landscape for rest, walking and views towards the skyline; check local guidance for current access.","https://nairobi.go.ke/explore-nairobi"],
  ["kenyatta-international-convention-centre","Kenyatta International Convention Centre","Architecture and meetings","Central Business District","An established meetings venue and Nairobi landmark. Public access and viewing arrangements should be confirmed with KICC.","https://kicc.co.ke/"],
  ["nairobi-safari-walk","Nairobi Safari Walk","Wildlife interpretation","Lang’ata","An interpretive wildlife experience managed by Kenya Wildlife Service near Nairobi National Park.","https://www.kws.go.ke/"],
  ["oloolua-nature-trail","Oloolua Nature Trail","Forest trail","Karen","A forested walking option associated with the National Museums of Kenya; confirm trail conditions before visiting.","https://museums.or.ke/"],
  ["kazuri-beads","Kazuri Beads","Craft and design","Karen","See contemporary Kenyan ceramic craft and shop directly from the maker; confirm tour availability in advance.","https://www.kazuri.co.ke/pages/contact"],
  ["ngong-hills","Ngong Hills","Day trip and hiking","South-west of Nairobi","A ridge walk and wider landscape beyond the city. Weather, transport and trail arrangements need advance planning.","https://www.kws.go.ke/"],
  ["city-market","Nairobi City Market","Food, flowers and craft","Central Nairobi","A historic central market where a thoughtful visit rewards conversation, price clarity and asking before photographs.","https://nairobi.go.ke/explore-nairobi"],
].map((x, i) => Array.isArray(x) ? ({
  slug:x[0], title:x[1], eyebrow:x[2], location:x[3], summary:x[4], sourceUrl:x[5],
  sourceName:x[5].includes("nairobi.go.ke") ? "Nairobi City County" : "Official venue website",
  lastReviewed:reviewed, image:nairobiImageBySlug[x[0]] || images[i % images.length], category:x[2], accessible:i % 3 !== 1,
  family:!x[2].toLowerCase().includes("night"), contentType:"experience", href:`/experiences/${x[0]}`,
}) as Card : x);

const venue = (slug:string,title:string,eyebrow:string,location:string,summary:string,image:string,sourceUrl:string,contentType:Card["contentType"]):Card => ({
  slug,title,eyebrow,location,summary,image,sourceUrl,sourceName:"Official venue website",lastReviewed:reviewed,
  category:eyebrow,contentType,href:`/${contentType === "food" ? "food-and-drink" : contentType}/${slug}`,accessible:true,
});

export const foodVenues: Card[] = [
  venue("talisman","The Talisman","Contemporary dining","Karen","A garden-set restaurant in Karen known for an eclectic menu and unhurried lunches; reserve and confirm current details directly.","/images/food.jpg","https://www.thetalismanrestaurant.com/","food"),
  venue("cultiva","Cultiva","Farm-led dining","Karen","A produce-conscious restaurant built around seasonal ideas, bold flavour and a creative Nairobi dining room.","/images/food.jpg","https://www.cultivakenya.com/","food"),
  venue("carnivore","Carnivore Restaurant","Kenyan institution","Lang’ata Road","A long-running Nairobi restaurant experience. Review the current menu and dietary information before booking.","/images/market.jpg","https://tamarind.co.ke/","food"),
  venue("hero","Hero Restaurant","Pan-Asian and playful","Village Market","A design-forward restaurant concept in Gigiri with a menu and atmosphere shaped for evening dining.","/images/craft.jpg","https://www.hero-restaurant.com/","food"),
  venue("mawimbi","Mawimbi Seafood Restaurant","Seafood","Longonot Place","A central Nairobi seafood restaurant; confirm sourcing, menu and reservation details with the venue.","/images/food.jpg","https://mawimbirestaurant.com/","food"),
  venue("about-thyme","About Thyme","Garden dining","Westlands","A relaxed garden restaurant in Westlands with an international menu and intimate setting.","/images/karura.jpg","https://about-thyme.com/","food"),
  venue("nairobi-street-kitchen","Nairobi Street Kitchen","Food hall and social space","Westlands","Multiple kitchens, bars and creative programming come together in a lively Westlands setting.","/images/business.jpg","https://nairobistreetkitchen.com/","food"),
  venue("golden-spot","Golden Spot","Kenyan cuisine","Nairobi","Kenyan food and live rhumba are central to this restaurant’s proposition; check its current programme before going.","/images/food.jpg","https://www.gspot.co.ke/","food"),
  venue("sankara-graze","Graze at Sankara","Steakhouse","Westlands","A dinner-focused steakhouse within Sankara Nairobi, with a live-fire kitchen and terrace.","/images/business.jpg","https://sankara.com/","food"),
  venue("jiko","Jiko at Tribe","Contemporary African","Gigiri","Tribe Hotel’s restaurant draws on regional ingredients and contemporary presentation.","/images/craft.jpg","https://www.tribe-hotel.com/","food"),
  venue("craft","Craft at Best Western Premier","All-day dining","Westlands","An all-day restaurant in Westlands serving continental dishes alongside local ingredients.","/images/food.jpg","https://www.bwpremierwestlands.com/","food"),
  venue("upepo","Upepo at Kwetu","East African fusion","Gigiri","A rooftop restaurant at Kwetu Nairobi with East African influences and views across the city’s northern edge.","/images/business.jpg","https://www.kwetu-nairobi.com/","food"),
];

export const hotels: Card[] = [
  venue("villa-rosa-kempinski","Villa Rosa Kempinski","Luxury hotel","Chiromo Road","A full-service city hotel positioned between the centre and Westlands, with dining, wellness and meeting facilities.","/images/business.jpg","https://www.kempinski.com/en/villa-rosa-kempinski","hotel"),
  venue("sankara-nairobi","Sankara Nairobi","Contemporary hotel","Westlands","A contemporary Westlands hotel for leisure and business stays, with dining and meeting spaces.","/images/business.jpg","https://sankara.com/","hotel"),
  venue("tribe-hotel","Tribe Hotel","Design-led hotel","Gigiri","A design-conscious hotel beside Village Market, convenient for Gigiri’s diplomatic and institutional district.","/images/craft.jpg","https://www.tribe-hotel.com/","hotel"),
  venue("hemingways-nairobi","Hemingways Nairobi","Boutique hotel","Karen","A low-rise hotel in Karen with gardens, suites, dining and easy access to several southern Nairobi attractions.","/images/karura.jpg","https://www.hemingways-collection.com/nairobi/","hotel"),
  venue("giraffe-manor","Giraffe Manor","Conservation-linked stay","Lang’ata","A distinctive hospitality experience associated with giraffe conservation; booking conditions should be checked directly.","/images/hero.jpg","https://www.thesafaricollection.com/properties/giraffe-manor/","hotel"),
  venue("fairmont-the-norfolk","Fairmont The Norfolk","Heritage hotel","Central Nairobi","A historic city hotel with gardens and meeting spaces near several cultural institutions.","/images/business.jpg","https://www.fairmont.com/norfolk-hotel-nairobi/","hotel"),
  venue("sarova-stanley","Sarova Stanley","Heritage hotel","Central Business District","A longstanding central Nairobi hotel convenient for city-centre business and heritage routes.","/images/business.jpg","https://www.sarovahotels.com/stanley-nairobi/","hotel"),
  venue("radisson-blu-upper-hill","Radisson Blu Hotel Nairobi Upper Hill","Business hotel","Upper Hill","A large business-oriented hotel in Upper Hill with conference, dining and wellness facilities.","/images/business.jpg","https://www.radissonhotels.com/en-us/hotels/radisson-blu-nairobi-upper-hill","hotel"),
  venue("jw-marriott-nairobi","JW Marriott Hotel Nairobi","High-rise hotel","Westlands","A high-rise hotel in Westlands serving business, conference and leisure travellers.","/images/business.jpg","https://www.marriott.com/en-us/hotels/nbojw-jw-marriott-hotel-nairobi/overview/","hotel"),
  venue("kwetu-nairobi","Kwetu Nairobi","Garden hotel","Gigiri","A Curio Collection hotel near Karura Forest with multiple dining spaces and a garden setting.","/images/karura.jpg","https://www.kwetu-nairobi.com/","hotel"),
  venue("best-western-premier-westlands","Best Western Premier Westlands","Business hotel","Westlands","A Westlands hotel with guestrooms, meeting facilities, dining and a rooftop lounge.","/images/business.jpg","https://www.bwpremierwestlands.com/","hotel"),
  venue("four-points-hurlingham","Four Points by Sheraton Nairobi Hurlingham","City hotel","Hurlingham","A centrally placed hotel convenient for Kilimani, Upper Hill and nearby business districts.","/images/business.jpg","https://www.marriott.com/en-us/hotels/nbofp-four-points-nairobi-hurlingham/overview/","hotel"),
];

export const nightlife: Card[] = [
  venue("koda","KODA Nairobi","Nightclub and music venue","Nairobi","A two-room nightclub and events venue with a programme-led approach to electronic and contemporary music.","/images/business.jpg","https://www.kodanairobi.com/","nightlife"),
  venue("ciel","Ciel Nairobi","Nightlife and events","Nairobi","A contemporary nightlife venue with an evolving calendar; confirm event details and entry policy directly.","/images/business.jpg","https://cielnairobi.com/","nightlife"),
  venue("the-alchemist","The Alchemist","Music, food and culture","Westlands","An open-air creative and social venue with food, events, music and independent retail.","/images/craft.jpg","https://alchemist254.com/","nightlife"),
  venue("nairobi-street-kitchen-night","Nairobi Street Kitchen after dark","Food, bars and music","Westlands","A multi-space evening option with rotating food, drinks and entertainment programming.","/images/market.jpg","https://nairobistreetkitchen.com/","nightlife"),
  venue("sankara-sarabi","Sarabi Rooftop Bar","Rooftop bar","Westlands","A rooftop setting at Sankara Nairobi; review the current entertainment calendar and entry arrangements.","/images/business.jpg","https://sankara.com/","nightlife"),
  venue("asiatic-rooftop","Asiatic Rooftop Lounge","Rooftop lounge","Westlands","A rooftop lounge at Best Western Premier Westlands with drinks and city views.","/images/business.jpg","https://www.bwpremierwestlands.com/","nightlife"),
];

export const shopping: Card[] = [
  venue("village-market","Village Market","Shopping and culture","Gigiri","A large mixed-use destination with Kenyan and international retail, dining, services and regular cultural programming.","/images/craft.jpg","https://villagemarket-kenya.com/","shopping"),
  venue("westgate","Westgate Shopping Mall","Shopping centre","Westlands","Retail, dining and entertainment in Westlands; consult the centre’s directory before visiting.","/images/business.jpg","https://www.westgate.co.ke/","shopping"),
  venue("two-rivers","Two Rivers","Shopping and entertainment","Limuru Road","A large retail and leisure destination north of the city centre.","/images/business.jpg","https://tworivers.co.ke/","shopping"),
  venue("sarit","Sarit","Shopping centre","Westlands","One of Nairobi’s established shopping centres, with retail, dining, services and event space.","/images/business.jpg","https://sarityourcity.com/visit-info/","shopping"),
  venue("garden-city","Garden City","Shopping and leisure","Thika Road","A mixed-use shopping and leisure destination serving northern Nairobi.","/images/business.jpg","https://gardencity-nairobi.com/","shopping"),
  venue("galleria","Galleria Mall","Shopping centre","Lang’ata Road","A convenient shopping stop for visitors exploring Karen and Lang’ata.","/images/market.jpg","https://galleria.co.ke/","shopping"),
  venue("maasai-market","Maasai Market","Craft market","Rotating locations","A rotating open-air market for Kenyan craft and gifts. Confirm the current location and buy directly with respect.","/images/market.jpg",countySource,"shopping"),
  venue("kazuri-shop","Kazuri Beads shop","Kenyan craft","Karen","Shop ceramic jewellery and homeware directly from a Nairobi maker.","/images/craft.jpg","https://www.kazuri.co.ke/pages/contact","shopping"),
];

type Destination = { slug:string; title:string; intro:string; image:string; time:string; sourceName:string; sourceUrl:string; credit:string };
export const destinations: Destination[] = [
  ["nairobi","Nairobi","Wildlife, culture, food, design and global business meet in Kenya’s capital.","/images/destinations/nairobi.jpg","You are here","Nairobi City County",countySource,"Lmwangi · CC BY-SA 3.0"],
  ["mombasa","Mombasa","An Indian Ocean city shaped by Swahili heritage, historic architecture, trade and the sea.","/images/destinations/mombasa.png","Rail, air or road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Nairobi123 · CC BY-SA 3.0"],
  ["kisumu","Kisumu","A lively lakeside city with distinctive cuisine, cultural experiences and western Kenya connections.","/images/destinations/kisumu.jpg","Air or road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","DEMOSH · CC BY 2.0"],
  ["nakuru","Nakuru","A Rift Valley city and useful base for lake country, landscapes, farms and wildlife areas.","/images/destinations/nakuru.png","Road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Nairobi123 · CC BY-SA 3.0"],
  ["naivasha","Naivasha","A lakeside town close to Nairobi, known for birdlife, flower farms and access to Rift Valley landscapes.","/images/destinations/naivasha.jpg","Road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Letherian3 · CC BY-SA 4.0"],
  ["nanyuki","Nanyuki","A highland town with views towards Mount Kenya and links to conservation landscapes and the Laikipia region.","/images/destinations/nanyuki.jpg","Road or air from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Martin Kithinji Mwirigi · CC BY-SA 4.0"],
  ["malindi","Malindi","A coastal town where beaches, marine life, Swahili culture and layers of history invite a slower pace.","/images/destinations/malindi.jpg","Air or road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Mtl1969 · Public domain"],
  ["lamu","Lamu","A historic Swahili town and archipelago best approached with time, cultural awareness and light-footed travel.","/images/destinations/lamu.jpg","Air from Nairobi, then local transfer","Kenya Tourism Board","https://magicalkenya.com/","Magnus Kjaergaard · CC BY 3.0"],
  ["diani","Diani","A south-coast destination for beach time, marine activities and a wider Kwale County journey.","/images/destinations/diani.jpg","Air, rail or road via the coast","Kenya Tourism Board","https://magicalkenya.com/","FredD · CC BY-SA 3.0"],
  ["watamu","Watamu","A coastal destination associated with marine conservation, beaches and nearby cultural landscapes.","/images/destinations/watamu.jpg","Air or road via Malindi","Kenya Tourism Board","https://magicalkenya.com/","Useslip · CC BY-SA 3.0"],
  ["eldoret","Eldoret","A fast-growing highland city and gateway to Kenya’s North Rift, athletics culture and agricultural landscapes.","/images/destinations/nanyuki.jpg","Air or road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Regional image: Martin Kithinji Mwirigi · CC BY-SA 4.0"],
  ["nyeri","Nyeri","A central highlands town with connections to Mount Kenya, Aberdare landscapes and important heritage sites.","/images/destinations/nyeri.jpg","Road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Rotsee2 · CC BY-SA 3.0"],
  ["machakos","Machakos","An eastern highlands city near Nairobi with rolling landscapes, local culture and regional business connections.","/images/destinations/machakos.jpg","Road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Dysmas Titus · CC BY-SA 4.0"],
  ["kericho","Kericho","A green highland town associated with tea country, cool air and routes into western Kenya.","/images/destinations/kakamega.jpg","Road or air connection from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Regional image: Nao Iizuka · CC BY 2.0"],
  ["kakamega","Kakamega","A western Kenya city and gateway to Kakamega Forest’s distinctive rainforest ecosystem.","/images/destinations/kakamega.jpg","Air or road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Nao Iizuka · CC BY 2.0"],
  ["narok","Narok","A regional centre on routes from Nairobi towards Maasai Mara landscapes and communities.","/images/destinations/narok.jpg","Road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Naikumi · CC BY-SA 4.0"],
  ["embu","Embu","A central Kenya town with agricultural heritage and access to the eastern side of Mount Kenya.","/images/destinations/nanyuki.jpg","Road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Regional image: Martin Kithinji Mwirigi · CC BY-SA 4.0"],
  ["meru","Meru","A lively town connected to Mount Kenya’s north-eastern landscapes and routes towards Meru National Park.","/images/destinations/nanyuki.jpg","Road or air connection from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Regional image: Martin Kithinji Mwirigi · CC BY-SA 4.0"],
  ["voi","Voi","A transport town between Nairobi and the coast, closely connected to Tsavo landscapes.","/images/destinations/voi.jpg","Rail or road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","MakotoQuestions · CC BY-SA 3.0"],
  ["kitale","Kitale","A fertile western highlands town and base for exploring farms, museums and routes towards Mount Elgon.","/images/destinations/kakamega.jpg","Air or road from Nairobi","Kenya Tourism Board","https://magicalkenya.com/","Regional image: Nao Iizuka · CC BY 2.0"],
].map(x => ({ slug:x[0],title:x[1],intro:x[2],image:x[3],time:x[4],sourceName:x[5],sourceUrl:x[6],credit:x[7] } as Destination));

const storyData = [
  ["first-time-guide","Nairobi Travel Guide for First-Time Visitors","Travel guide","A clear introduction to neighbourhoods, transport, planning and the city’s many different rhythms."],
  ["best-things-to-do","The Best Things to Do in Nairobi, Thoughtfully Chosen","Things to do","Wildlife, museums, food, art, green space and city life—without trying to force everything into one day."],
  ["nairobi-in-24-hours","How to Spend 24 Hours in Nairobi","Itinerary","A practical one-day plan pairing an early wildlife experience with culture, food and an evening view."],
  ["long-weekend","A Long Weekend in Nairobi","Itinerary","Three balanced days that leave space for traffic, conversation and changing plans."],
  ["between-meetings","Nairobi Between Meetings","Business travel","Useful ways to experience the city around a demanding conference or corporate schedule."],
  ["where-to-stay","Where to Stay in Nairobi: A Neighbourhood-Led Guide","Hotels","Choose a base around your priorities: business, diplomacy, nightlife, museums, family time or onward travel."],
  ["neighbourhoods","Nairobi Neighbourhoods: Where to Begin","City guide","An orientation to Westlands, Karen, Kilimani, Gigiri, Parklands, the centre and beyond."],
  ["national-park-guide","Nairobi National Park: Planning a City Safari","Wildlife","What to consider before a skyline-framed wildlife experience close to the capital."],
  ["karura-guide","A Practical Guide to Karura Forest","Nature","Routes, pace, weather and responsible ways to enjoy one of Nairobi’s defining green spaces."],
  ["food-guide","What to Eat in Nairobi and Where to Start","Food","Kenyan staples, regional influences, modern restaurants, coffee and the pleasure of following local appetite."],
  ["kenyan-breakfast","A Nairobi Breakfast Worth Waking Up For","Food","A guide to tea, coffee, mandazi, eggs, sausages, fruit and the city’s many ways to begin a day."],
  ["nightlife-guide","Nairobi Nightlife: Music, Rooftops and Late Conversations","Nightlife","How to choose a night out, check the programme, plan transport and keep the evening flexible."],
  ["shopping-guide","Shopping in Nairobi: Design, Craft and Contemporary Kenya","Shopping","Markets, maker studios, Kenyan fashion, homeware and retail destinations across the city."],
  ["art-galleries","A Guide to Nairobi’s Contemporary Art","Culture","Galleries, artist-led spaces and ways to engage with the city’s visual culture respectfully."],
  ["museums-heritage","Nairobi Museums and the Stories They Hold","Culture","Natural history, railway heritage, national memory and the places that help explain the capital."],
  ["family-nairobi","Nairobi with Children: Flexible Days for Families","Family","Wildlife, museums, gardens and realistic pacing for a city break with children."],
  ["accessible-nairobi","Planning an Accessible Visit to Nairobi","Accessibility","Questions to ask, details to confirm and how to build alternatives into a city itinerary."],
  ["responsible-nairobi","Responsible Ways to Experience Nairobi","Responsible travel","Support local enterprise, respect privacy, reduce waste and approach wildlife with care."],
  ["airport-transfer","From Nairobi Airport to the City: What to Plan","Practical guide","How to think about arrival times, trusted transfers, traffic and the first hours of your stay."],
  ["getting-around","Getting Around Nairobi Without Losing the Day","Practical guide","Transport choices, traffic-aware planning and the value of grouping stops by area."],
  ["weather-packing","Nairobi Weather and What to Pack","Practical guide","Layers, rain protection, sun care and clothing that works across meetings, trails and evenings."],
  ["nairobi-mombasa","From Nairobi to Mombasa: Air, Rail and Road","Nairobi and beyond","How Kenya’s capital connects with the coast and what to verify before choosing a route."],
  ["rift-valley","From Nairobi to the Rift Valley","Nairobi and beyond","A road journey into lake country, escarpment views and landscapes that invite more time."],
  ["doing-business","Doing Business in Nairobi: A Practical Introduction","Business","Context for meetings, locations, introductions, timing and a productive first business visit."],
  ["startup-ecosystem","Inside Nairobi’s Startup and Innovation Ecosystem","Innovation","Founders, research, capital, hubs and the networks that make Nairobi an influential technology centre."],
  ["conference-guide","Planning a Conference or Delegation in Nairobi","Business events","Venue geography, accommodation, transfers, local programming and responsible partner selection."],
  ["market-entry","Using Nairobi as a Base for East African Market Entry","Investment","Questions for companies assessing Nairobi as a regional base—without unsupported statistics or shortcuts."],
  ["creative-economy","The People Building Nairobi’s Creative Economy","Creative industries","Designers, musicians, filmmakers, artists and independent businesses shaping contemporary city culture."],
  ["green-city","Nairobi’s Green Spaces and the Work of Keeping Them Green","Sustainability","Forest, park and conservation stories that connect urban life with environmental responsibility."],
  ["slow-sunday","How to Spend a Slow Sunday in Nairobi","City life","Coffee, green space, an easy lunch and somewhere to hear the city exhale."],
  ["coffee-culture","A Guide to Nairobi’s Coffee Culture","Food","From Kenyan origins to contemporary roasters and neighbourhood cafés."],
  ["fashion-design","Where to Find Nairobi Fashion and Independent Design","Shopping","A starting point for buying from Kenyan designers and understanding the ideas behind the work."],
  ["business-lunch","Where to Plan a Business Lunch in Nairobi","Business travel","Choose by location, privacy, timing and dietary needs—not simply by distance on a map."],
  ["layover","Making the Most of a Nairobi Layover","Travel guide","What is realistic between flights and when it is wiser to stay close to the airport."],
  ["five-days","Five Days in Nairobi and Beyond","Itinerary","A layered city stay followed by one carefully chosen continuation into Kenya."],
  ["innovation-meetings","Where Nairobi’s Innovation Community Meets","Innovation","A guide to hubs, universities, events and the value of warm local introductions."],
];

export const stories: Card[] = storyData.map((x,i) => ({
  slug:x[0],title:x[1],eyebrow:x[2],summary:x[3],image:images[i%images.length],location:"Nairobi",
  category:x[2],contentType:"story",href:`/stories/${x[0]}`,sourceName:"Visit Nairobi editorial desk",
  sourceUrl:countySource,lastReviewed:reviewed,status:"Published",
}));

export const allDirectoryItems = [...experiences,...foodVenues,...hotels,...nightlife,...shopping];

export const mediaCredits = [
  "Primary hero: Alex Mbogoh / Wikimedia Commons, CC BY-SA 4.0",
  "Karura Forest: Ninara / Wikimedia Commons, CC BY 2.0",
  "Kenyan breakfast: Bahnfrend / Wikimedia Commons, CC BY-SA 4.0",
  "Jewellery: Laurakomanga / Wikimedia Commons, CC BY-SA 4.0",
  "Nairobi skyline: Lebu Ayiga / Wikimedia Commons, CC BY-SA 4.0",
  "Maasai Market: khym54 / Wikimedia Commons, CC BY 2.0",
  "Giraffe Manor: Push the button / Wikimedia Commons, CC BY-SA 3.0",
  "Nairobi National Museum: Karl Ragnar Gjertsen / Wikimedia Commons, CC BY-SA 3.0",
  "Nairobi Arboretum: Ahero dala / Wikimedia Commons, CC BY-SA 4.0",
  "KICC interior: IndicibleEspace / Wikimedia Commons, CC BY-SA 4.0",
  "Nairobi Railway Museum: Alexander Leisser / Wikimedia Commons, CC BY-SA 4.0",
  "Bomas of Kenya: SteveRwanda / Wikimedia Commons, CC BY-SA 3.0",
  ...destinations.map(x => `${x.title}: ${x.credit}`),
];
