import { site } from "../data/site.js";
import { posts, blogCategories } from "../data/blog.js";
import { blogImage, blogBodyImages } from "../data/images.js";
import { layout } from "../templates/layout.js";
import { esc, icon, figure, sectionTitle } from "../templates/components.js";

function blogIndex() {
  const body = `
<section class="page-head"><div class="wrap">
  <span class="badge">${icon("book")} 라이더 가이드</span>
  <h1>블로그 · 라이더 이야기</h1>
  <p class="lead">퀵서비스 시작 방법, 투잡·부업 팁, 오토바이 보험·관리, 안전운전, 수익 노하우까지 — 라이더에게 실질적으로 필요한 정보를 전합니다.</p>
</div></section>
<section class="section"><div class="wrap">
  <div class="blog-cats">
    ${blogCategories.map((c) => `<span class="chip chip-static">${esc(c)}</span>`).join("")}
  </div>
  <div class="card-grid posts" style="margin-top:1.6rem">
    ${posts
      .map(
        (p) => `<a class="card post" href="/blog/${p.slug}/">
          <img class="post-thumb" src="${blogImage(p.category)}" alt="${esc(p.title)}" width="600" height="338" loading="lazy" decoding="async">
          <div class="post-body">
            <span class="post-cat">${esc(p.category)}</span>
            <h2>${esc(p.title)}</h2>
            <p>${esc(p.excerpt)}</p>
            <time>${esc(p.date)}</time>
          </div>
        </a>`
      )
      .join("")}
  </div>
</div></section>`;
  return {
    path: "/blog/",
    html: layout({
      title: "블로그 — 퀵서비스·라이더 정보 가이드",
      description:
        "퀵서비스 시작 방법, 투잡·부업, 오토바이 보험·관리, 안전운전, 수익 노하우 등 라이더 정보 블로그. 실전에 도움이 되는 가이드를 제공합니다.",
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
  const related = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  const bodyImgs = blogBodyImages(p.category);

  // 본문 섹션 사이에 이미지 2장 삽입 (H1 아래 대표 이미지 1장 + 본문 2장)
  const sections = p.body
    .map((s, i) => {
      let block = `<h2>${esc(s.h)}</h2><p>${esc(s.p)}</p>`;
      if (i === 1 && bodyImgs[0])
        block += figure(bodyImgs[0], `${p.title} 관련 이미지 1`, s.h);
      if (i === 3 && bodyImgs[1])
        block += figure(bodyImgs[1], `${p.title} 관련 이미지 2`, p.body[i + 1] ? p.body[i + 1].h : s.h);
      return block;
    })
    .join("");

  const body = `
<section class="page-head article-head"><div class="wrap wrap-narrow">
  <span class="post-cat">${esc(p.category)}</span>
  <h1>${esc(p.title)}</h1>
  <p class="article-meta"><time>${esc(p.date)}</time> · ${esc(site.name)} 라이더 가이드</p>
  <img class="article-hero" src="${blogImage(p.category)}" alt="${esc(p.title)} 대표 이미지" width="1200" height="525" loading="eager" fetchpriority="high" decoding="async">
</div></section>
<section class="section" style="padding-top:1.5rem"><div class="wrap wrap-narrow article-body prose">
  <p class="lead">${esc(p.excerpt)}</p>
  ${sections}
  <p class="disclaimer">※ 본 글은 일반 정보 제공을 목적으로 하며, 특정 결과나 수익을 보장하지 않습니다. 면허·보험·세금 등은 개인 상황과 관련 법령에 따라 다를 수 있으므로 관련 기관·전문가의 확인을 받으시기 바랍니다.</p>
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
          <img class="post-thumb" src="${blogImage(r.category)}" alt="${esc(r.title)}" width="600" height="338" loading="lazy" decoding="async">
          <div class="post-body">
            <span class="post-cat">${esc(r.category)}</span>
            <h3>${esc(r.title)}</h3>
            <time>${esc(r.date)}</time>
          </div>
        </a>`
      )
      .join("")}
  </div>
</div></section>`;

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
    image: site.url + blogImage(p.category),
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
