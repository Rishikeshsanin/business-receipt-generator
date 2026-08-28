# Business Receipt Generator

A privacy-first, stateless receipt maker for small businesses. Users choose a business category, search from a broad typo-tolerant item catalog (without being restricted to the category), add custom items, set quantity and price, apply an optional overall discount, preview a professional receipt with an automatically generated store stamp, and download/print the result.

## Privacy contract

This release intentionally has no database, authentication, analytics, cookies, localStorage/sessionStorage persistence, or server-side receipt processing. Receipt data lives in browser memory only and disappears when the page is refreshed or reset.

## Features

- Business category selection used only to improve item ranking
- Live suggestions on every character typed
- Fuzzy/typo-tolerant matching with custom-item fallback
- Quantity, unit price and line total calculations
- Percentage or fixed overall discount
- No tax calculation in v1
- INR default plus common currencies
- Editable date/time, payment method and receipt number
- Auto-generated circular store stamp based on business name
- Professional thermal-style live preview
- Dependency-free client-side multi-page PDF generation
- Print support
- Responsive design from small phones to desktop
- Keyboard-accessible suggestion picker
- No data retention

## Run locally

Serve this folder with any static web server and open `index.html`.

## Deployment

The project is static and can be hosted on Vercel, Netlify, GitHub Pages, Cloudflare Pages, or any static host without environment variables.
