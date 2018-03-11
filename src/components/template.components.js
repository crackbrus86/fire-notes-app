import React from "react";
import PropTypes from "prop-types";
import {Formik, Form, Field} from "formik";
import Yup from "yup";
import { FormGroup} from "../components/layout.components";
import moment from "moment";

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
        <CommentForm noteId={props.note.id} actions={props.actions}/>
    </div>
}
CommentsList.propTypes = {
    comments: PropTypes.array,
    note: PropTypes.object,
    show: PropTypes.bool,
    actions: PropTypes.object
}
CommentsList.defaultProps = {
    comments: [],
    note: null,
    show: false,
    actions: null
}

export const Comment = (props) => {
    return <div className="comment-templaate">
        <h6>{props.author}</h6>
        <p>{props.content}</p>
        <p className="created">{props.createdAt}</p>
    </div>
}
Comment.propTypes = {
    author: PropTypes.string,
    content: PropTypes.string,
    createdAt: PropTypes.string
}
Comment.defaultProps = {
    author: '',
    content: '',
    createdAt: ''
}

export const CommentForm = (props) => {
    return <div className="add-comment">
        <Formik
            initialValues={{author: '', content: ''}} 
            validationSchema={Yup.object().shape({
                author: Yup.string().required('Author is required.').matches(/^[A-Z][a-zA-Z]+[\s]+[A-Z][a-zA-Z]{1,30}/, "Author name should match template 'John Smith'"),
                content: Yup.string().required('Content is required'),
            })}
            onSubmit={(values, actions) => {
                let comment = {
                    author: values.author,
                    content: values.content,
                    noteId: props.noteId,
                    createdAt: moment(new Date()).format("DD-MM-YYYY HH:mm:ss")
                }
                props.actions.addComment(comment);
                actions.setSubmitting(false);
                actions.resetForm();
            }}
            render = {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting
            }) => (
                <Form>
                    <FormGroup>
                        <label>Author</label>
                        {errors.author && touched.author && (<div className="validation-message">{errors.author}</div>)}
                        <Field value={values.author} name="author" className="form-control" />
                    </FormGroup>
                    <FormGroup>
                        <label>Content</label>
                        {errors.content && touched.content && (<div className="validation-message">{errors.content}</div>)}
                        <Field value={values.content} name="content" component="textarea" className="form-control" />
                    </FormGroup>  
                    <FormGroup>
                        <button type="button" className="btn btn-secondary"  onClick={handleSubmit}>Comment</button>
                    </FormGroup>                
                </Form>
            )}
        />
    </div>
}
CommentForm.propTypes = {
    noteId: PropTypes.string,
    actions: PropTypes.object
}

export const CardTemplate = (props) => {
    let note = props.note;
    let actions = props.actions;
    let noteComments = props.comments.filter(comment => comment.noteId === note.id)
    let commentsCount = noteComments.length;
    return <div className="note-template">
            <div className="card" style={{width: "20rem"}}>
                <div className="card-image">{props.actions.getImage(note.fileName, note.url)}</div>
                <div className="card-block">
                    <h4 className="card-title">{note.name}</h4>
                    <p className="card-text">{note.content}</p>
                    <button className="btn btn-primary" onClick={() => actions.editNote(note)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => actions.deleteNote(note.id)}>Delete</button>
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
            <CommentsList comments={noteComments} note={note} show={props.shown} actions={{
                addComment: props.actions.addComment
            }}/>
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