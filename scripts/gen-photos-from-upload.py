#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
업로드된 배너(실제 라이더 사진)에서 깨끗한 영역을 잘라
사이트 전반의 이미지를 '실사진 WebP'로 교체한다.
(외부 무료 이미지 사이트는 이 실행 환경 프록시에서 차단되어 직접 다운로드 불가)
"""
import json, base64, io, os
from PIL import Image, ImageEnhance

SRC = "/root/.claude/projects/-home-user-bikequick/abfe4088-6ba7-54fc-a3bd-6b90002cef47/tool-results/mcp-Google_Drive-download_file_content-1784429852936.txt"
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img", "photos")
os.makedirs(OUT, exist_ok=True)

data = json.load(open(SRC))
base = Image.open(io.BytesIO(base64.b64decode(data["content"]))).convert("RGB")
W, H = base.size

def frac_box(l, t, r, b):
    return (int(W*l), int(H*t), int(W*r), int(H*b))

def cover(box, out_w, out_h, name, quality=72, tint=None, bright=1.0):
    crop = base.crop(box)
    cw, ch = crop.size
    # cover 스케일
    scale = max(out_w/cw, out_h/ch)
    nw, nh = round(cw*scale), round(ch*scale)
    crop = crop.resize((nw, nh), Image.LANCZOS)
    x = (nw-out_w)//2; y = (nh-out_h)//2
    crop = crop.crop((x, y, x+out_w, y+out_h))
    if bright != 1.0:
        crop = ImageEnhance.Brightness(crop).enhance(bright)
    if tint:
        overlay = Image.new("RGB", crop.size, tint)
        crop = Image.blend(crop, overlay, 0.18)
    path = os.path.join(OUT, name+".webp")
    q = quality
    limit = 46*1024 if out_w >= 1100 else 34*1024
    while True:
        crop.save(path, "WEBP", quality=q, method=6)
        if os.path.getsize(path) <= limit or q <= 40:
            break
        q -= 5
    print(f"  {name}.webp {out_w}x{out_h} {os.path.getsize(path)/1024:.1f}KB q{q}")

# 깨끗한 영역(라이더/도시/도로) — 배너 우측이 사진, 좌측은 텍스트라 제외
RIDER  = frac_box(0.50, 0.05, 1.00, 0.83)   # 라이더+박스+도시
RIDERW = frac_box(0.50, 0.05, 1.00, 0.74)   # 와이드용
SKY    = frac_box(0.55, 0.05, 1.00, 0.42)   # 우측 도시 스카이라인
HELMET = frac_box(0.585, 0.06, 0.85, 0.50)  # 헬멧/상반신
BOX    = frac_box(0.73, 0.15, 1.00, 0.66)   # 배달 박스
ROAD   = frac_box(0.50, 0.55, 1.00, 0.84)   # 앞바퀴+도로

print("실사진 크롭 생성...")
# 히어로(넓은 비율)
cover(RIDERW, 1200, 540, "hero-home")
cover(RIDERW, 1200, 480, "hero-jobs")
cover(ROAD,   1200, 480, "hero-blog")
# 지역 히어로
cover(SKY,    1200, 480, "region-urban")
cover(BOX,    1200, 480, "region-industrial")
cover(ROAD,   1200, 480, "region-suburban")
cover(SKY,    1200, 480, "region-coastal", tint=(20,60,90))
# 테마(본문)
cover(RIDER,  900, 562, "theme-rider")
cover(SKY,    900, 562, "theme-city")
cover(BOX,    900, 562, "theme-delivery")
cover(ROAD,   900, 562, "theme-route")
cover(RIDER,  900, 562, "theme-income")
cover(HELMET, 900, 562, "theme-safety")
cover(SKY,    900, 562, "theme-map")
cover(RIDER,  900, 562, "theme-night", bright=0.55, tint=(10,20,40))
print("완료.")
