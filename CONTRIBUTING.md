# Contributing

Thanks for taking an interest in Business Receipt Generator.

This is a deliberately small, stateless utility, so contributions should preserve the core product direction: **fast receipt creation without requiring accounts or storing receipt data**.

## Before changing code

Please keep these constraints in mind:

- do not add receipt/customer persistence by default
- do not add a database unless the product direction explicitly changes
- do not send product search terms to a remote service without a clear privacy reason
- do not add analytics that capture receipt contents
- preserve the no-tax behavior of the current release unless a future release explicitly introduces an optional tax mode
- keep the app functional without environment variables
- keep mobile usability and print/PDF behavior intact

## Local setup

```bash
git clone https://github.com/Rishikeshsanin/business-receipt-generator.git
cd business-receipt-generator
python -m http.server 8080
```

Open:

```text
http://localhost:8080
```

## Development approach

The project currently uses:

- HTML
- CSS
- vanilla JavaScript
- browser-native APIs

Avoid introducing a framework or large dependency for a small change unless it creates clear product value.

## Testing

Before submitting a change, run through the relevant sections in:

[`docs/TESTING.md`](docs/TESTING.md)

Pay particular attention to:

- exact typed item first
- typo-tolerant suggestions
- whole-number quantities
- totals/discount calculations
- direct PDF download
- printing
- responsive behavior
- stateless/privacy behavior

## Pull requests

A useful pull request should explain:

1. what changed
2. why the change is needed
3. how it was tested
4. whether privacy/storage behavior changed
5. screenshots for visible UI changes

Keep pull requests focused and avoid unrelated refactors.
