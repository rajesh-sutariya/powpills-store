#!/usr/bin/env python3
"""
Generates the dummy placeholder SVG images used across the storefront.

They are intentionally text-free geometric placeholders so that no wording is
introduced into the design. Swap the files in public/images for real product
photography (or point the WordPress featured images at real media) later.

Usage:  python3 scripts/generate-placeholders.py
"""

import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")

BG = "#f1f5f4"
INK = "#cbd5d3"
INK2 = "#dbe4e2"
GREEN = "#17805a"
GREEN_SOFT = "#b9dfcb"
GREEN_MID = "#57b287"
WHITE = "#ffffff"


def write(name, body):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(body)
    print("wrote", os.path.relpath(path))


def frame(w, h, inner, bg=BG, radius=16):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" role="img">'
        f'<rect width="{w}" height="{h}" rx="{radius}" fill="{bg}"/>'
        f"{inner}"
        f"</svg>\n"
    )


# --------------------------------------------------------------------------
# product placeholders (400 x 400)
# --------------------------------------------------------------------------

def shape_box():
    return (
        f'<rect x="118" y="132" width="164" height="150" rx="10" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="118" y="132" width="164" height="44" rx="10" fill="{GREEN_SOFT}"/>'
        f'<rect x="140" y="196" width="120" height="10" rx="5" fill="{INK2}"/>'
        f'<rect x="140" y="218" width="86" height="10" rx="5" fill="{INK2}"/>'
        f'<rect x="140" y="246" width="54" height="18" rx="9" fill="{GREEN_MID}"/>'
    )


def shape_blister():
    cells = ""
    for row in range(3):
        for col in range(4):
            cx = 150 + col * 34
            cy = 160 + row * 42
            cells += f'<circle cx="{cx}" cy="{cy}" r="12" fill="{GREEN_SOFT}" stroke="{INK}" stroke-width="2"/>'
    return (
        f'<rect x="122" y="132" width="156" height="140" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f"{cells}"
    )


def shape_bottle():
    return (
        f'<rect x="176" y="104" width="48" height="30" rx="6" fill="{GREEN}"/>'
        f'<rect x="164" y="132" width="72" height="18" rx="6" fill="{INK}"/>'
        f'<rect x="152" y="148" width="96" height="140" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="152" y="188" width="96" height="62" fill="{GREEN_SOFT}"/>'
        f'<rect x="170" y="208" width="60" height="8" rx="4" fill="{WHITE}"/>'
        f'<rect x="170" y="224" width="40" height="8" rx="4" fill="{WHITE}"/>'
    )


def shape_tube():
    return (
        f'<rect x="180" y="98" width="40" height="26" rx="6" fill="{GREEN}"/>'
        f'<path d="M162 126h76l10 150a14 14 0 0 1-14 15h-68a14 14 0 0 1-14-15z" '
        f'fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="166" y="176" width="68" height="46" fill="{GREEN_SOFT}"/>'
        f'<rect x="182" y="192" width="36" height="8" rx="4" fill="{WHITE}"/>'
    )


def shape_jar():
    return (
        f'<rect x="146" y="118" width="108" height="26" rx="8" fill="{GREEN}"/>'
        f'<rect x="136" y="144" width="128" height="132" rx="18" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="136" y="184" width="128" height="58" fill="{GREEN_SOFT}"/>'
        f'<rect x="160" y="204" width="80" height="8" rx="4" fill="{WHITE}"/>'
        f'<rect x="160" y="220" width="52" height="8" rx="4" fill="{WHITE}"/>'
    )


def shape_dropper():
    return (
        f'<rect x="184" y="86" width="32" height="44" rx="8" fill="{GREEN}"/>'
        f'<rect x="170" y="128" width="60" height="16" rx="6" fill="{INK}"/>'
        f'<rect x="166" y="142" width="68" height="146" rx="14" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="166" y="186" width="68" height="56" fill="{GREEN_SOFT}"/>'
        f'<rect x="180" y="204" width="40" height="8" rx="4" fill="{WHITE}"/>'
    )


PRODUCT_SHAPES = {
    "product-tadapox.svg": shape_box,
    "product-minoxidil.svg": shape_dropper,
    "product-beto.svg": shape_blister,
    "product-biotin.svg": shape_bottle,
    "product-aceclofen.svg": shape_tube,
    "product-serum.svg": shape_dropper,
    "product-facewash.svg": shape_tube,
    "product-sildenafil.svg": shape_box,
    "product-ibuprofen.svg": shape_blister,
    "product-multivitamin.svg": shape_bottle,
    "product-vardenafil.svg": shape_box,
    "product-finasteride.svg": shape_blister,
    "product-dapoxetine.svg": shape_box,
    "product-testosterone.svg": shape_jar,
    "product-collagen.svg": shape_jar,
    "product-vitamind3.svg": shape_bottle,
    "product-omega3.svg": shape_bottle,
    "product-shampoo.svg": shape_tube,
    "product-niacinamide.svg": shape_dropper,
}


def build_products():
    for name, shape in PRODUCT_SHAPES.items():
        write(name, frame(400, 400, shape(), bg="#ffffff", radius=0))


# --------------------------------------------------------------------------
# hero image
# --------------------------------------------------------------------------

