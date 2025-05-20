export default function faqSectionData() {
    return {
        activeItem: null,
        headerTitle: '',
        headerText: '',

        activate(id) {
            const q = `faqSection.q${id}`
            const { question, answer } = window.AlpineI18n.t(q);
            this.headerTitle = question;
            this.headerText = answer;
            this.activeItem = (this.activeItem === id ? null : id);
            this.$nextTick(() => { this.$refs.closeFaqButton.focus() })
        }

    }
}