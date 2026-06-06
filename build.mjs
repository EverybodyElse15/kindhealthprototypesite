import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { existsSync } from "node:fs";

const root = resolve(".");
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await mkdir(resolve(dist, ".openai"), { recursive: true });

await cp(resolve(root, "index.html"), resolve(dist, "client", "index.html"));

if (existsSync(resolve(root, "src"))) {
  await cp(resolve(root, "src"), resolve(dist, "client", "src"), { recursive: true });
} else {
  await mkdir(resolve(dist, "client", "src"), { recursive: true });
  await cp(resolve(root, "app.jsx"), resolve(dist, "client", "src", "app.jsx"));
  await cp(resolve(root, "styles.css"), resolve(dist, "client", "src", "styles.css"));
}

if (existsSync(resolve(root, "vendor"))) {
  await cp(resolve(root, "vendor"), resolve(dist, "client", "vendor"), { recursive: true });
} else {
  await mkdir(resolve(dist, "client", "vendor"), { recursive: true });
  for (const file of [
    "babel.min.js",
    "lucide.min.js",
    "react-dom.production.min.js",
    "react.production.min.js",
    "tailwindcss-cdn.js",
  ]) {
    await cp(resolve(root, file), resolve(dist, "client", "vendor", file));
  }
}

if (existsSync(resolve(root, "public"))) {
  await cp(resolve(root, "public"), resolve(dist, "client", "public"), { recursive: true });
} else {
  await mkdir(resolve(dist, "client", "public"), { recursive: true });
  await cp(resolve(root, "governance-os-hero.png"), resolve(dist, "client", "public", "governance-os-hero.png"));
}

if (existsSync(resolve(root, "worker", "index.js"))) {
  await cp(resolve(root, "worker", "index.js"), resolve(dist, "server", "index.js"));
} else if (existsSync(resolve(root, "index.js"))) {
  await cp(resolve(root, "index.js"), resolve(dist, "server", "index.js"));
} else {
  await writeFile(
    resolve(dist, "server", "index.js"),
    `export default { async fetch(request, env) {
  const url = new URL(request.url);
  const assetRequest = url.pathname === "/" ? new Request(new URL("/index.html", request.url), request) : request;
  const response = await env.ASSETS.fetch(assetRequest);
  if (response.status === 404) return env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
  return response;
}};\n`,
  );
}

if (existsSync(resolve(root, ".openai", "hosting.json"))) {
  await cp(resolve(root, ".openai", "hosting.json"), resolve(dist, ".openai", "hosting.json"));
} else {
  await writeFile(resolve(dist, ".openai", "hosting.json"), JSON.stringify({ d1: null, r2: null }, null, 2));
}

console.log("Built KindHealth marketing site in dist/");
