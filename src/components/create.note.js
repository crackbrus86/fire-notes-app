import React from "react";
import firebase from "../firebase";

class CreateNote extends React.Component{
    constructor(){
        super();
        this.state = {
            id: null,
            name: '',
            content: '',
            fileName: '',
            url: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
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

    handleSave(e){
        const note = {
            name: this.state.name,
            content: this.state.content,
            fileName: this.state.fileName,
            url: this.state.url
        }
        if(this.state.id){
            const notesRef = firebase.database().ref('notes').child(this.state.id).update(note);
        }else{
            const notesRef = firebase.database().ref('notes');
            notesRef.push(note);
        }
        this.setDefaults();
    }

    handleClearForm(e){
        this.setDefaults();
    }
    setDefaults(){
        this.setState({
            id: null,
            name: '',
            content: '',
            fileName: '',
            url: ''
        });
    }
    componentWillReceiveProps(props){
        if(props.current){
            var note = props.current;
            this.setState({
                id: note.id,
                name: note.name,
                content: note.content,
                fileName: note.fileName,
                url: note.url
            })
        }
    }
    render(){
        return (<div>
            <form>
                <div className="form-group">
                    <label>Name: </label>
                    <input className="form-control" type="text" value={this.state.name} name="name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Content:</label> 
                        <textarea className="form-control" value={this.state.content} name="content" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <input className="form-control-file" type="file" onChange={this.handleFileChange}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.handleSave}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={this.handleClearForm}>Clear</button>
            </form>
        </div>)
    }
}
export default CreateNote;