// textPosition.js
export default function heroTitle() {
    return {
        isTitleTriggered: false,
        isTitleShown: true,
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
                mob: '32px',
                tab: isTriggered ? '3rem' : '4rem',
                pc: isTriggered ? '4rem' : '8rem',
                desk: isTriggered ? '5rem' : '10rem',
            };

            const tops = {
                mob: isTriggered ? `${this.calculatedTop}px` : "18px",
                tab: isTriggered ? `${this.calculatedTop + 10}px` : "60px",
                pc: isTriggered ? `${this.calculatedTop + 70}px` : "44px",
                desk: isTriggered ? `${this.calculatedTop + 80}px` : "1rem",
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
                textWrap: "nowrap",
                transition: isTriggered ? 'all .5s ease-in' : ''
            };
        },

        calcHeroCardOffset() {
            const hero = this.$refs.heroContainer;
            const title = this.$refs.title;
            this.calculatedTop = hero.offsetTop - title.offsetHeight
        },
    };
}
