import React from "react";
import {Formik, Form, Field } from "formik";
import Yup from "yup";
import { FormGroup} from "../components/layout.components";
import PropTypes from "prop-types";

class NoteForm extends React.Component{
    render(){
        return <div>
            <Formik 
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required.'),
                  })}
                onSubmit={() => null}
                render={(touched, errors, dirty)=>(
                    <Form id="createNoteF">
                        <h3>Create a Fire Note!</h3>
                        <FormGroup>
                            <label>Name:</label>
                            <Field value={this.props.note.name} name="name"  className="form-control" onChange={() => null} />
                        </FormGroup>
                        <FormGroup>
                            <label>Content:</label>
                            <Field value={this.props.note.content} name="content" component="textarea" className="form-control" />
                        </FormGroup>
                        <FormGroup>
                            <label>File:</label>
                            <Field type="file" value={this.props.note.fileName} name="file" className="form-control-file" onChange={()=>null} />
                        </FormGroup>
                        <button type="button" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary">Cancel</button>
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