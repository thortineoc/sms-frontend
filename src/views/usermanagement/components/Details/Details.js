import React from 'react';
import './Details.css';

const Details = ({user, showEdit, setShowEdit}) => {

    const handleClick = () => {
        setShowEdit(true);
    }

    return (
        <div className="Details">
            <div className="Details__field">
                <div className="Details__label">User Id</div>
                <div className="Details__data" onClick={handleClick}>{user.id ?? '-'}</div>
            </div>
            <div className="Details__field">
                <div className="Details__label">Username</div>
                <div className="Details__data">{user.userName ?? '-'}</div>
            </div>
            <div className="Details__field">
                <div className="Details__label">First name</div>
                <div className="Details__data">{user.firstName ?? '-'}</div>
            </div>
            <div className="Details__field">
                <div className="Details__label">Middle name</div>
                <div className="Details__data">{(user.customAttributes && user.customAttributes.middleName) ?? '-'}</div>
            </div>
            <div className="Details__field">
                <div className="Details__label">Last name</div>
                <div className="Details__data">{user.lastName ?? '-'}</div>
            </div>
            <div className="Details__field">
                <div className="Details__label">Email address</div>
                <div className="Details__data">{(user.customAttributes && user.customAttributes.email) ?? '-'}</div>
            </div>
            <div className="Details__field">
                <div className="Details__label">Phone number</div>
                <div className="Details__data">{(user.customAttributes && user.customAttributes.phoneNumber) ?? '-'}</div>
            </div>

        </div>
    );
};

export default Details;
