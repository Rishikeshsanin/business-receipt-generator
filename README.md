# Business Receipt Generator

A privacy-first, stateless receipt maker for small businesses. Users choose a business category, type any product, brand, item, or service, add it to a professional receipt, set whole-number quantity and unit price, apply an optional overall discount, preview the receipt with an automatically generated store stamp, and save or print the result.

**Live:** https://business-receipt-generator.vercel.app

## Release snapshots

- `release/v1` — frozen snapshot of the original production build before the Release 2 UX and export changes.
- `main` — current development/production line.
- `release/v2` — Release 2 snapshot created after Release 2 validation.

See `CHANGELOG.md` for version details.

## Privacy contract

The application intentionally has no database, authentication, analytics, cookies, localStorage/sessionStorage persistence, or server-side receipt processing. Receipt data lives in browser memory only and disappears when the page is refreshed or reset.

Release 2 intentionally does **not** use an external product-search API. This keeps item searches on-device instead of sending product/brand queries to a third party.

## Release 2 features

- Business category selection used only to improve generic item ranking
- Exact text typed by the user is always the first suggestion
- Brand/product names work naturally as typed custom items (for example, `Parle biscuits`)
- Generic catalog suggestions remain available underneath the exact typed item
- Fuzzy/typo-tolerant matching
- Whole-number quantities only
- Unit price and automatic line total calculations
- Percentage or fixed overall discount
- No tax calculation
- INR default plus common currencies
- Editable date/time, payment method and receipt number
- Auto-generated circular store stamp based on business name
- Professional thermal-style live preview
- Reliable **Save as PDF** flow through the browser/system print dialog
- Print receipt action
- Choose printer / receipt device action using the system print dialog
- Responsive design from small phones to desktop
- No data retention

## Why there is no product API

A remote product database could return branded products, but every search query would need to leave the browser. The current design keeps the privacy promise stronger: type the exact branded item you want and use it immediately. Generic typo-tolerant suggestions are handled locally.

## Run locally

Serve this folder with any static web server and open `index.html`.

## Deployment

The project is static and can be hosted on Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static host without environment variables.

## Creator

**Rishikesh M**  
Phone: 9059076106  
Email: rishikeshjonin@gmail.com  
GitHub: https://github.com/Rishikeshsanin/business-receipt-generator
