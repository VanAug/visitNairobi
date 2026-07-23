import { AccountManager, CookieNotice, Directory, MobileMenu, SaveButton, SmartForm, ItineraryBuilder, AdminWorkflow } from "./client";
import { itineraries, neighbourhoods, practical, sectors, type Card } from "./content";
import { allDirectoryItems, destinations, experiences, foodVenues, hotels, mediaCredits, nightlife, shopping, stories } from "./expanded-content";

const primaryNav = [
  ["Discover","/discover"],["Things to Do","/things-to-do"],["Where to Go","/destinations"],["Events","/events"],
  ["Business & Investment","/business"],["Stories","/stories"],["Plan Your Visit","/plan"],["Partner With Us","/partner"],
];

export function Shell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={dark ? "site dark-site" : "site"}>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Visit Nairobi home"><img src="/brand/logo.svg" alt="Visit Nairobi"/></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{primaryNav.map(([label,href]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="utility"><a href="/search" aria-label="Search">Search</a><a href="/account">Saved <span className="utility-dot"/></a><a href="/signin">Sign in</a><button aria-label="Language, English">EN</button><MobileMenu/></div>
    </header>
    <main id="main">{children}</main>
    <Footer/>
    <CookieNotice/>
  </div>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-lead"><a className="brand footer-brand" href="/" aria-label="Visit Nairobi home"><img src="/brand/logo-white.svg" alt="Visit Nairobi"/></a><h2>Your gateway<br/>starts here.</h2><a className="circle-link" href="/discover" aria-label="Explore Nairobi">↗</a></div>
    <div className="footer-grid">
      <div><h3>Explore</h3><a href="/things-to-do">Things to do</a><a href="/food-and-drink">Food and drink</a><a href="/hotels">Hotels</a><a href="/nightlife">Nightlife</a><a href="/shopping">Shopping</a><a href="/destinations">Destinations</a><a href="/events">Events</a><a href="/stories">Stories</a></div>
      <div><h3>Plan</h3><a href="/plan">Travel guidance</a><a href="/accessibility">Accessibility</a><a href="/responsible-travel">Responsible travel</a><a href="/faqs">FAQs</a></div>
      <div><h3>Work together</h3><a href="/business">Business & investment</a><a href="/partner">Partner with us</a><a href="/submit-a-listing">Submit a listing</a><a href="/contact">Contact</a></div>
      <div><h3>Stay close</h3><SmartForm kind="Newsletter" compact/></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Visit Nairobi · Demonstration build</span><span><a href="/privacy">Privacy</a><a href="/cookies">Cookies</a><a href="/terms">Terms</a><a href="/editorial-policy">Editorial policy</a></span></div>
    <details className="credits"><summary>Photography credits & licences</summary><ul>{mediaCredits.map(x => <li key={x}>{x}</li>)}</ul></details>
  </footer>;
}

