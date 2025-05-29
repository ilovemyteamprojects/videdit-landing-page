import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer);
gsap.registerPlugin(ScrollTrigger)

window.addEventListener('DOMContentLoaded', () => {
    const dummyWidth = document.getElementById('dummy').offsetWidth
    const carousel = document.querySelector("#carousel");
    const cards = carousel.querySelectorAll(".carousel-card")
    const cardWidth = cards[1].offsetWidth

    if (!carousel) {
        console.warn("Carousel element not found");
    }

    // Track scroll position
    const progress = { value: 0 };

    // Set initial cursor
    carousel.style.cursor = "ew-resize";


    // Animate carousel on scroll or drag
    Observer.create({
        target: '#carousel',
        type: "wheel,pointer,touch",
        preventDefault: true,

        onChange: (self) => {
            const delta =
                self.event.type === "wheel" ? self.deltaY * 2 : -(self.deltaX * 5);
            const leftLimit = Math.min(progress.value + delta, (carousel.offsetWidth - cardWidth))
            const rightLimit = -(window.innerWidth - (dummyWidth + cardWidth))

            gsap.killTweensOf(progress);

            gsap.to(progress, {
                duration: .5,
                ease: "power4.out",
                value: Math.max(leftLimit, rightLimit),
                onUpdate: () => {
                    gsap.set(carousel, { x: -progress.value });
                },
            });
        },
    });

})
