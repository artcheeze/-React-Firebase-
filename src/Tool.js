const firebase = require("firebase");

var firebaseConfig = {
  ///////////////////////// Config Firebase ที่นี่จ้าาาาา
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();

const Tool = {
    uploadData: async (data) => {
        let setDoc = db.collection('iceice').doc('data').set(data);
        return setDoc
    },
    fetchData: async () => {
        return db
    }
}

export default Tool;