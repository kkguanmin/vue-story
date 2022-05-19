<template>
    <div>
        <div
            :class="{ 'timer': true, 'active':(isIndex && !isLoading) }"
            :style="{ transition: (isIndex && !isLoading)? this.story.duration + 'ms linear' : '' }"></div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ProgressItem',
    props: {
        index: {
            type: Number,
        },
        idx: {
            type: Number,
        },
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['story', 'isLoading']),
        isIndex() {
            return this.index === this.idx
        }
    },
    created() {
    },
    methods: {
    },
}
</script>

<style lang="scss">
.timer {
    position: absolute;
    z-index: 1;
    width: 0%;
    background: white;
    height: 2px;
}
.timer.active {
    width: 100%;
}
</style>