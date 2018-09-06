import React, { Component } from 'react';
import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';

import {bindActionCreators} from 'redux';
import {updateCurrent} from "./reducers/todo";

import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React with Redux</h1>
        </div>

          <div className="Todo-App">
              <TodoForm
                  currentTodo={this.props.currentTodo}
                  changeCurrent={this.props.updateCurrent}
              />

              <TodoList
                  todos={this.props.todos}
              />

          </div>
      </div>
    );
  }
}

// export default App;
const mapStateToProps = (state) => state
const mapDispatchToProps = (dispatch) => bindActionCreators({updateCurrent}, dispatch)
const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectApp