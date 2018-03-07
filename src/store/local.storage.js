import Note from "../models/note";
import Comment from "../models/comment";

class LocalStorage{

    fetch = (type) => {
        return new Promise((resolve, reject) => {
            var items = (localStorage.getItem(type))? JSON.parse(localStorage.getItem(type)) : [];
            resolve(items);
        });
    }

    create = (type, data) => {
        var items = (localStorage.getItem(type))? JSON.parse(localStorage.getItem(type)) : [];
        data.id = new Date().getTime();
        items.push(data);
        localStorage.setItem(type, JSON.stringify(items));
    }

    update = (type, itemId, data) => {
        var items = (localStorage.getItem(type))? JSON.parse(localStorage.getItem(type)) : [];
        items = items.filter(n => n.id !== itemId);
        data.id = itemId;
        items.push(data);
        localStorage.setItem(type, JSON.stringify(data));
    }

    delete = (type, itemId) => {
        return new Promise((resolve, reject) => {
            var items = (localStorage.getItem(type))? JSON.parse(localStorage.getItem(type)) : [];
            items = items.filter(n => n.id !== itemId);
            localStorage.setItem(type, JSON.stringify(items));
            resolve();
        })
    }

    saveFile = (file) => {
        var files = (localStorage.getItem("files"))? JSON.parse(localStorage.getItem("files")) : [];
        var reader = new FileReader();
        reader.onload = function(e){
            var img = new Image();
            img.src = reader.result;
            files.push({
                name: file.name,
                file: reader.result
            })
            localStorage.files = JSON.stringify(files);
        }
        reader.readAsDataURL(file);
    }
}
export default LocalStorage;