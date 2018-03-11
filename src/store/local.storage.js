import {CardImage} from "../components/template.components";

class LocalStorage{

    fetch = (type) => {
        return new Promise((resolve, reject) => {
            var items = (localStorage.getItem(type))? JSON.parse(localStorage.getItem(type)) : [];
            resolve(items);
        });
    }

    create = (type, data) => {
        return new Promise((resolve, reject) => {
            var items = (localStorage.getItem(type))? JSON.parse(localStorage.getItem(type)) : [];
            data.id = new Date().getTime();
            items.push(data);
            localStorage.setItem(type, JSON.stringify(items));
            resolve();
        })
    }

    update = (type, itemId, data) => {
        return new Promise((resolve, reject) => {
            var items = (localStorage.getItem(type))? JSON.parse(localStorage.getItem(type)) : [];
            items = items.filter(n => n.id !== itemId);
            data.id = itemId;
            items.push(data);
            localStorage.setItem(type, JSON.stringify(items));
            resolve();
        })
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
        return new Promise((resolve, reject) => {
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
            resolve({fileName: file.name, url: ''})
        })
    }

    getImage = (name, url = null) => {
        let files = (localStorage.getItem("files"))? JSON.parse(localStorage.getItem("files")) : [];
        let file = files.find(f => f.name === name);
        if(!file) return null;
        return CardImage({url: file.file, name: name});
    }
}
export default LocalStorage;