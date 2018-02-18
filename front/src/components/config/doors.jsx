import React from 'react';
import ReactDataGrid from 'react-data-grid';

export class Doors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows()
        };
    }
    createRows = () => {
        return this.props.doors.map((door) =>
            ({id: door.id,
                name: door.name,
                room1: door.room1.name,
                room2: door.room2.name}));
    };
    columns = [
        {
            key: 'id',
            name: 'ID',
            width: 80
        },
        {
            key: 'name',
            name: 'Name',
            editable: true
        },
        {
            key: 'room1',
            name: 'Adjacent Room'
        },
        {
            key: 'room2',
            name: 'Adjacent Room'
        }
    ];
    rowGetter = (i) => {
        return this.state.rows[i];
    };
    handleAddRow = ({ newRowIndex }) => {
        const newRow = {
            id: newRowIndex,
            name: '',
            room1: '',
            room2: ''
        };

        let rows = this.state.rows.slice();
        rows.push(newRow);
        this.setState({ rows });
    };
    render() {
        return (
            <div>
                <div class="table-toolbar">
                    <button className="btn btn-outline-primary">Add Door</button>
                </div>
                <ReactDataGrid
                    rowGetter={this.rowGetter}
                    columns={this.columns}
                    rowsCount={this.state.rows.length}
                    enableCellSelect={true}/>
            </div>
        );
    }
}