import {TextField} from "@material-ui/core";
import React from "react";
import './SearchField.css';

const SearchField = ({disabled, onClick, onChange}) => {
    return (
        <div className="SearchWidget">
            <div className="SearchWidget_field">
                <TextField placeholder="Search..."
                           onChange={onChange}/>
            </div>
            <button disabled={disabled}
                    onClick={onClick}
                    className="SearchWidget_submit">✓
            </button>
        </div>
    );
}

export default SearchField;