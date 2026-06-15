import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(new URL("..", import.meta.url).pathname);
const DATA_PATH = path.join(ROOT, "data", "articles.json");
const BASE_URL = "https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510";
const REPO_URL = "https://github.com/siuserxiaowei/ai-product-feishu-breakdowns-20260510";
const SITE_TITLE = "2026-05-10 AI 产品飞书纪要拆解";
const DIMENSIONS = [
  ["dao", "道"],
  ["fa", "法"],
  ["shu", "术"],
  ["qi", "器"],
  ["shi", "势"]
];

const articles = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function relPrefix(depth = 0) {
  return depth === 0 ? "" : "../".repeat(depth);
}

function articleUrl(article) {
  return `${BASE_URL}/articles/${article.slug}/`;
}

function pageShell({ title, description, active = "", depth = 0, body }) {
  const prefix = relPrefix(depth);
  const nav = [
    ["首页", `${prefix}index.html`, "home"],
    ["配置", `${prefix}config/`, "config"],
    ["数据", `${prefix}data/articles.json`, "data"],
    ["仓库", REPO_URL, "repo"]
  ];

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="stylesheet" href="${prefix}assets/site.css">
</head>
<body>
  <header class="site-header">
    <a class="brand" href="${prefix}index.html" aria-label="返回首页">
      <span class="brand-mark">AI</span>
      <span>
        <strong>${SITE_TITLE}</strong>
        <small>三篇飞书智能纪要的独立拆解站</small>
      </span>
    </a>
    <nav class="nav">
      ${nav.map(([label, href, key]) => `<a class="${active === key ? "active" : ""}" href="${href}">${escapeHtml(label)}</a>`).join("")}
    </nav>
  </header>
  ${body}
  <footer class="site-footer">
    <span>Generated from public-safe structured summaries.</span>
    <a href="${REPO_URL}">GitHub Repository</a>
  </footer>
</body>
</html>
`;
}

function tagList(tags = []) {
  return `<div class="tags">${tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`;
}

function formatListItem(item) {
  if (item && typeof item === "object") {
    const title = [item.type, item.value].filter(Boolean).join("：");
    return `${escapeHtml(title)}${item.how ? `<p>${escapeHtml(item.how)}</p>` : ""}`;
  }
  return escapeHtml(item);
}

function listItems(items = []) {
  return items.map((item) => `<li>${formatListItem(item)}</li>`).join("");
}

function renderTopicMap(article) {
  const topicMap = article.topicMap || [];
  if (!topicMap.length) return "";
  return `<div class="topic-map">
    ${topicMap.map((topic) => `<section>
      <h4>${escapeHtml(topic.title)}</h4>
      <p>${escapeHtml(topic.summary || "")}</p>
      ${(topic.points || []).length ? `<div class="tags">${topic.points.map((point) => `<span>${escapeHtml(point)}</span>`).join("")}</div>` : ""}
    </section>`).join("")}
  </div>`;
}

function summaryCard(article) {
  const dims = DIMENSIONS.map(([key, label]) => {
    const item = article.fiveDimensions?.[key];
    return `<span>${label}${item?.["拆解要点"]?.length ? ` ${item["拆解要点"].length}` : ""}</span>`;
  }).join("");
  return `<article class="article-card">
    <div class="card-meta">${escapeHtml(article.date)} · ${escapeHtml(article.dimensionTitle || "道法术器势拆解")}</div>
    <h2><a href="articles/${article.slug}/">${escapeHtml(article.title)}</a></h2>
    <p>${escapeHtml(article.summary)}</p>
    ${tagList(article.tags)}
    <div class="dimension-strip">${dims}</div>
    <a class="text-link" href="articles/${article.slug}/">查看完整拆解</a>
  </article>`;
}

function renderHome() {
  const body = `<main>
    <section class="hero">
      <div class="hero-copy">
        <h1>三篇飞书 AI 产品纪要，单独归档。</h1>
        <p>这个仓库只放 2026 年 5 月 10 日的三篇 AI 产品、增长和教育产品讨论拆解，避免混入大会议纪要站。所有内容按“道、法、术、器、势”整理，只保留公开派生摘要和行动清单。</p>
        <div class="hero-actions">
          <a class="button primary" href="config/">打开在线配置页</a>
          <a class="button" href="data/articles.json">查看 JSON 数据</a>
        </div>
      </div>
      <div class="hero-panel">
        <div>
          <span class="metric">${articles.length}</span>
          <span class="metric-label">篇独立拆解</span>
        </div>
        <div>
          <span class="metric">5</span>
          <span class="metric-label">个分析维度</span>
        </div>
        <div>
          <span class="metric">1</span>
          <span class="metric-label">个配置页统一收口</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h2>在线文章</h2>
        <p>按时间顺序排列，每篇都包含摘要、章节、行动项和五维拆解。</p>
      </div>
      <div class="article-grid">
        ${articles.map(summaryCard).join("")}
      </div>
    </section>
  </main>`;

  return pageShell({
    title: `${SITE_TITLE} | 首页`,
    description: "三篇 2026-05-10 飞书 AI 产品纪要的独立 GitHub Pages 拆解站。",
    active: "home",
    body
  });
}

function renderConfig() {
  const links = articles.map((article) => ({
    title: article.title,
    url: articleUrl(article),
    date: article.date,
    slug: article.slug
  }));

  const body = `<main>
    <section class="page-title">
      <p>GitHub Pages 配置与离线备份</p>
      <h1>统一在线配置页</h1>
      <div class="backup-notice">
        这个页面不只保存链接，也保存三篇飞书纪要的结构化摘要、章节、行动项、学习重点、主题地图和“道法术器势”拆解。这里不发布原始飞书正文、临时鉴权链接或完整逐字稿，只保留已经整理过的公开派生内容，便于飞书页面后续不可访问时继续阅读。
      </div>
      <div class="config-links">
        <a href="${BASE_URL}/">${BASE_URL}/</a>
        <a href="${REPO_URL}">${REPO_URL}</a>
      </div>
    </section>

    <section class="config-layout">
      <div class="config-main">
        <h2>三篇文章目录</h2>
        <div class="link-list">
          ${links.map((link, index) => `<a class="link-row" href="#${escapeHtml(link.slug)}">
            <strong>${index + 1}. ${escapeHtml(link.title)}</strong>
            <span>${escapeHtml(link.date)} · ${escapeHtml(link.slug)}</span>
          </a>`).join("")}
        </div>
      </div>
      <aside class="config-side">
        <h2>发布配置</h2>
        <dl>
          <dt>仓库</dt>
          <dd><a href="${REPO_URL}">ai-product-feishu-breakdowns-20260510</a></dd>
          <dt>Pages 分支</dt>
          <dd>main</dd>
          <dt>发布目录</dt>
          <dd>/</dd>
          <dt>数据端点</dt>
          <dd><a href="${BASE_URL}/data/articles.json">data/articles.json</a></dd>
          <dt>完整备份</dt>
          <dd>当前配置页已内嵌全部结构化总结</dd>
          <dt>本地构建</dt>
          <dd><code>npm run all</code></dd>
        </dl>
      </aside>
    </section>

    <section class="section">
      <div class="section-heading">
        <h2>完整结构化备份</h2>
        <p>以下内容与各文章页同步生成，集中放在配置页，方便单页保存、复制和长期查看。</p>
      </div>
      <div class="backup-stack">
        ${articles.map((article, index) => renderConfigArticle(article, index)).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-heading">
        <h2>公开边界</h2>
        <p>页面只使用脱敏后的结构化拆解，不发布原始飞书正文、临时鉴权链接、图片鉴权地址或完整逐字稿。</p>
      </div>
    </section>
  </main>`;

  return pageShell({
    title: `${SITE_TITLE} | 在线配置`,
    description: "统一收口三篇飞书 AI 产品纪要拆解的 GitHub Pages 配置页。",
    active: "config",
    depth: 1,
    body
  });
}

function renderConfigArticle(article, index) {
  return `<article class="config-article" id="${escapeHtml(article.slug)}">
    <header class="config-article-header">
      <p>${index + 1} · ${escapeHtml(article.date)}</p>
      <h2>${escapeHtml(article.title)}</h2>
      <p class="config-article-link"><a href="${articleUrl(article)}">单篇在线页面</a></p>
      <div class="article-summary">${escapeHtml(article.summary)}</div>
      ${tagList(article.tags)}
      ${(article.keywords || []).length ? `<h3>关键词</h3>${tagList(article.keywords)}` : ""}
    </header>

    <section class="config-section">
      <h3>主题地图</h3>
      ${renderTopicMap(article)}
    </section>

    <section class="config-article-grid">
      <div>
        <h3>章节结构</h3>
        <ol class="timeline">
          ${(article.chapters || []).map((chapter) => `<li>
            <span>${escapeHtml(chapter.time || "")}</span>
            <strong>${escapeHtml(chapter.title || "")}</strong>
            <p>${escapeHtml(chapter.summary || "")}</p>
          </li>`).join("")}
        </ol>
      </div>
      <div>
        <h3>行动项</h3>
        <ul class="action-list">${listItems(article.actions)}</ul>
        ${(article.learningFocus || []).length ? `<h3>学习重点</h3><ul class="action-list">${listItems(article.learningFocus)}</ul>` : ""}
      </div>
    </section>

    <section class="config-section">
      <h3>道法术器势完整拆解</h3>
      ${DIMENSIONS.map(([key, label]) => dimensionBlock(article, key, label, `${article.slug}-${key}`)).join("")}
    </section>
  </article>`;
}

function dimensionBlock(article, key, label, id = key) {
  const item = article.fiveDimensions?.[key] || {};
  const points = item["拆解要点"] || [];
  const actions = item["行动清单"] || [];
  const evidence = item["关键证据"] || [];
  return `<section class="dimension-block" id="${escapeHtml(id)}">
    <h2>${label} · ${escapeHtml(item["核心判断"] || "")}</h2>
    ${points.length ? `<h3>拆解要点</h3><ul>${points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}
    ${evidence.length ? `<h3>关键证据</h3><ul>${evidence.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}
    ${actions.length ? `<h3>行动清单</h3><ul>${actions.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}
    ${item["可复用动作"] ? `<p class="reuse"><strong>可复用动作：</strong>${escapeHtml(item["可复用动作"])}</p>` : ""}
  </section>`;
}

function renderArticle(article) {
  const body = `<main>
    <article class="article-page">
      <header class="article-title">
        <a class="back-link" href="../../index.html">返回首页</a>
        <p>${escapeHtml(article.date)}</p>
        <h1>${escapeHtml(article.title)}</h1>
        <div class="article-summary">${escapeHtml(article.summary)}</div>
        ${tagList(article.tags)}
      </header>

      <section class="section two-column">
        <div>
          <h2>章节结构</h2>
          <ol class="timeline">
            ${(article.chapters || []).map((chapter) => `<li>
              <span>${escapeHtml(chapter.time || "")}</span>
              <strong>${escapeHtml(chapter.title || "")}</strong>
              <p>${escapeHtml(chapter.summary || "")}</p>
            </li>`).join("")}
          </ol>
        </div>
        <div>
          <h2>行动项</h2>
          <ul class="action-list">
            ${(article.actions || []).map((action) => `<li>${escapeHtml(action)}</li>`).join("")}
          </ul>
          ${(article.learningFocus || []).length ? `<h2>学习重点</h2><ul class="action-list">${listItems(article.learningFocus)}</ul>` : ""}
        </div>
      </section>

      <nav class="dimension-nav" aria-label="五维拆解导航">
        ${DIMENSIONS.map(([key, label]) => `<a href="#${key}">${label}</a>`).join("")}
      </nav>

      ${DIMENSIONS.map(([key, label]) => dimensionBlock(article, key, label)).join("")}
    </article>
  </main>`;

  return pageShell({
    title: `${article.title} | ${SITE_TITLE}`,
    description: article.summary,
    depth: 2,
    body
  });
}

function renderLinksJson() {
  return JSON.stringify({
    site: BASE_URL,
    repository: REPO_URL,
    configPage: `${BASE_URL}/config/`,
    articles: articles.map((article) => ({
      title: article.title,
      date: article.date,
      slug: article.slug,
      url: articleUrl(article)
    }))
  }, null, 2) + "\n";
}

writeFile(path.join(ROOT, ".nojekyll"), "");
writeFile(path.join(ROOT, "index.html"), renderHome());
writeFile(path.join(ROOT, "config", "index.html"), renderConfig());
writeFile(path.join(ROOT, "links.json"), renderLinksJson());

for (const article of articles) {
  writeFile(path.join(ROOT, "articles", article.slug, "index.html"), renderArticle(article));
}

console.log(`build: ${articles.length} articles`);
