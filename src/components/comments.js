import React from "react";
import moment from "moment";
import CreateComment from "./create.comment";
import firebase from "firebase";

class Comments extends React.Component{
    constructor(){
        super();
        this.state = {
            comments: [],
            show: false,
            noteId: null
        }
    }

    fetch(){
        const commentsRef = firebase.database().ref('comments');
        commentsRef.on('value', (snapshot) => {
            let comments = snapshot.val();
            let newState = [];
            for(let comment in comments){
                if(comments[comment].noteId === this.state.noteId)
                    newState.push({
                        id: comment,
                        author: comments[comment].author,
                        content: comments[comment].content,
                        noteId: comments[comment].noteId,
                        createdAt: comments[comment].createdAt
                    })
            }
            this.setState({comments: newState});
        })
    }

    componentDidMount(){
        this.setState({noteId: this.props.noteId});
    }

    componentWillReceiveProps(props){
        this.setState({show: props.show});
        this.fetch();
    }

    renderComment(comment){
        return <div className="comment-templaate">
            <h6>{comment.author}</h6>
            <p>{comment.content}</p>
            <p className="created">{comment.createdAt}</p>
        </div>
    }

    render(){
        if(!this.state.show) return null;
        var comments = (this.state.comments.length) ? this.state.comments.map((comment, index) => <li key={index}>{this.renderComment(comment)}</li>).reverse() : null;
        var commentsList = (comments)? <ul>{comments}</ul> : null;
        return <div className="comments-display">
            {commentsList}
            <CreateComment noteId={this.state.noteId} />
        </div>
    }
}
export default Comments;