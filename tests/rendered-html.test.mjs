import assert from "node:assert/strict";
import test, { after, before } from "node:test";
import { spawn } from "node:child_process";

const base = process.env.TEST_BASE_URL || "http://localhost:4173";
let server;

before(async () => {
  if (process.env.TEST_BASE_URL) return;
  server = spawn("npm", ["run","start","--","--port","4173"], { stdio:"ignore", detached:true });
  for (let i=0;i<50;i++) {
    try { const r = await fetch(base); if (r.ok) return; } catch {}
    await new Promise(resolve => setTimeout(resolve,200));
  }
  throw new Error("Test server did not become ready");
});

after(() => { if (server?.pid) process.kill(-server.pid, "SIGTERM"); });
async function get(path) { return fetch(`${base}${path}`, { headers:{ accept:"text/html" } }); }

test("home is server rendered with brand promise and core journeys", async () => {
  const response = await get("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Your gateway to/);
  assert.match(html, /Explore Nairobi/);
  assert.match(html, /Business Nairobi/);
  assert.match(html, /Partner with Visit Nairobi/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("publishing surfaces, directories, search, saving and account routes render", async () => {
  for (const path of ["/things-to-do","/food-and-drink","/hotels","/nightlife","/shopping","/destinations","/destinations/nairobi","/destinations/mombasa","/business","/plan","/partner","/stories","/stories/doing-business","/search","/account","/admin","/signin","/register"]) {
    const response = await get(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") || "", /^text\/html/);
  }
});

test("expanded content and supplied brand assets are present", async () => {
  const [storiesPage,destinationsPage,brand] = await Promise.all([get("/stories"),get("/destinations"),get("/brand/logo.svg")]);
  const storiesHtml = await storiesPage.text();
  const destinationsHtml = await destinationsPage.text();
  assert.match(storiesHtml,/Doing Business in Nairobi/);
  assert.match(storiesHtml,/Nairobi Travel Guide for First-Time Visitors/);
  assert.match(destinationsHtml,/Kitale/);
  assert.match(destinationsHtml,/Lamu/);
  assert.equal(brand.status,200);
});

test("protected data APIs require identity", async () => {
  for (const path of ["/api/me","/api/saved","/api/admin"]) {
    const response = await fetch(`${base}${path}`);
    assert.ok([401,403].includes(response.status),path);
  }
});

test("all rendered internal links resolve", async () => {
  const sourcePaths = ["/","/things-to-do","/food-and-drink","/hotels","/nightlife","/shopping","/destinations","/stories","/business","/plan"];
  const html = (await Promise.all(sourcePaths.map(async path => (await get(path)).text()))).join("\n");
  const paths = [...new Set([...html.matchAll(/href="(\/[^"#]*)"/g)].map(match => match[1]))];
  const responses = [];
  for (let i=0;i<paths.length;i+=8) {
    responses.push(...await Promise.all(paths.slice(i,i+8).map(async path => [path,(await get(path)).status])));
  }
  const broken = responses.filter(([,status]) => status !== 200);
  assert.deepEqual(broken,[]);
});

test("magic link request rejects an invalid email", async () => {
  const response = await fetch(`${base}/api/auth/request`, { method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify({ email:"not-an-email" }) });
  assert.equal(response.status, 400);
});

test("magic link callback rejects a missing token", async () => {
  const response = await fetch(`${base}/api/auth/callback`, { redirect:"manual" });
  assert.equal(response.status, 302);
  assert.match(response.headers.get("location") || "", /\/signin/);
});

test("form validation rejects incomplete submissions", async () => {
  const response = await fetch(`${base}/api/forms`, { method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({kind:"General enquiry",email:"bad"}) });
  assert.equal(response.status,400);
});

test("SEO endpoints render", async () => {
  const [robots,sitemap] = await Promise.all([get("/robots.txt"),get("/sitemap.xml")]);
  assert.equal(robots.status,200);
  assert.equal(sitemap.status,200);
});
