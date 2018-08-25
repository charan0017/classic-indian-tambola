import React, { Component } from 'react';

import classes from './TambolaGameManager.css';
import TambolaBoard from '../../components/TambolaBoard/TambolaBoard';
import Button from '../../components/UI/Button/Button';
import CoinPublisher from '../../components/UI/CoinPublisher/CoinPublisher';

const MAX_NUMBERS = 90;
const GAME_INTERVAL = 5000;

class TambolaGameManager extends Component {
    state = {
        gameStarted: false,
        gamePaused: false,
        gameEnded: false,
        gameTimer: null,
        currentNumber: null,
        gameHistory: [],
        coinPublishing: false,
        numbers: {},
    }

    getMaxNumbers = () => {
        return this.props.maxNumbers && typeof this.props.maxNumbers === 'number'
            ? this.props.maxNumbers
            : MAX_NUMBERS;
    }

    setDefaultGameNumbers = () => {
        const numbers = {};
        for (let currentNumber = 1; currentNumber <= this.getMaxNumbers(); currentNumber += 1) {
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
    }

    componentWillMount() {
        console.log('componentWillMount');
        this.setDefaultGameNumbers();
    }

    getRandomInActiveNumber = () => {
        const inActiveNumbers = Object.keys(this.state.numbers)
            .filter(key => this.state.numbers[key].active === false)
            .map(key => ({ key, ...this.state.numbers[key] }));
        if (inActiveNumbers.length) {
            return inActiveNumbers[Math.floor(Math.random() * inActiveNumbers.length)];
        }
        return null;
    }

    updateInActiveNumber = (inActiveNumber) => {
        const numbers = { ...this.state.numbers };
        numbers[inActiveNumber.key].active = true;
        let gameHistory = [ ...this.state.gameHistory ];
        if (this.state.currentNumber) {
            gameHistory = [this.state.currentNumber, ...gameHistory];
        }
        this.setState({ numbers, currentNumber: inActiveNumber.key, gameHistory, coinPublishing: true });
        setTimeout(() => {
            this.setState({ coinPublishing: false });
        }, 30 * Math.floor(GAME_INTERVAL / 100));
    }

    checkGameEnded = () => {
        if (!this.getRandomInActiveNumber()) {
            this.endGameHandler();
        }
    }

    chooseRandomNumber = () => {
        const randomNumber = this.getRandomInActiveNumber();
        if (randomNumber) {
            this.updateInActiveNumber(randomNumber);
        }
        this.checkGameEnded();
    }

    beginGameHandler = () => {
        console.log('Game Started');
        this.beginGameTimerHandler();
    }

    pauseGameHandler = () => {
        // console.log('Game Paused');
        this.endGameTimerHandler(true);
    }

    resumeGameHandler = () => {
        // console.log('Game Resumed');
        this.beginGameTimerHandler();
    }

    endGameHandler = () => {
        console.log('Game Ended');
        this.endGameTimerHandler(false, true);
    }

    resetGameHandler = () => {
        this.endGameHandler();
        this.setDefaultGameNumbers();
    }

    beginGameTimerHandler = () => {
        const gameTimer = setInterval(() => this.chooseRandomNumber(), GAME_INTERVAL);
        this.setState({ gameStarted: true, gamePaused: false, gameTimer });
        this.updateInActiveNumber(this.getRandomInActiveNumber());
    }

    endGameTimerHandler = (gamePaused = false, gameEnded = false) => {
        clearInterval(this.state.gameTimer);
        this.setState({ gamePaused, gameEnded, gameTimer: null });
    }

    getGamePositonButton = () => {
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
    }

    getGameControls = () => {
        return (
            <div className={classes.GameControls}>
                {this.getGamePositonButton()}
                <Button
                    disabled={!this.state.gameStarted}
                    clicked={this.resetGameHandler}
                    btnType={'Danger'} >RESET</Button>
            </div>
        );
    }

    getCoinPubisher = () => {
        return (
            this.state.coinPublishing
                ? <div className={classes.CoinPublisher}>
                    <CoinPublisher>{this.state.currentNumber}</CoinPublisher>
                  </div>
                : null
        );
    }

    render() {
        // console.log('rendering');
        return (
            <div className={classes.TambolaGameManager}>
                <h2 style={{
                    margin: '5px',
                    padding: '0px',
                }}>Classic Indian Tambola</h2>
                {this.getCoinPubisher()}
                {this.getGameControls()}
                <TambolaBoard numbers={this.state.numbers} />
                <h5 style={{
                    margin: '10px',
                    color: 'darkslategrey'
                }}>Note: we are sorry, but tickets must be self bought or google.</h5>
            </div>
        );
    }
}

export default TambolaGameManager;
