"use client";

import { useEffect, useMemo, useState } from "react";
import type { Card } from "./content";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <>
    <button className="menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
      {["Discover","Things to Do","Where to Go","Events","Business & Investment","Stories","Plan Your Visit","Partner With Us"].map(x => <a key={x} href={route(x)} onClick={() => setOpen(false)}>{x}</a>)}
    </nav>}
  </>;
}

function route(label: string) {
  const map: Record<string,string> = { "Discover": "/discover", "Things to Do": "/things-to-do", "Where to Go": "/destinations", "Events": "/events", "Business & Investment": "/business", "Stories": "/stories", "Plan Your Visit": "/plan", "Partner With Us": "/partner" };
  return map[label] || "/";
}

export function SaveButton({ id }: { id: string }) {
  const [saved, setSaved] = useState(false);
  const [busy,setBusy] = useState(false);
  useEffect(() => {
    setSaved(JSON.parse(localStorage.getItem("vn-saved") || "[]").includes(id));
    fetch("/api/saved").then(r => r.ok ? r.json() : null).then(data => {
      if (data?.items) setSaved(data.items.some((x:{contentSlug:string}) => x.contentSlug === id));
    }).catch(() => undefined);
  }, [id]);
  async function toggle() {
    setBusy(true);
    const items: string[] = JSON.parse(localStorage.getItem("vn-saved") || "[]");
    const next = saved ? items.filter(x => x !== id) : [...new Set([...items, id])];
    localStorage.setItem("vn-saved", JSON.stringify(next));
    const desired = !saved; setSaved(desired);
    try {
      await fetch(saved ? `/api/saved?slug=${encodeURIComponent(id)}` : "/api/saved", saved ? { method:"DELETE" } : { method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({ slug:id }) });
    } finally { setBusy(false); }
  }
  return <button className="save-button" aria-pressed={saved} disabled={busy} onClick={toggle}>{busy ? "Saving…" : saved ? "Saved" : "Save"}</button>;
}

