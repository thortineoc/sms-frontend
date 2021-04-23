import React from 'react';
import './Details.css';

const Details = ({userId}) => {
    return (
        <div className="Details">
            <div className="Details__field">
                <span>User Id</span>
                <span>{userId}</span>
            </div>
        </div>
    );
};

export default Details;
