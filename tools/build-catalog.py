#!/usr/bin/env python3
"""
Builds the canonical product catalogue.

WHY THIS EXISTS
    The storefront needs the same catalogue in two runtimes: TypeScript (the
    Next.js frontend) and PHP (the WordPress plugin). Hand-maintaining both
    guarantees drift, so this script is the single source of truth and emits one
    JSON file that both sides read.

        tools/build-catalog.py
              |
              +--> frontend/data/catalog.json                       (imported by TS)
              +--> backend/.../powpills-core/data/catalog.json      (read by PHP)

    CI regenerates and byte-compares both copies, so they cannot diverge.

DATA PROVENANCE
    Category slugs, product names, price ranges and the spec-sheet fields mirror
    the live powpills.com WooCommerce store (URL scheme /product-category/<slug>/
    and /product/<slug>/). Product names, strengths, ingredients and prices are
    factual catalogue data. Descriptions are written here from the active
    ingredient and indication — no marketing prose is copied from the site.

    Ratings and review counts are placeholder demo values.

Usage:  python3 tools/build-catalog.py
"""

import json
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TARGETS = [
    os.path.join(ROOT, "frontend", "data", "catalog.json"),
    os.path.join(ROOT, "backend", "wp-content", "plugins", "powpills-core", "data", "catalog.json"),
]

# ---------------------------------------------------------------------------
# Categories — slugs match the live store's /product-category/<slug>/ URLs
# ---------------------------------------------------------------------------
# slug, name, icon, tone, short description (written here, not copied)
CATEGORIES = [
    ("erectile-dysfunction", "Erectile Dysfunction", "male", "sky",
     "Generic sildenafil, tadalafil and vardenafil tablets for erectile dysfunction, in a range of strengths and pack sizes."),
    ("premature-ejaculation", "Premature Ejaculation", "bolt", "sky",
     "Dapoxetine tablets and combination tablets that pair an ED ingredient with dapoxetine in a single dose."),
    ("hair-loss", "Hair Loss", "hair", "mint",
     "Finasteride tablets, minoxidil solutions and topical serums used to slow hair loss and support regrowth."),
    ("skin-care", "Skin Care", "skin", "rose",
     "Prescription creams, gels and tablets for acne, pigmentation and everyday skin concerns."),
    ("womens-health", "Women's Health", "female", "rose",
     "Progesterone capsules, gels and injections along with other medicines prescribed in women's health."),
    ("pain", "Pain Relief", "bandage", "cream",
     "Anti-inflammatory tablets, enzyme preparations and nerve pain medicines for joint, muscle and back pain."),
    ("benign-prostatic-hyperplasia", "Benign Prostatic Hyperplasia", "male", "sky",
     "Alpha blockers and combination tablets used to relieve the urinary symptoms of an enlarged prostate."),
    ("fungal-infections", "Fungal Infections", "leaf", "mint",
     "Oral antifungal tablets and topical creams for skin, scalp and nail fungal infections."),
    ("diabetes", "Diabetes", "pill", "mint",
     "Metformin, gliptins and SGLT2 inhibitors used to control blood sugar in type 2 diabetes."),
    ("anti-viral", "Anti Viral", "shield-check", "sky",
     "Antiviral tablets prescribed for herpes, shingles and other viral infections."),
    ("high-cholesterol", "High Cholesterol", "heart", "cream",
     "Statins and fibrates used to lower cholesterol and triglycerides."),
    ("eyes-ear-care", "Eyes & Ear Care", "sparkles", "sky",
     "Medicated eye and ear drops, including glaucoma and antibiotic preparations."),
]

