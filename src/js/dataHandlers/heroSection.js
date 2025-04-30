export default function heroSectionData() {
    return {
        show: false,
        isPaused: false,

        init() {
            if (window.scrollY === 0) document.body.style.overflow = "hidden"

            window.addEventListener('keydown', () => {
                this.show = true;
                document.body.style.overflow = ""
            })

            window.addEventListener('wheel', () => {
                this.show = true;

                setTimeout(() => {
                    document.body.style.overflow = ""
                }, 500);
            }, { passive: true, once: true });

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
        }
    }
}