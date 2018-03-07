class Comment{
    constructor(newId = null){
        this.id = newId;
        this.author =  '';
        this.content = '';
        this.createdAt = '';
        this.noteId = null;
    }

    setProps(propsArr){
        [this.author, this.content, this.createdAt, this.noteId] = Object.values(propsArr);
    }
}
export default Comment;