# ---------------------------------------------------------------------------
# Products
# ---------------------------------------------------------------------------
# slug, name, ingredient, form, [category slugs], price_min, price_max,
# strength, manufacturer, indication, badge ('' | sale | hot | new)
P = [
    # --- Erectile dysfunction ------------------------------------------------
    ("cenforce-100-mg", "Cenforce 100 Mg (Sildenafil)", "Sildenafil Citrate", "tablet",
     ["erectile-dysfunction"], 77.00, 363.00, "100 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", "sale"),
    ("cenforce-120-mg", "Cenforce 120 Mg (Sildenafil)", "Sildenafil Citrate", "tablet",
     ["erectile-dysfunction"], 88.00, 226.00, "120 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("cenforce-200-mg", "Cenforce 200 Mg (Sildenafil)", "Sildenafil Citrate", "tablet",
     ["erectile-dysfunction"], 96.00, 384.00, "200 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", "hot"),
    ("fildena-150-mg", "Fildena 150 Mg (Sildenafil)", "Sildenafil Citrate", "tablet",
     ["erectile-dysfunction"], 82.00, 410.00, "150 mg", "Fortune Healthcare Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("vidalista-10-mg", "Vidalista 10 Mg (Tadalafil)", "Tadalafil", "tablet",
     ["erectile-dysfunction"], 70.00, 178.00, "10 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("vidalista-20-mg", "Vidalista 20 Mg (Tadalafil)", "Tadalafil", "tablet",
     ["erectile-dysfunction"], 83.00, 400.00, "20 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", "sale"),
    ("vidalista-40-mg", "Vidalista 40 Mg (Tadalafil)", "Tadalafil", "tablet",
     ["erectile-dysfunction"], 89.00, 306.00, "40 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("vidalista-60-mg", "Vidalista 60 Mg (Tadalafil)", "Tadalafil", "tablet",
     ["erectile-dysfunction"], 110.00, 330.00, "60 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("vidalista-black-80-mg", "Vidalista Black 80 Mg (Tadalafil)", "Tadalafil", "tablet",
     ["erectile-dysfunction"], 133.00, 356.00, "80 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("vidalista-professional", "Vidalista Professional (Tadalafil)", "Tadalafil", "tablet",
     ["erectile-dysfunction"], 84.00, 216.00, "20 mg", "Centurion Laboratories Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("tadalista-20-mg", "Tadalista 20 Mg (Tadalafil)", "Tadalafil", "tablet",
     ["erectile-dysfunction"], 61.00, 314.00, "20 mg", "Fortune Healthcare Pvt. Ltd.",
     "erectile dysfunction", ""),
    ("ed-trial-pack", "ED Trial Pack (Sildenafil/Tadalafil/Vardenafil)", "Sildenafil, Tadalafil and Vardenafil", "tablet",
     ["erectile-dysfunction"], 49.00, 138.00, "Mixed", "Assorted",
     "erectile dysfunction", "new"),

    # --- Premature ejaculation ----------------------------------------------
    ("super-vidalista", "Super Vidalista (Tadalafil/Dapoxetine)", "Tadalafil and Dapoxetine", "tablet",
     ["premature-ejaculation", "erectile-dysfunction"], 92.00, 280.00, "20 mg + 60 mg",
     "Centurion Laboratories Pvt. Ltd.", "erectile dysfunction with premature ejaculation", "hot"),
    ("super-fildena", "Super Fildena (Sildenafil/Dapoxetine)", "Sildenafil Citrate and Dapoxetine", "tablet",
     ["premature-ejaculation", "erectile-dysfunction"], 88.00, 264.00, "100 mg + 60 mg",
     "Fortune Healthcare Pvt. Ltd.", "erectile dysfunction with premature ejaculation", ""),
    ("super-vardalast", "Super Vardalast (Vardenafil/Dapoxetine)", "Vardenafil and Dapoxetine", "tablet",
     ["premature-ejaculation", "erectile-dysfunction"], 115.00, 360.00, "20 mg + 60 mg",
     "Sunrise Remedies Pvt. Ltd.", "erectile dysfunction with premature ejaculation", ""),
    ("extra-super-nitfire-100-mg", "Extra Super Nitfire 100 Mg (Tadalafil/Dapoxetine)", "Tadalafil and Dapoxetine", "tablet",
     ["premature-ejaculation"], 93.00, 147.00, "100 mg + 100 mg", "Aurochem Laboratories",
     "premature ejaculation", ""),
    ("sildalip-gold", "Sildalip Gold Tablet (Sildenafil/Dapoxetine)", "Sildenafil Citrate and Dapoxetine", "tablet",
     ["premature-ejaculation"], 90.00, 252.00, "100 mg + 100 mg", "Aurochem Laboratories",
     "premature ejaculation", ""),
    ("duratia-60-mg", "Duratia 60 Mg (Dapoxetine)", "Dapoxetine", "tablet",
     ["premature-ejaculation"], 58.00, 174.00, "60 mg", "Fortune Healthcare Pvt. Ltd.",
     "premature ejaculation", ""),

    # --- Hair loss -----------------------------------------------------------
    ("xgain-hair-serum", "Xgain Hair Serum (Herbal)", "Herbal actives", "dropper",
     ["hair-loss"], 24.00, 108.00, "60 ml", "Zydus Wellness",
     "thinning hair and hair fall", "new"),
    ("finpecia-1-mg", "Finpecia 1 Mg (Finasteride)", "Finasteride", "tablet",
     ["hair-loss"], 21.00, 96.00, "1 mg", "Cipla Ltd.",
     "androgenetic alopecia in men", "sale"),
    ("tugain-5-solution", "Tugain 5% Solution (Minoxidil)", "Minoxidil", "dropper",
     ["hair-loss"], 26.00, 118.00, "5% w/v", "Cipla Ltd.",
     "pattern hair loss", ""),
    ("tugain-10-solution", "Tugain 10% Solution (Minoxidil)", "Minoxidil", "dropper",
     ["hair-loss"], 32.00, 142.00, "10% w/v", "Cipla Ltd.",
     "pattern hair loss", ""),
    ("dutas-0-5-mg", "Dutas 0.5 Mg (Dutasteride)", "Dutasteride", "tablet",
     ["hair-loss", "benign-prostatic-hyperplasia"], 28.00, 124.00, "0.5 mg", "Dr. Reddy's Laboratories",
     "hair loss and enlarged prostate", ""),

    # --- Skin care -----------------------------------------------------------
    ("papulex-cream", "Papulex Cream (Nicotinamide/Zinc)", "Nicotinamide and Zinc", "tube",
     ["skin-care"], 18.00, 82.00, "30 g", "Menarini India Pvt. Ltd.",
     "acne-prone skin", ""),
    ("aziderm-20-cream", "Aziderm 20% Cream (Azelaic Acid)", "Azelaic Acid", "tube",
     ["skin-care"], 16.00, 74.00, "15 g", "Micro Labs Ltd.",
     "acne and post-acne marks", "sale"),
    ("melalite-forte-cream", "Melalite Forte Cream (Hydroquinone)", "Hydroquinone", "tube",
     ["skin-care"], 15.00, 68.00, "30 g", "Abbott India Ltd.",
     "melasma and pigmentation", ""),
    ("a-ret-gel-0-025", "A-Ret Gel 0.025% (Tretinoin)", "Tretinoin", "tube",
     ["skin-care"], 17.00, 78.00, "20 g", "Menarini India Pvt. Ltd.",
     "acne and skin texture", ""),
    ("cephalexin-250-mg", "Cephalexin Dispersible 250 Mg (Generic)", "Cephalexin", "tablet",
     ["skin-care", "anti-viral"], 22.00, 96.00, "250 mg", "Alkem Laboratories Ltd.",
     "bacterial skin infections", ""),

    # --- Women's health ------------------------------------------------------
    ("progesterone-100-mg", "Progesterone 100 Mg (Generic)", "Progesterone", "capsule",
     ["womens-health"], 24.00, 51.25, "100 mg", "Sun Pharmaceutical Industries Ltd.",
     "progesterone support", ""),
    ("progesterone-200-mg", "Progesterone 200 Mg (Generic)", "Progesterone", "capsule",
     ["womens-health"], 45.00, 101.25, "200 mg", "Sun Pharmaceutical Industries Ltd.",
     "progesterone support", ""),
    ("progesterone-100-mg-injection", "Progesterone 100 Mg Injection (Generic)", "Progesterone", "injection",
     ["womens-health"], 48.00, 112.50, "100 mg/2 ml", "Emcure Pharmaceuticals Ltd.",
     "progesterone support", ""),
    ("progesterone-vaginal-gel", "Progesterone Vaginal Gel 1.125 g (Generic)", "Progesterone", "tube",
     ["womens-health"], 52.00, 118.00, "1.125 g", "Emcure Pharmaceuticals Ltd.",
     "progesterone support", ""),
    ("ulipristal-acetate-5-mg", "Ulipristal Acetate 5 Mg (Generic)", "Ulipristal Acetate", "tablet",
     ["womens-health"], 75.00, 177.50, "5 mg", "Torrent Pharmaceuticals Ltd.",
     "uterine fibroids", ""),
    ("gestone-capsules", "Gestone Capsules USA (Progesterone)", "Progesterone", "capsule",
     ["womens-health"], 38.00, 92.00, "200 mg", "Ferring Pharmaceuticals",
     "progesterone support", ""),

    # --- Pain ----------------------------------------------------------------
    ("chymoral-forte", "Chymoral Forte 100000 AU (Trypsin/Chymotrypsin)", "Trypsin and Chymotrypsin", "tablet",
     ["pain"], 19.00, 86.00, "100000 AU", "Torrent Pharmaceuticals Ltd.",
     "swelling and post-operative inflammation", ""),
    ("zerodol-sp", "Zerodol SP (Aceclofenac/Paracetamol/Serratiopeptidase)", "Aceclofenac, Paracetamol and Serratiopeptidase", "tablet",
     ["pain"], 14.00, 62.00, "100 mg + 325 mg + 15 mg", "Ipca Laboratories Ltd.",
     "joint and muscle pain", "hot"),
    ("pregeb-75-mg", "Pregeb 75 Mg (Pregabalin)", "Pregabalin", "capsule",
     ["pain"], 17.00, 74.00, "75 mg", "Systopic Laboratories Pvt. Ltd.",
     "nerve pain", ""),
    ("hifenac-mr", "Hifenac MR (Aceclofenac/Paracetamol)", "Aceclofenac and Paracetamol", "tablet",
     ["pain"], 15.00, 66.00, "100 mg + 325 mg", "Intas Pharmaceuticals Ltd.",
     "back and muscular pain", ""),

    # --- BPH -----------------------------------------------------------------
    ("urimax-0-2-mg", "Urimax 0.2 Mg (Tamsulosin)", "Tamsulosin", "capsule",
     ["benign-prostatic-hyperplasia"], 18.00, 47.00, "0.2 mg", "Cipla Ltd.",
     "an enlarged prostate", ""),
    ("urimax-d", "Urimax D (Tamsulosin/Dutasteride)", "Tamsulosin and Dutasteride", "tablet",
     ["benign-prostatic-hyperplasia"], 20.00, 56.00, "0.4 mg + 0.5 mg", "Cipla Ltd.",
     "an enlarged prostate", ""),
    ("veltam-plus", "Veltam Plus (Tamsulosin/Dutasteride)", "Tamsulosin and Dutasteride", "tablet",
     ["benign-prostatic-hyperplasia"], 17.00, 46.00, "0.4 mg + 0.5 mg", "Intas Pharmaceuticals Ltd.",
     "an enlarged prostate", ""),
    ("veltam-f", "Veltam F (Tamsulosin/Finasteride)", "Tamsulosin and Finasteride", "tablet",
     ["benign-prostatic-hyperplasia"], 16.00, 45.00, "0.4 mg + 5 mg", "Intas Pharmaceuticals Ltd.",
     "an enlarged prostate", ""),

    # --- Fungal infections ---------------------------------------------------
    ("zocon-dt-100-mg", "Zocon DT 100 Mg (Fluconazole)", "Fluconazole", "tablet",
     ["fungal-infections"], 16.00, 72.00, "100 mg", "FDC Ltd.",
     "fungal infections", ""),
    ("kz-cream", "KZ Cream (Ketoconazole)", "Ketoconazole", "tube",
     ["fungal-infections", "skin-care"], 27.32, 81.84, "2% w/w", "Glenmark Pharmaceuticals Ltd.",
     "fungal skin infections", "sale"),
    ("vorier-200-mg", "Vorier 200 Mg (Voriconazole)", "Voriconazole", "tablet",
     ["fungal-infections"], 10.00, 60.00, "200 mg", "Cipla Ltd.",
     "serious fungal infections", ""),
    ("candiforce-200-mg", "Candiforce 200 Mg (Itraconazole)", "Itraconazole", "capsule",
     ["fungal-infections"], 23.00, 104.00, "200 mg", "Mankind Pharma Ltd.",
     "fungal infections of the skin and nails", ""),

    # --- Diabetes ------------------------------------------------------------
    ("glycomet-500-mg", "Glycomet 500 Mg (Metformin)", "Metformin", "tablet",
     ["diabetes"], 12.00, 54.00, "500 mg", "USV Pvt. Ltd.",
     "type 2 diabetes", ""),
    ("januvia-100-mg", "Januvia 100 Mg (Sitagliptin)", "Sitagliptin", "tablet",
     ["diabetes"], 34.00, 148.00, "100 mg", "MSD Pharmaceuticals",
     "type 2 diabetes", ""),
    ("jardiance-10-mg", "Jardiance 10 Mg (Empagliflozin)", "Empagliflozin", "tablet",
     ["diabetes"], 38.00, 164.00, "10 mg", "Boehringer Ingelheim",
     "type 2 diabetes", "new"),
    ("glimepiride-2-mg", "Glimepiride 2 Mg (Generic)", "Glimepiride", "tablet",
     ["diabetes"], 11.00, 48.00, "2 mg", "Sanofi India Ltd.",
     "type 2 diabetes", ""),

    # --- Anti viral ----------------------------------------------------------
    ("acivir-400-dt", "Acivir 400 DT (Acyclovir)", "Acyclovir", "tablet",
     ["anti-viral"], 18.00, 78.00, "400 mg", "Cipla Ltd.",
     "herpes simplex infections", ""),
    ("valcivir-500-mg", "Valcivir 500 Mg (Valacyclovir)", "Valacyclovir", "tablet",
     ["anti-viral"], 42.00, 182.00, "500 mg", "Cipla Ltd.",
     "herpes zoster and genital herpes", ""),
    ("molnupiravir-200-mg", "Molnupiravir 200 Mg (Generic)", "Molnupiravir", "capsule",
     ["anti-viral"], 56.00, 214.00, "200 mg", "Hetero Drugs Ltd.",
     "mild to moderate viral infection", ""),

    # --- High cholesterol ----------------------------------------------------
    ("lipicard-160-mg", "Lipicard 160 Mg (Fenofibrate)", "Fenofibrate", "capsule",
     ["high-cholesterol"], 20.00, 88.00, "160 mg", "USV Pvt. Ltd.",
     "high triglycerides", ""),
    ("rosuvas-10-mg", "Rosuvas 10 Mg (Rosuvastatin)", "Rosuvastatin", "tablet",
     ["high-cholesterol"], 18.00, 80.00, "10 mg", "Sun Pharmaceutical Industries Ltd.",
     "high cholesterol", ""),
    ("atorlip-10-mg", "Atorlip 10 Mg (Atorvastatin)", "Atorvastatin", "tablet",
     ["high-cholesterol"], 15.00, 68.00, "10 mg", "Cipla Ltd.",
     "high cholesterol", ""),

    # --- Eyes & ear care -----------------------------------------------------
    ("9-pm-eye-drop", "9 PM Eye Drop (Latanoprost)", "Latanoprost", "dropper",
     ["eyes-ear-care"], 22.00, 96.00, "0.005% w/v", "Intas Pharmaceuticals Ltd.",
     "raised eye pressure in glaucoma", ""),
    ("careprost-3-ml", "Careprost 3 ml (Bimatoprost)", "Bimatoprost", "dropper",
     ["eyes-ear-care"], 26.00, 118.00, "0.03% w/v", "Sun Pharmaceutical Industries Ltd.",
     "raised eye pressure and lash growth", "hot"),
    ("ciplox-eye-ear-drops", "Ciplox Eye/Ear Drops (Ciprofloxacin)", "Ciprofloxacin", "dropper",
     ["eyes-ear-care"], 14.00, 60.00, "0.3% w/v", "Cipla Ltd.",
     "bacterial eye and ear infections", ""),
]

