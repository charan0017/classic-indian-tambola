import React from 'react';

import classes from './TambolaBoard.css';
import TambolaBoardBox from './TambolaBoardBox/TambolaBoardBox';

const tambolaBoard = (props) => (
    <div className={classes.TambolaBoard}>
        {props.numbers
            ? Object.keys(props.numbers).map(key => 
                <TambolaBoardBox
                    key={key}
                    value={props.numbers[key].value}
                    active={props.numbers[key].active} />
            ) : null}
    </div>
);

export default tambolaBoard;
