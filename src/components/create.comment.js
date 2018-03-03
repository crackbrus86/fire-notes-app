import React from "react";
import moment from "moment";
import firebase from "../firebase";

class CreateComment extends React.Component{
    constructor(){
        super();
        this.state = {
            author: '',
            content: '',
            noteId: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        this.setState({noteId: this.props.noteId});
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    setDefaults(){
        this.setState({
            author: "",
            content: ""
        })
    }

    handleSave(){
        const comment = {
            author: this.state.author,
            content: this.state.content,
            noteId: this.state.noteId,
            createdAt: moment(new Date()).format("DD-MM-YYYY HH:mm:ss")
        }

        const commentRef = firebase.database().ref('comments');
        commentRef.push(comment);
        this.setDefaults();
    }

    render(){
        return <div>
            <form>
                <div className="form-group">
                    <label>Author:</label>
                    <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea className="form-control" name="content" value={this.state.content} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-secondary" onClick={this.handleSave}>Comment</button>
                </div>
            </form>
        </div>
    }
}
export default CreateComment;