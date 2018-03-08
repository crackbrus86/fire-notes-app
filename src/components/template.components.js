import React from "react";
import PropTypes from "prop-types";

export const CardImage = (props) => {
    return !!props.url && <div><img className="card-img-top" src={props.url} alt={props.name} /></div>;
}
CardImage.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string
}
CardImage.defaultProps = {
    url: '',
    name: ''
}

export const CommentsList = (props) => {
    if(!props.show) return null;
    let comments = !!props.comments.length && props.comments.map((comment, index) => <li key={index}>
        <Comment author={comment.author} content={comment.content} createdAt={comment.createdAt} />
        </li>).reverse();
    let commentsList = !!comments.length && <ul>{comments}</ul>
    return <div className="comments-display">
        {commentsList}
    </div>
}
CommentsList.propTypes = {
    comments: PropTypes.array,
    noteId: PropTypes.string,
    show: PropTypes.bool
}
CommentsList.defaultProps = {
    comments: [],
    noteId: null,
    show: false
}

export const Comment = (props) => {
    return <div className="comment-templaate">
        <h6>{props.author}</h6>
        <p>{props.content}</p>
        <p className="created">{props.createdAt}</p>
    </div>
}
Comment.PropTypes = {
    author: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string
}
Comment.defaultProps = {
    author: '',
    content: '',
    createdAt: ''
}

export const CardTemplate = (props) => {
    let note = props.note;
    let actions = props.actions;
    let noteComments = props.comments.filter(comment => comment.noteId === note.id)
    let commentsCount = noteComments.length;
    return <div className="note-template">
            <div className="card" style={{width: "20rem"}}>
                {props.actions.getImage(note.fileName, note.url)}
                <div className="card-block">
                    <h4 className="card-title">{note.name}</h4>
                    <p className="card-text">{note.content}</p>
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                    <div className="row comments-info">
                        <div className="col-sm-8">
                        <button type="button" className="btn btn-link" onClick={() => actions.showComments(note.id)}>{commentsCount} comments</button>
                        </div>
                        <div className="col-sm-3 hide-comments">
                            <button type="button" className="btn btn-link" onClick={() => actions.hideComments(note.id)}>Hide</button>
                        </div>
                    </div>
                </div>
            </div>
            <CommentsList comments={noteComments} show={props.shown}/>
    </div>;
}

CardTemplate.propTypes = {
    note: PropTypes.object,
    show: PropTypes.bool,
    comments: PropTypes.array,
    actions: PropTypes.object
}
CardTemplate.defaultProps = {
    note: null,
    show: false,
    comments: [],
    actions: []
}