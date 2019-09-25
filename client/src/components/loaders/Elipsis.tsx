import React from 'react';

const Elipsis = ({ color }) => (
    <div className={`lds-ellipsis`}>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
    </div>
)

export default Elipsis;