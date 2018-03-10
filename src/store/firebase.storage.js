import firebase from "firebase";
import Note from "../models/note";
import Comment from "../models/comment";
import {CardImage} from "../components/template.components";

class FirebaseStorage{

    fetch = (type) => {
        return new Promise((resolve, reject) => {
            const typesRef = firebase.database().ref(type);
            typesRef.on('value', (data) => {
                let items = data.val();
                let response = [];
                for(let item in items){
                    let res = (type === 'notes')? new Note(item) : new Comment(item);
                    res.setProps(items[item]);
                    response.push(res);
                }
                resolve(response);
            });
        });
    }

    create = (type, data) => {
        return new Promise((resolve, reject) => {
            let res = (type === 'notes')? new Note() : new Comment();
            res.setProps(data);
            const typeRef = firebase.database().ref(type);
            typeRef.push(res);
            resolve();
        })
    }

    update = (type, itemId, data) => {
        return new Promise((resolve, reject) => {
            firebase.database().ref(type).child(itemId).update(data);
            resolve();
        })
    }

    delete = (type, itemId) => {
        return new Promise((resolve, reject) => {
            const noteRef = firebase.database().ref(`/${type}/${itemId}`);
            noteRef.remove(); 
            resolve();
        })
    }

    saveFile = (file) => {
        return new Promise((resolve, reject) => {
            const storeRef = firebase.storage().ref(file.name);
            storeRef.put(file).then(snapshot => resolve({fileName: file.name, url: snapshot.downloadURL}));
        })
    }

    getImage = (name, url = null) => {
        return CardImage({url, name});
    }
}
export default FirebaseStorage;