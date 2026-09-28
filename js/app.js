/* PANTAS: Pengendalian Antibiotik Terintegrasi Apotek dan SATUSEHAT
   Prototipe untuk Lomba Esai USK Pharmacy Fair 2026.
   Semua data di file ini adalah simulasi. */
(function () {
  'use strict';

  // ---------------- Ikon ----------------
  const svg = (p, vb = '0 0 24 24') => `<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
  const I = {
    cart: svg('<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.2a1 1 0 0 0 1-.8L20 8H6.2"/>'),
    lock: svg('<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    qr: svg('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>'),
    doc: svg('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>'),
    check: svg('<path d="M5 12.5l4.5 4.5L19 7.5"/>'),
    hold: svg('<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17.5v.01"/>'),
    book: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M9 7h6"/>'),
    chart: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    home: svg('<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'),
    pill: svg('<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-35 12 12)"/><path d="M9.2 8.1l5.6 7.8"/>'),
    trash: svg('<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>'),
    shield: svg('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
    clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    map: svg('<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'),
    video: svg('<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>'),
    building: svg('<path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M8 8h3M8 12h3M8 16h3M3 21h18"/>'),
    cough: svg('<circle cx="10" cy="10" r="6"/><path d="M17 8c2 0 3 1 3 2M17 12c2 0 3.5.5 4 2M16 16c1.5.5 2.5 1.5 3 3"/>'),
    throat: svg('<path d="M8 3v5a4 4 0 0 0 8 0V3M12 12v9M9 21h6"/>'),
    tooth: svg('<path d="M7 3c-2 0-3 2-3 4 0 3 1.5 4 2 7s1 7 2.5 7 1.5-5 3.5-5 2 5 3.5 5S18 17 18.5 14s2-4 2-7c0-2-1-4-3-4-2.5 0-3 1.5-5.5 1.5S9.5 3 7 3z"/>'),
    drop: svg('<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>'),
    bandage: svg('<rect x="2.5" y="8" width="19" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M10 10h.01M14 14h.01M10 14h.01M14 10h.01"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    bell: svg('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0"/>'),
    user: svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/>'),
    cal: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
    back: svg('<path d="M15 5l-7 7 7 7"/>'),
    send: svg('<path d="M4 12l16-8-6 16-2.5-6.5z"/>'),
  };

  // ---------------- Data simulasi ----------------
  const PRODUCTS = [
    { id: 'amox', name: 'Amoksisilin 500 mg', unit: 'strip 10 kapsul', price: 9000, ab: true },
    { id: 'para', name: 'Parasetamol 500 mg', unit: 'strip 10 tablet', price: 5000 },
    { id: 'cefa', name: 'Sefadroksil 500 mg', unit: 'strip 10 kapsul', price: 18000, ab: true },
    { id: 'obh', name: 'Sirup obat batuk 100 ml', unit: 'botol', price: 14000 },
    { id: 'cipro', name: 'Siprofloksasin 500 mg', unit: 'strip 10 tablet', price: 12000, ab: true },
    { id: 'oralit', name: 'Oralit', unit: 'sachet', price: 2500 },
    { id: 'zinc', name: 'Zinc 20 mg', unit: 'strip 10 tablet', price: 8000 },
    { id: 'lozenge', name: 'Tablet hisap pereda tenggorokan', unit: 'strip 8 tablet', price: 11000 },
    { id: 'ibu', name: 'Ibuprofen 200 mg', unit: 'strip 10 tablet', price: 7000 },
    { id: 'antiseptik', name: 'Cairan antiseptik 60 ml', unit: 'botol', price: 16000 },
  ];
  const P = Object.fromEntries(PRODUCTS.map(p => [p.id, p]));

  const ERESEP = {
    code: 'ER-3573-260921-7741',
    doctor: 'dr. Rina Pratiwi',
    sip: 'SIP.3573.0417.2025',
    faskes: 'Klinik Pratama Sehat Bersama',
    date: '21 September 2026',
    drug: 'Amoksisilin 500 mg',
    rule: '3 × 1 kapsul sesudah makan',
    days: 5, qty: 15,
    patient: 'P-****-218',
  };

  const COMPLAINTS = {
    batuk: {
      label: 'Batuk pilek', icon: 'cough',
      otc: ['obh', 'para'],
      tips: ['Sebagian besar batuk pilek disebabkan virus dan sembuh sendiri dalam 7 sampai 10 hari.', 'Anjurkan banyak minum air hangat dan istirahat cukup.', 'Parasetamol dapat dipakai bila disertai demam atau nyeri.'],
      danger: ['Sesak napas atau napas cepat', 'Demam lebih dari 3 hari', 'Batuk lebih dari 2 minggu atau berdahak kehijauan disertai demam tinggi'],
      say: 'Batuk pilek umumnya disebabkan virus, jadi antibiotik tidak mempercepat sembuh dan justru bisa membuat bakteri kebal. Kalau demam lebih dari tiga hari atau sesak napas, sebaiknya periksa ke dokter.',
    },
    tenggorokan: {
      label: 'Sakit tenggorokan', icon: 'throat',
      otc: ['lozenge', 'para'],
      tips: ['Sebagian besar sakit tenggorokan disebabkan virus.', 'Tablet hisap dan kumur air garam hangat dapat meredakan rasa sakit.', 'Parasetamol atau ibuprofen untuk nyeri dan demam.'],
      danger: ['Sulit menelan atau membuka mulut', 'Demam tinggi dengan bercak putih di amandel', 'Pembengkakan leher atau suara sangat serak'],
      say: 'Radang tenggorokan paling sering karena virus. Kalau ada bercak putih di amandel disertai demam tinggi, dokter perlu memeriksa apakah memang ada infeksi bakteri.',
    },
    gigi: {
      label: 'Sakit gigi', icon: 'tooth',
      otc: ['ibu', 'para'],
      tips: ['Pereda nyeri membantu sementara sambil menunggu perawatan gigi.', 'Antibiotik tidak menggantikan perawatan gigi berlubang.', 'Anjurkan ke dokter gigi di puskesmas.'],
      danger: ['Pipi atau gusi bengkak', 'Demam', 'Nanah atau sulit membuka mulut'],
      say: 'Sakit gigi perlu ditangani dokter gigi karena sumber masalahnya ada di gigi itu sendiri. Pereda nyeri ini untuk sementara, dan kalau pipi bengkak atau demam, segera periksa.',
    },
    diare: {
      label: 'Diare', icon: 'drop',
      otc: ['oralit', 'zinc'],
      tips: ['Oralit untuk mencegah kekurangan cairan.', 'Zinc selama 10 hari untuk diare pada anak.', 'Sebagian besar diare tidak membutuhkan antibiotik.'],
      danger: ['Tinja berdarah', 'Tanda kekurangan cairan: lemas, jarang buang air kecil, mata cekung', 'Demam tinggi atau diare lebih dari 3 hari'],
      say: 'Yang paling penting saat diare adalah mengganti cairan dengan oralit. Kalau ada darah di tinja atau badan sangat lemas, segera ke dokter.',
    },
    luka: {
      label: 'Luka', icon: 'bandage',
      otc: ['antiseptik', 'para'],
      tips: ['Bersihkan luka dengan air mengalir, lalu beri antiseptik.', 'Tutup dengan kasa bersih dan ganti setiap hari.', 'Luka kecil yang bersih biasanya tidak memerlukan antibiotik minum.'],
      danger: ['Kemerahan yang meluas atau bernanah', 'Demam', 'Luka dalam, gigitan hewan, atau terkena benda berkarat'],
      say: 'Luka kecil cukup dibersihkan dan dirawat setiap hari. Kalau kemerahannya meluas, bernanah, atau muncul demam, luka perlu diperiksa dokter.',
    },
  };

  const KEC = [
    { id: 'lowokwaru', name: 'Lowokwaru', ratio: 71, apotek: 34 },
    { id: 'blimbing', name: 'Blimbing', ratio: 78, apotek: 27 },
    { id: 'klojen', name: 'Klojen', ratio: 86, apotek: 31 },
    { id: 'sukun', name: 'Sukun', ratio: 64, apotek: 19 },
    { id: 'kedungkandang', name: 'Kedungkandang', ratio: 58, apotek: 17 },
  ];
  const APOTEK = [
    { id: 'a1', name: 'Apotek Cahaya Farma', kec: 'kedungkandang', ratio: 34, trend: [52, 44, 34], bought: 1200, rx: 408, visit: 'Belum pernah' },
    { id: 'a2', name: 'Apotek Sumber Waras 2', kec: 'sukun', ratio: 41, trend: [45, 43, 41], bought: 950, rx: 390, visit: 'Maret 2026' },
    { id: 'a3', name: 'Apotek Mitra Keluarga', kec: 'lowokwaru', ratio: 46, trend: [60, 51, 46], bought: 880, rx: 405, visit: 'Belum pernah' },
    { id: 'a4', name: 'Apotek Bunga Sehat', kec: 'kedungkandang', ratio: 49, trend: [48, 50, 49], bought: 610, rx: 299, visit: 'Januari 2026' },
    { id: 'a5', name: 'Apotek Sentosa Medika', kec: 'blimbing', ratio: 55, trend: [70, 62, 55], bought: 720, rx: 396, visit: 'Belum pernah' },
    { id: 'a6', name: 'Apotek Sehat Sentosa', kec: 'lowokwaru', ratio: 82, trend: [64, 75, 82], bought: 540, rx: 443, visit: 'Juli 2026' },
    { id: 'a7', name: 'Apotek Kasih Ibu', kec: 'klojen', ratio: 91, trend: [85, 88, 91], bought: 830, rx: 755, visit: 'Mei 2026' },
    { id: 'a8', name: 'Apotek Rajawali', kec: 'sukun', ratio: 73, trend: [66, 70, 73], bought: 470, rx: 343, visit: 'Juni 2026' },
    { id: 'a9', name: 'Apotek Tunas Harapan', kec: 'blimbing', ratio: 88, trend: [80, 86, 88], bought: 390, rx: 343, visit: 'April 2026' },
  ];

  const ROLES = {
    apoteker: { label: 'Apoteker', device: 'phone', start: 'login',
      screens: [['login', 'Masuk apoteker'], ['kasir', 'Kasir dan Gerbang Resep'], ['pindai', 'Pindai resep elektronik'], ['kertas', 'Verifikasi resep kertas'], ['verifikasi', 'Hasil verifikasi'], ['panduan', 'Panduan Layani dan Rujuk'], ['tele', 'Rujuk telekonsultasi'], ['struk', 'Struk dan pencatatan'], ['ringkasan', 'Ringkasan hari ini']] },
    pasien: { label: 'Pasien', device: 'phone', start: 'pengingat',
      screens: [['pengingat', 'Pengingat Tuntas'], ['selesai', 'Pengobatan selesai']] },
    pengawas: { label: 'Pengawas', device: 'phone', start: 'dasbor',
      screens: [['dasbor', 'Dasbor berbasis risiko'], ['apotek', 'Detail apotek']] },
  };
  const CAPTIONS = {
    login: 'Hanya akun apoteker penanggung jawab yang dapat memverifikasi resep antibiotik.',
    kasir: 'Gerbang Resep: antibiotik terkunci di kasir, obat lain tetap bisa dibayar.',
    pindai: 'Memindai kode resep elektronik SATUSEHAT.',
    kertas: 'Resep kertas diverifikasi lewat nomor izin praktik dokter dan foto resep.',
    verifikasi: 'Hasil verifikasi menentukan antibiotik diserahkan atau ditahan.',
    panduan: 'Pasien tanpa resep tetap dilayani: obat bebas yang sesuai, tanda bahaya, dan rujukan.',
    tele: 'Rujukan telekonsultasi menerbitkan resep elektronik bila antibiotik memang dibutuhkan.',
    struk: 'Setiap penyerahan antibiotik tercatat dan memicu Pengingat Tuntas.',
    ringkasan: 'Apotek tetap bisa melihat penjualannya sendiri, termasuk obat non-antibiotik.',
    pengingat: 'Pengingat Tuntas di ponsel pasien.',
    selesai: 'Akhir terapi: panduan membuang sisa obat.',
    dasbor: 'Dasbor dinas kesehatan: rasio kecocokan resep per apotek dan kecamatan.',
    apotek: 'Detail apotek prioritas untuk dasar kunjungan pengawasan.',
  };

  // ---------------- State ----------------
  const fresh = () => ({
    role: 'apoteker', screen: 'login', loggedIn: false,
    cart: [], verify: null, pendingCode: '', complaint: 'batuk',
    tele: 0, teleOutcome: null, receipt: null,
    stats: { trx: 41, verified: 12, held: 5, referred: 3, omzetNon: 1840000, omzetPrev: 1795000 },
    doses: { taken: 7, today: [true, false, false] },
    kec: null, apotek: 'a1', scanning: false,
  });
  let S = fresh();

  const $ = (s, r = document) => r.querySelector(s);
  const app = $('#app');
  const rp = n => 'Rp' + n.toLocaleString('id-ID');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600);
  }

  // ---------------- Navigasi ----------------
  function go(screen, role) {
    if (role && role !== S.role) S.role = role;
    if (S.role === 'apoteker' && screen !== 'login' && !S.loggedIn) S.loggedIn = true;
    S.screen = screen;
    render();
    const c = $('.content, .p-body', app); if (c) c.scrollTop = 0;
  }

  // ---------------- Kerangka ----------------
  function phoneFrame(label, title, sub, body, tabs, right = '') {
    const tabHtml = tabs.map(([id, l, ic, active]) => `<button class="${active ? 'active' : ''}" data-go="${id}">${ic}${l}</button>`).join('');
    const back = S.screenBack ? `<button class="back-btn" data-go="${S.screenBack}" aria-label="Kembali">${I.back}</button>` : '';
    return `<div class="phone-app">
      <div class="statusbar"><span>09.41</span><span>${label}</span></div>
      <header class="p-top">${back}<div class="p-top-text"><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ''}</div>${right}</header>
      <div class="content">${body}</div>
      <nav class="p-tabs" style="grid-template-columns:repeat(${tabs.length},1fr)">${tabHtml}</nav>
    </div>`;
  }
  const BACK = { pindai: 'kasir', kertas: 'kasir', verifikasi: 'kasir', tele: 'panduan', struk: 'kasir', apotek: 'dasbor' };
  function shellApoteker(title, sub, body, right = '') {
    const active = ['kasir', 'pindai', 'kertas', 'verifikasi', 'struk'].includes(S.screen) ? 'kasir' : S.screen === 'tele' ? 'panduan' : S.screen;
    S.screenBack = BACK[S.screen] || null;
    return phoneFrame('PANTAS Apotek', title, sub, body, [['kasir', 'Kasir', I.cart, active === 'kasir'], ['panduan', 'Panduan', I.book, active === 'panduan'], ['ringkasan', 'Ringkasan', I.chart, active === 'ringkasan']], right);
  }
  function shellPengawas(title, sub, body, right = '') {
    S.screenBack = BACK[S.screen] || null;
    return phoneFrame('PANTAS Pengawas', title, sub, body, [['dasbor', 'Dasbor', I.map, S.screen === 'dasbor'], ['apotek', 'Apotek', I.building, S.screen === 'apotek']], right);
  }

  // ---------------- Layar apoteker ----------------
  const V = {};

  V.login = () => `<div class="phone-app login-phone">
    <div class="login-art">
      <div class="seal" aria-hidden="true"></div>
      <div class="row"><span class="brand-mark"></span><strong style="font-size:18px;letter-spacing:.04em">PANTAS</strong></div>
      <h2>Setiap antibiotik keluar bersama resep yang terverifikasi.</h2>
      <p>Terhubung dengan resep elektronik SATUSEHAT.</p>
    </div>
    <form class="login-form" id="loginForm">
      <div><h3 style="font-size:20px;margin:0">Masuk sebagai apoteker</h3><p class="muted" style="margin:6px 0 0;font-size:13.5px;line-height:1.45">Verifikasi resep antibiotik hanya dapat dilakukan oleh apoteker penanggung jawab.</p></div>
      <div class="field"><label for="str">Nomor STR apoteker</label><input id="str" value="STRA-19930412-2020-0073" autocomplete="off"><div class="hint">Diisi otomatis untuk demo.</div></div>
      <div class="field"><label for="pin">PIN</label><input id="pin" type="password" value="123456"></div>
      <button class="btn block" type="submit">${I.shield}Masuk</button>
      <p class="small muted" style="margin:0">Apotek Sehat Sentosa, Lowokwaru, Kota Malang (simulasi)</p>
    </form>
  </div>`;

  function cartTotals() {
    let payable = 0, locked = 0;
    S.cart.forEach(l => { const s = P[l.id].price * l.qty; if (l.status === 'locked') locked += s; else payable += s; });
    return { payable, locked };
  }

  V.kasir = () => {
    const hasLocked = S.cart.some(l => l.status === 'locked');
    const prods = PRODUCTS.map(p => `<button class="prod ${p.ab ? 'ab' : ''}" data-add="${p.id}">
        <strong>${p.ab ? '<span class="tag-k" title="Obat keras">K</span>' : ''}${p.name}</strong>
        <span>${p.unit}${p.ab ? ', antibiotik' : ''}</span><span class="price">${rp(p.price)}</span></button>`).join('');
    const lines = S.cart.length ? S.cart.map((l, i) => {
      const p = P[l.id];
      const st = l.status === 'locked' ? `<span class="lock">${I.lock}Butuh resep terverifikasi</span>` : l.status === 'ok' ? `<span class="pill"><span class="dot"></span>Resep ${esc(l.code || '')}</span>` : `<span class="qty">${l.qty} × ${rp(p.price)}</span>`;
      return `<div class="line ${l.status || ''}"><div><b>${p.name}</b><br>${st}</div><div class="amt">${rp(p.price * l.qty)}<br><button class="rm" data-rm="${i}">Hapus</button></div></div>`;
    }).join('') : `<div class="empty">Pilih obat dari daftar atau pindai barcode kemasan.</div>`;
    const t = cartTotals();
    const gate = hasLocked ? `<div class="gate" role="alert">
        <h4>${I.lock}Antibiotik terdeteksi</h4>
        <p>Pindai kode resep elektronik atau verifikasi resep kertas untuk melanjutkan penyerahan antibiotik.</p>
        <div class="btns"><button class="btn amber" data-go="pindai">${I.qr}Pindai resep</button><button class="btn ghost" data-go="kertas">${I.doc}Resep kertas</button></div>
        <button class="btn ghost block" style="margin-top:8px" data-go="panduan">Pembeli tidak membawa resep</button>
      </div>` : '';
    return shellApoteker('Kasir', 'Transaksi baru', `<div class="pos">
      <div>
        <div class="search">${I.search}Cari obat atau pindai barcode kemasan</div>
        <div class="catalog">${prods}</div>
      </div>
      <aside class="cart" aria-label="Keranjang">
        <div class="cart-head"><h3 style="margin:0">Keranjang</h3><span class="pill blue">${S.cart.length} item</span></div>
        <div class="cart-items">${lines}</div>
        ${gate}
        <div class="cart-foot">
          <div class="total"><span>Dapat dibayar</span><b>${rp(t.payable)}</b></div>
          ${t.locked ? `<div class="total small"><span class="muted">Ditahan menunggu resep</span><span class="muted">${rp(t.locked)}</span></div>` : ''}
          <button class="btn block" data-pay ${t.payable ? '' : 'disabled'}>${hasLocked ? 'Bayar obat lain' : 'Bayar'}</button>
        </div>
      </aside>
    </div>`, `<span class="pill"><span class="dot"></span>SATUSEHAT</span>`);
  };

  V.pindai = () => shellApoteker('Pindai resep elektronik', 'Arahkan kode QR resep dari ponsel atau lembar pasien ke kamera', `<div class="scan-wrap">
      <div class="viewfinder"><div class="qr"></div><div class="corners"></div><div class="beam"></div><div class="scanning-label">Mencari kode resep...</div></div>
      <div class="steps">
        <div class="card"><h3>Masukkan kode secara manual</h3>
          <div class="field"><label for="code">Kode resep elektronik</label><input id="code" value="${esc(S.pendingCode)}" placeholder="Contoh: ER-3573-260921-7741"></div>
          <button class="btn block" style="margin-top:10px" data-verify-code>${I.check}Verifikasi kode</button>
        </div>
        <div class="card"><h3>Simulasi pemindaian</h3><p class="small muted" style="margin:0 0 10px">Pilih hasil untuk keperluan demo.</p>
          <div class="grid2"><button class="btn ghost" data-sim="valid">Resep valid</button><button class="btn ghost" data-sim="invalid">Kode tidak dikenal</button></div>
        </div>
        <button class="btn ghost" data-go="kasir">${I.back}Kembali ke kasir</button>
      </div>
    </div>`);

  V.kertas = () => shellApoteker('Verifikasi resep kertas', 'Untuk resep yang belum berbentuk elektronik', `<div class="grid2">
      <div class="card" style="display:flex;flex-direction:column;gap:12px">
        <div class="field"><label for="dok">Nama dokter</label><input id="dok" value="dr. Andi Saputra"></div>
        <div class="field"><label for="sip">Nomor izin praktik (SIP)</label><input id="sip" value="SIP.3573.0288.2024"><div class="hint">Dicocokkan dengan data tenaga kesehatan yang terdaftar.</div></div>
        <div class="field"><label for="tgl">Tanggal resep</label><input id="tgl" value="27 September 2026"></div>
        <button class="btn" data-verify-paper>${I.check}Verifikasi resep kertas</button>
      </div>
      <div class="card">
        <h3>Foto resep</h3>
        <div style="border:2px dashed var(--line);border-radius:12px;height:220px;display:grid;place-items:center;text-align:center;color:var(--muted);font-size:13.5px;background:var(--paper)">
          <div>${I.doc.replace('<svg', '<svg style="width:36px;height:36px;margin:0 auto 8px"')}Foto resep terlampir<br><b style="color:var(--ink)">resep_27092026.jpg</b></div>
        </div>
        <p class="small muted">Resep kertas yang lolos verifikasi tetap tercatat dan masuk sampel audit acak dinas kesehatan.</p>
      </div>
    </div>`);

  V.verifikasi = () => {
    const v = S.verify || { type: 'invalid' };
    if (v.type === 'invalid') {
      return shellApoteker('Hasil verifikasi', 'Gerbang Resep', `<div style="max-width:720px;display:flex;flex-direction:column;gap:14px">
        <div class="verdict held"><div class="icon">${I.hold}</div><div><h3>Penyerahan ditahan</h3><p>${esc(v.reason || 'Kode resep tidak ditemukan di SATUSEHAT.')} Antibiotik tetap terkunci, obat lain di keranjang tetap bisa dibayar.</p></div></div>
        <div class="card"><h3>Apa yang bisa dilakukan sekarang</h3>
          <ul style="margin:0;padding-left:18px;line-height:1.6;font-size:14px"><li>Layani keluhan pembeli dengan Panduan Layani dan Rujuk.</li><li>Rujuk ke telekonsultasi bila pembeli ingin diperiksa dokter hari ini.</li><li>Periksa ulang kode bila pembeli membawa resep yang lain.</li></ul>
        </div>
        <div class="row" style="flex-wrap:wrap"><button class="btn" data-go="panduan">${I.book}Buka Panduan Layani dan Rujuk</button><button class="btn ghost" data-go="pindai">Pindai ulang</button><button class="btn ghost" data-drop-locked>Batalkan antibiotik</button></div>
      </div>`);
    }
    const paper = v.type === 'kertas';
    return shellApoteker('Hasil verifikasi', 'Gerbang Resep', `<div style="max-width:760px;display:flex;flex-direction:column;gap:14px">
      <div class="verdict ok"><div class="icon">${I.check}</div><div><h3>${paper ? 'Resep kertas terverifikasi' : 'Resep elektronik valid'}</h3><p>${paper ? 'Nomor SIP dokter terdaftar. Transaksi ini akan masuk sampel audit acak.' : 'Resep ditemukan di SATUSEHAT dan belum pernah ditebus.'}</p>
      <span class="timer">${I.clock}Terverifikasi dalam ${paper ? 21 : 9} detik</span></div></div>
      <div class="card"><dl class="kv">
        <dt>Kode resep</dt><dd>${paper ? 'Resep kertas (foto terlampir)' : ERESEP.code}</dd>
        <dt>Dokter</dt><dd>${paper ? 'dr. Andi Saputra, SIP.3573.0288.2024' : ERESEP.doctor + ', ' + ERESEP.sip}</dd>
        <dt>Fasilitas kesehatan</dt><dd>${paper ? 'Praktik dokter mandiri' : ERESEP.faskes}</dd>
        <dt>Pasien</dt><dd>${ERESEP.patient} <span class="pill" style="margin-left:6px">Identitas disamarkan</span></dd>
        <dt>Obat</dt><dd>${ERESEP.drug}, ${ERESEP.qty} kapsul</dd>
        <dt>Aturan pakai</dt><dd>${ERESEP.rule}, selama ${ERESEP.days} hari</dd>
      </dl></div>
      <div class="row" style="flex-wrap:wrap"><button class="btn" data-dispense>${I.check}Serahkan dan catat</button><button class="btn ghost" data-go="kasir">Kembali ke kasir</button></div>
    </div>`);
  };

  V.panduan = () => {
    const c = COMPLAINTS[S.complaint];
    const chips = Object.entries(COMPLAINTS).map(([k, v]) => `<button aria-pressed="${k === S.complaint}" data-complaint="${k}">${I[v.icon]}${v.label}</button>`).join('');
    const otc = c.otc.map(id => `<div class="otc"><span><b>${P[id].name}</b><br><span class="small muted">${P[id].unit}, ${rp(P[id].price)}</span></span><button class="btn ghost" data-add-otc="${id}">Tambah ke keranjang</button></div>`).join('');
    return shellApoteker('Panduan Layani dan Rujuk', 'Untuk pembeli yang meminta antibiotik tanpa resep', `
      <div class="complaints" role="group" aria-label="Keluhan pembeli">${chips}</div>
      <div class="guide">
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card say"><p>"${c.say}"</p><span class="small">Kalimat yang dapat disampaikan kepada pembeli</span></div>
          <div class="card"><h3>Pilihan obat bebas yang sesuai</h3>${otc}</div>
          <div class="card"><h3>Saran perawatan</h3><ul>${c.tips.map(t => `<li>${t}</li>`).join('')}</ul></div>
        </div>
        <div style="display:flex;flex-direction:column;gap:14px">
          <div class="card danger"><h3>Tanda bahaya: rujuk ke dokter bila ada</h3><ul>${c.danger.map(t => `<li>${t}</li>`).join('')}</ul></div>
          <div class="card"><h3>Rujuk</h3><div class="refer">
            <button data-go="tele">${I.video}<span><b>Telekonsultasi dokter</b><span>Rata-rata tersambung 6 menit. Resep elektronik langsung terbaca di kasir.</span></span></button>
            <button data-refer-pkm>${I.building}<span><b>Puskesmas Dinoyo</b><span>1,2 km, buka hingga 14.00. Surat rujukan dikirim ke ponsel pembeli.</span></span></button>
          </div></div>
        </div>
      </div>`);
  };

  V.tele = () => {
    const steps = [
      `<div class="bubble sys">Menghubungkan dengan dokter jaga telekonsultasi...</div>`,
      `<div class="bubble sys">Tersambung dengan dr. Rina Pratiwi, Klinik Pratama Sehat Bersama</div><div class="bubble doc">Selamat siang. Saya sudah membaca catatan dari apoteker: batuk 5 hari, demam 38,5 derajat sejak 3 hari, dahak kental kehijauan. Saya akan menanyakan beberapa hal dulu, ya.</div>`,
    ];
    let html = steps.slice(0, Math.min(S.tele + 1, 2)).join('');
    if (S.tele >= 1 && !S.teleOutcome) html += `<div class="card"><h3>Simulasi keputusan dokter</h3><p class="small muted" style="margin:0 0 10px">Pilih hasil telekonsultasi untuk demo.</p><div class="grid2"><button class="btn" data-tele="rx">Dokter meresepkan antibiotik</button><button class="btn ghost" data-tele="norx">Antibiotik tidak diperlukan</button></div></div>`;
    if (S.teleOutcome === 'rx') html += `<div class="bubble doc">Dari keluhan dan pemeriksaan, saya resepkan amoksisilin 500 mg tiga kali sehari selama 5 hari. Resep elektronik sudah saya kirim, silakan ditebus di apotek.</div><div class="bubble sys">Resep elektronik ${ERESEP.code} terbit di SATUSEHAT</div><button class="btn" data-use-erx>${I.qr}Lanjutkan ke Gerbang Resep</button>`;
    if (S.teleOutcome === 'norx') html += `<div class="bubble doc">Keluhannya mengarah ke infeksi virus, jadi antibiotik belum diperlukan. Istirahat, banyak minum, dan parasetamol bila demam. Kalau dalam 3 hari tidak membaik, periksa langsung ke puskesmas.</div><div class="bubble sys">Catatan konsultasi dikirim ke ponsel pembeli</div><button class="btn" data-go="panduan">Kembali ke Panduan Layani</button>`;
    if (S.tele === 0) setTimeout(() => { if (S.screen === 'tele' && S.tele === 0) { S.tele = 1; render(); } }, 1400);
    return shellApoteker('Rujuk telekonsultasi', 'Pembeli berkonsultasi dari apotek, apoteker mendampingi', `<div class="tele">${html}${S.tele === 0 ? '<div class="bubble doc"><span class="typing"><i></i><i></i><i></i></span></div>' : ''}</div>`);
  };

  V.struk = () => {
    const r = S.receipt;
    if (!r) return shellApoteker('Struk', 'Belum ada transaksi', `<div class="empty">Selesaikan transaksi di kasir untuk melihat struk.<br><br><button class="btn" data-go="kasir">Buka kasir</button></div>`);
    const rows = r.items.map(l => `<div class="rline"><span>${P[l.id].name} × ${l.qty}${l.code ? `<small>Resep ${esc(l.code)}</small>` : ''}</span><span>${rp(P[l.id].price * l.qty)}</span></div>`).join('');
    const hasAb = r.items.some(l => P[l.id].ab);
    return shellApoteker('Transaksi selesai', r.time, `<div class="receipt">
      <h3>Apotek Sehat Sentosa</h3><p class="center small muted" style="margin:4px 0 0">Jl. Sumbersari, Lowokwaru, Kota Malang (simulasi)</p>
      <hr>${rows}<hr>
      <div class="rline"><b>Total</b><b>${rp(r.total)}</b></div>
      <div class="stamps">
        ${hasAb ? `<div class="stamp">${I.shield}Penyerahan antibiotik tercatat di SATUSEHAT</div><div class="stamp">${I.bell}Pengingat Tuntas dikirim ke ponsel pasien</div>` : `<div class="stamp">${I.check}Transaksi tanpa antibiotik</div>`}
      </div>
    </div>
    <div class="row" style="justify-content:center;margin-top:26px;flex-wrap:wrap">
      <button class="btn" data-new>${I.cart}Transaksi baru</button>
      ${hasAb ? `<button class="btn ghost" data-role-go="pasien:pengingat">${I.bell}Lihat di ponsel pasien</button>` : ''}
    </div>`);
  };

  V.ringkasan = () => {
    const s = S.stats;
    const delta = ((s.omzetNon - s.omzetPrev) / s.omzetPrev * 100).toFixed(1).replace('.', ',');
    const abTotal = s.verified + s.held;
    const pct = n => abTotal ? Math.round(n / abTotal * 100) : 0;
    return shellApoteker('Ringkasan hari ini', 'Apotek Sehat Sentosa, 28 September 2026', `
      <div class="kpis">
        <div class="kpi"><span>Transaksi</span><b>${s.trx}</b><span>sejak 07.00</span></div>
        <div class="kpi accent"><span>Antibiotik dengan resep terverifikasi</span><b>${s.verified}</b><span class="delta">${pct(s.verified)}% dari permintaan antibiotik</span></div>
        <div class="kpi"><span>Permintaan ditahan</span><b>${s.held}</b><span>${s.referred} dirujuk ke dokter</span></div>
        <div class="kpi"><span>Omzet obat non-antibiotik</span><b style="font-size:22px">${rp(s.omzetNon)}</b><span class="delta ${delta.startsWith('-') ? 'down' : ''}">${delta.startsWith('-') ? '' : '+'}${delta}% dibanding kemarin</span></div>
      </div>
      <div class="grid2">
        <div class="card"><h3>Permintaan antibiotik hari ini</h3><div class="bars">
          <div class="bar-row"><span>Resep terverifikasi</span><div class="bar-track"><div class="bar-fill" style="width:${pct(s.verified)}%"></div></div><b>${s.verified}</b></div>
          <div class="bar-row"><span>Ditahan, dilayani obat bebas</span><div class="bar-track"><div class="bar-fill amber" style="width:${pct(s.held - s.referred)}%"></div></div><b>${s.held - s.referred}</b></div>
          <div class="bar-row"><span>Ditahan, dirujuk</span><div class="bar-track"><div class="bar-fill blue" style="width:${pct(s.referred)}%"></div></div><b>${s.referred}</b></div>
        </div></div>
        <div class="card"><h3>Status apotek di dasbor dinas</h3>
          <p style="margin:0 0 8px;font-size:14px">Rasio kecocokan resep bulan ini</p>
          <p style="margin:0;font-size:34px;font-weight:800;color:var(--green)">82%</p>
          <p class="small muted" style="margin:6px 0 0">Naik dari 64% pada Juli 2026. Apotek dengan rasio di atas 80% memenuhi syarat label Apotek Bijak Antibiotik.</p>
        </div>
      </div>`);
  };

  // ---------------- Layar pasien ----------------
  function phoneShell(inner, tab) {
    return `<div class="phone-app">
      <div class="statusbar"><span>09.41</span><span>SATUSEHAT Mobile</span></div>
      ${inner}
      <nav class="p-tabs"><button class="${tab === 'home' ? 'active' : ''}">${I.home}Beranda</button><button class="${tab === 'obat' ? 'active' : ''}" data-go="pengingat">${I.pill}Obatku</button><button>${I.user}Profil</button></nav>
    </div>`;
  }
  V.pengingat = () => {
    const taken = S.doses.taken, total = ERESEP.qty, pct = taken / total;
    const day = Math.min(ERESEP.days, Math.floor(taken / 3) + 1);
    const C = 2 * Math.PI * 38;
    const times = ['07.00', '15.00', '23.00'], lbl = ['Pagi, sesudah sarapan', 'Sore, sesudah makan', 'Malam, sesudah makan'];
    const doses = times.map((t, i) => `<div class="dose ${S.doses.today[i] ? 'done' : ''}"><span class="time">${t}</span><span class="desc"><b>1 kapsul</b>${lbl[i]}</span><button aria-label="Tandai dosis ${t} sudah diminum" data-dose="${i}">${I.check}</button></div>`).join('');
    return phoneShell(`<div class="p-head"><small>Pengingat Tuntas</small><h2>Obatku hari ini</h2></div>
      <div class="p-body">
        <div class="med-card">
          <div class="ring"><svg viewBox="0 0 92 92"><circle cx="46" cy="46" r="38" stroke="rgba(255,255,255,.18)" stroke-width="9" fill="none"/><circle cx="46" cy="46" r="38" stroke="#F2B24A" stroke-width="9" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}"/></svg><b><span><em>${taken}</em>dari ${total}</span></b></div>
          <div><h3>${ERESEP.drug}</h3><p>Hari ke-${day} dari ${ERESEP.days}<br>${ERESEP.rule}</p></div>
        </div>
        ${doses}
        <div class="note-amber"><b>Habiskan walaupun sudah merasa sehat.</b> Berhenti di tengah jalan memberi kesempatan bakteri yang tersisa menjadi kebal.</div>
        <div class="card small"><b>Diserahkan oleh</b><br>Apotek Sehat Sentosa, 21 September 2026<br><span class="muted">Resep dari ${ERESEP.doctor}, ${ERESEP.faskes}</span></div>
        <button class="btn ghost block" data-finish>${I.cal}Simulasikan hari terakhir</button>
      </div>`, 'obat');
  };
  V.selesai = () => phoneShell(`<div class="p-head"><small>Pengingat Tuntas</small><h2>Pengobatan selesai</h2></div>
    <div class="p-body">
      <div class="done-hero"><div class="badge">${I.check}</div><h3>15 dari 15 kapsul diminum</h3><p>Terima kasih sudah menuntaskan antibiotik sesuai resep.</p></div>
      <div class="note-amber">Masih ada sisa obat di rumah? Jangan disimpan untuk dipakai lagi atau diberikan ke anggota keluarga lain.</div>
      <h3 style="margin:6px 4px 0">Cara membuang sisa obat</h3>
      <ol class="step-list">
        <li>Keluarkan obat dari kemasannya.</li>
        <li>Hancurkan tablet atau kapsul, lalu campur dengan tanah atau ampas kopi.</li>
        <li>Masukkan ke plastik tertutup, lalu buang ke tempat sampah.</li>
        <li>Rusak atau lepas label kemasan sebelum dibuang.</li>
      </ol>
      <div class="card small"><b>Titik pengumpulan obat terdekat</b><br>Apotek Sehat Sentosa, 0,8 km<br><span class="muted">Sisa obat juga dapat diserahkan langsung ke apotek.</span></div>
    </div>`, 'obat');

  // ---------------- Layar pengawas ----------------
  const ratioClass = r => r < 60 ? 'low' : r < 80 ? 'mid' : 'high';
  const ratioColor = r => r < 60 ? '#D64B3C' : r < 70 ? '#E89A2E' : r < 80 ? '#F2C66D' : '#3E9A7E';
  function spark(tr) {
    const w = 70, h = 24, lo = Math.min(...tr) - 5, hi = Math.max(...tr) + 5;
    const pts = tr.map((v, i) => `${i * (w / (tr.length - 1))},${h - (v - lo) / (hi - lo) * h}`).join(' ');
    const up = tr[tr.length - 1] >= tr[0];
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible"><polyline points="${pts}" fill="none" stroke="${up ? '#1F6F5C' : '#B42318'}" stroke-width="2"/></svg>`;
  }
  function mapSvg() {
    // Peta skematis lima kecamatan Kota Malang (bukan batas administrasi sebenarnya)
    const shapes = {
      lowokwaru: 'M20,20 L150,12 L165,95 L95,120 L25,105 Z',
      blimbing: 'M150,12 L270,30 L262,120 L165,95 Z',
      klojen: 'M95,120 L165,95 L200,150 L140,185 L100,160 Z',
      sukun: 'M25,105 L95,120 L100,160 L140,185 L110,265 L30,240 Z',
      kedungkandang: 'M165,95 L262,120 L285,250 L180,285 L110,265 L140,185 L200,150 Z',
    };
    const lbl = { lowokwaru: [85, 65], blimbing: [212, 70], klojen: [148, 145], sukun: [68, 190], kedungkandang: [210, 215] };
    return `<svg viewBox="0 0 300 300" role="img" aria-label="Peta skematis rasio kecocokan resep per kecamatan">${KEC.map(k => `
      <path class="kec ${S.kec === k.id ? 'sel' : ''}" data-kec="${k.id}" d="${shapes[k.id]}" fill="${ratioColor(k.ratio)}"><title>${k.name}: ${k.ratio}%</title></path>
      <text x="${lbl[k.id][0]}" y="${lbl[k.id][1]}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#16302A" pointer-events="none">${k.name}</text>
      <text x="${lbl[k.id][0]}" y="${lbl[k.id][1] + 16}" text-anchor="middle" font-size="14" font-weight="800" fill="#16302A" pointer-events="none">${k.ratio}%</text>`).join('')}</svg>`;
  }
  V.dasbor = () => {
    const list = APOTEK.filter(a => !S.kec || a.kec === S.kec).sort((a, b) => a.ratio - b.ratio);
    const kn = id => KEC.find(k => k.id === id).name;
    const rows = list.map(a => `<tr class="${a.ratio < 60 ? 'prio' : ''}"><td><button class="linkish" data-apotek="${a.id}">${a.name}</button><span class="small muted">${kn(a.kec)}</span></td><td><span class="ratio ${ratioClass(a.ratio)}">${a.ratio}%</span></td><td>${spark(a.trend)}</td><td>${a.ratio < 60 ? '<span class="pill red"><span class="dot"></span>Prioritas</span>' : a.ratio < 80 ? '<span class="pill amber"><span class="dot"></span>Pantau</span>' : '<span class="pill"><span class="dot"></span>Patuh</span>'}</td></tr>`).join('');
    return shellPengawas('Dasbor pengawasan berbasis risiko', 'Kota Malang, data 1 sampai 27 September 2026 (simulasi)', `
      <div class="kpis">
        <div class="kpi"><span>Apotek terhubung</span><b>128</b><span>dari 128 apotek uji coba</span></div>
        <div class="kpi accent"><span>Antibiotik dengan resep terverifikasi</span><b>74%</b><span class="delta">naik dari 31% pada Juni</span></div>
        <div class="kpi"><span>Permintaan ditahan bulan ini</span><b>1.286</b><span>412 dirujuk ke dokter</span></div>
        <div class="kpi"><span>Apotek prioritas kunjungan</span><b>${APOTEK.filter(a => a.ratio < 60).length}</b><span>rasio kecocokan di bawah 60%</span></div>
      </div>
      <div class="dash">
        <div class="card map-card"><h3>Rasio kecocokan resep per kecamatan</h3>${mapSvg()}
          <div class="legend"><span><i style="background:#D64B3C"></i>&lt; 60%</span><span><i style="background:#E89A2E"></i>60-69%</span><span><i style="background:#F2C66D"></i>70-79%</span><span><i style="background:#3E9A7E"></i>≥ 80%</span></div>
          <p class="small muted" style="margin:8px 0 0">Peta skematis. ${S.kec ? `<button class="btn ghost" style="padding:4px 8px;font-size:12px" data-kec-clear>Tampilkan semua</button>` : 'Klik kecamatan untuk menyaring daftar.'}</p>
        </div>
        <div class="card table-card"><h3 style="margin:0 0 2px">Apotek ${S.kec ? 'di ' + kn(S.kec) : 'dengan rasio terendah'}</h3><p class="small muted" style="margin:0 0 6px">Rasio kecocokan = antibiotik yang keluar dengan resep terverifikasi dibagi antibiotik yang dibeli dari distributor.</p>
          <div class="table-scroll"><table><thead><tr><th>Apotek</th><th>Rasio</th><th>Tren 3 bulan</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div>
          <div class="privacy">${I.shield}Identitas pasien disamarkan. Data ditampilkan per apotek dan per wilayah.</div>
        </div>
      </div>`);
  };
  V.apotek = () => {
    const a = APOTEK.find(x => x.id === S.apotek) || APOTEK[0];
    const kn = KEC.find(k => k.id === a.kec).name;
    const months = ['Juli', 'Agustus', 'September'];
    const bought = [Math.round(a.bought * 1.1), Math.round(a.bought * 1.05), a.bought];
    const rx = bought.map((b, i) => Math.round(b * a.trend[i] / 100));
    const max = Math.max(...bought);
    const cols = months.map((m, i) => `<div class="grp"><div class="col" style="height:${bought[i] / max * 100}%;background:#C9D9D2"><span>${bought[i]}</span></div><div class="col" style="height:${rx[i] / max * 100}%;background:var(--green)"><span>${rx[i]}</span></div></div>`).join('');
    return shellPengawas(a.name, `${kn}, Kota Malang (simulasi)`, `
      <div class="kpis">
        <div class="kpi ${a.ratio < 60 ? '' : 'accent'}"><span>Rasio kecocokan resep</span><b class="${a.ratio < 60 ? 'ratio low' : ''}">${a.ratio}%</b><span>September 2026</span></div>
        <div class="kpi"><span>Antibiotik dibeli dari distributor</span><b>${a.bought}</b><span>unit terkecil, bulan ini</span></div>
        <div class="kpi"><span>Keluar dengan resep terverifikasi</span><b>${a.rx}</b><span>unit terkecil, bulan ini</span></div>
        <div class="kpi"><span>Kunjungan terakhir</span><b style="font-size:20px">${a.visit}</b><span>oleh petugas pengawas</span></div>
      </div>
      <div class="grid2">
        <div class="card"><h3>Dibeli dari distributor dan keluar dengan resep</h3>
          <div class="chart-cols">${cols}</div><div class="chart-labels">${months.map(m => `<div>${m}</div>`).join('')}</div>
          <div class="legend"><span><i style="background:#C9D9D2"></i>Dibeli dari distributor</span><span><i style="background:var(--green)"></i>Keluar dengan resep</span></div>
        </div>
        <div class="card" style="display:flex;flex-direction:column;gap:10px"><h3>Tindak lanjut</h3>
          <p style="margin:0;font-size:14px;line-height:1.55">${a.ratio < 60 ? `Selisih ${a.bought - a.rx} unit antibiotik bulan ini tidak disertai resep terverifikasi. Apotek ini masuk daftar prioritas kunjungan.` : 'Rasio kecocokan berada di atas ambang prioritas. Cukup dipantau melalui dasbor.'}</p>
          <button class="btn" data-schedule>${I.cal}Jadwalkan kunjungan</button>
          <button class="btn ghost" data-go="dasbor">${I.back}Kembali ke dasbor</button>
          <div class="privacy">${I.shield}Data transaksi ditampilkan agregat tanpa identitas pasien.</div>
        </div>
      </div>`);
  };

  // ---------------- Render & event ----------------
  function render() {
    const role = ROLES[S.role];
    const device = $('#device');
    device.className = 'device ' + role.device;
    if (S.role === 'apoteker' && !S.loggedIn) S.screen = 'login';
    app.innerHTML = (V[S.screen] || V[role.start])();
    $('#caption').textContent = CAPTIONS[S.screen] || '';
    renderPanel();
    const lf = $('#loginForm'); if (lf) lf.addEventListener('submit', e => { e.preventDefault(); S.loggedIn = true; go('kasir'); toast('Masuk sebagai apt. Dimas Prasetyo'); });
  }

  function renderPanel() {
    $('#roleSeg').innerHTML = Object.entries(ROLES).map(([k, r]) => `<button role="tab" aria-selected="${k === S.role}" data-role="${k}">${r.label}</button>`).join('');
    $('#jumpList').innerHTML = ROLES[S.role].screens.map(([id, l]) => `<button class="${id === S.screen ? 'active' : ''}" data-jump="${id}">${l}</button>`).join('');
    $('#scenarioList').innerHTML = [
      ['noRx', 'Pembeli minta antibiotik tanpa resep'],
      ['eRx', 'Pembeli membawa resep elektronik'],
      ['heldGuide', 'Penyerahan ditahan, buka panduan'],
      ['patientDone', 'Pasien menuntaskan antibiotik'],
      ['prio', 'Pengawas membuka apotek prioritas'],
    ].map(([id, l]) => `<button data-scenario="${id}">${l}</button>`).join('');
  }

  function addToCart(id) {
    const p = P[id];
    const ex = S.cart.find(l => l.id === id && l.status !== 'ok');
    if (ex) ex.qty += 1; else S.cart.push({ id, qty: 1, status: p.ab ? 'locked' : null });
  }

  function scenario(id) {
    S = Object.assign(fresh(), { stats: S.stats, doses: S.doses });
    if (id === 'noRx') { S.loggedIn = true; S.cart = [{ id: 'amox', qty: 1, status: 'locked' }, { id: 'para', qty: 1, status: null }]; go('kasir', 'apoteker'); }
    if (id === 'eRx') { S.loggedIn = true; S.cart = [{ id: 'amox', qty: 2, status: 'locked' }]; S.pendingCode = ERESEP.code; go('pindai', 'apoteker'); }
    if (id === 'heldGuide') { S.loggedIn = true; S.cart = [{ id: 'amox', qty: 1, status: 'locked' }]; S.verify = { type: 'invalid', reason: 'Pembeli tidak membawa resep.' }; go('verifikasi', 'apoteker'); }
    if (id === 'patientDone') { S.doses = { taken: 15, today: [true, true, true] }; go('selesai', 'pasien'); }
    if (id === 'prio') { S.apotek = 'a1'; go('apotek', 'pengawas'); }
    closePanel();
  }

  function dispense() {
    S.cart.forEach(l => { if (l.status === 'locked') { l.status = 'ok'; l.code = S.verify && S.verify.type === 'kertas' ? 'kertas' : ERESEP.code; } });
    S.stats.verified += 1;
    toast('Antibiotik diserahkan dan tercatat di SATUSEHAT');
    go('kasir');
  }

  function pay() {
    const items = S.cart.filter(l => l.status !== 'locked');
    if (!items.length) return;
    const total = items.reduce((s, l) => s + P[l.id].price * l.qty, 0);
    const nonAb = items.filter(l => !P[l.id].ab).reduce((s, l) => s + P[l.id].price * l.qty, 0);
    S.stats.trx += 1; S.stats.omzetNon += nonAb;
    const locked = S.cart.filter(l => l.status === 'locked');
    if (locked.length) S.stats.held += 1;
    const now = new Date();
    S.receipt = { items: items.map(l => ({ ...l })), total, time: `28 September 2026, ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}` };
    S.cart = []; S.verify = null;
    if (items.some(l => P[l.id].ab)) S.doses = { taken: 0, today: [false, false, false] };
    go('struk');
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('button'); if (!t) return;
    const d = t.dataset;
    if (d.role) { S.role = d.role; S.screen = ROLES[d.role].start; if (d.role === 'apoteker' && S.loggedIn) S.screen = 'kasir'; render(); return; }
    if (d.jump) { go(d.jump); closePanel(); return; }
    if (d.scenario) { scenario(d.scenario); return; }
    if (d.go) { if (d.go === 'tele') { S.tele = 0; S.teleOutcome = null; } go(d.go); return; }
    if (d.roleGo) { const [r, s] = d.roleGo.split(':'); go(s, r); return; }
    if (d.add) { addToCart(d.add); render(); if (P[d.add].ab) toast('Antibiotik terdeteksi, penyerahan dikunci sampai resep terverifikasi'); return; }
    if (d.rm !== undefined) { S.cart.splice(+d.rm, 1); render(); return; }
    if (d.pay !== undefined) { pay(); return; }
    if ('verifyCode' in d) {
      const v = ($('#code') || {}).value || '';
      S.pendingCode = v.trim();
      S.verify = v.trim().toUpperCase() === ERESEP.code ? { type: 'valid' } : { type: 'invalid', reason: v.trim() ? `Kode ${v.trim()} tidak ditemukan di SATUSEHAT.` : 'Kode resep belum diisi.' };
      if (S.verify.type === 'invalid') S.stats.held += 0;
      go('verifikasi'); return;
    }
    if (d.sim) { S.verify = d.sim === 'valid' ? { type: 'valid' } : { type: 'invalid', reason: 'Kode ER-3573-260911-0020 sudah pernah ditebus di apotek lain.' }; go('verifikasi'); return; }
    if ('verifyPaper' in d) {
      const sip = (($('#sip') || {}).value || '').trim();
      S.verify = /^SIP\.\d{4}\.\d{4}\.\d{4}$/.test(sip) ? { type: 'kertas' } : { type: 'invalid', reason: `Nomor izin praktik ${sip || '(kosong)'} tidak terdaftar.` };
      go('verifikasi'); return;
    }
    if ('dispense' in d) { dispense(); return; }
    if ('dropLocked' in d) { S.cart = S.cart.filter(l => l.status !== 'locked'); S.stats.held += 1; toast('Antibiotik dibatalkan dari keranjang'); go('kasir'); return; }
    if (d.complaint) { S.complaint = d.complaint; render(); return; }
    if (d.addOtc) { addToCart(d.addOtc); toast(`${P[d.addOtc].name} ditambahkan ke keranjang`); return; }
    if ('referPkm' in d) { S.stats.referred += 1; toast('Surat rujukan ke Puskesmas Dinoyo dikirim ke ponsel pembeli'); return; }
    if (d.tele) { S.teleOutcome = d.tele; S.stats.referred += 1; render(); return; }
    if ('useErx' in d) { S.pendingCode = ERESEP.code; if (!S.cart.some(l => l.status === 'locked')) S.cart.push({ id: 'amox', qty: 2, status: 'locked' }); go('pindai'); return; }
    if ('new' in d) { S.receipt = null; S.cart = []; go('kasir'); return; }
    if (d.dose !== undefined) { const i = +d.dose; S.doses.today[i] = !S.doses.today[i]; S.doses.taken = Math.max(0, Math.min(15, S.doses.taken + (S.doses.today[i] ? 1 : -1))); render(); if (S.doses.today[i]) toast('Dosis tercatat. Lanjutkan sampai habis.'); return; }
    if ('finish' in d) { S.doses = { taken: 15, today: [true, true, true] }; go('selesai'); return; }
    if (d.kec) { S.kec = S.kec === d.kec ? null : d.kec; render(); return; }
    if ('kecClear' in d) { S.kec = null; render(); return; }
    if (d.apotek) { S.apotek = d.apotek; go('apotek'); return; }
    if ('schedule' in d) { toast('Kunjungan pengawasan dijadwalkan pada 5 Oktober 2026'); return; }
  });
  // klik pada path SVG peta
  document.addEventListener('click', e => {
    const k = e.target.closest('path[data-kec]'); if (!k) return;
    S.kec = S.kec === k.dataset.kec ? null : k.dataset.kec; render();
  });

  const panel = $('#demoPanel'), toggle = $('#demoToggle');
  function closePanel() { panel.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  toggle.addEventListener('click', () => { const o = panel.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(o)); });
  $('#resetBtn').addEventListener('click', () => { S = fresh(); render(); closePanel(); toast('Simulasi dimulai ulang'); });

  render();
})();
