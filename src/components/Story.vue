<template>
    <div class="story">
        <img
            v-if="story? story.imageUrl?true:false:false"
            :src="story ? story.imageUrl : '' "
            alt="story.image"
            class="story-img">
        <img
            v-if="story? story.imageUrl?true:false:false"
            :src="story ? story.imageUrl : '' "
            alt="story.bg"
            class="story-bg">
        <div
            v-if="story? story.imageUrl?true:false:false"
            class="story-content">
            <h2 class="story-text">{{story?story.text: ''}}</h2>
        </div>
        <button
            class="story-prev"
            @click="prevSlide"></button>
        <button
            class="story-next"
            @click="nextSlide"></button>
    </div>
</template>

<script>
import storyAPI from '../utils/api'
import {eventBus} from '../utils/bus'

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
            slide: '',
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
    updated() {
        clearTimeout(this.slide)
        this.autoSlide()
        eventBus.$emit('duration', this.story.duration)
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
        prevSlide() {
            if(this.index === 0) {
                return
            }
            this.$emit('prev')
        },
        nextSlide() {
            this.$emit('next')
        },
        autoSlide() {
            this.slide = setTimeout(() => {
                this.nextSlide()
            }, this.story.duration)
        }
    }
}
</script>

<style lang="scss">
.story {
    width: 100%;
    height: 100%;
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
        padding: 2rem;
    }
    button {
        position: fixed;
        width: 50%;
        top: 0;
        border: none;
        background: transparent;
        height: 100%;
        padding: 0;
        z-index: 1;
    }
    &-prev {
        left: 0;
    }
    &-next {
        right: 0;
    }
}

@media screen and (min-width: 576px){
    .story {
        &-img {
            border-radius: 2rem;
        }
        &-content {
            border-radius: 2rem;
        }
    }
}
</style>