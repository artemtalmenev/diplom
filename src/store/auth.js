import firebase from 'firebase/app'
import {directorsRef} from '../firebase'

export default {
  actions: {
    async login({dispatch, commit}, {email,password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name, role}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 0,
          name,
          role: role ? 'Директор' : 'Риэлтор'
        })
        if (role) directorsRef.push({info: {userId: uid, name: name}})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null

    },
    getUids() {
      const user = firebase.auth().currentUser
      const directors = firebase.auth().currentDirectors
      return user && directors ? {userUid: user.uid, directorsUid: directors.uid} : null

    },
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