export function HomePage() {
  return <Shell>
    <section className="hero">
      <img src="/images/hero.jpg" alt="A giraffe in Nairobi National Park with Nairobi’s skyline beyond the grasslands"/>
      <div className="hero-shade"/>
      <div className="hero-copy"><p>Welcome to Nairobi</p><h1>Your gateway to<br/>Africa starts here.</h1><div className="hero-bottom"><p>Discover a capital where a morning game drive, a world-class meeting, an unforgettable meal, and a night of music can all belong to the same day.</p><div><a className="button light" href="/discover">Explore Nairobi</a><a className="text-link light-link" href="/plan">Plan your visit →</a></div></div></div>
      <div className="hero-shape" aria-hidden="true"><span/><span/></div>
      <p className="image-credit">Alex Mbogoh · CC BY-SA 4.0</p>
    </section>

    <section className="manifesto section"><p className="kicker">A capital in full colour</p><div><h2>One city.<br/><em>Many worlds.</em></h2><p>Nairobi brings nature, culture, enterprise, and everyday city energy into remarkable proximity. Meet wildlife against a skyline, discover new voices in art and design, taste a food scene shaped by Kenya and the wider world, and connect with one of Africa’s most dynamic business communities.</p></div><div className="motif" aria-hidden="true"><i/><b/><span>✦</span></div></section>

    <section className="feature-band"><div className="section feature-inner"><div className="section-head light-text"><div><p className="kicker">Editor’s picks</p><h2>Begin with<br/>something vivid.</h2></div><a href="/things-to-do">View all experiences →</a></div><div className="feature-scroll">{experiences.slice(0,4).map((x,i) => <article className={`feature-card fc-${i}`} key={x.slug}><a href={`/experiences/${x.slug}`}><img src={x.image} alt=""/><div><p>{x.eyebrow}</p><h3>{x.title}</h3><span>{String(i+1).padStart(2,"0")}</span></div></a></article>)}</div></div></section>

    <section className="itineraries section"><div className="section-head"><div><p className="kicker">Follow a good idea</p><h2>Days designed<br/>around you.</h2></div><p>From one clear day to a longer Kenyan journey, start with a shape and make it your own.</p></div><div className="itinerary-list">{itineraries.map((x,i) => <a href={`/trips/${x[0].toLowerCase().replaceAll(/[^a-z0-9]+/g,"-")}`} key={x[0]}><span>{String(i+1).padStart(2,"0")}</span><h3>{x[0]}</h3><p>{x[1]}</p><b>↗</b></a>)}</div></section>

    <section className="business-split"><div className="business-image"><img src="/images/business.jpg" alt="Nairobi skyline in warm evening light"/><span>Meet. Move. Connect.</span></div><div className="business-copy"><p className="kicker">Business Nairobi</p><h2>Come for the meeting. Connect with a continent.</h2><p>Nairobi is a regional centre for business, diplomacy, technology, research, and international development. We help organisations and delegates make more of their time through curated programmes, trusted local connections, accommodation support, excursions and event experiences.</p><div><a className="button dark" href="/business">Explore Business Nairobi</a><a className="text-link" href="/business#enquiry">Request a programme →</a></div></div></section>

    <section className="events-block section"><div className="event-title"><p className="kicker">What’s on</p><h2>The city,<br/><em>in motion.</em></h2><p>Verified upcoming dates will appear here as editors publish them. Until then, explore dependable ways into Nairobi’s cultural life.</p><a className="button" href="/events">Explore all events</a></div><div className="event-evergreen"><article className="orange"><span>Any weekend</span><h3>Find live sound</h3><p>Start with verified venue calendars and artist pages.</p></article><article className="blue"><span>At your pace</span><h3>Meet the makers</h3><p>Explore markets, studios and independent design.</p></article><article className="yellow"><span>With the family</span><h3>Make a green day</h3><p>Pair a gentle trail with an easy city lunch.</p></article></div></section>

    <section className="partner-cta"><div className="arches" aria-hidden="true"><i/><i/><i/></div><div><p className="kicker">Together for Nairobi</p><h2>Help shape how the world experiences Nairobi.</h2><p>We collaborate with tourism businesses, creators, cultural organisations, venues, event organisers, public institutions and global brands to grow Nairobi’s visitor economy responsibly.</p><a className="button light" href="/partner">Partner with Visit Nairobi</a></div></section>

    <section className="newsletter section"><div><p className="kicker">Stay curious</p><h2>Nairobi,<br/>delivered.</h2></div><div><p>New places, useful travel guidance, city stories, and ideas for your next visit—sent thoughtfully to your inbox.</p><SmartForm kind="Newsletter" compact/></div></section>
  </Shell>;
}

function PageHero({ eyebrow, title, body, image, tone = "blue" }: { eyebrow: string; title: string; body: string; image?: string; tone?: string }) {
  return <section className={`page-hero ${tone} ${image ? "with-image" : ""}`}>
    {image && <img src={image} alt=""/>}<div className="page-hero-copy"><p>{eyebrow}</p><h1>{title}</h1><div><p>{body}</p><span className="shape-star">✦</span></div></div>
  </section>;
}

function ListingPage({ type = "experiences" }: { type?: string }) {
  const titleMap: Record<string,string> = { experiences:"Things to do", stories:"Stories from the city", events:"What’s on in Nairobi", food:"Places to eat", hotel:"Places to stay", nightlife:"Nairobi after dark", shopping:"Shopping in Nairobi" };
  const itemMap: Record<string,Card[]> = { experiences:allDirectoryItems, stories, events:experiences, food:foodVenues, hotel:hotels, nightlife, shopping };
  const items = itemMap[type] || experiences;
  return <Shell><PageHero eyebrow={type === "stories" ? "Read Nairobi" : type === "events" ? "Make a date" : "Find your way in"} title={titleMap[type]} body={type === "events" ? "Verified dates, useful details and ideas for discovering the city. When no upcoming event is published, evergreen discoveries take their place." : "Search by interest, neighbourhood and access needs. Every listing includes a named source for current details."} tone={type === "stories" ? "red" : type === "events" ? "orange" : "blue"}/><Directory items={items} title={titleMap[type]}/></Shell>;
}

