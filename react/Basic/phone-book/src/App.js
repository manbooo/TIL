import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  id = 2

  state = {
    information: [
      {
        id: 0,
        name: 'jju',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: '홍길동',
        phone: '010-0000-0001'
      }
    ]
  }

  handleCreate = (data) => {
    const { information } = this.state;

    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }

  handleRemove = (id) => {
    const { information } = this.state;

    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;

    this.setState({
      information: information.map(
        info => id === info.id
        ? { ...info, ...data} // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
        : info // 기존의 값을 그대로 유지
      )
    })
  }

  render() {

    return (
      <div className="App">
        <PhoneForm
          onCreate={this.handleCreate}
        />

        <PhoneInfoList 
          data={this.state.information}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
