import Vue from 'vue'
import Vuex from 'vuex'
import storyAPI from '../utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stories: {},
    storyId: '',
    story: {},
    index: 0,
    isLoading: false,
  },
  getters: {
  },
  actions: {
    async fetchStories({ commit }) {
      try {
        commit('setIsLoading', true)
        const { data, statusText} = await storyAPI.getStories()
        if(statusText !== 'OK') {
          throw new Error
        }
        commit('setStories', data.idList)
      } catch (error) {
        console.log(error)
      }
    }
  },
  mutations: {
    setStories (state, stories) {
      state.stories = {
        ...state.stories,
        ...stories
      }
      state.storyId = state.stories[state.index]
    },
    setStory (state, story) {
      state.story = {
        ...state.story,
        ...story
      }
    },
    setIndex (state, index) {
      state.index = index
    },
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  },
  modules: {
  }
})
