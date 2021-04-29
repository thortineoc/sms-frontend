import React, { useEffect, useState} from 'react';
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";


const GradesCreateEditForm = () =>{
    return(
        <div>
            <SelectFieldWrapper name={"type"} options={["AAA", "BBB"]}/>
        </div>
    )
}

export default GradesCreateEditForm;