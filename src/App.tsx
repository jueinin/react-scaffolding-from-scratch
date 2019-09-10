import React from 'react';
import {hot} from 'react-hot-loader/root';
import './App.scss';
class Test extends React.Component{
    state={
        count: 0
    }
    add=()=>{
        this.setState({count: ++this.state.count})
    }
    render() {
        return (
            <div>
                {this.state.count}<button onClick={this.add}>adddd</button>
            </div>
    )
    }
}

export default hot(Test);