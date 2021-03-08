import Vue from 'vue'
import Vuex from 'vuex'
// Imports all public items (things that are exported) into the provide namespace
import * as userMod from '@/store/modules/userState.js'
import * as eventMod from '@/store/modules/eventState.js'
import * as notifications from '@/store/modules/notifications.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userMod,
    eventMod,
    notifications
  },
  state: {
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
    ]
  }
})
