// textPosition.js
export default function heroTitle() {
    return {
        isTitleTriggered: false,
        currentBreakpoint: 'mob',
        calculatedTop: 0,

        updateBreakpoint() {
            const width = window.innerWidth;
            if (width >= 1920) this.currentBreakpoint = 'desk';
            else if (width >= 1280) this.currentBreakpoint = 'pc';
            else if (width >= 768) this.currentBreakpoint = 'tab';
            else this.currentBreakpoint = 'mob';
        },

        init() {
            this.updateBreakpoint();
            window.addEventListener('resize', () => {
                this.updateBreakpoint()
                this.calcHeroCardOffset()
            });
        },

        get styles() {
            const isTriggered = this.isTitleTriggered;
            const bp = this.currentBreakpoint;

            const fontSizes = {
                mob: '7vw',
                tab: '3rem',
                pc: '4rem',
                desk: '5rem',
            };

            const tops = {
                mob: isTriggered ? `${this.calculatedTop}px` : "18px",
                tab: isTriggered ? `${this.calculatedTop}px` : "60px",
                pc: isTriggered ? `${this.calculatedTop}px` : "44px",
                desk: isTriggered ? `${this.calculatedTop}px` : "1rem",
            };

            const lefts = {
                mob: '50%',
                tab: isTriggered ? '1.5rem' : '50%',
                pc: isTriggered ? '2.5rem' : '50%',
                desk: isTriggered ? '4rem' : '50%',
            };

            return {
                top: tops[bp],
                left: lefts[bp],
                transform: bp === "mob" || !isTriggered ? 'translateX(-50%)' : "",
                fontSize: fontSizes[bp],
                textWrap: "nowrap"
            };
        },

        calcHeroCardOffset() {
            const hero = this.$refs.heroContainer;
            const title = this.$refs.title;
            this.calculatedTop = hero.offsetTop - title.offsetHeight
        },
    };
}
