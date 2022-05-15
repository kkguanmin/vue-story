<template>
    <div class="story">
        <img
            :src="story ? story.imageUrl : '' "
            alt="story.image"
            class="story-img">
        <img
            :src="story ? story.imageUrl : '' "
            alt="story.bg"
            class="story-bg">
        <div class="story-content">
            <h2 class="story-text">{{story.text}}</h2>
        </div>
    </div>
</template>

<script>
import storyAPI from '../utils/api'

export default {
    name: 'Story',
    props: {
        stories: {
            type: Array,
            required: true,
        },
        storyId: {
            type: String,
            required: true,
        },
        index: {
            type: Number,
            default: 0,
        }
    },
    data() {
        return {
            storyData: [],
        }
    },
    computed: {
        story() {
            return this.storyData[this.index]
        }
    },
    created() {
        this.fetchStory()
    },
    methods: {
        async fetchStory() {
            try {
                const { data, statusText} = await storyAPI.getStory(this.storyId)
                if(statusText !== 'OK') {
                    throw new Error
                }
                this.storyData = data
            } catch (error) {
                console.log(error)
            }
        },
    }
}
</script>

<style lang="scss">
.story {
    width: 100%;
    height: 100%;
    border-radius: 2rem;
    position: relative;
    display: flex;
    align-items: end;
    &-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 2rem;
        z-index: 1;
    }
    &-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: -1;
        filter: blur(200px);
    }
    &-content {
        position: relative;
        z-index: 2;
        color: white;
        width: 100%;
        text-align: center;
        background: linear-gradient(to bottom, transparent 0%, black 100%);
        border-radius: 2rem;
        padding: 2rem;
    }
}
</style>