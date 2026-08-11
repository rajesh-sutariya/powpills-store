#!/usr/bin/env python3
"""
Generates the dummy placeholder SVG artwork.

Products are drawn per DOSAGE FORM rather than per product: a 59-product
catalogue does not need 59 near-identical line drawings. Each form comes in
three accent tints so a category grid does not look like one product repeated.

    form-box-{a,b,c}       tablets
    form-blister-{a,b,c}   capsules
    form-tube-{a,b,c}      creams and gels
    form-dropper-{a,b,c}   drops, solutions and serums
    form-jar-{a,b,c}       injections and vials

Design rules, learned the hard way:
  1. TRANSPARENT backgrounds. An opaque rect inside a tinted card shows up as a
     visible box, and "almost but not quite" matching tints look like a bug.
  2. Fill the canvas — the product should occupy ~90% of the artboard.
  3. Products use a 4:3 artboard matching the card image well, so
     `object-contain` fills it exactly with no letterboxing.

Text-free on purpose, so no wording is introduced into the design.

Usage:  python3 scripts/generate-placeholders.py
"""

import glob
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "images")

INK = "#c3d0cc"
INK_SOFT = "#dde5e2"
WHITE = "#ffffff"
GREEN = "#177050"
GREEN_MID = "#4fa27e"

# Accent tints per variant: (cap/lid colour, label panel colour)
TINTS = {
    "a": ("#177050", "#aed8c4"),
    "b": ("#2f6f9e", "#bcd7ea"),
    "c": ("#9a5b86", "#e6c4d8"),
}

PW, PH = 400, 300


def write(name, body):
    path = os.path.join(OUT, name)
    with open(path, "w", encoding="utf-8") as handle:
        handle.write(body)


def svg(w, h, inner):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
        f'width="{w}" height="{h}" fill="none" role="img">{inner}</svg>\n'
    )


def shadow(cx, cy, rx):
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="9" fill="{INK}" opacity="0.30"/>'


# --------------------------------------------------------------------------
# dosage-form artwork, each filling roughly 400x300
# --------------------------------------------------------------------------

def art_box(cap, panel):
    return (
        shadow(200, 279, 92)
        + f'<rect x="122" y="24" width="156" height="252" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<path d="M122 36a12 12 0 0 1 12-12h132a12 12 0 0 1 12 12v58H122z" fill="{panel}"/>'
        + f'<rect x="146" y="118" width="108" height="12" rx="6" fill="{INK_SOFT}"/>'
        + f'<rect x="146" y="146" width="76" height="12" rx="6" fill="{INK_SOFT}"/>'
        + f'<rect x="146" y="188" width="62" height="24" rx="12" fill="{cap}" opacity="0.75"/>'
        + f'<rect x="146" y="230" width="94" height="10" rx="5" fill="{INK_SOFT}"/>'
    )


def art_blister(cap, panel):
    cells = ""
    for row in range(3):
        for col in range(4):
            cx, cy = 130 + col * 47, 86 + row * 62
            cells += f'<rect x="{cx-17}" y="{cy-22}" width="34" height="44" rx="17" fill="{panel}" stroke="{INK}" stroke-width="2.5"/>'
    return (
        shadow(200, 279, 100)
        + f'<rect x="98" y="34" width="204" height="238" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + cells
    )


def art_bottle(cap, panel):
    return (
        shadow(200, 279, 78)
        + f'<rect x="168" y="16" width="64" height="34" rx="9" fill="{cap}"/>'
        + f'<rect x="152" y="50" width="96" height="22" rx="8" fill="{INK}"/>'
        + f'<rect x="134" y="70" width="132" height="204" rx="22" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="134" y="124" width="132" height="94" fill="{panel}"/>'
        + f'<rect x="158" y="150" width="84" height="12" rx="6" fill="{WHITE}"/>'
        + f'<rect x="158" y="174" width="56" height="12" rx="6" fill="{WHITE}"/>'
    )


def art_tube(cap, panel):
    return (
        shadow(200, 279, 68)
        + f'<rect x="174" y="12" width="52" height="32" rx="9" fill="{cap}"/>'
        + f'<path d="M148 44h104l14 214a16 16 0 0 1-16 17H150a16 16 0 0 1-16-17z" '
          f'fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="141" y="112" width="118" height="82" fill="{panel}"/>'
        + f'<rect x="164" y="138" width="72" height="12" rx="6" fill="{WHITE}"/>'
        + f'<rect x="164" y="162" width="46" height="12" rx="6" fill="{WHITE}"/>'
    )


