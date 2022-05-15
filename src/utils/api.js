import axios from  'axios'

const baseURL = 'http://localhost:3000'

const apiHelper = axios.create({ baseURL })

export default {
    getStories() {
        return apiHelper.get('/meta')
    },
    getStory(storyId) {
        return apiHelper.get(`/story/${storyId}`)
    }
}