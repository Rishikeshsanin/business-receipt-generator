(() => {
  'use strict';

  const searchInput = document.getElementById('itemSearch');
  const suggestions = document.getElementById('suggestions');
  const itemsList = document.getElementById('itemsList');
  const pdfButton = document.getElementById('downloadPdfBtn');
  const printButton = document.getElementById('printBtn');
  const printerButton = document.getElementById('printerDeviceBtn');
  const storeName = document.getElementById('storeName');
  const storeAddress = document.getElementById('storeAddress');
  const storePhone = document.getElementById('storePhone');
  const currency = document.getElementById('currency');
  const receiptDate = document.getElementById('receiptDate');
  const receiptTime = document.getElementById('receiptTime');
  const receiptNumber = document.getElementById('receiptNumber');
  const paymentMethod = document.getElementById('paymentMethod');
  const discountType = document.getElementById('discountType');
  const discountValue = document.getElementById('discountValue');
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

  function asciiText(value) {
    return String(value ?? '')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\x20-\x7E]/g, '?')
      .trim();
  }

  function pdfEscape(value) {
    return asciiText(value)
      .replace(/\\/g, '\\\\')
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)');
  }

  function wrapText(value, maxChars) {
    const words = asciiText(value).split(/\s+/).filter(Boolean);
    if (!words.length) return [''];
    const lines = [];
    let line = '';
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length <= maxChars) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      if (word.length <= maxChars) {
        line = word;
      } else {
        for (let i = 0; i < word.length; i += maxChars) {
          const part = word.slice(i, i + maxChars);
          if (part.length === maxChars) lines.push(part);
          else line = part;
        }
      }
    }
    if (line) lines.push(line);
    return lines.length ? lines : [''];
  }

  function readReceiptData() {
    const items = [...document.querySelectorAll('.item-card')].map((card) => {
      const inputs = card.querySelectorAll('input');
      const name = inputs[0]?.value.trim() || 'Item';
      const qtyValue = Number(inputs[1]?.value);
      const priceValue = Number(inputs[2]?.value);
      const qty = Number.isFinite(qtyValue) ? Math.max(1, Math.floor(qtyValue)) : 1;
      const price = Number.isFinite(priceValue) && priceValue >= 0 ? priceValue : 0;
      return { name, qty, price, amount: qty * price };
    });

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const rawDiscount = Math.max(0, Number(discountValue?.value) || 0);
    const discount = discountType?.value === 'fixed'
      ? Math.min(rawDiscount, subtotal)
      : subtotal * Math.min(rawDiscount, 100) / 100;

    return {
      store: storeName?.value.trim() || 'YOUR STORE',
      address: storeAddress?.value.trim() || '',
      phone: storePhone?.value.trim() || '',
      currency: currency?.value || 'INR',
      receiptNo: receiptNumber?.value.trim() || '-',
      date: receiptDate?.value || '-',
      time: receiptTime?.value || '-',
      payment: paymentMethod?.value || '',
      items,
      subtotal,
      discount,
      discountLabel: discountType?.value === 'percent' && rawDiscount > 0
        ? `Discount (${Math.min(rawDiscount, 100)}%)`
        : 'Discount',
      total: Math.max(0, subtotal - discount)
    };
  }

  function moneyForPdf(code, amount) {
    const digits = code === 'JPY' ? 0 : 2;
    return `${asciiText(code)} ${Number(amount || 0).toFixed(digits)}`;
  }

  function textCommand(x, y, text, size = 8, bold = false) {
    return `BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${pdfEscape(text)}) Tj ET\n`;
  }

  function approxTextWidth(text, size, bold = false) {
    return asciiText(text).length * size * (bold ? 0.57 : 0.60);
  }

  function centeredTextCommand(pageWidth, y, text, size = 8, bold = false) {
    const width = approxTextWidth(text, size, bold);
    return textCommand(Math.max(12, (pageWidth - width) / 2), y, text, size, bold);
  }

  function rightTextCommand(rightX, y, text, size = 8, bold = false) {
    return textCommand(Math.max(12, rightX - approxTextWidth(text, size, bold)), y, text, size, bold);
  }

  function lineCommand(x1, y1, x2, y2, dashed = false) {
    const dash = dashed ? '[3 2] 0 d ' : '';
    const reset = dashed ? ' [] 0 d' : '';
    return `${dash}${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S${reset}\n`;
  }

  function circleCommand(cx, cy, radius) {
    const k = 0.5522847498 * radius;
    return `${(cx + radius).toFixed(2)} ${cy.toFixed(2)} m ` +
      `${(cx + radius).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx + k).toFixed(2)} ${(cy + radius).toFixed(2)} ${cx.toFixed(2)} ${(cy + radius).toFixed(2)} c ` +
      `${(cx - k).toFixed(2)} ${(cy + radius).toFixed(2)} ${(cx - radius).toFixed(2)} ${(cy + k).toFixed(2)} ${(cx - radius).toFixed(2)} ${cy.toFixed(2)} c ` +
      `${(cx - radius).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx - k).toFixed(2)} ${(cy - radius).toFixed(2)} ${cx.toFixed(2)} ${(cy - radius).toFixed(2)} c ` +
      `${(cx + k).toFixed(2)} ${(cy - radius).toFixed(2)} ${(cx + radius).toFixed(2)} ${(cy - k).toFixed(2)} ${(cx + radius).toFixed(2)} ${cy.toFixed(2)} c S\n`;
  }

  function buildReceiptPdf(data) {
    const pageWidth = 226.77;
    const left = 13;
    const right = pageWidth - 13;
    const itemNameWidth = 30;
    const storeLines = wrapText(data.store.toUpperCase(), 28);
    const addressLines = data.address ? wrapText(data.address, 38) : [];
    const itemLines = data.items.map((item) => ({ ...item, lines: wrapText(item.name, itemNameWidth) }));
    const itemHeight = itemLines.reduce((height, item) => height + 22 + Math.max(0, item.lines.length - 1) * 9, 0);
    const pageHeight = Math.max(430, 315 + storeLines.length * 13 + addressLines.length * 10 + itemHeight);
    let y = pageHeight - 22;
    let stream = '0 G 0 g 0.65 w\n';

    for (const line of storeLines) {
      stream += centeredTextCommand(pageWidth, y, line, 11.5, true);
      y -= 14;
    }
    if (addressLines.length) y -= 1;
    for (const line of addressLines) {
      stream += centeredTextCommand(pageWidth, y, line, 6.8, false);
      y -= 9;
    }
    if (data.phone) {
      stream += centeredTextCommand(pageWidth, y, data.phone, 6.8, false);
      y -= 10;
    }

    y -= 3;
    stream += lineCommand(left, y, right, y, true);
    y -= 16;

    const metaRows = [
      ['Receipt', data.receiptNo],
      ['Date', data.date],
      ['Time', data.time]
    ];
    if (data.payment) metaRows.push(['Payment', data.payment]);
    for (const [label, value] of metaRows) {
      stream += textCommand(left, y, label, 6.8, false);
      stream += rightTextCommand(right, y, value, 6.8, true);
      y -= 10;
    }

    y -= 3;
    stream += lineCommand(left, y, right, y, true);
    y -= 15;
    stream += textCommand(left, y, 'ITEM', 6.5, true);
    stream += rightTextCommand(166, y, 'QTY', 6.5, true);
    stream += rightTextCommand(right, y, 'AMOUNT', 6.5, true);
    y -= 13;

    for (const item of itemLines) {
      item.lines.forEach((line, index) => {
        stream += textCommand(left, y, line, 7.2, index === 0);
        if (index === 0) {
          stream += rightTextCommand(166, y, String(item.qty), 7.2, false);
          stream += rightTextCommand(right, y, moneyForPdf(data.currency, item.amount), 7.2, false);
        }
        y -= 9;
      });
      stream += textCommand(left, y, `@ ${moneyForPdf(data.currency, item.price)}`, 6.1, false);
      y -= 12;
    }

    y -= 1;
    stream += lineCommand(left, y, right, y, true);
    y -= 15;
    stream += textCommand(left, y, 'Subtotal', 7, false);
    stream += rightTextCommand(right, y, moneyForPdf(data.currency, data.subtotal), 7, true);
    y -= 11;
    if (data.discount > 0) {
      stream += textCommand(left, y, data.discountLabel, 7, false);
      stream += rightTextCommand(right, y, `-${moneyForPdf(data.currency, data.discount)}`, 7, true);
      y -= 11;
    }

    y -= 1;
    stream += lineCommand(left, y, right, y, false);
    y -= 17;
    stream += textCommand(left, y, 'TOTAL', 9.2, true);
    stream += rightTextCommand(right, y, moneyForPdf(data.currency, data.total), 9.2, true);
    y -= 25;

    const stampY = y - 32;
    const stampX = pageWidth / 2;
    stream += '0.31 0.40 0.36 RG 0.31 0.40 0.36 rg 1 w\n';
    stream += circleCommand(stampX, stampY, 29);
    stream += circleCommand(stampX, stampY, 26);
    stream += centeredTextCommand(pageWidth, stampY + 10, 'OFFICIAL', 5.8, true);
    const stampName = wrapText(data.store.toUpperCase(), 18).slice(0, 2);
    stampName.forEach((line, index) => {
      stream += centeredTextCommand(pageWidth, stampY + 1 - index * 7, line, 6.2, true);
    });
    stream += centeredTextCommand(pageWidth, stampY - 16, 'RECEIPT', 5.8, true);
    stream += '0 G 0 g 0.65 w\n';
    y = stampY - 45;

    stream += centeredTextCommand(pageWidth, y, 'Thank you for your business.', 7.1, true);
    y -= 11;
    stream += centeredTextCommand(pageWidth, y, 'Generated for a genuine business transaction.', 5.3, false);

    const objects = [
      '<< /Type /Catalog /Pages 2 0 R >>',
      '<< /Type /Pages /Count 1 /Kids [3 0 R] >>',
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
      `<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
      '<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>',
      '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>'
    ];

    let pdf = '%PDF-1.4\n';
    const offsets = [0];
    objects.forEach((object, index) => {
      offsets[index + 1] = pdf.length;
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objects.length; i += 1) {
      pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    }
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    return pdf;
  }

  function downloadPdfDirectly() {
    if (!validReceipt()) return;
    pdfButton.disabled = true;
    const oldLabel = pdfButton.textContent;
    pdfButton.textContent = 'Preparing PDF…';
    if (actionNote) actionNote.textContent = 'Generating the PDF locally on this device…';

    try {
      const data = readReceiptData();
      const pdf = buildReceiptPdf(data);
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${printableTitle()}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      notify('PDF downloaded to your device.');
    } catch (error) {
      console.error(error);
      notify('PDF download failed. Use Print receipt as a fallback.');
    } finally {
      pdfButton.disabled = false;
      pdfButton.textContent = oldLabel || 'Save as PDF';
      if (actionNote) actionNote.textContent = 'PDF is generated locally and downloads directly. Nothing is uploaded.';
    }
  }

  function openNativePrintDialog() {
    if (!validReceipt()) return;
    const previousTitle = document.title;
    document.title = printableTitle();
    if (actionNote) actionNote.textContent = 'Choose any printer or receipt device connected to this computer or phone.';

    try {
      window.print();
    } finally {
      setTimeout(() => {
        document.title = previousTitle;
        if (actionNote) actionNote.textContent = 'PDF is generated locally and downloads directly. Nothing is uploaded.';
      }, 500);
    }
  }

  if (pdfButton) {
    pdfButton.textContent = 'Save as PDF';
    pdfButton.title = 'Generates and downloads a PDF directly to this device';
    pdfButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      downloadPdfDirectly();
    }, true);
  }

  if (printButton) {
    printButton.textContent = 'Print receipt';
    printButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openNativePrintDialog();
    }, true);
  }

  printerButton?.addEventListener('click', openNativePrintDialog);

  if (actionNote) actionNote.textContent = 'PDF is generated locally and downloads directly. Nothing is uploaded.';
  moveTypedItemToTop();
})();