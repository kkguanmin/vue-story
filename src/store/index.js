import Vue from 'vue'
import Vuex from 'vuex'
import storyAPI from '../utils/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stories: [],
    storyId: '',
    story: {},
    storyData: [],
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
        // console.log(data.idList)
        commit('setStories', data.idList)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchStory({ commit, state }, storyId) {
      const storyData = JSON.parse(JSON.stringify(state.storyData))
      // check if vuex have desired story data
      if(storyData[state.index]) {
        if(storyData[state.index].id === storyId) {
          commit('setStoryFromVuex')
          return
        }
      }
      // get story data from api
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
      state.storyData[state.index] = story
    },
    setStoryFromVuex (state) {
      state.story = state.storyData[state.index]
    },
    setIndex (state, index) {
      state.index = index
    },
    prevIndex(state) {
      state.index -= 1
      if(state.index <= 0) {
        state.index = 0
      }
    },
    nextIndex(state) {
      state.index += 1
      if(state.index >= state.stories.length) {
        state.index = 0
      }
    },
    setIsLoading (state, isLoading) {
      state.isLoading = isLoading
    }
  },
  modules: {
  }
})
