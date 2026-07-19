#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
raw-photos/ 폴더에 넣은 원본 사진을 사이트용 WebP(30KB 내외)로 변환한다.
무료 이미지 사이트(Pixabay/Unsplash/Pexels 등)에서 받은 사진을
raw-photos/{슬롯명}.(jpg|jpeg|png|webp) 로 저장하고 실행하면 된다.

사용: python3 scripts/import-photos.py   (또는 npm run photos:import)
- raw-photos 에 있는 파일만 교체하고, 없는 슬롯은 기존 이미지를 유지한다.
"""
import os, glob
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "raw-photos")
OUT = os.path.join(ROOT, "assets", "img", "photos")
os.makedirs(OUT, exist_ok=True)

# 슬롯명 → (가로, 세로)
SLOTS = {
    "hero-main-upload": (1400, 788),   # 메인 상단 배너
    "hero-home": (1200, 540), "hero-jobs": (1200, 480), "hero-blog": (1200, 480),
    "region-urban": (1200, 480), "region-industrial": (1200, 480),
    "region-suburban": (1200, 480), "region-coastal": (1200, 480),
    "theme-rider": (900, 562), "theme-city": (900, 562), "theme-delivery": (900, 562),
    "theme-route": (900, 562), "theme-income": (900, 562), "theme-safety": (900, 562),
    "theme-map": (900, 562), "theme-night": (900, 562),
}
EXTS = ("jpg", "jpeg", "png", "webp", "JPG", "JPEG", "PNG", "WEBP")

def find_source(name):
    for e in EXTS:
        p = os.path.join(RAW, f"{name}.{e}")
        if os.path.exists(p):
            return p
    return None

def cover(img, w, h):
    cw, ch = img.size
    scale = max(w / cw, h / ch)
    nw, nh = round(cw * scale), round(ch * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    x, y = (nw - w) // 2, (nh - h) // 2
    return img.crop((x, y, x + w, y + h))

def convert(src, name, w, h):
    img = Image.open(src).convert("RGB")
    img = cover(img, w, h)
    out = os.path.join(OUT, f"{name}.webp")
    limit = (60 if name == "hero-main-upload" else 46 if w >= 1100 else 34) * 1024
    q = 80
    while True:
        img.save(out, "WEBP", quality=q, method=6)
        if os.path.getsize(out) <= limit or q <= 40:
            break
        q -= 5
    print(f"  ✓ {name}.webp  {w}x{h}  {os.path.getsize(out)/1024:.1f}KB (q{q})  ← {os.path.basename(src)}")

def main():
    if not os.path.isdir(RAW):
        print("raw-photos/ 폴더가 없습니다. 먼저 사진을 넣어주세요.")
        return
    done = 0
    for name, (w, h) in SLOTS.items():
        src = find_source(name)
        if src:
            convert(src, name, w, h)
            done += 1
    if done == 0:
        found = [os.path.basename(f) for f in glob.glob(os.path.join(RAW, "*")) if not f.endswith(".md")]
        print("변환할 슬롯 파일을 찾지 못했습니다.")
        if found:
            print("raw-photos 안의 파일:", found)
            print("→ 파일명을 슬롯명으로 맞춰주세요. 예: theme-rider.jpg, hero-home.jpg")
    else:
        print(f"완료: {done}개 이미지 변환. 이제 `npm run build` 후 커밋하세요.")

if __name__ == "__main__":
    main()
