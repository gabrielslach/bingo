import db from './firestore'


export const writeData = (roomID = null, docName = null, data = {}) => {
    if (roomID === null) {
        return;
    }
    if (docName === null){
        db.collection(roomID)
            .add(data)
            .then(docRef => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    } else {
        db.collection(roomID).doc(docName).set(data)
    }
}

export const getData = (roomID)=> {
    db.collection(roomID)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                console.log(`${doc.id} => ${doc.data()}`)
        })
    })
}

export const createRoom = () => {
    let roomID = '';
    do {
        roomID = Math.random()*Math.random() * 1000
        roomID = roomID.toFixed(0)
        roomID = String(roomID)
    } while (roomID.length !== 3);
    writeData(roomID)
    return(roomID);
}
