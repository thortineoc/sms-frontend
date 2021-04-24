import React, {useState} from 'react';
import './DisplayTable.css';

const columnNameTranslations = {
    id: "User ID",
    firstName: "First Name",
    lastName: "Last Name",
    middleName: "Middle Name",
    pesel: "PESEL",
    username: "Username",
    phoneNumber: "Phone Number",
    email: "E-mail Address",
    group: "Group"
}

const DisplayTable = ({onRowClick, columns, tableContent}) => {
    let [sortColumn, setSortColumn] = useState(null);
    let [sortOrder, setSortOrder] = useState(null);
    let [items, setItems] = useState(tableContent);

    const UserRows = () => {
        let sorted = getSortedItems(sortColumn, sortOrder, items);
        return fillRows(sorted, 20, columns, onRowClick);
    }

    const ColumnNames = () => {
        let width = calcCellWidth(columns.length);
        let columnNames = columns.map((column) => {
            let name = getColumnName(column, sortColumn, sortOrder);
            return (<th width={width} onClick={() =>
                handleColumnClick(column,
                    sortColumn, setSortColumn,
                    sortOrder, setSortOrder)}>{name}</th>);

        });
        return (
            <tr className="DisplayTable_header">
                {columnNames}
            </tr>
        );
    }

    return (
        <div className="DisplayTable">
            <table>
                <thead>
                    <ColumnNames />
                </thead>
                <tbody>
                    <UserRows />
                </tbody>
            </table>
        </div>
    );
};

const getColumnName = (column, sortColumn, sortOrder) => {
    let name = columnNameTranslations[column] ?? name;
    if (sortColumn === column) {
        name += " [" + (sortOrder === "ASC" ? "↑" : "↓") + "]";
    }
    return name;
}

const calcCellWidth = (count) => {
    return (100 / count) + "%";
    // return count < 7
    //     ? (100 / count) + "%"
    //     : "200px";
}

const TableCell = ({count, content}) => {
    return <td width={calcCellWidth(count)}>{content}</td>;
}

const getEmptyRows = (rowCount, colCount) => {
    let emptyColumns = new Array(colCount);
    emptyColumns.fill(<TableCell content={null} count={colCount} />);

    let rows = [];
    for (let i = 0; i < rowCount; i++) {
        rows.push(
            <tr className="DisplayTable_row" key={i}>
                {emptyColumns}
            </tr>
        );
    }
    return rows;
}

const fillRows = (items, maxRowCount, columns, onRowClick) => {
    let rows = getEmptyRows(maxRowCount, columns.length);

    for (let i = 0; i < items.length; i++) {
        let filledColumns = columns.map(column => <TableCell count={columns.length}
                                                             content={items[i][column] ?? "-"} />);
        rows[i] = (
            <tr onClick={() => onRowClick(items[i]) } // changed from items[id] to items
                className="DisplayTable_row" key={items[i]}
                style={{cursor: 'pointer'}}>
                {filledColumns}
            </tr>
        );
    }
    return rows;
}

const handleColumnClick = (column, sortColumn, setSortColumn, sortOrder, setSortOrder) => {
    if (sortColumn === column) {
        if (sortOrder === null) {
            setSortOrder("ASC");
        } else if (sortOrder === "ASC") {
            setSortOrder("DESC");
        } else if (sortOrder === "DESC") {
            setSortOrder(null);
            setSortColumn(null);
        }
    } else {
        setSortOrder("ASC");
        setSortColumn(column);
    }
}

const getSortedItems = (column, order, items) => {
    if (column === null || order === null) return items;

    let sorted = [...items];
    if (order === "DESC") {
        sorted.sort((left, right) =>
            (left[column] > right[column])
                ? 1
                : ((left[column] < right[column])
                    ? -1
                    : 0));
    } else if (order === "ASC") {
        sorted.sort((left, right) =>
            (left[column] < right[column])
                ? 1
                : ((left[column] > right[column])
                    ? -1
                    : 0));
    }
    return sorted;
}

export default DisplayTable;
