// 간단한 정적 파일 서버 (개발용). 외부 의존성 없음.
//   node scripts/serve.js  →  http://localhost:8080
import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "..", "dist");
const PORT = process.env.PORT || 8080;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
};

async function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  let file = path.join(DIST, p);
  try {
    const stat = await fs.stat(file);
    if (stat.isDirectory()) file = path.join(file, "index.html");
    return file;
  } catch {
    // 확장자 없으면 디렉터리 index.html 시도
    if (!path.extname(p)) {
      const alt = path.join(DIST, p, "index.html");
      try {
        await fs.stat(alt);
        return alt;
      } catch {}
    }
    return null;
  }
}

createServer(async (req, res) => {
  let file = await resolveFile(req.url);
  if (!file) {
    file = path.join(DIST, "404.html");
    res.statusCode = 404;
  }
  try {
    const data = await fs.readFile(file);
    res.setHeader("Content-Type", MIME[path.extname(file)] || "application/octet-stream");
    res.end(data);
  } catch {
    res.statusCode = 500;
    res.end("500");
  }
}).listen(PORT, () => {
  console.log(`▶ http://localhost:${PORT} (dist/ 서빙 중)`);
});
