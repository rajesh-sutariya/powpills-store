# Copy inventory

Every string rendered on the homepage, in page order, as transcribed from the
reference screenshot.

Confidence legend:

- **`OK`** — read directly off the screenshot, transcribed verbatim.
- **`?`** — the screenshot is too low-resolution at this spot to read with
  certainty. The value below is my best reading. **Please correct these** and I
  will update `frontend/lib/content.ts` + `class-powpills-content.php` (one line
  each).
- **`NEW`** — not visible in the screenshot at all (for example FAQ answers,
  which are all collapsed). Written from the site's own wording elsewhere on the
  page. Replace with the real text when you have it.

---

## 1. Utility bar

| Conf | String |
| ---- | ------ |
| `?` | Genuine Packaging |
| `OK` | Secure Checkout |
| `OK` | Trackable Delivery |
| `OK` | 24/7 Customer Support |
| `?` | Delivering to: |
| `?` | United States |

## 2. Header

| Conf | String |
| ---- | ------ |
| `OK` | PowPills |
| `?` | Trusted · Affordable · Delivered |
| `?` | Search product, ingredient, brand or condition... |
| `OK` | My Account |
| `OK` | Login |
| `OK` | Cart |
| `?` | 0 items |
| `OK` | $0.00 |

## 3. Category navigation

| Conf | String |
| ---- | ------ |
| `OK` | Shop by Category |
| `OK` | Best Sellers |
| `OK` | Men's Health |
| `OK` | Women's Health |
| `OK` | Pain Relief |
| `OK` | Hair Care |
| `OK` | Skin Care |
| `OK` | Vitamins & Supplements |
| `OK` | All Categories |

## 4. Hero

| Conf | String |
| ---- | ------ |
| `OK` | Your Trusted Online Pharmacy & Healthcare Store |
| `?` | Explore a wide range of quality medicines, health products and wellness essentials at unbeatable prices. |
| `OK` | Discreet Packaging |
| `OK` | Secure Checkout |
| `OK` | Trackable Delivery |
| `OK` | 24/7 Support |
| `OK` | Shop All Meds |
| `OK` | Browse Categories |

## 5. Assurance strip

| Conf | Title | Subtitle |
| ---- | ----- | -------- |
| `OK` / `?` | Quality Assured | Sourced from trusted suppliers |
| `OK` / `?` | Affordable Prices | Best prices on all medicines |
| `OK` / `?` | Worldwide Shipping | Delivering to 100+ countries |
| `OK` / `?` | Multiple Payment Options | Safe & secure payments |
| `OK` / `?` | Easy Returns | Hassle-free return policy |

## 6. Shop by Category

| Conf | String |
| ---- | ------ |
| `OK` | Shop by Category |
| `OK` | Find the right healthcare and wellness products for you |
| `OK` | Men's Health · Women's Health · Pain Relief · Hair Care · Skin Care · Vitamins & Supplements · All Categories |
| `OK` | View Products (on all seven cards) |

## 7. Popular Products Across Our Store

| Conf | String |
| ---- | ------ |
| `OK` | Popular Products Across Our Store |
| `OK` | View All Products |
| `OK` | All Products · Best Sellers · New Arrivals · Men's Health · Pain Relief · Skin Care · Wellness |
| `OK` | View Options (on every card) |

Product cards — **all fields marked `?`**, this row is the least legible part of
the screenshot:

| # | Badge | Category | Name | Subtitle | Rating | Price | Was |
| - | ----- | -------- | ---- | -------- | ------ | ----- | --- |
| 1 | Sale | Men's Health | Tadapox 10 mg | Tadalafil Tablets | 4.8 (126) | $32.00 – $148.00 | $40.00 |
| 2 | Sale | Hair Care | Minoxidil 5% Solution | Hair Regrowth Treatment | 4.7 (98) | $24.00 – $96.00 | $30.00 |
| 3 | Hot | Pain Relief | Beto 400 | Paracetamol Tablets | 4.6 (204) | $12.00 – $58.00 | $15.00 |
| 4 | — | Wellness | Biotin Tablets | Hair & Nail Support | 4.9 (152) | $16.00 – $72.00 | $20.00 |
| 5 | New | Pain Relief | Aceclofen Gel | Topical Pain Relief | 4.5 (76) | $9.00 – $42.00 | $12.00 |

