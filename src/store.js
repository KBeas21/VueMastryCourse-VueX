import Vue from 'vue'
import Vuex from 'vuex'

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
    events: [
      // this is not used
      { id: 1, title: '...', organizer: '...' },
      { id: 2, title: '...', organizer: '...' },
      { id: 3, title: '...', organizer: '...' },
      { id: 4, title: '...', organizer: '...' }
    ]
  },
  mutations: {},
  actions: {},
  // here is (7) and (8).
  getters: {
    catLength: state => state.categories.length,
    doneTodos: state => {
      // (7)
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state /* (8) getters */) => {
      // (8) shows us we can pass in other getters to be used inside of themselves
      // return state.todos.length - getters.doneTodos.length
      // (9) - just a better way to do (8) =)
      return state.todos.filter(todo => !todo.done).length
    },
    // (10) Dynamic getter - passing an argument to it
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    },
    getTodos: state => {
      return state.todos
    }
  }
})
