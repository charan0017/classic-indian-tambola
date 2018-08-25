import React from 'react';

import classes from './TambolaBoardCoin.css';

const tambolaBoardCoin = (props) => (
    <div
        className={[classes.TambolaBoardCoin, classes[props.coinType]].join(' ')}>
    {props.children}</div>
);

export default tambolaBoardCoin;