Five more products were added to the rail so the carousel arrows and the seven
tabs all have something to show (Vitamin C Serum, Salicylic Acid Face Wash,
Sildenafil 100 mg, Ibuprofen 400 mg, Daily Multivitamin) — the screenshot only
shows the first five. Say the word and I will trim it back to exactly five.

## 8. Promo cards

| Conf | String |
| ---- | ------ |
| `OK` | Discreet & Safe Delivery |
| `?` | Your privacy is our priority. All orders are shipped in plain, discreet packaging with no product information on the outside. |
| `OK` | Learn More |
| `OK` | Save More with Bigger Pack Sizes |
| `?` | Choose from multiple pack sizes and save more when you buy your favourite products in bulk. |
| `OK` | Need Help Choosing? |
| `?` | Our customer support team is here to help you find the right product. |

## 9. Trust stats + featured review

| Conf | String |
| ---- | ------ |
| `OK` | Trusted by Thousands of Customers Worldwide |
| `?` | 10,000+ / Happy Customers |
| `?` | 500+ / Trusted Products |
| `?` | 100+ / Countries Served |
| `?` | 98% / Satisfaction Rate |
| `?` | Excellent · 4.8/5 |
| `?` | Excellent service, genuine products and very fast discreet delivery. Highly recommended! |
| `?` | Michael R. / Verified Buyer |

## 10. How It Works

| Conf | String |
| ---- | ------ |
| `OK` | How It Works |
| `OK` | Getting your health essentials is simple and secure |
| `OK` / `?` | Browse & Select — Explore our range of trusted products |
| `OK` / `?` | Secure Checkout — Place your order with our safe and encrypted checkout |
| `OK` / `?` | Fast & Discreet Delivery — We pack discreetly and ship right to your doorstep |
| `OK` / `?` | Stay Healthy — Enjoy quality healthcare and live your best life |

## 11. Best Sellers in Men's Health

| Conf | String |
| ---- | ------ |
| `OK` | Best Sellers in Men's Health |
| `OK` | View All |

| # | Name `?` | Subtitle `?` | Rating `?` | Price `?` | Was `?` |
| - | -------- | ------------ | ---------- | --------- | ------- |
| 1 | Sildenafil 100 mg | Erectile Dysfunction | 4.9 (318) | $28.00 – $132.00 | $36.00 |
| 2 | Vardenafil 20 mg | Fast Acting Tablets | 4.7 (164) | $34.00 – $146.00 | $42.00 |
| 3 | Finasteride 1 mg | Hair Loss Treatment | 4.6 (121) | $19.00 – $88.00 | $24.00 |
| 4 | Dapoxetine 60 mg | Premature Ejaculation | 4.5 (96) | $26.00 – $118.00 | $32.00 |
| 5 | Testosterone Booster | Stamina & Strength | 4.7 (134) | $21.00 – $94.00 | $26.00 |

## 12. Wellness, Hair & Skin Essentials

| Conf | String |
| ---- | ------ |
| `OK` | Wellness, Hair & Skin Essentials |
| `OK` | View All |

| # | Name `?` | Subtitle `?` | Rating `?` | Price `?` | Was `?` |
| - | -------- | ------------ | ---------- | --------- | ------- |
| 1 | Collagen Peptides | Skin, Hair & Nails | 4.8 (188) | $22.00 – $92.00 | $28.00 |
| 2 | Vitamin D3 5000 IU | Bone & Immunity Support | 4.9 (246) | $13.00 – $52.00 | $16.00 |
| 3 | Omega-3 1000 mg | Heart Health | 4.7 (173) | $17.00 – $68.00 | $21.00 |
| 4 | Ketoconazole Shampoo | Anti-Dandruff Care | 4.6 (112) | $15.00 – $58.00 | $19.00 |
| 5 | Niacinamide Serum | Blemish & Pore Care | 4.8 (129) | $18.00 – $64.00 | $23.00 |

