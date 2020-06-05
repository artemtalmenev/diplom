import firebase from 'firebase/app'

export default {
  actions: {
    async fetchUserById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const user = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {...user, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createTask({dispatch, commit}, task) {
      try {
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/tasks`).push(task)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchTasks({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const tasks = (await firebase.database().ref(`/users/${uid}/tasks`).once('value')).val() || {}
        return Object.keys(tasks).map(key => ({...tasks[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchTaskById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const task = (await firebase.database().ref(`/users/${uid}/tasks`).child(id).once('value')).val() || {}
        return {...task, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
