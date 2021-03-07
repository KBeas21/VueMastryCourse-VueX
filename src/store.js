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
    },
    /*
     NOTE: the second argument to actions can be both mutations and actions is effectively a payload.
     The payload in both Actions and Mutations can be a single variable or a single object.
     So here we are using ES5 object destructuring
    */
    fetchEvents({ commit }, { perPage, page }) {
      if (perPage && page) {
        // with pagination
        EventServices.getEvents(perPage, page)
          .then(response => {
            console.log(
              'Total event count is ' + response.headers['x-total-count']
            )
            commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
            // YOU ARE HERE COME BACK TO THIS!!!!!

            commit('SET_EVENTS', response.data)
            // this.events = response.data
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      } else {
        // without pagination
        EventServices.getEvents()
          .then(response => {
            commit('SET_EVENTS', response.data)
            // this.events = response.data
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
    },
    fetchEvent({ commit, getters }, id) {
      // check and see if we already have an event with that id in our store
      let event = getters.getEventById(id)

      if (event) {
        // if we have an event in our store with that id use it
        commit('SET_EVENT', event)
      } else {
        // if we do not, make the api call
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
