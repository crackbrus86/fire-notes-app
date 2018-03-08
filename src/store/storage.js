import LocalStorage from "../store/local.storage";
import FirebaseStorage from "../store/firebase.storage";

export class Storage {
    constructor(provider = "firebase"){
        this.provider = (provider === "firebase")? new FirebaseStorage() : new LocalStorage();
        this.notes = [];
    }

    fetchAll(){
        this.provider.fetch('notes').then(data => this.notes = data);
    }
}