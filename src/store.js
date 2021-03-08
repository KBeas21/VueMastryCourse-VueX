import Vue from 'vue'
import Vuex from 'vuex'
import EventServices from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // acting logged in user
    user: { id: 'KB123', name: 'Kevin B' },
    // avalible categories to create an event with
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    // Todos use in the previous example
    todos: [
      { id: 1, text: 'pull the lever kronk', done: true },
      { id: 2, text: 'wrong lever!!!!!', done: true },
      { id: 3, text: "Kill Kuzco, with Kuzco's poison", done: false },
      { id: 4, text: '...', done: false }
    ],
    // one event used for event show
    event: {},
    // List of events
    events: [],
    // Amount of events for pagination
    eventsTotal: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENT(state, event) {
      state.event = event
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventServices.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      if (perPage && page) {
        EventServices.getEvents(perPage, page)
          .then(response => {
            console.log(
              'Total event count is ' + response.headers['x-total-count']
            )
            commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
            commit('SET_EVENTS', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      } else {
        EventServices.getEvents()
          .then(response => {
            commit('SET_EVENTS', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
    },
    fetchEvent({ commit, getters }, id) {
      let event = getters.getEventById(id)

      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventServices.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error', error.response)
          })
      }
    }
  },
  getters: {
    getEventById: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
