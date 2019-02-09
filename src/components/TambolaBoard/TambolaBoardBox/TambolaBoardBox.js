import React from 'react';

import './TambolaBoardBox.css';
import TambolaBoardCoin from '../TambolaBoardCoin/TambolaBoardCoin';

const tambolaBoardBox = (props) => (
    <div className='TambolaBoardBox'>
        {props.active
            ? <TambolaBoardCoin coinType={props.coinType}>{props.value}</TambolaBoardCoin>
            : <p>{props.value}</p>}
    </div>
);

export default tambolaBoardBox;
