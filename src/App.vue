<template>
  <div id="app">
    <div class="slide">
      <Story />
      <Progress />
    </div>
  </div>
</template>

<script>
import storyAPI from './utils/api'

import Story from './components/Story.vue'
import Progress from './components/Progress.vue'

export default {
  name: 'App',
  components: {
    Story,
    Progress,
  },
  data() {
    return {
      stories: []
    }
  },
  created() {
    this.fetchStories()
  },
  methods: {
    async fetchStories() {
      try {
        const { data, statusText} = await storyAPI.getStories()
        if(statusText !== 'OK') {
          throw new Error
        }
        this.stories = data.idList
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  display: grid;
}
.slide {
  margin: auto;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  border-radius: 2rem;
}

@media screen and (min-width: 576px){
  .slide {
    width: 481px;
    height: 809px;
  }
}
</style>