export function Directory({ items, title = "Explore Nairobi" }: { items: Card[]; title?: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const [accessible, setAccessible] = useState(false);
  const [family, setFamily] = useState(false);
  const [sort, setSort] = useState("featured");
  const [map, setMap] = useState(false);
  const cats = ["All", ...new Set(items.map(x => x.category))];
  const results = useMemo(() => {
    const filtered = items.filter(x => (!q || `${x.title} ${x.summary} ${x.location}`.toLowerCase().includes(q.toLowerCase())) && (cat === "All" || x.category === cat) && (!accessible || x.accessible) && (!family || x.family));
    return [...filtered].sort((a,b) => sort === "alphabetical" ? a.title.localeCompare(b.title) : sort === "newest" ? b.slug.localeCompare(a.slug) : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [items,q,cat,accessible,family,sort]);
  return <section className="directory section" aria-labelledby="directory-title">
    <div className="section-head"><div><p className="kicker">Find your Nairobi</p><h1 id="directory-title">{title}</h1></div><button className="view-toggle" onClick={() => setMap(!map)}>{map ? "Show list" : "Map view"}</button></div>
    <div className="filterbar">
      <label className="search-field"><span>Search</span><input value={q} onChange={e => setQ(e.target.value)} placeholder="Try food, forest or Westlands" /></label>
      <label><span>Category</span><select value={cat} onChange={e => setCat(e.target.value)}>{cats.map(x => <option key={x}>{x}</option>)}</select></label>
      <label><span>Sort</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="newest">Newest</option><option value="alphabetical">Alphabetical</option></select></label>
      <label className="check"><input type="checkbox" checked={accessible} onChange={e => setAccessible(e.target.checked)} /> Accessibility details</label>
      <label className="check"><input type="checkbox" checked={family} onChange={e => setFamily(e.target.checked)} /> Family-friendly</label>
    </div>
    <p className="result-count" aria-live="polite">{results.length} {results.length === 1 ? "result" : "results"}</p>
    {map ? <div className="map-panel"><div className="map-orbit one"/><div className="map-orbit two"/><p><strong>Map overview</strong><br/>Locations are also provided in the list for equal access.</p>{results.slice(0,5).map((x,i) => <span className={`pin p${i}`} key={x.slug}>{i+1}</span>)}</div> :
      results.length ? <div className="cards">{results.map(x => <article className="card" key={`${x.contentType || "experience"}-${x.slug}`}><a href={x.href || `/experiences/${x.slug}`}><div className="card-image"><img src={x.image} alt="" loading="lazy" /><span>{x.eyebrow}</span></div><div className="card-copy"><p>{x.location}</p><h2>{x.title}</h2><p>{x.summary}</p></div></a><SaveButton id={`${x.contentType || "experience"}:${x.slug}`}/></article>)}</div> :
      <div className="empty"><h2>No exact matches yet</h2><p>Try removing a filter or searching for a neighbourhood.</p><button onClick={() => {setQ("");setCat("All");setAccessible(false);setFamily(false)}}>Clear filters</button></div>}
  </section>;
}

export function SmartForm({ kind = "General enquiry", compact = false }: { kind?: string; compact?: boolean }) {
  const [state, setState] = useState<"idle"|"sending"|"success"|"error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/forms", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({ kind, ...data }) });
      if (!res.ok) throw new Error(); setState("success"); e.currentTarget.reset();
    } catch { setState("error"); }
  }
  if (state === "success") return <div className="form-success" role="status"><strong>{kind === "Newsletter" ? "You’re subscribed." : "Thank you—we’ve received it."}</strong><p>{kind === "Newsletter" ? "Nairobi stories and practical guidance will arrive thoughtfully." : "Your submission is now in the Visit Nairobi team’s workflow."}</p></div>;
  return <form className={compact ? "smart-form compact" : "smart-form"} onSubmit={submit}>
    <div className="hp" aria-hidden="true"><label>Leave blank<input name="company_url" tabIndex={-1} autoComplete="off"/></label></div>
    {kind !== "Newsletter" && <><label><span>Name</span><input name="name" required minLength={2} autoComplete="name"/></label>{kind === "Partner application" && <label><span>Organisation</span><input name="organisation" required/></label>}</>}
    <label><span>{kind === "Newsletter" ? "Email address" : "Work email"}</span><input name="email" type="email" required autoComplete="email"/></label>
    {!compact && <><label><span>{kind === "Partner application" ? "Proposed collaboration" : "How can we help?"}</span><textarea name="message" rows={5} required minLength={20}/></label><label><span>Telephone (optional)</span><input name="telephone" type="tel" autoComplete="tel"/></label></>}
    <label className="consent"><input name="consent" type="checkbox" required/><span>I consent to Visit Nairobi processing this information to respond. See the <a href="/privacy">privacy policy</a>.</span></label>
    <button className="button dark" disabled={state === "sending"}>{state === "sending" ? "Sending…" : kind === "Newsletter" ? "Subscribe" : "Send enquiry"}</button>
    {state === "error" && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
  </form>;
}

export function MagicLinkForm({ mode = "signin", returnTo = "/account" }: { mode?: "signin" | "register"; returnTo?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [devLink, setDevLink] = useState<string | null>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setStatus("sending");
    try {
      const r = await fetch("/api/auth/request", { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({ email, return_to:returnTo }) });
      if (!r.ok) throw new Error();
      const data = await r.json().catch(() => ({}));
      setDevLink(data?.url || null);
      setStatus("sent");
    } catch { setStatus("error"); }
  }
  if (status === "sent") return <div className="form-success" role="status"><strong>Check your email.</strong><p>We’ve sent a secure sign-in link to {email}. It expires in 15 minutes.</p>{devLink && <p className="small"><a href={devLink}>Continue (no email provider configured)</a></p>}</div>;
  return <form className="account-form" onSubmit={submit}>
    <label><span>Email address</span><input type="email" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"/></label>
    <button className="button dark" disabled={status==="sending"}>{status==="sending" ? "Sending…" : mode === "register" ? "Send my sign-in link" : "Email me a sign-in link"}</button>
    {status === "error" && <p className="form-error" role="alert">Something went wrong. Please try again.</p>}
  </form>;
}

