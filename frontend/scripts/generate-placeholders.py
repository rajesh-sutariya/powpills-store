#!/usr/bin/env python3
"""
Generates the dummy placeholder SVG images used across the storefront.

Design rules, learned the hard way:
  1. TRANSPARENT backgrounds. An opaque rect inside a tinted card shows up as a
     visible box, and "almost but not quite" matching tints look like a bug.
  2. Fill the canvas. The product should occupy ~90% of the artboard, otherwise
     it floats in dead space inside the card's image well.
  3. Products use a 4:3 artboard to match the card image well, so `object-contain`
     fills it exactly with no letterboxing.

They are deliberately text-free so no wording is introduced into the design.

Usage:  python3 scripts/generate-placeholders.py
"""

import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")

INK = "#c3d0cc"          # outline
INK_SOFT = "#dde5e2"     # detail lines
GREEN = "#177050"        # brand
GREEN_MID = "#4fa27e"
GREEN_SOFT = "#aed8c4"
WHITE = "#ffffff"

# Product artboard: 4:3, matching the card image well.
PW, PH = 400, 300


def write(name, body):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(body)
    print("wrote", os.path.relpath(path))


def svg(w, h, inner):
    """Transparent-background SVG wrapper."""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" fill="none" role="img">{inner}</svg>\n'
    )


def shadow(cx, cy, rx):
    """Soft contact shadow so the product sits on a surface."""
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="9" fill="{INK}" opacity="0.30"/>'


# --------------------------------------------------------------------------
# product shapes — each fills roughly 400x300
# --------------------------------------------------------------------------

def shape_box():
    return (
        shadow(200, 279, 92)
        + f'<rect x="122" y="24" width="156" height="252" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<path d="M122 36a12 12 0 0 1 12-12h132a12 12 0 0 1 12 12v58H122z" fill="{GREEN_SOFT}"/>'
        + f'<rect x="146" y="118" width="108" height="12" rx="6" fill="{INK_SOFT}"/>'
        + f'<rect x="146" y="146" width="76" height="12" rx="6" fill="{INK_SOFT}"/>'
        + f'<rect x="146" y="188" width="62" height="24" rx="12" fill="{GREEN_MID}"/>'
        + f'<rect x="146" y="230" width="94" height="10" rx="5" fill="{INK_SOFT}"/>'
    )


def shape_blister():
    cells = ""
    for row in range(3):
        for col in range(4):
            cx = 130 + col * 47
            cy = 86 + row * 62
            cells += (
                f'<circle cx="{cx}" cy="{cy}" r="19" fill="{GREEN_SOFT}" stroke="{INK}" stroke-width="2.5"/>'
            )
    return (
        shadow(200, 279, 100)
        + f'<rect x="98" y="34" width="204" height="238" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + cells
    )


def shape_bottle():
    return (
        shadow(200, 279, 78)
        + f'<rect x="168" y="16" width="64" height="34" rx="9" fill="{GREEN}"/>'
        + f'<rect x="152" y="50" width="96" height="22" rx="8" fill="{INK}"/>'
        + f'<rect x="134" y="70" width="132" height="204" rx="22" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="134" y="124" width="132" height="94" fill="{GREEN_SOFT}"/>'
        + f'<rect x="158" y="150" width="84" height="12" rx="6" fill="{WHITE}"/>'
        + f'<rect x="158" y="174" width="56" height="12" rx="6" fill="{WHITE}"/>'
    )


def shape_tube():
    return (
        shadow(200, 279, 68)
        + f'<rect x="174" y="12" width="52" height="32" rx="9" fill="{GREEN}"/>'
        + f'<path d="M148 44h104l14 214a16 16 0 0 1-16 17H150a16 16 0 0 1-16-17z" '
          f'fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="141" y="112" width="118" height="82" fill="{GREEN_SOFT}"/>'
        + f'<rect x="164" y="138" width="72" height="12" rx="6" fill="{WHITE}"/>'
        + f'<rect x="164" y="162" width="46" height="12" rx="6" fill="{WHITE}"/>'
    )