# ---------------------------------------------------------------------------
# Dosage forms: pack ladder + packaging text + placeholder artwork
# ---------------------------------------------------------------------------
FORMS = {
    "tablet":   {"units": [90, 120, 150, 300, 600], "noun": "tablets",  "packaging": "10 tablets in 1 strip",  "art": "box"},
    "capsule":  {"units": [30, 60, 90, 180, 360],   "noun": "capsules", "packaging": "10 capsules in 1 strip", "art": "blister"},
    "tube":     {"units": [1, 3, 6, 9],             "noun": "tubes",    "packaging": "1 tube in 1 carton",     "art": "tube"},
    "dropper":  {"units": [1, 3, 6, 9],             "noun": "bottles",  "packaging": "1 bottle in 1 carton",   "art": "dropper"},
    "injection":{"units": [1, 3, 5, 10],            "noun": "vials",    "packaging": "1 vial in 1 carton",     "art": "jar"},
}

ART_TINTS = ["a", "b", "c"]


def money(value):
    return f"${value:,.2f}"


def build_packs(units, price_min, price_max, noun):
    """
    Realistic pack ladder: unit price falls as pack size grows, following a
    power curve fitted through the cheapest and most expensive pack, which is
    how the live store's pack tables behave.
    """
    q0, qn = units[0], units[-1]
    u0, un = price_min / q0, price_max / qn
    b = math.log(u0 / un) / math.log(qn / q0) if qn != q0 and u0 != un else 0.0
    a = u0 * (q0 ** b)

    packs = []
    for index, q in enumerate(units):
        if index == 0:
            price = price_min
        elif index == len(units) - 1:
            price = price_max
        else:
            price = round(a * (q ** (1 - b)))
        packs.append(
            {
                "label": f"{q} {noun}",
                "units": q,
                "price": round(float(price), 2),
                "priceLabel": money(price),
                "unitLabel": f"{money(price / q)} / unit",
            }
        )

    # Guarantee the ladder never dips.
    for i in range(1, len(packs)):
        if packs[i]["price"] < packs[i - 1]["price"]:
            packs[i]["price"] = round(packs[i - 1]["price"] + 1, 2)
            packs[i]["priceLabel"] = money(packs[i]["price"])
            packs[i]["unitLabel"] = f"{money(packs[i]['price'] / packs[i]['units'])} / unit"
    return packs