function ExperienceDetail({ item }: { item: Card }) {
  return <Shell>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":item.contentType === "hotel" ? "Hotel" : item.contentType === "food" ? "Restaurant" : "TouristAttraction",name:item.title,description:item.summary,image:item.image,address:{ "@type":"PostalAddress",addressLocality:item.location,addressRegion:"Nairobi",addressCountry:"KE" },url:item.sourceUrl})}}/>
    <article className="detail">
      <div className="detail-hero"><img src={item.image} alt=""/><div><p>{item.eyebrow} · {item.location}</p><h1>{item.title}</h1><p>{item.summary}</p><SaveButton id={item.slug}/></div></div>
      <div className="detail-layout section"><aside><h2>Quick facts</h2><dl><div><dt>Area</dt><dd>{item.location}</dd></div><div><dt>Good for</dt><dd>{item.family ? "Families, curious travellers" : "Independent travellers, groups"}</dd></div><div><dt>Accessibility</dt><dd>{item.accessible ? "Access information is available; confirm the arrangements you need." : "Contact the venue for current access details."}</dd></div><div><dt>Information reviewed</dt><dd>{item.lastReviewed || "23 July 2026"}</dd></div></dl><a className="button" href="/contact">Make an enquiry</a></aside>
      <div className="prose"><h2>A closer look</h2><p>{item.summary}</p><p>Nairobi rewards a little planning and a little flexibility. Confirm current opening arrangements, reservations and admission conditions directly with the venue, allow for changing journey times and ask before photographing people.</p><h2>Plan with confidence</h2><p>Use the official source below for current hours, prices, contact details and booking conditions. Visit Nairobi does not reproduce changeable commercial information when the venue can provide it more accurately.</p><div className="notice"><strong>Checked against a named source</strong><p>Source: <a href={item.sourceUrl || "https://nairobi.go.ke/explore-nairobi"} target="_blank" rel="noreferrer">{item.sourceName || "Nairobi City County"} ↗</a> · Last reviewed: {item.lastReviewed || "23 July 2026"}</p></div><h2>Location and directions</h2><div className="map-panel small"><p><strong>{item.location}, Nairobi</strong><br/>Plan the route in advance and confirm the entrance or meeting point with the venue. Written location information accompanies every configured map.</p></div><a className="report-link" href={`/report?item=${item.slug}`}>Report outdated information →</a></div></div>
    </article>
    <section className="related section"><div className="section-head"><div><p className="kicker">Keep exploring</p><h2>Nearby in spirit.</h2></div></div><MiniCards items={experiences.filter(x => x.slug !== item.slug).slice(0,3)}/></section>
  </Shell>;
}

function MiniCards({ items }: { items: Card[] }) {
  return <div className="mini-cards">{items.map(x => <a href={x.href || `/experiences/${x.slug}`} key={x.slug}><img src={x.image} alt=""/><p>{x.eyebrow}</p><h3>{x.title}</h3></a>)}</div>;
}

function DestinationsPage() {
  return <Shell><PageHero eyebrow="Nairobi and beyond" title="Start in the capital. Keep going." body="Twenty connected Kenyan cities and destinations for continuing a journey from Nairobi. Confirm current travel times and connections before departure." tone="yellow"/><section className="destination-list section">{destinations.map((x,i) => <a href={`/destinations/${x.slug}`} key={x.slug}><span>{String(i+1).padStart(2,"0")}</span><img src={x.image} alt={`${x.title} destination view`}/><div><p>{x.time}</p><h2>{x.title}</h2><p>{x.intro}</p></div><b>↗</b></a>)}</section></Shell>;
}

