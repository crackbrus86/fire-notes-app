import React from "react";
import classnames from "classnames";

export const Title = (props) => {
    return <div className="display-logo col col-md-4"><h1>{props.text}</h1></div>
}

export const Header = (props) => {
    return <header className="app-header row justify-content-center">
            {props.children}
    </header>
}

export const AppContent = (props) => {
        return <div className="row  justify-content-center app-content">
            {props.children}
        </div>
}

export const Section = (props) => {
    return <section className={classnames('col', 'col-md-4', props.className)}>
        {props.children}
    </section>
}

export const FormGroup = (props) => {
    return <div className={classnames('form-group', props.className)}>
        {props.children}
    </div>
}