def stable_int(seed, low, high):
    """Deterministic pseudo-random so the JSON is stable across runs."""
    h = 0
    for ch in seed:
        h = (h * 131 + ord(ch)) & 0xFFFFFFFF
    return low + (h % (high - low + 1))


def build():
    categories = []
    for slug, name, icon, tone, description in CATEGORIES:
        categories.append(
            {
                "slug": slug,
                "name": name,
                "icon": icon,
                "tone": tone,
                "description": description,
                "href": f"/product-category/{slug}",
            }
        )

    products = []
    for (slug, name, ingredient, form, cats, pmin, pmax, strength, maker, indication, badge) in P:
        spec = FORMS[form]
        packs = build_packs(spec["units"], pmin, pmax, spec["noun"])
        rating = stable_int(slug, 42, 49) / 10
        reviews = stable_int(slug + "r", 24, 480)
        art = f"/images/form-{spec['art']}-{ART_TINTS[stable_int(slug + 'a', 0, 2)]}.svg"

        # Description written here from the ingredient and indication.
        description = (
            f"{name.split(' (')[0]} contains {ingredient} and is used in the treatment of "
            f"{indication}. Supplied as {spec['packaging'].lower()} in a strength of {strength}. "
            f"Choose a pack size below — the price per unit falls on larger packs."
        )

        products.append(
            {
                "slug": slug,
                "name": name,
                "subtitle": ingredient,
                "form": form,
                "categories": cats,
                "primaryCategory": cats[0],
                "priceMin": round(pmin, 2),
                "priceMax": round(pmax, 2),
                "priceLabel": f"{money(pmin)} – {money(pmax)}",
                "packs": packs,
                "rating": rating,
                "reviewCount": reviews,
                "badge": badge,
                "description": description,
                "specs": {
                    "Active Ingredient": ingredient,
                    "Manufacturer": maker,
                    "Packaging": spec["packaging"],
                    "Strength": strength,
                    "Delivery Time": "6 to 15 days",
                    "SKU": name.split(" (")[0],
                },
                "href": f"/product/{slug}",
                "image": {"src": art, "alt": f"{name} pack"},
            }
        )

    # Category product counts
    counts = {c["slug"]: 0 for c in categories}
    for product in products:
        for slug in product["categories"]:
            if slug in counts:
                counts[slug] += 1
    for category in categories:
        category["productCount"] = counts[category["slug"]]

    return {
        "generatedBy": "tools/build-catalog.py",
        "categories": categories,
        "products": products,
    }


if __name__ == "__main__":
    catalog = build()
    payload = json.dumps(catalog, indent=2, ensure_ascii=False) + "\n"

    for target in TARGETS:
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, "w", encoding="utf-8") as handle:
            handle.write(payload)
        print("wrote", os.path.relpath(target, ROOT))

    orphans = [c["slug"] for c in catalog["categories"] if c["productCount"] == 0]
    print(f"{len(catalog['categories'])} categories, {len(catalog['products'])} products")
    print("categories with no products:", orphans or "none")
