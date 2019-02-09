import React, { Component } from 'react';

import './TambolaGameManager.css';
import numbersAudioUrl from '../../assets/audio/numbers.ogg';
import TambolaBoard from '../../components/TambolaBoard/TambolaBoard';
import Button from '../../components/UI/Button/Button';
import CoinPublisher from '../../components/UI/CoinPublisher/CoinPublisher';

const MAX_NUMBERS = 90;
const GAME_INTERVAL = 5000;
const TIMES = [1.35, 2.54, 3.75, 4.9, 6.05, 7.29, 8.43, 9.72, 11.09, 12.16, 13.37, 14.5, 15.74, 16.92, 18.1, 19.24, 20.4, 21.59, 22.86, 24.01, 25.32, 26.52, 27.84, 29.12, 30.45, 31.83, 33.2, 34.66, 36.05, 37.32, 38.74, 39.81, 41.06, 42.28, 43.49, 44.8, 46.17, 47.51, 48.79, 50.03, 51.39, 52.45, 53.8, 55.05, 56.34, 57.65, 59.09, 60.43, 61.78, 63.03, 64.45, 65.49, 66.79, 68.04, 69.34, 70.7, 72.12, 73.47, 74.84, 76.2, 77.66, 79.14, 80.55, 82.18, 83.59, 85.58, 86.97, 88.43, 89.85, 91.22, 92.73, 94.01, 95.43, 96.81, 98.25, 99.63, 101.14, 102.54, 104.08, 105.54, 107.11, 108.15, 109.48, 110.75, 112.11, 113.49, 114.91, 116.34, 117.7, 119.08, 120.35, 121.57, 122.98, 124.31, 125.73, 127.13, 128.49, 129.9, 131.38, 132.72, 134.16, 135.28, 136.66, 137.42, 138.45, 139.75, 141.02, 143.09, 144.19, 145.22, 146.44];

class TambolaGameManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxNumbers: props.maxNumbers && typeof props.maxNumbers === 'number'
                ? props.maxNumbers
                : MAX_NUMBERS
        };
    }

    setDefaultGameNumbers = () => {
        const numbers = {};
        for (let currentNumber = 1; currentNumber <= this.state.maxNumbers; currentNumber += 1) {
            numbers[currentNumber] = ({
                value: currentNumber,
                active: false,
            });
        }
        this.setState({
            gameStarted: false,
            gamePaused: false,
            gameEnded: false,
            gameTimer: null,
            currentNumber: null,
            gameHistory: [],
            coinPublishing: false,
            numbers,
        });
    };

    componentWillMount() {
        this.setDefaultGameNumbers();
    }

    getRandomInActiveNumber = () => {
        const inActiveNumbers = Object.keys(this.state.numbers)
            .filter(key => this.state.numbers[key].active === false);
        if (inActiveNumbers.length) {
            return inActiveNumbers[Math.floor(Math.random() * inActiveNumbers.length)];
        }
        return null;
    };

    updateInActiveNumber = async (inActiveNumber) => {
        const { numbers } = this.state;
        numbers[inActiveNumber].active = true;
        let { gameHistory } = this.state;
        if (this.state.currentNumber) {
            gameHistory = [this.state.currentNumber].concat(gameHistory);
        }
        const currentNumber = Number(inActiveNumber);
        const startTime = TIMES[currentNumber];
        const endTime = (TIMES[currentNumber + 1] - 0.3).toFixed(2);
        const numbersAudioTimeRangeUrl = `${numbersAudioUrl}#t=${startTime},${endTime}`;
        const currentNumberAudio = new Audio(numbersAudioTimeRangeUrl);
        await currentNumberAudio.play();
        this.setState({
            numbers,
            currentNumber,
            gameHistory,
            coinPublishing: true
        });
        setTimeout(() => {
            currentNumberAudio.pause();
            this.setState({ coinPublishing: false });
        }, 30 * Math.floor(GAME_INTERVAL / 100));
    };

    checkGameEnded = () => {
        if (!this.getRandomInActiveNumber()) {
            this.endGameHandler();
        }
    };

    chooseRandomNumber = async () => {
        const randomNumber = this.getRandomInActiveNumber();
        if (randomNumber) {
            await this.updateInActiveNumber(randomNumber);
        }
        this.checkGameEnded();
    };

    beginGameHandler = async () => {
        // console.log('Game Started');
        await this.updateInActiveNumber(this.getRandomInActiveNumber());
        this.beginGameTimerHandler();
    };

    pauseGameHandler = () => {
        // console.log('Game Paused');
        this.endGameTimerHandler(true);
    };

    resumeGameHandler = async () => {
        // console.log('Game Resumed');
        await this.beginGameHandler();
    };

    endGameHandler = () => {
        // console.log('Game Ended');
        this.endGameTimerHandler(false, true);
    };

    resetGameHandler = () => {
        this.endGameHandler();
        this.setDefaultGameNumbers();
    };

    beginGameTimerHandler = () => {
        const gameTimer = setInterval(() => this.chooseRandomNumber(), GAME_INTERVAL);
        this.setState({ gameStarted: true, gamePaused: false, gameTimer });
    };

    endGameTimerHandler = (gamePaused = false, gameEnded = false) => {
        clearInterval(this.state.gameTimer);
        this.setState({ gamePaused, gameEnded, gameTimer: null });
    };

    getGamePositionButton = () => {
        let button = (
            <Button
                clicked={this.beginGameHandler}
                btnType={'Success'} >BEGIN</Button>
        );
        if (this.state.gameStarted) {
            button = (
                <Button
                    clicked={this.pauseGameHandler}
                    btnType={'Danger'} >PAUSE</Button>
            );
        }
        if (this.state.gamePaused) {
            button = (
                <Button
                    clicked={this.resumeGameHandler}
                    btnType={'Success'} >RESUME</Button>
            );
        }
        if (this.state.gameEnded) {
            button = (
                <Button disabled >GAME ENDED</Button>
            );
        }
        return button;
    };

    getGameControls = () => {
        return (
            <div className='GameControls'>
                {this.getGamePositionButton()}
                <Button
                    disabled={!this.state.gameStarted}
                    clicked={this.resetGameHandler}
                    btnType={'Danger'} >RESET</Button>
            </div>
        );
    };

    getCoinPublisher = () => {
        return (
            this.state.coinPublishing
                ? <div className='CoinPublisher'>
                    <CoinPublisher>{this.state.currentNumber}</CoinPublisher>
                  </div>
                : null
        );
    };

    render() {
        // console.log('rendering');
        return (
            <div className='TambolaGameManager'>
                <h2 className='Header'>
                    Classic Indian Tambola
                </h2>
                {this.getCoinPublisher()}
                {this.getGameControls()}
                <TambolaBoard numbers={this.state.numbers} />
                <h5 className='Footer'>
                    Note: we are sorry, but tickets must be self bought or <a target={"_blank"} href={"https://www.google.co.in/search?q=housie+ticket+generator+online"}>google.</a>
                </h5>
            </div>
        );
    }
}

export default TambolaGameManager;
