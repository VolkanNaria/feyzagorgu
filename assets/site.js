// ── PAYLAŞILAN HEADER / FOOTER YÜKLEYİCİ ──
// Her sayfada <div id="site-header"></div> ve <div id="site-footer"></div>
// koy, bu script otomatik doldurur. Nav veya footer'da değişiklik
// yapmak için sadece /partials/header.html veya /partials/footer.html
// dosyasını güncellemek yeterli — tüm sayfalara otomatik yansır.
(function () {
  function loadPartial(elId, url) {
    var el = document.getElementById(elId);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) { el.innerHTML = html; })
      .catch(function (err) { console.error('Partial yüklenemedi:', url, err); });
  }
  document.addEventListener('DOMContentLoaded', function () {
    loadPartial('site-header', '/partials/header.html');
    loadPartial('site-footer', '/partials/footer.html');
  });
})();

// ── GOOGLE ANALYTICS — kullanıcı etkileşimiyle yükle ──
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

var ga4Loaded = false;
function loadGA4() {
  if (ga4Loaded) return;
  ga4Loaded = true;
  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=G-VFETVK3RXC';
  s.async = true;
  document.head.appendChild(s);
  s.onload = function () {
    gtag('js', new Date());
    gtag('config', 'G-VFETVK3RXC');
  };
}
window.addEventListener('scroll', loadGA4, { once: true });
window.addEventListener('mousemove', loadGA4, { once: true });
window.addEventListener('touchstart', loadGA4, { once: true });
setTimeout(loadGA4, 5000);

// ── GA4 EVENT TRACKING (ortak) ──
document.addEventListener('DOMContentLoaded', function () {
  // Görüşme Talep Et
  document.querySelectorAll('a[href="#iletisim"].btn-primary, a[href="/#iletisim"].btn-primary').forEach(function (el) {
    el.addEventListener('click', function () {
      gtag('event', 'gorusme_talep_et', { event_category: 'donusum', event_label: 'buton', value: 1 });
    });
  });

  // Hizmetleri İncele
  document.querySelectorAll('a[href="#hizmetler"].btn-outline, a[href="/#hizmetler"].btn-outline').forEach(function (el) {
    el.addEventListener('click', function () {
      gtag('event', 'hizmetleri_incele', { event_category: 'navigasyon', event_label: 'buton', value: 1 });
    });
  });

  // Telefon tıklama
  document.querySelectorAll('a[href^="tel"]').forEach(function (el) {
    el.addEventListener('click', function () {
      gtag('event', 'telefon_click', { event_category: 'iletisim', event_label: el.href, value: 1 });
    });
  });

  // Email tıklama
  document.querySelectorAll('a[href^="mailto"]').forEach(function (el) {
    el.addEventListener('click', function () {
      gtag('event', 'email_click', { event_category: 'iletisim', event_label: el.href, value: 1 });
    });
  });

  // LinkedIn tıklama
  document.querySelectorAll('a[href*="linkedin"]').forEach(function (el) {
    el.addEventListener('click', function () {
      gtag('event', 'linkedin_click', { event_category: 'sosyal_medya', event_label: 'linkedin_profil', value: 1 });
    });
  });

  // Narina tıklama
  document.querySelectorAll('a[href*="narina.com.tr"]').forEach(function (el) {
    el.addEventListener('click', function () {
      gtag('event', 'narina_click', { event_category: 'dis_link', event_label: 'narina_akademi', value: 1 });
    });
  });

  // FAQ accordion (SSS bölümü olan sayfalarda)
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', !isOpen);

      var soru = btn.textContent.trim().substring(0, 50);
      gtag('event', 'sss_acildi', { event_category: 'icerik', event_label: soru, value: 1 });
    });
  });

  // Scroll derinliği
  var scrollMarks = { 25: false, 50: false, 75: false, 100: false };
  window.addEventListener('scroll', function () {
    var scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    [25, 50, 75, 100].forEach(function (mark) {
      if (scrollPct >= mark && !scrollMarks[mark]) {
        scrollMarks[mark] = true;
        gtag('event', 'scroll_derinligi', { event_category: 'icerik', event_label: mark + '%', value: mark });
      }
    });
  });
});
