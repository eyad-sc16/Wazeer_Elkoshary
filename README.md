# وزير الكشري — وزارة الطعم الشعبي

موقع مطعم لعرض المنيو وأفضل الأطباق مع إمكانية الطلب عبر واتساب. مبني بـ HTML و CSS و JavaScript خالص (بدون أي مكتبات خارجية).

## المميزات

- تصميم متجاوب بالكامل (موبايل / تابلت / ديسكتوب) بأسلوب Mobile-first.
- قائمة تنقل للموبايل مع قفل تمرير الصفحة.
- سكرول ناعم مع تعويض ارتفاع الهيدر الثابت.
- تفعيل لينك القسم الحالي أثناء التمرير (Scroll Spy).
- ظهور تدريجي للعناصر أثناء السكرول (Scroll Reveal).
- شريط تقدم السكرول وزر العودة إلى أعلى.
- احترام إعداد `prefers-reduced-motion` لمستخدمي الحركة المخفّضة.
- كود JavaScript مبني على Classes (OOP) ومنظّم في مكوّنات مستقلة.

## هيكل المشروع

```
.
├── index.html            # الصفحة الرئيسية
├── developer-page.html   # صفحة المطور
├── Css/
│   ├── base.css          # المتغيرات، إعادة الضبط، الأزرار، الأدوات المشتركة
│   ├── header.css        # الهيدر والتنقل
│   ├── sections.css      # الهيرو، الأطباق، المنيو، الطلب
│   ├── footer.css        # الفوتر
│   └── developer-page.css
├── Js/
│   └── main.js           # منطق السكرول والتفاعلات
├── Images/               # صور الأطباق والشعار
└── icons/                # الأيقونات
```

## التقنيات

- HTML5 دلالي (Semantic) مع `dir="rtl"` و `lang="ar"`.
- CSS3: Custom Properties، Flexbox، Grid، `clamp()`.
- JavaScript ES6+: Classes، IntersectionObserver، requestAnimationFrame.

## التشغيل محلياً

الموقع ثابت بالكامل، فقط افتح `index.html` في المتصفح. ويفضّل تشغيل سيرفر محلي:

```bash
python -m http.server 5500
```

ثم افتح `http://localhost:5500`.

## المطور

**Eyad Nasser** — Software Developer
صفحة المطور داخل الموقع: `developer-page.html`

## الترخيص

&copy; 2025 وزير الكشري — جميع الحقوق محفوظة.
