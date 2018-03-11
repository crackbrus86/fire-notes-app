class Comment{
    constructor(newId = null){
        this.id = newId;
        this.author =  '';
        this.content = '';
        this.createdAt = '';
        this.noteId = null;
    }

    setProps(propsArr){
        this.author = propsArr.author;
        this.content = propsArr.content;
        this.createdAt = propsArr.createdAt;
        this.noteId = propsArr.noteId;
    }
}
export default Comment;