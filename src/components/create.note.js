import React from "react";
import firebase from "../firebase";
import * as _ from "underscore";

class CreateNote extends React.Component{
    constructor(){
        super();
        this.state = {
            id: null,
            name: '',
            content: '',
            fileName: '',
            url: '',
            validation: {
                isValid: true,
                reasons: []
            },
            fileLoading: false,
            dataSource: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value}, () => this.validateForm());
    }

    handleFileChange(e){
        if(!e.target.files) return null;
        var file = e.target.files[0];
        this.setState({fileName: file.name});
        if(this.validateFile(file)){
            if(this.state.dataSource === "firebase")
                this.loadToFirebase(file);
            else
                this.loadToLocalStorage(file);      
        }
    }

    loadToFirebase(file){
        this.setState({fileLoading: true});
        const storeRef = firebase.storage().ref(file.name);
        storeRef.put(file).then(snapshot => this.setState({url: snapshot.downloadURL, fileLoading: false}));
    }

    loadToLocalStorage(file){
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

    validateFile(file){
        if(file && file.size > 2097152){
            var reasons = this.state.validation.reasons;
            reasons.push({name: "file", reason: "Max File Size equal 2 MB"});
            this.setState({validation: {isValid: false, reasons: reasons}});
            return false;
        }else{
            var reasons = this.state.validation.reasons;
            reasons = reasons.filter(r => r.name !== "file");
            this.setState({
                validation: {
                    isValid: true,
                    reasons: reasons
                }
            }, () => this.validateForm())
            return true;
        }
    }

    handleSave(){
        const note = {
            name: this.state.name,
            content: this.state.content,
            fileName: this.state.fileName,
            url: this.state.url
        }
        if(this.state.id){
            if(this.state.dataSource == 'firebase')
                this.updateInFirebase(note);
            else
                this.updateInLocalStorage(note);
        }else{
            if(this.state.dataSource == 'firebase')
                this.createInFirebase(note);
            else
                this.createInLocalStorage(note);
        }
        this.setDefaults();
        this.props.clearCurrent(null);
    }

    updateInFirebase(note){
        const notesRef = firebase.database().ref('notes').child(this.state.id).update(note);
    }

    updateInLocalStorage(note){
        var notes = (localStorage.getItem("notes"))? JSON.parse(localStorage.getItem("notes")) : [];
        notes = notes.filter(n => n.id !== this.state.id);
        note.id = this.state.id;
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    createInFirebase(note){
        const notesRef = firebase.database().ref('notes');
        notesRef.push(note);
    }

    createInLocalStorage(note){
        var notes = (localStorage.getItem("notes"))? JSON.parse(localStorage.getItem("notes")) : [];
        note.id = new Date().getTime();
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    handleClearForm(){
        var form = document.getElementById("createNoteF");
        form.reset();
        this.setDefaults();
    }

    setDefaults(){
        this.setState({
            id: null,
            name: '',
            content: '',
            fileName: '',
            url: ''
        }, () => {
            this.validateForm();
        });
    }

    validateForm(){
        var reasons = []; 
        var issues = 0;
        if(!this.state.name.length){  
            reasons.push({ name: 'name', reason: 'Name is required'});
            this.setState({
                validation: {
                    isValid: false,
                    reasons: reasons
                }
            });
            issues++;
        }
        if(!this.state.content.length){
            reasons.push({ name: 'content', reason: 'Content is required'});
            this.setState({
                validation: {
                    isValid: false,
                    reasons: reasons
                }
            });
            issues++;
        }
        if(!issues) this.setState({validation: {isValid: true, reasons: []}});
    }

    validateInput(name){
        var error = _.find(this.state.validation.reasons, (reason) => reason.name === name);
        var element = document.getElementById(name);
        if(error){            
            element.classList.add("invalid");
            return <span className="validation-message">{error.reason}</span>;
        }else{
            if(element) element.classList.remove("invalid");
        }
    }

    componentDidMount(){
        this.setState({dataSource: this.props.source}, () => this.validateForm());
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
            }, () => this.validateForm())
        }
        if(props.source){
            this.setState({dataSource: props.source}, () => this.validateForm());
        }        
    }
    render(){
        return (<div>            
            <form id="createNoteF">
                <h3>Create a Fire Note!</h3>
                <div className="form-group">
                    <label>Name: {this.validateInput('name')}</label>
                    <input className="form-control" type="text" value={this.state.name} id="name" name="name" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Content: {this.validateInput('content')}</label> 
                        <textarea className="form-control" value={this.state.content} id="content" name="content" onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    {this.validateInput('file')}
                    <input className="form-control-file" type="file"  id="file" name="file" onChange={this.handleFileChange}/>
                </div>
                <button type="button" className="btn btn-primary" disabled={!this.state.validation.isValid || this.state.fileLoading} onClick={this.handleSave}>Save</button>
                <button type="button" className="btn btn-secondary" onClick={this.handleClearForm}>Cancel</button>
            </form>
        </div>)
    }
}
export default CreateNote;