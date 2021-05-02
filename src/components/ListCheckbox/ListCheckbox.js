import React, {useState} from 'react';
import './ListCheckbox.css';
import ButtonWrapper from "../Button/ButtonWrapper";

const ListCheckbox = ({initValues = [], items, itemTranslations = items, onApply}) => {
    let [values, setValues] = useState(initValues);

    const wrapInTableCells = () => {
        return items.map(i => (
            <>
                <tr className="ListCheckbox_row">
                    <td className="ListCheckbox_buttonCell">
                        <input type="checkbox"
                               checked={values.includes(i)}
                               onClick={(e) => {
                                    if (e.target.checked) {
                                        setValues([...values, i]);
                                    } else {
                                        setValues(values.filter(value => value !== i));
                                    }
                                }}
                                className="ListCheckbox_button" />
                    </td>
                    <td className="ListCheckbox_itemName">{itemTranslations[i] ?? "Missing Translation!"}</td>
                </tr>
            </>
        ));
    }

    return (
        <div className="ListCheckbox">
            <table>
                {wrapInTableCells()}
            </table>
            <div className="FiltersForm__button-wrapper">
                <ButtonWrapper label="Apply" onClick={() => onApply(values)} />
            </div>
        </div>
    );
}


export default ListCheckbox;