import React from "react";
import moment from "moment";
import firebase from "../firebase";
import * as _ from "underscore";
import { auth } from "firebase";

class CreateComment extends React.Component{
    constructor(){
        super();
        this.state = {
            author: '',
            content: '',
            noteId: null,
            validation: {
                isValid: true,
                reasons: []
            },
            dataSource: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount(){
        this.setState({noteId: this.props.noteId, dataSource: this.props.source}, () => this.validateForm());
    }

    componentWillReceiveProps(props){
        this.setState({dataSource: props.source}, () => this.validateForm());
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value}, () => this.validateForm());
    }

    setDefaults(){
        this.setState({
            author: "",
            content: ""
        }, () => this.validateForm())
    }

    validateForm(){
        var reasons = []; 
        var issues = 0;
        if(!this.state.author.length){  
            reasons.push({ name: 'author', reason: 'Author is required'});
            this.setState({
                validation: {
                    isValid: false,
                    reasons: reasons
                }
            });
            issues++;
        }
        if(this.state.author.length){
            var author = this.state.author.split(" ");
            author = author.filter((word) => word.length);
            if(author.length !== 2){
                reasons.push({ name: 'author', reason: 'Field Author should have 2 words'});
                this.setState({
                    validation: {
                        isValid: false,
                        reasons: reasons
                    }
                });
                issues++;
            }
            for(var i = 0; i < author.length; i++){
                if(author[i] && author[i][0] !== author[i][0].toUpperCase()){
                    reasons.push({ name: 'author', reason: 'Author name and surname should start in upper case'});
                    this.setState({
                        validation: {
                            isValid: false,
                            reasons: reasons
                        }
                    });
                    issues++;
                    break;
                }
            }
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
        var element = document.getElementById(name + this.state.noteId);
        if(error){            
            element.classList.add("invalid");
            return <span className="validation-message">{error.reason}</span>;
        }else{
            if(element) element.classList.remove("invalid");
        }
    }

    handleSave(){
        const comment = {
            author: this.state.author,
            content: this.state.content,
            noteId: this.state.noteId,
            createdAt: moment(new Date()).format("DD-MM-YYYY HH:mm:ss")
        }
        if(this.state.dataSource === "firebase")
            this.createInFirebase(comment);
        else
            this.createInLocalStorage(comment);
        this.setDefaults();
    }

    createInFirebase(comment){
        const commentRef = firebase.database().ref('comments');
        commentRef.push(comment);
    }

    createInLocalStorage(comment){
        var comments = (localStorage.getItem("comments"))? JSON.parse(localStorage.getItem("comments")) : [];
        comments.push(comment);
        localStorage.setItem("comments", JSON.stringify(comments));
        this.props.refresh();
    }

    render(){
        return <div className="add-comment">
            <form>
                <h5>Add your comment!</h5>
                <div className="form-group">
                    <label>Author: {this.validateInput('author')}</label>
                    <input type="text" className="form-control" name="author" id={'author' + this.state.noteId} value={this.state.author} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <label>Content: {this.validateInput('content')}</label>
                    <textarea className="form-control" name="content" id={'content' + this.state.noteId} value={this.state.content} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                    <button type="button" className="btn btn-secondary" disabled={!this.state.validation.isValid} onClick={this.handleSave}>Comment</button>
                </div>
            </form>
        </div>
    }
}
export default CreateComment;