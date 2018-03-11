import React from "react";
import PropTypes from "prop-types";
import {Formik, Form, Field} from "formik";
import {Section, FormGroup} from "./layout.components";

export class Settings extends React.Component {
    constructor(props){
        super(props);
        this._selectProvider = e => {
            this.props.onChange(e.target.value);
        }
    }
    render(){
        return <Section>
            <FormGroup>
                <Formik
                    onSubmit = {() => null}
                    render={() => (
                        <Form>
                            <label>Settings <i className="fab fa-whmcs"></i></label>
                            <Field value={this.props.provider} name="provider" className="form-control" onChange={this._selectProvider} component="select" >
                                <option value="firebase">Firebase</option>
                                <option value="localStorage">Local Storage</option>
                            </Field>
                        </Form>
                    )}
                />
            </FormGroup>
        </Section>
    }
}

Settings.propTypes = {
    provider: PropTypes.string,
    onChange: PropTypes.func
}

Settings.defaultProps = {
    provider: "localStorage",
    onChange: () => null
}