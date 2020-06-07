import firebase from 'firebase/app'

export default {
  actions: {
    async fetchUsers({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const users = (await firebase.database().ref(`/users`).once('value')).val() || {}
        const userArray = [];
        Object.keys(users).forEach(user => {
          const obj = {
            id: user,
            name: users[user].info.name
          }
          userArray.push(obj)
        })
        return userArray
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchUsersById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const user = (await firebase.database().ref(`/users`).child(id).once('value')).val() || {}
        return {...user, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createTask({dispatch, commit}, {task, id, userID}) {
      try {
        await firebase.database().ref(`/users/${userID}/tasks`).push({task, id})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateTask({dispatch, commit}, {userID, taskID, task}) {
      try {
        let id = false
        const tasks = (await firebase.database().ref(`/users/${userID}/tasks`).once('value')).val()
        Object.keys(tasks).forEach(key => {
          const task = JSON.parse(tasks[key].task)
          if (task.id === taskID) {
            id = key
          }
        })
        if (id) {
          await firebase.database().ref(`/users/${userID}/tasks`).child(id).set({
            task, taskID
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchTasks({dispatch, commit}, {id}) {
      try {
        const tasks = (await firebase.database().ref(`/users/${id}/tasks`).once('value')).val() || {}
        const tasksArray = {data:[]}
        Object.keys(tasks).forEach(key => {
          const task = JSON.parse(tasks[key].task)
          tasksArray.data.push(task)
        })
        return tasksArray
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
    },
    async deleteTask({commit, dispatch}, {userID, taskID}) {
      let id 
      const tasks = (await firebase.database().ref(`/users/${userID}/tasks`).once('value')).val()
      Object.keys(tasks).forEach(key => {
        const task = JSON.parse(tasks[key].task)
        if (task.id === taskID) {
          id = key
        }
      })
      await firebase.database().ref(`/users/${userID}/tasks`).child(id).remove()
    }
  }
}
