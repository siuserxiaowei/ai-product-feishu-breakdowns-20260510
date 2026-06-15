# 2026-05-10 AI 产品飞书纪要拆解

这是一个独立公开仓库，用来保存 2026 年 5 月 10 日三篇飞书智能纪要的公开派生总结和“道、法、术、器、势”拆解。

这个仓库的核心目的很简单：即使原飞书页面后续关闭公开访问，仍然可以通过自己的 GitHub 仓库和 GitHub Pages 长期查看已经整理好的结构化内容。

## 在线入口

- GitHub Pages 首页：https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/
- 在线配置页与完整备份页：https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/config/
- 数据端点：https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/data/articles.json
- 链接清单：https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/links.json
- GitHub 仓库：https://github.com/siuserxiaowei/ai-product-feishu-breakdowns-20260510

## 这个仓库是干嘛的

本仓库把三场 AI 产品相关讨论整理成可长期阅读、可复制、可再构建的静态站点。

它不是飞书原文镜像，也不是逐字稿仓库。它保存的是已经整理过的公开派生内容，包括摘要、关键词、主题地图、章节结构、行动项、学习重点，以及“道、法、术、器、势”五个维度的分析。

适合这些使用场景：

- 自己长期备份飞书纪要的结构化总结
- 快速复习 2026-05-10 的 AI 产品、增长和教育产品讨论
- 学习如何把会议纪要拆成可执行的产品判断和行动清单
- 作为一个小型 GitHub Pages 知识站模板
- 给新人展示“这个讨论讲了什么、怎么读、怎么继续维护”

## 三篇文章

| 时间 | 标题 | 在线页面 |
| --- | --- | --- |
| 2026-05-10 14:21 | AI 产品应用与转型讨论 | https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/articles/20260510-1421-ai-product-transformation/ |
| 2026-05-10 18:45 | AI 产品开发与获客经验分享 | https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/articles/20260510-1845-ai-product-growth-playbook/ |
| 2026-05-10 19:56 | AI 教育产品规划与交流 | https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/articles/20260510-1956-ai-education-product-plan/ |

## 推荐阅读路径

如果你是第一次进来，建议按这个顺序读：

1. 先打开配置页：https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/config/
2. 看顶部的三篇文章目录，了解三篇材料的时间和主题。
3. 在同一个配置页里依次读每篇的摘要、主题地图、章节结构和行动项。
4. 再看每篇的“道、法、术、器、势”完整拆解。
5. 如果想复用数据或二次生成页面，再看 `data/articles.json` 和 `scripts/build.mjs`。

`config/` 是最重要的页面。它不只是配置说明，也是一页完整备份，已经把三篇内容都集中展开。

## 内容结构

每篇文章包含以下内容：

- `summary`：会议核心摘要
- `keywords`：关键词
- `tags`：标签
- `topicMap`：主题地图
- `chapters`：章节结构
- `actions`：行动项
- `learningFocus`：学习重点
- `fiveDimensions.dao`：道，底层判断和原则
- `fiveDimensions.fa`：法，方法论和框架
- `fiveDimensions.shu`：术，具体执行动作
- `fiveDimensions.qi`：器，工具、系统和资源
- `fiveDimensions.shi`：势，趋势、时机和外部环境

## 公开边界

本仓库只保存公开派生的结构化总结，不保存以下内容：

- 原始飞书正文
- 飞书临时鉴权链接
- 图片鉴权地址
- 完整逐字稿
- 内部账号、token、密码或私有接口地址

`npm run validate` 会扫描生成文件，避免明显敏感内容进入公开页面。

## 仓库结构

```text
.
├── README.md
├── package.json
├── index.html
├── config/
│   └── index.html
├── articles/
│   ├── 20260510-1421-ai-product-transformation/
│   ├── 20260510-1845-ai-product-growth-playbook/
│   └── 20260510-1956-ai-education-product-plan/
├── data/
│   └── articles.json
├── assets/
│   └── site.css
├── scripts/
│   ├── build.mjs
│   └── validate.mjs
└── links.json
```

关键文件说明：

| 路径 | 作用 |
| --- | --- |
| `data/articles.json` | 三篇文章的结构化数据源 |
| `scripts/build.mjs` | 根据 JSON 生成首页、配置页、文章页和链接清单 |
| `scripts/validate.mjs` | 校验文件完整性、重复 slug 和敏感内容 |
| `config/index.html` | 在线配置页，也是三篇内容的完整备份页 |
| `articles/*/index.html` | 单篇文章页面 |
| `assets/site.css` | 全站样式 |
| `links.json` | 机器可读的在线链接清单 |

## 克隆与本地运行

