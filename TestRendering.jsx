const React = require('react');
const {PureComponent} = React;

class TestRendering extends PureComponent {
    state = {
        counter: 0,
    }

    //Component를 PureComponent로 변경후 주석처리.
    
    // shouldComponentUpdate(nextProps, nextState, nextContext) { 
    //     if(this.state.counter !== nextState.counter){
    //         return true;
    //     }
    //     return false;
    // }

    onClick = () => {
        this.setState({});
    };

    render() {
        return (
            <div>
                <button onClick={this.onClick}>클릭</button>
            </div>
        );
    }
}

module.exports = TestRendering;
// exprot default TestRendering;