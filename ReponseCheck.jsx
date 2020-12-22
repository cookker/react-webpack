import React, {useState, useRef} from 'react';

const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if(state === 'waiting') {
                setState('ready');
                setMessage('초록색이 되면 클릭하세요.');

            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000);
        } else if(state === 'ready'){
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('성급하구먼');
        } else if(state === 'now') {
            endTime.current = new Date();
            console.log(endTime.current - startTime.current);
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult)=> {
                return [...prevResult, endTime.current - startTime.current]
            });
        }
    };

     const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        return result.length === 0 
            ? null
            : <>
                <div>평균 시간: {result.reduce((a,c) => a+c) / result.length} ms</div>
                <button onClick={onReset}>RESET</button>
                </>
    };

    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClickScreen}
            >
                {message}
            </div>
            <div>{renderAverage()}</div>
        </>
    );
}


// import React, {Component} from 'react';

// class ResponseCheck extends Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요.',
//         result:[],
//     };

//     timeout;
//     startTime;
//     endTime;

//     onClickScreen = () => {
//         const {state, message, result } = this.state;
//         if(state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요.',
//             });

//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금클릭',
//                 });
//                 this.startTime = new Date();
//             }, Math.floor(Math.random() * 1000) + 2000);
//         } else if(state === 'ready'){
//             clearTimeout(this.timeout);
//             this.setState({
//                 state: 'waiting',
//                 message: '성급하구먼',
//             })
//         } else if(state === 'now') {
//             this.endTime = new Date();
//             console.log(this.endTime - this.startTime);
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     message: '클릭해서 시작하세요.',
//                     result:[...prevState.result, this.endTime - this.startTime],
//                 };
//             });
//         }
//     };

//     onReset = () => {
//         this.setState({
//             result:[],
//         })
//     }

//     renderAverage = () => {
//         const {result} = this.state;
//         return result.length === 0 
//             ? null
//             : <>
//                 <div>평균 시간: {result.reduce((a,c) => a+c) / result.length} ms</div>
//                 <button onClick={this.onReset}>RESET</button>
//              </>
//     };

//     render() {
//         const {state, message} = this.state;

//         return (
//             <>
//                 <div
//                     id="screen"
//                     className={state}
//                     onClick={this.onClickScreen}
//                 >
//                     {message}
//                 </div>
//                 <div>{this.renderAverage()}</div>
//             </>
//         );
//     };
// }

export default ResponseCheck;