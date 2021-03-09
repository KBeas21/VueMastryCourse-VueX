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
  /**
   * Creates an event
   *
   * We are not putting in the object parameters because when you use
   * this you are not passing them in instead you are pulling in:
   *   `commit` - to call a mutation
   *   `dispatch` - to call an action
   *
   * @param {*} event - event to create
   * @throws {Error} if the event fails to be created
   */
  createEvent({ commit, dispatch }, event) {
    return EventServices.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There is a problem creating your event: ' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        /*
          We are throwing the error we just catch here because we need to send it
          up to our component, EventCreate.vue because there is a different behavior
          if the error happens in our component
          */
        throw error
      })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
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
          const notification = {
            type: 'error',
            message: 'There is a problem fetching events: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          // dispatch('Module / action', payload, { root: true }) root is 'rootState'
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
  fetchEvent({ commit, getters, dispatch }, id) {
    let event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)
    } else {
      EventServices.getEvent(id)
        .then(response => {
          commit('SET_EVENT', response.data)
        })
        .catch(error => {
          const notification = {
            type: 'error',
            message: 'There is a problem fetching event: ' + error.message
          }
          dispatch('notification/add', notification, { root: true })
          // console.log('There was an error', error.response)
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
