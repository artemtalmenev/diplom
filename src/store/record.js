import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
          const uid = await dispatch('getUid')
          this.imageUrl=null;
          const images = [];
          record.images.forEach((image, index) => {
            const storageRef=firebase.storage().ref(`objects/${image.name}`).put(image);
            storageRef.on(`state_changed`,snapshot=>{
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error=>{console.log(error.message)},
            ()=>{this.uploadValue=100;
              storageRef.snapshot.ref.getDownloadURL()
              .then( async (url)=>{
                images.push(url)
                if (index === record.images.length - 1) {
                  record.images = JSON.stringify(images)
                  return await firebase.database().ref(`/users/${uid}/records`).push(record)
                }
              });
            },
            )
          });
         
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid')
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid')
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return {...record, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
