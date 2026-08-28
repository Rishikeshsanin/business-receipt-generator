# Security & Privacy

Business Receipt Generator is designed as a stateless browser utility. The project does not intentionally collect, transmit, or persist receipt/customer information through an application backend.

## Privacy model

Receipt state is kept in browser memory while the page is open.

The application does not intentionally use the following for receipt persistence:

- application database
- account/profile storage
- `localStorage`
- `sessionStorage`
- receipt cookies
- analytics containing receipt contents
- server-side PDF generation
- remote product search

Refreshing or leaving the page clears the working receipt state.

## Production browser restrictions

The Vercel configuration includes browser security headers such as:

- Content Security Policy
- Strict Transport Security
- `X-Content-Type-Options: nosniff`
- restrictive Referrer Policy
- Permissions Policy disabling camera, microphone and geolocation

The Content Security Policy uses:

```text
connect-src 'none'
```

This prevents application JavaScript from making arbitrary outbound fetch/XHR/WebSocket connections under the deployed policy.

## PDF generation

Release 2 builds the receipt PDF locally inside the browser and downloads it using a Blob/Object URL flow.

Receipt data does not need to be uploaded to an application server to create the PDF.

## Printing

Physical printing is delegated to the browser/operating system's native print interface. Printer configuration and device access are handled by the user's own system rather than by an application database.

## Product suggestions

The suggestion catalog and fuzzy matching logic run locally. The project intentionally avoids a third-party product API so typed product/brand terms do not need to be sent to a remote catalog service.

## Reporting a security issue

If you discover a security or privacy issue, please report it privately to:

**Rishikesh M**  
Email: **rishikeshjonin@gmail.com**

Please include:

- a clear description
- affected browser/device if relevant
- reproduction steps
- expected vs actual behavior
- screenshots or console errors where useful

Avoid including real customer receipt data in a report.