## 13. Support banner

| Conf | String |
| ---- | ------ |
| `OK` | Need Help? We're Here For You |
| `?` | Our support team is available 24/7 to assist you with orders, products or any questions. |
| `OK` | Live Chat — Chat with us online |
| `OK` | Email Support — support@powpills.com |
| `OK` | Call Us — +1 (888) 123-4567 |

## 14. What Our Customers Say

| Conf | String |
| ---- | ------ |
| `OK` | What Our Customers Say |
| `?` | Great prices and fast delivery. The packaging is always discreet and professional. — Daniel L., Verified Buyer |
| `?` | Excellent customer service and a wide range of products. Highly trusted store. — Sarah K., Verified Buyer |
| `?` | Ordering was simple, the medicine arrived quickly and exactly as described. — James T., Verified Buyer |
| `?` | Everything arrived on time and in perfect condition. Very happy with the service. — Priya M., Verified Buyer |

## 15. Frequently Asked Questions

| Conf | Question | Answer |
| ---- | -------- | ------ |
| `OK` | Is my order information kept private? | `NEW` |
| `OK` | Are the products genuine? | `NEW` |
| `OK` | How long does delivery take? | `NEW` |
| `OK` | Can I return or exchange a product? | `NEW` |
| `OK` | Do you ship internationally? | `NEW` |
| `OK` | How can I contact customer support? | `NEW` |

Questions are laid out exactly as in the design: left column 1, 3, 5 and right
column 2, 4, 6. All six answers are `NEW` because every accordion is closed in
the screenshot — the current text is in `class-powpills-content.php::faqs()`.

## 16. Newsletter

| Conf | String |
| ---- | ------ |
| `OK` | Stay Healthy, Stay Informed. |
| `?` | Subscribe to our newsletter for exclusive offers, health tips and updates. |
| `OK` | Enter your email address |
| `OK` | Subscribe |

## 17. Footer

| Conf | String |
| ---- | ------ |
| `OK` | PowPills |
| `?` | Trusted. Affordable. Delivered. |
| `?` | Your trusted online pharmacy for medicines, health products and wellness essentials. |
| `OK` | Customer Service — Contact Us · FAQ · Shipping & Delivery · Returns & Refunds · Order Tracking |
| `OK` | My Account — Login · Register · Address Book · Order History |
| `OK` | Categories — Men's Health · Women's Health · Pain Relief · Hair Care · Skin Care · Vitamins & Supplements · All Categories |
| `OK` | Information — About Us · Privacy Policy · Terms & Conditions · Blog · Sitemap |
| `OK` | Contact Us |
| `OK` | support@powpills.com |
| `OK` | +1 (888) 123-4567 |
| `OK` | 24/7 Customer Support |
| `?` | 123 Wellness Ave, New York, NY 10001, USA |
| `OK` | We Accept |
| `?` | Visa · Mastercard · Amex · Discover · PayPal · Apple Pay · Google Pay |
| `OK` | 100% Secure Checkout |
| `?` | © 2024 PowPills. All rights reserved. |

Social icons in the footer brand column: Facebook, Twitter, Instagram, YouTube,
LinkedIn (glyphs only, no visible labels).

---

## Summary of what needs your confirmation

1. **All 19 product names, subtitles, prices, strike-through prices, ratings and
   review counts.** These are the smallest text in the screenshot and the least
   legible.
2. **All six FAQ answers** — not visible in the screenshot.
3. Body copy marked `?` above: hero description, five assurance subtitles, three
   promo paragraphs, four stat figures, the featured review, four How It Works
   descriptions, four testimonials, the support and newsletter paragraphs, the
   footer address, the payment list and the copyright year.

A higher-resolution screenshot, the live URL, or a paste of the raw text is
enough — I will drop it straight in.
