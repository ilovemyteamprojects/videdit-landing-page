import AlpineI18n from 'alpinejs-i18n';
import component from 'alpinejs-component'
import { focus } from '@alpinejs/focus';
import Alpine from 'alpinejs';
import { messages } from './messages';
import heroTitleHandler from "./dataHandlers/heroTitle"
import heroSectionHandler from './dataHandlers/heroSection';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

// Alpine.js
let locale = localStorage.getItem("locale") || 'ua';

document.addEventListener('alpine-i18n:ready', function () {
    window.AlpineI18n.create(locale, messages);
});

Alpine.plugin(AlpineI18n);
Alpine.plugin(component);
Alpine.plugin(focus);

document.addEventListener('alpine:init', () => {
    Alpine.store('modal', {
        isContactModalOpen: false,
        openContactModal() {
            this.isContactModalOpen = true;
        },
        closeContactModal() {
            this.isContactModalOpen = false;
        },
        toggleContactModal() {
            this.isContactModalOpen = !this.isContactModalOpen;
        }
    });

    Alpine.store('title', {
        isTitleShown: true
    });
});


document.addEventListener("alpine-i18n:locale-change", function () {
    localStorage.setItem("locale", window.AlpineI18n.locale);
});

Alpine.data('heroSectionData', heroSectionHandler);
Alpine.data("heroTitle", heroTitleHandler)

Alpine.start();

// GSAP
gsap.registerPlugin(SplitText);

let splitInstances = new Map(); // store references for cleanup

function setupBarrelAnimation() {
    document.querySelectorAll('.barrel-animation').forEach((el) => {

        if (splitInstances.has(el)) {
            splitInstances.get(el).revert();
            splitInstances.delete(el);
        }

        el.style.overflow = "hidden";

        setTimeout(() => {
            const split = new SplitText(el, { type: 'chars' });
            splitInstances.set(el, split);
            const chars = split.chars;

            const animate = () => {
                chars.forEach((char, i) => {
                    const tl = gsap.timeline();
                    tl.to(char, {
                        yPercent: -100,
                        duration: 0.3,
                        opacity: 0,
                        delay: i * 0.05,
                        ease: "power1.in",
                    })
                        .set(char, { yPercent: 100 })
                        .to(char, {
                            yPercent: 0,
                            opacity: 1,
                            duration: 0.3,
                            ease: "power1.out",
                        });
                });
            };

            el.addEventListener("mouseenter", animate);
            el.addEventListener("focus", animate);
        }, 10);
    });
}

// wait for fonts
document.fonts.ready.then(() => {
    setupBarrelAnimation();
});

// Re-run on locale change
document.addEventListener("alpine-i18n:locale-change", () => {
    setupBarrelAnimation();
});
