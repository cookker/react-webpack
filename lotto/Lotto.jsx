import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }

    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers, []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);


    useEffect(() => {
        
        console.log("useEffect");

        for(let i = 0 ; i < winNumbers.length - 1; i++){ //let을 사용하면 클로져 문제가 발생하지 않는다.
            timeouts.current[i] = 
                setTimeout( () => {
                    setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]])
                }, (i+1) * 300);
        }
        timeouts.current[6] =
            setTimeout( () => {
                setBonus(winNumbers[6]);
                setRedo(true);
            }, 300 * (6 + 1));  
        
        return () => {
            timeouts.current.forEach( (t) => {
                clearTimeout(t);
            })
        };
    }, [timeouts.current]); // 배열의 요소가 있으면 componentDidMount 와 componentDidUpdate 둘다 수행.

    const onClickRedo = useCallback(() => { //함수 자체를 기억하고 있다. useMemo는 리턴값을 기억한다는 차이가 있다.
        console.log("onClickRedo");
        console.log(winNumbers);

        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return (
        <>
            <div>당첨숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한 번 더!</button>}
        </>
    );
}

export default Lotto;