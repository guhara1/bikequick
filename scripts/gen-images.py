#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
바이크퀵 브랜드 WebP 이미지 생성기 (외부 사진 다운로드 불가 환경용 대체)
  - 네이비×오렌지 브랜드 톤의 최적화 WebP 생성 (모두 30KB 이하 목표)
  - H1 위 대표 이미지 / 본문 이미지 / 블로그 갤러리 썸네일용
  - 실제 무료 사진으로 교체 시, 같은 파일명(assets/img/photos/*.webp)으로 덮어쓰면 됨
사용: python3 scripts/gen-images.py
"""
import math, os
from PIL import Image, ImageDraw

OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "img", "photos")
os.makedirs(OUT, exist_ok=True)
SCALE = 2  # 2배로 그린 뒤 다운샘플(안티에일리어싱)

# 브랜드 팔레트
NAVY = (20, 36, 58)
NAVY2 = (35, 66, 95)
ORANGE = (255, 90, 31)
ORANGE2 = (224, 68, 13)
TEAL = (23, 92, 110)
STEEL = (48, 68, 92)
CYAN = (26, 120, 140)
GREEN = (30, 96, 84)

def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def gradient(w, h, c1, c2, angle=35):
    """대각선 선형 그라디언트"""
    img = Image.new("RGB", (w, h), c1)
    px = img.load()
    rad = math.radians(angle)
    dx, dy = math.cos(rad), math.sin(rad)
    maxd = abs(w * dx) + abs(h * dy)
    for y in range(h):
        for x in range(w):
            d = (x * dx + y * dy) / maxd
            d = max(0.0, min(1.0, d))
            px[x, y] = lerp(c1, c2, d)
    return img

def soft_circle(draw, cx, cy, r, color, alpha=40):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (alpha,))

def overlay(base):
    """반투명 드로잉용 레이어 반환"""
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    return layer, ImageDraw.Draw(layer)

def finish(base, layer, name, final_w, final_h, quality=78):
    base = base.convert("RGBA")
    base.alpha_composite(layer)
    base = base.convert("RGB").resize((final_w, final_h), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    # 30KB 이하가 될 때까지 품질 조정
    q = quality
    while True:
        base.save(path, "WEBP", quality=q, method=6)
        if os.path.getsize(path) <= 30 * 1024 or q <= 40:
            break
        q -= 6
    kb = os.path.getsize(path) / 1024
    print(f"  {name}.webp  {final_w}x{final_h}  {kb:.1f}KB  (q{q})")
    return path

# ---------- 아이콘(라인아트) ----------
def icon_moto(d, cx, cy, s, col, width):
    """간단한 오토바이 실루엣"""
    r = int(s * 0.28)
    lw = width
    # 바퀴 두 개
    d.ellipse([cx - s*0.75 - r, cy - r, cx - s*0.75 + r, cy + r], outline=col, width=lw)
    d.ellipse([cx + s*0.75 - r, cy - r, cx + s*0.75 + r, cy + r], outline=col, width=lw)
    # 프레임
    d.line([cx - s*0.75, cy, cx - s*0.1, cy - s*0.25], fill=col, width=lw)
    d.line([cx - s*0.1, cy - s*0.25, cx + s*0.75, cy], fill=col, width=lw)
    d.line([cx - s*0.1, cy - s*0.25, cx + s*0.2, cy - s*0.25], fill=col, width=lw)
    # 핸들
    d.line([cx + s*0.55, cy - s*0.55, cx + s*0.85, cy], fill=col, width=lw)
    d.line([cx + s*0.42, cy - s*0.55, cx + s*0.7, cy - s*0.55], fill=col, width=lw)
    # 시트
    d.line([cx - s*0.35, cy - s*0.35, cx + s*0.05, cy - s*0.35], fill=col, width=lw)

def icon_helmet(d, cx, cy, s, col, width):
    d.pieslice([cx - s, cy - s, cx + s, cy + s], 180, 360, outline=col, width=width)
    d.line([cx - s, cy, cx + s, cy], fill=col, width=width)
    d.line([cx - s*0.2, cy, cx + s, cy - s*0.15], fill=col, width=width)  # 바이저

def icon_box(d, cx, cy, s, col, width):
    d.rounded_rectangle([cx - s, cy - s*0.8, cx + s, cy + s*0.8], radius=int(s*0.12), outline=col, width=width)
    d.line([cx, cy - s*0.8, cx, cy + s*0.8], fill=col, width=width)
    d.line([cx - s, cy - s*0.2, cx + s, cy - s*0.2], fill=col, width=width)

def icon_pin(d, cx, cy, s, col, width):
    d.ellipse([cx - s*0.7, cy - s, cx + s*0.7, cy + s*0.4], outline=col, width=width)
    d.polygon([cx - s*0.45, cy + s*0.2, cx + s*0.45, cy + s*0.2, cx, cy + s], outline=col)
    d.line([cx - s*0.45, cy + s*0.2, cx, cy + s], fill=col, width=width)
    d.line([cx + s*0.45, cy + s*0.2, cx, cy + s], fill=col, width=width)
    d.ellipse([cx - s*0.22, cy - s*0.5, cx + s*0.22, cy - s*0.06], outline=col, width=width)

def icon_chart(d, cx, cy, s, col, width):
    base = cy + s*0.8
    xs = [cx - s*0.7, cx - s*0.15, cx + s*0.4, cx + s*0.9]
    hs = [s*0.5, s*0.9, s*1.2, s*1.6]
    for x, h in zip(xs, hs):
        d.rectangle([x - s*0.18, base - h, x + s*0.18, base], outline=col, width=width)

def icon_road(d, cx, cy, s, col, width):
    d.polygon([cx - s*0.2, cy - s, cx + s*0.2, cy - s, cx + s*1.1, cy + s, cx - s*1.1, cy + s], outline=col)
    # 중앙 점선
    y = cy - s*0.7
    while y < cy + s:
        d.line([cx, y, cx, y + s*0.22], fill=col, width=width)
        y += s*0.5

def icon_city(d, cx, cy, s, col, width):
    base = cy + s*0.9
    bldgs = [(-1.1, 1.2, 0.5), (-0.55, 1.7, 0.5), (0.0, 1.0, 0.5), (0.55, 2.0, 0.5), (1.1, 1.3, 0.5)]
    for bx, bh, bw in bldgs:
        x = cx + bx * s
        d.rectangle([x - bw*s*0.5, base - bh*s, x + bw*s*0.5, base], outline=col, width=width)

def icon_shield(d, cx, cy, s, col, width):
    d.line([cx - s*0.8, cy - s*0.8, cx + s*0.8, cy - s*0.8], fill=col, width=width)
    d.line([cx - s*0.8, cy - s*0.8, cx - s*0.8, cy + s*0.1], fill=col, width=width)
    d.line([cx + s*0.8, cy - s*0.8, cx + s*0.8, cy + s*0.1], fill=col, width=width)
    d.arc([cx - s*0.8, cy - s*0.9, cx + s*0.8, cy + s*1.3], 20, 160, fill=col, width=width)
    d.line([cx - s*0.25, cy, cx - s*0.02, cy + s*0.3], fill=col, width=width)  # 체크
    d.line([cx - s*0.02, cy + s*0.3, cx + s*0.4, cy - s*0.3], fill=col, width=width)

def icon_moon(d, cx, cy, s, col, width):
    d.arc([cx - s, cy - s, cx + s, cy + s], 40, 320, fill=col, width=width)
    for (ox, oy, orr) in [(0.9, -0.7, 0.12), (1.2, 0.1, 0.09), (0.6, 0.9, 0.1)]:
        d.ellipse([cx+ox*s-orr*s, cy+oy*s-orr*s, cx+ox*s+orr*s, cy+oy*s+orr*s], outline=col, width=width)

ICONS = {
    "moto": icon_moto, "helmet": icon_helmet, "box": icon_box, "pin": icon_pin,
    "chart": icon_chart, "road": icon_road, "city": icon_city, "shield": icon_shield,
    "moon": icon_moon,
}

def make(name, w, h, c1, c2, icon, angle=35, accent=ORANGE):
    W, H = w * SCALE, h * SCALE
    base = gradient(W, H, c1, c2, angle)
    layer, d = overlay(base)
    # 장식용 소프트 원 (accent)
    soft_circle(d, int(W*0.82), int(H*0.18), int(H*0.6), accent, 46)
    soft_circle(d, int(W*0.12), int(H*0.9), int(H*0.45), (255,255,255), 16)
    # 도트 패턴
    for gy in range(6):
        for gx in range(10):
            x = int(W*0.06 + gx * W*0.03)
            y = int(H*0.14 + gy * H*0.05)
            d.ellipse([x-3*SCALE, y-3*SCALE, x+3*SCALE, y+3*SCALE], fill=(255,255,255,26))
    # 메인 아이콘 (반투명 화이트)
    cx, cy = int(W*0.72), int(H*0.56)
    s = int(H*0.22)
    ICONS[icon](d, cx, cy, s, (255,255,255,235), max(3, int(H*0.012))*SCALE//2 or 4)
    return finish(base, layer, name, w, h)

def main():
    print("이미지 생성 중...")
    # 대표(히어로) 이미지 — 넓은 비율
    make("hero-home",  1200, 540, NAVY, ORANGE2, "moto", 30)
    make("hero-jobs",  1200, 480, ORANGE2, NAVY, "helmet", 25, accent=NAVY2)
    make("hero-blog",  1200, 480, TEAL, NAVY, "road", 30)
    # 지역 히어로 4종(도심/산업/근교/해안)
    make("region-urban",      1200, 480, NAVY, NAVY2, "city", 30)
    make("region-industrial", 1200, 480, STEEL, ORANGE2, "box", 25)
    make("region-suburban",   1200, 480, GREEN, NAVY, "road", 30)
    make("region-coastal",    1200, 480, CYAN, NAVY, "pin", 30)
    # 본문/테마 이미지 — 중간 비율
    make("theme-rider",    900, 560, NAVY, ORANGE2, "moto", 30)
    make("theme-city",     900, 560, NAVY, NAVY2, "city", 30)
    make("theme-delivery", 900, 560, STEEL, ORANGE, "box", 28)
    make("theme-route",    900, 560, TEAL, NAVY, "road", 30)
    make("theme-income",   900, 560, ORANGE2, NAVY, "chart", 25, accent=NAVY2)
    make("theme-safety",   900, 560, NAVY, TEAL, "shield", 30)
    make("theme-map",      900, 560, NAVY2, CYAN, "pin", 30)
    make("theme-night",    900, 560, (12,18,34), NAVY2, "moon", 30)
    print("완료.")

if __name__ == "__main__":
    main()
