(() => {
  'use strict';

  const searchInput = document.getElementById('itemSearch');
  const suggestions = document.getElementById('suggestions');
  const itemsList = document.getElementById('itemsList');
  const pdfButton = document.getElementById('downloadPdfBtn');
  const printButton = document.getElementById('printBtn');
  const printerButton = document.getElementById('printerDeviceBtn');
  const storeName = document.getElementById('storeName');
  const receiptDate = document.getElementById('receiptDate');
  const actionNote = document.getElementById('actionNote');
  const toast = document.getElementById('toast');

  function notify(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  function moveTypedItemToTop() {
    if (!suggestions) return;
    const custom = suggestions.querySelector('.suggestion.custom');
    if (!custom) return;

    if (suggestions.firstElementChild !== custom) suggestions.prepend(custom);
    custom.classList.add('typed-item-first');

    const title = custom.querySelector('.suggestion-main strong');
    const subtitle = custom.querySelector('.suggestion-main span');
    const badge = custom.querySelector('.suggestion-badge');
    if (title && searchInput?.value.trim()) title.textContent = `Use “${searchInput.value.trim()}”`;
    if (subtitle) subtitle.textContent = 'Exactly what you typed';
    if (badge) badge.textContent = 'Use typed item';
  }

  if (suggestions) {
    new MutationObserver(moveTypedItemToTop).observe(suggestions, { childList: true });
  }

  searchInput?.addEventListener('input', () => requestAnimationFrame(moveTypedItemToTop));
  searchInput?.addEventListener('focus', () => requestAnimationFrame(moveTypedItemToTop));

  searchInput?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || !suggestions || suggestions.hidden) return;
    const custom = suggestions.querySelector('.suggestion.custom');
    if (!custom || suggestions.firstElementChild !== custom) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    custom.click();
  }, true);

  function normalizeQuantityInput(input) {
    input.min = '1';
    input.step = '1';
    input.inputMode = 'numeric';
    input.setAttribute('pattern', '[0-9]*');
    input.setAttribute('aria-label', 'Quantity (whole numbers only)');
  }

  function configureQuantityInputs() {
    document.querySelectorAll('.item-qty input').forEach(normalizeQuantityInput);
  }

  if (itemsList) {
    new MutationObserver(configureQuantityInputs).observe(itemsList, { childList: true, subtree: true });
  }
  configureQuantityInputs();

  document.addEventListener('keydown', (event) => {
    const input = event.target.closest?.('.item-qty input');
    if (!input) return;
    if (['.', ',', 'e', 'E', '+', '-'].includes(event.key)) event.preventDefault();
  }, true);

  document.addEventListener('input', (event) => {
    const input = event.target.closest?.('.item-qty input');
    if (!input) return;
    normalizeQuantityInput(input);
    if (input.value === '') return;
    const numeric = Number(input.value);
    const quantity = Number.isFinite(numeric) ? Math.max(1, Math.floor(numeric)) : 1;
    if (input.value !== String(quantity)) input.value = String(quantity);
  }, true);

  document.addEventListener('blur', (event) => {
    const input = event.target.closest?.('.item-qty input');
    if (!input) return;
    const numeric = Number(input.value);
    const quantity = Number.isFinite(numeric) ? Math.max(1, Math.floor(numeric)) : 1;
    input.value = String(quantity);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }, true);

  function validReceipt() {
    if (!storeName?.value.trim()) {
      notify('Add your store name before exporting.');
      storeName?.focus();
      return false;
    }
    if (!document.querySelector('.item-card')) {
      notify('Add at least one item before exporting.');
      searchInput?.focus();
      return false;
    }
    return true;
  }

  function printableTitle() {
    const store = (storeName?.value || 'receipt')
      .trim()
      .replace(/[^a-z0-9]+/gi, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 42) || 'receipt';
    const date = receiptDate?.value || new Date().toISOString().slice(0, 10);
    return `${store}-${date}`;
  }

  function openNativePrintDialog(intent) {
    if (!validReceipt()) return;
    const previousTitle = document.title;
    document.title = printableTitle();

    if (actionNote) {
      actionNote.textContent = intent === 'pdf'
        ? 'Choose “Save as PDF” / “Microsoft Print to PDF”. For the cleanest receipt, turn off browser headers and footers.'
        : 'Choose any printer or receipt device connected to this computer or phone.';
    }

    try {
      window.print();
    } finally {
      setTimeout(() => {
        document.title = previousTitle;
        if (actionNote) actionNote.textContent = 'Nothing is uploaded. PDF and printing use your browser/system print tools.';
      }, 500);
    }
  }

  if (pdfButton) {
    pdfButton.textContent = 'Save as PDF';
    pdfButton.title = 'Opens the system print dialog so you can choose Save as PDF';
    pdfButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openNativePrintDialog('pdf');
    }, true);
  }

  if (printButton) {
    printButton.textContent = 'Print receipt';
    printButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openNativePrintDialog('printer');
    }, true);
  }

  printerButton?.addEventListener('click', () => openNativePrintDialog('printer'));

  if (actionNote) actionNote.textContent = 'Nothing is uploaded. PDF and printing use your browser/system print tools.';
  moveTypedItemToTop();
})();