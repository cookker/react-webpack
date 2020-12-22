const React = require('react');
const {Component} = React;
const {useState, useRef} = React;
const Try = require('./Try');
const TestRendering = require('./TestRendering');

const WordRelay = () => {
    const[word, setWord] = useState('김밥');
    const[value, setValue] = useState('');  
    const[result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = e => {
        e.preventDefault();
        if(word[word.length -1] === value[0]){
            setResult('고고');
            setWord(value);
            setValue('');
            inputRef.current.focus();
        }else {
            setResult('땡');
            setValue('');
            inputRef.current.focus();
        }
    }

    const onChangeInput = e => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput}></input>
                <button>입력!</button>
            </form>
            <div>{result}</div>
            <ul>
                
                {
                [
                    {fruit:'사과', taste:'맛없다'},
                    {fruit:'바나나', taste:'맛없다'},
                    {fruit:'포도', taste:'시다'},
                ].map( (v,i) => {
                    return (
                        // <li><b>{v.fruit}</b> - {v.taste}</li>
                        <Try key={v.fruit + v.taste} value={v} index={i} />
                    )
                })
                }
            </ul>
            <TestRendering/>
        </>
    );
}

/*
*  클래스로 만든거.-----------------------------
*/

// class WordRelay extends Component {
//     state = {
//         word: '김밥',
//         value:'',
//         result:'',
//     };

//     onSubmitForm = (e) => {
//         e.preventDefault();
//         if(this.state.word[this.state.word.length -1] === this.state.value[0]){
//             this.setState({
//                 result:'고고',
//                 word: this.state.value,
//                 value: '',
//             });
//             this.input.focus();
//         }else {
//             this.setState({
//                 result: '땡',
//                 value: ''
//             })
//             this.input.focus();
//         }
//     }

//     onChangeInput = (e) => {
//         console.log(e.target);
//         this.setState({value:e.target.value})
//     };

//     input;

//     onRefInput = (c) => {
//         this.input = c;
//     }

//     render() {
//         return (
//             <>
//                 <div>{this.state.word}</div>
//                 <form onSubmit={this.onSubmitForm}>
//                     <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}></input>
//                     <button>입력!</button>
//                 </form>
//                 <div>{this.state.result}</div>
//             </>
//         );
//     }
// }

module.exports = WordRelay;