def art_jar(cap, panel):
    return (
        shadow(200, 279, 96)
        + f'<rect x="122" y="34" width="156" height="40" rx="12" fill="{cap}"/>'
        + f'<rect x="106" y="74" width="188" height="200" rx="24" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="106" y="132" width="188" height="88" fill="{panel}"/>'
        + f'<rect x="140" y="158" width="120" height="12" rx="6" fill="{WHITE}"/>'
        + f'<rect x="140" y="182" width="78" height="12" rx="6" fill="{WHITE}"/>'
    )


def art_dropper(cap, panel):
    return (
        shadow(200, 279, 66)
        + f'<rect x="176" y="10" width="48" height="58" rx="11" fill="{cap}"/>'
        + f'<rect x="158" y="68" width="84" height="22" rx="8" fill="{INK}"/>'
        + f'<rect x="146" y="90" width="108" height="184" rx="20" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        + f'<rect x="146" y="140" width="108" height="82" fill="{panel}"/>'
        + f'<rect x="168" y="166" width="64" height="12" rx="6" fill="{WHITE}"/>'
    )


FORM_ART = {
    "box": art_box,
    "blister": art_blister,
    "bottle": art_bottle,
    "tube": art_tube,
    "jar": art_jar,
    "dropper": art_dropper,
}


def build_forms():
    count = 0
    for form, draw in FORM_ART.items():
        for tint, (cap, panel) in TINTS.items():
            write(f"form-{form}-{tint}.svg", svg(PW, PH, draw(cap, panel)))
            count += 1
    print(f"wrote {count} dosage-form placeholders")


# --------------------------------------------------------------------------
# hero, promo art and people
# --------------------------------------------------------------------------

def build_hero():
    inner = (
        f'<ellipse cx="360" cy="466" rx="286" ry="26" fill="{INK}" opacity="0.35"/>'
        f'<rect x="74" y="150" width="150" height="312" rx="14" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M74 164a14 14 0 0 1 14-14h122a14 14 0 0 1 14 14v66H74z" fill="#aed8c4"/>'
        f'<rect x="100" y="256" width="94" height="12" rx="6" fill="{INK_SOFT}"/>'
        f'<rect x="100" y="282" width="66" height="12" rx="6" fill="{INK_SOFT}"/>'
        f'<rect x="100" y="322" width="58" height="22" rx="11" fill="{GREEN_MID}"/>'
        f'<rect x="240" y="86" width="196" height="376" rx="16" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M240 102a16 16 0 0 1 16-16h164a16 16 0 0 1 16 16v96H240z" fill="{GREEN}"/>'
        f'<rect x="272" y="230" width="132" height="14" rx="7" fill="{INK_SOFT}"/>'
        f'<rect x="272" y="262" width="94" height="14" rx="7" fill="{INK_SOFT}"/>'
        f'<rect x="272" y="306" width="78" height="28" rx="14" fill="{GREEN_MID}"/>'
        f'<rect x="272" y="356" width="112" height="12" rx="6" fill="{INK_SOFT}"/>'
        f'<rect x="474" y="160" width="62" height="34" rx="9" fill="{GREEN}"/>'
        f'<rect x="458" y="194" width="94" height="22" rx="8" fill="{INK}"/>'
        f'<rect x="440" y="216" width="130" height="246" rx="24" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="440" y="280" width="130" height="104" fill="#aed8c4"/>'
        f'<rect x="466" y="310" width="80" height="12" rx="6" fill="{WHITE}"/>'
        f'<rect x="466" y="334" width="52" height="12" rx="6" fill="{WHITE}"/>'
        f'<rect x="580" y="286" width="116" height="30" rx="10" fill="{GREEN}"/>'
        f'<rect x="568" y="316" width="140" height="146" rx="18" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="568" y="360" width="140" height="60" fill="#aed8c4"/>'
        f'<circle cx="150" cy="470" r="18" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<circle cx="192" cy="478" r="13" fill="#aed8c4" stroke="{INK}" stroke-width="2.5"/>'
        f'<rect x="486" y="452" width="48" height="24" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
    )
    write("hero-products.svg", svg(720, 500, inner))
    print("wrote hero")


