<template>
    <div class="story">
        <img
            v-if="this.index > 0 && isLoading"
            src="../assets/loading.gif"
            class="story-img loading">
        <img
            v-else
            :src="story ? story.imageUrl : '' "
            class="story-img">
        <img
            :src="story ? story.imageUrl : '' "
            alt="story.bg"
            class="story-bg">
        <div
            v-if="!isLoading"
            class="story-content">
            <h2 class="story-text">{{story ? story.text: ''}}</h2>
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
import { mapState, mapActions } from 'vuex'

export default {
    name: 'Story',
    data() {
        return {
            slide: '',
        }
    },
    computed: {
        ...mapState(['stories', 'story', 'index', 'isLoading']),
        storyId() {
            return this.stories[this.index]
        },
    },
    watch: {
        storyId: {
            handler: function() {
                this.$store.dispatch('fetchStory', this.storyId)
            }
        },
    },
    updated() {
        clearTimeout(this.slide)
        this.autoSlide()
    },
    methods: {
        ...mapActions(['fetchStory']),
        prevSlide() {
            if(this.index === 0) {
                return
            }
            this.$store.commit('prevIndex')
            clearTimeout(this.slide)
        },
        nextSlide() {
            this.$store.commit('nextIndex')
            clearTimeout(this.slide)
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
    border-radius: 2rem;
    background: rgba(0, 0, 0, 1);
    &-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
        &.loading {
            object-fit: none;
        }
    }
    &-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
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