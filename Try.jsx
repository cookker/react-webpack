const React = require('react');
const {Component} = React;
const {memo} = React;

// class Try extends Component {
//     render() {
//         return (
//             <li>
//                 <b>{this.props.value.fruit}</b> - {this.props.index}
//             </li>
//         );
//     }
// }


const Try = memo(({tryInfo}) => { // {tryInfo}는 this.props를 구조분해 하여 정의한 것이다.
    return (
        <li>
            <div>{tryInfo.try} </div>
            <div>{tryInfo.result} </div>
        </li>
    )
});

module.exports = Try;