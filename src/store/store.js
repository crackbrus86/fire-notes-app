import LocalStorage from "../store/local.storage";
import FirebaseStorage from "../store/firebase.storage";

export const Store = {
    _handlers: [],
    _provider: 'firebase',
    onChange: function(handler){
        this._handlers.push(handler);
    },
    set: function(value){
        this._provider = value;      
        this._handlers.forEach(handler => handler());
    },
    get: function(){
        return this._provider;
    },

    createStorage(){
        switch(this._provider){
            case "localStorage":
                return new LocalStorage();
            default:
                return new FirebaseStorage();
        }
    }
}