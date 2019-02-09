import React from 'react';

import './TambolaBoardCoin.css';

const tambolaBoardCoin = (props) => (
    <div
        className={['TambolaBoardCoin', props.coinType].join(' ')}>
    {props.children}</div>
);

export default tambolaBoardCoin;
