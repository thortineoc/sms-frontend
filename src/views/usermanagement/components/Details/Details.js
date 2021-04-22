import React from 'react';

const mockUser = {
    userName: 'ussser1',
    firstName: 'Angelika',
    secondName: 'Noemi',
    lastName: 'Kubicka',
}


const Details = () => {
    return (
        <div className="Details">
            <ol>
                <li>Imię: {mockUser.firstName}</li>
                <li>2Imię: {mockUser.secondName}</li>
                <li>nazwisko: {mockUser.lastName}</li>
            </ol>
        </div>
    );
};

export default Details;
