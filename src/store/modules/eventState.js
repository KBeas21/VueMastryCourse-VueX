import EventServices from '@/services/EventService.js'

// All Mutation, Actions, and getters will be namespaced under `event`
export const namespaced = true

export const state = {
  // one event used for event show
  event: {},
  // List of events
  events: [],
  // Amount of events for pagination
  eventsTotal: 0
}
export const mutations = {
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
}

export const actions = {
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
}

export const getters = {
  getEventById: state => id => {
    return state.events.find(event => event.id === id)
  }
}

/*
In other way to do this would be:

  import EventService from '@/services/EventService.js'
  
  export default {
    state: { ... },
    mutations: { ... },
    actions: { ... },
    getters: { ... }
  }

Both syntaxes are correct and the reason the first might be better is that it's
easier to create private variables and methods. 
*/
