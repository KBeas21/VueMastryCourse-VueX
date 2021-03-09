export const namespaced = true

export const state = {
  notifications: []
}

let nextId = 1
export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification, // we are object destructuring so we can add an ID to every new pushed notification
      id: nextId++
    })
  },
  DELETE(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      notification => notification.id !== notificationToRemove.id
    )
  }
}

export const actions = {
  /**
   * You might notice that these are just called add and remove and not
   * addNotification and removeNotification this is because we are in a namespace
   * module. So in order to call the namespace we need to Specify the specific
   * named module before we call it, like:
   *   this.$state.notificationMod.actionName
   */
  add({ commit }, notification) {
    commit('PUSH', notification)
  },
  remove({ commit }, notificationToRemove) {
    commit('DELETE', notificationToRemove)
  }
}
