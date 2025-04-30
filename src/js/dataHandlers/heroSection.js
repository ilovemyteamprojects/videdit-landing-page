export default function heroSectionData() {
    return {
        show: false,
        isPaused: false,

        init() {
            // Show header after any interaction
            ['click', 'mousemove', 'scroll', 'keydown', 'touchstart'].forEach(eventName => {
                window.addEventListener(eventName, () => {
                    this.show = true;
                    this.$nextTick(() => {
                        this.$refs.headerVideo.addEventListener('play', () => this.isPaused = false);
                        this.$refs.headerVideo.addEventListener('pause', () => this.isPaused = true);
                    });
                }, { passive: true, once: true });
            });
        },

        pauseVideo(e) {
            // click event, triggered if click is NOT on interactable element (marked with "data-interactive" attr)
            if (!e.target.hasAttribute("data-interactive") && this.$refs.heroSection.contains(e.currentTarget)) {
                const vid = this.$refs.headerVideo;
                vid.paused ? vid.play() : vid.pause();
            }
        }
    }
}