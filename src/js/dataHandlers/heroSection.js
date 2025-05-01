export default function heroSectionData() {
    return {
        show: false,
        isPaused: false,

        init() {
            if (window.scrollY === 0) document.body.style.overflow = "hidden"

            const events = ['wheel', 'keydown', 'touchstart']

            events.forEach(eventName => {

                window.addEventListener(eventName, this.trigger.bind(this), { passive: true, once: true });
            });

            this.$nextTick(() => {
                this.$refs.headerVideo.addEventListener('play', () => this.isPaused = false);
                this.$refs.headerVideo.addEventListener('pause', () => this.isPaused = true);
            });


        },

        pauseVideo(e) {
            // click event, triggered if click is NOT on interactable element (marked with "data-interactive" attr)
            if (!e.target.hasAttribute("data-interactive") && this.$refs.heroSection.contains(e.currentTarget)) {
                const vid = this.$refs.headerVideo;
                vid.paused ? vid.play() : vid.pause();
            }
        },

        trigger(e) {
            console.log(e.type, this.show)
            this.show = true;
            console.log(this.show)
            if (e.type === 'wheel' || e.type === 'touchstart') {
                setTimeout(() => {
                    document.body.style.overflow = ""
                }, 500); //animation length
            } else {
                document.body.style.overflow = ""
            }
        }
    }
}