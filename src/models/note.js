class Note{
    constructor(newId = null){
        this.id = newId;
        this.name = '';
        this.content = '';
        this.fileName = '';
        this.url = '';
    }

    setProps(propsArr){
        [this.content, this.fileName, this.name, this.url] = Object.values(propsArr);
    }
}
export default Note;