function DestinationDetail({ slug }: { slug: string }) {
  const d = destinations.find(x => x.slug === slug) || destinations[0];
  const nairobi = d.slug === "nairobi";
  return <Shell><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"TouristDestination",name:d.title,description:d.intro,image:d.image,url:d.sourceUrl})}}/><PageHero eyebrow="Destination" title={nairobi ? "Nairobi: city energy, naturally." : d.title} body={d.intro} image={d.image} tone="ink"/>
    <section className="destination-intro section"><div><p className="kicker">{d.time}</p><h2>{nairobi ? "Curiosity is the best way in." : `Continue to ${d.title}.`}</h2></div><p>{nairobi ? "Nairobi rewards curiosity, whether you are here for a weekend, a conference, a new opportunity, or the beginning of a longer Kenyan journey." : "Highlights, accommodation, experiences, travel connections and responsible guidance are managed here as verified editorial content."}</p></section>
    {nairobi ? <><section className="section"><div className="section-head"><div><p className="kicker">Know the city</p><h2>Neighbourhoods,<br/>not boundaries.</h2></div><p>These are useful introductions, not rigid definitions. Nairobi’s character changes block by block.</p></div><div className="neighbourhoods">{neighbourhoods.map((x,i) => <article key={x[0]}><span>{String(i+1).padStart(2,"0")}</span><h3>{x[0]}</h3><p>{x[1]}</p><a href={`/neighbourhoods/${x[0].toLowerCase().replaceAll(/[^a-z0-9]+/g,"-")}`}>Explore area →</a></article>)}</div></section><Directory items={experiences} title="Essential Nairobi"/></> :
      <section className="section content-panels">{["Highlights","Suggested itineraries","Where to stay","Travel connections","Responsible travel"].map((x,i) => <article key={x}><p className="kicker">{i === 3 ? d.time : "Plan with local context"}</p><h2>{x}</h2><p>{i === 0 ? d.intro : i === 1 ? `Build time in ${d.title} around one or two priorities, then leave space for local recommendations and changing conditions.` : i === 2 ? "Choose accommodation by location, transport needs and verified accessibility information." : i === 3 ? "Check current timetables and journey conditions with the transport provider before departure." : "Support local enterprise, respect community life and follow environmental guidance."}</p>{i === 3 && <a href={d.sourceUrl} target="_blank" rel="noreferrer">Official destination source ↗</a>}</article>)}</section>}
  </Shell>;
}

function StoryDetail({ item }: { item: Card }) {
  const business = /Business|Innovation|Investment|conference/i.test(`${item.category} ${item.title}`);
  const planning = /guide|itinerary|travel|airport|weather|getting/i.test(`${item.category} ${item.title}`);
  return <Shell><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"Article",headline:item.title,description:item.summary,image:item.image,dateModified:"2026-07-23",author:{"@type":"Organization",name:"Visit Nairobi"},publisher:{"@type":"Organization",name:"Visit Nairobi"}})}}/><article className="story-detail">
    <header className="story-header"><p className="kicker">{item.eyebrow}</p><h1>{item.title}</h1><p>{item.summary}</p><div><span>Visit Nairobi editorial desk</span><span>Updated {item.lastReviewed}</span><span>7 minute read</span></div></header>
    <figure className="story-image"><img src={item.image} alt="A Nairobi scene connected to this story"/><figcaption>Visit Nairobi photography library. Full credit and licence information appears in the footer.</figcaption></figure>
    <div className="story-layout section"><aside><p className="kicker">In this story</p><a href="#begin">Where to begin</a><a href="#plan">Plan the details</a><a href="#context">Local context</a><a href="#next">What to read next</a><SaveButton id={`story:${item.slug}`}/></aside><div className="prose">
      <p className="standfirst">{item.summary} The best Nairobi plans combine a clear purpose with enough room for the city to surprise you.</p>
      <h2 id="begin">{business ? "Begin with the purpose of the visit" : planning ? "Begin with time, distance and one good priority" : "Begin with curiosity"}</h2>
      <p>{business ? "Nairobi’s business districts, institutions, hotels and innovation spaces are spread across several parts of the city. Start by mapping the people you need to meet and the neighbourhoods involved, then choose accommodation and transport around that pattern." : "Nairobi is not a city to reduce to a checklist. Choose a strong anchor—wildlife, a museum, a neighbourhood, a meal or a meeting—and shape the day around it. Group nearby stops together and treat travel time as part of the plan."}</p>
      <p>{business ? "A warm introduction can be more useful than a crowded schedule. Share your objectives clearly, allow realistic time between meetings and ask local partners about access procedures before arrival." : "The city’s contrasts are most rewarding when given space: forest and skyline, heritage and new design, a quiet coffee and a late performance. Check current details directly with each venue before setting out."}</p>
      <h2 id="plan">{planning ? "Build a plan that can bend" : "Plan the useful details"}</h2>
      <p>Opening times, event programmes, entry conditions, traffic and weather can change. Use the direct source links in Visit Nairobi listings, reserve where required and keep one alternative nearby. Travellers with access requirements should contact venues in advance and describe the specific support they need.</p>
      <h2 id="context">{business ? "Read the market with local partners" : "Let local context lead"}</h2>
      <p>Support Kenyan-owned businesses and independent makers, ask before photographing people, and avoid treating neighbourhoods as spectacles. For wildlife and green spaces, follow conservation guidance and keep a respectful distance. For business decisions, use current primary sources and professional advice rather than unverified statistics.</p>
      <div className="notice"><strong>Editorial standard</strong><p>This article was reviewed on {item.lastReviewed}. Changeable facts should always be reconfirmed through the linked venue or official authority.</p></div>
      <h2 id="next">Continue exploring</h2><p>Use the related listings below to turn this story into a practical itinerary, or save it to your Visit Nairobi account for later.</p>
    </div></div>
  </article><section className="related section"><div className="section-head"><div><p className="kicker">More from the city</p><h2>Read next.</h2></div></div><MiniCards items={stories.filter(x => x.slug !== item.slug).slice(0,3)}/></section></Shell>;
}

