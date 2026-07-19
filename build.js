// ============================================================
// 바이크퀵 정적 사이트 빌드 스크립트 (외부 의존성 없음)
//   node build.js  →  dist/ 에 정적 HTML 생성
// ============================================================
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./src/data/site.js";
import { posts } from "./src/data/blog.js";
import { homePage } from "./src/pages/home.js";
import { jobsPages } from "./src/pages/jobs.js";
import { regionsPages } from "./src/pages/regions.js";
import { contentPages } from "./src/pages/content.js";
import { blogPages } from "./src/pages/blog.js";
import { communityPages } from "./src/pages/community.js";
import { layout } from "./src/templates/layout.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");

// 모든 페이지 수집
function collectPages() {
  return [
    homePage(),
    ...jobsPages(),
    ...regionsPages(),
    ...contentPages(),
    ...blogPages(),
    ...communityPages(),
  ];
}

// 경로 → 파일 경로 (/ → index.html, /jobs/ → jobs/index.html)
function outFile(urlPath) {
  let p = urlPath.replace(/^\//, "").replace(/\/$/, "");
  if (p === "") return "index.html";
  return path.join(p, "index.html");
}

async function rmDist() {
  await fs.rm(DIST, { recursive: true, force: true });
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });
  for (const e of entries) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) await copyDir(s, d);
    else await fs.copyFile(s, d);
  }
}

function sitemap(pages) {
  const now = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((pg) => {
      const loc = site.url + pg.path;
      const priority =
        pg.path === "/" ? "1.0" : pg.path.split("/").length <= 3 ? "0.8" : "0.6";
      // 페이지의 대표 이미지(로컬 + Unsplash)를 이미지 사이트맵에 포함
      const local = [...(pg.html || "").matchAll(/\/assets\/img\/photos\/[a-z0-9-]+\.webp/g)].map((m) => site.url + m[0]);
      const remote = [...(pg.html || "").matchAll(/https:\/\/images\.unsplash\.com\/photo-[^"'\s]+/g)].map((m) => m[0].replace(/&/g, "&amp;"));
      const imgs = [...new Set([...local, ...remote])].slice(0, 6);
      const imgXml = imgs
        .map((src) => `\n    <image:image><image:loc>${src}</image:loc></image:image>`)
        .join("");
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>${imgXml}\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`;
}

function robots() {
  // 주요 검색봇(구글·네이버 Yeti·빙·다음) 명시 허용 + 사이트맵/RSS 안내
  return [
    "User-agent: Googlebot",
    "Allow: /",
    "",
    "User-agent: Yeti", // 네이버 검색 로봇
    "Allow: /",
    "",
    "User-agent: Daumoa", // 다음 검색 로봇
    "Allow: /",
    "",
    "User-agent: bingbot",
    "Allow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${site.url}/sitemap.xml`,
    `Sitemap: ${site.url}/sitemap1.xml`,
    `Sitemap: ${site.url}/rss.xml`,
    `Sitemap: ${site.url}/rss1.xml`,
    "",
  ].join("\n");
}

// XML 특수문자 이스케이프
function xmlEsc(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// 날짜 → RFC-822 (RSS pubDate). KST 09:00 기준으로 안정 변환.
function rfc822(dateStr) {
  const d = new Date(`${dateStr}T09:00:00+09:00`);
  return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

// RSS 2.0 피드 — 블로그 신규 글을 네이버·구글이 빠르게 수집하도록
function rss() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const build = new Date().toUTCString();
  const items = sorted
    .map((p) => {
      const link = `${site.url}/blog/${p.slug}/`;
      return [
        "    <item>",
        `      <title>${xmlEsc(p.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        p.category ? `      <category>${xmlEsc(p.category)}</category>` : "",
        `      <description>${xmlEsc(p.excerpt || "")}</description>`,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEsc(site.name)} 블로그 · 라이더 가이드</title>
    <link>${site.url}/blog/</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
    <description>${xmlEsc(site.description)}</description>
    <language>ko</language>
    <lastBuildDate>${build}</lastBuildDate>
    <generator>bikequick-static</generator>
${items}
  </channel>
</rss>
`;
}

function notFoundPage() {
  const body = `
<section class="page-head"><div class="wrap" style="text-align:center;padding:4rem 0">
  <h1 style="font-size:3rem">404</h1>
  <p class="lead">요청하신 페이지를 찾을 수 없습니다.</p>
  <div class="cta-group" style="justify-content:center">
    <a class="btn btn-primary" href="/">홈으로</a>
    <a class="btn btn-outline" href="/regions/">지역별 모집</a>
    <a class="btn btn-outline" href="/jobs/">기사모집</a>
  </div>
</div></section>`;
  return layout({
    title: "페이지를 찾을 수 없습니다 (404)",
    description: "요청하신 페이지를 찾을 수 없습니다.",
    path: "/404.html",
    body,
  });
}

async function build() {
  const t0 = Date.now();
  // 자산 캐시 무효화 버전(빌드 시각 기반) — CSS/JS 변경이 즉시 반영되도록
  site.assetVersion = t0.toString(36);
  await rmDist();
  await fs.mkdir(DIST, { recursive: true });

  const pages = collectPages();

  // 중복 경로 검사
  const seen = new Set();
  for (const pg of pages) {
    if (seen.has(pg.path)) throw new Error(`중복 경로 발견: ${pg.path}`);
    seen.add(pg.path);
  }

  // HTML 페이지 작성
  for (const pg of pages) {
    const file = path.join(DIST, outFile(pg.path));
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file, pg.html, "utf8");
  }

  // 404
  await fs.writeFile(path.join(DIST, "404.html"), notFoundPage(), "utf8");

  // 정적 자산 복사
  await copyDir(path.join(__dirname, "assets"), path.join(DIST, "assets"));

  // sitemap / robots / rss (+ 추가 제출용 사본 sitemap1.xml, rss1.xml)
  const sitemapXml = sitemap(pages);
  const rssXml = rss();
  await fs.writeFile(path.join(DIST, "sitemap.xml"), sitemapXml, "utf8");
  await fs.writeFile(path.join(DIST, "sitemap1.xml"), sitemapXml, "utf8");
  await fs.writeFile(path.join(DIST, "robots.txt"), robots(), "utf8");
  await fs.writeFile(path.join(DIST, "rss.xml"), rssXml, "utf8");
  await fs.writeFile(path.join(DIST, "rss1.xml"), rssXml, "utf8");

  const ms = Date.now() - t0;
  console.log(`✓ 빌드 완료: ${pages.length}개 페이지 → dist/ (${ms}ms)`);
  console.log(`  sitemap.xml, rss.xml, robots.txt, 404.html 생성`);
}

build().catch((err) => {
  console.error("✗ 빌드 실패:", err);
  process.exit(1);
});