def build_hero():
    inner = (
        f'<ellipse cx="360" cy="470" rx="290" ry="26" fill="#e2eee8"/>'
        # tall box back left
        f'<rect x="96" y="188" width="126" height="266" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="96" y="188" width="126" height="60" rx="12" fill="{GREEN_SOFT}"/>'
        f'<rect x="120" y="278" width="78" height="10" rx="5" fill="{INK2}"/>'
        f'<rect x="120" y="300" width="56" height="10" rx="5" fill="{INK2}"/>'
        # centre carton
        f'<rect x="238" y="140" width="168" height="314" rx="14" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="238" y="140" width="168" height="86" rx="14" fill="{GREEN}"/>'
        f'<rect x="266" y="252" width="112" height="12" rx="6" fill="{INK2}"/>'
        f'<rect x="266" y="280" width="78" height="12" rx="6" fill="{INK2}"/>'
        f'<rect x="266" y="322" width="66" height="24" rx="12" fill="{GREEN_MID}"/>'
        # bottle right
        f'<rect x="452" y="196" width="52" height="30" rx="8" fill="{GREEN}"/>'
        f'<rect x="438" y="224" width="80" height="20" rx="7" fill="{INK}"/>'
        f'<rect x="428" y="242" width="100" height="212" rx="18" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="428" y="296" width="100" height="82" fill="{GREEN_SOFT}"/>'
        f'<rect x="450" y="322" width="58" height="10" rx="5" fill="{WHITE}"/>'
        f'<rect x="450" y="342" width="38" height="10" rx="5" fill="{WHITE}"/>'
        # small jar far right
        f'<rect x="552" y="300" width="96" height="22" rx="8" fill="{GREEN}"/>'
        f'<rect x="544" y="322" width="112" height="132" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="544" y="358" width="112" height="52" fill="{GREEN_SOFT}"/>'
        # loose tablets
        f'<circle cx="180" cy="466" r="16" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<circle cx="216" cy="472" r="12" fill="{GREEN_SOFT}" stroke="{INK}" stroke-width="2"/>'
        f'<rect x="470" y="452" width="42" height="22" rx="11" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
    )
    write("hero-products.svg", frame(720, 520, inner, bg="#f6faf8", radius=24))


# --------------------------------------------------------------------------
# promo images
# --------------------------------------------------------------------------

def build_promos():
    delivery = (
        f'<path d="M60 96l84-42 84 42-84 42z" fill="{GREEN_SOFT}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M60 96v78l84 42V138z" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M228 96v78l-84 42V138z" fill="#eef4f2" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="96" y="128" width="46" height="30" rx="6" fill="{GREEN}" opacity="0.75"/>'
    )
    write("promo-delivery.svg", frame(300, 240, delivery, bg="#e9f5ef", radius=16))

    packs = (
        f'<rect x="42" y="104" width="60" height="104" rx="10" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="42" y="104" width="60" height="26" rx="10" fill="#f7c9d2"/>'
        f'<rect x="118" y="76" width="72" height="132" rx="10" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="118" y="76" width="72" height="32" rx="10" fill="#f3a9b8"/>'
        f'<rect x="206" y="112" width="56" height="96" rx="10" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="206" y="112" width="56" height="24" rx="10" fill="#f7c9d2"/>'
    )
    write("promo-packs.svg", frame(300, 240, packs, bg="#fdeef0", radius=16))

    support = (
        f'<path d="M74 148v-16a76 76 0 0 1 152 0v16" fill="none" stroke="{GREEN}" stroke-width="14" stroke-linecap="round"/>'
        f'<rect x="52" y="140" width="42" height="66" rx="18" fill="{GREEN}"/>'
        f'<rect x="206" y="140" width="42" height="66" rx="18" fill="{GREEN}"/>'
        f'<rect x="132" y="196" width="36" height="10" rx="5" fill="{INK}"/>'
    )
    write("promo-support.svg", frame(300, 240, support, bg="#fdf4e7", radius=16))


# --------------------------------------------------------------------------
# people placeholders
# --------------------------------------------------------------------------

def build_people():
    for name, tint in [
        ("avatar-michael.svg", "#cfe3f7"),
        ("avatar-daniel.svg", "#d5e8dc"),
        ("avatar-sarah.svg", "#f7d9e0"),
        ("avatar-james.svg", "#e3ddf7"),
        ("avatar-priya.svg", "#fbe4c9"),
    ]:
        inner = (
            f'<circle cx="48" cy="48" r="48" fill="{tint}"/>'
            f'<circle cx="48" cy="38" r="16" fill="{WHITE}"/>'
            f'<path d="M16 88a32 32 0 0 1 64 0z" fill="{WHITE}"/>'
        )
        body = (
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" '
            f'height="96" role="img">{inner}</svg>\n'
        )
        write(name, body)

    agent = (
        f'<circle cx="210" cy="150" r="118" fill="#dcefe5"/>'
        f'<path d="M136 148v-12a74 74 0 0 1 148 0v12" fill="none" stroke="{GREEN}" '
        f'stroke-width="12" stroke-linecap="round"/>'
        f'<rect x="120" y="140" width="34" height="54" rx="15" fill="{GREEN}"/>'
        f'<rect x="266" y="140" width="34" height="54" rx="15" fill="{GREEN}"/>'
        f'<circle cx="210" cy="176" r="52" fill="{WHITE}"/>'
        f'<path d="M112 360a98 98 0 0 1 196 0z" fill="{WHITE}"/>'
        f'<path d="M112 360a98 98 0 0 1 40-79l58 79z" fill="{GREEN_SOFT}"/>'
        f'<path d="M308 360a98 98 0 0 0-40-79l-58 79z" fill="{GREEN_SOFT}"/>'
        f'<rect x="196" y="214" width="28" height="24" rx="8" fill="#f6e0cd"/>'
    )
    write("support-agent.svg", frame(420, 360, agent, bg="#eaf5ef", radius=0))


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    build_products()
    build_hero()
    build_promos()
    build_people()
    print("done")
