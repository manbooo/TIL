import React, { Component } from 'react';
import './App.css';
import Counter from "./components/Counter";
import NameList from "./components/NameList";
import NameForm from "./components/NameForm";

class App extends Component {
    state = {
        names: ['aaa', 'bbb']
    }

    onInsert = (name) => {
        this.setState(({names}) => ({
            names: names.concat(name)
        }))
    }

    render() {
        const { names } = this.state
        const { onInsert } = this

        return (
            <div className="App">
                <Counter />

                <hr />
                <h1>Name List</h1>
                <NameForm onInsert={onInsert}/>
                <NameList names={names} />
            </div>
        );
    }
}

export default App;
