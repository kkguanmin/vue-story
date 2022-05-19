<template>
  <div id="app">
    <div class="slide">
      <Story />
      <Progress />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    }
  },
  computed: {
    ...mapState(['stories', 'storyId', 'isLoading', 'index'])
  },
  created() {
    this.fetchStories()
  },
  methods: {
    ...mapActions(['fetchStories']),
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
  position: relative;
}

@media screen and (min-width: 576px){
  .slide {
    width: 481px;
    height: 809px;
  }
}
</style>
