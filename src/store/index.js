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
        const { data, statusText} = await storyAPI.getStories()
        if(statusText !== 'OK') {
          throw new Error
        }
        console.log(data.idList)
        commit('setStories', data.idList)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchStory({ commit }, storyId) {
      try {
        commit('setIsLoading', true)
        const { data, statusText } = await storyAPI.getStory(storyId)
        if(statusText !== 'OK') {
          throw new Error
        }
        commit('setStory', data)
        commit('setIsLoading', false)
      } catch (error) {
        console.log(error)
      }
    },
  },
  mutations: {
    setStories (state, stories) {
      state.stories = stories
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
    prevIndex(state) {
      state.index -= 1
    },
    nextIndex(state) {
      state.index += 1
    },
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  },
  modules: {
  }
})
