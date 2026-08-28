(() => {
  'use strict';

  const categories = [
    ['retail', 'Retail'], ['grocery', 'Grocery'], ['restaurant', 'Restaurant / Café'], ['bakery', 'Bakery'],
    ['clothing', 'Clothing'], ['electronics', 'Electronics'], ['pharmacy', 'Pharmacy'], ['hardware', 'Hardware'],
    ['stationery', 'Stationery'], ['beauty', 'Salon / Beauty'], ['services', 'Services'], ['automotive', 'Automotive'], ['other', 'Other']
  ];

  const catalog = [
    ['Milk', ['grocery'], ['dairy','full cream','toned milk']], ['Bread', ['grocery','bakery'], ['loaf','sandwich bread']], ['Eggs', ['grocery'], ['egg tray']],
    ['Rice', ['grocery'], ['basmati','sona masoori']], ['Wheat Flour', ['grocery'], ['atta','flour']], ['Sugar', ['grocery'], ['white sugar']], ['Salt', ['grocery'], ['table salt']],
    ['Cooking Oil', ['grocery'], ['sunflower oil','groundnut oil','vegetable oil']], ['Butter', ['grocery','bakery'], ['dairy butter']], ['Cheese', ['grocery','restaurant'], ['cheddar','slice']],
    ['Curd / Yogurt', ['grocery'], ['dahi','yoghurt']], ['Tea Powder', ['grocery'], ['tea leaves']], ['Coffee Powder', ['grocery','restaurant'], ['coffee']], ['Biscuits', ['grocery'], ['cookies']],
    ['Noodles', ['grocery','restaurant'], ['instant noodles']], ['Pasta', ['grocery','restaurant'], ['macaroni']], ['Soft Drink', ['grocery','restaurant'], ['soda','cola']], ['Mineral Water', ['grocery','restaurant'], ['water bottle']],
    ['Chocolate', ['grocery','bakery'], ['candy']], ['Ice Cream', ['grocery','restaurant'], ['dessert']], ['Fresh Vegetables', ['grocery'], ['vegetables','veggies']], ['Fresh Fruits', ['grocery'], ['fruits']],
    ['Apple', ['grocery'], ['fruit']], ['Banana', ['grocery'], ['fruit']], ['Tomato', ['grocery'], ['vegetable']], ['Onion', ['grocery'], ['vegetable']], ['Potato', ['grocery'], ['vegetable']],
    ['Chicken', ['grocery','restaurant'], ['meat']], ['Fish', ['grocery','restaurant'], ['seafood']], ['Paneer', ['grocery','restaurant'], ['cottage cheese']],
    ['Espresso', ['restaurant'], ['coffee','shot']], ['Americano', ['restaurant'], ['coffee']], ['Cappuccino', ['restaurant'], ['coffee','milk coffee']], ['Latte', ['restaurant'], ['coffee latte']],
    ['Filter Coffee', ['restaurant'], ['south indian coffee']], ['Tea', ['restaurant'], ['chai']], ['Masala Tea', ['restaurant'], ['masala chai']], ['Cold Coffee', ['restaurant'], ['iced coffee']],
    ['Fresh Lime Soda', ['restaurant'], ['lime soda']], ['Juice', ['restaurant','grocery'], ['fruit juice']], ['Veg Sandwich', ['restaurant'], ['sandwich']], ['Chicken Sandwich', ['restaurant'], ['sandwich']],
    ['Veg Burger', ['restaurant'], ['burger']], ['Chicken Burger', ['restaurant'], ['burger']], ['French Fries', ['restaurant'], ['fries']], ['Pizza', ['restaurant'], ['pizza']],
    ['Pasta Alfredo', ['restaurant'], ['white sauce pasta']], ['Fried Rice', ['restaurant'], ['rice']], ['Veg Biryani', ['restaurant'], ['biryani']], ['Chicken Biryani', ['restaurant'], ['biryani']],
    ['Dosa', ['restaurant'], ['masala dosa']], ['Idli', ['restaurant'], ['south indian']], ['Vada', ['restaurant'], ['medu vada']], ['Meals', ['restaurant'], ['thali','meal']],
    ['Cake', ['bakery'], ['birthday cake','pastry cake']], ['Pastry', ['bakery'], ['cake slice']], ['Cupcake', ['bakery'], ['cup cake']], ['Muffin', ['bakery'], ['muffin']],
    ['Croissant', ['bakery'], ['butter croissant']], ['Donut', ['bakery'], ['doughnut']], ['Brownie', ['bakery'], ['chocolate brownie']], ['Cookies', ['bakery','grocery'], ['biscuits']],
    ['Puff', ['bakery'], ['veg puff','egg puff']], ['Bun', ['bakery'], ['bread bun']], ['Garlic Bread', ['bakery','restaurant'], ['bread']],
    ['T-Shirt', ['clothing','retail'], ['tee','shirt']], ['Shirt', ['clothing','retail'], ['formal shirt']], ['Jeans', ['clothing','retail'], ['denim']], ['Trousers', ['clothing','retail'], ['pants']],
    ['Dress', ['clothing','retail'], ['women dress']], ['Kurta', ['clothing','retail'], ['kurthi']], ['Saree', ['clothing','retail'], ['sari']], ['Jacket', ['clothing','retail'], ['coat']],
    ['Shoes', ['clothing','retail'], ['footwear','sneakers']], ['Sandals', ['clothing','retail'], ['footwear']], ['Socks', ['clothing','retail'], ['sock']], ['Cap', ['clothing','retail'], ['hat']],
    ['Belt', ['clothing','retail'], ['waist belt']], ['Wallet', ['clothing','retail'], ['purse']], ['Handbag', ['clothing','retail'], ['bag']],
    ['USB Cable', ['electronics','retail'], ['charging cable','data cable','usb']], ['Phone Charger', ['electronics','retail'], ['charger','adapter']], ['Power Bank', ['electronics','retail'], ['battery bank']],
    ['Earphones', ['electronics','retail'], ['earbuds','headphones']], ['Bluetooth Speaker', ['electronics','retail'], ['speaker']], ['Keyboard', ['electronics'], ['computer keyboard']], ['Mouse', ['electronics'], ['computer mouse']],
    ['USB Drive', ['electronics'], ['pen drive','flash drive']], ['Memory Card', ['electronics'], ['sd card']], ['HDMI Cable', ['electronics'], ['hdmi']], ['Extension Board', ['electronics','hardware'], ['power strip']],
    ['LED Bulb', ['electronics','hardware'], ['light bulb']], ['Battery', ['electronics','retail'], ['cell','aa battery','aaa battery']], ['Phone Case', ['electronics','retail'], ['mobile cover','case']], ['Screen Protector', ['electronics','retail'], ['tempered glass']],
    ['Paracetamol', ['pharmacy'], ['acetaminophen','fever tablet']], ['Pain Relief Balm', ['pharmacy'], ['balm','pain balm']], ['Bandage', ['pharmacy'], ['gauze','band aid']], ['Antiseptic Liquid', ['pharmacy'], ['disinfectant']],
    ['Hand Sanitizer', ['pharmacy','retail'], ['sanitiser']], ['Face Mask', ['pharmacy','retail'], ['mask']], ['Vitamin Tablets', ['pharmacy'], ['multivitamin']], ['Cough Syrup', ['pharmacy'], ['cough medicine']],
    ['Thermometer', ['pharmacy','electronics'], ['temperature']], ['First Aid Kit', ['pharmacy'], ['medical kit']], ['Cotton Roll', ['pharmacy'], ['cotton']],
    ['Hammer', ['hardware'], ['tool']], ['Screwdriver', ['hardware'], ['tool']], ['Pliers', ['hardware'], ['tool']], ['Spanner', ['hardware'], ['wrench']], ['Nails', ['hardware'], ['nail']], ['Screws', ['hardware'], ['screw']],
    ['PVC Pipe', ['hardware'], ['pipe']], ['Tap / Faucet', ['hardware'], ['faucet','tap']], ['Paint', ['hardware'], ['wall paint']], ['Paint Brush', ['hardware'], ['brush']], ['Adhesive', ['hardware','stationery'], ['glue']],
    ['Measuring Tape', ['hardware'], ['tape measure']], ['Drill Bit', ['hardware'], ['drill']], ['Door Lock', ['hardware'], ['lock']],
    ['Notebook', ['stationery','retail'], ['note book','book']], ['Pen', ['stationery','retail'], ['ball pen']], ['Pencil', ['stationery','retail'], ['graphite pencil']], ['Eraser', ['stationery'], ['rubber']], ['Sharpener', ['stationery'], ['pencil sharpener']],
    ['Marker', ['stationery'], ['marker pen']], ['Highlighter', ['stationery'], ['highlight pen']], ['Stapler', ['stationery'], ['staple']], ['Staple Pins', ['stationery'], ['staples']], ['Paper Clips', ['stationery'], ['clips']],
    ['A4 Paper Pack', ['stationery'], ['paper','printer paper']], ['File Folder', ['stationery'], ['folder','file']], ['Envelope', ['stationery'], ['cover']], ['Sticky Notes', ['stationery'], ['post it']], ['Calculator', ['stationery','electronics'], ['calc']],
    ['Haircut', ['beauty','services'], ['hair cut','trim']], ['Hair Wash', ['beauty','services'], ['shampoo service']], ['Hair Styling', ['beauty','services'], ['styling']], ['Beard Trim', ['beauty','services'], ['beard']],
    ['Shaving', ['beauty','services'], ['shave']], ['Facial', ['beauty','services'], ['face treatment']], ['Cleanup', ['beauty','services'], ['face cleanup']], ['Manicure', ['beauty','services'], ['nail care']], ['Pedicure', ['beauty','services'], ['foot care']],
    ['Hair Colour', ['beauty','services'], ['hair color','colouring']], ['Waxing', ['beauty','services'], ['wax']], ['Threading', ['beauty','services'], ['eyebrow threading']], ['Massage', ['beauty','services'], ['body massage']],
    ['Consultation', ['services'], ['consulting','consultancy']], ['Installation Service', ['services','electronics'], ['installation']], ['Repair Service', ['services','electronics','automotive'], ['repair']], ['Maintenance Service', ['services','automotive'], ['maintenance']],
    ['Delivery Charge', ['services','retail'], ['delivery','shipping']], ['Design Service', ['services'], ['design']], ['Printing Service', ['services','stationery'], ['print']], ['Cleaning Service', ['services'], ['cleaning']],
    ['Photography Service', ['services'], ['photography','photo shoot']], ['Tuition Fee', ['services'], ['class fee','training']], ['Membership Fee', ['services'], ['membership']], ['Labour Charge', ['services','automotive','hardware'], ['labor charge','service charge']],
    ['Engine Oil', ['automotive','retail'], ['motor oil']], ['Car Wash', ['automotive','services'], ['vehicle wash']], ['Bike Wash', ['automotive','services'], ['motorcycle wash']], ['Tyre', ['automotive','retail'], ['tire']],
    ['Tube', ['automotive'], ['tyre tube']], ['Air Filter', ['automotive'], ['filter']], ['Oil Filter', ['automotive'], ['filter']], ['Brake Pad', ['automotive'], ['brakes']], ['Spark Plug', ['automotive'], ['plug']],
    ['Battery Replacement', ['automotive','services'], ['car battery','bike battery']], ['Wheel Alignment', ['automotive','services'], ['alignment']], ['Puncture Repair', ['automotive','services'], ['puncture']],
    ['Gift Item', ['retail'], ['gift']], ['Carry Bag', ['retail','grocery'], ['bag']], ['Gift Wrap', ['retail','stationery'], ['wrapping']], ['Toy', ['retail'], ['kids toy']], ['Perfume', ['retail','beauty'], ['fragrance']],
    ['Soap', ['retail','grocery','pharmacy'], ['bath soap']], ['Shampoo', ['retail','grocery','beauty'], ['hair shampoo']], ['Toothpaste', ['retail','grocery','pharmacy'], ['tooth paste']], ['Toothbrush', ['retail','grocery','pharmacy'], ['tooth brush']],
    ['Tissue Box', ['retail','grocery'], ['tissue']], ['Detergent', ['retail','grocery'], ['washing powder']], ['Floor Cleaner', ['retail','grocery'], ['cleaner']], ['Mop', ['retail','hardware'], ['floor mop']],
    ['Umbrella', ['retail'], ['rain umbrella']], ['Water Bottle', ['retail','grocery'], ['bottle']], ['Lunch Box', ['retail'], ['lunchbox']], ['Backpack', ['retail','clothing'], ['bag','school bag']]
  ].map(([name, cats, keywords]) => ({ name, cats, keywords }));

  const state = { category: 'retail', items: [], activeSuggestion: -1, suggestions: [] };
  const $ = (id) => document.getElementById(id);
  const els = {
    categoryGrid: $('categoryGrid'), storeName: $('storeName'), storePhone: $('storePhone'), storeAddress: $('storeAddress'), currency: $('currency'),
    itemSearch: $('itemSearch'), suggestions: $('suggestions'), itemsList: $('itemsList'), itemsEmpty: $('itemsEmpty'), receiptDate: $('receiptDate'), receiptTime: $('receiptTime'),
    paymentMethod: $('paymentMethod'), receiptNumber: $('receiptNumber'), discountType: $('discountType'), discountValue: $('discountValue'), discountHint: $('discountHint'), editorGrandTotal: $('editorGrandTotal'),
    previewStoreName: $('previewStoreName'), previewAddress: $('previewAddress'), previewPhone: $('previewPhone'), previewReceiptNo: $('previewReceiptNo'), previewDate: $('previewDate'), previewTime: $('previewTime'),
    previewPaymentRow: $('previewPaymentRow'), previewPayment: $('previewPayment'), previewItems: $('previewItems'), previewSubtotal: $('previewSubtotal'), previewDiscountRow: $('previewDiscountRow'), previewDiscountLabel: $('previewDiscountLabel'),
    previewDiscount: $('previewDiscount'), previewGrandTotal: $('previewGrandTotal'), stampName: $('stampName'), resetBtn: $('resetBtn'), printBtn: $('printBtn'), downloadPdfBtn: $('downloadPdfBtn'), actionNote: $('actionNote'), toast: $('toast')
  };

  function safeText(v, max = 120) { return String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max); }
  function finitePositive(v, fallback = 0) { const n = Number(v); return Number.isFinite(n) && n >= 0 ? n : fallback; }
  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
  function normalize(s) { return String(s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, ' ').trim(); }
  function levenshtein(a, b) {
    a = normalize(a); b = normalize(b);
    if (!a) return b.length; if (!b) return a.length;
    const prev = Array.from({length: b.length + 1}, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      for (let j = 1; j <= b.length; j++) cur[j] = Math.min(cur[j-1] + 1, prev[j] + 1, prev[j-1] + (a[i-1] === b[j-1] ? 0 : 1));
      for (let j = 0; j <= b.length; j++) prev[j] = cur[j];
    }
    return prev[b.length];
  }
  function fuzzyScore(item, query) {
    const q = normalize(query); if (!q) return -Infinity;
    const name = normalize(item.name); const hay = normalize([item.name, ...(item.keywords || [])].join(' '));
    let score = 0;
    if (name === q) score += 120;
    if (name.startsWith(q)) score += 86;
    if (name.includes(q)) score += 62;
    if (hay.includes(q)) score += 42;
    const qTokens = q.split(' ').filter(Boolean); const hTokens = hay.split(' ').filter(Boolean);
    let matched = 0;
    for (const qt of qTokens) {
      let best = 99;
      for (const ht of hTokens) {
        if (ht.startsWith(qt)) { best = 0; break; }
        if (qt.length >= 3) best = Math.min(best, levenshtein(qt, ht));
      }
      if (best === 0) { score += 24; matched++; }
      else if (best <= 1) { score += 18; matched++; }
      else if (best <= 2 && qt.length >= 5) { score += 10; matched++; }
    }
    if (!matched && q.length >= 3) {
      const d = levenshtein(q, name);
      if (d <= 1) score += 35;
      else if (d <= 2 && q.length >= 5) score += 22;
      else if (d <= 3 && q.length >= 8) score += 12;
    }
    if (item.cats.includes(state.category)) score += 18;
    return score;
  }
  function getSuggestions(query) {
    const q = safeText(query, 80); if (!q) return [];
    const ranked = catalog.map(item => ({...item, score: fuzzyScore(item, q)})).filter(x => x.score >= 16).sort((a,b) => b.score - a.score || a.name.localeCompare(b.name)).slice(0, 8);
    const exact = ranked.some(r => normalize(r.name) === normalize(q));
    if (!exact) ranked.push({ name: q, cats: [], keywords: [], custom: true, score: 0 });
    return ranked;
  }
  function formatMoney(n) {
    const code = els.currency.value || 'INR';
    try { return new Intl.NumberFormat(undefined, { style: 'currency', currency: code, minimumFractionDigits: code === 'JPY' ? 0 : 2, maximumFractionDigits: code === 'JPY' ? 0 : 2 }).format(finitePositive(n)); }
    catch { return `${code} ${finitePositive(n).toFixed(2)}`; }
  }
  function receiptId() { const d = new Date(); const part = String(d.getTime()).slice(-7); const rand = Math.floor(Math.random() * 90 + 10); return `R-${part}${rand}`; }
  function isoDateLocal(d = new Date()) { const y=d.getFullYear(); const m=String(d.getMonth()+1).padStart(2,'0'); const day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; }
  function timeLocal(d = new Date()) { return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
  function totals() {
    const subtotal = state.items.reduce((sum, it) => sum + finitePositive(it.qty) * finitePositive(it.price), 0);
    const raw = finitePositive(els.discountValue.value);
    const discount = els.discountType.value === 'percent' ? subtotal * clamp(raw, 0, 100) / 100 : clamp(raw, 0, subtotal);
    return { subtotal, discount, grand: Math.max(0, subtotal - discount), raw };
  }
  function showToast(msg) { els.toast.textContent = msg; els.toast.classList.add('show'); clearTimeout(showToast.t); showToast.t = setTimeout(() => els.toast.classList.remove('show'), 2600); }

  function renderCategories() {
    els.categoryGrid.innerHTML = '';
    for (const [value, label] of categories) {
      const b = document.createElement('button'); b.type='button'; b.className='category-chip'; b.setAttribute('role','radio'); b.setAttribute('aria-checked', String(state.category === value)); b.textContent = label;
      b.addEventListener('click', () => { state.category = value; renderCategories(); if (els.itemSearch.value.trim()) renderSuggestions(); });
      els.categoryGrid.appendChild(b);
    }
  }
  function renderSuggestions() {
    state.suggestions = getSuggestions(els.itemSearch.value); state.activeSuggestion = state.suggestions.length ? 0 : -1;
    els.suggestions.innerHTML = '';
    if (!state.suggestions.length) { els.suggestions.hidden = true; els.itemSearch.setAttribute('aria-expanded','false'); return; }
    state.suggestions.forEach((s, i) => {
      const b = document.createElement('button'); b.type='button'; b.className = `suggestion${s.custom ? ' custom' : ''}${i===state.activeSuggestion ? ' active' : ''}`; b.setAttribute('role','option'); b.setAttribute('aria-selected', String(i===state.activeSuggestion));
      const left = document.createElement('span'); left.className='suggestion-main';
      const strong=document.createElement('strong'); strong.textContent = s.custom ? `Add “${s.name}”` : s.name;
      const sub=document.createElement('span'); sub.textContent = s.custom ? 'Custom item' : (s.cats.includes(state.category) ? 'Recommended for your category' : 'Available from all categories');
      left.append(strong,sub); const badge=document.createElement('span'); badge.className='suggestion-badge'; badge.textContent = s.custom ? 'Custom' : 'Add'; b.append(left,badge);
      b.addEventListener('mousedown', (e) => e.preventDefault()); b.addEventListener('click', () => addItem(s.name)); els.suggestions.appendChild(b);
    });
    els.suggestions.hidden = false; els.itemSearch.setAttribute('aria-expanded','true');
  }
  function syncSuggestionActive() { [...els.suggestions.children].forEach((c,i) => { c.classList.toggle('active', i===state.activeSuggestion); c.setAttribute('aria-selected', String(i===state.activeSuggestion)); }); }
  function addItem(name) {
    const clean = safeText(name, 80); if (!clean) return;
    state.items.push({ id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`), name: clean, qty: 1, price: 0 });
    els.itemSearch.value = ''; els.suggestions.hidden = true; els.itemSearch.setAttribute('aria-expanded','false'); state.suggestions=[]; state.activeSuggestion=-1; renderItems(); updateAll();
    setTimeout(() => { const last = els.itemsList.querySelector('.item-card:last-child .item-price input'); if (last) last.focus(); }, 0);
  }
  function renderItems() {
    els.itemsList.innerHTML=''; els.itemsEmpty.hidden = state.items.length > 0;
    state.items.forEach((it, idx) => {
      const card=document.createElement('div'); card.className='item-card'; card.dataset.id=it.id;
      card.innerHTML = `
        <label class="field item-name"><span>Item</span><input type="text" maxlength="80" value="${escapeAttr(it.name)}" /></label>
        <label class="field item-qty"><span>Qty</span><input type="number" min="0.01" step="0.01" inputmode="decimal" value="${it.qty}" /></label>
        <label class="field item-price"><span>Unit price</span><input type="number" min="0" step="0.01" inputmode="decimal" value="${it.price}" /></label>
        <div class="item-total" title="Line total">${formatMoney(it.qty * it.price)}</div>
        <button class="remove-item" type="button" aria-label="Remove ${escapeAttr(it.name)}">×</button>`;
      const [nameInput, qtyInput, priceInput] = card.querySelectorAll('input');
      nameInput.addEventListener('input', () => { it.name = safeText(nameInput.value,80); updateAll(false); });
      qtyInput.addEventListener('input', () => { it.qty = finitePositive(qtyInput.value, 0); updateAll(false); card.querySelector('.item-total').textContent=formatMoney(it.qty*it.price); });
      priceInput.addEventListener('input', () => { it.price = finitePositive(priceInput.value, 0); updateAll(false); card.querySelector('.item-total').textContent=formatMoney(it.qty*it.price); });
      qtyInput.addEventListener('blur', () => { if (it.qty <= 0) { it.qty=1; qtyInput.value='1'; updateAll(); } });
      card.querySelector('.remove-item').addEventListener('click', () => { state.items.splice(idx,1); renderItems(); updateAll(); });
      els.itemsList.appendChild(card);
    });
  }
  function escapeAttr(s) { return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function updateAll(rerenderItemTotals = true) {
    const store = safeText(els.storeName.value,70) || 'YOUR STORE';
    els.previewStoreName.textContent = store.toUpperCase(); els.stampName.textContent = compactStampName(store);
    const addr=safeText(els.storeAddress.value,120); const phone=safeText(els.storePhone.value,30); els.previewAddress.textContent=addr; els.previewAddress.hidden=!addr; els.previewPhone.textContent=phone; els.previewPhone.hidden=!phone;
    els.previewReceiptNo.textContent = safeText(els.receiptNumber.value,30) || '—';
    els.previewDate.textContent = els.receiptDate.value ? new Date(`${els.receiptDate.value}T00:00:00`).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'2-digit'}) : '—';
    els.previewTime.textContent = els.receiptTime.value || '—'; const pay=els.paymentMethod.value; els.previewPaymentRow.hidden=!pay; els.previewPayment.textContent=pay || '—';
    els.previewItems.innerHTML='';
    if (!state.items.length) {
      const empty=document.createElement('div'); empty.className='receipt-item'; empty.innerHTML='<div class="ri-name"><strong>No items added</strong><span>Use the item search to begin</span></div><div class="ri-qty">—</div><div class="ri-amount">—</div>'; els.previewItems.appendChild(empty);
    } else {
      state.items.forEach(it => { const row=document.createElement('div'); row.className='receipt-item'; const n=document.createElement('div'); n.className='ri-name'; const strong=document.createElement('strong'); strong.textContent=safeText(it.name,80)||'Item'; const unit=document.createElement('span'); unit.textContent=`@ ${formatMoney(it.price)}`; n.append(strong,unit); const q=document.createElement('div'); q.className='ri-qty'; q.textContent=trimNumber(it.qty); const amt=document.createElement('div'); amt.className='ri-amount'; amt.textContent=formatMoney(it.qty*it.price); row.append(n,q,amt); els.previewItems.appendChild(row); });
    }
    const t=totals(); els.previewSubtotal.textContent=formatMoney(t.subtotal); els.previewGrandTotal.textContent=formatMoney(t.grand); els.editorGrandTotal.textContent=formatMoney(t.grand);
    els.previewDiscountRow.hidden = t.discount <= 0; els.previewDiscount.textContent=`−${formatMoney(t.discount)}`; els.previewDiscountLabel.textContent = els.discountType.value==='percent' ? `Discount (${clamp(t.raw,0,100)}%)` : 'Discount';
    els.discountHint.textContent = t.discount > 0 ? `You save ${formatMoney(t.discount)}` : 'No discount applied';
    if (rerenderItemTotals) [...els.itemsList.querySelectorAll('.item-card')].forEach((card,i) => { const target=card.querySelector('.item-total'); const it=state.items[i]; if(target&&it) target.textContent=formatMoney(it.qty*it.price); });
  }
  function trimNumber(n) { const x=finitePositive(n); return Number.isInteger(x) ? String(x) : String(Number(x.toFixed(2))); }
  function compactStampName(s) { const cleaned=safeText(s,70).toUpperCase(); if (cleaned.length<=18) return cleaned; const words=cleaned.split(/\s+/).filter(Boolean); return words.slice(0,3).join(' ').slice(0,22); }

  function reset(confirmFirst=true) {
    if (confirmFirst && (els.storeName.value || state.items.length) && !window.confirm('Clear this receipt and start fresh?')) return;
    state.category='retail'; state.items=[]; state.suggestions=[]; state.activeSuggestion=-1;
    els.storeName.value=''; els.storePhone.value=''; els.storeAddress.value=''; els.currency.value='INR'; els.itemSearch.value=''; els.receiptDate.value=isoDateLocal(); els.receiptTime.value=timeLocal(); els.paymentMethod.value=''; els.receiptNumber.value=receiptId(); els.discountType.value='percent'; els.discountValue.value='0';
    els.suggestions.hidden=true; renderCategories(); renderItems(); updateAll(); if (confirmFirst) showToast('Fresh receipt ready.');
  }

  function validateForExport() {
    if (!safeText(els.storeName.value,70)) { showToast('Add your store name before exporting.'); els.storeName.focus(); return false; }
    if (!state.items.length) { showToast('Add at least one item before exporting.'); els.itemSearch.focus(); return false; }
    if (state.items.some(i => !safeText(i.name,80) || finitePositive(i.qty)<=0)) { showToast('Check item names and quantities.'); return false; }
    return true;
  }
  function sanitizeFilename(s) { return normalize(s).replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'').slice(0,40) || 'receipt'; }

  async function downloadPdf() {
    if (!validateForExport()) return;
    els.downloadPdfBtn.disabled=true; els.downloadPdfBtn.textContent='Preparing PDF…'; els.actionNote.textContent='Creating the receipt locally on this device…';
    try {
      const pages = renderReceiptCanvasPages();
      const jpgs = pages.map(c => dataUrlToBytes(c.toDataURL('image/jpeg', 0.94)));
      const pdf = buildPdfFromJpegs(jpgs, pages.map(c => ({w:c.width,h:c.height})));
      const blob = new Blob([pdf], {type:'application/pdf'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`${sanitizeFilename(els.storeName.value)}-${els.receiptDate.value || isoDateLocal()}.pdf`; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500); showToast('PDF downloaded.');
    } catch (err) {
      console.error(err); showToast('PDF generation failed. You can still use Print → Save as PDF.');
    } finally {
      els.downloadPdfBtn.disabled=false; els.downloadPdfBtn.textContent='Download PDF'; els.actionNote.textContent='PDF creation happens entirely in your browser.';
    }
  }

  function renderReceiptCanvasPages() {
    const scale=3; const W=900; const padding=70; const lineH=31; const t=totals(); const store=safeText(els.storeName.value,70) || 'YOUR STORE';
    const itemLines=[];
    for (const it of state.items) {
      const parts=wrapText(`${safeText(it.name,80)}  ×${trimNumber(it.qty)}`, 37);
      itemLines.push({parts, amount:formatMoney(it.qty*it.price), unit:`@ ${formatMoney(it.price)}`});
    }
    const estimated = 430 + itemLines.reduce((n,x)=>n + 36 + (x.parts.length-1)*lineH,0) + 320;
    const maxPageH=1260; const full=document.createElement('canvas'); full.width=W; full.height=Math.max(estimated,900); const ctx=full.getContext('2d');
    ctx.fillStyle='#fff'; ctx.fillRect(0,0,full.width,full.height); ctx.fillStyle='#151515'; ctx.textBaseline='top';
    const mono='26px ui-monospace, Menlo, Consolas, monospace'; const monoBold='bold 26px ui-monospace, Menlo, Consolas, monospace'; const monoSmall='22px ui-monospace, Menlo, Consolas, monospace';
    let y=padding;
    ctx.font='bold 38px ui-monospace, Menlo, Consolas, monospace'; drawCentered(ctx, store.toUpperCase(), W/2, y, W-140); y+=54;
    ctx.font=monoSmall; ctx.fillStyle='#555'; if(els.storeAddress.value){ for(const l of wrapText(safeText(els.storeAddress.value,120),52)){drawCentered(ctx,l,W/2,y,W-140);y+=27;} } if(els.storePhone.value){drawCentered(ctx,safeText(els.storePhone.value,30),W/2,y,W-140);y+=28;} ctx.fillStyle='#151515'; y+=15; dashed(ctx,padding,W-padding,y); y+=27;
    ctx.font=monoSmall; y=drawMeta(ctx,'Receipt',safeText(els.receiptNumber.value,30),padding,W-padding,y); y=drawMeta(ctx,'Date',els.receiptDate.value || '—',padding,W-padding,y); y=drawMeta(ctx,'Time',els.receiptTime.value || '—',padding,W-padding,y); if(els.paymentMethod.value)y=drawMeta(ctx,'Payment',els.paymentMethod.value,padding,W-padding,y); y+=8; dashed(ctx,padding,W-padding,y); y+=28;
    ctx.font='bold 21px ui-monospace, Menlo, Consolas, monospace'; ctx.fillText('ITEM',padding,y); rightText(ctx,'QTY',W-255,y); rightText(ctx,'AMOUNT',W-padding,y); y+=38; ctx.font=monoSmall;
    for(const row of itemLines){ ctx.font='bold 22px ui-monospace, Menlo, Consolas, monospace'; row.parts.forEach((p,idx)=>{ctx.fillText(p,padding,y); if(idx===0){rightText(ctx,row.amount,W-padding,y);} y+=lineH;}); ctx.font='19px ui-monospace, Menlo, Consolas, monospace'; ctx.fillStyle='#666'; ctx.fillText(row.unit,padding,y); ctx.fillStyle='#151515'; y+=30; }
    y+=5; dashed(ctx,padding,W-padding,y); y+=28; ctx.font=monoSmall; y=drawMeta(ctx,'Subtotal',formatMoney(t.subtotal),padding,W-padding,y); if(t.discount>0)y=drawMeta(ctx,'Discount',`-${formatMoney(t.discount)}`,padding,W-padding,y); y+=8; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(padding,y);ctx.lineTo(W-padding,y);ctx.stroke();y+=24; ctx.font='bold 31px ui-monospace, Menlo, Consolas, monospace'; ctx.fillText('TOTAL',padding,y); rightText(ctx,formatMoney(t.grand),W-padding,y); y+=58;
    drawStamp(ctx,W/2,y+85,compactStampName(store)); y+=190; ctx.font=monoBold; drawCentered(ctx,'Thank you for your business.',W/2,y,W-120); y+=38; ctx.font='18px ui-monospace, Menlo, Consolas, monospace'; ctx.fillStyle='#666'; drawCentered(ctx,'Generated for a genuine business transaction.',W/2,y,W-120); y+=50;
    const usedH=Math.min(full.height,Math.ceil(y+padding)); const pages=[]; for(let sy=0; sy<usedH; sy+=maxPageH){ const h=Math.min(maxPageH, usedH-sy); const page=document.createElement('canvas'); page.width=W*scale; page.height=h*scale; const pctx=page.getContext('2d'); pctx.scale(scale,scale); pctx.fillStyle='#fff';pctx.fillRect(0,0,W,h);pctx.drawImage(full,0,sy,W,h,0,0,W,h);pages.push(page);} return pages;
  }
  function wrapText(text,max){ const words=String(text).split(/\s+/); const lines=[]; let cur=''; for(const w of words){ const candidate=cur?`${cur} ${w}`:w; if(candidate.length>max&&cur){lines.push(cur);cur=w;}else cur=candidate;} if(cur)lines.push(cur); return lines.length?lines:['']; }
  function drawCentered(ctx,text,cx,y,maxW){ let s=String(text); while(ctx.measureText(s).width>maxW&&s.length>4)s=s.slice(0,-1); if(s!==text)s=s.slice(0,-1)+'…'; ctx.fillText(s,cx-ctx.measureText(s).width/2,y); }
  function rightText(ctx,text,x,y){ ctx.fillText(String(text),x-ctx.measureText(String(text)).width,y); }
  function dashed(ctx,x1,x2,y){ ctx.save();ctx.setLineDash([10,10]);ctx.strokeStyle='#555';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x1,y);ctx.lineTo(x2,y);ctx.stroke();ctx.restore(); }
  function drawMeta(ctx,k,v,x1,x2,y){ ctx.fillText(k,x1,y);rightText(ctx,v||'—',x2,y);return y+34; }
  function drawStamp(ctx,cx,cy,name){ ctx.save();ctx.translate(cx,cy);ctx.rotate(-7*Math.PI/180);ctx.strokeStyle='#496358';ctx.fillStyle='#496358';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,82,0,Math.PI*2);ctx.stroke();ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,70,0,Math.PI*2);ctx.stroke();ctx.font='bold 17px ui-monospace, Menlo, Consolas, monospace';drawCentered(ctx,'OFFICIAL',0,-48,110);ctx.font='bold 21px ui-monospace, Menlo, Consolas, monospace';drawCentered(ctx,name,0,-10,120);ctx.font='bold 17px ui-monospace, Menlo, Consolas, monospace';drawCentered(ctx,'RECEIPT',0,30,110);ctx.restore(); }
  function dataUrlToBytes(url){ const b64=url.split(',')[1]; const bin=atob(b64); const bytes=new Uint8Array(bin.length); for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i); return bytes; }
  function buildPdfFromJpegs(images,sizes){
    const enc=new TextEncoder(); const chunks=[]; let offset=0; const offsets=[0]; const push=(data)=>{ const b=typeof data==='string'?enc.encode(data):data; chunks.push(b);offset+=b.length; };
    push('%PDF-1.4\n%âãÏÓ\n'); const obj=(id,bodyParts)=>{offsets[id]=offset;push(`${id} 0 obj\n`);bodyParts.forEach(push);push('\nendobj\n');};
    const pageIds=[]; const imageIds=[]; const contentIds=[]; let next=3; for(let i=0;i<images.length;i++){pageIds.push(next++);imageIds.push(next++);contentIds.push(next++);} obj(1,[`<< /Type /Catalog /Pages 2 0 R >>`]); obj(2,[`<< /Type /Pages /Count ${images.length} /Kids [${pageIds.map(id=>`${id} 0 R`).join(' ')}] >>`]);
    for(let i=0;i<images.length;i++){
      const pageW=612; const pageH=Math.max(200, Math.round(pageW * sizes[i].h / sizes[i].w));
      obj(pageIds[i],[`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Resources << /XObject << /Im${i} ${imageIds[i]} 0 R >> >> /Contents ${contentIds[i]} 0 R >>`]);
      offsets[imageIds[i]]=offset; push(`${imageIds[i]} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${sizes[i].w} /Height ${sizes[i].h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${images[i].length} >>\nstream\n`); push(images[i]); push('\nendstream\nendobj\n');
      const stream=`q\n${pageW} 0 0 ${pageH} 0 0 cm\n/Im${i} Do\nQ\n`; obj(contentIds[i],[`<< /Length ${enc.encode(stream).length} >>\nstream\n${stream}endstream`]);
    }
    const xref=offset; push(`xref\n0 ${next}\n0000000000 65535 f \n`); for(let i=1;i<next;i++)push(`${String(offsets[i]||0).padStart(10,'0')} 00000 n \n`); push(`trailer\n<< /Size ${next} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);
    const len=chunks.reduce((n,b)=>n+b.length,0); const out=new Uint8Array(len); let p=0; for(const b of chunks){out.set(b,p);p+=b.length;} return out;
  }

  els.itemSearch.addEventListener('input', renderSuggestions);
  els.itemSearch.addEventListener('keydown', (e) => {
    if (!state.suggestions.length) return;
    if (e.key==='ArrowDown'){e.preventDefault();state.activeSuggestion=(state.activeSuggestion+1)%state.suggestions.length;syncSuggestionActive();}
    else if(e.key==='ArrowUp'){e.preventDefault();state.activeSuggestion=(state.activeSuggestion-1+state.suggestions.length)%state.suggestions.length;syncSuggestionActive();}
    else if(e.key==='Enter'){e.preventDefault();const s=state.suggestions[state.activeSuggestion];if(s)addItem(s.name);}
    else if(e.key==='Escape'){els.suggestions.hidden=true;els.itemSearch.setAttribute('aria-expanded','false');}
  });
  els.itemSearch.addEventListener('focus', () => { if (els.itemSearch.value.trim()) renderSuggestions(); });
  document.addEventListener('click', (e) => { if (!e.target.closest('.item-search-wrap')) {els.suggestions.hidden=true;els.itemSearch.setAttribute('aria-expanded','false');} });
  [els.storeName,els.storePhone,els.storeAddress,els.receiptDate,els.receiptTime,els.receiptNumber].forEach(el=>el.addEventListener('input',()=>updateAll(false)));
  [els.currency,els.paymentMethod,els.discountType].forEach(el=>el.addEventListener('change',()=>{renderItems();updateAll();}));
  els.discountValue.addEventListener('input',()=>{ if(els.discountType.value==='percent' && finitePositive(els.discountValue.value)>100) els.discountValue.value='100'; updateAll(false); });
  els.resetBtn.addEventListener('click',()=>reset(true));
  els.printBtn.addEventListener('click',()=>{ if(validateForExport()) window.print(); });
  els.downloadPdfBtn.addEventListener('click',downloadPdf);

  reset(false);
})();
