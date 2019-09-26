import React from 'react';

interface props {
    color: string;
}

const Elipsis: React.FC<props> = ({ color }: props) => (
    <div className={`lds-ellipsis`}>
        {[1,2,3,4].map(
            item => (
                <div key={item} style={{ backgroundColor: color }} />
            )
        )}
    </div>
)

export default Elipsis;