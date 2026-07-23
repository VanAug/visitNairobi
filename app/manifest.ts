import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name:"Visit Nairobi", short_name:"Nairobi", description:"Your Gateway to Africa", start_url:"/", display:"standalone", background_color:"#FCFBF7", theme_color:"#2833E8" };
}
