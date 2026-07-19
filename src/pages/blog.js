import { site } from "../data/site.js";
import { posts, blogCategories } from "../data/blog.js";
import { layout } from "../templates/layout.js";
import { esc, icon, sectionTitle } from "../templates/components.js";

function blogIndex() {
  const body = `
<section class="page-head"><div class="wrap">
  <h1>블로그 · 라이더 이야기</h1>
  <p class="lead">퀵서비스 시작 방법, 투잡·부업 팁, 보험·오토바이 관리, 안전운전, 수익 노하우까지 라이더에게 필요한 정보를 전합니다.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="blog-cats">
    ${blogCategories.map((c) => `<span class="chip chip-static">${esc(c)}</span>`).join("")}
  </div>
  <div class="card-grid posts">
    ${posts
      .map(
        (p) => `<a class="card post" href="/blog/${p.slug}/">
          <span class="post-cat">${esc(p.category)}</span>
          <h2>${esc(p.title)}</h2>
          <p>${esc(p.excerpt)}</p>
          <time>${esc(p.date)}</time>
        </a>`
      )
      .join("")}
  </div>
</div></section>
`;
  return {
    path: "/blog/",
    html: layout({
      title: "블로그 — 퀵서비스·라이더 정보",
      description:
        "퀵서비스 시작 방법, 투잡·부업, 오토바이 보험·관리, 안전운전, 수익 노하우 등 라이더 정보 블로그.",
      path: "/blog/",
      body,
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "블로그", href: "/blog/" },
      ],
    }),
  };
}

function blogPost(p) {
  const path = `/blog/${p.slug}/`;
  const idx = posts.findIndex((x) => x.slug === p.slug);
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const body = `
<section class="page-head article-head"><div class="wrap">
  <span class="post-cat">${esc(p.category)}</span>
  <h1>${esc(p.title)}</h1>
  <p class="article-meta"><time>${esc(p.date)}</time> · ${esc(site.name)}</p>
</div></section>
<section class="section"><div class="wrap article-body prose">
  <p class="lead">${esc(p.excerpt)}</p>
  ${p.body.map((s) => `<h2>${esc(s.h)}</h2><p>${esc(s.p)}</p>`).join("")}
  <p class="disclaimer">※ 본 글은 일반 정보 제공을 목적으로 하며, 특정 결과나 수익을 보장하지 않습니다. 개인 상황에 따라 결과가 달라질 수 있습니다.</p>
  <div class="article-cta">
    <a class="btn btn-primary" href="/jobs/">기사모집 보기 ${icon("arrow")}</a>
    <a class="btn btn-outline" href="/blog/">← 블로그 목록</a>
  </div>
</div></section>
<section class="section section-alt"><div class="wrap">
  ${sectionTitle("", "관련 글")}
  <div class="card-grid posts">
    ${related
      .map(
        (r) => `<a class="card post" href="/blog/${r.slug}/">
          <span class="post-cat">${esc(r.category)}</span>
          <h3>${esc(r.title)}</h3>
          <time>${esc(r.date)}</time>
        </a>`
      )
      .join("")}
  </div>
</div></section>
`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    datePublished: p.date,
    dateModified: p.date,
    inLanguage: "ko",
    articleSection: p.category,
    mainEntityOfPage: site.url + path,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: site.url + site.logo },
    },
    image: site.url + site.ogImage,
  };
  return {
    path,
    html: layout({
      title: p.title,
      description: p.excerpt,
      path,
      body,
      ogType: "article",
      jsonld: [articleSchema],
      breadcrumbs: [
        { name: "홈", href: "/" },
        { name: "블로그", href: "/blog/" },
        { name: p.title, href: path },
      ],
    }),
  };
}

export function blogPages() {
  return [blogIndex(), ...posts.map(blogPost)];
}
