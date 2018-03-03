import React from "react";

export const Settings = (props) => {
    var sources = [{value: 'firebase', name: 'Firebase'}, {value: 'localStorage', name:'Local Storage'}];
    var options = sources.map((sourse, index) => <option key={index} value={sourse.value}>{sourse.name}</option>)
    return <div>
        <label>
            <select value={props.sourse} onChange={(e) => props.selectSource(e.target.value)}>
                {options}
            </select>
        </label>
    </div>
}