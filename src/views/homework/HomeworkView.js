import React, {useState} from "react";

import {Link} from "react-router-dom";
import ButtonWrapper from "../../components/Button/ButtonWrapper";


const HomeworkView = (props) => {

    return (
        <Link to="/api/homework/example">
            <ButtonWrapper label={"link to /api/homework/example-id"}/>
        </Link>
    )
}

export default HomeworkView;