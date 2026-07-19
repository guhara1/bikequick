#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
photo-sources.json 의 이미지 URL을 다운로드해 사이트용 WebP(30KB 내외)로 변환.
※ 인터넷이 열린 환경에서 실행하세요. (차단 환경에서는 다운로드가 실패합니다.)

photo-sources.json 형식:
  { "theme-rider": "https://.../photo.jpg", "region-urban": "https://.../city.jpg", ... }

사용: python3 scripts/fetch-photos.py
"""
import json, os, io, ssl, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "img", "photos")
CFG = os.path.join(ROOT, "photo-sources.json")
os.makedirs(OUT, exist_ok=True)

SLOTS = {
    "hero-main-upload": (1400, 788),
    "hero-home": (1200, 540), "hero-jobs": (1200, 480), "hero-blog": (1200, 480),
    "region-urban": (1200, 480), "region-industrial": (1200, 480),
    "region-suburban": (1200, 480), "region-coastal": (1200, 480),
    "theme-rider": (900, 562), "theme-city": (900, 562), "theme-delivery": (900, 562),
    "theme-route": (900, 562), "theme-income": (900, 562), "theme-safety": (900, 562),
    "theme-map": (900, 562), "theme-night": (900, 562),
}

# 프록시 CA 번들이 있으면 사용(에이전트 환경), 없으면 기본 SSL
CA = "/root/.ccr/ca-bundle.crt"
ctx = ssl.create_default_context(cafile=CA) if os.path.exists(CA) else ssl.create_default_context()

def cover(img, w, h):
    cw, ch = img.size
    s = max(w / cw, h / ch)
    img = img.resize((round(cw * s), round(ch * s)), Image.LANCZOS)
    x, y = (img.width - w) // 2, (img.height - h) // 2
    return img.crop((x, y, x + w, y + h))

def process(name, url, w, h):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30, context=ctx) as r:
        raw = r.read()
    img = Image.open(io.BytesIO(raw)).convert("RGB")
    img = cover(img, w, h)
    out = os.path.join(OUT, f"{name}.webp")
    limit = (60 if name == "hero-main-upload" else 46 if w >= 1100 else 34) * 1024
    q = 80
    while True:
        img.save(out, "WEBP", quality=q, method=6)
        if os.path.getsize(out) <= limit or q <= 40:
            break
        q -= 5
    print(f"  ✓ {name}.webp {w}x{h} {os.path.getsize(out)/1024:.1f}KB (q{q})")

def main():
    if not os.path.exists(CFG):
        print("photo-sources.json 이 없습니다. 슬롯→이미지URL 매핑을 채워주세요.")
        return
    sources = json.load(open(CFG))
    done = 0
    for name, url in sources.items():
        if name not in SLOTS:
            print(f"  (건너뜀) 알 수 없는 슬롯: {name}")
            continue
        if not url or not url.startswith("http"):
            continue
        try:
            process(name, url, *SLOTS[name])
            done += 1
        except Exception as e:
            print(f"  ✗ {name} 실패: {e}")
    print(f"완료: {done}개 변환. 이제 `node build.js` 후 커밋하세요.")

if __name__ == "__main__":
    main()
