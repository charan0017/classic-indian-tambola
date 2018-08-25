import React from 'react';

import classes from './CoinPublisher.css';
import numbersAudioUrl from '../../../assets/audio/numbers.ogg';

const TIMES = [1.35, 2.54, 3.75, 4.9, 6.05, 7.29, 8.43, 9.72, 11.09, 12.16, 13.37, 14.5, 15.74, 16.92, 18.1, 19.24, 20.4, 21.59, 22.86, 24.01, 25.32, 26.52, 27.84, 29.12, 30.45, 31.83, 33.2, 34.66, 36.05, 37.32, 38.74, 39.81, 41.06, 42.28, 43.49, 44.8, 46.17, 47.51, 48.79, 50.03, 51.39, 52.45, 53.8, 55.05, 56.34, 57.65, 59.09, 60.43, 61.78, 63.03, 64.45, 65.49, 66.79, 68.04, 69.34, 70.7, 72.12, 73.47, 74.84, 76.2, 77.66, 79.14, 80.55, 82.18, 83.59, 85.58, 86.97, 88.43, 89.85, 91.22, 92.73, 94.01, 95.43, 96.81, 98.25, 99.63, 101.14, 102.54, 104.08, 105.54, 107.11, 108.15, 109.48, 110.75, 112.11, 113.49, 114.91, 116.34, 117.7, 119.08, 120.35, 121.57, 122.98, 124.31, 125.73, 127.13, 128.49, 129.9, 131.38, 132.72, 134.16, 135.28, 136.66, 137.42, 138.45, 139.75, 141.02, 143.09, 144.19, 145.22, 146.44];

const coinPublisher = (props) => {
    const currentNumber = Number(props.children);

    if (numbersAudioUrl && typeof currentNumber === 'number') {
        const startTime = TIMES[currentNumber];
        const endTime = (TIMES[currentNumber + 1] - 0.3).toFixed(2);
        const numbersAudioTimeRangeUrl = `${numbersAudioUrl}#t=${startTime},${endTime}`;
        const numbersAudio = new Audio(numbersAudioTimeRangeUrl);
        numbersAudio.play();
    }

    return (
        <div className={classes.CoinPublisher}>
            {props.children}
        </div>
    );
}

export default coinPublisher;