export function CookieNotice() {
  const [visible,setVisible] = useState(false);
  useEffect(() => setVisible(!localStorage.getItem("vn-consent")),[]);
  if (!visible) return null;
  function choose(value:string){localStorage.setItem("vn-consent",value);setVisible(false)}
  return <aside className="cookie" aria-label="Cookie preferences"><p><strong>Your privacy, your choice.</strong><br/>We use essential storage for the site. Analytics remain off unless you allow them.</p><div><button onClick={() => choose("essential")}>Essential only</button><button className="button" onClick={() => choose("all")}>Allow analytics</button></div></aside>;
}

export function ItineraryBuilder() {
  const [items,setItems] = useState<string[]>([]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("vn-saved") || "[]") as string[];
    setItems(local);
    fetch("/api/saved").then(r => r.ok ? r.json() : null).then(data => {
      if (data?.items) setItems(data.items.map((x:{contentSlug:string}) => x.contentSlug));
    }).catch(() => undefined);
  },[]);
  async function remove(id:string) {
    const next=items.filter(y=>y!==id);setItems(next);localStorage.setItem("vn-saved",JSON.stringify(next));
    await fetch(`/api/saved?slug=${encodeURIComponent(id)}`,{method:"DELETE"}).catch(() => undefined);
  }
  return <div className="itinerary-tool"><h2>Your saved Nairobi</h2><p>{items.length ? `${items.length} saved ${items.length === 1 ? "place" : "places"} ready to arrange.` : "Save places and stories as you browse, then bring them together here."}</p>{items.map((x,i) => <div className="saved-row" key={x}><span>{i+1}</span><strong>{x.replaceAll(/[:_-]/g," ")}</strong><button onClick={() => remove(x)}>Remove</button></div>)}<a className="button" href="/things-to-do">Find things to save</a></div>;
}

