# Changelog

## Release 2 — 2026-08-28

Release 2 is focused on faster item entry, safer quantity input, and more reliable receipt export/printing.

### Changed

- The exact item/product/brand text typed by the user is always placed at the top of the suggestion list.
- The typed item is clearly marked as the option that preserves exactly what the user entered.
- Brand names can be used directly without requiring a remote catalog API.
- Quantity is restricted to positive whole numbers only.
- PDF export now uses the browser/system native print pipeline for reliability. Users choose **Save as PDF** (or the platform equivalent) in the print dialog.
- Added a dedicated **Print receipt** action.
- Added **Choose printer / device** for selecting an already-connected printer or receipt device through the system print dialog.
- Added creator/contact details and repository link at the end of the page.
- Updated privacy copy to make clear that no product-search API is used.

### Privacy

- No database.
- No authentication.
- No analytics.
- No cookies.
- No localStorage/sessionStorage receipt persistence.
- No remote product lookup.
- No server-side receipt processing.

## Release 1 — 2026-08-28

Frozen in branch `release/v1` at commit `8e2a306db95db105bbc44ce0790a55cd60f775ed`.

### Included

- Business-category selection.
- Local generic product/service catalog.
- Typo-tolerant item suggestions.
- Custom items.
- Quantity and unit price.
- Overall percentage/fixed discount.
- No taxes.
- Multiple currencies with INR default.
- Live thermal-style receipt preview.
- Auto-generated store stamp.
- Original client-side PDF generator.
- Print support.
- Responsive desktop/mobile layout.
- Stateless privacy-first architecture.
