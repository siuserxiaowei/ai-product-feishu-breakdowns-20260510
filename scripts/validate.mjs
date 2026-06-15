import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const articles = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "articles.json"), "utf8"));
const required = [
  "index.html",
  "config/index.html",
  "links.json",
  "assets/site.css"
];

for (const article of articles) {
  required.push(`articles/${article.slug}/index.html`);
}

for (const file of required) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const sensitivePattern = /internal-api-drive-stream|access_token|tenant_access_token|authorization|password|secret|飞书原文|逐字稿原文/i;
const scanFiles = required.filter((file) => file.endsWith(".html") || file.endsWith(".json"));
for (const file of scanFiles) {
  const content = fs.readFileSync(path.join(ROOT, file), "utf8");
  if (sensitivePattern.test(content)) {
    throw new Error(`Sensitive-looking content found in ${file}`);
  }
}

const slugs = new Set();
for (const article of articles) {
  if (!article.slug || !article.title || !article.summary || !article.fiveDimensions) {
    throw new Error(`Incomplete article: ${article.slug || article.title}`);
  }
  if (slugs.has(article.slug)) {
    throw new Error(`Duplicate slug: ${article.slug}`);
  }
  slugs.add(article.slug);
}

console.log(`validate: OK articles=${articles.length} files=${required.length}`);