前置要求：

- Git
- Node.js 18 或更高版本
- Python 3，仅用于本地静态预览

克隆仓库：

```bash
git clone https://github.com/siuserxiaowei/ai-product-feishu-breakdowns-20260510.git
cd ai-product-feishu-breakdowns-20260510
```

构建并校验：

```bash
npm run all
```

启动本地预览：

```bash
npm run serve
```

打开：

```text
http://127.0.0.1:8130/
```

常用命令：

| 命令 | 作用 |
| --- | --- |
| `npm run build` | 重新生成静态页面 |
| `npm run validate` | 校验生成结果和公开边界 |
| `npm run all` | 先构建再校验 |
| `npm run serve` | 用 Python 静态服务器本地预览 |

## 如何学习这个仓库

如果你想学习这个仓库怎么做，可以按代码阅读顺序看：

1. `data/articles.json`：先看内容数据长什么样。
2. `scripts/build.mjs`：看如何把结构化数据变成 HTML 页面。
3. `assets/site.css`：看页面视觉和响应式布局。
4. `scripts/validate.mjs`：看公开发布前做了哪些校验。
5. `config/index.html`：看最终生成的完整备份页。

重点理解两个设计：

- 数据和页面分离：内容写在 JSON，页面由脚本生成。
- 配置页即备份页：`config/` 同时保存仓库配置、文章目录和完整结构化总结。

## 如何更新内容

修改已有文章：

1. 编辑 `data/articles.json`。
2. 运行 `npm run all`。
3. 打开本地页面检查效果。
4. 提交并推送。

示例：

```bash
npm run all
git status -sb
git add data/articles.json config/index.html articles/ links.json
git commit -m "Update meeting breakdown content"
git push origin main
```

新增文章时，需要在 `data/articles.json` 里增加一条完整对象，至少包含：

- `id`
- `slug`
- `title`
- `date`
- `summary`
- `tags`
- `chapters`
- `actions`
- `fiveDimensions`

然后运行：

```bash
npm run all
```

构建脚本会自动生成新的文章页，并更新配置页和链接清单。

## 发布方式

这个仓库使用 GitHub Pages 发布静态站：

- 仓库：`siuserxiaowei/ai-product-feishu-breakdowns-20260510`
- 分支：`main`
- 发布目录：仓库根目录 `/`
- 线上地址：https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/

因为生成后的 HTML、CSS 和 JSON 都直接提交到仓库根目录，GitHub Pages 不需要额外构建步骤。

推送后可以检查 Pages 状态：

```bash
gh api repos/siuserxiaowei/ai-product-feishu-breakdowns-20260510/pages
```

也可以检查最近部署：

```bash
gh run list --repo siuserxiaowei/ai-product-feishu-breakdowns-20260510 --limit 5
```

## 验证清单

每次发布前建议确认：

- `npm run all` 通过
- `config/index.html` 包含三篇完整结构化总结
- `articles/*/index.html` 没有 `[object Object]`
- `rg` 扫描不到飞书私链、token、密码等敏感内容
- `git status -sb` 没有遗漏文件
- GitHub Pages 返回 `200`

常用检查：

```bash
npm run all
rg -n "\\[object Object\\]|access_token|tenant_access_token|password|secret|from_copylink|feishu\\.cn" index.html config articles data links.json assets
curl -I -L https://siuserxiaowei.github.io/ai-product-feishu-breakdowns-20260510/config/
```

## 常见问题

**为什么不直接放飞书原文？**

因为飞书页面所有权不在本仓库，公开状态也可能变化。本仓库只保存整理后的公开派生总结，避免保存原始正文、临时链接和鉴权信息。

**为什么配置页这么长？**

因为它承担长期备份功能。即使以后单篇入口变化，`config/` 页面也能集中查看三篇完整结构化内容。

**为什么既有文章页，又把内容放进配置页？**

文章页适合单篇阅读，配置页适合总览、备份和复制。

**修改 `data/articles.json` 后页面为什么没变？**

需要运行 `npm run build` 或 `npm run all`，生成后的 HTML 才会更新。

**推送后线上页面还是旧的怎么办？**

GitHub Pages 和 CDN 可能有短暂缓存。先检查 raw 文件是否更新，再检查 Pages 状态和部署记录。

## 维护原则

- 保持仓库独立，只放这 3 篇飞书 AI 产品纪要拆解。
- 新内容优先进入 `data/articles.json`，不要手写大量 HTML。
- 每次改数据后运行 `npm run all`。
- 不保存飞书原文、私有链接、token 或内部账号信息。
- README 和 `config/` 页面要让新人能独立理解、学习、克隆和运行。