function BusinessPage() {
  return <Shell dark><PageHero eyebrow="Business & investment" title="Nairobi is open to ideas." body="Nairobi connects East Africa to the world. Its strength comes from an energetic private sector, a growing technology ecosystem, regional institutions, universities, creative industries, international organisations, and a young, ambitious talent base." image="/images/business.jpg" tone="ink"/>
    <section className="business-intro section"><p className="kicker">The business of possibility</p><div><h2>Ideas move<br/>through Nairobi.</h2><p>This hub is built for executives, founders, delegations and institutions looking for useful context and trusted connections—not unverified claims.</p></div></section>
    <section className="sector-grid section"><div className="section-head"><div><p className="kicker">Key sectors</p><h2>Strength in range.</h2></div><p>Statistics are published only with a source, reference period and review date.</p></div><div>{sectors.map((x,i) => <a href={`/business/sectors/${x.toLowerCase().replaceAll(/[^a-z0-9]+/g,"-")}`} key={x}><span>{String(i+1).padStart(2,"0")}</span><h3>{x}</h3><b>↗</b></a>)}</div></section>
    <section className="business-services section">{["Why Nairobi","Innovation ecosystem","Startups","Accelerators & hubs","Conferences & business events","Market-entry resources","Partner directory","Investment stories"].map((x,i) => <article key={x}><span>{String(i+1).padStart(2,"0")}</span><h2>{x}</h2><p>Editorially verified information and introductions for organisations exploring Nairobi.</p><a href="/contact">Explore →</a></article>)}</section>
    <section id="enquiry" className="enquiry-section"><div><p className="kicker">Delegations & corporate travel</p><h2>Bring us your brief.</h2><p>Tell us what would make your programme more useful, more connected and more distinctly Nairobi.</p></div><SmartForm kind="Business and delegation enquiry"/></section>
  </Shell>;
}

