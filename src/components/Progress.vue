<template>
    <div class="progress">
        <ProgressItem
            class="progress-item"
            v-for="(story, idx) in stories"
            :key="idx"
            :style="{ width: Math.floor(100/stories.length) + '%', background: index>idx? 'white': '' }"
            :index="index"
            :idx="Number(idx)" />
    </div>
</template>

<script>
import ProgressItem from './ProgressItem.vue'
export default {
    name: 'Progress',
    components: {
        ProgressItem
    },
    props: {
        stories: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            default: 0,
        }
    }
}
</script>

<style lang="scss">
.progress {
    position: absolute;
    top: 0.5rem;
    left: 0;
    width: calc(100% - 2rem);
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    z-index: 2;
    &-item {
        background: rgba(255, 255, 255, 0.5);
        height: 2px;
        position: relative;
        z-index: 1;
    }
}
</style>