def build_promos():
    write("promo-delivery.svg", svg(292, 240,
        f'<path d="M46 92l100-50 100 50-100 50z" fill="#aed8c4" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M46 92v92l100 50v-92z" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M246 92v92l-100 50v-92z" fill="#aed8c4" opacity="0.45" stroke="{INK}" stroke-width="3"/>'
        f'<rect x="88" y="132" width="54" height="34" rx="7" fill="{GREEN}" opacity="0.8"/>'))

    write("promo-packs.svg", svg(292, 240,
        f'<rect x="24" y="106" width="72" height="118" rx="11" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M24 117a11 11 0 0 1 11-11h50a11 11 0 0 1 11 11v21H24z" fill="#f4b8c5"/>'
        f'<rect x="108" y="60" width="86" height="164" rx="12" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M108 72a12 12 0 0 1 12-12h62a12 12 0 0 1 12 12v34h-86z" fill="#ee94a9"/>'
        f'<rect x="206" y="126" width="66" height="98" rx="11" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>'
        f'<path d="M206 137a11 11 0 0 1 11-11h44a11 11 0 0 1 11 11v18h-66z" fill="#f4b8c5"/>'))

    write("promo-support.svg", svg(292, 240,
        f'<path d="M60 150v-22a86 86 0 0 1 172 0v22" fill="none" stroke="{GREEN}" stroke-width="16" stroke-linecap="round"/>'
        f'<rect x="34" y="140" width="48" height="76" rx="20" fill="{GREEN}"/>'
        f'<rect x="210" y="140" width="48" height="76" rx="20" fill="{GREEN}"/>'
        f'<path d="M232 216v6a20 20 0 0 1-20 20h-24" fill="none" stroke="{GREEN}" stroke-width="10" stroke-linecap="round"/>'))
    print("wrote promo art")


def build_people():
    for name, tint in [
        ("avatar-michael.svg", "#cfe0f5"),
        ("avatar-daniel.svg", "#cfe4d8"),
        ("avatar-sarah.svg", "#f6d3dc"),
        ("avatar-james.svg", "#ded8f4"),
        ("avatar-priya.svg", "#f9dfc2"),
    ]:
        write(name, svg(96, 96,
            f'<circle cx="48" cy="48" r="48" fill="{tint}"/>'
            f'<circle cx="48" cy="37" r="17" fill="{WHITE}"/>'
            f'<path d="M14 90a34 34 0 0 1 68 0z" fill="{WHITE}"/>'))

    write("support-agent.svg", svg(420, 360,
        f'<circle cx="210" cy="152" r="124" fill="{WHITE}" opacity="0.55"/>'
        f'<path d="M132 150v-14a78 78 0 0 1 156 0v14" fill="none" stroke="{GREEN}" stroke-width="13" stroke-linecap="round"/>'
        f'<rect x="114" y="142" width="38" height="60" rx="17" fill="{GREEN}"/>'
        f'<rect x="268" y="142" width="38" height="60" rx="17" fill="{GREEN}"/>'
        f'<path d="M286 202v8a22 22 0 0 1-22 22h-26" fill="none" stroke="{GREEN}" stroke-width="9" stroke-linecap="round"/>'
        f'<circle cx="210" cy="178" r="54" fill="{WHITE}"/>'
        f'<rect x="194" y="220" width="32" height="26" rx="9" fill="#f3ddc8"/>'
        f'<path d="M106 360a104 104 0 0 1 208 0z" fill="{WHITE}"/>'
        f'<path d="M106 360a104 104 0 0 1 42-83l62 83z" fill="#aed8c4"/>'
        f'<path d="M314 360a104 104 0 0 0-42-83l-62 83z" fill="#aed8c4"/>'))
    print("wrote people")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)

    # Retire the old per-product files replaced by per-form artwork.
    removed = 0
    for stale in glob.glob(os.path.join(OUT, "product-*.svg")):
        os.remove(stale)
        removed += 1
    if removed:
        print(f"removed {removed} stale per-product placeholders")

    build_forms()
    build_hero()
    build_promos()
    build_people()
    print("done")