function PlanPage() {
  const sources = [
    ["Kenya Directorate of Immigration Services","https://immigration.go.ke/travelers-obligations/"],
    ["Kenya Electronic Travel Authorisation","https://etakenya.go.ke/"],
    ["Kenya Ministry of Health","https://www.health.go.ke/"],
    ["Kenya Meteorological Department","https://meteo.go.ke/"],
    ["Central Bank of Kenya","https://www.centralbank.go.ke/"],
    ["Kenya Airports Authority","https://www.kaa.go.ke/"],
    ["Kenya Airports Authority","https://www.kaa.go.ke/"],
    ["Nairobi City County","https://nairobi.go.ke/explore-nairobi"],
    ["Communications Authority of Kenya","https://www.ca.go.ke/"],
    ["National Council for Persons with Disabilities","https://ncpwd.go.ke/"],
    ["Kenya National Police Service","https://www.nationalpolice.go.ke/"],
    ["Kenya Directorate of Immigration Services","https://immigration.go.ke/"],
  ];
  return <Shell><PageHero eyebrow="Plan your visit" title="Good trips begin with good information." body="Practical guidance, clear sources and honest review dates. Check official advice again before you travel." tone="orange"/>
    <section className="travel-notice"><strong>Requirements can change.</strong><p>Entry, health and regulatory guidance should always be checked again against the named official source before travel.</p><span>Last reviewed 23 July 2026</span></section>
    <section className="practical section"><div className="section-head"><div><p className="kicker">Nairobi, practically</p><h2>Before you go.</h2></div></div>{practical.map((x,i) => <details key={x[0]}><summary><span>{String(i+1).padStart(2,"0")}</span>{x[0]}<b>+</b></summary><div><p>{x[1]}</p><p className="source">Source: <a href={sources[i][1]} target="_blank" rel="noreferrer">{sources[i][0]} ↗</a> · Reviewed 23 July 2026</p></div></details>)}</section>
  </Shell>;
}

function PartnerPage() {
  const options = ["Listing and destination visibility","Campaign and editorial collaborations","Event promotion","Sponsorship opportunities","Co-branded initiatives","Corporate and delegation programmes","Creator and media collaborations","Responsible tourism projects"];
  return <Shell><PageHero eyebrow="Partner with us" title="Let’s make Nairobi impossible to overlook." body="Join a growing network of organisations and people presenting Nairobi to the world with confidence, creativity and care." tone="red"/>
    <section className="partner-options section"><div><p className="kicker">Ways to work together</p><h2>Find the right<br/>kind of impact.</h2></div><ol>{options.map((x,i) => <li key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</li>)}</ol></section>
    <section className="application section"><div><p className="kicker">Start a conversation</p><h2>Tell us what<br/>you have in mind.</h2><p>Your submission enters the partnerships pipeline, where an assigned team member can add notes, change status and follow up.</p></div><SmartForm kind="Partner application"/></section>
  </Shell>;
}

function AboutPage() {
  return <Shell><PageHero eyebrow="About Visit Nairobi" title="Here to show the world why Nairobi is the place to be." body="Visit Nairobi brings the city’s stories, places, people and possibilities into one trusted platform—helping visitors plan richer journeys while connecting businesses and partners to a wider audience." tone="blue"/>
    <section className="pillars section"><div><p className="kicker">Our direction</p><h2>One promise.<br/>Four pillars.</h2></div><div>{[["Tourism","Wildlife, heritage, food, creativity and vibrant city life."],["Trade","Connections between Nairobi businesses and regional and international markets."],["Investment","A clear, responsible introduction to opportunity."],["Innovation","Technology, startups, research and entrepreneurial energy."]].map((x,i) => <article key={x[0]}><span>{String(i+1).padStart(2,"0")}</span><h3>{x[0]}</h3><p>{x[1]}</p></article>)}</div></section>
    <section className="vision section"><article><p className="kicker">Vision</p><h2>To position Nairobi as Africa’s premier hub for innovation, business and culture, and as a leading gateway to the continent.</h2></article><article><p className="kicker">Mission</p><h2>To connect visitors, local businesses, creators and investors through a trusted platform.</h2></article></section>
    <section className="commitments section"><div><p className="kicker">How we work</p><h2>Quality. Inclusion.<br/>Authenticity. Care.</h2></div><p>Listings are selected through transparent editorial criteria, relevance to visitors and residents, accurate practical information and alignment with responsible visitor-economy goals. Paid relationships are clearly labelled and never purchase editorial praise.</p></section>
  </Shell>;
}

function AccountPage() {
  return <Shell><PageHero eyebrow="Your Nairobi" title="Save a thought. Shape a day." body="Browse freely without an account. Sign in when you want saved places, preferences and itinerary data available across devices." tone="yellow"/><section className="account-grid section"><ItineraryBuilder/><AccountManager/></section></Shell>;
}

