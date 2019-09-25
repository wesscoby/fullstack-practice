import React from 'react';

interface props {
    color: string;
}

const Elipsis = ({ color }: props) => (
    <div className={`lds-ellipsis`}>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
        <div style={{ backgroundColor: color }}></div>
    </div>
)

export default Elipsis;