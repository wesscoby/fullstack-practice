import React from 'react';

interface props {
    color: string;
}

const Spinner: React.FC<props> = ({ color }: props) => (
    <div className="lds-spinner">
        {[1,2,3,4,5,6,7,8,9,10,11,12].map(
            item => (
                <div key={item} style={{ backgroundColor: color }} />
            )
        )}
    </div>
)

export default Spinner;