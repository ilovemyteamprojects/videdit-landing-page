import AlpineI18n from 'alpinejs-i18n';
import Alpine from 'alpinejs';
import { messages } from './messages';
import heroTitleHandler from "./dataHandlers/heroTitle"
import heroSectionHandler from './dataHandlers/heroSection';

let locale = localStorage.getItem("locale") || 'ua';

document.addEventListener('alpine-i18n:ready', function () {
    window.AlpineI18n.create(locale, messages);
});

Alpine.plugin(AlpineI18n);

document.addEventListener("alpine-i18n:locale-change", function () {
    localStorage.setItem("locale", window.AlpineI18n.locale);
});

Alpine.data('heroSectionData', heroSectionHandler);
Alpine.data("heroTitle", heroTitleHandler)

Alpine.start();
