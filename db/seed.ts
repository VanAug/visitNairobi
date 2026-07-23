import { destinations, experiences, foodVenues, hotels, nightlife, shopping, stories } from "../app/expanded-content";

const publish = (collection:string, item: Record<string, unknown>) => ({
  collection,
  title:String(item.title),
  slug:String(item.slug),
  status:"published",
  verificationStatus:"source-reviewed",
  payload:item,
});

export const seedContent = [
  ...experiences.map(item => publish("experiences", item)),
  ...foodVenues.map(item => publish("food-and-drink", item)),
  ...hotels.map(item => publish("accommodation", item)),
  ...nightlife.map(item => publish("nightlife", item)),
  ...shopping.map(item => publish("shopping", item)),
  ...destinations.map(item => publish("destinations", item)),
  ...stories.map(item => publish("stories", item)),
];
