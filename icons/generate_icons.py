from PIL import Image, ImageDraw, ImageFont
import os

SIZES = [192, 512, 180, 32]
BG_TOP = (37, 99, 235)      # blue-600
BG_BOTTOM = (29, 78, 216)   # blue-700
FG = (255, 255, 255)

def make_icon(size):
    img = Image.new("RGB", (size, size), BG_TOP)
    draw = ImageDraw.Draw(img)
    for y in range(size):
        t = y / size
        r = int(BG_TOP[0] + (BG_BOTTOM[0] - BG_TOP[0]) * t)
        g = int(BG_TOP[1] + (BG_BOTTOM[1] - BG_TOP[1]) * t)
        b = int(BG_TOP[2] + (BG_BOTTOM[2] - BG_TOP[2]) * t)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    text = "EN"
    font = None
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]
    font_size = int(size * 0.42)
    for path in candidates:
        if os.path.exists(path):
            font = ImageFont.truetype(path, font_size)
            break
    if font is None:
        font = ImageFont.load_default()

    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pos = ((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1])
    draw.text(pos, text, fill=FG, font=font)

    # small underline accent
    line_w = int(size * 0.28)
    line_y = int(size * 0.72)
    draw.rounded_rectangle(
        [(size - line_w) / 2, line_y, (size + line_w) / 2, line_y + max(2, size // 40)],
        radius=max(1, size // 60), fill=FG
    )
    return img

out_dir = os.path.dirname(os.path.abspath(__file__))
for s in SIZES:
    icon = make_icon(s)
    name = {192: "icon-192.png", 512: "icon-512.png", 180: "apple-touch-icon.png", 32: "favicon-32.png"}[s]
    icon.save(os.path.join(out_dir, name))
    print("saved", name)