function SignInPage({ register = false }: { register?: boolean }) {
  return <Shell><section className="auth"><div className="auth-art"><span>✦</span><h1>{register ? "Make Nairobi yours." : "Welcome back."}</h1><p>Save places, build an itinerary and control your preferences.</p></div><div className="auth-box"><p className="kicker">{register ? "Create an account" : "Secure sign in"}</p><h2>{register ? "Start planning." : "Continue your journey."}</h2><p>Visit Nairobi uses secure identity sign-in. Your password is never collected or stored by this website.</p><a className="button dark" href="/signin-with-chatgpt?return_to=%2Faccount">{register ? "Create my account" : "Sign in securely"}</a><p className="small">By continuing, you agree to the <a href="/terms">terms</a> and acknowledge the <a href="/privacy">privacy policy</a>.</p></div></section></Shell>;
}

function AdminPage() {
  const stats = [["Live","Content feed"],["20","Destinations"],[String(stories.length),"Published stories"],[String(allDirectoryItems.length),"Visitor listings"]];
  const collections = ["Pages","Destinations","Neighbourhoods","Experiences","Accommodation","Food & drink","Trips & itineraries","Events","Stories","Startups","Accelerators & hubs","Business sectors","Partners","Team","FAQs","Travel advisories","Media","Redirects","Forms","Users","Settings","Translations"];
  return <div className="admin-shell"><aside className="admin-side"><a className="brand admin-brand" href="/"><img src="/brand/logo-white.svg" alt="Visit Nairobi admin"/></a><nav><a className="active" href="/admin">Overview</a>{collections.map(x => <a href={`/admin?collection=${encodeURIComponent(x)}`} key={x}>{x}</a>)}</nav></aside><main id="main" className="admin-main"><header><div><p className="kicker">Thursday, 23 July</p><h1>Good morning, editor.</h1></div><div><a href="/" target="_blank">View site ↗</a><a className="avatar" aria-label="Account settings" href="/admin?account=1">VN</a></div></header><section className="admin-stats">{stats.map((x,i) => <article key={x[1]} className={`a${i}`}><strong>{x[0]}</strong><span>{x[1]}</span></article>)}</section><section className="admin-section"><div className="section-head"><div><p className="kicker">Editorial workflow</p><h2>What needs attention</h2></div><a className="button dark" href="/admin?create=1">Create content</a></div><AdminWorkflow/></section><section className="admin-widgets"><article><p className="kicker">Search health</p><h2>Search opportunities</h2><p>Use no-result searches to guide future articles, listings and accessibility information.</p><a href="/admin?collection=Search">Review terms →</a></article><article><p className="kicker">Content freshness</p><h2>Travel guidance review</h2><p>Entry requirements and emergency contacts link directly to their official sources.</p><a href="/admin?collection=Travel%20advisories">Open queue →</a></article><article><p className="kicker">Activity</p><h2>Recently edited</h2><p>Stories, destination guides and business content are visible in the workflow feed below.</p><a href="/admin?collection=Audit">View audit log →</a></article></section></main></div>;
}

const legalCopy: Record<string,[string,string]> = {
  privacy:["Privacy policy","This draft explains how Visit Nairobi may collect, use, retain and protect personal information. It requires professional legal review before launch."],
  cookies:["Cookie policy","This draft describes essential storage, optional analytics and how visitors can change consent choices. It requires professional legal review."],
  terms:["Terms of service","These draft terms govern use of the platform and require professional legal review before launch."],
  accessibility:["Accessibility statement","Visit Nairobi is designed towards WCAG 2.2 AA. We welcome reports about barriers and aim to provide an accessible alternative."],
  "responsible-travel":["Responsible travel","Move through Nairobi with curiosity and care: respect people’s privacy, support local enterprises, reduce waste and follow conservation guidance."],
  "editorial-policy":["Editorial policy","Editorial selections are based on relevance, accuracy, quality and responsible visitor-economy goals. Sponsored relationships are clearly labelled."],
  faqs:["Frequently asked questions","Clear answers to common questions about planning, accessibility, business travel, listings and partnerships."],
};

function UtilityPage({ slug }: { slug: string }) {
  const [title,body] = legalCopy[slug] || ["Contact Visit Nairobi","Tell us what you need and the right team will respond."];
  return <Shell><PageHero eyebrow="Visit Nairobi" title={title} body={body} tone={slug === "responsible-travel" ? "green" : "blue"}/><section className="legal section"><p className="draft-label">Draft content · Professional review required before launch</p><h2>Clear information, presented with care.</h2><p>{body}</p>{slug === "faqs" ? practical.slice(0,6).map(x => <details key={x[0]}><summary>{x[0]}</summary><p>{x[1]}</p></details>) : slug === "contact" ? <SmartForm/> : <><h2>Our approach</h2><p>This page is fully editable in the content system, supports version history and shows its last review date. Specific legal language, retention periods and organisational contact details must be confirmed by the responsible team before public launch.</p><h2>Contact</h2><p>Use the general enquiry form if you need this information in another format or want to raise a concern.</p><a className="button dark" href="/contact">Contact us</a></>}</section></Shell>;
}

