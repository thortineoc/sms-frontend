import React, {useState} from 'react';
import './DisplayTable.css';

const columnNameTranslations = {
    id: "User ID",
    firstName: "First Name",
    lastName: "Last Name",
    middleName: "Middle Name",
    pesel: "PESEL",
    phoneNumber: "Phone Number",
    email: "E-mail Address",
}

const DisplayTable = ({columns, tableContent}) => {
    let [sortColumn, setSortColumn] = useState(null);
    let [sortOrder, setSortOrder] = useState(null);
    let [displayColumns, setDisplayColumns] = useState(columns);
    let [items, setItems] = useState(tableContent);

    return (
        <div className="DisplayTable">
            <table>
                <thead>
                    <ColumnNames columns={displayColumns}
                                 sortColumn={sortColumn}
                                 setSortColumn={setSortColumn}
                                 sortOrder={sortOrder}
                                 setSortOrder={setSortOrder}
                    />
                </thead>
                <tbody>
                    <UserRows columns={displayColumns}
                              sortColumn={sortColumn}
                              sortOrder={sortOrder}
                              items={items} />
                </tbody>
            </table>
        </div>
    );
};

const ColumnNames = ({columns, sortColumn, setSortColumn, sortOrder, setSortOrder}) => {

    let columnNames = [];
    let width = (100 / columns.length) + "%";
    for (const column of columns) {
        let name = columnNameTranslations[column];
        if (sortColumn === column) {
            name += " [" + (sortOrder === "ASC" ? "↑" : "↓") + "]";
        }
        columnNames.push(<th width={width} onClick={() =>
            handleColumnClick(column,
            sortColumn, setSortColumn,
            sortOrder, setSortOrder)}>{name}</th>);
    }

    return (
        <tr className="ColumnNames">
            {columnNames}
        </tr>
    );
}

const UserRows = ({columns, sortColumn, sortOrder, items}) => {
    let emptyColumns = new Array(columns.length);
    emptyColumns.fill(<TableCell content={null} columns={columns} />);

    let rows = [];
    for (let i = 0; i < 20; i++) {
        rows.push(
            <tr className="DataRow" key={i}>
                {emptyColumns}
            </tr>
        );
    }

    let sorted = getSortedItems(sortColumn, sortOrder, items);
    for (let i = 0; i < sorted.length; i++) {
        let filledColumns = columns.map(column => <TableCell columns={columns} content={sorted[i][column]} />);
        rows[i] = (
            <tr className="DataRow" key={sorted[i]}>
                {filledColumns}
            </tr>
        );
    }
    return rows;
}

const TableCell = ({columns, content}) => {
    let width = (100 / columns.length) + "%";
    return <td width={width}>{content}</td>;
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
