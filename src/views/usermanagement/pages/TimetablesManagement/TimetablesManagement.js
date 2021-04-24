import React, {useState} from 'react';
import Button from "../../../../components/Button/Button";
import './temp.css';
import Modal from "../../../../components/Modal/Modal";
import CreateForm from "../../components/CreateForm/CreateForm";
import EditForm from "../../components/EditForm/EditForm";

const TimetablesManagement = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState('');

    return (
        <div className="temp">

            <h1>Testowe</h1>
            <Button label="Add" onClick={() => {
                setIsOpen(true);
                setContent('add');
            }}/>
            <Button label="Edit" onClick={() => {
                setIsOpen(true);
                setContent('edit');
            }} />

            <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
                {content === 'add' && <CreateForm />}
                {content === 'edit' && <EditForm />}
            </Modal>

        </div>
    );
};

export default TimetablesManagement;