function FormPage({ kind }: { kind: string }) {
  return <Shell><PageHero eyebrow="Contribute to the city" title={kind} body="Send accurate, useful information for editorial review. Submission does not guarantee publication." tone="orange"/><section className="application section"><div><p className="kicker">Before you begin</p><h2>Accuracy matters.</h2><p>Only submit information you are authorised to share. Editors may contact you to verify details and usage rights.</p></div><SmartForm kind={kind}/></section></Shell>;
}

export function RoutePage({ segments }: { segments: string[] }) {
  const [first, second] = segments;
  if (!first || first === "discover") return first ? <Shell><PageHero eyebrow="Discover Nairobi" title="One city. Many worlds." body="Nature, culture, enterprise and everyday city energy in remarkable proximity." tone="blue"/><Directory items={allDirectoryItems} title="Discover Nairobi"/></Shell> : <HomePage/>;
  if (first === "things-to-do") return <ListingPage/>;
  if (first === "food-and-drink") return second ? <ExperienceDetail item={foodVenues.find(x => x.slug === second) || foodVenues[0]}/> : <ListingPage type="food"/>;
  if (first === "hotels" || first === "hotel") return second ? <ExperienceDetail item={hotels.find(x => x.slug === second) || hotels[0]}/> : <ListingPage type="hotel"/>;
  if (first === "nightlife") return second ? <ExperienceDetail item={nightlife.find(x => x.slug === second) || nightlife[0]}/> : <ListingPage type="nightlife"/>;
  if (first === "shopping") return second ? <ExperienceDetail item={shopping.find(x => x.slug === second) || shopping[0]}/> : <ListingPage type="shopping"/>;
  if (first === "events") return <ListingPage type="events"/>;
  if (first === "stories") return second ? <StoryDetail item={stories.find(x => x.slug === second) || stories[0]}/> : <ListingPage type="stories"/>;
  if (first === "experiences") return <ExperienceDetail item={experiences.find(x => x.slug === second) || experiences[0]}/>;
  if (first === "destinations") return second ? <DestinationDetail slug={second}/> : <DestinationsPage/>;
  if (first === "business") return <BusinessPage/>;
  if (first === "plan") return <PlanPage/>;
  if (first === "partner") return <PartnerPage/>;
  if (first === "about") return <AboutPage/>;
  if (first === "account") return <AccountPage/>;
  if (first === "signin") return <SignInPage/>;
  if (first === "register") return <SignInPage register/>;
  if (first === "admin") return <AdminPage/>;
  if (first === "submit-a-listing") return <FormPage kind="Submit a listing"/>;
  if (first === "report") return <FormPage kind="Report outdated information"/>;
  if (first === "contact") return <UtilityPage slug="contact"/>;
  if (first === "search") return <Shell><PageHero eyebrow="Search Visit Nairobi" title="What are you looking for?" body="Search experiences, food, hotels, nightlife, shopping, stories and practical guidance." tone="yellow"/><Directory items={[...allDirectoryItems,...stories]} title="Search the whole site"/></Shell>;
  if (legalCopy[first]) return <UtilityPage slug={first}/>;
  if (["trips","neighbourhoods"].includes(first)) return <Shell><PageHero eyebrow="Explore deeper" title={(second || "Nairobi").replaceAll("-"," ")} body="This structured editorial page is ready for verified practical content, relationships and media in the CMS." tone="orange"/><Directory items={experiences.slice(0,4)} title="Continue exploring"/></Shell>;
  return <NotFoundPage/>;
}

export function NotFoundPage() {
  return <Shell><section className="not-found"><span>404</span><h1>This path took a turn.</h1><p>The page may have moved, or Nairobi may simply have another idea for you.</p><a className="button dark" href="/">Return home</a><a className="text-link" href="/search">Search Visit Nairobi →</a></section></Shell>;
}
