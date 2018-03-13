import React from 'react';
import Modal from 'react-modal';
import ReactDataGrid from 'react-data-grid';
import {ComponentAddModal} from "./componentAddModal";
import update from "immutability-helper/index";

export class ComponentModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalComponentAddOpen: false,
            rows: this.createRows(this.props.esp)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.esp.id !== nextProps.esp.id) {
            this.setState({
                rows: this.createRows(nextProps.esp)
            });
        }
    }

    createRows = (esp) => {
        return esp.components.map((component) =>
            ({
                id: component.id,
                name: component.name,
                buttons: this.getButtons(component.id)
            }));
    };

    createRow = (component) => {
        let newComponent = {};
        newComponent.id = -1;
        newComponent.name = component.name;
        newComponent.buttons = this.getButtons(newComponent.id);
        return newComponent;
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
            key: "buttons",
            name: "",
            width: 75
        }
    ];

    getButtons = (componentId) => {
        return (
            <div className="text-center">
                <button className="btn btn-sm btn-outline-danger padding-x-sm"
                        onClick={() => this.handleGridDelete(componentId)}>Delete
                </button>
            </div>
        );
    };

    rowGetter = (i) => {
        return this.state.rows[i];
    };

    handleGridAdd = (component) => {
        let rows = this.state.rows.slice();
        let newComponent = this.createRow(component);
        rows.push(newComponent);
        this.setState({rows: rows});
        this.updateServer("insert", newComponent);
        this.closeModal();
    };

    handleGridDelete = (componentId) => {
        let rows = this.state.rows.slice();
        let rowIndex = this.state.rows.map((row) => row.id).indexOf(componentId);
        rows.splice(rowIndex, 1);
        this.updateServer("delete", {id: componentId});
        this.setState({rows: rows});
    };

    handleGridRowsUpdated = ({fromRow, toRow, updated}) => {
        let rows = this.state.rows.slice();

        for (let i = fromRow; i <= toRow; i++) {
            rows[i] = update(rows[i], {$merge: updated});
            this.updateServer("update", rows[i]);
        }

        this.setState({rows});
    };

    updateServer = (action, component) => {
        let update = {
            action: action,
            component: component
        };

        let formData = new FormData();
        formData.append('ComponentUpdate', JSON.stringify(update));
        fetch("", {
            method: "POST",
            body: formData
        }).then((res) => res)
            .then((data) => {
                this.props.alert.success('Updated ID: ' + component.id);
                this.props.updateAppState();
            })
            .catch((err) => this.props.alert.error('Failed updating ID: ' + component.id));
    };

    openModalComponentAdd = (espId) => {
        this.setState({isModalComponentAddOpen: true});
    };

    closeModalComponentAdd = () => {
        this.setState({isModalComponentAddOpen: false});
    };

    render() {
        return (
            <Modal
                isOpen={this.props.isModalOpen}
                shouldCloseOnOverlayClick={false}
                contentLabel="Overview Components Modal">
                <h1>Overview Components</h1>
                <div className="relativeWrapper">
                    <div className="absoluteWrapper">
                        <div className="table-toolbar float-right">
                            <button onClick={this.openModalComponentAdd} className="btn btn-outline-primary">Add Component</button>
                        </div>
                        <ReactDataGrid
                            rowGetter={this.rowGetter}
                            columns={this.columns}
                            rowsCount={this.state.rows.length}
                            enableCellSelect={true}
                            onGridRowsUpdated={this.handleGridRowsUpdated}/>
                        <div className="float-right margin-y-md">
                            <button type="button" className="btn btn-outline-secondary"
                                    onClick={this.props.closeModal}>Close
                            </button>
                        </div>
                    </div>
                </div>

                <ComponentAddModal isModalOpen={this.state.isModalComponentAddOpen}
                                   closeModal={this.closeModalComponentAdd}
                                   componentTypes={[{id: 1, name: "TODO"}]}
                                   espId={this.props.esp.id}/>
            </Modal>
        );
    }
}
