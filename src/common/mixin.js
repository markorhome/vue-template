export default {
    data() {
        return {
            scrollTop: 0
        }
    },
    mounted() {
    },
    methods: {
        getScrollTop() {       
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop      
        },
        setScrollTop(val) {

            setTimeout(() => {
                document.documentElement.scrollTop = val || this.scrollTop
                document.body.scrollTop = val || this.scrollTop
            }, 30)
        },
        cancelScroll() {
            document.body.style.overflow = "hidden"
        },
        addScroll() {
            document.body.style.overflow = "auto"
        },
        setColor(ratio){    
            return {
                color: ratio >= 0? '#FF0000' : ratio < 0 ? '#00A622' : '#333'
            }
        },
        unit(value) {
            if(!value) {return ''}
           return (value / 100000000).toFixed(1)
        }
    }
}