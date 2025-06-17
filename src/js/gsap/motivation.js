import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger)

if (window.innerWidth > 1279) {
    window.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector("#carousel");
        const cards = carousel.querySelectorAll(".carousel-card")
        const cardWidth = cards[1].offsetWidth
        const section = document.querySelector("#motivationSection")
        const margin = window.innerHeight - section.offsetHeight / 2

        gsap.to(carousel, {
            scrollTrigger: {
                markers: true,
                trigger: section,
                start: "top" + margin,
                scrub: 2,
                pin: section,

            },
            ease: "power4",
            x: -(carousel.offsetWidth - cardWidth)
        });

        ;
    })

}