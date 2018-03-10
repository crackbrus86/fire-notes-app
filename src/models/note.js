class Note{
    constructor(newId = null){
        this.id = newId;
        this.name = '';
        this.content = '';
        this.fileName = '';
        this.url = '';
    }

    setProps(propsArr){
        this.content = propsArr.content;
        this.fileName = propsArr.fileName;
        this.name = propsArr.name;
        this.url = propsArr.url;
    }
}
export default Note;