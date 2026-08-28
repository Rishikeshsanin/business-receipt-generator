# Testing checklist

This project is intentionally dependency-free, so the most important validation is behavioral regression testing in the browser.

Use this checklist before treating a change as production-ready.

## 1. Business setup

- [ ] Default category loads correctly
- [ ] Selecting a category updates the selected state
- [ ] Category selection improves ranking but does not block products from other categories
- [ ] Store name updates the live receipt title
- [ ] Store name updates the circular receipt stamp
- [ ] Phone is optional
- [ ] Address is optional
- [ ] Currency changes update displayed amounts

## 2. Item search

- [ ] Suggestions appear while typing
- [ ] Suggestions update on each character
- [ ] Exact typed text is always the first selectable option
- [ ] `Parle biscuits` can be added exactly as typed
- [ ] Generic `Biscuits` remains available underneath where relevant
- [ ] A typo such as `cofee` still surfaces useful coffee-related suggestions
- [ ] Search can surface items outside the selected category
- [ ] Pressing Enter selects the exact typed item when appropriate
- [ ] Arrow keys move through suggestions
- [ ] Escape closes the suggestion list
- [ ] Clicking outside closes the suggestion list

## 3. Item editor

- [ ] Added item appears in the item editor
- [ ] Added item appears in the receipt preview
- [ ] Item name remains editable
- [ ] Quantity accepts positive whole numbers
- [ ] Decimal quantity input is prevented/normalized
- [ ] Quantity cannot remain zero
- [ ] Negative quantity is rejected/normalized
- [ ] Unit price accepts valid non-negative monetary values
- [ ] Line total updates immediately
- [ ] Removing an item updates totals and preview

## 4. Discounts and totals

- [ ] Subtotal is the sum of all line totals
- [ ] Percentage discount calculates correctly
- [ ] Percentage discount cannot exceed 100%
- [ ] Fixed discount calculates correctly
- [ ] Fixed discount cannot reduce the grand total below zero
- [ ] Zero discount hides the receipt discount row
- [ ] Grand total updates immediately
- [ ] No tax line is added in Release 2

## 5. Receipt metadata

- [ ] Date defaults to the current local date
- [ ] Time defaults to the current local time
- [ ] Receipt number is generated
- [ ] Receipt number can be edited
- [ ] Payment method is optional
- [ ] Selected payment method appears in the receipt

## 6. PDF download

- [ ] Export is blocked when store name is empty
- [ ] Export is blocked when there are no items
- [ ] Clicking **Save as PDF** does not open the print dialog
- [ ] A `.pdf` file download is triggered
- [ ] Filename includes the store/date naming pattern
- [ ] PDF contains store name
- [ ] PDF contains receipt metadata
- [ ] PDF contains all items
- [ ] PDF contains whole-number quantities
- [ ] PDF contains unit prices and line amounts
- [ ] PDF contains subtotal
- [ ] PDF contains discount when applicable
- [ ] PDF contains grand total
- [ ] PDF contains the business stamp
- [ ] PDF generation does not require a network request

## 7. Printing

- [ ] **Print receipt** opens the native print interface
- [ ] **Choose printer / device** opens the native print interface
- [ ] Print layout hides the application editor/navigation
- [ ] Receipt is sized sensibly for receipt-style output

## 8. Privacy / stateless behavior

- [ ] No receipt data is written to `localStorage`
- [ ] No receipt data is written to `sessionStorage`
- [ ] No receipt database client exists
- [ ] No remote product-search API is called
- [ ] No server-side PDF endpoint is called
- [ ] Refreshing the page clears the working receipt state
- [ ] Production CSP retains `connect-src 'none'`

## 9. Responsive QA

Recommended viewports:

### Desktop

- [ ] 1440 × 900
- [ ] 1920 × 1080
- [ ] 1366 × 768

### Tablet

- [ ] 1024 × 768
- [ ] 768 × 1024

### Mobile

- [ ] 430 × 932
- [ ] 390 × 844
- [ ] 375 × 667

At each size check:

- [ ] No horizontal page overflow
- [ ] Category buttons remain usable
- [ ] Search dropdown remains readable
- [ ] Item controls do not overlap
- [ ] Receipt preview remains legible
- [ ] Export/print buttons remain tappable
- [ ] Footer contact details remain readable

## 10. Release regression

Before updating production:

1. Run the checklist above.
2. Confirm `main` contains only intended changes.
3. Confirm Vercel deploys the intended Git commit.
4. Verify `https://business-receipt-generator.vercel.app` returns the updated build.
5. Preserve stable release branches for rollback/reference.
