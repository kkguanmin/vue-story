<template>
    <div>
        <div
            :class="{ 'timer': true, 'active':isIndex }"
            :style="{ transition: isIndex? this.duration + 'ms linear' : '' }"></div>
    </div>
</template>

<script>
import {eventBus} from '../utils/bus'

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
            duration: 0
        }
    },
    computed: {
        isIndex() {
            return this.index === this.idx
        }
    },
    created() {
        this.getTimer()
    },
    methods: {
        getTimer() {
            eventBus.$on('duration', (payload) => {
                this.duration = payload
            })
        }
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