export function AdminWorkflow() {
  type Row = { id:number;title:string;collection:string;status:string;updatedAt:string };
  type Submission = { id:number;kind:string;name?:string;email:string;status:string;createdAt:string };
  type Subscriber = { id:number;email:string;status:string;createdAt:string };
  const [rows,setRows] = useState<Row[]>([]);
  const [submissions,setSubmissions] = useState<Submission[]>([]);
  const [subscribers,setSubscribers] = useState<Subscriber[]>([]);
  const [counts,setCounts] = useState<{submissions:number;subscribers:number;users:number;content:number}|null>(null);
  const [message,setMessage] = useState("Loading the live content feed…");
  useEffect(() => {
    fetch("/api/admin").then(async r => {
      if (!r.ok) throw new Error(r.status === 403 ? "Sign in with an administrator account to load private records." : "The content feed is temporarily unavailable.");
      return r.json();
    }).then(data => { setRows(data.records);setSubmissions(data.recentSubmissions);setSubscribers(data.recentSubscribers);setCounts(data.counts);setMessage(""); }).catch(e => setMessage(e.message));
  },[]);
  async function changeStatus(id:number,status:string) {
    const before = rows;setRows(rows.map(x => x.id===id ? {...x,status} : x));
    const response = await fetch("/api/content",{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({id,status})});
    if (!response.ok) { setRows(before);setMessage("The status change could not be saved."); }
  }
  return <><div className="admin-live-counts">{counts && <><span><strong>{counts.content}</strong> content records</span><span><strong>{counts.submissions}</strong> submissions</span><span><strong>{counts.subscribers}</strong> subscribers</span><span><strong>{counts.users}</strong> registered users</span></>}</div>{message && <p className="admin-message" role="status">{message}</p>}<div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Content</th><th>Collection</th><th>Status</th><th>Updated</th></tr></thead><tbody>{rows.map(r => <tr key={r.id}><td><strong>{r.title}</strong><small>Record #{r.id}</small></td><td>{r.collection}</td><td><select aria-label={`Status for ${r.title}`} value={r.status} onChange={e => changeStatus(r.id,e.target.value)}><option value="draft">Draft</option><option value="in review">In review</option><option value="approved">Approved</option><option value="scheduled">Scheduled</option><option value="published">Published</option><option value="archived">Archived</option></select></td><td>{new Date(r.updatedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div><div className="admin-feed-grid"><section><h3>Recent submissions</h3>{submissions.length ? submissions.map(x => <article key={x.id}><strong>{x.kind}</strong><span>{x.name || x.email}</span><small>{x.status}</small></article>) : <p>No submissions yet.</p>}</section><section><h3>Recent subscribers</h3>{subscribers.length ? subscribers.map(x => <article key={x.id}><strong>{x.email}</strong><span>{x.status}</span><small>{new Date(x.createdAt).toLocaleDateString()}</small></article>) : <p>No subscribers yet.</p>}</section></div></>;
}

export function AccountManager() {
  const [profile,setProfile] = useState<{email:string;name?:string;newsletterOptIn?:boolean;accessibilityPreferences?:string}|null>(null);
  const [state,setState] = useState("Loading your account…");
  useEffect(() => {
    fetch("/api/me").then(async r => {
      if (r.status === 401) { setState("signin");return null; }
      if (!r.ok) throw new Error(); return r.json();
    }).then(data => { if (data?.user) { setProfile(data.user);setState(""); } }).catch(() => setState("We could not load your account."));
  },[]);
  async function save(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault();setState("Saving…");
    const values=Object.fromEntries(new FormData(e.currentTarget));
    const r=await fetch("/api/me",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({newsletterOptIn:values.newsletterOptIn==="on",accessibilityPreferences:values.accessibilityPreferences})});
    setState(r.ok ? "Preferences saved." : "Preferences could not be saved.");
  }
  async function exportData() {
    const r=await fetch("/api/me?export=1");if(!r.ok)return setState("Data export could not be created.");
    const blob=await r.blob(),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="visit-nairobi-data.json";a.click();URL.revokeObjectURL(url);
  }
  async function deleteData() {
    if (!confirm("Delete your Visit Nairobi account data and saved items? This cannot be undone.")) return;
    const r=await fetch("/api/me",{method:"DELETE"});setState(r.ok ? "Your Visit Nairobi account data has been deleted." : "Account deletion could not be completed.");
  }
  async function signOut() {
    await fetch("/api/auth/signout",{method:"POST"}).catch(() => undefined);
    location.href="/";
  }
  if (state==="signin") return <div className="account-panel"><h2>Sign in to sync</h2><p>Your on-device saved items remain available. Sign in to sync them and manage your account data.</p><MagicLinkForm mode="signin" returnTo="/account"/></div>;
  return <div className="account-panel"><h2>Account controls</h2>{profile ? <form onSubmit={save} className="account-form"><p><strong>{profile.name || profile.email}</strong><br/>{profile.email}</p><label className="consent"><input name="newsletterOptIn" type="checkbox" defaultChecked={profile.newsletterOptIn}/><span>Send me useful Visit Nairobi updates.</span></label><label><span>Accessibility preferences</span><textarea name="accessibilityPreferences" defaultValue={profile.accessibilityPreferences} rows={3}/></label><button className="button dark">Save preferences</button></form> : <p>{state}</p>}<p className="account-state" role="status">{profile ? state : ""}</p>{profile && <><button className="text-link" onClick={exportData}>Export my data</button><button className="text-link danger" onClick={deleteData}>Delete my account</button><button className="text-link" onClick={signOut}>Sign out</button></>}</div>;
}
