import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(".");
const dist = resolve(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(resolve(dist, "client"), { recursive: true });
await mkdir(resolve(dist, "server"), { recursive: true });
await mkdir(resolve(dist, ".openai"), { recursive: true });

await cp(resolve(root, "index.html"), resolve(dist, "client", "index.html"));
await cp(resolve(root, "src"), resolve(dist, "client", "src"), { recursive: true });
await cp(resolve(root, "vendor"), resolve(dist, "client", "vendor"), { recursive: true });
await cp(resolve(root, "public"), resolve(dist, "client", "public"), { recursive: true });
await cp(resolve(root, "worker", "index.js"), resolve(dist, "server", "index.js"));
await cp(resolve(root, ".openai", "hosting.json"), resolve(dist, ".openai", "hosting.json"));

console.log("Built KindHealth marketing site in dist/");
