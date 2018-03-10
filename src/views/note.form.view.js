import React from "react";
import {Formik, Form, Field} from "formik";
import Yup from "yup";
import { FormGroup} from "../components/layout.components";
import PropTypes from "prop-types";

class NoteForm extends React.Component{
    constructor(props){
        super(props);
        this._handleFileChange = (e) => {
            if(!e.target.files) return;
            var file = e.target.files[0];
            if(file.size > 2097152){
                alert("WARNING! Max file size (2 MB) is exceeded.");
                e.target.value = '';
            }else{
                this.props.actions.saveFile(file);
            }
        }
    }
    render(){
        return <div>
            <Formik 
                initialValues={this.props.note}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required.'),
                    content: Yup.string().required('Content is required'),
                })}
                handleChange={(e) => {
                    this.props.actions.changeNote(e)
                }}
                enableReinitialize={true}
                onSubmit={(values, actions) => { 
                    let note = this.props.note;
                    this.props.actions.saveNote({
                        id: note.id,
                        name: values.name,
                        content: values.content,
                        fileName: note.fileName,
                        url: note.url
                    })
                    actions.resetForm();
                    this.props.actions.resetNote();
                    actions.setSubmitting(false);
                }}
                onReset={(values, actions) => {
                    this.props.actions.resetNote();
                    document.getElementById('createNoteF').reset();
                }}
                render={({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    handleReset
                })=>(
                    <Form id="createNoteF">
                        <h3>Create a Fire Note!</h3>
                        <FormGroup>
                            <label>Name:</label>
                            {errors.name && touched.name && (<div className="validation-message">{errors.name}</div>)}
                            <Field value={values.name} name="name"  className="form-control" onChange={handleChange} onBlur={e => this.props.actions.changeNote(e)} />                            
                        </FormGroup>
                        <FormGroup>
                            <label>Content:</label>
                            {errors.content && touched.content && (<div className="validation-message">{errors.content}</div>)}
                            <Field value={values.content} name="content" component="textarea" className="form-control" onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>File:</label>
                            <Field type="file" value={this.props.fileName} name="file" className="form-control-file" onChange={this._handleFileChange} />
                        </FormGroup>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={handleReset}>Cancel</button>
                    </Form>
                )}
            />
        </div>
    }
}
export default NoteForm
NoteForm.propTypes = {
    note: PropTypes.object
}
NoteForm.defaultProps = {
    note: {
        id: null,
        name: '',
        content: '',
        fileName: '',
        url: ''
    }
}