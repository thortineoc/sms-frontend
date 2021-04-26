import {TextField} from "@material-ui/core";
import React from "react";
import './SearchField.css';

const SearchField = ({onChange}) => {
    return (
        <div className="SearchWidget">
            <div className="SearchWidget_field">
                <TextField placeholder="Search..."
                           onChange={onChange}
                           fullWidth
                />
            </div>
        </div>
    );
}

export default SearchField;