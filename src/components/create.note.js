import React from "react";
import firebase from "../firebase";

class CreateNote extends React.Component{
    constructor(){
        super();
        this.state = {
            name: '',
            content: '',
            fileName: '',
            url: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleFileChange(e){
        var file = e.target.files[0];
        this.setState({fileName: file.name});
        const storeRef = firebase.storage().ref(file.name);
        storeRef.put(file).then(snapshot => this.setState({url: snapshot.downloadURL}));
    }

    handleSubmit(e){
        e.preventDefault();
        const notesRef = firebase.database().ref('notes');
        const note = {
            name: this.state.name,
            content: this.state.content,
            fileName: this.state.fileName,
            url: this.state.url
        }
        notesRef.push(note);
        this.setState({
            name: '',
            content: '',
            fileName: '',
            url: ''
        });
        e.target.reset();
    }
    render(){
        return (<div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>Name: </label>
                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                </div>
                <div>
                <label>
                    Content:
                    <textarea value={this.state.content} name="content" onChange={this.handleChange} />
                </label> 
                </div>
                <div>
                    <input type="file" onChange={this.handleFileChange}/>
                </div>
                <button>Save Note</button>
            </form>
        </div>)
    }
}
export default CreateNote;