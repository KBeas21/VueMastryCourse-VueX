import Vue from 'vue'
import Vuex from 'vuex'
import EventServices from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'KB123', name: 'Kevin B' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    todos: [
      { id: 1, text: 'pull the lever kronk', done: true },
      { id: 2, text: 'wrong lever!!!!!', done: true },
      { id: 3, text: "Kill Kuzco, with Kuzco's poison", done: false },
      { id: 4, text: '...', done: false }
    ],
    events: []
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    }
  },
  actions: {
    createEvent({ commit }, event) {
      /*
      // Adds to the mock DB db.json
      EventServices.postEvent(event)
      // commits the 'ADD_EVENT' mutation
      commit('ADD_EVENT', event)
      */

      // To make sure we successfully add it to our DB before we clear the data we need to add a promise then
      // we wait for the response to return in our 'Dispatcher' (where we dispatch our event inside of our component)
      return EventServices.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
