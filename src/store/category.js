import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategoryById({commit, dispatch}, id) {
      try {
        const uid = await dispatch('getUid')
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return {...category, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch}, {title, limit, description, adress, id}) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit, description, adress})
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createCategory({commit, dispatch}, {title, limit, image, description, adress}) {
      try {
        const uid = await dispatch('getUid')
        this.imageUrl=null;
        const storageRef=firebase.storage().ref(`categories/${image.name}`).put(image);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          async ()=>{this.uploadValue=100;
            await storageRef.snapshot.ref.getDownloadURL()
            .then( async (url)=>{
              image = url;
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit, image, description, adress})
        return {title, limit, image, description, adress, id:category.key}
      });
    },
    )
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
