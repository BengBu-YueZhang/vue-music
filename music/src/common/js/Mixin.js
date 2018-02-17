import { mapState } from 'vuex'

const mixin = {
    computed: {
        ...mapState('play', [
            'fullScreen',
            'playlist'
        ])
    },

    mounted () {
        this.handleFullScreenChange()
    },

    activated () {
        this.handleFullScreenChange()
    },

    watch: {
        fullScreen (val, oldVal) {
            this.handleFullScreenChange()
        }
    },

    methods: {
        handleFullScreenChange () {

        }
    }
}

export default mixin