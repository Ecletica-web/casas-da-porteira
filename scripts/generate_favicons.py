from __future__ import annotations

from pathlib import Path

from PIL import Image


def _load_trimmed_rgba(path: Path) -> Image.Image:
    im = Image.open(path).convert("RGBA")
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    return im


def _render_square(icon: Image.Image, size: int) -> Image.Image:
    # Make the icon readable at small sizes by using padding.
    # A ~72% occupancy tends to look good down at 32x32.
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    max_icon = int(size * 0.72)
    w, h = icon.size
    scale = min(max_icon / w, max_icon / h)
    nw, nh = max(1, int(w * scale)), max(1, int(h * scale))
    scaled = icon.resize((nw, nh), Image.LANCZOS)
    canvas.alpha_composite(scaled, ((size - nw) // 2, (size - nh) // 2))
    return canvas


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    src = root / "assets" / "images" / "logo-azul.png"
    if not src.exists():
        raise SystemExit(f"Missing source icon: {src}")

    icon = _load_trimmed_rgba(src)

    # Preferred outputs for Google + general usage.
    _render_square(icon, 32).save(root / "favicon-32x32.png", optimize=True)
    _render_square(icon, 192).save(root / "favicon-192x192.png", optimize=True)
    _render_square(icon, 512).save(root / "favicon.png", optimize=True)

    # Multi-size ICO at domain root (Google tries this first).
    ico_img = _render_square(icon, 256)
    ico_img.save(root / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    print("Wrote favicon.ico, favicon.png, favicon-32x32.png, favicon-192x192.png")


if __name__ == "__main__":
    main()

