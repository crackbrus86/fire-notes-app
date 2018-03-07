import React from "react";

export class Settings extends React.Component {
    constructor(props){
        super(props);
        this._selectProvider = e => {
            this.props.onChange(e.target.value);
        }
    }
    render(){
        var providers = [{value: 'firebase', name: 'Firebase'}, {value: 'localStorage', name:'Local Storage'}];
        var options = providers.map((provider, index) => <option key={index} value={provider.value}>{provider.name}</option>);
        
        return <div className="app-settings col col-md-4">
            <div className="form-group">
                <label>Settings <i className="fab fa-whmcs"></i></label>
                <select className="form-control" value={this.props.value} onChange={this._selectProvider}>
                    {options}
                </select>
            </div>
        </div>
    }
}