import React from 'react'
import {BrowserRouter, HashRouter, Route, Link} from 'react-router-dom';
import RSP from '../gawibawibo/RSP';
import Lotto from '../lotto/Lotto';
import TicTakToe from '../tiktactoe/TicTakToe';

const Games = () => {
    return (
        <BrowserRouter>
            <Link to="/tic-tak-toe">틱택토</Link>
            &nbsp;
            <Link to="/rock-scissors-paper">가위바위보</Link>
            &nbsp;
            <Link to="/lotto-generator">로또생성기</Link>
            <div>
                <Route path="/tic-tak-toe" component={TicTakToe} />
                <Route path="/rock-scissors-paper" component={RSP} />
                <Route path="/lotto-generator" component={Lotto} />
            </div>
        </BrowserRouter>
    );
};

export default Games;