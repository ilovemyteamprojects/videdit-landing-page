export default function faqSectionData() {
    return {
        activeItem: null,
        width: null,

        init() {
            const updateWidth = () => {
                if (this.$refs.cell) {
                    this.width = `${(this.$refs.cell.offsetWidth * 2) + 8}px`;
                }
            };

            this.resizeObserver = new ResizeObserver(updateWidth);
            this.resizeObserver.observe(this.$refs.cell);

            this.$watch('activeItem', value => {
                if (!value && this.resizeObserver) {
                    this.resizeObserver.disconnect();
                }
            });

            updateWidth();
        },

        activate(id) {
            this.activeItem = (this.activeItem === id ? null : id);

            const width = (this.$refs.cell.offsetWidth * 2) + 9
            this.width = width + 'px'
        }
    }
}