def shape_jar():
    return (
        shadow(200, 279, 96)
        + f'<rect x="122" y="34" width="156" height="40" rx="12" fill="{GREEN}"/>'
        + f'<rect x="106" y="74" width="188" height="200" rx="24" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="106" y="132" width="188" height="88" fill="{GREEN_SOFT}"/>'
        + f'<rect x="140" y="158" width="120" height="12" rx="6" fill="{WHITE}"/>'
        + f'<rect x="140" y="182" width="78" height="12" rx="6" fill="{WHITE}"/>'
    )


def shape_dropper():
    return (
        shadow(200, 279, 66)
        + f'<rect x="176" y="10" width="48" height="58" rx="11" fill="{GREEN}"/>'
        + f'<rect x="158" y="68" width="84" height="22" rx="8" fill="{INK}"/>'
        + f'<rect x="146" y="90" width="108" height="184" rx="20" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="146" y="140" width="108" height="82" fill="{GREEN_SOFT}"/>'
        + f'<rect x="168" y="166" width="64" height="12" rx="6" fill="{WHITE}"/>'
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
        write(name, svg(PW, PH, shape()))


# --------------------------------------------------------------------------
# hero — a group of products, transparent so the tinted band shows through
# --------------------------------------------------------------------------

def build_hero():
    inner = (
        f'<ellipse cx="360" cy="466" rx="286" ry="26" fill="{INK}" opacity="0.35"/>'
        # tall carton, back left
        f'<rect x="74" y="150" width="150" height="312" rx="14" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M74 164a14 14 0 0 1 14-14h122a14 14 0 0 1 14 14v66H74z" fill="{GREEN_SOFT}"/>'
        f'<rect x="100" y="256" width="94" height="12" rx="6" fill="{INK_SOFT}"/>'
        f'<rect x="100" y="282" width="66" height="12" rx="6" fill="{INK_SOFT}"/>'
        f'<rect x="100" y="322" width="58" height="22" rx="11" fill="{GREEN_MID}"/>'
        # hero carton, centre
        f'<rect x="240" y="86" width="196" height="376" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M240 102a16 16 0 0 1 16-16h164a16 16 0 0 1 16 16v96H240z" fill="{GREEN}"/>'
        f'<rect x="272" y="230" width="132" height="14" rx="7" fill="{INK_SOFT}"/>'
        f'<rect x="272" y="262" width="94" height="14" rx="7" fill="{INK_SOFT}"/>'
        f'<rect x="272" y="306" width="78" height="28" rx="14" fill="{GREEN_MID}"/>'
        f'<rect x="272" y="356" width="112" height="12" rx="6" fill="{INK_SOFT}"/>'
        # bottle, right
        f'<rect x="474" y="160" width="62" height="34" rx="9" fill="{GREEN}"/>'
        f'<rect x="458" y="194" width="94" height="22" rx="8" fill="{INK}"/>'
        f'<rect x="440" y="216" width="130" height="246" rx="24" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="440" y="280" width="130" height="104" fill="{GREEN_SOFT}"/>'
        f'<rect x="466" y="310" width="80" height="12" rx="6" fill="{WHITE}"/>'
        f'<rect x="466" y="334" width="52" height="12" rx="6" fill="{WHITE}"/>'
        # small jar, far right
        f'<rect x="580" y="286" width="116" height="30" rx="10" fill="{GREEN}"/>'
        f'<rect x="568" y="316" width="140" height="146" rx="18" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="568" y="360" width="140" height="60" fill="{GREEN_SOFT}"/>'
        # loose tablets
        f'<circle cx="150" cy="470" r="18" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<circle cx="192" cy="478" r="13" fill="{GREEN_SOFT}" stroke="{INK}" stroke-width="2.5"/>'
        f'<rect x="486" y="452" width="48" height="24" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
    )
    write("hero-products.svg", svg(720, 500, inner))


# --------------------------------------------------------------------------
# promo art — transparent, sits on the promo card's own tint
# --------------------------------------------------------------------------

def build_promos():
    delivery = (
        f'<path d="M46 92l100-50 100 50-100 50z" fill="{GREEN_SOFT}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M46 92v92l100 50v-92z" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M246 92v92l-100 50v-92z" fill="{GREEN_SOFT}" opacity="0.45" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="88" y="132" width="54" height="34" rx="7" fill="{GREEN}" opacity="0.8"/>'
    )
    write("promo-delivery.svg", svg(292, 240, delivery))

    packs = (
        f'<rect x="24" y="106" width="72" height="118" rx="11" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M24 117a11 11 0 0 1 11-11h50a11 11 0 0 1 11 11v21H24z" fill="#f4b8c5"/>'
        f'<rect x="108" y="60" width="86" height="164" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M108 72a12 12 0 0 1 12-12h62a12 12 0 0 1 12 12v34h-86z" fill="#ee94a9"/>'
        f'<rect x="206" y="126" width="66" height="98" rx="11" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M206 137a11 11 0 0 1 11-11h44a11 11 0 0 1 11 11v18h-66z" fill="#f4b8c5"/>'
    )
    write("promo-packs.svg", svg(292, 240, packs))

    support = (
        f'<path d="M60 150v-22a86 86 0 0 1 172 0v22" fill="none" stroke="{GREEN}" stroke-width="16" stroke-linecap="round"/>'
        f'<rect x="34" y="140" width="48" height="76" rx="20" fill="{GREEN}"/>'
        f'<rect x="210" y="140" width="48" height="76" rx="20" fill="{GREEN}"/>'
        f'<path d="M232 216v6a20 20 0 0 1-20 20h-24" fill="none" stroke="{GREEN}" stroke-width="10" stroke-linecap="round"/>'
    )
    write("promo-support.svg", svg(292, 240, support))


# --------------------------------------------------------------------------
# people
# --------------------------------------------------------------------------

def build_people():
    for name, tint in [
        ("avatar-michael.svg", "#cfe0f5"),
        ("avatar-daniel.svg", "#cfe4d8"),
        ("avatar-sarah.svg", "#f6d3dc"),
        ("avatar-james.svg", "#ded8f4"),
        ("avatar-priya.svg", "#f9dfc2"),
    ]:
        inner = (
            f'<circle cx="48" cy="48" r="48" fill="{tint}"/>'
            f'<circle cx="48" cy="37" r="17" fill="{WHITE}"/>'
            f'<path d="M14 90a34 34 0 0 1 68 0z" fill="{WHITE}"/>'
        )
        write(name, svg(96, 96, inner))

    agent = (
        f'<circle cx="210" cy="152" r="124" fill="{WHITE}" opacity="0.55"/>'
        f'<path d="M132 150v-14a78 78 0 0 1 156 0v14" fill="none" stroke="{GREEN}" '
        f'stroke-width="13" stroke-linecap="round"/>'
        f'<rect x="114" y="142" width="38" height="60" rx="17" fill="{GREEN}"/>'
        f'<rect x="268" y="142" width="38" height="60" rx="17" fill="{GREEN}"/>'
        f'<path d="M286 202v8a22 22 0 0 1-22 22h-26" fill="none" stroke="{GREEN}" '
        f'stroke-width="9" stroke-linecap="round"/>'
        f'<circle cx="210" cy="178" r="54" fill="{WHITE}"/>'
        f'<rect x="194" y="220" width="32" height="26" rx="9" fill="#f3ddc8"/>'
        f'<path d="M106 360a104 104 0 0 1 208 0z" fill="{WHITE}"/>'
        f'<path d="M106 360a104 104 0 0 1 42-83l62 83z" fill="{GREEN_SOFT}"/>'
        f'<path d="M314 360a104 104 0 0 0-42-83l-62 83z" fill="{GREEN_SOFT}"/>'
    )
    write("support-agent.svg", svg(420, 360, agent))


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    build_products()
    build_hero()
    build_promos()
    build_people()
    print("done — all artboards transparent, products fill a 4:3 canvas")
