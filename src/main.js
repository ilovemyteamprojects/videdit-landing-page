import AlpineI18n from 'alpinejs-i18n';
import Alpine from 'alpinejs';

let locale = localStorage.getItem("locale") || 'ua';

let messages = {
    ua: { cardSection: { head: "привіт", header: "Перепрошуємо", par_one: "ця сторінка ще в розробці", par_two: "приходьте потім" } },
    en: { cardSection: { head: "hello", header: "Sorry", par_one: "this page is under construction yet", par_two: "please visit us later" } },
};

document.addEventListener('alpine-i18n:ready', function () {
    window.AlpineI18n.create(locale, messages);
});

Alpine.plugin(AlpineI18n);

document.addEventListener("alpine-i18n:locale-change", function () {
    localStorage.setItem("locale", window.AlpineI18n.locale)
})

Alpine.start();
