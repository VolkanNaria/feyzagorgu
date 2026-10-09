# feyzagorgu
feyzagorgu.com.tr kişisel site (GitHub → Vercel, `cleanUrls: true`, `trailingSlash: false`)

## Diller
- Türkçe (varsayılan): `/`, `/blog`, `/blog/<yazı>`, `/sss/...`, `/hizmetler/...`
- İngilizce (birebir çeviri): `/en`, `/en/blog`, `/en/blog/<post>`, `/en/faq/...`, `/en/services/...`

| Türkçe | İngilizce |
|---|---|
| `/` | `/en` |
| `/blog` | `/en/blog` |
| `/blog/assessment-development-center-nedir` | `/en/blog/what-is-an-assessment-development-center` |
| `/blog/turquality-ik-danismanligi` | `/en/blog/turquality-hr-consulting` |
| `/sss/kultur-donusumu` | `/en/faq/culture-transformation` |
| `/sss/turquality` | `/en/faq/turquality` |
| `/hizmetler/assessment-center-koclugu` | `/en/services/assessment-center-coaching` |
| `/hizmetler/turquality-danismanligi` | `/en/services/turquality-consulting` |

**Bir sayfada değişiklik yapınca karşılığını da güncelle.** Yeni sayfa eklerken:
1. TR ve EN dosyasının `<head>` içine karşılıklı `hreflang` (`tr`, `en`, `x-default`=TR) ve kendine işaret eden `canonical` ekle.
2. `sitemap.xml`'e iki adresi `xhtml:link` alternates ile ekle, `llms.txt`'e ekle.
3. Header'daki TR | EN seçici `hreflang` etiketinden otomatik beslenir (`assets/site.js`). SSS sayfalarında header sayfanın içindedir, seçiciyi orada elle ekle.

## Ortak parçalar
- `partials/header.html`, `partials/footer.html` (TR) ve `partials/header.en.html`, `partials/footer.en.html` (EN); `assets/site.js` sayfanın `<html lang>` değerine göre seçer.
- `assets/style.css` ortak stil. SSS sayfalarının kendi satır içi stili vardır.
